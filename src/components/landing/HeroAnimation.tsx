import { motion } from "framer-motion";
import { Database, Terminal, BarChart2 } from "lucide-react";

export function HeroAnimation() {
  return (
    <div className="relative w-full max-w-lg mx-auto md:max-w-none md:w-[500px] h-[420px] rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
      {/* Fake window header */}
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs text-white/40 font-mono">
          <Terminal className="w-3 h-3" />
          kuantra-engine
        </div>
      </div>

      <div className="flex-1 p-6 relative flex flex-col gap-4">
        {/* SQL Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm shadow-inner min-h-[170px]"
        >
          <div className="flex items-center gap-2 mb-2 text-white/40 text-xs uppercase tracking-wider">
            <Database className="w-3 h-3" />
            Query
          </div>
          <div className="text-emerald-400">SELECT</div>
          <div className="text-white/80 pl-4">date_trunc('month', created_at) as month,</div>
          <div className="text-white/80 pl-4">sum(revenue) as total_revenue</div>
          <div className="text-emerald-400">FROM</div>
          <div className="text-white/80 pl-4">sales_data</div>
          <div className="text-emerald-400">GROUP BY <span className="text-white/80">1</span></div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            className="h-0.5 bg-emerald-500/30 mt-4 rounded-full overflow-hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-1/2 h-full bg-emerald-400"
            />
          </motion.div>
        </motion.div>

        {/* Chart Output Area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="flex-1 min-h-[170px] rounded-lg border border-white/10 bg-white/5 p-4 relative overflow-hidden"
        >
          <div className="absolute top-3 left-4 z-10 inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-[#0f131f]/85 px-2.5 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-sm">
            <BarChart2 className="h-3 w-3 text-violet-300" />
            Query result · 1.2ms
          </div>

          <div className="grid h-full grid-cols-2 gap-4 pt-9">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 2.25 }}
              className="rounded-md border border-white/10 bg-black/35 p-2 font-mono text-[11px]"
            >
              <div className="mb-1 flex items-center justify-between text-white/50">
                <span>month</span>
                <span>revenue</span>
              </div>
              <div className="space-y-1 text-white/80">
                <div className="flex items-center justify-between"><span>Jan</span><span>$84k</span></div>
                <div className="flex items-center justify-between"><span>Feb</span><span>$96k</span></div>
                <div className="flex items-center justify-between"><span>Mar</span><span className="text-emerald-300">$112k</span></div>
              </div>
            </motion.div>

            <div className="flex items-end justify-between gap-1.5 rounded-md border border-white/10 bg-black/20 p-2">
              {[38, 56, 72, 88, 76, 94].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.45, delay: 2.3 + i * 0.08, type: "spring", stiffness: 90 }}
                  className="w-full rounded-t-sm bg-gradient-to-t from-indigo-500/55 via-purple-400/70 to-emerald-300/70"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
