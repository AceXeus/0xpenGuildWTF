import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("NFTMarketplace", function () {
  async function deployNFTMarketplaceFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();

    return { marketplace, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should initialize with correct owner", async function () {
      const { marketplace, owner } = await loadFixture(deployNFTMarketplaceFixture);
      await expect(marketplace.updateListPrice(hre.ethers.parseEther("0.02")))
        .not.to.be.revertedWith("Only owner can update listing price");
    });

    it("Should set the correct list price", async function () {
      const { marketplace } = await loadFixture(deployNFTMarketplaceFixture);
      expect(await marketplace.getListPrice()).to.equal(hre.ethers.parseEther("0.01"));
    });
  });

  describe("NFT Operations", function () {
    describe("Listing", function () {
      it("Should create and list a new NFT", async function () {
        const { marketplace } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");
        const listPrice = await marketplace.getListPrice();

        await expect(marketplace.createToken(tokenURI, price, { value: listPrice }))
          .to.emit(marketplace, "TokenListedSuccess");
      });

      it("Should fail if listing price is not paid", async function () {
        const { marketplace } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");

        await expect(
          marketplace.createToken(tokenURI, price, { value: 0 })
        ).to.be.revertedWith("Hopefully sending the correct price");
      });
    });

    describe("Retrieving NFTs", function () {
      it("Should return all listed NFTs", async function () {
        const { marketplace } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");
        const listPrice = await marketplace.getListPrice();

        await marketplace.createToken(tokenURI, price, { value: listPrice });
        const nfts = await marketplace.getAllNFTs();
        
        expect(nfts.length).to.equal(1);
        expect(nfts[0].price).to.equal(price);
      });

      it("Should return correct NFTs for owner", async function () {
        const { marketplace, owner } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");
        const listPrice = await marketplace.getListPrice();

        await marketplace.createToken(tokenURI, price, { value: listPrice });
        const myNfts = await marketplace.getMyNFTs();
        
        expect(myNfts.length).to.equal(1);
        expect(myNfts[0].seller).to.equal(owner.address);
      });
    });

    describe("Sales", function () {
      it("Should execute sale correctly", async function () {
        const { marketplace, owner, otherAccount } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");
        const listPrice = await marketplace.getListPrice();

        await marketplace.createToken(tokenURI, price, { value: listPrice });
        const tokenId = 1;

        await expect(
          marketplace.connect(otherAccount).executeSale(tokenId, { value: price })
        ).to.changeEtherBalance(otherAccount, -price);

        expect(await marketplace.ownerOf(tokenId)).to.equal(otherAccount.address);
      });

      it("Should fail if incorrect price is paid", async function () {
        const { marketplace, otherAccount } = await loadFixture(deployNFTMarketplaceFixture);
        const tokenURI = "ipfs://test-uri";
        const price = hre.ethers.parseEther("0.1");
        const listPrice = await marketplace.getListPrice();

        await marketplace.createToken(tokenURI, price, { value: listPrice });
        const tokenId = 1;
        const incorrectPrice = hre.ethers.parseEther("0.05");

        await expect(
          marketplace.connect(otherAccount).executeSale(tokenId, { value: incorrectPrice })
        ).to.be.revertedWith("Please submit the asking price in order to complete the purchase");
      });
    });
  });
});
