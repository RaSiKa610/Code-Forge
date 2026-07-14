"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export function ProfileDropdown() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#202024] px-3 py-2">
      {/* Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
        R
      </div>

      {/* User Info */}
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-white">
          Rasika
        </p>

        <p className="text-xs text-zinc-400">
          Diamond II
        </p>
      </div>

      <ChevronDown
        size={18}
        className="text-zinc-400"
      />
    </div>
  );
}