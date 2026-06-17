import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Search, Save } from "lucide-react";

const contractorOptions = ["ABC Constructions", "XYZ Builders", "PQR Enterprises", "LMN Ltd", "RST Corp"];
const taskOptions = ["EPF Compliance", "ESIC Report", "License Renewal", "Safety Audit Q1", "Safety Training", "LWF Compliance"];

const initialAssignments = [
  { id: 1, task: "EPF Compliance", contractor: "ABC Constructions", assignedDate: "2026-06-01", dueDate: "2026-06-30", status: "PENDING" },
  { id: 2, task: "Safety Audit Q1", contractor: "XYZ Builders", assignedDate: "2026-05-15", dueDate: "2026-06-15", status: "SUBMITTED" },
  { id: 3, task: "License Renewal", contractor: "PQR Enterprises", assignedDate: "2026-04-01", dueDate: "2026-06-01", status: "APPROVED" },
  { id: 4, task: "ESIC Report", contractor: "LMN Ltd", assignedDate: "2026-06-05", dueDate: "2026-07-05", status: "PENDING" },
  { id: 5, task: "Safety Training", contractor: "RST Corp", assignedDate: "2026-03-01", dueDate: "2026-06-01", status: "DELAYED" },
];

const statusColors = { PENDING: "text-orange-600 bg-orange-50", SUBMITTED: "text-blue-600 bg-blue-50", APPROVED: "text-green-600 bg-green-50", REJECTED: "text-red-600 bg-red-50", DELAYED: "text-yellow-600 bg-yellow-50" };

export default function TaskAssignment() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [form, setForm] = useState({ contractor: "", task: "", dueDate: "" });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const filtered = assignments.filter((a) => a.contractor.toLowerCase().includes(search.toLowerCase()) || a.task.toLowerCase().includes(search.toLowerCase()));

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleAssign = () => {
    if (!form.contractor || !form.task || !form.dueDate) {
      showToast("Please fill all fields", "error"); return;
    }
    const newAssignment = {
      id: Date.now(),
      task: form.task,
      contractor: form.contractor,
      assignedDate: new Date().toISOString().split("T")[0],
      dueDate: form.dueDate,
      status: "PENDING",
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    setForm({ contractor: "", task: "", dueDate: "" });
    showToast("Task assigned successfully");
  };

  return (
    <div className="space-y-6">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg ${toast.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
          {toast.msg}
        </motion.div>
      )}

      {/* Assignment Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2"><ClipboardList size={18} /> Assign New Task</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Contractor *</label>
            <select value={form.contractor} onChange={(e) => setForm({ ...form, contractor: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24] bg-white">
              <option value="">Select contractor</option>
              {contractorOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Compliance Task *</label>
            <select value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24] bg-white">
              <option value="">Select task</option>
              {taskOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Due Date *</label>
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" />
          </div>
        </div>
        <button onClick={handleAssign} className="mt-4 flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700 transition-colors">
          <Save size={15} /> Assign Task
        </button>
      </div>

      {/* Assignments Table */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-[15px] font-bold text-gray-800">Existing Assignments ({filtered.length})</h3>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search assignments..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-[8px] border border-gray-200 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Task</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Contractor</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Assigned</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Due Date</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Status</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-[13px]">No assignments found</td></tr>
              ) : filtered.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-medium text-gray-700">{a.task}</td>
                  <td className="p-4 text-[13px] text-gray-600">{a.contractor}</td>
                  <td className="p-4 text-[13px] text-gray-500">{a.assignedDate}</td>
                  <td className="p-4 text-[13px] text-gray-500">{a.dueDate}</td>
                  <td className="p-4"><span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${statusColors[a.status]}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}