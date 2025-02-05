import { HyperText } from '@/components/ui/hyper-text'
import { InteractiveHoverButton } from '@/components/ui/interactivebutton'
import { LinkButton } from '@/components/ui/link-button'
import Link from 'next/link'

const nftImages = ['/nft_01.png', '/nft_02.png', '/nft_03.png', '/nft_04.png', '/nft_05.png']

export default function HeroSection() {
  return (
    <section className='w-full bg-background px-2 py-12 xl:px-20'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-8 text-center'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
            The <span className='inline-block text-primary'>PenGuilds</span> are here.
          </h1>

          <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
            Rejoice, the PenGuilds have risen. Reach salvation through the 0x2142 mode activated on Polkadot.
          </p>

          <div className='mt-8 grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {nftImages.map((src, index) => (
              <div
                key={index}
                className={`relative aspect-square w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-1 ${index >= 2 ? 'hidden sm:block' : ''} ${index >= 3 ? 'hidden md:block' : ''} ${index >= 4 ? 'hidden lg:block' : ''}`}
              >
                <img src={src} alt={`NFT ${index + 1}`} className='h-full w-full object-cover' />
              </div>
            ))}
          </div>

          <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
            <LinkButton href='/nfts' className='bg-primary text-primary-foreground hover:bg-primary/90'>
              View the Collection
            </LinkButton>
            <LinkButton href='/our-story' variant={'outline'} className=''>
              Learn Our Story
            </LinkButton>
          </div>
          <Link href={'/mint'}>
            <InteractiveHoverButton text='Mint Your NFT' />
          </Link>
        </div>
      </div>
    </section>
  )
}
