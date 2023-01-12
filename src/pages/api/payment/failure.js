export default async function handler(req, res) {
    console.log(req.body);
    res.redirect('/');
}