// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTMarketplace {
    function mintNFT(address to, uint256 collectionId, string memory imageUrl) external payable;
    function penGuildPool() external view returns (address);
}

contract CreatorCollection is Ownable {
    struct Collection {
        string name;
        string description;
        uint256 mintPrice;
        uint256 maxSupply;
        uint256 currentSupply;
        bool isActive;
    }
    
    Collection public collectionInfo;
    address public immutable marketplace;
    mapping(uint256 => Collection) public collections;
    uint256 private _collectionIds;
    
    constructor(
        string memory _name,
        string memory _description,
        uint256 _mintPrice,
        uint256 _maxSupply,
        address _marketplace
    ) Ownable(msg.sender) {
        collectionInfo = Collection({
            name: _name,
            description: _description,
            mintPrice: _mintPrice,
            maxSupply: _maxSupply,
            currentSupply: 0,
            isActive: true
        });
        marketplace = _marketplace;
    }
    
    function updateMintPrice(uint256 newPrice) external onlyOwner {
        collectionInfo.mintPrice = newPrice;
    }
    
    function toggleActive() external onlyOwner {
        collectionInfo.isActive = !collectionInfo.isActive;
    }
    
    function createCollection(
        string memory name, 
        string memory description, 
        uint256 mintPrice, 
        uint256 maxSupply
    ) external {
        require(mintPrice > 0, "Mint price must be greater than 0");
        require(maxSupply > 0, "Max supply must be greater than 0");
        
        _collectionIds++;
        collections[_collectionIds] = Collection({
            name: name,
            description: description,
            mintPrice: mintPrice,
            maxSupply: maxSupply,
            currentSupply: 0,
            isActive: true
        });
    }
    
    function mintFromCollection(
        uint256 collectionId,
        string memory imageUrl
    ) external payable {
        Collection storage collection = collections[collectionId];
        require(collection.isActive, "Collection is not active");
        require(collection.currentSupply < collection.maxSupply, "Collection is sold out");
        require(msg.value >= collection.mintPrice, "Insufficient payment");

        // Tính phí platform (10%)
        uint256 platformFee = (msg.value * 10) / 100;
        
        // Lấy địa chỉ PenGuildPool từ marketplace contract
        address penGuildPool = INFTMarketplace(marketplace).penGuildPool();
        
        // Chuyển phí platform vào PenGuild pool
        (bool success,) = penGuildPool.call{value: platformFee}("");
        require(success, "Failed to send platform fee");
        
        // Chuyển phần còn lại cho creator
        (success,) = payable(owner()).call{value: msg.value - platformFee}("");
        require(success, "Failed to send payment to creator");

        // Mint NFT trước khi tăng currentSupply
        INFTMarketplace(marketplace).mintNFT{value: 0}(msg.sender, collectionId, imageUrl);
        
        collection.currentSupply++;
    }
}
