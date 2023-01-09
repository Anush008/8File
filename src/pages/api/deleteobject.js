import s3 from '../../utils/AWS';
import execute from '../../utils/MySQL';

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: req?.query?.key
       };
    execute("DELETE FROM `files` WHERE `S3KEY`= ?", [req?.query?.key]).catch((e) => console.log(e.message));
    
    s3.deleteObject(params, function(err, data) {
    if (err) {
        res.status(400).json({"error": "true"});
    }
    else {res.status(200).json({});
    }; 
      });
    }
    else res.status(405).json({});
}