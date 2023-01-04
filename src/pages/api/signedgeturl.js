import s3 from '../../utils/AWS';

export default async function handler(req, res) {
    var url = new URL(s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "ef8cdf89-adfe-4b83-85eb-0a5497c1a7cd",
        Expires: 500000,
        SSECustomerAlgorithm: 'AES256',
      
      }))
      var options = {
        host: url.hostname,
        protocol: url.protocol,
        path: url.pathname + url.search,
        headers: {
          'x-amz-server-side-encryption-customer-algorithm': 'AES256',
          'x-amz-server-side-encryption-customer-key': "YWJjYWJjYWJjYWJjYWJjYWJjYWJjYWJjYWJjYWJjYWI=",
          'x-amz-server-side-encryption-customer-key-MD5': "I6ciDG2eKl3Mbtk8g3cOpA==",
        },
        method: 'GET'
      }
      res.status(200).json(options);
}