import { motion } from "framer-motion";
import { FileText, Calendar, ChevronRight } from "lucide-react";

const statusColors = {
  PENDING: { bg: "bg-[#f97316]/15", text: "text-[#f97316]", border: "border-[#f97316]/25" },
  SUBMITTED: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/25" },
  APPROVED: { bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/25" },
  REJECTED: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/25" },
  DELAYED: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/25" },
};

export default function TaskCard({ task, onClick, delay = 0 }) {
  const sc = statusColors[task.status] || statusColors.PENDING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[18px] p-4 cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.14] active:bg-white/[0.10]"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3 flex-1 min-w-0 pr-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#f97316]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText size={18} className="text-[#f97316]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-[15px] leading-tight truncate">
              {task.complianceTask?.taskName || task.taskName || "Untitled Task"}
            </h3>
            <div className="flex items-center gap-1.5 text-white/40 text-[12px] mt-1.5">
              <Calendar size={13} />
              <span>Due: {task.dueDate}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <ChevronRight size={18} className="text-white/20" />
          <span className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[10px] font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
            {task.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}