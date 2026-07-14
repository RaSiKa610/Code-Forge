import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
};

export default function EconomyCard({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">
        Economy
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Forge Coins</span>
          <span>
            🪙 {profile.forgeCoins}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Season Points</span>
          <span>
            ⭐ {profile.seasonPoints}
          </span>
        </div>
      </div>
    </Card>
  );
}
