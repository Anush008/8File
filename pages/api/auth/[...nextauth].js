import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
    name: 'Credentials',
      credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            console.log(credentials);
   return {id: 1, name: 'J Smith', email: 'test@gmailcom'};
        }
      })
  ],
}
export default NextAuth(authOptions)