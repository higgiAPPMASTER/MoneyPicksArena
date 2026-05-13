# 💰 Money Picks Arena

Unified hub for all 4 sports picks apps — MLB, NHL, NBA, NFL — with Stripe $50/month subscription and Supabase auth.

---

## 🚀 Setup Checklist

### 1. Supabase — Create the database table

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open your project → **SQL Editor**
3. Paste and run the contents of `supabase/schema.sql`
4. Go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to **Authentication → URL Configuration** and add:
   - Site URL: `https://moneypicksarena.com` (or your Vercel URL)
   - Redirect URL: `https://moneypicksarena.com/auth/callback`

### 2. Stripe — Create the $50/month product

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Products → + Add Product**
   - Name: `Money Picks Arena Monthly`
   - Price: **$50.00 / month** (recurring)
3. Copy the **Price ID** (starts with `price_`) → `STRIPE_PRICE_ID`
4. Go to **Developers → API Keys** and copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
5. **Developers → Webhooks → Add endpoint**
   - URL: `https://moneypicksarena.com/api/webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

> ⚠️ You're currently in **TEST MODE**. Switch to Live mode before charging real customers.

### 3. Create GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Repo name: `MoneyPicksArena`
3. Leave it empty (don't add README)
4. Run `deploy.bat` from the project folder to push all files

### 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `higgiAPPMASTER/MoneyPicksArena` GitHub repo
3. Framework: **Next.js** (auto-detected)
4. **Environment Variables** — add ALL of these:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID
NEXT_PUBLIC_MLB_URL=https://moneyball-1.onrender.com
NEXT_PUBLIC_NHL_URL=https://nhl-shots-picks.onrender.com
NEXT_PUBLIC_NBA_URL=https://YOUR-NBA-APP.onrender.com
NEXT_PUBLIC_NFL_URL=https://YOUR-NFL-APP.onrender.com
NEXT_PUBLIC_SITE_URL=https://moneypicksarena.com
```

5. Click **Deploy** — Vercel builds in ~2 minutes

### 5. Point GoDaddy Domain to Vercel

1. In Vercel → your project → **Settings → Domains**
2. Add `moneypicksarena.com`
3. Vercel gives you DNS records (A record + CNAME)
4. In **GoDaddy → DNS → Manage** — update the records
5. Takes 5–30 minutes to propagate

---

## 📁 Project Structure

```
money-picks-arena/
├── app/
│   ├── page.tsx                    # 🏠 Landing page
│   ├── auth/page.tsx               # 🔐 Login / Sign up
│   ├── auth/callback/route.ts      # Supabase auth callback
│   ├── dashboard/page.tsx          # 📊 Protected dashboard (server)
│   ├── dashboard/DashboardUI.tsx   # 📊 Dashboard tabs (client)
│   ├── subscribe/page.tsx          # 💳 Subscription page
│   ├── subscribe/SubscribeButton.tsx
│   ├── success/page.tsx            # 🎉 Post-payment success
│   └── api/
│       ├── checkout/route.ts       # Stripe checkout session
│       └── webhook/route.ts        # Stripe webhook handler
├── lib/
│   ├── supabase/client.ts          # Browser Supabase client
│   ├── supabase/server.ts          # Server Supabase client
│   └── stripe.ts                   # Stripe client
├── middleware.ts                   # Auth + subscription guard
├── supabase/schema.sql             # Database setup
└── deploy.bat                      # One-click GitHub push
```

---

## 💡 How It Works

1. User visits `moneypicksarena.com` → sees landing page
2. Clicks **Subscribe** → Stripe Checkout ($50/month)
3. After payment → Stripe webhook → Supabase marks subscription **active**
4. User lands on `/success` → redirected to `/dashboard`
5. Dashboard shows 4 sport tabs — each has **"OPEN LIVE PICKS"** button
6. Button opens the respective Render app in a new tab

---

## 🔮 Future Upgrade (Phase 2)

Replace the "Open in new tab" buttons with **native picks display** embedded directly in the dashboard — no separate Render login required. Ask your dev to add a JSON API endpoint to each Render app.
