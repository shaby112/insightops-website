import { motion } from "framer-motion";
import { Zap, Shield, Database, Plus } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { HeroAnimation } from "@/components/landing/HeroAnimation";
import { FoundersLetter } from "@/components/landing/FoundersLetter";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

const faqs = [
  {
    question: "Is my company’s data safe with Kuantra?",
    answer:
      "Absolutely. Kuantra is a self-hosted BI platform, so your data stays on your infrastructure. Our Docker-based deployment gives you private analytics and secure data analysis without forcing sensitive data into a third-party BI cloud.",
  },
  {
    question: "What makes Kuantra dashboards and queries so fast?",
    answer:
      "Kuantra is engineered for high-performance BI with a DuckDB-native analytics engine that delivers real-time, sub-second query performance. This keeps dashboards responsive and removes the lag common in traditional BI tools.",
  },
  {
    question: "How does Kuantra AI work, and what about BYOK or local models?",
    answer:
      "Kuantra uses our in-house model, Kuantra AI, to provide fast and accurate text-to-SQL results. We are actively implementing Bring Your Own Key (BYOK) and local Ollama integration. For BYOK flows, only database schema metadata like column names is sent to the model, never row-level data.",
  },
  {
    question: "When can I start testing Kuantra?",
    answer:
      "We are launching the Kuantra beta very soon. Join the waitlist now to be one of the first teams to get access, onboard early, and help shape upcoming releases.",
  },
  {
    question: "What data connectors does Kuantra support?",
    answer:
      "Our initial release includes core connectors for popular databases and warehouses, and we are actively adding more native data connectors based on user demand and feedback.",
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

                <div className="mt-8">
                  <Link
                    to="/waitlist"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                  >
                    <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/80">
                      Waitlist Open
                    </span>
                    <span>Get early access now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
                
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

          </div>
        </section>

        <BenchmarkTable />

        <FoundersLetter />

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto w-full max-w-4xl px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Common questions</h2>
            </div>

            <AccordionPrimitive.Root type="single" collapsible className="rounded-2xl border border-white/10 bg-white/[0.02] px-6">
              {faqs.map((faq, index) => (
                <AccordionPrimitive.Item
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left">
                      <span className="text-base font-medium text-white">{faq.question}</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5">
                        <Plus className="h-4 w-4 text-white/80 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                      </span>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-sm leading-relaxed text-white/70 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pb-5 pr-12">{faq.answer}</div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </div>
        </section>

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
