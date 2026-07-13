import type { ReactNode } from "react";
import type { CurrentUser } from "@/types/user";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  user: CurrentUser;
}

export function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar user={user} />

      <div className="flex flex-1 flex-col">
        <Topbar user={user} />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}