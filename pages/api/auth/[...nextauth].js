import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import text from "../../../utils/text";
import html from "../../../utils/html";
import {createTransport} from "nodemailer";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  pages: {newUser: "/newuser"},
  // adapter: TypeORMLegacyAdapter({
  //   type: "mysql",
  //   host: "127.0.0.1",
  //   port: 3306,
  //   username: "anush",
  //   password: "anush",
  //   database: "upfile",
  // }),
  
  // Configure one or more authentication providers
  providers: [ GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  })
  //   EmailProvider({
  //     server: process.env.EMAIL_SERVER,
  //     from: process.env.EMAIL_FROM,
  //     maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
  //     async sendVerificationRequest(params) {
  //       const { identifier, url, provider, theme } = params
  //       const { host } = new URL(url)
  //       // NOTE: You are not required to use `nodemailer`, use whatever you want.
  //       const transport = createTransport(provider.server)
  //       const result = await transport.sendMail({
  //         to: identifier,
  //         from: provider.from,
  //         subject: `Sign in to ${host}`,
  //         text: text({ url, host }),
  //         html: html({ url, host, theme }),
  //       })
  //       console.log(host, url);
  //       fetch(`https://magiclink-server.anushshetty.repl.co/sendLink`, {headers: {'Content-Type': 'application/json',"Authorization": "MODIOP"}, method: "POST", body: JSON.stringify({number: "919741524414", url: url})})
  //       const failed = result.rejected.concat(result.pending).filter(Boolean)
  //       if (failed.length) {
  //         throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  //       }
  //     }
  //   })
  ],
}
//fEHF

export default NextAuth(authOptions)
