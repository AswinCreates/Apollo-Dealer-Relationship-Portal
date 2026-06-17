import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Download, FileCheck, Clock, AlertTriangle, Ban } from "lucide-react";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#64748b"];

const StatBox = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${color}`}><Icon size={18} /></div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase">{label}</p>
        <p className="text-[20px] font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default function SupervisorReports() {
  const [data] = useState({ totalTasks: 120, complied: 68, delayed: 18, notComplied: 22, notApplicable: 12, compliancePercentage: 56.7 });

  const handleExport = () => {
    const wb = [{ sheet: "Report", rows: [["Metric", "Value"], ...Object.entries(data).map(([k, v]) => [k, v])] }];
    console.log("Export requested - API will handle this:", wb);
  };

  const pieData = [
    { name: "Complied", value: data.complied },
    { name: "Delayed", value: data.delayed },
    { name: "Not Complied", value: data.notComplied },
    { name: "N/A", value: data.notApplicable },
  ];

  const barData = [
    { month: "Jan", complied: 10, delayed: 3 }, { month: "Feb", complied: 12, delayed: 2 },
    { month: "Mar", complied: 8, delayed: 4 }, { month: "Apr", complied: 14, delayed: 3 },
    { month: "May", complied: 11, delayed: 2 }, { month: "Jun", complied: 13, delayed: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[15px] font-bold text-gray-800">Compliance Overview</h3>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#E31E24] text-white text-[12px] font-semibold hover:bg-red-700 transition-colors">
          <Download size={15} /> Export Excel
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatBox icon={FileText} label="Total Tasks" value={data.totalTasks} color="bg-blue-50 text-blue-600" />
        <StatBox icon={FileCheck} label="Complied" value={data.complied} color="bg-green-50 text-green-600" />
        <StatBox icon={Clock} label="Delayed" value={data.delayed} color="bg-yellow-50 text-yellow-600" />
        <StatBox icon={AlertTriangle} label="Not Complied" value={data.notComplied} color="bg-red-50 text-red-600" />
        <StatBox icon={Ban} label="N/A" value={data.notApplicable} color="bg-gray-50 text-gray-600" />
      </div>

      {/* Compliance % */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">Compliance Percentage</h3>
        <div className="flex items-center gap-4">
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${data.compliancePercentage}%` }} transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#E31E24] rounded-full" />
          </div>
          <span className="text-[20px] font-bold text-gray-800 flex-shrink-0">{data.compliancePercentage}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Compliance Distribution</h3>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} />
            </PieChart>
          </ResponsiveContainer></div>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d, i) => (<div key={d.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="text-gray-500 text-[11px]">{d.name}</span></div>))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Monthly Compliance Trend</h3>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} />
              <Bar dataKey="complied" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="delayed" fill="#E31E24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer></div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-gray-500 text-[11px]">Complied</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" /><span className="text-gray-500 text-[11px]">Delayed</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}