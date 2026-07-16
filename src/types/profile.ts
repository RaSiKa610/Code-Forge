export interface ProfileData {
  id: string;

  name: string | null;
  username: string | null;
  email: string | null;

  image: string | null;
  bannerImage: string | null;

  bio: string | null;
  headline: string | null;

  location: string | null;
  website: string | null;
  githubUsername: string | null;
  linkedinUrl: string | null;

  rank: string;
  powerScore: number;
  contestRating: number;
  openToWork: string;

  currentStreak: number;
  longestStreak: number;
  streakFreezeTokens: number;

  forgeCoins: number;
  seasonPoints: number;

  followersCount: number;
  followingCount: number;
  friendsCount: number;

  solvedProblems: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;

  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;

  battlesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;

  achievements: {
    achievement: {
      id: string;
      key: string;
      name: string;
      description: string;
      emoji: string;
      isRare: boolean;
      isLegendary: boolean;
      category: string;
    };
  }[];

  followers: {
    followerId: string;
    followingId: string;
  }[];

  following: {
    followerId: string;
    followingId: string;
  }[];

  isFollowing?: boolean;
}