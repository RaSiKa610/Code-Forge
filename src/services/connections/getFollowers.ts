import { prisma } from "@/lib/prisma";

export async function getFollowers(userId: string) {
  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    select: {
      follower: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return followers.map((f) => f.follower);
}
