import LogoSVG from '../components/LogoSVG';

const Footer = () => {
  
    return (<footer class="text-gray-600 body-font">
    <div class="container px-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <LogoSVG/>
          <span class="text-xl">File</span>
        </a>
        <p class="mt-2 text-sm text-gray-500">Truly secure file sharing</p>
      </div>
      <div class="justify-end flex-grow flex justify-endflex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
          <nav class="list-none mb-10">
            <li>
              <a class="text-gray-600 hover:text-gray-800">Pehla Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Doosa Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Teesra Link</a>
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
          <nav class="list-none mb-10">
            <li>
              <a class="text-gray-600 hover:text-gray-800">Pehla Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Doosa Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Teesra Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div class="bg-gray-100">
      <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-gray-500 text-sm text-center sm:text-left">Made with ❤ and NextJS —
          <a href="https://github.com/ankithmrao" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@Ankith365</a> and <a href="https://github.com/Anush008" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@Anush008</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <a class="text-gray-500">Hai🍖</a>
          
        </span>
      </div>
    </div>
  </footer>)
}

export default Footer;