import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const handleLogout = async () => {
    'use server'
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    await supabase.auth.signOut()
    return redirect('/')
  }

  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome, {session.user.email}</h1>
          <form action={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>You are not logged in</h1>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  )
}
