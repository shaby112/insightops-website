import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Gauge, Share2, Shield, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/blog";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import PrismBackground from "@/components/graphics/PrismBackground";

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
    body: "Bring databases, files, and APIs into one workspace with secure schema-aware onboarding.",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
  },
  {
    icon: Gauge,
    title: "Model & Analyze",
    body: "Generate a semantic model so AI can reason over relationships and produce reliable queries.",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-300",
  },
  {
    icon: Share2,
    title: "Design & Share",
    body: "Create dashboard-ready insight flows that teams can explore, share, and operationalize.",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-300",
  },
];

export default function Landing() {
  const { user } = useUser();
  const latestPosts = useMemo(() => getAllPosts().slice(0, 3), []);

  return (
    <div className="dark">
      <main className="min-h-screen bg-[#050914] text-white font-sans">
        

        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 z-0">
            <PrismBackground
              animationType="rotate"
              timeScale={0.2}
              height={3.5}
              baseWidth={5.4}
              scale={3.25}
              hueShift={0.12}
              colorFrequency={1}
              noise={0.08}
              glow={0.85}
              bloom={0.9}
              quality="low"
              renderScale={0.58}
              maxFps={20}
              disableOnMobile
              startWhenIdle
              suspendWhenOffscreen
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,rgba(128,84,255,0.16),rgba(5,9,20,0.72)_52%,rgba(5,9,20,0.95)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center px-6 py-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-black/30 p-8 text-center shadow-[0_40px_120px_-50px_rgba(74,49,170,0.7)] backdrop-blur-2xl md:p-12"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/15 px-4 py-1.5 text-xs font-medium text-violet-200">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-pulse" />
                {user ? `Welcome back, ${user.firstName || user.username || "there"}` : "Self-Hosted AI BI Platform"}
              </span>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
                From Data to
                <span className="block bg-gradient-to-r from-violet-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  Decision.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
                Connect scattered data, model it with intelligence, and deliver structured insights from a single prism-native workflow.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-900/45 border-0"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-white/20 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white hover:border-white/30"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 grid gap-4 md:grid-cols-3"
            >
              {valueCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/[0.1] bg-black/25 p-5 backdrop-blur-xl transition-all duration-200 hover:bg-black/35"
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                  >
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{card.body}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-8 md:p-10">
            <div className="pointer-events-none absolute -right-12 -top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-[80px]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-200">
                  <Shield className="h-3.5 w-3.5" />
                  Self-Hosted First
                </div>
                <h2 className="text-xl font-bold md:text-2xl">Built for private deployment</h2>
                <p className="mt-2 text-sm text-white/60">
                  Run Kuantra in your own environment with configurable AI egress and audit-friendly architecture.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  "Run inside your own infrastructure",
                  "Keep control of data movement and processing",
                  "Scale from first dashboard to enterprise rollout",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-white/70">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

                {latestPosts.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Latest Insights</h2>
                <p className="mt-2 text-sm text-white/60">Product updates, engineering deep-dives, and data strategy.</p>
              </div>
              <Link 
                to="/blog" 
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                View all posts 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  to={`/blog/${post.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)]"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex flex-col">
                    <div className="mb-5 flex items-center gap-4 text-xs font-medium text-white/40">
                      <span className="flex items-center gap-1.5 text-violet-200/50">
                        <Calendar className="h-3.5 w-3.5" /> 
                        {post.meta.date ? format(new Date(post.meta.date), "MMM d, yyyy") : "Draft"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> 
                        {post.meta.author}
                      </span>
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-violet-300">
                      {post.meta.title}
                    </h3>
                    
                    <p className="line-clamp-3 text-sm leading-relaxed text-white/60">
                      {post.meta.description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read article 
                    <ArrowRight className="ml-1.5 h-4 w-4 -translate-x-2 transition-transform duration-300 group-hover:translate-x-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-white/[0.08] py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/35 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo size="sm" showText={false} />
              <span>Kuantra</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/pricing" className="hover:text-white/70 transition-colors">
                Pricing
              </Link>
              <Link to="/blog" className="hover:text-white/70 transition-colors">
                Blog
              </Link>
              <Link to="/install" className="hover:text-white/70 transition-colors">
                Install
              </Link>
              <Link to="/features" className="hover:text-white/70 transition-colors">
                Product
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
