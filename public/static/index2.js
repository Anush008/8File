import {useRef, useState} from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { signOut } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession()
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  const handleSubmitClick = async(e) => {
    const file = fileRef.current.files[0];
    e.preventDefault();
    const {url, fields, fileId} = await fetch(`/api/signedposturl?key=${inputRef.current.value}&name=${file.name}&size=${file.size}`).then(response => response.json());
    const data = {...fields,file};
    const formData  = new FormData();
    for (const name in data) formData.append(name, data[name]);
    setUploading(true);
    const response = await axios.post(url, formData, {onUploadProgress: (event) => setProgress(Math.round((event.loaded * 100) / event.total))}).catch((thrown) => {console.log(thrown.message);});
    setUploading(false);
    return response.status == 204 ? alert(fileId) : alert("Error")
  }
 
  return (
    <>
    {status === "loading" && <p>Loading...</p>}
    {status === "unauthenticated" && <Link href='/api/auth/signin'>Login!</Link>}
    {status === "authenticated" && <div>
      <h2>Logged in as:</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut({redirect: false})}>Sign out</button>
      <form>
         <input type="password" name="key"  ref={inputRef} required/>
         <input type="file" name="file" ref={fileRef}required/>
         {!uploading && <button type="submit" onClick={handleSubmitClick}>submit</button>}
      </form>
      <div className="progress">
      <progress className="progressBar" value={progress} max="100"/>
      <span> {progress}%</span>
      </div></div>
}
    </>
)
}
