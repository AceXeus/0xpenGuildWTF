'use client'

import React, { useEffect, useState } from 'react'
import ScratchToMint from '@/components/scratch-to-mint'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/link-button'

const DemoRandomMint = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinted, setIsMinted] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleComplete = () => {
    setIsMinted(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold'>Next Update : Scratch & Mint NFT</DialogTitle>
          <DialogDescription className='text-center'>
            Scratch the card below to reveal and mint your random NFT! 🤯
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center justify-center p-4'>
          <ScratchToMint
            width={250}
            height={250}
            minScratchPercentage={50}
            className='flex items-center justify-center overflow-hidden border bg-gradient-to-r'
            onComplete={handleComplete}
            overlayImage={'/0xpenguild_overlay.jpg'}
          >
            <Image src={'/nft_demo.png'} height={200} width={200} alt='demo mint' className='size-full' />
          </ScratchToMint>
          <p className='mt-4 text-sm text-gray-500'>
            {isMinted ? "Congratulations! You've minted a unique NFT." : 'Scratch the card to reveal your NFT'}
          </p>
        </div>
        <DialogFooter className='flex justify-center'>
          {isMinted ? (
            <LinkButton href='https://x.com/0x_penGuildWTF' blankTarget className='w-full'>
              Hit up our X for the latest scoop!
            </LinkButton>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DemoRandomMint
