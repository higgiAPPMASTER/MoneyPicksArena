import Link from 'next/link'

const SPORTS = [
  {
    emoji: '⚾',
    name: 'MLB MoneyBall',
    badge: 'BASEBALL',
    gradient: 'from-blue-600 to-blue-900',
    border: 'hover:border-blue-500/50',
    features: ['Career BA vs Today\'s Pitcher', 'Home / Away Splits', '2026 Season BA Filter', 'ESPN Day / Night Filter'],
    desc: 'Daily baseball picks built on career stats vs the opposing pitcher, H/A splits, and hot streak data.',
  },
  {
    emoji: '🏒',
    name: 'NHL Money Shots',
    badge: 'HOCKEY',
    gradient: 'from-green-600 to-green-900',
    border: 'hover:border-green-500/50',
    features: ['Shots Per Game ≥ 1.5', 'Career vs Opponent', 'H/A Hit Rate', 'Real FanDuel Lines'],
    desc: 'Daily shots-on-goal picks powered by the NHL Stats API and live sportsbook lines from FanDuel.',
  },
  {
    emoji: '🏀',
    name: 'NBA Money Buckets',
    badge: 'BASKETBALL',
    gradient: 'from-purple-600 to-purple-900',
    border: 'hover:border-purple-500/50',
    features: ['75%+ Hit Rate Filter', 'H/A Opponent Splits', 'Pts / Reb / Ast / 3PM', 'Sportsbook Lines'],
    desc: 'Pattern-based picks for Points, Rebounds, Assists, and 3-Pointers — only 75 %+ hit rate vs today\'s opponent.',
  },
  {
    emoji: '🏈',
    name: 'NFL Money Bombs',
    badge: 'FOOTBALL',
    gradient: 'from-amber-600 to-orange-900',
    border: 'hover:border-amber-500/50',
    features: ['Player Props', 'Matchup Analysis', 'Historical Data', 'Weekly Picks'],
    desc: 'Weekly NFL player prop picks using deep historical data and opponent matchup analysis.',
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="font-black text-white tracking-wider text-lg">MONEY PICKS ARENA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Login
            </Link>
            <Link
              href="/subscribe"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black py-2 px-5 rounded-lg text-sm transition-all hover:scale-105"
            >
              Subscribe — $50/mo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 px-4 text-center overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* live badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Picks Updated Daily</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black leading-none mb-6 tracking-tight">
            <span className="text-white block">MONEY</span>
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              PICKS ARENA
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-3 max-w-2xl mx-auto">
            Data-driven sports picks for <span className="text-white font-bold">4 sports</span>, powered by real stats
            APIs, sportsbook lines, and battle-tested algorithms.
          </p>
          <p className="text-gray-600 mb-10 tracking-widest text-sm">MLB &nbsp;•&nbsp; NHL &nbsp;•&nbsp; NBA &nbsp;•&nbsp; NFL</p>

          {/* sport emojis */}
          <div className="flex justify-center gap-8 text-5xl mb-12">
            {SPORTS.map((s) => (
              <span key={s.name} className="hover:scale-125 transition-transform cursor-default select-none">
                {s.emoji}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/subscribe"
              className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xl py-5 px-12 rounded-2xl transition-all hover:scale-105 glow-gold"
              href="/auth"
            >
              GET EARLY ACCESS — FREE →
            </Link>
          </div>
          <p className="text-gray-700 text-xs mt-4">Early access is free &nbsp;•&nbsp; $50/mo subscription launching soon</p>
        </div>
      </section>

      {/* ── SPORTS GRID ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-4">
            4 SPORTS.{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              4 ALGORITHMS.
            </span>
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">Every pick is backed by real data and real sportsbook lines.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPORTS.map((sport) => (
              <div
                key={sport.name}
                className={`bg-[#141414] border border-[#2a2a2a] ${sport.border} rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{sport.emoji}</span>
                  <div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded bg-gradient-to-r ${sport.gradient} text-white mb-1.5 inline-block tracking-widest`}
                    >
                      {sport.badge}
                    </span>
                    <h3 className="text-xl font-black text-white">{sport.name}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{sport.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {sport.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-amber-500 shrink-0">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-16">
            HOW IT{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">WORKS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '01', title: 'Subscribe', desc: '$50/month gives you instant access to all 4 sports — MLB, NHL, NBA, and NFL picks.' },
              { step: '02', title: 'One Login', desc: 'One account, one login. Access your full dashboard from any device, any time.' },
              { step: '03', title: 'Get Picks', desc: 'View daily picks powered by real stats, historical data, and live sportsbook lines.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="text-7xl font-black text-amber-500/20 mb-3 leading-none">{item.step}</div>
                <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            ONE PRICE.{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">ALL ACCESS.</span>
          </h2>
          <p className="text-gray-500 mb-12">No tiers. No upsells. Everything included from day one.</p>

          <div className="relative bg-[#141414] border border-amber-500/40 rounded-2xl p-10 overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/3 rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="text-7xl font-black text-white mb-1">$50</div>
              <div className="text-gray-400 mb-8 text-lg">per month</div>

              <div className="space-y-3 mb-10 text-left">
                {[
                  { icon: '⚾', text: 'MLB MoneyBall — Daily Baseball Picks' },
                  { icon: '🏒', text: 'NHL Money Shots — Daily Hockey Picks' },
                  { icon: '🏀', text: 'NBA Money Buckets — Daily Basketball Picks' },
                  { icon: '🏈', text: 'NFL Money Bombs — Weekly Football Picks' },
                  { icon: '✅', text: 'Real sportsbook lines included' },
                  { icon: '✅', text: 'Stats updated daily' },
                  { icon: '✅', text: 'One login for all 4 sports' },
                  { icon: '✅', text: 'Cancel anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/subscribe"
                className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xl py-5 rounded-xl transition-all hover:scale-105 text-center glow-gold"
              >
                GET EARLY ACCESS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a1a1a] py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <span className="font-bold text-gray-500 tracking-wider">MONEY PICKS ARENA</span>
          </div>
          <p className="text-gray-700 text-xs max-w-2xl mx-auto leading-relaxed">
            Money Picks Arena provides sports picks for entertainment and informational purposes only. We are not a
            sportsbook and do not accept wagers. Sports betting may not be legal in your jurisdiction. Please gamble
            responsibly. Must be 21+ to participate.
          </p>
          <p className="text-gray-800 text-xs mt-4">© 2025 Money Picks Arena. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
