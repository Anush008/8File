import execute from "../../../utils/MySQL"

export default async function handler(req, res) {

    if(req.body.status == "success"){
        const premiumExpiry = new Date(new Date().setDate(new Date().getDate() + 30));
        execute("UPDATE `users_addtional` set `premium` = 1, `storageLimit` = `storageLimit` * 10,`premiumExpiry` = ?, `txnid` = ? where `email` = ?", [premiumExpiry, req.body.txnid, req.body.email]);
        execute("INSERT INTO `payments` values(?,?,?,?,?,?,?,?)", [req.body?.txnid, req.body?.bank_ref_num, req.body?.bankcode, req.body?.error, req.body?.mode, req.body?.status, req.body?.amount, req.body?.net_amount_debit ]);
        res.redirect("/");
    }
    else res.redirect("/")
}
