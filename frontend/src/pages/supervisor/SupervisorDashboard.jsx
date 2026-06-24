import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getSupervisorDashboard } from "../../api/supervisor/supervisorApi";

export default function SupervisorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSupervisorDashboard();
        setData(res.data);
      } catch (err) {
        console.error("Supervisor dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 rounded-full border-[3px] border-gray-200 border-t-[#7c3aed] animate-spin" /></div>;
  }

  const stats = [
    { label: "Assigned", value: data?.assigned ?? 0, color: "purple", icon: ClipboardCheck },
    { label: "Pending Review", value: data?.pending ?? 0, color: "yellow", icon: Clock },
    { label: "Approved", value: data?.approved ?? 0, color: "green", icon: CheckCircle2 },
    { label: "Rejected", value: data?.rejected ?? 0, color: "red", icon: XCircle },
  ];

  const hasAnyStat = stats.some((s) => s.value > 0);

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Supervisor Dashboard</h2>
        <p className="text-white/70 text-[13px] mt-1">Review and manage contractor submissions</p>
      </motion.div>

      {hasAnyStat ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 + i * 0.05 }} className="bg-white rounded-[14px] border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center mb-3 ${s.color === "purple" ? "bg-purple-100 text-[#7c3aed]" : s.color === "yellow" ? "bg-yellow-100 text-yellow-600" : s.color === "green" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <s.icon size={20} />
              </div>
              <p className="text-gray-500 text-[12px] font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="text-gray-900 text-[28px] font-extrabold mt-1">{s.value}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-[13px]">No statistics available</div>
      )}
    </div>
  );
}