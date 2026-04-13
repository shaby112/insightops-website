import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck, Rocket, Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  {
    icon: Rocket,
    title: "Early access",
    body: "Get first access to Kuantra when we launch, before public rollout.",
  },
  {
    icon: Crown,
    title: "Early adopter perks",
    body: "Priority onboarding, direct product feedback channel, and launch bonuses.",
  },
  {
    icon: ShieldCheck,
    title: "Build with us",
    body: "Shape roadmap decisions by telling us what you need most in BI.",
  },
];

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || `Request failed (${res.status})`);
  }
}

export default function Waitlist() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [dataConnectors, setDataConnectors] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !businessName || !email || !dataConnectors) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, businessName, email, dataConnectors }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        throw new Error(data?.error || "Unable to join waitlist right now.");
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setBusinessName("");
      setEmail("");
      setDataConnectors("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#0A0A0A] px-6 py-16 text-white md:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Kuantra Waitlist</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Join the waitlist now for early access.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Be among the first teams to use Kuantra as soon as it is released. Early adopters get specific benefits, priority onboarding, and direct influence on what we ship next.
          </p>

          {status === "success" ? (
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium">You’re on the waitlist. We’ll reach out soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                />
                <Input
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                />
                <Input
                  placeholder="Business name"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 md:col-span-2"
                />
                <Input
                  type="email"
                  placeholder="Business email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 md:col-span-2"
                />
                <Input
                  placeholder="Most used data connectors (e.g. Postgres, MySQL, BigQuery)"
                  required
                  value={dataConnectors}
                  onChange={(e) => setDataConnectors(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40 md:col-span-2"
                />
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={status === "loading" || !firstName || !lastName || !businessName || !email || !dataConnectors}
                  className="relative h-11 shrink-0 overflow-hidden rounded-lg bg-transparent px-5 font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/40 before:via-purple-500/40 before:to-emerald-500/40 before:opacity-70 before:blur-sm"
                >
                  <span className="relative flex items-center gap-2">
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </span>
                </Button>
              </div>

              {status === "error" && <p className="mt-3 text-sm text-red-300">{error}</p>}

              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-white/45">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>No spam. Only meaningful updates and launch access.</span>
              </p>
            </form>
          )}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl"
            >
              <item.icon className="h-5 w-5 text-emerald-300" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
            </div>
          ))}
        </motion.section>

        <div className="mt-8">
          <Link to="/" className="inline-flex items-center text-sm text-white/70 transition-colors hover:text-white">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
