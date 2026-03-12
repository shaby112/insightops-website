import { motion } from "framer-motion";

const logos = [
  "DuckDB",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "React",
  "Docker",
  "TypeScript",
  "Framer",
  "Tailwind",
  "Node.js",
  "ClickHouse",
  "Redis"
];

export function LogoMarquee() {
  return (
    <section className="border-t border-b border-white/5 py-12 bg-white/[0.01] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">Powered by modern open source</p>
      </div>

      <div className="flex w-[200%] gap-8 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        {/* Render the list twice for seamless loop */}
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center px-8 py-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-colors hover:bg-white/[0.04]"
          >
            <span className="text-lg font-medium text-white/60 font-mono tracking-tight">{logo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
