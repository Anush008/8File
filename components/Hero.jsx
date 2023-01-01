import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Hero = () => {
const { status } = useSession();
const authtenticated = status === "authenticated";
return (
  <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">8File - Truly secure file sharing </h1>
      <p className="py-6">Securely transfer files to users with server-side AES-256 encryption and GZIP compression. <span class="underline--magical">Upto 10GB for FREE!</span></p>
      <Link href={authtenticated ? "/dashboard" : "/api/auth/signin"}>
      <button className="w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        {authtenticated ? "Go to dashboard" : "Login!"}
</button>
</Link>
    </div>
  </div>
</div>
)
}

export default Hero;