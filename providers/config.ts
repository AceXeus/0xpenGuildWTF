import { http, createConfig } from '@wagmi/core';
import { moonbaseAlpha, moonbeam } from 'wagmi/chains'

// Define the Unique chain
const westendAssetHub = {
  id: 420420421, // Sửa thành 8880 hoặc "0x22b0"
  name: "Westend AssetHub",
  network: "westend",
  nativeCurrency: {
    name: "Westend",
    symbol: "WND",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://westend-asset-hub-eth-rpc.polkadot.io'],
      webSocket: ['wss://westend-asset-hub-eth-rpc.polkadot.io']
    },
  },
  blockExplorers: {
    default: { name: "Westend", url: "https://assethub-westend.subscan.io" },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [westendAssetHub, moonbaseAlpha, moonbeam], // Thêm uniqueChain vào mảng chains
  transports: {
    [420420421]: http("https://westend-asset-hub-eth-rpc.polkadot.io"),
    [moonbeam.id]: http(),
    [moonbaseAlpha.id]: http()
  },
})