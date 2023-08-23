import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import execute from "../../../utils/MySQL";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../utils/prisma'
//import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  pages: {
    newUser: "/dashboard/profile",
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),
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
       
        })
  ],
  theme: {
    colorScheme: "light",
  }
}

export default NextAuth(authOptions)
