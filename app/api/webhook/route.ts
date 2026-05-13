import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// Use Service Role key so webhook can write to Supabase bypassing RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature error:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  console.log(`Stripe event received: ${event.type}`)

  switch (event.type) {
    // ── New subscription created via Checkout ───────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.user_id
      const customerId = session.customer as string
      const subscriptionId = session.subscription as string

      if (userId) {
        const { error } = await supabaseAdmin.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: 'active',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        )
        if (error) console.error('Supabase upsert error:', error)
        else console.log(`Subscription activated for user ${userId}`)
      }
      break
    }

    // ── Subscription renewed, changed, or payment failed ────────────────
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const status = sub.status === 'active' ? 'active' : 'inactive'
      await supabaseAdmin
        .from('subscriptions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id)
      console.log(`Subscription ${sub.id} updated to ${status}`)
      break
    }

    // ── Subscription cancelled ───────────────────────────────────────────
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'inactive', updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id)
      console.log(`Subscription ${sub.id} cancelled`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
