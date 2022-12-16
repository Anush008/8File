// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../utils/AWS';

export default async function handler(req, res) {
  const KEY_PARAM = req.query.key;
  const FILE_NAME = req.query.name;
  await s3.createPresignedPost({
    Fields: {
      key: uuidv4(),
    },
     Conditions: [
      ["starts-with", "$x-amz-server-side-encryption-customer-key", ""],
      ["starts-with", "$x-amz-server-side-encryption-customer-algorithm", ""],
      ["starts-with", "$X-Amz-Server-Side-Encryption-Customer-Key-MD5", ""]
    ],
    Expires: 3600,
    Bucket: 'witcherbucket21'
  }, (err, signed) => {
    if(err) res.end(err.message);
    const key = Buffer.alloc(32, KEY_PARAM);
    const md5 = crypto.createHash('md5').update(key) .digest("base64");
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Algorithm"] = "AES256";
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Key"] = key.toString('base64');
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Key-MD5"] = md5;
    res.status(200).json(signed);
  });
}
