'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LeaderboardItem {
  id: number
  name: string
  avatar: string
  change: number
  itemsSold: number
  volume: number
}

interface LeaderboardProps {
  title: string
  description: string
  itemLabel: string
  data: {
    today: LeaderboardItem[]
    week: LeaderboardItem[]
    month: LeaderboardItem[]
    all: LeaderboardItem[]
  }
}

const LeaderList = ({ items, itemLabel }: { items: LeaderboardItem[]; itemLabel: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className='grid grid-cols-12 gap-4 text-sm text-muted-foreground'>
          <div className='col-span-6 flex items-center'>
            <span className='w-8'>#</span>
            Name
          </div>
          <div className='col-span-2 text-right'>Change</div>
          <div className='col-span-2 text-right'>{itemLabel}</div>
          <div className='col-span-2 text-right'>Volume</div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      {items.map((item) => (
        <div key={item.id} className='grid grid-cols-12 items-center gap-4 border-t py-4'>
          <div className='col-span-6 flex items-center gap-4'>
            <span className='w-8 text-base text-muted-foreground'>{item.id}</span>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback>
                {item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span className='text-base font-medium'>{item.name}</span>
          </div>
          <div className='col-span-2 text-right text-base text-highlight'>+{item.change}%</div>
          <div className='col-span-2 text-right text-base tabular-nums'>{item.itemsSold}</div>
          <div className='col-span-2 text-right text-base tabular-nums'>{item.volume} WND</div>
        </div>
      ))}
    </CardContent>
  </Card>
)

export default function Leaderboard({ title, description, itemLabel, data }: LeaderboardProps) {
  return (
    <div className='mx-auto w-full max-w-6xl p-6'>
      <div className='space-y-6'>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        <p className='text-xl text-muted-foreground'>{description}</p>
      </div>

      <Tabs defaultValue='today' className='mt-12'>
        <TabsList className='mb-8 grid w-full max-w-[400px] grid-cols-4'>
          <TabsTrigger value='today'>Today</TabsTrigger>
          <TabsTrigger value='week'>This Week</TabsTrigger>
          <TabsTrigger value='month'>This Month</TabsTrigger>
          <TabsTrigger value='all'>All Time</TabsTrigger>
        </TabsList>
        <TabsContent value='today'>
          <LeaderList items={data.today} itemLabel={itemLabel} />
        </TabsContent>
        <TabsContent value='week'>
          <LeaderList items={data.week} itemLabel={itemLabel} />
        </TabsContent>
        <TabsContent value='month'>
          <LeaderList items={data.month} itemLabel={itemLabel} />
        </TabsContent>
        <TabsContent value='all'>
          <LeaderList items={data.all} itemLabel={itemLabel} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
