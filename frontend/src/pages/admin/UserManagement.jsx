import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, ShieldOff, Key, X, Search, Save } from "lucide-react";

const initialUsers = [
  { id: 1, vendorCode: "VC-001", email: "rajesh@abc.com", role: "CONTRACTOR", active: true },
  { id: 2, vendorCode: "VC-002", email: "amit@xyz.com", role: "CONTRACTOR", active: true },
  { id: 3, vendorCode: "", email: "supervisor1@apollo.com", role: "SUPERVISOR", active: true },
  { id: 4, vendorCode: "", email: "admin@apollo.com", role: "ADMIN", active: true },
  { id: 5, vendorCode: "VC-003", email: "sunil@pqr.com", role: "CONTRACTOR", active: false },
];

const roleColors = { CONTRACTOR: "text-blue-600 bg-blue-50", SUPERVISOR: "text-purple-600 bg-purple-50", ADMIN: "text-[#E31E24] bg-red-50" };

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [form, setForm] = useState({ email: "", role: "CONTRACTOR", vendorCode: "", password: "" });
  const [toast, setToast] = useState(null);

  const filtered = users.filter((u) => {
    if (filter !== "ALL" && u.role !== filter) return false;
    return u.email.toLowerCase().includes(search.toLowerCase()) || u.vendorCode.toLowerCase().includes(search.toLowerCase());
  });

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleAdd = () => {
    if (!form.email.trim()) { showToast("Email is required", "error"); return; }
    const newUser = { id: Date.now(), vendorCode: form.vendorCode, email: form.email, role: form.role, active: true };
    setUsers((prev) => [...prev, newUser]);
    setAddModal(false);
    setForm({ email: "", role: "CONTRACTOR", vendorCode: "", password: "" });
    showToast("User added successfully");
  };

  const handleEdit = () => {
    setUsers((prev) => prev.map((u) => u.id === editModal.id ? { ...u, email: form.email, role: form.role, vendorCode: form.vendorCode } : u));
    setEditModal(null);
    showToast("User updated successfully");
  };

  const handleDeactivate = (id) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !u.active } : u));
    showToast("User status toggled");
  };

  const handleResetPassword = (u) => {
    showToast(`Password reset email sent to ${u.email}`);
  };

  const openEdit = (u) => { setForm({ email: u.email, role: u.role, vendorCode: u.vendorCode, password: "" }); setEditModal(u); };

  return (
    <div className="space-y-6">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg ${toast.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
          {toast.msg}
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {["ALL", "ADMIN", "SUPERVISOR", "CONTRACTOR"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all ${filter === f ? "bg-[#E31E24] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f}</button>
          ))}
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-[8px] border border-gray-200 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
          <button onClick={() => { setForm({ email: "", role: "CONTRACTOR", vendorCode: "", password: "" }); setAddModal(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#E31E24] text-white text-[12px] font-semibold hover:bg-red-700">
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Vendor Code</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Email</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Role</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Status</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-[13px]">No users found</td></tr>
              ) : filtered.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[13px] text-gray-600 font-mono">{u.vendorCode || "—"}</td>
                  <td className="p-4 text-[13px] text-gray-700 font-medium">{u.email}</td>
                  <td className="p-4"><span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${roleColors[u.role]}`}>{u.role}</span></td>
                  <td className="p-4"><span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${u.active ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-100"}`}>{u.active ? "Active" : "Inactive"}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(u)} className="p-2 rounded-[8px] text-blue-600 hover:bg-blue-50 transition-colors" title="Edit"><Edit3 size={15} /></button>
                      <button onClick={() => handleDeactivate(u.id)} className={`p-2 rounded-[8px] transition-colors ${u.active ? "text-orange-600 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`} title={u.active ? "Deactivate" : "Activate"}>
                        <ShieldOff size={15} />
                      </button>
                      <button onClick={() => handleResetPassword(u)} className="p-2 rounded-[8px] text-red-600 hover:bg-red-50 transition-colors" title="Reset Password"><Key size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {addModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setAddModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-gray-800">Add User</h3>
                <button onClick={() => setAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@example.com"
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24] bg-white">
                    <option value="CONTRACTOR">Contractor</option><option value="SUPERVISOR">Supervisor</option><option value="ADMIN">Admin</option>
                  </select></div>
                {form.role === "CONTRACTOR" && <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Vendor Code</label>
                  <input type="text" value={form.vendorCode} onChange={(e) => setForm({ ...form, vendorCode: e.target.value })} placeholder="VC-XXX"
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>}
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Password *</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Set password"
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setAddModal(false)} className="flex-1 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700">
                  <Save size={15} /> Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setEditModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-gray-800">Edit User</h3>
                <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>
                <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24] bg-white">
                    <option value="CONTRACTOR">Contractor</option><option value="SUPERVISOR">Supervisor</option><option value="ADMIN">Admin</option>
                  </select></div>
                {form.role === "CONTRACTOR" && <div><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">Vendor Code</label>
                  <input type="text" value={form.vendorCode} onChange={(e) => setForm({ ...form, vendorCode: e.target.value })}
                    className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditModal(null)} className="flex-1 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleEdit} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}