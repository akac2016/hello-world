import { createClient } from '@supabase/supabase-js'

async function signInWithProvider(supabase, provider, options) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options,
  })

  if (error) {
    console.error(error)
    return null
  }

  return data.url
}

export async function signInWithGoogle(supabase, options) {
    return signInWithProvider(supabase, 'google', options);
}

export async function signInWithGithub(supabase, options) {
    return signInWithProvider(supabase, 'github', options);
}
