import Link from 'next/link';
import { signOut, useSession, signIn } from "next-auth/react"
import LogoSVG from '../components/LogoSVG';
import formatBytes from '../utils/fileSizeParser';
import Image from 'next/image';

const Navbar = () => {
  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";
  return (<header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <Link class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
        <LogoSVG />
        <span class="text-xl">File</span>
      </Link>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <Link href={authenticated ? "/dashboard/upload" : "/api/auth/signin"} class="font-medium mr-5 hover:text-gray-900">Upload</Link>
        <Link href={authenticated ? "/dashboard" : "/api/auth/signin"} class="font-medium mr-5 hover:text-gray-900">Files</Link>
        <Link href="/#pricing" class="font-medium mr-5 hover:text-gray-900">Pricing</Link>
        <Link href="/#faq" class="font-medium mr-5 hover:text-gray-900">FAQs</Link>
      </nav>
      <div class="flex items-center space-x-4">
        {authenticated && <Image width="10" height="10" alt="User's avatar" class="w-10 h-10 rounded-full" src={session?.user?.image || "/images/favicon.ico"} />}
        <div class="font-medium ">
          <div>{authenticated ? (session.user.name || "Bruce Wayne") : <button class="btn" onClick={signIn}>Sign In</button>}</div>
          {authenticated && <div class="text-sm text-gray-500 ">{`Usage: ${formatBytes(session?.user?.storageUsed)} out of ${formatBytes(session?.user?.storageLimit)}`}</div>}
        </div>
        {authenticated && <button class="btn btn-outline btn-error" onClick={() => { signOut({ redirect: false }) }}>Sign Out</button>}
      </div>
    </div>
  </header>)
}

export default Navbar;