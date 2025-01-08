// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  // Deploy PenGuildPool before
  const penGuildPool = m.contract("PenGuildPool", []);

  // Deploy XPSystem
  const xpSystem = m.contract("XPSystem", []);

  // Deploy NFTMarketplace with PenGuildPool and XPSystem address
  const nftMarketplace = m.contract("NFTMarketplace", [
    penGuildPool,
    xpSystem
  ]);

  // Deploy CreatorCollection 
  const creatorCollection = m.contract("CreatorCollection", [
    "Default Collection", // name
    "Default Description", // description  
    "100000000000000000", // mintPrice (0.1 ETH)
    100, // maxSupply
    nftMarketplace
  ]);

  return { 
    penGuildPool,
    xpSystem,
    nftMarketplace,
    creatorCollection
  };
});

export default NFTMarketplaceModule;
