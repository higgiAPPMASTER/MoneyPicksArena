import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Money Picks Arena — 4 Sports. 1 Subscription.',
  description:
    'Data-driven sports picks for MLB, NHL, NBA, and NFL. Subscribe for $50/month and get access to all 4 daily picks apps.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  )
}
