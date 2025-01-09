export interface StoredNFT {
  image: string
  metadata: {
    attributes: Array<{ trait_type: string; value: string }>
  }
  mintedAt: string
}

const LOCAL_STORAGE_KEY = 'minted_nfts'

export const saveNFTToStorage = (nft: StoredNFT) => {
  try {
    const existingNFTs = getNFTsFromStorage()
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...existingNFTs, nft]))
  } catch (error) {
    console.error('Error saving NFT to localStorage:', error)
  }
}

export const getNFTsFromStorage = (): StoredNFT[] => {
  try {
    const nfts = localStorage.getItem(LOCAL_STORAGE_KEY)
    return nfts ? JSON.parse(nfts) : []
  } catch (error) {
    console.error('Error getting NFTs from localStorage:', error)
    return []
  }
} 