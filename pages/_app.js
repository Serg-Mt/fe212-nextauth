
import '@/styles/globals.css';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <header><Login /></header>
      <hr/>
      <main><Component {...pageProps} /></main>
    </SessionProvider>
  );
}

function Login() {
  const { data: session, status } = useSession();
  if ('loading' === status)
    return <button>вЊ›</button>;
  if (session)
    return <>
      {session?.user?.image && <img src={session?.user?.image || ''} width={32} height={32} alt="ava" />}
      {session?.user?.name}
      <button onClick={() => signOut()}>Sign out</button>
    </>;
  return <>
    <button onClick={() => signIn()}>Sign in</button>
  </>;
}