import execute from "./MySQL";

const getStats = async () => {
    const stats = {};
    const downloads = await execute("SELECT SUM(`DOWNLOADS`) AS `DOWNLOADS` FROM `files`");
    const users = await execute("SELECT COUNT(*) AS `USERS` FROM `users`");
    const files = await execute("SELECT COUNT(*) AS `FILES` FROM `files`");
    const encrypted = await execute("SELECT SUM(SIZE) AS `ENCRYPTED` FROM `files`");
    stats.downloads = downloads[0].DOWNLOADS;
    stats.users = users[0].USERS;
    stats.files = files[0].FILES;
    stats.encrypted = encrypted[0].ENCRYPTED;
};

export default getStats;

