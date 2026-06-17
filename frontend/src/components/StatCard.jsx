import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color = "orange", delay = 0 }) {
  const colorMap = {
    orange: { bg: "bg-[#f97316]/15", text: "text-[#f97316]", iconBg: "bg-[#f97316]/20" },
    red: { bg: "bg-red-500/15", text: "text-red-400", iconBg: "bg-red-500/20" },
    yellow: { bg: "bg-yellow-500/15", text: "text-yellow-400", iconBg: "bg-yellow-500/20" },
    gray: { bg: "bg-white/5", text: "text-white/40", iconBg: "bg-white/10" },
    green: { bg: "bg-green-500/15", text: "text-green-400", iconBg: "bg-green-500/20" },
  };
  const c = colorMap[color] || colorMap.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[18px] p-4"
    >
      <div className={`w-10 h-10 rounded-[12px] ${c.iconBg} flex items-center justify-center mb-3`}>
        <Icon size={20} className={c.text} />
      </div>
      <p className="text-white/45 text-[11px] font-semibold uppercase tracking-[0.06em]">{label}</p>
      <p className="text-white text-2xl font-extrabold mt-1 tracking-[-0.5px]">{value}</p>
    </motion.div>
  );
}