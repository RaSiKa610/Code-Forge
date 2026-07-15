import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function followUser(targetUserId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const currentUserId = session.user.id;

  // Prevent self-follow
  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself.");
  }

  // Prevent duplicate follows
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  if (existingFollow) {
    return {
      success: true,
      message: "Already following user",
    };
  }

  await prisma.follow.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  // Notification creation can be added later here

  return {
    success: true,
  };
}
