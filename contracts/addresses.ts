export const SUPPORTED_CHAINS = {
  MOONBASE: 1287,
  SEPOLIA: 11155111,
} as const

type ChainAddresses = {
  NFTMarketplace: string
  PenGuildPool: string
  XPSystem: string
  CreatorCollection: string
  explorer: string
}

type ContractAddresses = {
  [chainId: number]: ChainAddresses
}

export const CONTRACT_ADDRESSES: ContractAddresses = {
  [SUPPORTED_CHAINS.MOONBASE]: {
    NFTMarketplace: "0x490cbd4F4EE5a26bdC459014d35a8e16E5093715",
    PenGuildPool: "0xaFD97969fD3Be09F4227f0609f5bfb74f1526767", 
    XPSystem: "0xB6E7470eBA815903B0D07B41008C122082a2FB5D",
    CreatorCollection: "0x62a2b60A8cbDBa5aE22a37D7B513dfc70378C35c",
    explorer: "https://moonbase.moonscan.io"
  },
}
