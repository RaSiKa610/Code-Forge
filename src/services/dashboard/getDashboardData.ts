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
): Promise<DashboardData | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      currentStreak: true,
      forgeCoins: true,
      rank: true,

      submissions: {
        where: {
          status: "ACCEPTED",
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 5,

        include: {
          problem: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const recentActivity = user.submissions.map(
    (submission) => ({
      id: submission.id,
      title: `Solved ${submission.problem.title}`,
      reward: "+50 XP",
      time: formatTimeAgo(submission.createdAt),
    })
  );

  return {
    user: {
      currentStreak: user.currentStreak,
      forgeCoins: user.forgeCoins,
      rank: user.rank,
    },

    // TODO: Replace with real recommendation
    dailyChallenge: {
      title: "Binary Search",
      difficulty: "Medium",
      xp: 80,
      forgeCoins: 25,
      estimatedTime: "18 min",
    },

    // TODO: Replace with latest unfinished problem
    continueLearning: {
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      progress: 63,
      estimatedTime: "21 min",
    },

    // TODO: Replace with StreakLog data
    weeklyActivity: {
      solved: 14,
      hours: 11,
      activity: [80, 60, 100, 40, 75, 90, 65],
    },

    recentActivity,
  };
}

function formatTimeAgo(date: Date) {
  const diff = Date.now() - date.getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
}