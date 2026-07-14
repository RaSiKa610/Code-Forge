import type { ReactNode } from "react";

import { auth } from "@/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <DashboardLayout
      user={session.user}
    >
      {children}
    </DashboardLayout>
  );
}