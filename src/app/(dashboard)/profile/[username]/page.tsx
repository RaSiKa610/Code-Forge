"use client";

import { use, useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import RankCard from "@/components/profile/RankCard";
import ActivityCard from "@/components/profile/ActivityCard";
import EconomyCard from "@/components/profile/EconomyCard";
import SocialLinks from "@/components/profile/SocialLinks";
import AchievementSection from "@/components/profile/AchievementSection";

export default function ProfilePage({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {
  const { username } = use(params);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/profile/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div className="p-8 text-[var(--muted)]">Loading...</div>;
  }

  if (!profile || profile.error) {
    return <div className="p-8 text-[var(--muted)]">User not found</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <ProfileHeader user={profile} />

      <ProfileStats profile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ActivityCard profile={profile} />
          <AchievementSection profile={profile} />
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
