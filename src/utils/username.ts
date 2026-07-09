import { PrismaClient } from "@prisma/client";

export function generateBaseUsername(email: string): string {
  return email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9]/g, "");
}
export async function createUniqueUsername(
  prisma: PrismaClient,
  email: string
): Promise<string> {
  const baseUsername = generateBaseUsername(email);
  let username = baseUsername;
  let counter = 1;
  while (
    await prisma.user.findUnique({
      where: {
        username,
      },
    })
  ) {
    username = `${baseUsername}${counter++}`;
  }

  return username;
}