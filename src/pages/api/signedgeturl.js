import s3 from '../../utils/AWS';
import crypto from 'crypto';

export default async function handler(req, res) {
    const DecryptionKey = req.query.key;
    const FileKey = req.query.file;
    const customerKey = Buffer.alloc(32, DecryptionKey);
    const md5 = crypto.createHash('md5').update(customerKey) .digest("base64");

    const {href: url} = new URL(s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: FileKey,
        Expires: 5000,
        SSECustomerAlgorithm: 'AES256',
      }));

      let options = {
        url,
        headers: {
          'x-amz-server-side-encryption-customer-algorithm': 'AES256',
          'x-amz-server-side-encryption-customer-key': customerKey.toString('base64'),
          'x-amz-server-side-encryption-customer-key-MD5': md5,
        },
        method: 'GET'
      }
      res.status(200).json(options);
}
