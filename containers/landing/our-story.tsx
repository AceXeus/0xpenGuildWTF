'use client'

import Image from 'next/image'
import { LinkButton } from '@/components/ui/link-button'
import { HyperText } from '@/components/ui/hyper-text'

export default function OurStory() {
  return (
    <section className='flex w-full items-center justify-center bg-black py-12 text-white transition-colors duration-200 dark:bg-white dark:text-gray-900 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div data-aos='fade-left' className='lg:order-last'>
            <Image
              src='/ourstory.jpeg'
              width={600}
              height={400}
              alt='NFT Collage'
              className='mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full'
            />
          </div>
          <div data-aos='fade-right' className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                <HyperText startOnView>Our Story</HyperText>
              </h2>
              <p className='max-w-[600px] md:text-xl'>
                We started our journey in the world of NFTs with a simple vision: to revolutionize digital ownership and
                empower artists. Our passion for blockchain technology and digital art drove us to create a platform
                where creativity knows no bounds.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <LinkButton
                href='/our-story'
                variant='secondary'
                className='bg-secondary text-secondary-foreground hover:bg-secondary/80'
              >
                <HyperText>Learn More</HyperText>
              </LinkButton>
              <LinkButton variant={'outline'} href='/nfts' className='bg-primary text-primary-foreground'>
                <HyperText>Our Collection</HyperText>
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
