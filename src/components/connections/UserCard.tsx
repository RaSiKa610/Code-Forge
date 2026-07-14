"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type UserCardProps = {
  id: string;
  username: string;
  image?: string | null;
  initialFollowing?: boolean;
};

export default function UserCard({
  id,
  username,
  image,
  initialFollowing = false,
}: UserCardProps) {
  const [profileImage, setProfileImage] = useState(
    image && image.trim() !== ""
      ? image
      : "/default-avatar.png"
  );

  const [isFollowing, setIsFollowing] =
    useState(initialFollowing);

  const [loading, setLoading] = useState(false);

  async function handleFollowToggle() {
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
          targetUserId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex items-center justify-between">
      <Link
        href={`/profile/${username}`}
        className="flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <Image
          src={profileImage}
          alt={username}
          width={48}
          height={48}
          className="rounded-full"
          onError={() => setProfileImage("/default-avatar.png")}
        />

        <div>
          <p className="font-semibold">
            @{username}
          </p>
        </div>
      </Link>

      <Button
        variant={
          isFollowing ? "secondary" : "primary"
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
    </Card>
  );
}
