import { Card } from "@/components/ui/Card";

export default function RankCard({ profile }: { profile: any }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-[var(--muted)] text-sm">Contest Rating</p>
        <p className="text-2xl font-bold mt-1">{profile.contestRating}</p>
      </div>
      <div>
        <p className="text-[var(--muted)] text-sm">Rank Tier</p>
        <p className="text-2xl font-bold mt-1 text-[var(--accent)]">{profile.rank}</p>
      </div>
    </Card>
  );
}
