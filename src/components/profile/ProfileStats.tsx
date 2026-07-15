import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
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
            <p className="text-3xl font-bold">
              {stat.value}
            </p>

            <p className="text-sm text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
