import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type UpdateProfileData = {
  name?: string;
  bio?: string;
  headline?: string;
  location?: string;
  website?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  image?: string;
  bannerImage?: string;
};

export async function updateProfile(
  data: UpdateProfileData
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: data.name,
      bio: data.bio,
      headline: data.headline,
      location: data.location,
      website: data.website,
      githubUsername: data.githubUsername,
      linkedinUrl: data.linkedinUrl,
      image: data.image,
      bannerImage: data.bannerImage,
    },
  });

  return updatedUser;
}
