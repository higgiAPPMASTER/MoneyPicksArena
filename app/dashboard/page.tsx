import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardUI from './DashboardUI'

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  return <DashboardUI userEmail={user.email ?? ''} />
}
