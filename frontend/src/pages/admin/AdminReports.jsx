import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
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

export default function AdminReports() {
  const [data] = useState({ totalTasks: 120, complied: 68, delayed: 18, notComplied: 22, notApplicable: 12 });

  const handleExport = () => {
    console.log("Export requested - API will handle this");
  };

  const pieData = [
    { name: "Complied", value: data.complied }, { name: "Delayed", value: data.delayed },
    { name: "Not Complied", value: data.notComplied }, { name: "N/A", value: data.notApplicable },
  ];

  const lineData = [
    { month: "Jan", complied: 8, notComplied: 2 }, { month: "Feb", complied: 12, notComplied: 3 },
    { month: "Mar", complied: 10, notComplied: 4 }, { month: "Apr", complied: 15, notComplied: 2 },
    { month: "May", complied: 11, notComplied: 3 }, { month: "Jun", complied: 12, notComplied: 8 },
  ];

  const barData = [
    { name: "ABC Constructions", complied: 12, delayed: 2 }, { name: "XYZ Builders", complied: 8, delayed: 4 },
    { name: "PQR Enterprises", complied: 10, delayed: 1 }, { name: "LMN Ltd", complied: 15, delayed: 6 },
    { name: "RST Corp", complied: 6, delayed: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[15px] font-bold text-gray-800">Admin Compliance Overview</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Distribution</h3>
          <div className="h-56"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} /></PieChart>
          </ResponsiveContainer></div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {pieData.map((d, i) => (<div key={d.name} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} /><span className="text-gray-500 text-[10px]">{d.name}</span></div>))}
          </div>
        </motion.div>

        {/* Line */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Monthly Trend</h3>
          <div className="h-56"><ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}><XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} />
              <Line type="monotone" dataKey="complied" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="notComplied" stroke="#E31E24" strokeWidth={2} dot={{ r: 3 }} />
              <Legend />
            </LineChart>
          </ResponsiveContainer></div>
        </motion.div>

        {/* Bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">By Contractor</h3>
          <div className="h-56"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} />
              <Bar dataKey="complied" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delayed" fill="#E31E24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer></div>
        </motion.div>
      </div>
    </div>
  );
}