import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { EventLog } from "ethers";

describe("NFT Marketplace System", function () {
  async function deployFixture() {
    const [owner, creator1, creator2, user1, user2] = await ethers.getSigners();

    // Deploy PenGuildPool
    const PenGuildPool = await ethers.getContractFactory("PenGuildPool");
    const penGuildPool = await PenGuildPool.deploy();

    // Deploy XPSystem
    const XPSystem = await ethers.getContractFactory("XPSystem");
    const xpSystem = await XPSystem.deploy();

    // Deploy NFTMarketplace
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy(
      await penGuildPool.getAddress(),
      await xpSystem.getAddress()
    );

    // Deploy CreatorCollection
    const CreatorCollection = await ethers.getContractFactory("CreatorCollection");
    const collection1 = await CreatorCollection.connect(creator1).deploy(
      "Collection 1",
      "Test Collection 1",
      ethers.parseEther("0.1"),
      100,
      await marketplace.getAddress()
    );

    // Register collection
    const tx = await marketplace.connect(creator1).registerCollection(await collection1.getAddress());
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Transaction failed");
    const event = receipt.logs.find(
      (log: any) => log.fragment.name === 'CollectionRegistered'
    );
    if (!event) throw new Error("CollectionRegistered event not found");
    const collectionId = (event as EventLog).args[0];

    // Create collection trong CreatorCollection contract
    await collection1.connect(creator1).createCollection(
      "Collection 1",
      "Test Collection 1",
      ethers.parseEther("0.1"),
      100
    );

    return { 
      marketplace, 
      penGuildPool, 
      xpSystem, 
      collection1,
      collectionId,
      owner, 
      creator1, 
      creator2, 
      user1, 
      user2 
    };
  }

  describe("Collection Management", function() {
    it("Should allow creator to create and register collection", async function() {
      const { marketplace, collection1 } = await loadFixture(deployFixture);
      
      // Collection be register in fixture
      const collectionAddress = await marketplace.collections(1);
      expect(collectionAddress).to.equal(await collection1.getAddress());
    });

    it("Should allow creator to update mint price", async function() {
      const { collection1, creator1 } = await loadFixture(deployFixture);
      const newPrice = ethers.parseEther("0.2");
      
      await collection1.connect(creator1).updateMintPrice(newPrice);
      const collectionInfo = await collection1.collectionInfo();
      expect(collectionInfo.mintPrice).to.equal(newPrice);
    });

    it("Should allow creator to toggle collection active status", async function() {
      const { collection1, creator1 } = await loadFixture(deployFixture);
      
      // Toggle off
      await collection1.connect(creator1).toggleActive();
      const infoAfterToggle = await collection1.collectionInfo();
      expect(infoAfterToggle.isActive).to.be.false;

      // Toggle on again
      await collection1.connect(creator1).toggleActive();
      const finalInfo = await collection1.collectionInfo();
      expect(finalInfo.isActive).to.be.true;
    });
  });

  describe("NFT Minting", function() {
    it("Should mint NFT with correct platform fee distribution", async function() {
      const { marketplace, collection1, penGuildPool, user1, collectionId } = await loadFixture(deployFixture);
      
      const mintPrice = ethers.parseEther("0.1");
      const platformFee = mintPrice * 10n / 100n;
      
      const poolBalanceBefore = await ethers.provider.getBalance(await penGuildPool.getAddress());
      
      await collection1.connect(user1).mintFromCollection(
        collectionId,
        "https://example.com/nft/1.png",
        { value: mintPrice }
      );
      
      const poolBalanceAfter = await ethers.provider.getBalance(await penGuildPool.getAddress());
      expect(poolBalanceAfter - poolBalanceBefore).to.equal(platformFee);
    });

    it("Should assign random XP to minted NFT", async function() {
      const { marketplace, collection1, user1, collectionId } = await loadFixture(deployFixture);
      
      await collection1.connect(user1).mintFromCollection(
        collectionId,
        "https://example.com/nft/2.png",
        { value: ethers.parseEther("0.1") }
      );

      const tokenId = await marketplace.getTokenId();
      const nftDetails = await marketplace.nftDetails(tokenId);
      expect(nftDetails.xpPoints).to.be.gt(0);
      expect(nftDetails.xpPoints).to.be.lte(100);
    });

    it("Should mint NFT with image URL", async function() {
      const { marketplace, collection1, user1, collectionId } = await loadFixture(deployFixture);
      const imageUrl = "https://example.com/nft/1.png";
      
      await collection1.connect(user1).mintFromCollection(
        collectionId, 
        imageUrl,
        { value: ethers.parseEther("0.1") }
      );

      const tokenId = await marketplace.getTokenId();
      const nftDetails = await marketplace.nftDetails(tokenId);
      expect(nftDetails.imageUrl).to.equal(imageUrl);
    });
  });

  describe("NFT Trading", function() {
    it("Should allow users to list and buy NFTs", async function() {
      const { marketplace, collection1, user1, user2, collectionId } = await loadFixture(deployFixture);
      
      // Mint NFT and wait for transaction to complete
      await collection1.connect(user1).mintFromCollection(
        collectionId,
        "https://example.com/nft/3.png",
        { value: ethers.parseEther("0.1") }
      );

      const tokenId = await marketplace.getTokenId();

      // List NFT
      const listPrice = ethers.parseEther("0.2");
      await marketplace.connect(user1).listNFTForSale(tokenId, listPrice);

      // Buy NFT
      await marketplace.connect(user2).buyNFT(tokenId, { value: listPrice });
      
      expect(await marketplace.ownerOf(tokenId)).to.equal(user2.address);
    });
  });

  describe("XP System", function() {
    it("Should update XP correctly when NFT changes ownership", async function() {
      const { marketplace, collection1, xpSystem, user1, user2, collectionId } = await loadFixture(deployFixture);
      
      // Mint NFT
      await collection1.connect(user1).mintFromCollection(
        collectionId,
        "https://example.com/nft/4.png",
        { value: ethers.parseEther("0.1") }
      );

      const tokenId = await marketplace.getTokenId();
      const nftDetails = await marketplace.nftDetails(tokenId);
      const nftXP = nftDetails.xpPoints;
      
      // Check XP after mint
      const xpAfterMint = await xpSystem.userXP(user1.address);
      expect(xpAfterMint).to.equal(nftXP);
      expect(await xpSystem.hasNFTXP(user1.address, tokenId)).to.be.true;

      // List and sell NFT
      await marketplace.connect(user1).listNFTForSale(tokenId, ethers.parseEther("0.2"));
      await marketplace.connect(user2).buyNFT(tokenId, { value: ethers.parseEther("0.2") });

      // Check XP after sell
      expect(await xpSystem.hasNFTXP(user1.address, tokenId)).to.be.false;
      expect(await xpSystem.hasNFTXP(user2.address, tokenId)).to.be.true;
      
      const seller1XP = await xpSystem.userXP(user1.address);
      expect(seller1XP).to.equal(0);
      
      const buyer2XP = await xpSystem.userXP(user2.address);
      expect(buyer2XP).to.equal(nftXP);
    });
  });

  describe("Platform Management", function() {
    it("Should allow owner to withdraw funds from PenGuild pool", async function() {
      const { penGuildPool, collection1, user1, owner, collectionId } = await loadFixture(deployFixture);
      
      // Generate some fees through minting
      await collection1.connect(user1).mintFromCollection(
        collectionId,
        "https://example.com/nft/5.png",
        { value: ethers.parseEther("0.1") }
      );

      const initialBalance = await ethers.provider.getBalance(owner.address);
      await penGuildPool.connect(owner).withdrawFunds(ethers.parseEther("0.01"));
      
      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });
  });
});
