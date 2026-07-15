"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface UserMenuProps {
  user: {
    username: string | null;
    rank: string;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-3
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[var(--accent)]/40
        hover:bg-[var(--card-hover)]
        hover:shadow-lg
      "
    >
      <Link
        href={`/profile/${user.username}`}
        className="flex flex-1 cursor-pointer items-center gap-3"
      >
        <Avatar
          image={user.image}
          name={user.username}
          size={48}
        />

        <div>
          <h3 className="font-semibold text-[var(--text)]">
            {user.username}
          </h3>

          <p className="text-sm text-[var(--muted)]">
            {user.rank}
          </p>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className="
          rounded-xl
          p-2.5
          text-[var(--muted)]
          transition-all
          duration-200
          hover:bg-red-500/10
          hover:text-red-400
          active:scale-95
        "
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}