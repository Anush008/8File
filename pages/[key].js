import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Post = () => {
  const router = useRouter()
  const { key } = router.query;
  const file = {name:"docs.mp4", size: 545541556, key: "", uploadedOn: "23-3-20002"};

  return <p>Post: {key}</p>
}

export default Post