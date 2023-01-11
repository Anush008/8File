export default function Updates() {
return (<section class="text-gray-600 body-font">
<div class="container px-5 mx-auto">
  <div class="flex flex-wrap w-full">
    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
      <h1 class="sm:text-3xl text-4xl font-bold title-font mb-2 text-gray-900">Your files are yours! Period.</h1>
      <div class="h-1 w-20 bg-black rounded"></div>
    </div>
    <p class="font-normal text-gray-500 sm:text-xl pt-5">Every file is AES-256 encrypted with user-provided keys that are discarded from the server memory once the encryption is done. Only users with the cipher key can download/read the contents of the file. <span class="underline--magical">No one else.</span> Not god, not us.</p>
  </div>
  
</div>
</section>)
}