import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileCheck, Clock, AlertTriangle, Ban } from "lucide-react";
import { getContractorReport } from "../../api/reportApi";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#64748b"];

const StatBox = ({ icon: Icon, label, value, color }) => (
  <div className={`flex items-center gap-3 p-3 rounded-[14px] ${color}`}>
    <Icon size={18} />
    <div>
      <p className="text-[11px] font-semibold opacity-70 uppercase">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContractorReport(1);
        setReport(res.data);
      } catch (err) {
        console.error("Report load error:", err);
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

  const pieData = [
    { name: "Complied", value: report?.complied || 0 },
    { name: "Delayed", value: report?.delayed || 0 },
    { name: "Not Complied", value: report?.notComplied || 0 },
    { name: "N/A", value: report?.notApplicable || 0 },
  ];

  const barData = [
    { name: "Jan", completed: 3, pending: 1 },
    { name: "Feb", completed: 4, pending: 2 },
    { name: "Mar", completed: 2, pending: 3 },
    { name: "Apr", completed: 5, pending: 1 },
    { name: "May", completed: 3, pending: 2 },
    { name: "Jun", completed: 4, pending: 0 },
  ];

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox icon={FileCheck} label="Complied" value={report?.complied || 0} color="bg-green-500/15 text-green-400" />
        <StatBox icon={Clock} label="Delayed" value={report?.delayed || 0} color="bg-yellow-500/15 text-yellow-400" />
        <StatBox icon={AlertTriangle} label="Not Complied" value={report?.notComplied || 0} color="bg-red-500/15 text-red-400" />
        <StatBox icon={Ban} label="N/A" value={report?.notApplicable || 0} color="bg-white/5 text-white/40" />
      </div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5"
      >
        <h3 className="text-white font-bold text-[15px] mb-4">Compliance Distribution</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
              <span className="text-white/50 text-[11px]">{d.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5"
      >
        <h3 className="text-white font-bold text-[15px] mb-4">Monthly Compliance</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
              />
              <Bar dataKey="completed" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-white/50 text-[11px]">Completed</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#f97316]" /><span className="text-white/50 text-[11px]">Pending</span></div>
        </div>
      </motion.div>
    </div>
  );
}