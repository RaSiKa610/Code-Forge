import { PrismaClient } from "@prisma/client";

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

  continueProblem: {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    progress: number;
    estimatedTime: string;
  };
}

export async function getDashboardData(
  prisma: PrismaClient,
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

    continueProblem: {
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        progress: 63,
        estimatedTime: "21 min",
    },
    };
}