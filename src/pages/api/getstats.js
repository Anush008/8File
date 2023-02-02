import execute from "../../utils/MySQL";

export default async function handler(req, res) {
const stats = {};
const [[{DOWNLOADS, FILES, ENCRYPTED}], [{USERS}]] = await Promise.all([
    execute("SELECT SUM(`DOWNLOADS`) AS `DOWNLOADS`, COUNT(*) AS `FILES`, SUM(`SIZE`) AS `ENCRYPTED` FROM `files`"),
    execute("SELECT COUNT(*) AS `USERS` FROM `users`")
]);
stats.downloads = DOWNLOADS;
stats.files = FILES;
stats.encrypted = ENCRYPTED;
stats.users = USERS;
res.setHeader('Cache-Control', 's-maxage=60,stale-while-revalidate=1296000');
res.json(stats)
}
