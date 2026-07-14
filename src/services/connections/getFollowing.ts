import { prisma } from "@/lib/prisma";

export async function getFollowing(userId: string) {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return following.map((f) => f.following);
}
