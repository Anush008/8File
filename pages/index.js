import {useRef, useState} from 'react';
import axios from 'axios';

export default function Home() {
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const handleSubmitClick = async(e) => {
    const file = fileRef.current.files[0];
    e.preventDefault();
    const {url, fields} = await fetch(`/api/signedposturl?key=${inputRef.current.value}&name=${file.name}`).then(response => response.json());
    const data = {...fields,file};
    const formData  = new FormData();
    for (const name in data) formData.append(name, data[name]);
    setUploading(true);
    const response = await axios.post(url, formData, {onUploadProgress: (event) => setProgress(Math.round((event.loaded * 100) / event.total)),cancelToken: source.token}).catch((thrown) => {if (axios.isCancel(thrown)) console.log('Request canceled', thrown.message);});
    response.status == 204 ? alert('success') : alert('error');
    setUploading(false);
  }
 
  const handleAbortClick = async(e) => {
    console.log(1);
    if(uploading){
      console.log(2);
    source.cancel('Operation canceled by the user.');
    setUploading(false);}
  }
  return (
    <div>
      <form>
         <input type="password" name="key"  ref={inputRef} required/>
         <input type="file" name="file" ref={fileRef}required/>
         {!uploading && <button type="submit" onClick={handleSubmitClick}>submit</button>}
         {uploading && <button type="button" onClick={handleAbortClick}>abort</button>}
      </form>
      <div className="progress">
      <progress className="progressBar" value={progress} max="100"/>
      <span> {progress}%</span>
      </div>
    </div>
  )
}
