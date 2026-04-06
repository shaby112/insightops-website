import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  MessageSquare,
  Code2,
  Shield,
  LayoutDashboard,
  Globe,
  Database,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Chat-to-Data",
    description:
      "Ask in plain English and get answers with the right chart and context in seconds.",
    highlights: [
      "Central chat interface for all queries",
      "Rich responses with tables and summaries",
      "Auto-selected visualizations",
      "Handles complex analytical prompts",
    ],
    visual: (
      <div className="flex items-center justify-center gap-4 py-6">
        <LineChart className="h-10 w-10 text-violet-300" />
        <BarChart3 className="h-14 w-14 text-emerald-300" />
        <PieChart className="h-10 w-10 text-violet-300" />
      </div>
    ),
  },
  {
    icon: Code2,
    title: "Cursor-like SQL Editor",
    description:
      "Split-screen workflow with AI chat and editable SQL so technical teams keep full control.",
    highlights: [
      "Syntax-highlighted SQL editor",
      "Edit before execution",
      "Real-time validation",
      "Power-user friendly workflow",
    ],
    visual: (
      <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/70">
        <span className="text-emerald-300">SELECT</span> * <span className="text-emerald-300">FROM</span> users
        <br />
        <span className="text-emerald-300">WHERE</span> status = <span className="text-violet-300">'active'</span>
        <br />
        <span className="text-emerald-300">ORDER BY</span> created_at <span className="text-emerald-300">DESC</span>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "Transaction Sandbox",
    description:
      "Mutating queries go through dry-run previews before commit, with impact visibility built in.",
    highlights: [
      "Automatic dry-run transactions",
      "Affected-row previews",
      "One-click commit/rollback",
      "Auditable change history",
    ],
    visual: (
      <div className="flex items-center gap-3 text-sm">
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-2 font-medium text-rose-300">15 rows affected</div>
        <ArrowRight className="h-5 w-5 text-white/50" />
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-medium text-emerald-300">Review & Commit</div>
      </div>
    ),
  },
  {
    icon: LayoutDashboard,
    title: "Instant Dashboard Generation",
    description:
      "Create complete dashboard layouts from a single prompt and customize every tile.",
    highlights: [
      "Auto-generated dashboard layouts",
      "Core KPI chart packs",
      "Grid-based customization",
      "Save and share views",
    ],
    visual: (
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 rounded-lg bg-violet-500/35" />
        <div className="h-10 rounded-lg bg-emerald-400/30" />
        <div className="h-10 rounded-lg bg-violet-400/25" />
        <div className="col-span-2 h-10 rounded-lg bg-white/10" />
        <div className="h-10 rounded-lg bg-emerald-400/30" />
      </div>
    ),
  },
  {
    icon: Globe,
    title: "External Intelligence Layer",
    description:
      "Correlate metric movement with market events to explain anomalies faster.",
    highlights: [
      "Web context integration",
      "Event-to-metric mapping",
      "Competitive signal tracking",
      "Actionable narrative summaries",
    ],
    visual: (
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
        <TrendingUp className="h-5 w-5 text-violet-300" />
        <span>Sales dipped 10% after competitor launch signal</span>
      </div>
    ),
  },
  {
    icon: Database,
    title: "Data Source Management",
    description:
      "Add and manage multiple databases with secure credentials and health visibility.",
    highlights: [
      "PostgreSQL, MySQL, Supabase",
      "Secure credential storage",
      "Connection health checks",
      "Multi-source analysis",
    ],
    visual: (
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
            <Database className="h-6 w-6 text-emerald-300" />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Mail,
    title: "Weekly Analytics Health Report",
    description:
      "Automated weekly summaries covering anomalies, trend shifts, and key metric movement.",
    highlights: [
      "Automated weekly reports",
      "Anomaly alerts",
      "Trend summaries",
      "Custom report sections",
    ],
    visual: (
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <Mail className="h-8 w-8 text-violet-300" />
        <div className="text-sm">
          <div className="font-medium text-white">Weekly Report Ready</div>
          <div className="text-white/60">3 anomalies • 12% growth</div>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Features | Kuantra</title>
        <meta
          name="description"
          content="Explore Kuantra's feature set: AI chat-to-data, SQL control, safe execution, dashboards, and analytics automation."
        />
      </Helmet>

      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.12),transparent_35%)]" />

      <section className="relative border-b border-white/10 px-6 pb-20 pt-28 md:pt-36">
        <div className="mx-auto w-full max-w-6xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Complete Feature Overview
          </div>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Product Architecture,
            <span className="block bg-gradient-to-r from-violet-300 via-violet-100 to-emerald-300 bg-clip-text text-transparent">
              Designed for Speed
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/65">
            Kuantra pairs guided AI analysis with precise control surfaces so business and technical teams can work in one stack.
          </p>
        </div>
      </section>

      <section className="relative px-6 py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.45 }}
              className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{feature.title}</h2>
                </div>
                <p className="text-lg text-white/65">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-300" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
            <Zap className="h-10 w-10" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Ready to modernize your analytics workflow?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">
            Sign up now for the waitlist to secure early access, launch updates, and early-adopter benefits.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/waitlist">
              <Button size="lg" className="relative h-14 overflow-hidden rounded-lg bg-white/5 px-10 text-lg font-medium text-white backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 hover:border-white/20 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/30 before:via-purple-500/30 before:to-emerald-500/30 before:opacity-50 before:blur-md">
                Sign up for Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <Logo size="sm" inverted />
          <p className="text-base text-white/70">© 2026 Kuantra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
