import { motion } from "framer-motion";
import { Download, FileText, TrendingUp } from "lucide-react";

export default function SupervisorReports() {
  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Reports</h2>
        <p className="text-white/70 text-[13px] mt-1">View compliance analytics and trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[18px] border border-gray-200 shadow-sm p-5">
          <div className="w-10 h-10 rounded-[12px] bg-purple-100 text-[#7c3aed] flex items-center justify-center mb-3"><FileText size={20} /></div>
          <h3 className="text-gray-900 font-bold text-[15px]">Compliance Report</h3>
          <p className="text-gray-500 text-[13px] mt-1 mb-4">Monthly compliance summary for all contractors</p>
          <button className="w-full py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-[13px] font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            <Download size={14} /> Download PDF
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[18px] border border-gray-200 shadow-sm p-5">
          <div className="w-10 h-10 rounded-[12px] bg-purple-100 text-[#7c3aed] flex items-center justify-center mb-3"><TrendingUp size={20} /></div>
          <h3 className="text-gray-900 font-bold text-[15px]">Trends Analysis</h3>
          <p className="text-gray-500 text-[13px] mt-1 mb-4">Weekly and monthly compliance trends</p>
          <button className="w-full py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-[13px] font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            <Download size={14} /> Download Excel
          </button>
        </motion.div>
      </div>
    </div>
  );
}