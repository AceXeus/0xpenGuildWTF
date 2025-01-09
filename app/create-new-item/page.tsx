'use client'

import React, { useState, useEffect } from 'react'
import { useAccount, useContractRead, usePublicClient } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useContract } from '@/hooks/useContract'
import { useWriteContract } from 'wagmi'
import Image from 'next/image'
import { parseEther } from 'viem'

interface NFTDetails {
  tokenId: bigint
  creator: string
  xpPoints: bigint
  mintPrice: bigint
  isListed: boolean
  listingPrice: bigint
  imageUrl: string
}

export default function ListNFTPage() {
  const { address: wagmiAddress } = useAccount()
  const publicClient = usePublicClient()
  const { toast } = useToast()
  const nftMarketplace = useContract('NFTMarketplace')
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const [price, setPrice] = useState('')
  const [ownedNFTs, setOwnedNFTs] = useState<NFTDetails[]>([])
  const [selectedNFT, setSelectedNFT] = useState<NFTDetails | null>(null)

  // Read current tokenId from contract
  const { data: currentTokenId } = useContractRead({
    address: nftMarketplace?.address as `0x${string}`,
    abi: nftMarketplace?.abi,
    functionName: 'getTokenId',
  })

  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!wagmiAddress || !currentTokenId || !nftMarketplace?.address || !nftMarketplace?.abi || !publicClient) return

      const ownedTokens: NFTDetails[] = []
      
      for (let i = 1; i <= Number(currentTokenId); i++) {
        try {
          const owner = await publicClient.readContract({
            address: nftMarketplace.address as `0x${string}`,
            abi: nftMarketplace.abi,
            functionName: 'ownerOf',
            args: [BigInt(i)]
          }) as `0x${string}`

          if (owner.toLowerCase() === wagmiAddress.toLowerCase()) {
            const details = await publicClient.readContract({
              address: nftMarketplace.address as `0x${string}`,
              abi: nftMarketplace.abi,
              functionName: 'nftDetails',
              args: [BigInt(i)]
            }) as NFTDetails
            
            ownedTokens.push(details)
          }
        } catch (err) {
          console.error(`Error fetching NFT ${i}:`, err)
        }
      }
      setOwnedNFTs(ownedTokens)
    }

    fetchOwnedNFTs()
  }, [wagmiAddress, currentTokenId, nftMarketplace, publicClient])

  const handleListNFT = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedNFT || !price) {
      toast({
        title: 'Error',
        description: 'Please select an NFT and enter price',
        variant: 'destructive'
      })
      return
    }

    try {
      const abiListNFT = {
        name: 'listNFTForSale',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'tokenId', type: 'uint256' },
          { name: 'price', type: 'uint256' }
        ],
        outputs: []
      }

      await writeContract({
        address: nftMarketplace?.address as `0x${string}`,
        abi: [abiListNFT],
        functionName: 'listNFTForSale',
        args: [selectedNFT.tokenId, parseEther(price)]
      })

      toast({
        title: 'Success!',
        description: 'NFT has been listed for sale',
        variant: 'default'
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: error?.message || 'An error occurred while listing the NFT',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='container mx-auto py-8'>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">List Your NFT For Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Your NFTs</h3>
              <div className="grid grid-cols-2 gap-4">
                {ownedNFTs.map((nft) => (
                  <div
                    key={String(nft.tokenId)}
                    className={`cursor-pointer rounded-lg border-2 p-2 ${
                      selectedNFT?.tokenId === nft.tokenId ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setSelectedNFT(nft)}
                  >
                    <Image
                      src={nft.imageUrl}
                      alt={`NFT #${nft.tokenId}`}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                    <p className="mt-2 text-sm">Token ID: {String(nft.tokenId)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleListNFT} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Sale Price (WND)</label>
                  <Input
                    type="number"
                    step="0.001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Example: 0.1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!selectedNFT || !price || isPending}
                  className="w-full"
                >
                  {isPending ? 'Processing...' : 'List NFT'}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
