import { prisma } from "@/lib/prisma";

export async function getProfile(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },

    include: {
      followers: true,
      following: true,

      submissions: {
        include: {
          problem: true,
        },
      },

      achievements: {
        include: {
          achievement: true,
        },
      },

      sentBattles: true,
      receivedBattles: true,
      wonBattles: true,
    },
  });

  if (!user) {
    return null;
  }

  const acceptedSubmissions = user.submissions.filter(
    (submission) =>
      submission.status === "ACCEPTED"
  );

  const solvedProblems = new Set(
    acceptedSubmissions.map(
      (submission) => submission.problemId
    )
  );

  const easySolved = acceptedSubmissions.filter(
    (submission) =>
      submission.problem.difficulty === "EASY"
  ).length;

  const mediumSolved = acceptedSubmissions.filter(
    (submission) =>
      submission.problem.difficulty === "MEDIUM"
  ).length;

  const hardSolved = acceptedSubmissions.filter(
    (submission) =>
      submission.problem.difficulty === "HARD"
  ).length;

  const battlesPlayed =
    user.sentBattles.length +
    user.receivedBattles.length;

  const wins = user.wonBattles.length;

  const losses = battlesPlayed - wins;

  const followersCount = user.followers.length;

  const followingCount = user.following.length;

  const friendsCount = user.followers.filter(
    (follower) =>
      user.following.some(
        (following) =>
          following.followingId ===
          follower.followerId
      )
  ).length;

  const totalSubmissions =
    user.submissions.length;

  const acceptedCount =
    acceptedSubmissions.length;

  const acceptanceRate =
    totalSubmissions === 0
      ? 0
      : Math.round(
          (acceptedCount * 100) /
            totalSubmissions
        );

  const winRate =
    battlesPlayed === 0
      ? 0
      : Math.round(
          (wins * 100) /
            battlesPlayed
        );

  return {
    ...user,

    followersCount,
    followingCount,
    friendsCount,

    solvedProblems:
      solvedProblems.size,

    easySolved,
    mediumSolved,
    hardSolved,

    totalSubmissions,

    acceptedSubmissions:
      acceptedCount,

    acceptanceRate,

    battlesPlayed,
    wins,
    losses,
    winRate,
  };
}