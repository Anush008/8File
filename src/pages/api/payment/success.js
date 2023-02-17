import execute from "../../../utils/MySQL"

export default async function handler(req, res) {
    //TODO: Verify payment hash before proceeding
    if(req.body.status == "success"){
        const premiumExpiry = new Date(new Date().setDate(new Date().getDate() + 30));
        execute("UPDATE `users_addtional` set `premium` = 1, `storageLimit` = `storageLimit` * 10,`premiumExpiry` = ?, `txnid` = ? where `email` = ?", [premiumExpiry, req.body.txnid, req.body.email]);
        execute("INSERT INTO `payments` values(?,?,?,?,?,?,?,?)", [req.body?.txnid, req.body?.bank_ref_num, req.body?.bankcode, req.body?.error, req.body?.mode, req.body?.status, req.body?.amount, req.body?.net_amount_debit ]);
        const phoneNumber = (await execute("SELECT `phone` FROM `users_addtional` WHERE `email` = ?", [req.body.email]))[0]?.phone;
        if(phoneNumber) fetch(process.env.WHATSAPP_API_URL + `/premiumpurchase?number=${phoneNumber}`);
        res.redirect("/");
    }
    else res.redirect("/")
}
