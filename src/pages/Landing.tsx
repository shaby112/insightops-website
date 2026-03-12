import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Zap, Shield, Database, Gauge, Lock } from "lucide-react";
import { format } from "date-fns";

import { getAllPosts } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { HeroAnimation } from "@/components/landing/HeroAnimation";
import { LogoMarquee } from "@/components/landing/LogoMarquee";
import { BenchmarkTable } from "@/components/landing/BenchmarkTable";
import { FoundersLetter } from "@/components/landing/FoundersLetter";

const antiCompetitor = [
  {
    title: "No JVM wait times",
    body: "DuckDB-native execution keeps interactions instant and predictable.",
    icon: Zap,
    metric: "<100ms",
  },
  {
    title: "Private by default",
    body: "Self-hosted Docker deployment with zero forced data egress.",
    icon: Shield,
    metric: "On your infra",
  },
  {
    title: "Zero-config setup",
    body: "Connect your DB and start querying without dbt/warehouse ceremony.",
    icon: Database,
    metric: "Minutes, not weeks",
  },
];


export default function Landing() {
  const latestPosts = useMemo(
    () =>
      getAllPosts()
        .filter((post) => !post.meta.draft && Boolean(post.meta.date))
        .slice(0, 3),
    []
  );

  return (
    <div className="dark">
      <style>{`
        @keyframes heroGlow {
          0%,100% { opacity: .20; transform: translateY(0px); }
          50% { opacity: .32; transform: translateY(-4px); }
        }
        @keyframes typeReveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        .hero-glow { animation: heroGlow 8s ease-in-out infinite; }
        .type-reveal { animation: typeReveal 900ms ease-out both; }
      `}</style>

      <main
        className="min-h-screen text-white"
        style={{
          backgroundColor: "#0A0A0A",
          fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <section className="relative border-b border-white/10">
          <div className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.20),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.14),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-24 md:pt-28">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="max-w-3xl flex-1"
              >

                <h1 className="type-reveal mt-6 text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white md:text-7xl">
                  Zero-Config BI.<br/>Sub-100ms Queries.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                  Stop fighting dbt and waiting on slow JVM engines. Kuantra connects directly to your database and delivers instant AI Text-to-SQL dashboards via DuckDB.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Link to="/install">
                    <Button
                      size="lg"
                      className="relative overflow-hidden rounded-lg bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 hover:border-white/20 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/30 before:via-purple-500/30 before:to-emerald-500/30 before:opacity-50 before:blur-md"
                    >
                      Deploy via Docker
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link to="/features" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                    Explore product architecture <ArrowRight className="ml-1 inline h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 w-full lg:w-auto"
              >
                <HeroAnimation />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-24 grid gap-4 md:grid-cols-3"
            >
              {antiCompetitor.map((item) => (
                <Card
                  key={item.title}
                  className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 0%, rgba(139,92,246,0.14), transparent 45%)" }} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
                        {item.metric}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        <LogoMarquee />
        <BenchmarkTable />
        <FoundersLetter />

        {latestPosts.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-6 py-20">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">Engineering Journal</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Latest Insights</h2>
              </div>
              <Link to="/blog" className="text-sm text-white/65 transition-colors hover:text-white">
                Read all posts <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-white/10 p-6 transition-all hover:-translate-y-0.5 hover:border-white/20"
                  style={{ backgroundColor: "#171717" }}
                >
                  <div className="mb-5 flex items-center gap-4 text-xs text-white/45">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(post.meta.date!), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.meta.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-violet-300">
                    {post.meta.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{post.meta.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-white/55 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" showText={false} />
              <span className="font-medium">© 2026 Kuantra</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/pricing" className="transition-colors hover:text-white/75">Pricing</Link>
              <Link to="/blog" className="transition-colors hover:text-white/75">Blog</Link>
              <Link to="/install" className="transition-colors hover:text-white/75">Install</Link>
              <Link to="/features" className="transition-colors hover:text-white/75">Product</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
