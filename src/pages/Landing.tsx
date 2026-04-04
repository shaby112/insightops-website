import { motion } from "framer-motion";
import { Zap, Shield, Database } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { HeroAnimation } from "@/components/landing/HeroAnimation";
import { FoundersLetter } from "@/components/landing/FoundersLetter";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { BenchmarkTable } from "@/components/landing/BenchmarkTable";

const features = [
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
        className="min-h-screen text-white bg-[#0A0A0A]"
        style={{
          fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <section className="relative border-b border-white/10">
          <div className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.20),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.14),transparent_30%)]" />
          
          <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-24 md:pt-32">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 xl:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="max-w-2xl flex-1"
              >
                <h1 className="type-reveal text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl xl:text-7xl">
                  Ask your database anything.<br/>No SQL required.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  Stop fighting dbt and waiting on slow JVM engines. Kuantra connects directly to your database and delivers instant AI Text-to-SQL dashboards via DuckDB.
                </p>

                <WaitlistForm />
                
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 w-full max-w-lg lg:w-auto"
              >
                <HeroAnimation />
              </motion.div>
            </div>

            {/* Feature Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-24 grid gap-4 md:grid-cols-3"
            >
              {features.map((item) => (
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

            {/* View container for screen recording */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-24 mb-16 relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-white/5 via-white/10 to-white/5 opacity-50 blur-lg" />
              <div className="relative aspect-video w-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl overflow-hidden ring-1 ring-white/10 backdrop-blur-xl flex items-center justify-center">
                {/* Placeholder for 90-second screen recording */}
                <span className="text-white/40 font-medium">90-second Product Demo (Video Placeholder)</span>
                {/* 
                  When you have the video, uncomment and use this structure:
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/your-demo.mp4" type="video/mp4" />
                  </video>
                */}
              </div>
            </motion.div>
          </div>
        </section>

        <BenchmarkTable />

        <FoundersLetter />

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-white/55 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" showText={false} />
              <span className="font-medium">© 2026 Kuantra</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="/features" className="transition-colors hover:text-white/75">Product</a>
              <a href="/blog" className="transition-colors hover:text-white/75">Blog</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
