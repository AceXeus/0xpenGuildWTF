import DemoRandomMint from '@/containers/dialog-marketing/demo-random-mint'
import HeroSection from '@/containers/landing/hero-section'
import { IntegrationsSection } from '@/containers/landing/integrations'
import OurStory from '@/containers/landing/our-story'
import { TweetGridSection } from '@/containers/landing/tweet-grid'

export default function Home() {
  return (
    <>
      <DemoRandomMint />
      <HeroSection />
      <IntegrationsSection />
      <OurStory />
      <TweetGridSection />
    </>
  )
}
