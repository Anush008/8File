import LogoSVG from '../components/LogoSVG';
import Link from 'next/link';

const Footer = () => {

  return (<footer class="text-gray-600 body-font bg-slate-100 mt-4 pt-4">
    <div class="container px-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col pb-6">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <a href="#" class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <LogoSVG />
          <span class="text-xl">File</span>
        </a>
        <p class="text-lg text-gray-500">Truly secure file sharing</p>
      </div>
      <div class="justify-end flex-grow flex justify-endflex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">

        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-1">INFORMATION</h2>
          <nav class="list-none mb-10">
            <li>
              <Link href="/privacy" class="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/tos" class="text-gray-600 hover:text-gray-800">TOS</Link>
            </li>
            <li>
              <Link href="/refund" class="text-gray-600 hover:text-gray-800">Refund Policy</Link>
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-1">NAVIGATION</h2>
          <nav class="list-none mb-10">
            <li>
              <Link href="/dashboard" class="text-gray-600 hover:text-gray-800">Upload Files</Link>
            </li>
            <li>
              <Link href="/dashboard/upload" class="text-gray-600 hover:text-gray-800">Browse Files</Link>
            </li>
            <li>
              <Link href="/#pricing" class="text-gray-600 hover:text-gray-800">Pricing</Link>
            </li>
            <li>
              <Link href="mailto:anushshetty90@gmail.com" class="text-gray-600 hover:text-gray-800">Contact Us</Link>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div class="bg-slate-800 ">
      <div class="container justify-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-white text-sm text-center sm:text-left">Made with ❤ and <a href="https://nextjs.org/" rel="noopener noreferrer" class="hover:text-slate-400 ml-1" target="_blank">Next.js</a> — 
          <a href="https://github.com/ankithmrao" rel="noopener noreferrer" class="hover:text-slate-400" target="_blank"> @Ankith365</a> and <a href="https://github.com/Anush008" rel="noopener noreferrer" class="ml-1 hover:text-slate-400" target="_blank">@Anush008</a>
        </p>
      </div>
    </div>
  </footer>)
}

export default Footer;