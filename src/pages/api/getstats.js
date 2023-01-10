import execute from "../../utils/MySQL";

export default async function handler(req, res) {
const stats = {};
const {DOWNLOADS, FILES, ENCRYPTED} = (await execute("SELECT SUM(`DOWNLOADS`) AS `DOWNLOADS`, COUNT(*) AS `FILES`, SUM(`SIZE`) AS `ENCRYPTED` FROM `files`"))[0];
    const {USERS} = (await execute("SELECT COUNT(*) AS `USERS` FROM `users`"))[0];
    stats.downloads = DOWNLOADS;
    stats.files = FILES;
    stats.encrypted = ENCRYPTED;
    stats.users = USERS;
res.setHeader('Cache-Control', 's-maxage=1440000');
res.json(stats)
}