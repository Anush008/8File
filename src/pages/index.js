import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Updates from "../components/Updates";
import Pricing from "../components/Pricing";
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import crypto from 'crypto';

export default function Home({paymentInfo}) {
  return (
      <>
          <Hero />
          <Stats />
          <Updates />
          <Pricing paymentInfo={paymentInfo || {}}/>
          </>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
  const email = session.user.email;
  const fname = session.user.name.split(" ")[0];
  const key = process.env.NEXT_PUBLIC_PAYU_KEY;
  const salt = process.env.PAYU_SALT;
  const txnId = crypto.randomBytes(6).toString("hex");;
  const amount = process.env.PAYU_PREMIUM_AMOUNT;
  const productinfo = "8File - Premium Subscription";
  const surl = process.env.PAYU_SURL;
  const furl = process.env.PAYU_FURL;
  const cryp = crypto.createHash('sha512');
  const text = key+'|'+txnId+'|'+amount+'|'+productinfo+'|'+fname+'|'+email+'|||||||||||'+salt;
  cryp.update(text);
  const hash = cryp.digest('hex');

  return {
    props: {
      paymentInfo: {email, fname, key, txnId, amount, productinfo, surl, furl, hash}
    },
  }}
  else return {
    props: {}
  }
}