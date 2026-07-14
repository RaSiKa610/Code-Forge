import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { initializeUser } from "@/services/users/initializeUser";

const nextAuth = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "database",
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async session({ session, user }) {

            if (session.user) {
            session.user.id = user.id;

            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },

                select: {
                username: true,
                rank: true,
                powerScore: true,
                currentStreak: true,
                forgeCoins: true,
                },
            });

            if (dbUser) {
                session.user.username = dbUser.username;
                session.user.rank = dbUser.rank;
                session.user.powerScore = dbUser.powerScore;
                session.user.currentStreak = dbUser.currentStreak;
                session.user.forgeCoins = dbUser.forgeCoins;
            }
            }

            return session;
        },
        async signIn() {
            return true;
        }
    },
    events: {
  async createUser({ user }) {
        if (!user.email || !user.id) return;

    try {
      await initializeUser(
        prisma,
        user.id,
        user.email
      );
    } catch (error) {
      console.error("User initialization failed:", error);
      // TODO:
    // Retry initialization when the user next visits the dashboard.
    }
  },
}})

export const handlers = nextAuth.handlers;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;

export async function auth() {
  return {
    user: {
      id: "abc123",
      name: "Sujal Maurya",
      email: "sujal@example.com",
      username: "sujal_maurya",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      rank: "BRONZE",
      powerScore: 0,
      currentStreak: 0,
      forgeCoins: 0,
    },
  };
}