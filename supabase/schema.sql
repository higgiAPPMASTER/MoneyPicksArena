-- =====================================================
-- MONEY PICKS ARENA — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- =====================================================

-- Subscriptions table
create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid references auth.users(id) on delete cascade unique not null,
  stripe_customer_id      text,
  stripe_subscription_id  text,
  status                  text default 'inactive',
  created_at              timestamp with time zone default now(),
  updated_at              timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.subscriptions enable row level security;

-- Users can only read their OWN subscription
create policy "Users can read own subscription"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- Service role (webhook) can write via admin client (bypasses RLS automatically)
-- No additional policy needed for service role.

-- Index for fast lookups
create index if not exists subscriptions_stripe_sub_id_idx
  on public.subscriptions (stripe_subscription_id);
