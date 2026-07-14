import Link from "next/link";

import {
  ArrowRight,
  Dice5,
  Swords,
  Users,
  User,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";

const actions = [
  {
    title: "Random Problem",
    description: "Practice something new",
    href: "/problems/random",
    icon: Dice5,
  },
  {
    title: "Start Battle",
    description: "Challenge another coder",
    href: "/battles",
    icon: Swords,
  },
  {
    title: "Communities",
    description: "Learn together",
    href: "/communities",
    icon: Users,
  },
  {
    title: "View Profile",
    description: "Track your journey",
    href: "/profile",
    icon: User,
  },
];

export function QuickActions() {
  return (
    <DashboardCard title="Quick Actions">
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="
                group
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-4
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[var(--accent)]/40
                hover:bg-[var(--card-hover)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    rounded-xl
                    bg-[var(--accent)]/10
                    p-3
                    text-[var(--accent)]
                    transition-all
                    duration-200
                    group-hover:bg-[var(--accent)]
                    group-hover:text-white
                  "
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--text)]">
                    {action.title}
                  </h3>

                  <p className="text-sm text-[var(--muted)]">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="
                  text-[var(--muted)]
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>
          );
        })}
      </div>
    </DashboardCard>
  );
}