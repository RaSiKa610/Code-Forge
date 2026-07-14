export interface CurrentUser {
  id: string;
  username: string | null;
  image?: string | null;
  rank: string;
  currentStreak: number;
  forgeCoins: number;
  powerScore: number;
}