import Link from 'next/link';
import { signOut, useSession, signIn } from "next-auth/react"
import LogoSVG from '../components/LogoSVG';
import formatBytes from '../utils/fileSizeParser';
import Image from 'next/image';


const Navbar = () => {
  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";
  return (<header class="animate__animated animate__fadeInDown text-white body-font bg-slate-800">
    <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <Link class="flex title-font font-medium items-center text-white mb-4 md:mb-0" href="/">
        <LogoSVG color="#ffffff"/>
        <span class="text-xl">File</span>
      </Link>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <Link href={authenticated ? "/dashboard/upload" : "/api/auth/signin"} class="font-medium mr-5 hover:text-xl">Upload</Link>
        <Link href={authenticated ? "/dashboard" : "/api/auth/signin"} class="font-medium mr-5 hover:text-xl">Dashboard</Link>
        <Link href="/#pricing" class="font-medium mr-5 hover:text-xl">Pricing</Link>
      </nav>
      <div class="flex items-center space-x-4">
        {authenticated && <Link href={session?.user?.image}><Image width="30" height="30" alt="User's avatar" class="w-10 h-10 rounded-full" src={session?.user?.image || "/images/favicon.ico"} /></Link>}
        <div class="font-medium ">
          <div>{authenticated ? (session.user.name || "Bruce Wayne") : <button class="btn" onClick={signIn}>Sign In</button>}</div>
          {authenticated && <div class="text-sm">{`Usage: ${formatBytes(session?.user?.storageUsed)} out of ${formatBytes(session?.user?.storageLimit)}`}</div>}
        </div>
        {authenticated && <button class="btn btn-outline btn-error" onClick={() => { signOut({ redirect: false }) }}>Sign Out</button>}
      </div>
    </div>
  </header>)
}

export default Navbar;