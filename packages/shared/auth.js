import { createClient } from '@supabase/supabase-js'

export async function signInWithGithub(supabase) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    console.error(error)
    return null
  }

  return data.url
}
