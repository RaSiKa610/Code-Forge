import { prisma } from "@/lib/prisma";

export async function getFriends(userId: string) {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
      following: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    select: {
      followerId: true,
    },
  });

  const followerSet = new Set(
    followers.map((f) => f.followerId)
  );

  return following
    .filter((f) => followerSet.has(f.followingId))
    .map((f) => f.following);
}
