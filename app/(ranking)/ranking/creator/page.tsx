import Leaderboard from '@/containers/ranking/leaderboard'

const creatorData = {
  today: [
    {
      id: 1,
      name: 'Jaydon Ekstrom Bothman',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.41,
      itemsSold: 602,
      volume: 12.4
    },
    {
      id: 2,
      name: 'Ruben Carder',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.41,
      itemsSold: 602,
      volume: 12.4
    },
    {
      id: 3,
      name: 'Alfredo Septimus',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.41,
      itemsSold: 602,
      volume: 12.4
    },
    {
      id: 4,
      name: 'Davis Franci',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.41,
      itemsSold: 602,
      volume: 12.4
    }
  ],
  week: [
    {
      id: 1,
      name: 'Ruben Carder',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 2.15,
      itemsSold: 875,
      volume: 18.2
    },
    {
      id: 2,
      name: 'Jaydon Ekstrom Bothman',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.89,
      itemsSold: 710,
      volume: 15.8
    },
    {
      id: 3,
      name: 'Davis Franci',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.63,
      itemsSold: 645,
      volume: 13.9
    },
    {
      id: 4,
      name: 'Alfredo Septimus',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.41,
      itemsSold: 590,
      volume: 12.4
    }
  ],
  month: [
    {
      id: 1,
      name: 'Alfredo Septimus',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 3.28,
      itemsSold: 1245,
      volume: 28.5
    },
    {
      id: 2,
      name: 'Davis Franci',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 2.94,
      itemsSold: 1100,
      volume: 24.8
    },
    {
      id: 3,
      name: 'Ruben Carder',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 2.67,
      itemsSold: 980,
      volume: 21.2
    },
    {
      id: 4,
      name: 'Jaydon Ekstrom Bothman',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 2.35,
      itemsSold: 875,
      volume: 19.5
    }
  ],
  all: [
    {
      id: 1,
      name: 'Davis Franci',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 5.32,
      itemsSold: 2450,
      volume: 45.8
    },
    {
      id: 2,
      name: 'Alfredo Septimus',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 4.85,
      itemsSold: 2100,
      volume: 38.2
    },
    {
      id: 3,
      name: 'Ruben Carder',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 4.25,
      itemsSold: 1850,
      volume: 32.4
    },
    {
      id: 4,
      name: 'Jaydon Ekstrom Bothman',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 3.98,
      itemsSold: 1620,
      volume: 28.9
    }
  ]
}

export default function CreatorRankingPage() {
  return (
    <main className='min-h-screen'>
      <Leaderboard
        title='Top Creators'
        description='Check out top ranking NFT artists on the NFT Marketplace.'
        itemLabel='NFTs Sold'
        data={creatorData}
      />
    </main>
  )
}
