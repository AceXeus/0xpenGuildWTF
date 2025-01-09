'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Phase {
  id: number
  title: string
  period: string
  description: string
  tasks: string[]
}

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  const phases: Phase[] = [
    {
      id: 1,
      title: "Foundation",
      period: "Q1 2025 (Jan - Mar)",
      description: "Building the core infrastructure and smart contracts",
      tasks: [
        "Complete NFT Marketplace smart contracts development",
        "Implement XP and reward systems",
        "Launch beta version on Moonbase Alpha testnet",
        "Establish randomized NFT minting mechanism"
      ]
    },
    {
      id: 2, 
      title: "Cross-Chain Integration",
      period: "Q2 2025 (Apr - Jun)",
      description: "Connecting Ethereum and Polkadot ecosystems",
      tasks: [
        "Integrate bridge between Ethereum and Polkadot networks",
        "Deploy token and reward distribution system",
        "Launch NFT collection creation and management features",
        "Optimize marketplace user experience"
      ]
    },
    {
      id: 3,
      title: "Community & Growth",
      period: "Q3-Q4 2025 (Jul - Dec)", 
      description: "Expanding features and community engagement",
      tasks: [
        "Launch time-limited NFT minting events",
        "Expand gamification system and community missions",
        "Integrate additional blockchains (Solana, Avalanche)",
        "Develop analytics tools for creators and collectors"
      ]
    },
    {
      id: 4,
      title: "Innovation & Expansion",
      period: "2026",
      description: "Platform maturity and ecosystem expansion",
      tasks: [
        "Implement decentralized platform governance",
        "Expand ecosystem with DeFi applications",
        "Develop GameFi and metaverse marketplace integration",
        "Optimize platform performance and scalability"
      ]
    }
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Development Roadmap
        </h1>

        <div className="space-y-6">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: phase.id * 0.2 }}
              className={`
                relative pl-8 pt-6 pb-2 
                border-l-2 border-primary/30
                ${expandedPhase === phase.id ? 'bg-primary/5 rounded-lg' : ''}
              `}
            >
              <div 
                className="cursor-pointer"
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              >
                <div className="absolute left-0 top-8 w-8 h-8 -translate-x-1/2 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                  {phase.id}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary mb-1">
                      Phase {phase.id}: {phase.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{phase.period}</p>
                    <p className="mt-2 text-muted-foreground">{phase.description}</p>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 transition-transform duration-300 ${
                      expandedPhase === phase.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedPhase === phase.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-3 list-none">
                      {phase.tasks.map((task, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span>{task}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
