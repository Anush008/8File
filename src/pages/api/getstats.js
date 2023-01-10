import execute from "../../utils/MySQL";

let stats = {
    downloads: 0,
    files: 0,
    encrypted: 0,
    users: 0
  };

setInterval(async () => {
    const {DOWNLOADS, FILES, ENCRYPTED} = (await execute("SELECT SUM(`DOWNLOADS`) AS `DOWNLOADS`, COUNT(*) AS `FILES`, SUM(`SIZE`) AS `ENCRYPTED` FROM `files`"))[0];
    const {USERS} = (await execute("SELECT COUNT(*) AS `USERS` FROM `users`"))[0];
    stats.downloads = DOWNLOADS;
    stats.files = FILES;
    stats.encrypted = ENCRYPTED;
    stats.users = USERS;
}, 1000 * 60 * 5);

export default async function handler(req, res) {
res.setHeader('Cache-Control', 's-maxage=1440000');
res.json(stats)
}