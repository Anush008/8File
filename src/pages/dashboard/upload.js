import FileUploader from '../../components/FileUploader';
import dynamic from 'next/dynamic'

const Updates = dynamic(() => import("../../components/Updates"), {
  loading: () => 'Loading...',
});

export default function Upload() {
  return (
    <>
      <FileUploader />
      <Updates />
    </>
  )
}