'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { BarChartIcon as ChartBar, Users } from 'lucide-react'

function RankingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <motion.div className='w-full max-w-4xl' variants={containerVariants} initial='hidden' animate='visible'>
        <motion.h1 className='mb-10 text-center text-4xl font-bold tracking-tight' variants={itemVariants}>
          0xpenGuild Rankings
        </motion.h1>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          <motion.div variants={itemVariants}>
            <Link href='/ranking/creator' className='block h-full'>
              <Card className='h-full transition-all hover:-translate-y-1'>
                <CardContent className='flex h-64 flex-col items-center justify-center p-6'>
                  <ChartBar className='mb-4 h-16 w-16 text-primary' />
                  <h2 className='mb-2 text-2xl font-semibold'>Creator Rankings</h2>
                  <p className='text-center text-muted-foreground'>Discover top NFT creators and their achievements</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href='/ranking/minter' className='block h-full'>
              <Card className='h-full transition-all hover:-translate-y-1'>
                <CardContent className='flex h-64 flex-col items-center justify-center p-6'>
                  <Users className='mb-4 h-16 w-16 text-primary' />
                  <h2 className='mb-2 text-2xl font-semibold'>Minter Rankings</h2>
                  <p className='text-center text-muted-foreground'>See who's leading the pack in NFT minting</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default RankingPage
