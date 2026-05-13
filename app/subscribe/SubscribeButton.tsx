'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function SubscribeButton({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userEmail }),
      })
      const { sessionId, error: apiError } = await res.json()
      if (apiError) throw new Error(apiError)

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw new Error(stripeError.message)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl text-xl transition-all hover:scale-[1.02] glow-gold"
      >
        {loading ? 'Redirecting to Stripe…' : '🎯 SUBSCRIBE — $50/MO'}
      </button>
    </div>
  )
}
