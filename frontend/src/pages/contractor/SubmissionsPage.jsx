import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function SubmissionsPage() {
  const [tab, setTab] = useState("all");

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]"
      >
        <h2 className="text-white text-[22px] font-extrabold">Submissions</h2>
        <p className="text-white/70 text-[13px] mt-1">Track your compliance file uploads</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex gap-2 flex-wrap">
          {["all", "approved", "pending", "rejected"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all ${
                tab === t
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/[0.06] text-white/50 hover:text-white border border-white/[0.08]"
              }`}
            >
              {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-[14px] bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
          <FileText size={28} className="text-white/20" />
        </div>
        <p className="text-white/40 text-[13px]">No submissions available</p>
      </div>
    </div>
  );
}
