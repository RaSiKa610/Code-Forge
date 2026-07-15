import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function unfollowUser(targetUserId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const currentUserId = session.user.id;

  await prisma.follow.deleteMany({
    where: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return {
    success: true,
  };
}
