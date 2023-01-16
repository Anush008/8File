import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import parseBytes from "../utils/fileSizeParser";
import UploadComplete from "./UploadComplete";

const FileUploader = () => {
  const router = useRouter();
  const { data: session ,status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    }
  });
  useEffect(() => {}, []);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const file = form.file.files[0];
    const autoDelete = form.autodelete.value ?? "";
    setProgress(0);
    if (fileName === "") return alert("No file selected!");
    setProgress(1);
    const encryptionKey = form.encryptionKey.value;
    const { url, fields, fileId } = await fetch(`/api/signedposturl?key=${encryptionKey}&name=${file.name}&size=${file.size}&uploaderId=${session.user.id}&autodelete=${autoDelete}`).then(response => response.json());
    const data = { ...fields, file };
    const formData = new FormData();
    for (const name in data) formData.append(name, data[name]);
    const response = await axios.post(url, formData, { onUploadProgress: (event) => setProgress(Math.round((event.loaded * 100) / event.total)) }).catch((thrown) => { console.log(thrown.message); });
    if (response.status == 204) {
      setProgress(0);
      const url = window.location.protocol + "//" +window.location.host + "/" + fileId;
      setFileUrl(url);
      setShowModal(true);
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
    }
    else alert("Error");
  }

  return (<>
    <div className="flex items-center justify-center p-12 bg-slate-100 mb-6">
      <UploadComplete id="complete" url={fileUrl} show={showModal} setShow={setShowModal}/>
  
      <div className="animate__animated animate__backInUp mx-auto w-full max-w-[550px] bg-white shadow-xl border-2 rounded-xl">
        <form
          className="py-6 px-9"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="encryptionKey"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >Encryption Key</label>
            <input
              type="text"
              name="encryptionKey"
              id="encryptionKey"
              placeholder="SECRET KEY"
              className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
              required
            />
          </div>

          <div className="mb-6 pt-2">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload File
            </label>

            <div className="mb-4">
              <input type="file" name="file" id="file" className="sr-only" onChange={(e) => { setFileName(e.target.files[0].name); setFileSize(parseBytes(e.target.files[0].size)) }} required />
              <label
                htmlFor="file"
                className="border-2 relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    {!!fileName ? "Choose another file" : "Select a file to upload"}
                  </span>
                  {/*<span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>*/}
                  <span
                    className="hover:bg-slate-800 hover:text-white active:bg-slate-600 inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                  >
                    Browse
                  </span>
                </div>
              </label>
            </div>
            
          <div className="mb-5">
            <label
              htmlFor="autodelete"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >Auto-Delete</label>
            <input className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md" 
            placeholder="Never" 
            type="text" 
            onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} 
            onFocus={(e) => e.target.type = 'date'}  
            name="autodelete" 
            id="autodelete"
            min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]} /> 
          </div>

            {!!fileName && <div className="rounded-md bg-slate-100 py-4 px-8">
              <div className="flex items-center justify-between">
                <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                  {`${fileName}, ${fileSize}.`}
                </span>
                <button className={`text-[#07074D] ${!!progress ? "invisible" : "visible"}`} onClick={() => { setFileName(""); }}>
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
              {progress ? <div className="relative mt-5 h-[10px] w-full rounded-lg bg-[#E2E5EF]">
                <progress value={progress} max="100"
                  className="progress absolute left-0 right-0 h-full w-full"
                ></progress>
              </div> : ""}
            </div>}
          </div>

          <div><button className={`${!!progress ? "w-full btn btn-disabled text-lg hover:text-white disabled" : "w-full text-slate-600 border border-slate-600 hover:bg-slate-800 hover:text-white font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}`}>{!!progress ? (progress == 100 ? "ENCRYPTING..." : "UPLOADING...") : "UPLOAD"}</button></div>
        </form>
      </div>
    </div>
  </>)
}

export default FileUploader;
