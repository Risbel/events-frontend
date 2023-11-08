import NextAuth from "next-auth";
import login from "@/services/login";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode } from "jsonwebtoken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const res = await login({ email: email, password: password });

        if (res?.response?.status === 401) {
          throw new Error(res.response.data.error);
        } else {
          const token = res.accessToken;
          const refreshToken = res.refreshToken;

          const decoded: any = decode(token, process.env.SECRET_SIGNATURE);

          if (decoded) {
            return {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              image: decoded?.image,
              accessToken: token,
              refreshToken: refreshToken,
            };
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

interface TokenDecoded {
  id: string;
  name: string;
  email: string;
  image: string;
  iat: string;
  exp: string;
}
