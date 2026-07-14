import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  BarChart3,
  Swords,
  BookOpen,
  Users,
  User,
  Settings,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navigation: readonly NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    id: "problems",
    label: "Problems",
    href: "/problems",
    icon: BookOpen,
  },
  {
    id: "battles",
    label: "1v1 Battles",
    href: "/battles",
    icon: Swords,
  },
  {
    id: "communities",
    label: "Communities",
    href: "/communities",
    icon: Users,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;