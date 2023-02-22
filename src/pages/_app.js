import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    AOS.init();
    }, []);
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
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3464741639698457"

     crossorigin="anonymous"></script>
   </Head>
    <Navbar/>
      <Component {...pageProps} />
      <Analytics />
      <Footer />
    </SessionProvider>
  )
}
