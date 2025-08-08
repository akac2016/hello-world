import { createClient } from '@/src/utils/supabase/server'
import { signOut } from './auth/actions';

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <main>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <form action={signOut}>
              <button type="submit">Sign out</button>
            </form>
          </div>
        ) : (
          <p>You are not logged in. Go to /login to sign in.</p>
        )}
      </main>
    </div>
  );
}
