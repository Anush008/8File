export default function Updates() {
return (<section className="bg-white text-gray-600 body-font">
<div className="container px-5 mx-auto">
  <div className="flex flex-wrap w-full">
    <div className="lg:w-1/2 w-full mb-4 lg:mb-0" data-aos="fade-right">
      <h1 className="sm:text-3xl text-4xl font-bold title-font mb-2 text-gray-900">Your files are yours! Period.</h1>
      <div className="h-1 w-20 bg-black rounded"></div>
    </div>
    <p className="font-normal text-gray-500 sm:text-xl pt-5" data-aos="fade-right">Every file is AES-256 encrypted with user-provided keys that are discarded from the server memory once the encryption is done. Only users with the cipher key can download/read the contents of the file. <span className="underline--magical">No one else.</span> Not god, not us.</p>
  </div>
  
</div>
</section>)
}
