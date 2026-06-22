import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileCheck, Clock3, AlertTriangle, Ban, ArrowRight, Upload, BarChart3 } from "lucide-react";
import { getContractorReport } from "../../api/reportApi";
import StatCard from "../../components/StatCard";

const statConfig = [
  { key: "complied", title: "Complied", color: "green", icon: FileCheck },
  { key: "delayed", title: "Delayed", color: "yellow", icon: AlertTriangle },
  { key: "notComplied", title: "Not Complied", color: "red", icon: Clock3 },
  { key: "notApplicable", title: "N/A", color: "gray", icon: Ban },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContractorReport(1);
        setReport(res.data);
      } catch (e) {
        console.error("Dashboard load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  const stats = [
    { title: statConfig[0].title, value: report?.complied || 0, color: statConfig[0].color, icon: statConfig[0].icon },
    { title: statConfig[1].title, value: report?.delayed || 0, color: statConfig[1].color, icon: statConfig[1].icon },
    { title: statConfig[2].title, value: report?.notComplied || 0, color: statConfig[2].color, icon: statConfig[2].icon },
    { title: statConfig[3].title, value: report?.notApplicable || 0, color: statConfig[3].color, icon: statConfig[3].icon },
  ];

  return (
    <div className="space-y-5">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#f97316] to-[#ea580c] rounded-[20px] p-5"
      >
        <p className="text-white/80 text-[13px] font-medium">Welcome back,</p>
        <h2 className="text-white text-[22px] font-extrabold mt-0.5">Contractor</h2>
        <p className="text-white/70 text-[13px] mt-1">Here's your compliance overview</p>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} icon={s.icon} label={s.title} value={s.value} color={s.color} delay={0.08 + i * 0.06} />
        ))}
      </div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[18px] p-5"
      >
        <h3 className="text-white font-bold text-[15px] mb-4">Compliance Progress</h3>
        <div className="w-full h-3 bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${report?.compliancePercentage || 0}%` }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full"
          />
        </div>
        <div className="flex justify-between mt-3">
          <p className="text-white/60 text-[13px] font-medium">{report?.compliancePercentage?.toFixed(1) || 0}% Complete</p>
          <p className="text-white/35 text-[12px]">Total: {report?.totalTasks || 0}</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <h3 className="text-white font-bold text-[15px] mb-3">Quick Actions</h3>
        <div className="space-y-3">
          <button onClick={() => navigate("/contractor/tasks")} className="w-full flex items-center justify-between bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[16px] p-4 hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-blue-500/20 flex items-center justify-center"><ArrowRight size={18} className="text-blue-400" /></div>
              <span className="text-white font-semibold text-[14px]">View Tasks</span>
            </div>
            <ArrowRight size={18} className="text-white/30" />
          </button>
          <button onClick={() => navigate("/contractor/tasks")} className="w-full flex items-center justify-between bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[16px] p-4 hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#f97316]/20 flex items-center justify-center"><Upload size={18} className="text-[#f97316]" /></div>
              <span className="text-white font-semibold text-[14px]">Upload Compliance</span>
            </div>
            <ArrowRight size={18} className="text-white/30" />
          </button>
          <button onClick={() => navigate("/contractor/reports")} className="w-full flex items-center justify-between bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[16px] p-4 hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-green-500/20 flex items-center justify-center"><BarChart3 size={18} className="text-green-400" /></div>
              <span className="text-white font-semibold text-[14px]">View Reports</span>
            </div>
            <ArrowRight size={18} className="text-white/30" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}