import Hero from "../components/Hero";
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import crypto from 'crypto';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const Pricing = dynamic(() => import("../components/Pricing"), {
  loading: () => 'Loading...',
});
const Stats = dynamic(() => import("../components/Stats"), {
  loading: () => 'Loading...',
});
const Updates = dynamic(() => import("../components/Updates"), {
  loading: () => 'Loading...',
});

export default function Home({paymentInfo}) {
  const [stats, setStats] = useState({
    downloads: 0,
    files: 0,
    encrypted: 0,
    users: 0
  });
  useEffect(() => {
    fetch("/api/getstats")
      .then(res => res.json())
      .then(data => setStats(data))
  }, []);
  return (
      <>
          <Hero />
          <Stats stats={stats}/>
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
  const txnId = crypto.randomBytes(6).toString("hex");;
  const productinfo = "8File - Premium Subscription";
  const {PAYU_PREMIUM_AMOUNT: amount,
        NEXT_PUBLIC_PAYU_KEY: key,
        PAYU_SALT: salt,
        PAYU_SURL: surl, PAYU_FURL: furl } = process.env;
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