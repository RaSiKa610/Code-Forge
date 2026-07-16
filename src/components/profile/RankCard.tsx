import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData  ;
};

export default function RankCard({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">
        Rank Information
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Rank</span>
          <span>{profile.rank}</span>
        </div>

        <div className="flex justify-between">
          <span>Power Score</span>
          <span>{profile.powerScore}</span>
        </div>

        <div className="flex justify-between">
          <span>Contest Rating</span>
          <span>{profile.contestRating}</span>
        </div>

        <div className="flex justify-between">
          <span>Open To Work</span>
          <span>{profile.openToWork}</span>
        </div>
      </div>
    </Card>
  );
}
