import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, X, Search, Save } from "lucide-react";

const initialTasks = [
  { id: 1, name: "EPF Compliance", description: "Employee Provident Fund registration and monthly contribution compliance", frequency: "Monthly" },
  { id: 2, name: "ESIC Report", description: "Employee State Insurance Corporation compliance and filing", frequency: "Monthly" },
  { id: 3, name: "License Renewal", description: "Annual contractor license renewal and verification", frequency: "Annually" },
  { id: 4, name: "Safety Audit Q1", description: "Quarterly workplace safety audit and compliance check", frequency: "Quarterly" },
  { id: 5, name: "Safety Training", description: "Annual safety training program completion for all workers", frequency: "Annually" },
  { id: 6, name: "LWF Compliance", description: "Labour Welfare Fund contribution compliance", frequency: "Annually" },
];

const freqColors = { Monthly: "text-blue-600 bg-blue-50", Quarterly: "text-purple-600 bg-purple-50", Annually: "text-orange-600 bg-orange-50" };

export default function TaskMaster() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | "edit"
  const [form, setForm] = useState({ name: "", description: "", frequency: "Monthly" });
  const [editingId, setEditingId] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = tasks.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => { setForm({ name: "", description: "", frequency: "Monthly" }); setEditingId(null); setModal("add"); };
  const openEdit = (t) => { setForm({ name: t.name, description: t.description, frequency: t.frequency }); setEditingId(t.id); setModal("edit"); };

  const handleSave = () => {
    if (!form.name.trim()) { showToast("Task name is required", "error"); return; }
    if (modal === "add") {
      const newTask = { id: Date.now(), ...form };
      setTasks((prev) => [...prev, newTask]);
      showToast("Task added successfully");
    } else {
      setTasks((prev) => prev.map((t) => t.id === editingId ? { ...t, ...form } : t));
      showToast("Task updated successfully");
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setConfirmDel(null);
    showToast("Task deleted");
  };

  return (
    <div className="space-y-6">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg ${toast.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
          {toast.msg}
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-200 bg-white text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#E31E24]" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-semibold hover:bg-red-700">
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Task Name</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Description</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Frequency</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-400 text-[13px]">No tasks found</td></tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-medium text-gray-700">{t.name}</td>
                  <td className="p-4 text-[13px] text-gray-500 max-w-xs truncate">{t.description}</td>
                  <td className="p-4"><span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${freqColors[t.frequency] || "text-gray-600 bg-gray-100"}`}>{t.frequency}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(t)} className="p-2 rounded-[8px] text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 size={15} /></button>
                      <button onClick={() => setConfirmDel(t)} className="p-2 rounded-[8px] text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-gray-800">{modal === "add" ? "Add Compliance Task" : "Edit Task"}</h3>
                <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Task Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter task name"
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Enter description"
                    className="w-full border border-gray-200 rounded-[10px] p-3 text-[13px] outline-none focus:border-[#E31E24] resize-none" /></div>
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Frequency</label>
                  <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24] bg-white">
                    <option>Monthly</option><option>Quarterly</option><option>Annually</option>
                  </select></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700">
                  <Save size={15} /> {modal === "add" ? "Add Task" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setConfirmDel(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[16px] font-bold text-gray-800 mb-2">Delete Task?</h3>
              <p className="text-[13px] text-gray-500 mb-5">This will permanently remove "{confirmDel.name}".</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDel(null)} className="flex-1 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDelete(confirmDel.id)} className="flex-1 py-2.5 rounded-[10px] bg-red-600 text-white text-[13px] font-bold hover:bg-red-700">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}