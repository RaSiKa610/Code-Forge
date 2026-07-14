import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      rank: string;
      powerScore: number;
      currentStreak: number;
      forgeCoins: number;
    } & DefaultSession["user"];
  }
}