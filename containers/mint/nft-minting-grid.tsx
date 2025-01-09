'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import ScratchToMint from '@/components/scratch-to-mint'
import { parseEther } from 'viem'
import { writeContract } from 'viem/actions'
import { useContract } from '@/hooks/useContract'
import { useWriteContract } from 'wagmi'
import { saveNFTToStorage } from '@/lib/local-storage'

interface NFTData {
  image: string
  metadata: {
    attributes: Array<{ trait_type: string; value: string }>
  }
}

interface NFTMintingGridProps {
  nftCount: number
  onMintComplete: (selectedIndex: number) => void
}

const NFTMintingGrid: React.FC<NFTMintingGridProps> = ({ nftCount, onMintComplete }) => {
  const [isPaid, setIsPaid] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
  const [isMinted, setIsMinted] = useState(false)
  const [nftData, setNftData] = useState<NFTData[]>(
    Array(nftCount).fill({ image: '/placeholder.svg?height=200&width=200', metadata: { attributes: [] } })
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: hash, isPending, isSuccess, writeContract } = useWriteContract()
  const creatorCollection = useContract('CreatorCollection')

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)
    try {
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

      await writeContract({
        address: creatorCollection?.address as `0x${string}`,
        abi: [abiItem],
        functionName: 'createCollection',
        args: ['test', 'test', parseEther('1'), BigInt(100)]
      })

      const nftPromises = Array(nftCount)
        .fill(0)
        .map(() => fetch('/api/v1/random-nft').then((res) => res.json()))
      const nftResults = await Promise.all(nftPromises)
      setNftData(nftResults)
      setIsPaid(true)
      toast({
        title: 'Payment Successful',
        description: 'You can now select an NFT to mint.'
      })
    } catch (err) {
      setError('An error occurred while processing payment and generating NFTs')
      console.error(err)
      toast({
        title: 'Error',
        description: 'Failed to process payment and generate NFTs. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNFTSelect = (index: number) => {
    if (!isPaid || isMinted) return
    setSelectedNFT(index)
  }

  const handleComplete = () => {
    if (selectedNFT !== null && !isMinted) {
      setIsMinted(true)
      const selectedNFTData = nftData[selectedNFT]
      saveNFTToStorage({
        ...selectedNFTData,
        mintedAt: new Date().toISOString()
      })
      onMintComplete(selectedNFT)
      toast({
        title: 'NFT Minted Successfully',
        description: `You have minted NFT`
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center space-y-8'
    >
      <Button
        onClick={handlePayment}
        disabled={isLoading || isPaid}
        className='rounded-md px-4 py-2 font-bold shadow-sm transition duration-300 ease-in-out hover:shadow-md'
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Processing Payment...
          </>
        ) : isPaid ? (
          'Payment Completed'
        ) : (
          'Pay to Unlock NFTs'
        )}
      </Button>
      {error && <p className='text-red-500'>{error}</p>}
      <motion.div
        className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial='hidden'
        animate='show'
      >
        {nftData.map((nft, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              show: { opacity: 1, scale: 1 }
            }}
          >
            <ScratchToMint
              width={250}
              height={250}
              minScratchPercentage={55}
              className={`flex items-center justify-center overflow-hidden rounded-md border-2 shadow-sm transition-all duration-300 ${
                selectedNFT === index ? 'border-primary ring-2 ring-primary' : 'border-border'
              } ${!isPaid || (isMinted && selectedNFT !== index) ? 'pointer-events-none opacity-50' : ''}`}
              onComplete={handleComplete}
              overlayImage={'/0xpenguild_overlay.jpg'}
              disabled={!isPaid || (selectedNFT !== null && selectedNFT !== index) || isMinted}
              onClick={() => handleNFTSelect(index)}
            >
              <Image
                src={nft.image}
                height={200}
                width={200}
                alt={`NFT #${index + 1}`}
                className='size-full rounded-md'
              />
            </ScratchToMint>
          </motion.div>
        ))}
      </motion.div>
      {!isPaid && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-center text-base text-muted-foreground'
        >
          Pay to unlock and mint your exclusive NFT
        </motion.p>
      )}
      {isPaid && !isMinted && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-center text-base text-muted-foreground'
        >
          Select an NFT to mint by scratching the overlay
        </motion.p>
      )}
    </motion.div>
  )
}

export default NFTMintingGrid
