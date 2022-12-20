import { useRouter } from 'next/router'
import execute from '../utils/MySQL';
export async function getServerSideProps(context) {
  const { key } = context.query;
  const result = await execute("SELECT * FROM `files` WHERE `ID` = ?", [key]);
  if (result.length === 0) {
    return {
      notFound: true,
    }
  }
  const data = result[0];
  console.log(data);
  return {
   props: data
  }
}

const Post = ({ID, S3KEY, SIZE, NAME}) => {
  return <p>Post: {S3KEY}</p>
}
export default Post