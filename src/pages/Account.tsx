import { Helmet } from "react-helmet-async";
import { useAuth, useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetchWithToken } from "@/lib/api";

type BackendIdentity = {
  id: string;
  clerk_id: string;
  email?: string;
};

export default function Account() {
  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const [backendIdentity, setBackendIdentity] = useState<BackendIdentity | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;

    (async () => {
      const token = await getToken();
      if (!token || cancelled) return;

      const me = await apiFetchWithToken<BackendIdentity>("/api/v1/me", token);
      if (!cancelled) {
        setBackendIdentity(me);
      }
    })().catch((error) => {
      console.error("Failed to fetch backend identity:", error);
    });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, getToken]);

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <Helmet>
        <title>Account | InsightOps</title>
        <meta name="description" content="Manage your InsightOps account settings and identity." />
      </Helmet>

      <Helmet>
        <title>Account | Kuantra</title>
        <meta name="description" content="Manage your Kuantra account settings and identity." />
      </Helmet>

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
            <p>Identity ID: {user?.id || "-"}</p>
            <p>Backend User ID: {backendIdentity?.id || "Syncing..."}</p>
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
