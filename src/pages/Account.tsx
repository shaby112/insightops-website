import { useUser, UserButton } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Account() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <section className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Account</h1>
            <p className="text-muted-foreground">Manage profile, subscription, and license details.</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Email: {user?.primaryEmailAddress?.emailAddress || "-"}</p>
            <p>Clerk ID: {user?.id || "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Stripe Customer Portal integration hook is pending.</p>
            <Button disabled>Open Billing Portal (Hook Pending)</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
