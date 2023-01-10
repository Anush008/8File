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