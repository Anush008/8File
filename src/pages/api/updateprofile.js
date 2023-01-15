import execute from '../../utils/MySQL';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const name = req.query.name || null;
        const phone = req.query.number || null;
        const id = req.query.id || null;
        const avatar = req.query.avatar || null;
        execute("UPDATE `users` SET `name`= ?, `image` = ? WHERE `id` = ?", [name,avatar, id]);
        execute("UPDATE `users_addtional` SET `phone`= ? WHERE `id` = ?", [phone, id]);
        console.log(req.query);
        res.status(200).json({});
    }
    else res.status(405).json({});
}