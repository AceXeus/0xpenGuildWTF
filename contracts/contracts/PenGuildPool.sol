// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PenGuildPool is Ownable {
    event FundsReceived(address from, uint256 amount);
    event FundsWithdrawn(address to, uint256 amount);
    
    constructor() Ownable(msg.sender) {}
    
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
    
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);
        emit FundsWithdrawn(owner(), amount);
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
