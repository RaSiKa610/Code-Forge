import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  const items = [
    {
      title: "Profile",
      description: "Manage your display name, headline, bio, and social links.",
      href: "/settings/profile",
      icon: "👤",
    },
    {
      title: "Account",
      description: "Update your email, password, and security preferences.",
      href: "/settings/account",
      icon: "🔒",
    },
    {
      title: "Notifications",
      description: "Configure how and when you receive challenge updates.",
      href: "/settings/notifications",
      icon: "🔔",
    },
    {
      title: "Security",
      description: "Review active logins and connected social accounts.",
      href: "/settings/security",
      icon: "🛡️",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">Settings</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Customize your experience, connections, and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <Card className="flex items-start gap-4 p-6 border border-white/5 hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all duration-200 cursor-pointer h-full">
              <span className="text-3xl">{item.icon}</span>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}