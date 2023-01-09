
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import formatBytes from "../utils/fileSizeParser";
import { useState } from "react";

export default function DashboardTable({results}) {
    const router = useRouter();
    
    const { data: session ,status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/");
      }
    });
    const handleDelete = async(S3KEY, NAME, ID, setDeleting) => {
      setDeleting(true);
      const response = await fetch(`/api/deleteobject?key=${S3KEY}`, {method: "DELETE"});
      if (response.status === 200) {
        document.getElementById(ID).remove();
        alert(`Deleted ${NAME} permanently.`);
      }
      else {
        alert("Something went wrong");
      }
      setDeleting(false);
    }
      return (<>
      {!!results.length ? <div className="hero min-h-screen bg-slate-100 mb-10">
        <table class="bg-slate-100 overflow-x-auto table w-full flex flex-col min-h-screen shadow-xl border-2 rounded-3xl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Size</th>
            <th>Uploaded On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="bg-slate-100">
          {results.map((result) => {
        const [deleting, setDeleting] = useState(false);
        return (<tr id={result?.ID}>
        <td>{result?.ID}</td>
            <td>
              <div class="flex items-center space-x-3">  
                <div>
                  <div class="font-bold">{result?.NAME.split(".")[0]}</div>
                  <span class="badge badge-ghost badge-sm">{"." + result?.NAME.split(".")[1]}</span>
                </div>
              </div>
            </td>
            <td>{formatBytes(result?.SIZE)}</td>
            <td>{result?.UPLOADEDON}</td>
            <th>
            <div className="btn-group">
      <button className={`btn btn-error btn-outline btn-square ${deleting ? "loading" : ""}`} onClick={() => handleDelete(result.S3KEY, result.NAME, result.ID, setDeleting)}>{deleting ? "" : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>}</button>
      <button className="btn btn-success btn-outline btn-square" onClick={() => {router.push(`/${result.ID}`)}}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" width="20" height="20" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16"> <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/> <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/> </svg></button>
    </div>
            </th>
          </tr>)})}
        </tbody>
      </table>
      </div> : <div class="hero min-h-screen bg-slate-100 mb-10">
      <div className="hero-content text-center">
        <h1 class="text-4xl font-bold">No Files Found</h1></div>
        </div>}
      </>)
    }