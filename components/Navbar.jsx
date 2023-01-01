import Link from 'next/link';
import { signOut, useSession, signIn } from "next-auth/react"

const Navbar = () => {
const { data: session, status } = useSession();
const authenticated = status === "authenticated";
return (<header class="text-gray-600 body-font">
<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
  <Link class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-slate-800 rounded-full" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
    <span class="ml-3 text-xl">8File</span>
  </Link>
  <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    <Link href="/dashboard" class="font-medium mr-5 hover:text-gray-900">Dashboard</Link>
    <Link href="/#pricing" class="font-medium mr-5 hover:text-gray-900">Pricing</Link>
    <a class="mr-5 hover:text-gray-900">Third Link</a>
  </nav>
  <div class="flex items-center space-x-4">
    {authenticated && <img class="w-10 h-10 rounded-full" src={session?.user?.image} alt=""/>}
    <div class="font-medium dark:text-white">
        <div>{authenticated ? session.user.name : <button class="btn" onClick={signIn}>Login</button>}</div>
        {authenticated && <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>}
    </div>
    {authenticated && <button class="btn" onClick={() => {signOut({redirect: false})}}>Logout</button>}
</div>
</div>
</header>)
}

export default Navbar;