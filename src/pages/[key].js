import execute from '../utils/MySQL';
import FileIconSVG from '../components/FileIconSVG';
import parseBytes from "../utils/fileSizeParser";
import JsFileDownloader from 'js-file-downloader';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const { key } = context.query;
  const result = await execute("SELECT S3KEY, NAME, SIZE FROM `files` WHERE `ID` = ?", [key]);
  if (result.length === 0) {
    return {
      notFound: true,
    }
  }
  return {
    props: result[0]
  }
}

const Post = ({ S3KEY, NAME, SIZE }) => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const decrytionKey = form.decryptionKey.value;
    const { url, headers: headersReceived } = await fetch(`/api/signedgeturl?key=${decrytionKey}&file=${S3KEY}`).then(response => response.json());
    const headers = [];
    for (let header in headersReceived)
      headers.push({ name: header, value: headersReceived[header] });
    new JsFileDownloader({
      url,
      headers,
      filename: NAME,
      onloadstart: () => { setIsDownloading(true); },
      process: (event) => { if (!event.lengthComputable) return; setProgress(Math.round(event.loaded / event.total * 100)); },
      nativeFallbackOnError: true
    })
      .then(function () {
        setIsDownloading(false);
        alert("Downloaded!");
      })
      .catch(function (error) {
        setIsDownloading(false);
        alert(error.message);
      });
  }
  return (<div class="flex items-center pb-12 justify-center p-12 bg-base-200 mb-11">
    <div class="mx-auto w-full max-w-[550px] bg-white shadow-xl border-2 rounded-xl">
      <form
        class="py-6 px-9"
        onSubmit={handleSubmit}
      >

        <div class="mb-6 pt-2">
          <label class="mb-5 block text-xl font-semibold text-[#07074D]">
            You are downloading...
          </label>
          <div>
            <label class="border-2 relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
              <div class="justify-center">
                <FileIconSVG />
                <span class="inline-flex py-2 text-xl text-ellipsis font-medium text-[#07074D] md:text-start text-center">
                  {NAME}
                  <br />
                  {parseBytes(SIZE)}
                </span>
              </div>
            </label>
          </div>
        </div>
        <div class="mb-5">
          <label
            htmlFor="encryptionKey"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >Decryption Key</label>
          <input
            type="text"
            name="decryptionKey"
            id="decryptionKey"
            placeholder="_@NUSH2332"
            class="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
            required
          />
        </div>
        <div><button class="w-full text-slate-600 border border-slate-600 hover:bg-slate-800 hover:text-white font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{isDownloading ? `Downloading... ${progress}%` : "Download"}</button></div>
      </form>
    </div>
  </div>
  )
}
export default Post