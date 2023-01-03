import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Head from 'next/head'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head >
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>8File - Truely secure file sharing</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
<meta property="og:url" content="https://localhost/"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="8File - Truely secure file sharing"/>
<meta property="og:image" content="https://example.com/image.jpg"/>
<meta property="og:image:alt" content="A description of what is in the image (not a caption)"/>
<meta property="og:description" content="Description Here"/>
<meta property="og:site_name" content="Site Name"/>
<meta property="og:locale" content="en_US"/>
<meta property="article:author" content=""></meta>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}