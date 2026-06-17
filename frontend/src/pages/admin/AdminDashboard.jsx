import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, ClipboardList, FileCheck, Clock, AlertTriangle } from "lucide-react";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#64748b"];

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4">
    <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${color}`}><Icon size={20} /></div>
    <div>
      <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-[24px] font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const stats = { contractors: 48, tasks: 120, assignments: 95, pending: 18, compliancePct: 72 };

  const pieData = [
    { name: "Complied", value: 68 }, { name: "Delayed", value: 18 },
    { name: "Not Complied", value: 22 }, { name: "N/A", value: 12 },
  ];

  const lineData = [
    { month: "Jan", assignments: 15 }, { month: "Feb", assignments: 22 },
    { month: "Mar", assignments: 18 }, { month: "Apr", assignments: 28 },
    { month: "May", assignments: 20 }, { month: "Jun", assignments: 25 },
  ];

  const delayedContractors = [
    { name: "ABC Constructions", delayed: 8 }, { name: "XYZ Builders", delayed: 6 },
    { name: "PQR Enterprises", delayed: 4 }, { name: "LMN Ltd", delayed: 3 },
    { name: "RST Corp", delayed: 2 }, { name: "UVW Solutions", delayed: 1 },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[13px] text-gray-500">Welcome back,</p>
        <h2 className="text-[22px] font-bold text-gray-800">Administrator</h2>
        <p className="text-[13px] text-gray-500 mt-0.5">System overview and management console</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard icon={Users} label="Contractors" value={stats.contractors} color="bg-blue-50 text-blue-600" />
        <StatCard icon={ClipboardList} label="Total Tasks" value={stats.tasks} color="bg-purple-50 text-purple-600" />
        <StatCard icon={FileCheck} label="Active Assignments" value={stats.assignments} color="bg-green-50 text-green-600" />
        <StatCard icon={Clock} label="Pending Reviews" value={stats.pending} color="bg-orange-50 text-orange-600" />
        <StatCard icon={AlertTriangle} label="Compliance %" value={`${stats.compliancePct}%`} color="bg-red-50 text-red-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Compliance Status</h3>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer></div>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d, i) => (<div key={d.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="text-gray-500 text-[11px]">{d.name}</span></div>))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Assignment Trend</h3>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}><XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip />
              <Line type="monotone" dataKey="assignments" stroke="#E31E24" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer></div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">Top Delayed Contractors</h3>
        <div className="h-64"><ResponsiveContainer width="100%" height="100%">
          <BarChart data={delayedContractors} layout="vertical">
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
            <Tooltip /><Bar dataKey="delayed" fill="#E31E24" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer></div>
      </motion.div>
    </div>
  );
}