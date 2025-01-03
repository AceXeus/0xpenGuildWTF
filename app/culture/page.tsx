'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Users, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

const cultureItems = [
  {
    icon: <Palette className='h-10 w-10 text-primary' />,
    title: 'Artistic Expression',
    description: 'We celebrate creativity and empower artists to push boundaries in the digital realm.'
  },
  {
    icon: <Users className='h-10 w-10 text-primary' />,
    title: 'Community-Driven',
    description: 'Our vibrant community of creators and collectors shapes the future of digital art.'
  },
  {
    icon: <Zap className='h-10 w-10 text-primary' />,
    title: 'Innovation',
    description: "We're at the forefront of blockchain technology, constantly evolving the NFT space."
  },
  {
    icon: <Globe className='h-10 w-10 text-primary' />,
    title: 'Global Accessibility',
    description: "We're breaking down barriers, making art accessible to everyone, everywhere."
  }
]

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

export default function CulturePage() {
  return (
    <div className='min-h-screen px-4 py-12'>
      <motion.div className='mx-auto max-w-4xl' variants={containerVariants} initial='hidden' animate='visible'>
        <motion.h1 className='mb-8 text-center text-4xl font-bold' variants={itemVariants}>
          Our Culture
        </motion.h1>
        <motion.p className='mb-12 text-center text-xl text-muted-foreground' variants={itemVariants}>
          At the heart of our NFT marketplace lies a vibrant culture that celebrates creativity, innovation, and
          community.
        </motion.p>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {cultureItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className='h-full transition-all hover:-translate-y-1'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-4'>
                    {item.icon}
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div className='mt-16 text-center' variants={itemVariants}>
          <h2 className='mb-4 text-2xl font-semibold'>Join Our Community</h2>
          <p className='mb-6 text-muted-foreground'>
            Be part of a revolutionary movement in digital art and collectibles. Connect with artists, collectors, and
            enthusiasts from around the world.
          </p>
          <Link
            href='/'
            className='inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90'
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
