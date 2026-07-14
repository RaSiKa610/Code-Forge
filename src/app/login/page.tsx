import { Card } from "@/components/ui";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthHeader } from "@/components/auth/AuthHeader";

export default function LoginPage() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[var(--background)]
        px-6
      "
    >
      <Card className="w-full max-w-md">

        <AuthHeader />

        <div className="mt-8">
          <OAuthButtons />
        </div>

      </Card>
    </main>
  );
}