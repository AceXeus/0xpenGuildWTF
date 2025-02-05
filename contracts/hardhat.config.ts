import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    moonbaseAlpha: {
      chainId: 1287,
      url: `${process.env.MOONBASE_RPC_NETWORK}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    westend: {
      chainId: 420420421,
      url: `${process.env.WESTEND_RPC_NETWORK}`,
      accounts: [process.env.PRIVATE_KEY || ""],
      gasPrice: "auto",
      gas: "auto"
    },
  }
};

export default config;
