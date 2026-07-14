import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const USERS_PER_PAGE = 20;

export async function searchUsers(query: string, page: number = 1) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const currentUserId = session.user.id;

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
      },
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      username: true,
      image: true,
      followers: {
        where: {
          followerId: currentUserId,
        },
        select: {
          followerId: true,
        },
      },
    },
    skip: (page - 1) * USERS_PER_PAGE,
    take: USERS_PER_PAGE + 1,
  });

  const hasMore = users.length > USERS_PER_PAGE;

  const formattedUsers = users.map((user) => ({
    id: user.id,
    username: user.username,
    image: user.image,
    initialFollowing: user.followers.length > 0,
  }));

  return {
    users: formattedUsers.slice(0, USERS_PER_PAGE),
    hasMore,
  };
}
