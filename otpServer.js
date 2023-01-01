const makeWASocket = require('@adiwajshing/baileys').default
const { DisconnectReason, useSingleFileAuthState } = require('@adiwajshing/baileys')
const fs = require('fs')
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
const { state, saveState } = useSingleFileAuthState('./auth_info.json')
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
async function main() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })
  sock.ev.on('creds.update', saveState)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
      console.log('connection closed due to ' + lastDisconnect.error + ', reconnecting ' + shouldReconnect)
      if (shouldReconnect) main();

    } else if (connection === 'open') console.log('opened connection');
  })

  app.post("/sendLink", async (req, res) => {
    if (req.headers["authorization"] != process.env.AUTHORIZATION)
      return res.sendStatus(401);
    console.log(req.body);
    const URL = req.body.url;
    const PHONE_NUMBER = req.body.number + "@c.us";
    console.log(URL, PHONE_NUMBER)

    const buttonMessage = {
      image: fs.readFileSync("large.png"),
      caption: "8File - The truly private file storage.",
      text: `*Your ephemeral login link.*

Sign in to your account by clicking the link below:
${URL}

Expires on: ${new Date(new Date().getTime() + 60 * 60 * 12 * 1000).toLocaleString("en-AU", { timeZone: "Asia/Calcutta" })}`,
      footer: "ℹ️ Do not share or forward the link.",
      headerType: 1
    }
    try {
      await sock.sendMessage(PHONE_NUMBER, buttonMessage);
      res.sendStatus(200);
    }
    catch (e) {
      res.sendStatus(400)
    }
  })

  app.all("*", (req, res) => {
    res.end("AnushXD");
  })
  app.listen(3000, () => {
    console.log("Server is running!!");
  })

}

main()
