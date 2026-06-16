import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    CredentialsProvider({
      id: "phone", name: "Phone",
      credentials: { phone: {}, otp: {} },
      async authorize(credentials: any) {
        if (!credentials?.phone) return null;
        await connectDB();
        let user = await User.findOne({ phone: credentials.phone });
        if (!user) user = await User.create({ phone: credentials.phone, name: "User " + credentials.phone.slice(-4) });
        return { id: user._id.toString(), name: user.name, phone: user.phone };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        await connectDB();
        if (!(await User.findOne({ email: user.email }))) {
          await User.create({ name: user.name, email: user.email, avatar: user.image, isVerified: true });
        }
      }
      return true;
    },
    async session({ session, token }: any) {
      if (token.sub) {
        const dbUser = await (await connectDB()).models?.User?.findById?.(token.sub) || await (await import("@/models/User")).default.findById(token.sub);
        if (dbUser) session.user = { ...session.user, id: dbUser._id.toString(), phone: dbUser.phone, region: dbUser.region };
      }
      return session;
    },
    async jwt({ token, user }: any) { if (user) token.sub = user.id; return token; },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};
