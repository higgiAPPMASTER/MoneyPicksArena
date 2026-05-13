import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h1 className="text-4xl font-black text-white mb-4">You&apos;re In!</h1>
        <p className="text-gray-400 text-lg mb-3">Welcome to Money Picks Arena.</p>
        <p className="text-gray-500 mb-10">
          Your subscription is active. You now have full access to all 4 sports picks — MLB, NHL, NBA, and NFL.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-black py-5 px-12 rounded-2xl text-xl transition-all hover:scale-105 glow-gold"
        >
          GO TO DASHBOARD 🏆
        </Link>
        <p className="text-gray-700 text-xs mt-6">
          A receipt has been sent to your email from Stripe.
        </p>
      </div>
    </div>
  )
}
