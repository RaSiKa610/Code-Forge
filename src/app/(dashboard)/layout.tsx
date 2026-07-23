import type { ReactNode } from "react";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout
      user={session.user}
      title="Dashboard"
    >
      {children}
    </DashboardLayout>
  );
}