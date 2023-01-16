import Link from 'next/link';
import { signOut, useSession, signIn } from "next-auth/react"
import LogoSVG from '../components/LogoSVG';
import formatBytes from '../utils/fileSizeParser';
import Image from 'next/image';


const Navbar = () => {
  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";
  return (<header className="animate__animated animate__fadeInDown text-white body-font bg-slate-800">
    <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <Link className="flex title-font font-medium items-center text-white mb-4 md:mb-0" href="/">
        <LogoSVG color="#ffffff"/>
        <span className="text-xl">File</span>
      </Link>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <Link href={authenticated ? "/dashboard" : "/api/auth/signin"} className="font-medium mr-5">Dashboard</Link>
        <Link href={authenticated ? "/dashboard/upload" : "/api/auth/signin"} className="font-medium mr-5">Upload</Link>
        <Link href={authenticated ? "/dashboard/profile" : "/api/auth/signin"} className="font-medium mr-5">Settings</Link>
        <Link href="/#pricing" className="font-medium mr-5">Premium</Link>
      </nav>
      <div className="flex items-center space-x-4">
        {authenticated && <Link href={session?.user?.image}><Image width="30" height="30" alt="User's avatar" className="w-10 h-10 rounded-full" src={session?.user?.image || "/images/favicon.ico"} /></Link>}
        <div className="font-medium ">
          <div>{authenticated ? (session.user.name || "Bruce Wayne") : <button className="btn" onClick={signIn}>Sign In</button>}</div>
          {authenticated && <div className="text-sm">{`Usage: ${formatBytes(session?.user?.storageUsed)} out of ${formatBytes(session?.user?.storageLimit)}`}</div>}
        </div>
        {authenticated && <button className="btn btn-outline btn-error" onClick={() => { signOut({ redirect: false }) }}>Sign Out</button>}
      </div>
    </div>
  </header>)
}

export default Navbar;
