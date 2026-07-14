"use client";

import { Bell } from "lucide-react";

export function NotificationButton() {
  return (
    <button
      className="
        rounded-xl
        border
        border-white/10
        bg-[#202024]
        p-2.5
        transition-colors
        hover:bg-[#2a2a30]
      "
    >
      <Bell
        size={18}
        className="text-zinc-300"
      />
    </button>
  );
}