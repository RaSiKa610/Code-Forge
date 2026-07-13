import {
  Coins,
  Flame,
  Trophy,
} from "lucide-react";

export const dashboardStats = [
  {
    id: "streak",
    title: "Current Streak",
    value: 412,
    subtitle: "days",
    icon: Flame,
  },
  {
    id: "coins",
    title: "Forge Coins",
    value: 2480,
    subtitle: "earned",
    icon: Coins,
  },
  {
    id: "rank",
    title: "Current Rank",
    value: "Diamond II",
    subtitle: "Top 4%",
    icon: Trophy,
  },
] as const;