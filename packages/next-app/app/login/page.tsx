'use client'

import { createClient } from '@/src/utils/supabase/client'
import { signInWithGoogle } from 'shared/auth'

export default function Login() {
  const supabase = createClient()

  const handleLogin = async () => {
    await signInWithGoogle(supabase, {
        redirectTo: `${location.origin}/auth/callback`,
    })
  }

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  )
}
