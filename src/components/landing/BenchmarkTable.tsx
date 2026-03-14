import { Check, X } from "lucide-react";

const features = [
  { name: "Query Execution", kuantra: "Native DuckDB", legacy: "JVM-based Engine" },
  { name: "Speed (Avg Dashboard)", kuantra: "< 100ms", legacy: "2-5+ seconds" },
  { name: "Data Egress", kuantra: "Zero (Stays in your infra)", legacy: "Cloud required" },
  { name: "Setup Time", kuantra: "Minutes (Docker)", legacy: "Weeks (Complex configs)" },
  { name: "Licensing Model", kuantra: "Transparent (BYO Infra)", legacy: "Opaque (Per-seat + Compute)" },
  { name: "SQL Support", kuantra: "Full standard SQL", legacy: "Proprietary dialects" },
];

export function BenchmarkTable() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45 mb-3">The Architecture Difference</p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Built for the Modern Data Stack
        </h2>
        <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
          Legacy BI tools were built for a different era. Kuantra leverages modern paradigms like DuckDB and Docker to deliver an entirely different class of performance and privacy.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px] border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03]">
            <div className="p-6 text-sm font-medium text-white/50 uppercase tracking-wider">Capabilities</div>
            <div className="p-6 text-base font-semibold text-emerald-400 bg-emerald-500/5 border-l border-white/5 flex items-center justify-between">
              Kuantra
              <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Next-Gen</span>
            </div>
            <div className="p-6 text-base font-semibold text-white/40 border-l border-white/5 flex items-center justify-between">
              Legacy BI
              <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/50 border border-white/10">Standard</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {features.map((row, i) => (
              <div key={i} className="grid grid-cols-3 transition-colors hover:bg-white/[0.02]">
                <div className="p-6 text-sm font-medium text-white/80 flex items-center">
                  {row.name}
                </div>
                <div className="p-6 text-sm text-white flex items-center border-l border-white/5 bg-emerald-500/[0.02]">
                  {row.kuantra.includes("< 100ms") || row.kuantra.includes("Minutes") ? (
                    <span className="flex items-center gap-2 font-mono text-emerald-400 font-semibold tracking-tight"><Check className="w-4 h-4" /> {row.kuantra}</span>
                  ) : (
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {row.kuantra}</span>
                  )}
                </div>
                <div className="p-6 text-sm text-white/40 flex items-center border-l border-white/5">
                  <span className="flex items-center gap-2"><X className="w-4 h-4 text-red-500/50" /> {row.legacy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
