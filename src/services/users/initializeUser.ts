import { PrismaClient } from "@prisma/client";
import { createUniqueUsername } from "@/utils/username";

export async function initializeUser(
  prisma: PrismaClient,
  userId: string,
  email: string
): Promise<void> {
  const username = await createUniqueUsername(prisma, email);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });
}