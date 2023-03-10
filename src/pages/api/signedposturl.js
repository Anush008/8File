// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto';
import s3 from '../../utils/AWS';
import execute from '../../utils/MySQL';

export default async function handler(req, res) {
  const PASSPHRASE = req.query.key;
  const FILE_NAME = req.query.name;
  const FILE_ID = crypto.randomBytes(3).toString("hex");
  const KEY = FILE_ID + "-" + FILE_NAME;
  const FILE_SIZE = req.query.size;
  const UPLOADER_ID = req.query.uploaderId;
  const AUTODELETEDATE = req.query.autodelete || null;
 
  await s3.createPresignedPost({
    Fields: {
      key: KEY,
    },
     Conditions: [
      ["starts-with", "$x-amz-server-side-encryption-customer-key", ""],
      ["starts-with", "$x-amz-server-side-encryption-customer-algorithm", ""],
      ["starts-with", "$X-Amz-Server-Side-Encryption-Customer-Key-MD5", ""]
    ],
    Expires: 3600,
    Bucket: process.env.AWS_BUCKET_NAME,
  }, async(err, signed) => {
    if(err) res.end(err.message);
    const customerKey = Buffer.alloc(32, PASSPHRASE);
    const md5 = crypto.createHash('md5').update(customerKey) .digest("base64");
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Algorithm"] = "AES256";
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Key"] = customerKey.toString('base64');
    signed.fields["X-Amz-Server-Side-Encryption-Customer-Key-MD5"] = md5;
    signed.fileId = FILE_ID;
    execute("INSERT INTO `files` (`ID`, `S3KEY`, `SIZE`, `NAME`, `UPLOADEDBY`, `AUTODELETE`) VALUES (?, ?, ?, ?, ?, ?)", [FILE_ID, KEY, FILE_SIZE, FILE_NAME, UPLOADER_ID, AUTODELETEDATE]).catch((e) => console.log(e.message));
    res.status(200).json(signed);
  });
}
