import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Stripe webhook — will be activated when payments go live
export async function POST() {
  return NextResponse.json({ received: true })
}