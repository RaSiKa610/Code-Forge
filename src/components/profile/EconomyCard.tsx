import { Card } from "@/components/ui/Card";

export default function EconomyCard({ profile }: { profile: any }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-[var(--muted)] text-sm">Forge Coins</p>
        <p className="text-xl font-bold mt-1 text-yellow-400">{profile.forgeCoins} 🪙</p>
      </div>
      <div>
        <p className="text-[var(--muted)] text-sm">Streak</p>
        <p className="text-xl font-bold mt-1 text-orange-400">🔥 {profile.currentStreak} Days</p>
      </div>
    </Card>
  );
}
