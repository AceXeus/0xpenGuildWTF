'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NFTData {
  image: string
  metadata: {
    attributes: Array<{ trait_type: string; value: string }>
  }
}

export default function TestNFT() {
  const [nftData, setNftData] = useState<NFTData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateNFT = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/v1/random-nft')
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to generate NFT')
      }
      const data = await response.json()
      setNftData(data)
    } catch (err) {
      setError('An error occurred while generating the NFT')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>NFT Generator Tester</h1>
      <Button onClick={generateNFT} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Random NFT'}
      </Button>
      {error && <p className='mt-4 text-red-500'>{error}</p>}
      {nftData && (
        <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Generated NFT</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={nftData.image} alt='Generated NFT' width={300} height={300} className='rounded-lg' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {nftData.metadata.attributes.map((attr, index) => (
                  <li key={index}>
                    <strong>{attr.trait_type}:</strong> {attr.value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
