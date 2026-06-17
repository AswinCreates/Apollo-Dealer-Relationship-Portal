import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, XCircle, Download, X } from "lucide-react";

const statusColors = { APPROVED: "text-green-600 bg-green-50", REJECTED: "text-red-600 bg-red-50", PENDING: "text-orange-600 bg-orange-50" };

const dummySubmissions = [
  { id: 1, task: "Safety Audit Q1", contractor: "ABC Constructions", doc: "safety_q1.pdf", date: "2026-06-10", status: "PENDING", remarks: "All safety protocols completed" },
  { id: 2, task: "EPF Compliance", contractor: "XYZ Builders", doc: "epf_report.pdf", date: "2026-06-09", status: "APPROVED", remarks: "All employees registered" },
  { id: 3, task: "ESIC Report", contractor: "PQR Enterprises", doc: "esic_submission.pdf", date: "2026-06-08", status: "REJECTED", remarks: "Missing employee details" },
  { id: 4, task: "License Renewal", contractor: "LMN Ltd", doc: "license_2026.pdf", date: "2026-06-07", status: "PENDING", remarks: "" },
  { id: 5, task: "Safety Training", contractor: "ABC Constructions", doc: "training_report.pdf", date: "2026-06-06", status: "PENDING", remarks: "Completed 40 hours training" },
];

export default function SupervisorSubmissions() {
  const [submissions] = useState(dummySubmissions);
  const [selected, setSelected] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [actionText, setActionText] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? submissions : submissions.filter((s) => s.status === filter);

  const handleAction = () => {
    setSelected((prev) => ({ ...prev, status: actionModal === "approve" ? "APPROVED" : "REJECTED" }));
    setActionModal(null);
    setActionText("");
  };

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="flex gap-2">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all ${filter === f ? "bg-[#E31E24] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Task</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Contractor</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Document</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Date</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Status</th>
              <th className="p-4 text-[12px] font-semibold text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-medium text-gray-700">{sub.task}</td>
                  <td className="p-4 text-[13px] text-gray-600">{sub.contractor}</td>
                  <td className="p-4 text-[13px] text-blue-600 font-medium">{sub.doc}</td>
                  <td className="p-4 text-[13px] text-gray-500">{sub.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${statusColors[sub.status]}`}>{sub.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(sub)} className="p-2 rounded-[8px] text-blue-600 hover:bg-blue-50 transition-colors"><Eye size={16} /></button>
                      {sub.status === "PENDING" && (
                        <>
                          <button onClick={() => { setSelected(sub); setActionModal("approve"); }} className="p-2 rounded-[8px] text-green-600 hover:bg-green-50 transition-colors"><CheckCircle size={16} /></button>
                          <button onClick={() => { setSelected(sub); setActionModal("reject"); }} className="p-2 rounded-[8px] text-red-600 hover:bg-red-50 transition-colors"><XCircle size={16} /></button>
                        </>
                      )}
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
        {selected && !actionModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-bold text-gray-800">Submission Details</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <div><p className="text-[11px] font-semibold text-gray-500 uppercase">Task</p><p className="text-[14px] text-gray-700 font-medium">{selected.task}</p></div>
                <div><p className="text-[11px] font-semibold text-gray-500 uppercase">Contractor</p><p className="text-[14px] text-gray-700">{selected.contractor}</p></div>
                <div><p className="text-[11px] font-semibold text-gray-500 uppercase">Document</p><p className="text-[14px] text-blue-600 font-medium flex items-center gap-2">{selected.doc} <Download size={14} /></p></div>
                <div><p className="text-[11px] font-semibold text-gray-500 uppercase">Remarks</p><p className="text-[14px] text-gray-600">{selected.remarks || "No remarks"}</p></div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase">Status</p>
                  <span className={`inline-flex px-2.5 py-1 rounded-[8px] text-[11px] font-bold mt-0.5 ${statusColors[selected.status]}`}>{selected.status}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approve/Reject Modal */}
      <AnimatePresence>
        {actionModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setActionModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-bold text-gray-800">{actionModal === "approve" ? "Approve Submission" : "Reject Submission"}</h3>
                <button onClick={() => setActionModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <p className="text-[13px] text-gray-500 mb-4">{actionModal === "approve" ? "Please provide supervisor remarks" : "Please provide the reason for rejection"}</p>
              <textarea
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
                placeholder={actionModal === "approve" ? "Enter remarks..." : "Enter rejection reason..."}
                rows={4}
                className="w-full border border-gray-200 rounded-[12px] p-3 text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#E31E24] resize-none"
              />
              <div className="flex gap-3 mt-5">
                <button onClick={() => setActionModal(null)} className="flex-1 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleAction} className={`flex-1 py-2.5 rounded-[10px] text-white text-[13px] font-bold transition-colors ${actionModal === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                  {actionModal === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}