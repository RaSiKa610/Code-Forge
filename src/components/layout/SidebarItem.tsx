"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function SidebarItem({
  href,
  label,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition-all
        ${
          isActive
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--muted)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
        }
      `}
    >
      <Icon size={20} />

      <span>{label}</span>
    </Link>
  );
}