"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";

type Props = {
  user: any;
};

export default function ProfileHeader({
  user,
}: Props) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="relative h-48 w-full bg-[var(--panel-2)]">
        {user.bannerImage && (
          <Image
            src={user.bannerImage}
            alt="Banner"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="-mt-16 flex items-end gap-4">
          <Image
            src={
              user.image ||
              "/default-avatar.png"
            }
            alt={user.username || "avatar"}
            width={128}
            height={128}
            className="rounded-full border-4 border-[var(--panel)]"
          />

          <div className="pb-2">
            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-400">
              @{user.username}
            </p>

            {user.headline && (
              <p className="mt-2">
                {user.headline}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
