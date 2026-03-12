import { motion } from "framer-motion";
import { Database, Terminal, BarChart2 } from "lucide-react";

export function HeroAnimation() {
  return (
    <div className="relative w-full max-w-lg mx-auto md:max-w-none md:w-[500px] h-[350px] rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
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

      <div className="flex-1 p-6 relative flex flex-col gap-6">
        {/* SQL Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm shadow-inner"
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
          className="flex-1 rounded-lg border border-white/10 bg-white/5 p-4 flex items-end justify-between gap-2 relative overflow-hidden"
        >
          <div className="absolute top-3 left-4 flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
            <BarChart2 className="w-3 h-3" />
            Result (23ms)
          </div>
          {[40, 70, 45, 90, 65, 100].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: 2.2 + i * 0.1, type: "spring", stiffness: 100 }}
              className="w-full bg-gradient-to-t from-indigo-500/50 to-purple-400/80 rounded-t-sm border-t border-white/20"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
