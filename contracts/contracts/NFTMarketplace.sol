//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IXPSystem {
    function generateRandomXP(uint256 tokenId) external returns (uint256);
    function updateUserXP(address user, uint256 tokenId, bool isAdd) external;
}

interface ICreatorCollection {
    function owner() external view returns (address);
}

contract NFTMarketplace is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId;
    address public immutable penGuildPool;
    address public immutable xpSystemAddress;
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 10; // 10%
    
    struct NFTDetails {
        uint256 tokenId;
        address creator;
        uint256 xpPoints;
        uint256 mintPrice;
        bool isListed;
        uint256 listingPrice;
        string imageUrl;
    }
    
    mapping(uint256 => NFTDetails) public nftDetails;
    mapping(address => uint256) public userTotalXP;
    mapping(uint256 => address) public collections;  // collectionId => collection address
    
    event NFTMinted(
        uint256 tokenId, 
        address creator, 
        uint256 xpPoints,
        string imageUrl
    );
    event NFTListed(uint256 tokenId, uint256 price);
    event NFTSold(uint256 tokenId, address seller, address buyer, uint256 price);
    event CollectionRegistered(uint256 collectionId, address collection);
    
    constructor(address _penGuildPool, address _xpSystem) ERC721("PenGuild NFT", "PGNFT") Ownable(msg.sender) {
        penGuildPool = _penGuildPool;
        xpSystemAddress = _xpSystem;
    }

    function _getNextTokenId() private returns (uint256) {
        _currentTokenId++;
        return _currentTokenId;
    }

    function listNFTForSale(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(price > 0, "Price must be greater than 0");
        
        nftDetails[tokenId].isListed = true;
        nftDetails[tokenId].listingPrice = price;
        
        emit NFTListed(tokenId, price);
    }

    function buyNFT(uint256 tokenId) external payable {
        require(nftDetails[tokenId].isListed, "NFT not listed for sale");
        require(msg.value >= nftDetails[tokenId].listingPrice, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        
        // Update XP before transfer
        IXPSystem(xpSystemAddress).updateUserXP(seller, tokenId, false);
        IXPSystem(xpSystemAddress).updateUserXP(msg.sender, tokenId, true);
        
        _transfer(seller, msg.sender, tokenId);
        
        uint256 platformFee = (msg.value * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 sellerAmount = msg.value - platformFee;
        
        // Send platform fee to pool
        (bool success,) = penGuildPool.call{value: platformFee}("");
        require(success, "Failed to transfer platform fee");
        
        // Send remaining payment to seller
        (success,) = payable(seller).call{value: sellerAmount}("");
        require(success, "Failed to transfer to seller");
        
        nftDetails[tokenId].isListed = false;
        nftDetails[tokenId].listingPrice = 0;
        
        emit NFTSold(tokenId, seller, msg.sender, msg.value);
    }

    function getListedNFTs() external view returns (NFTDetails[] memory) {
        uint256 listedCount = 0;
        for (uint256 i = 1; i <= _currentTokenId; i++) {
            if (nftDetails[i].isListed) listedCount++;
        }
        
        NFTDetails[] memory listedNFTs = new NFTDetails[](listedCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= _currentTokenId; i++) {
            if (nftDetails[i].isListed) {
                listedNFTs[currentIndex] = nftDetails[i];
                currentIndex++;
            }
        }
        
        return listedNFTs;
    }

    struct LeaderboardEntry {
        address user;
        uint256 xp;
    }
    
    function getLeaderboard(uint256 limit) external view returns (LeaderboardEntry[] memory) {
        LeaderboardEntry[] memory allEntries = new LeaderboardEntry[](_currentTokenId);
        uint256 entryCount = 0;
        
        for (uint256 i = 1; i <= _currentTokenId; i++) {
            address user = ownerOf(i);
            uint256 userXP = userTotalXP[user];
            
            bool found = false;
            for (uint256 j = 0; j < entryCount; j++) {
                if (allEntries[j].user == user) {
                    found = true;
                    break;
                }
            }
            
            if (!found && userXP > 0) {
                allEntries[entryCount] = LeaderboardEntry(user, userXP);
                entryCount++;
            }
        }
        
        for (uint256 i = 0; i < entryCount - 1; i++) {
            for (uint256 j = 0; j < entryCount - i - 1; j++) {
                if (allEntries[j].xp < allEntries[j + 1].xp) {
                    LeaderboardEntry memory temp = allEntries[j];
                    allEntries[j] = allEntries[j + 1];
                    allEntries[j + 1] = temp;
                }
            }
        }
        
        uint256 resultSize = limit < entryCount ? limit : entryCount;
        LeaderboardEntry[] memory result = new LeaderboardEntry[](resultSize);
        
        for (uint256 i = 0; i < resultSize; i++) {
            result[i] = allEntries[i];
        }
        
        return result;
    }

    function mintNFT(
        address to, 
        uint256 collectionId,
        string memory imageUrl
    ) external payable {
        require(collections[collectionId] == msg.sender, "Not collection contract");
        
        uint256 newTokenId = _getNextTokenId();
        _safeMint(to, newTokenId);
        
        uint256 xpPoints = IXPSystem(xpSystemAddress).generateRandomXP(newTokenId);
        IXPSystem(xpSystemAddress).updateUserXP(to, newTokenId, true);
        
        nftDetails[newTokenId] = NFTDetails({
            tokenId: newTokenId,
            creator: ICreatorCollection(collections[collectionId]).owner(),
            xpPoints: xpPoints,
            mintPrice: 0,
            isListed: false,
            listingPrice: 0,
            imageUrl: imageUrl
        });
        
        emit NFTMinted(newTokenId, collections[collectionId], xpPoints, imageUrl);
    }

    function registerCollection(address collectionAddress) external returns (uint256) {
        _currentTokenId++;
        collections[_currentTokenId] = collectionAddress;
        emit CollectionRegistered(_currentTokenId, collectionAddress);
        return _currentTokenId;
    }

    function getTokenId() external view returns (uint256) {
        return _currentTokenId;
    }
}