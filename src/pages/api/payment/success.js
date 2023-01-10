import execute from "../../../utils/MySQL";
export default async function handler(req, res) {

    if(req.body.status == "success"){
        console.log("HRE!")
        const premiumExpiry = new Date(new Date().setDate(new Date().getDate() + 30));
        execute("UPDATE `users_addtional` set `premium` = 1, `storageLimit` = `storageLimit` * 10,`premiumExpiry` = ? where `email` = ?", [premiumExpiry, req.body.email]);
        res.redirect("/");
    }
    else res.json(req.body)
}
