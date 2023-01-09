import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const { status } = useSession();
  const authtenticated = status === "authenticated";
  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content text-center text-black">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold"><span class="underline--magical">8File</span><span> - A file cloud that's truly <Typewriter
            options={{
              strings: ['secure', 'private', 'anonymous', 'encrypted', 'reliable'],
              autoStart: true,
              loop: true,
            }}
          /></span></h1>
          <p className="py-6">Securely transfer files to users with GZIP compression and server-side AES-256 encryption. <span class="underline--magical">Upto 10GB for FREE!</span></p>
          <Link href={authtenticated ? "/dashboard/upload" : "/api/auth/signin"}>
            <button className="w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              {authtenticated ? "Upload A File" : "Let Me In!"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero;
