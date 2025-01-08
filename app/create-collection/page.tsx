'use client'

import React, { useState } from 'react'
import { useAccount, useChainId, useDeployContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Info } from 'lucide-react'
import { useContract } from '@/hooks/useContract'
import { useWriteContract } from 'wagmi'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CollectionForm {
  name: string
  description: string 
  mintPrice: string
  maxSupply: string
}

export default function CreatorCollectionPage() {

  const { address: wagmiAddress, isConnected } = useAccount();
  const { data: hash, error, isPending, isSuccess, writeContract } = useWriteContract();

  const { toast } = useToast()
  const [formData, setFormData] = useState<CollectionForm>({
    name: '',
    description: '',
    mintPrice: '',
    maxSupply: ''
  })
  const nftMarketplace = useContract('NFTMarketplace')
  const creatorCollection = useContract('CreatorCollection')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!wagmiAddress) {
        toast({
          title: 'Lỗi',
          description: 'Vui lòng kết nối ví trước',
          variant: 'destructive'
        })
        return
      }

      if (!nftMarketplace || !creatorCollection) {
        toast({
          title: 'Error',
          description: 'No contract found',
          variant: 'destructive'
        })
        return
      }

      const abiItem = {
        name: 'createCollection',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'mintPrice', type: 'uint256' },
          { name: 'maxSupply', type: 'uint256' }
        ],
        outputs: []
      }

      const tx = await writeContract({
        address: creatorCollection.address as `0x${string}`,
        abi: [abiItem],
        functionName: 'createCollection',
        args: [
          formData.name,
          formData.description, 
          parseEther(formData.mintPrice),
          BigInt(formData.maxSupply)
        ]
      })

      const abiRegisterCollection = {
        name: 'registerCollection',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ name: 'collectionAddress', type: 'address' }],
        outputs: []
      }
      
      const txRegisterCollection = await writeContract({
        address: nftMarketplace.address as `0x${string}`,
        abi: [abiRegisterCollection],
        functionName: 'registerCollection',
        args: [creatorCollection.address as `0x${string}`]
      })

      toast({
        title: 'Success!',
        description: `NFT Collection has been created ${tx}`,
        variant: 'default'
      })

      toast({
        title: 'Success!',
        description: `NFT Collection has been registered! ${txRegisterCollection}`,
        variant: 'default'
      })

    } catch (err) {
      toast({
        title: 'Transaction failed',
        description: error?.message || 'An error occurred. Please try again.',
        variant: 'destructive'
      })
    }
  }

  React.useEffect(() => {
    if (isSuccess && hash) {
      toast({
        title: 'Success!',
        description: 'NFT Collection has been created!',
        variant: 'default'
      })
      setFormData({
        name: '',
        description: '',
        mintPrice: '',
        maxSupply: ''
      })
    }
  }, [isSuccess, hash, toast])

  return (
    <div className='container mx-auto py-8'>
      <TooltipProvider>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create New NFT Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCollection} className='space-y-6'>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor='name' className="text-sm font-medium">Collection Name</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter a unique name for your NFT collection</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id='name'
                  name='name'
                  placeholder="e.g. Bored Ape Yacht Club"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor='description' className="text-sm font-medium">Description</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Describe what makes your collection unique</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id='description'
                  name='description'
                  placeholder="Tell the story behind your NFTs"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor='mintPrice' className="text-sm font-medium">Mint Price (ETH)</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set the price collectors will pay to mint each NFT</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id='mintPrice'
                  name='mintPrice'
                  type='number'
                  step='0.001'
                  placeholder="e.g. 0.08"
                  value={formData.mintPrice}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor='maxSupply' className="text-sm font-medium">Maximum Supply</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The total number of NFTs that can be minted in this collection</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id='maxSupply'
                  name='maxSupply'
                  type='number'
                  placeholder="e.g. 10000"
                  value={formData.maxSupply}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <Button 
                type='submit' 
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating collection...
                  </>
                ) : isSuccess ? (
                  'Success!'
                ) : (
                  'Create collection'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  )
}
