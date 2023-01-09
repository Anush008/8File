import execute from '../../utils/MySQL';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import dynamic from 'next/dynamic'

const DashboardTable = dynamic(() => import("../../components/DashboardTable"), {
  loading: () => 'Loading...',
});

export default function Dashboard({results}) {
  return (
    <DashboardTable results={results} />
  )
}

export async function getServerSideProps(context) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    const results = await execute("SELECT `ID`,  `SIZE`, `NAME`, `UPLOADEDON` FROM `files` WHERE `UPLOADEDBY` = ? ORDER BY `UPLOADEDON`", [session.user.id]);
    results.forEach((result) => { result.UPLOADEDON = result.UPLOADEDON.toLocaleString() });
    return {
      props: {results}
    }
  }
  else return {
    redirect: { 
        destination: '/',
        permanent: false}
}}

