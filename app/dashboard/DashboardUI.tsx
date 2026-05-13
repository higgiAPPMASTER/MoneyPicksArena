'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const SPORTS = [
  {
    id: 'mlb',
    emoji: '⚾',
    name: 'MLB MoneyBall',
    sport: 'Baseball',
    color: 'blue',
    tabActive: 'border-blue-400 text-blue-400',
    badge: 'bg-blue-600',
    url: process.env.NEXT_PUBLIC_MLB_URL ?? '',
    description: 'Daily baseball picks built on career stats vs the opposing pitcher, home/away splits, and hot streak data. Picks are scored and ranked — top 9 players displayed.',
    features: [
      'Career BA vs Today\'s Pitcher (min 4 AB)',
      'Home / Away Splits (2026 Season)',
      'H/A Game Log vs Today\'s Opponent',
      'ESPN Day / Night BA Filter',
      'Team ERA Step — cuts vs top 5 ERA teams',
    ],
    season: 'MLB Season',
  },
  {
    id: 'nhl',
    emoji: '🏒',
    name: 'NHL Money Shots',
    sport: 'Hockey',
    color: 'green',
    tabActive: 'border-green-400 text-green-400',
    badge: 'bg-green-700',
    url: process.env.NEXT_PUBLIC_NHL_URL ?? '',
    description: 'Daily shots-on-goal picks powered by the NHL Stats API game logs and real FanDuel sportsbook lines. Hit rate calculated from last 10 H/A games.',
    features: [
      'Avg Shots Per Game ≥ 1.5',
      'Career Shots vs Opponent (H/A)',
      'Last 10 H/A Game Shots Hit Rate',
      'Live FanDuel Sportsbook Lines',
      'Fallback: DraftKings → Season Avg',
    ],
    season: 'NHL Season',
  },
  {
    id: 'nba',
    emoji: '🏀',
    name: 'NBA Money Buckets',
    sport: 'Basketball',
    color: 'purple',
    tabActive: 'border-purple-400 text-purple-400',
    badge: 'bg-purple-700',
    url: process.env.NEXT_PUBLIC_NBA_URL ?? '',
    description: 'Pattern-based picks for Points, Rebounds, Assists, and 3PM. Only shows players hitting 75%+ against today\'s specific opponent in H/A splits across 4 seasons of logs.',
    features: [
      '75%+ Hit Rate vs Today\'s Opponent',
      'H/A Splits (4 Seasons of Logs)',
      'Points, Rebounds, Assists, 3PM',
      'Real Sportsbook Lines',
      'L10 vs Team Performance',
    ],
    season: 'NBA Season',
  },
  {
    id: 'nfl',
    emoji: '🏈',
    name: 'NFL Money Bombs',
    sport: 'Football',
    color: 'amber',
    tabActive: 'border-amber-400 text-amber-400',
    badge: 'bg-amber-700',
    url: process.env.NEXT_PUBLIC_NFL_URL ?? '',
    description: 'Weekly NFL player prop picks built on historical game log data and opponent matchup analysis. Updated each week of the NFL season.',
    features: [
      'Player Prop Analysis',
      'Opponent Matchup Grades',
      'Historical Performance Data',
      'Weekly Picks (NFL Schedule)',
      'Real Sportsbook Lines',
    ],
    season: 'NFL Season',
  },
]

export default function DashboardUI({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState(0)
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const sport = SPORTS[activeTab]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header className="border-b border-[#1a1a1a] bg-[#0d0d0d] shrink-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <span className="font-black text-white tracking-wider hidden sm:block">MONEY PICKS ARENA</span>
            <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
              ✓ ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm hidden md:block">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── SPORT TABS ────────────────────────────────────────────────── */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] shrink-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none">
            {SPORTS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-4 border-b-2 whitespace-nowrap transition-all text-sm font-bold ${
                  activeTab === i
                    ? s.tabActive
                    : 'border-transparent text-gray-600 hover:text-gray-300'
                }`}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="hidden sm:inline">{s.name}</span>
                <span className="sm:hidden">{s.sport}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full text-center">
          <span className="text-8xl mb-6 block">{sport.emoji}</span>

          <span className={`text-xs font-black px-3 py-1 rounded ${sport.badge} text-white tracking-widest uppercase mb-3 inline-block`}>
            {sport.sport}
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{sport.name}</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">{sport.description}</p>

          {/* Features */}
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 mb-8 text-left">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-4">Algorithm Steps</p>
            <div className="space-y-2.5">
              {sport.features.map((f, idx) => (
                <div key={f} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {sport.url ? (
            <a
              href={sport.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-black text-xl py-5 px-12 rounded-2xl transition-all hover:scale-105 glow-gold"
            >
              🎯 OPEN LIVE PICKS
            </a>
          ) : (
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
              <p className="text-gray-500">App URL not configured yet. Check back soon!</p>
            </div>
          )}

          <p className="text-gray-700 text-xs mt-4">Opens in a new tab &nbsp;•&nbsp; Logged in as subscriber</p>
        </div>
      </div>
    </div>
  )
}
