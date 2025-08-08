export async function signInWithGoogle(supabase, redirectTo) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    console.error(error)
    return null
  }

  return data.url
}
