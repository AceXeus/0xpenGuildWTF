'use client'

import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import NFTMintingGrid from '@/containers/mint/nft-minting-grid'

export default function MintNFTPage() {
  const handleMintComplete = (selectedIndex: number) => {
    console.log(`NFT at index ${selectedIndex} has been minted`)
    // Thêm logic xử lý sau khi mint thành công
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='container mx-auto py-12'>
        <h1 className='mb-6 text-center text-4xl font-bold'>Mint Your Exclusive NFT</h1>
        <p className='mb-10 text-center text-lg text-muted-foreground'>
          Choose your favorite design and bring it to life on the blockchain
        </p>
        <NFTMintingGrid nftCount={8} onMintComplete={handleMintComplete} />
        <Toaster />
      </div>
    </div>
  )
}
