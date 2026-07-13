"use client";

import { navigation } from "@/config/navigation";
import { Logo } from "./Logo";
import { SidebarItem } from "./SidebarItem";
import { UserMenu } from "./UserMenu";

interface SidebarProps {
  user: {
    username: string | null;
    rank: string;
    image?: string | null;
  };
}

export function Sidebar({
  user,
}: SidebarProps) {
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      {/* Logo */}

      <div className="border-b border-[var(--border)] p-6">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.id}
            {...item}
          />
        ))}
      </nav>

      {/* User */}

      <div className="border-t border-[var(--border)] p-4">
        <UserMenu user={user} />
      </div>
    </aside>
  );
}