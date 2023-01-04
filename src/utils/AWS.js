import {S3} from 'aws-sdk';
const s3 = new S3({
  region: 'us-east-2',
   accessKeyId: process.env.AWS_ACCESS_KEYY,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYY
});

export default s3;
