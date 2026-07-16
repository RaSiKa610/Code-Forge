"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import type { ProfileData } from "@/types/profile";

type Props = {
  user: ProfileData;
  isOwnProfile: boolean;
};

export default function ProfileHeader({
  user,
  isOwnProfile,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(
    user.isFollowing ?? false
  );

  const [loading, setLoading] = useState(false);

  async function handleFollowToggle() {
    if (loading) return;

    try {
      setLoading(true);

      const endpoint = isFollowing
        ? "/api/connections/unfollow"
        : "/api/connections/follow";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUserId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle follow status");
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
      alert("Failed to perform action");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      padded={false}
      className="overflow-hidden"
    >
      {/* Banner */}

      <div className="relative h-48 w-full overflow-hidden">
        {user.bannerImage ? (
          <Image
            src={user.bannerImage}
            alt="Banner"
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-violet-600/20
              via-fuchsia-500/10
              to-cyan-500/20
            "
          />
        )}
      </div>

      {/* Profile */}

      <div className="px-8 pb-8">
        <div
          className="
            -mt-20
            flex
            flex-col
            justify-between
            gap-6
            sm:flex-row
            sm:items-end
          "
        >
          {/* Left */}

          <div className="flex items-end gap-5">
            <Image
              src={
                user.image ??
                "/default-avatar.png"
              }
              alt={
                user.username ??
                "Avatar"
              }
              width={128}
              height={128}
              className="
                rounded-full
                border-4
                border-[var(--card)]
                bg-[var(--card)]
                shadow-2xl
                ring-2
                ring-[var(--accent)]/20
              "
            />

            <div className="pb-2">
              <h1
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  text-[var(--text)]
                "
              >
                {user.name}
              </h1>

              <p className="mt-1 text-[var(--muted)]">
                @{user.username}
              </p>

              {user.headline && (
                <p className="mt-3 text-[var(--text)]">
                  {user.headline}
                </p>
              )}
            </div>
          </div>

          {/* Right */}

          <div className="pb-2">
            {isOwnProfile ? (
              <Link href="/settings/profile">
                <Button variant="secondary">
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button
                variant={
                  isFollowing
                    ? "secondary"
                    : "primary"
                }
                onClick={handleFollowToggle}
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : isFollowing
                  ? "Following"
                  : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}