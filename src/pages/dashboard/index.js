import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import execute from '../../utils/MySQL';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";

export async function getServerSideProps(context) {

  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    const results = await execute("SELECT `ID`,  `SIZE`, `NAME`, `UPLOADEDON` FROM `files` WHERE `UPLOADEDBY` = ?", [session.user.id]);
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

export default function Dashboard() {
    const router = useRouter();
  const { data: session ,status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    }
  });
    return (
      <>   
    <div class="flex items-center pb-12 h-96 w-full justify-center p-12 bg-slate-100 mb-11">
    </div>
      </>
    )
  }