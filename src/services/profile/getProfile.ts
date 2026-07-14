import { prisma } from "@/lib/prisma";

export async function getProfile(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },

    include: {
      followers: true,
      following: true,

      submissions: true,

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

  const acceptedSubmissions =
    user.submissions.filter(
      (submission) =>
        submission.status === "ACCEPTED"
    );

  const solvedProblems =
    new Set(
      acceptedSubmissions.map(
        (submission) =>
          submission.problemId
      )
    );

  const easySolved = 0;
  const mediumSolved = 0;
  const hardSolved = 0;

  const battlesPlayed =
    user.sentBattles.length +
    user.receivedBattles.length;

  const wins =
    user.wonBattles.length;

  const losses =
    battlesPlayed - wins;

  return {
    ...user,

    followersCount:
      user.followers.length,

    followingCount:
      user.following.length,

    friendsCount:
      user.followers.filter(
        (follower) =>
          user.following.some(
            (following) =>
              following.followingId ===
              follower.followerId
          )
      ).length,

    solvedProblems:
      solvedProblems.size,

    easySolved,
    mediumSolved,
    hardSolved,

    totalSubmissions:
      user.submissions.length,

    acceptedSubmissions:
      acceptedSubmissions.length,

    acceptanceRate:
      user.submissions.length === 0
        ? 0
        : Math.round(
            (acceptedSubmissions.length *
              100) /
            user.submissions.length
          ),

    battlesPlayed,
    wins,
    losses,

    winRate:
      battlesPlayed === 0
        ? 0
        : Math.round(
            (wins * 100) /
            battlesPlayed
          ),
  };
}
