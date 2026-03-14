import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clearAuth, getUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-12">
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
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Email: {user?.email || "-"}</p>
            <p>Username: {user?.username || "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Billing portal integration hook is pending.</p>
            <Button disabled>Open Billing Portal (Hook Pending)</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
