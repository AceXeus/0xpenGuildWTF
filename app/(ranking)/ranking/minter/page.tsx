import Leaderboard from '@/containers/ranking/leaderboard'

const minterData = {
  today: [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 2.5,
      itemsSold: 15,
      volume: 3.2
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.8,
      itemsSold: 12,
      volume: 2.8
    },
    {
      id: 3,
      name: 'Charlie Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 1.2,
      itemsSold: 10,
      volume: 2.1
    },
    {
      id: 4,
      name: 'Diana Prince',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 0.9,
      itemsSold: 8,
      volume: 1.7
    }
  ],
  week: [
    {
      id: 1,
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 5.2,
      itemsSold: 45,
      volume: 9.8
    },
    {
      id: 2,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 4.7,
      itemsSold: 40,
      volume: 8.5
    },
    {
      id: 3,
      name: 'Diana Prince',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 3.9,
      itemsSold: 35,
      volume: 7.2
    },
    {
      id: 4,
      name: 'Charlie Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 3.1,
      itemsSold: 30,
      volume: 6.4
    }
  ],
  month: [
    {
      id: 1,
      name: 'Charlie Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 12.5,
      itemsSold: 150,
      volume: 32.5
    },
    {
      id: 2,
      name: 'Diana Prince',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 11.2,
      itemsSold: 135,
      volume: 28.9
    },
    {
      id: 3,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 10.1,
      itemsSold: 120,
      volume: 25.7
    },
    {
      id: 4,
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 9.3,
      itemsSold: 110,
      volume: 23.6
    }
  ],
  all: [
    {
      id: 1,
      name: 'Diana Prince',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 25.8,
      itemsSold: 520,
      volume: 112.4
    },
    {
      id: 2,
      name: 'Charlie Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 23.5,
      itemsSold: 480,
      volume: 103.6
    },
    {
      id: 3,
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 21.7,
      itemsSold: 450,
      volume: 97.2
    },
    {
      id: 4,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      change: 20.1,
      itemsSold: 420,
      volume: 90.7
    }
  ]
}

export default function MinterRankingPage() {
  return (
    <main className='min-h-screen py-12'>
      <Leaderboard
        title='Top Minters'
        description="See who's minting the most NFTs on our platform."
        itemLabel='NFTs Minted'
        data={minterData}
      />
    </main>
  )
}
