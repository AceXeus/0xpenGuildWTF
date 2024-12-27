'use client'

import * as React from 'react'

import { GradualSpacing } from '@/components/gradualspacing'
import { TweetGrid } from '@/components/tweetgrid'

// Grab tweet ids
const exampleTweets = ['1871628939921346581', '1871182539253313855', '1871145404286578778', '1871147817483616335']

export function TweetGridSection({}) {
  return (
    <div className='w-full px-2 xl:px-20'>
      <div className='flex w-full justify-center pb-12'>
        <GradualSpacing
          className='font-display text-center text-3xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]'
          text='Explore Tweets'
        />
      </div>
      <div className='flex w-full items-center justify-center'>
        <TweetGrid className='w-full md:w-full' tweets={exampleTweets} columns={3} spacing='lg' />
      </div>
    </div>
  )
}
