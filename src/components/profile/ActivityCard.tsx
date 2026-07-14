import { Card } from "@/components/ui/Card";

export default function ActivityCard({ profile }: { profile: any }) {
  return (
    <Card>
      <h3 className="text-lg font-bold mb-4">Activity</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[var(--muted)] text-sm">Battles Played</p>
          <p className="text-xl font-semibold mt-1">{profile.battlesPlayed}</p>
        </div>
        <div>
          <p className="text-[var(--muted)] text-sm">Wins</p>
          <p className="text-xl font-semibold mt-1 text-green-400">{profile.wins}</p>
        </div>
        <div>
          <p className="text-[var(--muted)] text-sm">Losses</p>
          <p className="text-xl font-semibold mt-1 text-red-400">{profile.losses}</p>
        </div>
      </div>
    </Card>
  );
}
