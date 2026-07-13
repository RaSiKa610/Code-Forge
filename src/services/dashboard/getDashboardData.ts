import { prisma } from "@/lib/prisma";

export interface DashboardData {
  user: {
    currentStreak: number;
    forgeCoins: number;
    rank: string;
  };

  dailyChallenge: {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    xp: number;
    forgeCoins: number;
    estimatedTime: string;
  };

  continueLearning: {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    progress: number;
    estimatedTime: string;
  };

  weeklyActivity: {
    solved: number;
    hours: number;
    activity: number[];
  };

  recentActivity: {
    id: string;
    title: string;
    reward: string;
    time: string;
  }[];
}

export async function getDashboardData(
  userId: string
): Promise<DashboardData> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      currentStreak: true,
      forgeCoins: true,
      rank: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user: {
        currentStreak: user.currentStreak,
        forgeCoins: user.forgeCoins,
        rank: user.rank,
    },

    dailyChallenge: {
        title: "Binary Search",
        difficulty: "Medium",
        xp: 80,
        forgeCoins: 25,
        estimatedTime: "18 min",
    },

    continueLearning: {
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        progress: 63,
        estimatedTime: "21 min",
    },
    weeklyActivity: {
        solved: 14,
        hours: 11,
        activity: [80, 60, 100, 40, 75, 90, 65],
    },
    recentActivity: [
      {
        id: "1",
        title: "Solved Two Sum",
        reward: "+50 XP",
        time: "2 min ago",
      },
      {
        id: "2",
        title: "Won a 1v1 Battle",
        reward: "+120 XP",
        time: "1 hour ago",
      },
      {
        id: "3",
        title: "Maintained 7-Day Streak",
        reward: "+20 Forge Coins",
        time: "Yesterday",
      },
    ],
  };
}