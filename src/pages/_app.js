import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head >
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
        
  <title>8File - Truly secure file sharing</title>
  <meta name="description" content="Securely transfer files to users with GZIP compression and server-side AES-256 encryption. Upto 10GB for FREE!"/>

  <meta property="og:url" content="https://localhost"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="8File - Truly secure file sharing"/>
  <meta property="og:description" content="Securely transfer files to users with GZIP compression and server-side AES-256 encryption. Upto 10GB for FREE!"/>
  <meta property="og:image" content="https://i.ibb.co/fxjK3WT/snapshot.png"/>
  <meta property="og:site_name" content="8File - Truly secure file sharing"/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="https://localhost"/>
  <meta property="twitter:url" content="https://localhost"/>
  <meta name="twitter:title" content="8File - Truly secure file sharing"/>
  <meta name="twitter:description" content="Securely transfer files to users with GZIP compression and server-side AES-256 encryption. Upto 10GB for FREE!"/>
  <meta name="twitter:image" content="https://i.ibb.co/fxjK3WT/snapshot.png"/>
  <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}