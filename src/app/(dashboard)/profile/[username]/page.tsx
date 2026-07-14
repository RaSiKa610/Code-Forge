"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import RankCard from "@/components/profile/RankCard";
import ActivityCard from "@/components/profile/ActivityCard";
import EconomyCard from "@/components/profile/EconomyCard";
import SocialLinks from "@/components/profile/SocialLinks";
import AchievementSection from "@/components/profile/AchievementSection";
import { Button } from "@/components/ui/Button";

export default function ProfilePage({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {
  const { username } = use(params);

  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Load session
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setSession(data));

    // Load profile
    fetch(`/api/profile/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, [username]);

  // Check if current user is following this profile
  useEffect(() => {
    if (profile && session?.user?.id) {
      const following = profile.followers.some(
        (f: any) => f.followerId === session.user.id
      );
      setIsFollowing(following);
    }
  }, [profile, session]);

  async function handleFollowToggle() {
    if (!session?.user) {
      alert("Please log in to follow users");
      return;
    }

    try {
      const response = await fetch("/api/connections/toggle-follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followingId: profile.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle follow status");
      }

      setIsFollowing(!isFollowing);
      // Reload profile to refresh follower count
      const updatedProfile = await fetch(`/api/profile/${username}`).then((res) =>
        res.json()
      );
      setProfile(updatedProfile);
    } catch (err) {
      console.error(err);
      alert("Failed to perform action");
    }
  }

  if (loading) {
    return <div className="p-8 text-[var(--muted)]">Loading...</div>;
  }

  if (!profile || profile.error) {
    return <div className="p-8 text-[var(--muted)]">User not found</div>;
  }

  const isOwner = session?.user?.username === username;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <ProfileHeader user={profile} />

      {/* Action Bar */}
      <div className="flex justify-end gap-3 px-4">
        {isOwner ? (
          <Link href="/settings/profile">
            <Button variant="secondary">Edit Profile</Button>
          </Link>
        ) : (
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      {/* Stats Widget */}
      <ProfileStats profile={profile} />

      {/* Main Grid Layout */}
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
