import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'

const nftImages = ['/nft_01.jpg', '/nft_02.jpg', '/nft_03.jpg', '/nft_04.jpg', '/nft_05.jpg']

export default function HeroSection() {
  return (
    <section className='w-full bg-background px-2 py-12 xl:px-20'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-8 text-center'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
            The <span className='text-primary'>PenGuilds</span> are here.
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
            <LinkButton
              href='/our-story'
              variant='secondary'
              className='bg-secondary text-secondary-foreground hover:bg-secondary/80'
            >
              Learn Our Story
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
