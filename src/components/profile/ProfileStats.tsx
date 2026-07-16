import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData;
};

export default function ProfileStats({ profile }: Props) {
  const stats = [
    {
      label: "Followers",
      value: profile.followersCount,
    },
    {
      label: "Following",
      value: profile.followingCount,
    },
    {
      label: "Friends",
      value: profile.friendsCount,
    },
    {
      label: "Solved",
      value: profile.solvedProblems,
    },
    {
      label: "Acceptance",
      value: `${profile.acceptanceRate}%`,
    },
  ];

  return (
    <Card>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <p className="font-display text-4xl font-bold text-[var(--text)]">
              {stat.value}
            </p>

            <p className="mt-2 text-xs uppercase tracking-wider text-[var(--muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
