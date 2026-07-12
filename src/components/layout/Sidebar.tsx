"use client";

import { navigation } from "../../config/navigation";
import { Logo } from "./Logo";
import { SidebarItem } from "./SidebarItem";
import { UserMenu } from "./UserMenu";

export function Sidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-white/10
        bg-[#18181B]
      "
    >
      {/* Logo */}

      <div className="border-b border-white/10 p-6">
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

      <div className="border-t border-white/10 p-4">
        <UserMenu />
      </div>
    </aside>
  );
}