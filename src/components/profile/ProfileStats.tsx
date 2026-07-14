import { Card } from "@/components/ui/Card";

export default function ProfileStats({ profile }: { profile: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="text-center">
        <p className="text-[var(--muted)] text-sm">Solved Problems</p>
        <p className="text-2xl font-bold mt-1">{profile.solvedProblems}</p>
      </Card>
      <Card className="text-center">
        <p className="text-[var(--muted)] text-sm">Acceptance Rate</p>
        <p className="text-2xl font-bold mt-1">{profile.acceptanceRate}%</p>
      </Card>
      <Card className="text-center">
        <p className="text-[var(--muted)] text-sm">Followers</p>
        <p className="text-2xl font-bold mt-1">{profile.followersCount}</p>
      </Card>
      <Card className="text-center">
        <p className="text-[var(--muted)] text-sm">Following</p>
        <p className="text-2xl font-bold mt-1">{profile.followingCount}</p>
      </Card>
    </div>
  );
}
