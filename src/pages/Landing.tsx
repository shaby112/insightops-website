import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { LuminaPipeline } from "@/components/graphics/LuminaPipeline";
import { ArrowRight, CheckCircle2, Database, Gauge, Share2 } from "lucide-react";

const clerkUserButtonAppearance = {
  elements: {
    avatarBox: "h-8 w-8 ring-2 ring-violet-500/40",
    userButtonTrigger: "focus:shadow-none",
  },
};

const valueCards = [
  {
    icon: Database,
    title: "Ingest & Connect",
    body: "Connect databases and cloud sources in minutes with secure, schema-aware setup.",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    icon: Gauge,
    title: "Model & Analyze",
    body: "Turn raw tables into an AI-ready semantic model for reliable SQL and dashboards.",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    icon: Share2,
    title: "Design & Share",
    body: "Generate dashboards and publish insights to teams with reusable templates.",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
];

export default function Landing() {
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const pipelineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.06]);
  const pipelineY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const leftX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [-56, 0, 0, -10]);
  const rightX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [56, 0, 0, 10]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.18, 1], [0.3, 1, 1]);

  const step1Opacity = useTransform(scrollYProgress, [0, 0.17, 0.32], [1, 1, 0.2]);
  const step2Opacity = useTransform(scrollYProgress, [0.24, 0.45, 0.66], [0.25, 1, 0.25]);
  const step3Opacity = useTransform(scrollYProgress, [0.58, 0.78, 1], [0.25, 1, 1]);

  return (
    <div className="dark">
      <main className="min-h-screen bg-[#030C1A] text-white font-sans">

        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#030C1A]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <span className="text-[17px] font-semibold tracking-tight text-white">InsightOps</span>
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <Link to="/features" className="hover:text-white transition-colors duration-200">Product</Link>
              <Link to="/install" className="hover:text-white transition-colors duration-200">Install</Link>
              <Link to="/pricing" className="hover:text-white transition-colors duration-200">Pricing</Link>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SignedOut>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/downloads">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40 mr-1">
                    Downloads
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" appearance={clerkUserButtonAppearance} />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* ── HERO: headline + subtitle + pipeline all above the fold ── */}
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Headline block */}
            <div className="pt-12 pb-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                {user ? `Welcome back, ${user.firstName || user.username || "there"}` : "Self-Hosted AI BI Platform"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl"
              >
                From Data to Decision.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mx-auto mt-4 max-w-2xl text-base text-white/50 md:text-lg"
              >
                Accelerate your data-to-decision pipeline. Connect, model, and visualize analytics at scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Link to="/sign-up">
                  <Button size="lg" className="h-12 px-8 bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-900/40 border-0">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/25">
                    View Pricing
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Pipeline graphic — immediately visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="pb-4"
            >
              <LuminaPipeline />
            </motion.div>

            {/* Pipeline caption */}
            <p className="pb-8 text-center text-[11px] tracking-[0.2em] uppercase text-white/25">
              Messy sources &nbsp;→&nbsp; InsightOps Prism &nbsp;→&nbsp; Structured insights
            </p>
          </div>
        </section>

        {/* ── FEATURE CARDS (matches reference layout) ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-12">
          <div className="grid gap-4 md:grid-cols-3">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors duration-200"
              >
                <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>
                  <card.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/45">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCROLL STORY ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">Pipeline walkthrough</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">How InsightOps turns source data into decisions</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/45">
              Scroll through the pipeline flow — from source ingestion through semantic modeling to insight delivery.
            </p>
          </div>

          <div ref={scrollRef} className="relative h-[210vh]">
            <div className="sticky top-20 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 shadow-[0_24px_80px_-48px_rgba(100,80,255,0.5)] backdrop-blur-sm md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,1.4fr)_1fr]">

                {/* Step cards — left */}
                <div className="space-y-3">
                  {[
                    { step: "Step 1", title: "Source Ingestion", body: "Databases, files, and APIs are mapped into your workspace with metadata and health checks.", opacity: step1Opacity },
                    { step: "Step 2", title: "Semantic Modeling", body: "The model layer resolves relationships so AI can generate accurate joins and metrics.", opacity: step2Opacity },
                    { step: "Step 3", title: "Insight Delivery", body: "Dashboards, reports, and assistant answers are delivered with traceable SQL and context.", opacity: step3Opacity },
                  ].map(({ step, title, body, opacity }) => (
                    <motion.div
                      key={step}
                      style={{ opacity, x: leftX }}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">{step}</p>
                      <h3 className="mt-2 font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm text-white/45">{body}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pipeline — center */}
                <motion.div style={{ scale: pipelineScale, y: pipelineY }} className="self-center">
                  <LuminaPipeline />
                </motion.div>

                {/* Metric cards — right */}
                <motion.div style={{ x: rightX, opacity: rightOpacity }} className="space-y-3">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">Live KPI</p>
                    <p className="mt-2 text-3xl font-bold text-white">$2.25k</p>
                    <p className="text-xs text-white/40">Current period pipeline value</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">Accuracy</p>
                    <p className="mt-2 text-3xl font-bold text-white">99%</p>
                    <p className="text-xs text-white/40">Validated model-driven query confidence</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">Outcome</p>
                    <p className="mt-2 text-sm text-white/50">
                      Teams act immediately on metrics, trends, and anomaly alerts from one place.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Scroll progress bar */}
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-violet-500 to-cyan-500"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SELF-HOSTING BANNER ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[60px]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <h2 className="text-xl font-bold md:text-2xl">Built for secure self-hosting</h2>
                <p className="mt-2 text-sm text-white/50">
                  Keep your deployment on your own infrastructure with optional no-egress AI mode.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  "Secure identity and backend user provisioning",
                  "Docker deployment for app and data services",
                  "Compatible with air-gapped roadmap and licensing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-white/60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/[0.07] py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/30 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo size="sm" showText={false} />
              <span>InsightOps · Data Intel. &amp; Modeling</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/pricing" className="hover:text-white/60 transition-colors">Pricing</Link>
              <Link to="/install" className="hover:text-white/60 transition-colors">Install</Link>
              <Link to="/features" className="hover:text-white/60 transition-colors">Product</Link>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
