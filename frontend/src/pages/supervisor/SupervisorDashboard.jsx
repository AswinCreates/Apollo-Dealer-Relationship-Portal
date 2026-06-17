import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ClipboardList, Clock, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
import { getSupervisorDashboard } from "../../api/supervisor/supervisorApi";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#64748b"];
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4">
    <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-[24px] font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const statusColors = { APPROVED: "text-green-600 bg-green-50", REJECTED: "text-red-600 bg-red-50", PENDING: "text-orange-600 bg-orange-50" };

export default function SupervisorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getSupervisorDashboard();
        setData(res.data);
      } catch { /* use dummy */ setData({ assigned: 45, pending: 12, approved: 28, rejected: 5, delayed: 3 }); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[#E31E24] border-t-transparent animate-spin" /></div>;

  const stats = [
    { icon: ClipboardList, label: "Total Assigned", value: data?.assigned || 0, color: "bg-blue-50 text-blue-600" },
    { icon: Clock, label: "Pending Reviews", value: data?.pending || 0, color: "bg-orange-50 text-orange-600" },
    { icon: CheckCircle, label: "Approved", value: data?.approved || 0, color: "bg-green-50 text-green-600" },
    { icon: XCircle, label: "Rejected", value: data?.rejected || 0, color: "bg-red-50 text-red-600" },
    { icon: AlertTriangle, label: "Delayed", value: data?.delayed || 0, color: "bg-yellow-50 text-yellow-600" },
  ];

  const pieData = [
    { name: "Approved", value: data?.approved || 28 },
    { name: "Pending", value: data?.pending || 12 },
    { name: "Rejected", value: data?.rejected || 5 },
  ];

  const lineData = [
    { month: "Jan", submissions: 8, approved: 5 },
    { month: "Feb", submissions: 12, approved: 8 },
    { month: "Mar", submissions: 10, approved: 7 },
    { month: "Apr", submissions: 15, approved: 11 },
    { month: "May", submissions: 9, approved: 6 },
    { month: "Jun", submissions: 14, approved: 10 },
  ];

  const recentSubmissions = [
    { id: 1, task: "Safety Audit Q1", contractor: "ABC Constructions", date: "2026-06-10", status: "PENDING" },
    { id: 2, task: "EPF Compliance", contractor: "XYZ Builders", date: "2026-06-09", status: "APPROVED" },
    { id: 3, task: "ESIC Report", contractor: "PQR Enterprises", date: "2026-06-08", status: "REJECTED" },
    { id: 4, task: "License Renewal", contractor: "LMN Ltd", date: "2026-06-07", status: "PENDING" },
    { id: 5, task: "Safety Training", contractor: "ABC Constructions", date: "2026-06-06", status: "APPROVED" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[13px] text-gray-500">Welcome back,</p>
        <h2 className="text-[22px] font-bold text-gray-800">Supervisor</h2>
        <p className="text-[13px] text-gray-500 mt-0.5">Here is your compliance review overview</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <StatCard icon={s.icon} label={s.label} value={s.value} color={s.color} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Compliance Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#333" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4">Monthly Compliance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px" }} />
                <Line type="monotone" dataKey="submissions" stroke="#E31E24" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Submissions Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">Recent Submissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-[12px] font-semibold text-gray-500 uppercase">Task</th>
                <th className="pb-3 text-[12px] font-semibold text-gray-500 uppercase">Contractor</th>
                <th className="pb-3 text-[12px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="pb-3 text-[12px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="pb-3 text-[12px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((sub, i) => (
                <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 text-[13px] font-medium text-gray-700">{sub.task}</td>
                  <td className="py-3.5 text-[13px] text-gray-600">{sub.contractor}</td>
                  <td className="py-3.5 text-[13px] text-gray-500">{sub.date}</td>
                  <td className="py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${statusColors[sub.status]}`}>{sub.status}</span>
                  </td>
                  <td className="py-3.5">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium text-[#E31E24] bg-red-50 hover:bg-red-100 transition-colors">
                      <Eye size={14} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}