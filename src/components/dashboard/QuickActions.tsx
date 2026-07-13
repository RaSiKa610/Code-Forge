import Link from "next/link";

import {
  ArrowRight,
  Shuffle,
  Swords,
  User,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";

const actions = [
  {
    title: "Random Problem",
    href: "/problems/random",
    icon: Shuffle,
  },

  {
    title: "Find Battle",
    href: "/battles",
    icon: Swords,
  },

  {
    title: "Profile",
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
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-white/10
                p-4
                transition-all
                hover:border-[var(--accent)]
                hover:bg-[var(--surface)]
              "
            >

              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span>{action.title}</span>

              </div>

              <ArrowRight size={18} />

            </Link>

          );

        })}

      </div>

    </DashboardCard>
  );
}