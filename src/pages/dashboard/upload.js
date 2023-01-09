import dynamic from 'next/dynamic'

const FileUploader = dynamic(() => import("../../components/FileUploader"), {
  loading: () => 'Loading...',
});

export default function Upload() {
  return (
    <>
      <FileUploader />
    </>
  )
}