'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signInWithGithub } from 'shared/auth'

export async function login() {
  const supabase = createClient()
  const url = await signInWithGithub(supabase)

  if (url) {
    redirect(url)
  } else {
    redirect('/error')
  }
}
