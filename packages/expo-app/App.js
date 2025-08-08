import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { supabase } from './lib/supabase';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { signInWithGoogle } from 'shared/auth';

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    const redirectTo = Linking.createURL('/');
    const url = await signInWithGoogle(supabase, redirectTo);
    if (url) {
      Linking.openURL(url);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const url = Linking.useURL();
    if (url) {
      const { params } = Linking.parse(url);
      if (params.access_token && params.refresh_token) {
        supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });
      }
    }
  }, [Linking.useURL()]);

  return (
    <View style={styles.container}>
      {session ? (
        <>
          <Text>Welcome, {session.user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Login with Google" onPress={handleLogin} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
