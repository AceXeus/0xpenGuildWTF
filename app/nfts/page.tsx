'use client'

import { useState } from 'react'
import { Sidebar } from '@/containers/nfts/sidebar'
import { NFTGrid } from '@/containers/nfts/nft-grid'

export default function NFTMarketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <NFTGrid />
    </div>
  )
}
