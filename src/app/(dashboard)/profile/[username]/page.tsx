import { notFound } from "next/navigation";

import { auth } from "@/auth";

import { getProfile } from "@/services/profile/getProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import RankCard from "@/components/profile/RankCard";
import ActivityCard from "@/components/profile/ActivityCard";
import EconomyCard from "@/components/profile/EconomyCard";
import SocialLinks from "@/components/profile/SocialLinks";
import AchievementSection from "@/components/profile/AchievementSection";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { username } = await params;

  const session = await auth();

  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  const isOwnProfile =
  session?.user?.username?.toLowerCase() ===
  username.toLowerCase();

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">

      <ProfileHeader
        user={profile}
        isOwnProfile={isOwnProfile}
      />

      <ProfileStats profile={profile} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="space-y-6 md:col-span-2">
          <ActivityCard profile={profile} />

          <AchievementSection
            profile={profile}
          />
        </div>

        <div className="space-y-6">
          <RankCard profile={profile} />

          <EconomyCard profile={profile} />

          <SocialLinks profile={profile} />
        </div>

      </div>

    </div>
  );
}