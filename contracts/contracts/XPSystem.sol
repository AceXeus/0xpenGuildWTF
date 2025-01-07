// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract XPSystem is Ownable {
    mapping(address => uint256) public userXP;
    mapping(uint256 => uint256) public nftXP;
    mapping(address => mapping(uint256 => bool)) public hasNFTXP;
    
    constructor() Ownable(msg.sender) {}
    
    event XPUpdated(address user, uint256 newXP);
    event NFTXPAssigned(uint256 tokenId, uint256 xpAmount);
    
    function generateRandomXP(uint256 tokenId) external returns (uint256) {
        uint256 xp = uint256(keccak256(abi.encodePacked(block.timestamp, tokenId))) % 100 + 1;
        nftXP[tokenId] = xp;
        emit NFTXPAssigned(tokenId, xp);
        return xp;
    }
    
    function updateUserXP(address user, uint256 tokenId, bool isAdd) external {
        uint256 xpAmount = nftXP[tokenId];
        
        if(isAdd) {
            require(!hasNFTXP[user][tokenId], "User already has XP for this NFT");
            userXP[user] += xpAmount;
            hasNFTXP[user][tokenId] = true;
        } else {
            require(hasNFTXP[user][tokenId], "User does not have XP for this NFT");
            if (userXP[user] >= xpAmount) {
                userXP[user] -= xpAmount;
            } else {
                userXP[user] = 0;
            }
            hasNFTXP[user][tokenId] = false;
        }
        
        emit XPUpdated(user, userXP[user]);
    }
}
