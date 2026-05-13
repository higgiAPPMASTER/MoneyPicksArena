import Link from 'next/link'

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <span className="text-3xl">💰</span>
          <span className="font-black text-white text-xl tracking-wider">MONEY PICKS ARENA</span>
        </Link>

        <div className="bg-[#141414] border border-amber-500/40 rounded-2xl p-10">
          <div className="text-6xl mb-4">🔜</div>
          <h1 className="text-3xl font-black text-white mb-3">Payments Coming Soon</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We&apos;re finishing up our payment system. In the meantime, create a free account to get early access to all 4 sports picks!
          </p>

          <div className="space-y-3">
            <Link
              href="/auth"
              className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl text-xl transition-all hover:scale-[1.02] glow-gold"
            >
              GET FREE EARLY ACCESS →
            </Link>
            <Link href="/" className="block text-gray-600 hover:text-gray-400 text-sm transition-colors py-2">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
