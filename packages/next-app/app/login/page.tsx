'use client'

import { createClient } from '@/utils/supabase/client'
import { signInWithGoogle } from 'shared/auth'

export default function LoginPage() {
  const handleLogin = async () => {
    const supabase = createClient()
    const url = await signInWithGoogle(supabase, 'http://localhost:3000/auth/callback')
    if (url) {
      window.location.href = url
    }
  }

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  )
}
