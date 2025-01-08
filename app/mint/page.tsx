'use client'

import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import NFTMintingGrid from '@/containers/mint/nft-minting-grid'
import { useContract } from '@/hooks/useContract'
import { writeContract } from 'viem/actions'
import { useAccount, useWriteContract } from 'wagmi'
import { toast } from '@/hooks/use-toast'

export default function MintNFTPage() {
  const nftMarketplace = useContract('NFTMarketplace')
  const creatorCollection = useContract('CreatorCollection')
  const penGuildPool = useContract('PenGuildPool')
  const { address: wagmiAddress } = useAccount()
  const { data: hash, error, isPending, isSuccess, writeContract } = useWriteContract()

  const handleMintComplete = async (selectedIndex: number) => {
    console.log(`NFT at index ${selectedIndex} has been minted`)

    const abiMintFromCollection = {
      name: 'mintFromCollection',
      type: 'function',
      stateMutability: 'payable',
      inputs: [{ name: 'collectionId', type: 'uint256' }, { name: 'tokenURI', type: 'string' }],
      outputs: []
    }

    const tx = await writeContract({
      address: creatorCollection?.address as `0x${string}`,
      abi: [abiMintFromCollection],
      functionName: 'mintFromCollection',
      args: [BigInt(7), 'https://example.com/nft/1.png'],
      value: BigInt(100 * selectedIndex)
    })

    toast({
      title: 'Success!',
      description: `NFT has been minted! ${tx}`,
      variant: 'default'
    })
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
