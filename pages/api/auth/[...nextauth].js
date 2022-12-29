import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";

export const authOptions = {
  session: {strategy: "database",
  maxAge: 30 * 24 * 60 * 60,},
  adapter: TypeORMLegacyAdapter({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "anush",
    password: "anush",
    database: "upfile",
    synchronize: true,
  }),
  
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    })
  ],
}
export default NextAuth(authOptions)