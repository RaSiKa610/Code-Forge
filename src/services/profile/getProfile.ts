import { prisma } from "@/lib/prisma";

export async function getProfile(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      followers: true,
      following: true,
      achievements: {
        include: {
          achievement: true,
        },
      },
      submissions: true,
    },
  });

  if (!user) {
    return null;
  }

  const acceptedSubmissions = user.submissions.filter(
    (submission) => submission.status === "ACCEPTED"
  );

  const solvedProblems = new Set(
    acceptedSubmissions.map(
      (submission) => submission.problemId
    )
  );

  return {
    ...user,

    followersCount: user.followers.length,
    followingCount: user.following.length,

    solvedProblemsCount: solvedProblems.size,

    totalSubmissions: user.submissions.length,

    acceptedSubmissions: acceptedSubmissions.length,

    acceptanceRate:
      user.submissions.length === 0
        ? 0
        : Math.round(
            (acceptedSubmissions.length /
              user.submissions.length) *
              100
          ),
  };
}
