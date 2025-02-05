'use client'

import ConnectWalletBtn from '@/components/connect-wallet-btn'
import StartHighlight from '@/components/start-highlight'
import { ThemeToggle } from '@/components/theme-toggle'
import { Separator } from '@/components/ui/separator'
import {
  IconArrowRight,
  IconBrandDiscordFilled,
  IconBrandTelegram,
  IconBrandX,
  IconMenu2,
  IconChevronDown
} from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

const MENU_ITEMS = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'My NFTs', href: '/my-nfts' }
  ],
  about_us: [
    { label: 'Culture', href: '/culture' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Ranking', href: '/ranking' }
  ],
  marketplace: [
    { label: 'NFTS', href: '/nfts' },
    { label: 'Create Collection', href: '/create-collection' },
    { label: 'Mint', href: '/mint' }
  ]
}

function Header() {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <div className={`fixed left-0 right-0 top-0 z-[100] border-b border-border bg-background uppercase`}>
      <div className='relative flex items-center justify-between bg-primary px-20 py-[0.60rem] text-[0.5rem] font-normal leading-5 text-primary-foreground lg:text-xs'>
        <StartHighlight />
        <div className='absolute left-1/2 top-1/2 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-nowrap'>
          <p className='font-normal'>
            <span className='text-highlight'>TESTNET</span> IS LIVE!
          </p>
          <Separator className='h-4 w-px' orientation='vertical' />
          <Link href='/about-testnet' className='flex items-center gap-2 text-nowrap text-primary-foreground'>
            Learn more about Testnets
            <IconArrowRight className='h-3 w-3' />
          </Link>
        </div>
        <StartHighlight />
      </div>
      {/* Desktop */}
      <div className='hidden xl:block'>
        <div className='relative z-10 flex items-center justify-between px-20 pb-4 pt-6'>
          <div className='absolute left-1/2 top-1/2 mb-8 -translate-x-1/2 -translate-y-1/2'>
            <Logo />
          </div>
          <div className='flex h-7 items-center gap-6 text-xs font-normal leading-5'>
            {MENU_ITEMS.main.map((item, index) => (
              <div key={index}>
                <Link
                  className='relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
                  href={item.href}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className='group relative'>
              <button className='flex items-center gap-1'>
                About Us
                <IconChevronDown className='h-4 w-4' />
              </button>
              <div className='absolute top-full hidden min-w-[200px] pt-2 group-hover:block'>
                <div className='rounded-md border border-border bg-background p-2 shadow-lg'>
                  {MENU_ITEMS.about_us.map((item, index) => (
                    <Link key={index} href={item.href} className='block rounded-sm px-4 py-2 hover:bg-muted'>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className='group relative'>
              <button className='flex items-center gap-1'>
                Marketplace
                <IconChevronDown className='h-4 w-4' />
              </button>
              <div className='absolute top-full hidden min-w-[200px] pt-2 group-hover:block'>
                <div className='rounded-md border border-border bg-background p-2 shadow-lg'>
                  {MENU_ITEMS.marketplace.map((item, index) => (
                    <Link key={index} href={item.href} className='block rounded-sm px-4 py-2 hover:bg-muted'>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex h-7 items-center gap-4 text-xs font-normal leading-5'>
            <div className='hidden 2xl:block'>
              <div>
                <Link
                  className='relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
                  href='/about-us'
                >
                  About Us
                </Link>
              </div>
              <Separator orientation='vertical' />
            </div>
            <Socials />
            <Separator orientation='vertical' />
            <ThemeToggle />
            <ConnectWalletBtn />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className='block xl:hidden'>
        <div className='relative z-10 flex items-center justify-between px-4 py-4'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Logo />
          </div>
          <IconMenu2 onClick={toggleOpen} className='ml-auto h-4 w-4' />
        </div>

        {open && (
          <div className='flex flex-col gap-8 px-4 py-4'>
            <div className='flex flex-col items-center gap-4'>
              {MENU_ITEMS.main.map((item, index) => (
                <div key={index}>
                  <Link href={`/${item.href}`}>{item.label}</Link>
                </div>
              ))}
              <Link href='/about-us'>About Us</Link>
              <ConnectWalletBtn />
            </div>
            <Socials />
            <div className='flex justify-center'>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <div className='flex items-center'>
      <Link href={'/'} className='text-2xl font-bold normal-case'>
        0xpenGuildWTF
      </Link>
    </div>
  )
}

const Socials = () => {
  return (
    <div className='flex items-center justify-center gap-10 lg:gap-4'>
      <Link href='https://discord.gg/xYrqGnUgqp' target='_blank' aria-label='Join our Discord community'>
        <IconBrandDiscordFilled className='size-6 lg:size-4' />
      </Link>
      <Link
        target='_blank'
        href='https://x.com/0x_penGuildWTF'
        aria-label='Visit our X (formerly Twitter) profile'
        rel='noopener noreferrer'
      >
        <IconBrandX className='size-6 lg:size-4' />
      </Link>
      <Link href='https://t.me/xpenGuildWTF' target='_blank' aria-label='Join us on Telegram'>
        <IconBrandTelegram className='size-6 lg:size-4' />
      </Link>
    </div>
  )
}

export default Header
