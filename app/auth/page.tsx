'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email for a confirmation link, then come back to login!')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">💰</span>
            <span className="font-black text-white text-xl tracking-wider">MONEY PICKS ARENA</span>
          </Link>
          <h1 className="text-2xl font-black text-white">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? 'Login to access your picks dashboard' : 'Join Money Picks Arena'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8">
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl transition-all text-lg mt-2 hover:scale-[1.02]"
            >
              {loading ? 'Loading…' : isLogin ? 'LOGIN →' : 'CREATE ACCOUNT →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setMessage('') }}
              className="text-gray-600 hover:text-amber-400 text-sm transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-gray-700 hover:text-gray-400 text-sm transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
