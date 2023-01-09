import execute from '../../utils/MySQL';

export default async function handler(req, res) {
const S3KEY = req.query.S3KEY;
execute("UPDATE `files` SET `DOWNLOADS` = `DOWNLOADS` + 1 WHERE `S3KEY` = ?",[S3KEY]).catch((e) => {
res.status(400).json({error: true, message: e.message});    
console.log(e.message)})
res.status(200).json({incrementd: true});
}