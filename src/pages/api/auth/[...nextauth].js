import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import text from "../../../utils/text";
import html from "../../../utils/html";
import {createTransport} from "nodemailer";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import execute from "../../../utils/MySQL";
//import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  pages: {
    newUser: "/dashboard/profile",
    signIn: "/signin",
  },
  adapter: TypeORMLegacyAdapter({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    synchronize: true
  }),
  callbacks: {
    async session({ session, token, user }) {
      if(!session.user.storageLimitMB && session.user.email){
        const results = await execute("SELECT * FROM `users_addtional` WHERE id=?", [user.id]);
        session.user = {...session.user, ...results[0], ...user};
        session.user.name ||= "Bruce Wayne";
        session.user.image ||= "/images/favicon.ico";
      }
      return session;
    }
  },
  
  providers: [ GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true
  }),
  // Auth0Provider({
  //   clientId: process.env.AUTH0_CLIENT_ID,
  //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //   issuer: process.env.AUTH0_ISSUER,
  //   allowDangerousEmailAccountLinking: true
  // }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true
  }),
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM,
          maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
          async sendVerificationRequest(params) {
            const { identifier, url, provider, theme } = params
            const { host } = new URL(url)
            // NOTE: You are not required to use `nodemailer`, use whatever you want.
            const transport = createTransport(provider.server);
            const number = (await execute("SELECT `phone` FROM `users_addtional` WHERE `email` = ?", [identifier]))[0]?.phone;
            if(number) fetch(process.env.WHATSAPP_API_URL + "/sendLink", {headers: {'Content-Type': 'application/json',"Authorization": "MODIOP"}, method: "POST", body: JSON.stringify({number, url: url})})
            const result = await transport.sendMail({
              to: identifier,
              from: provider.from,
              subject: `Sign in to ${host}`,
              text: text({ url, host }),
              html: html({ url, host, theme }),
            })
       

            const failed = result.rejected.concat(result.pending).filter(Boolean)
            if (failed.length) {
              throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
            }
          }
        })
  ],
  theme: {
    colorScheme: "light",
  }
}

export default NextAuth(authOptions)
