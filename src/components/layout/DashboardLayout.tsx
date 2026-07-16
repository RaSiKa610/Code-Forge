import type { ReactNode } from "react";
import type { CurrentUser } from "@/types/user";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  user: CurrentUser;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({
  children,
  user,
  title,
  subtitle,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar user={user} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          user={user}
          title={title}
          subtitle={subtitle}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}