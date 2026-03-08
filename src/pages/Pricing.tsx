import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "$299/mo",
    description: "Self-hosted InsightOps app for early teams.",
    features: ["Up to 3 connections", "AI dashboard generation", "Email support"],
  },
  {
    name: "Professional",
    price: "$999/mo",
    description: "For teams that need more automation and scale.",
    features: ["Unlimited connections", "Advanced semantic modeling", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Air-gapped deployments and enterprise onboarding.",
    features: ["No-egress AI mode", "Custom SLA", "Architecture support"],
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="text-muted-foreground">MVP pricing with self-hosted deployment focus.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tier.name}</span>
                  <span className="text-lg text-primary">{tier.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <Button className="w-full" disabled>
                  Stripe Checkout (Hook Pending)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/install" className="text-sm text-primary underline">
            View installation guide
          </Link>
        </div>
      </section>
    </main>
  );
}
