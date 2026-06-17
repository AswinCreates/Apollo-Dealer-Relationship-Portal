import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit3, Trash2, X, Search, Save } from "lucide-react";

const initial = [
  { id: 1, name: "ABC Constructions", owner: "Rajesh Kumar", license: "LC-2026-001", headCount: 45, contractValidity: "2027-03-31", vendorCode: "VC-001" },
  { id: 2, name: "XYZ Builders", owner: "Amit Patel", license: "LC-2026-002", headCount: 32, contractValidity: "2026-12-31", vendorCode: "VC-002" },
  { id: 3, name: "PQR Enterprises", owner: "Sunil Mehta", license: "LC-2026-003", headCount: 28, contractValidity: "2027-06-30", vendorCode: "VC-003" },
  { id: 4, name: "LMN Ltd", owner: "Vikram Singh", license: "LC-2026-004", headCount: 55, contractValidity: "2026-09-30", vendorCode: "VC-004" },
  { id: 5, name: "RST Corp", owner: "Priya Sharma", license: "LC-2026-005", headCount: 18, contractValidity: "2027-01-31", vendorCode: "VC-005" },
];

export default function ContractorManagement() {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState(initial);
  const [search, setSearch] = useState("");
  const [view, setView] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [form, setForm] = useState({ name: "", owner: "", license: "", headCount: "", contractValidity: "", vendorCode: "" });
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = contractors.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.owner.toLowerCase().includes(search.toLowerCase()));

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const openEdit = (c) => { setForm({ name: c.name, owner: c.owner, license: c.license, headCount: c.headCount, contractValidity: c.contractValidity, vendorCode: c.vendorCode }); setEditModal(c); };

  const handleEdit = () => {
    setContractors((prev) => prev.map((c) => c.id === editModal.id ? { ...c, ...form, headCount: Number(form.headCount) } : c));
    setEditModal(null);
    showToast("Contractor updated successfully");
  };

  const handleDelete = (id) => {
    setContractors((prev) => prev.filter((c) => c.id !== id));
    setConfirmDel(null);
    showToast("Contractor deleted");
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
          <input type="text" placeholder="Search contractors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-200 bg-white text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#E31E24]" />
        </div>
        <button onClick={() => navigate("/admin/contractors/new")} className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-semibold hover:bg-red-700">
          <Plus size={16} /> Add Contractor
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Contractor</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Owner</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">License</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Head Count</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Contract Validity</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-[13px]">No contractors found</td></tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-medium text-gray-700">{c.name}</td>
                  <td className="p-4 text-[13px] text-gray-600">{c.owner}</td>
                  <td className="p-4 text-[13px] text-gray-500">{c.license}</td>
                  <td className="p-4 text-[13px] text-gray-500">{c.headCount}</td>
                  <td className="p-4 text-[13px] text-gray-500">{c.contractValidity}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setView(c)} className="p-2 rounded-[8px] text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye size={15} /></button>
                      <button onClick={() => openEdit(c)} className="p-2 rounded-[8px] text-orange-600 hover:bg-orange-50 transition-colors" title="Edit"><Edit3 size={15} /></button>
                      <button onClick={() => setConfirmDel(c)} className="p-2 rounded-[8px] text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {view && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setView(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-bold text-gray-800">Contractor Details</h3>
                <button onClick={() => setView(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                {[["Name", view.name], ["Owner", view.owner], ["License", view.license], ["Vendor Code", view.vendorCode], ["Head Count", view.headCount], ["Contract Validity", view.contractValidity]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-[12px] font-semibold text-gray-500 uppercase">{k}</span>
                    <span className="text-[14px] text-gray-700 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setEditModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-gray-800">Edit Contractor</h3>
                <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["name", "Contractor Name", "text"], ["owner", "Owner Name", "text"], ["license", "License Number", "text"], ["vendorCode", "Vendor Code", "text"], ["headCount", "Head Count", "number"], ["contractValidity", "Contract Validity", "date"]].map(([key, label, type]) => (
                  <div key={key}><label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] outline-none focus:border-[#E31E24]" /></div>
                ))}
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

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setConfirmDel(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-[16px] font-bold text-gray-800 mb-2">Delete Contractor?</h3>
              <p className="text-[13px] text-gray-500 mb-5">This action cannot be undone. {confirmDel.name} will be permanently removed.</p>
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