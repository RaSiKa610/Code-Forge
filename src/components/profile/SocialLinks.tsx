import Link from "next/link";

import { Globe, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData;
};

export default function SocialLinks({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold text-[var(--text)]">
        Social Links
      </h2>

      <div className="space-y-4">

        {profile.location && (
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <MapPin
              size={18}
              className="text-[var(--accent)]"
            />

            <span>{profile.location}</span>
          </div>
        )}

        {profile.website && (
          <Link
            href={profile.website}
            target="_blank"
            className="
              flex
              items-center
              gap-3
              text-[var(--text)]
              transition-colors
              hover:text-[var(--accent)]
            "
          >
            <Globe size={18} />

            <span className="truncate">
              {profile.website}
            </span>
          </Link>
        )}

        {profile.githubUsername && (
          <Link
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            className="
              flex
              items-center
              gap-3
              text-[var(--text)]
              transition-colors
              hover:text-[var(--accent)]
            "
          >
            <FaGithub className="h-[18px] w-[18px]" />

            <span>
              {profile.githubUsername}
            </span>
          </Link>
        )}

        {profile.linkedinUrl && (
          <Link
            href={profile.linkedinUrl}
            target="_blank"
            className="
              flex
              items-center
              gap-3
              text-[var(--text)]
              transition-colors
              hover:text-[var(--accent)]
            "
          >
            <FaLinkedin className="h-[18px] w-[18px]" />

            <span>LinkedIn Profile</span>
          </Link>
        )}

        {!profile.location &&
          !profile.website &&
          !profile.githubUsername &&
          !profile.linkedinUrl && (
            <p className="text-sm text-[var(--muted)]">
              No social links added yet.
            </p>
          )}

      </div>
    </Card>
  );
}