import { useEffect, useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import {useRouter} from "next/router";
import axios from "axios";


const FileUploader = () => {
  const { status } = useSession();
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInput = useRef(null);
  //Redirect to homepage if not authenticated
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target.elements;
  const file = form.file.files[0];

  if(fileName === "") return alert("No file selected!");

  const encryptionKey = form.encryptionKey.value;
  const {url, fields, fileId} = await fetch(`/api/signedposturl?key=${encryptionKey}&name=${file.name}&size=${file.size}`).then(response => response.json());
  const data = {...fields,file};
  const formData  = new FormData();
  for (const name in data) formData.append(name, data[name]);
    const response = await axios.post(url, formData, {onUploadProgress: (event) => setProgress(Math.round((event.loaded * 100) / event.total))}).catch((thrown) => {console.log(thrown.message);});
  return response.status == 204 ? alert(fileId) : alert("Error");
}

return(<>
<div class="flex items-center pb-12 justify-center p-12 bg-base-200">
  <div class="mx-auto w-full max-w-[550px] bg-white shadow-xl border-2 rounded-lg">
    <form
      class="py-6 px-9"
      onSubmit={handleSubmit}
    >
      <div class="mb-5">
        <label
          htmlFor="encryptionKey"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >Encryption Key</label>
        <input
          type="text"
          name="encryptionKey"
          id="encryptionKey"
          placeholder="Ȧ̶̺_̸͍͠Ș̸̚U̴͖̾P̴̛͇Ĕ̵̦R̶͕͋_̶̭͂S̴̱̈́T̶̻͐R̶̗͊Ō̵͖N̴͝ͅG̵̮̈́_̷̡̄Ḱ̶̳Ȇ̵͇Y̶̭͋"
          class="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
          required
        />
      </div>

      <div class="mb-6 pt-2">
        <label class="mb-5 block text-xl font-semibold text-[#07074D]">
          Upload File
        </label>

        <div class="mb-8">
          <input type="file" name="file" id="file" class="sr-only" ref={fileInput} onChange={(e) => {setFileName(e.target.files[0].name);}}required />
          <label
            htmlFor="file"
            class="border-2 relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span class="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                class="hover:bg-slate-800 hover:text-white active:bg-slate-600 inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </label>
        </div>
      {!!fileName && <div class="rounded-md bg-base-200 py-4 px-8">
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">
              {fileName}
            </span>
            <button class="text-[#07074D]" onClick={()=> {setFileName(""); fileInput.current = null;}}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="relative mt-5 h-[10px] w-full rounded-lg bg-[#E2E5EF]">
            <progress value={progress} max="100"
              class="progress absolute left-0 right-0 h-full w-full"
            ></progress>
          </div>
        </div>}
      </div>

      <div><button class="w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Send File</button></div>
    </form>
  </div>
</div>
</>)
}

export default FileUploader;