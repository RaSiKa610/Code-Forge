import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData;
};

export default function ActivityCard({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">
        Activity
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Current Streak</span>
          <span>
            🔥 {profile.currentStreak}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Longest Streak</span>
          <span>
            🏆 {profile.longestStreak}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Freeze Tokens</span>
          <span>
            ❄️ {profile.streakFreezeTokens}
          </span>
        </div>
      </div>
    </Card>
  );
}
