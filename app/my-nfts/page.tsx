'use client'

import React, { useEffect, useState } from 'react'
import { getNFTsFromStorage, type StoredNFT } from '@/lib/local-storage'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

export default function MyNFTsPage() {
  const [nfts, setNfts] = useState<StoredNFT[]>([])

  useEffect(() => {
    setNfts(getNFTsFromStorage())
  }, [])

  if (nfts.length === 0) {
    return (
      <div className='min-h-screen bg-background text-foreground'>
        <div className='container mx-auto py-12'>
          <h1 className='mb-6 text-center text-4xl font-bold'>My NFTs</h1>
          <p className='text-center text-lg text-muted-foreground'>You haven't minted any NFTs yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='container mx-auto py-12'>
        <h1 className='mb-6 text-center text-4xl font-bold'>My NFTs</h1>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {nfts.map((nft, index) => (
            <div key={index} className='overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm'>
              <div className='relative aspect-square overflow-hidden rounded-md'>
                <Image src={nft.image} alt={`NFT #${index + 1}`} fill className='object-cover' />
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>NFT #{index + 1}</h3>
                <p className='text-sm text-muted-foreground'>
                  Minted {formatDistanceToNow(new Date(nft.mintedAt))} ago
                </p>
                <div className='mt-2'>
                  <h4 className='text-sm font-medium'>Attributes:</h4>
                  <div className='mt-1 grid grid-cols-2 gap-2'>
                    {nft.metadata.attributes.map((attr, attrIndex) => (
                      <div key={attrIndex} className='rounded-md bg-muted px-2 py-1 text-xs'>
                        <span className='font-medium'>{attr.trait_type}:</span> {attr.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
