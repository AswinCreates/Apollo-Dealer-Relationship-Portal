import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { addContractor } from "../../api/admin/adminApi";

const fields = [
  { name: "clientName", label: "Client Name", type: "text" },
  { name: "contractorName", label: "Contractor Name", type: "text" },
  { name: "ownerName", label: "Owner Name", type: "text" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "natureOfJob", label: "Nature of Job", type: "text" },
  { name: "engagementDate", label: "Engagement Date", type: "date" },
  { name: "agreementPeriod", label: "Agreement Period", type: "text" },
  { name: "licenseNumber", label: "License Number", type: "text" },
  { name: "licenseStrength", label: "License Strength", type: "number" },
  { name: "headCount", label: "Head Count", type: "number" },
  { name: "licenseValidity", label: "License Validity", type: "date" },
  { name: "regCertStrength", label: "Registration Certificate Strength", type: "number" },
  { name: "contractValidity", label: "Contract Validity", type: "date" },
  { name: "epfCode", label: "EPF Code", type: "text" },
  { name: "esicCode", label: "ESIC Code", type: "text" },
  { name: "lwfCode", label: "LWF Code", type: "text" },
  { name: "ptEstCode", label: "PT Establishment Code", type: "text" },
  { name: "ptEmployerCode", label: "PT Employer Code", type: "text" },
];

export default function AddContractor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (name, val) => setForm((prev) => ({ ...prev, [name]: val }));

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await addContractor(form);
      setToast({ type: "success", msg: "Contractor added successfully" });
      setTimeout(() => navigate("/admin/contractors"), 1500);
    } catch {
      setToast({ type: "error", msg: "Failed to add contractor" });
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.msg}
        </motion.div>
      )}

      <button onClick={() => navigate("/admin/contractors")} className="flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-gray-700">
        <ArrowLeft size={16} /> Back to Contractors
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[18px] font-bold text-gray-800 mb-6">Add New Contractor</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea value={form[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} rows={3}
                  className="w-full border border-gray-200 rounded-[10px] p-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24] resize-none" />
              ) : (
                <input type={f.type} value={form[f.name] || ""} onChange={(e) => set(f.name, e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <button onClick={() => navigate("/admin/contractors")} className="px-6 py-2.5 rounded-[10px] border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700 disabled:opacity-50">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={15} />}
            {saving ? "Saving..." : "Save Contractor"}
          </button>
        </div>
      </div>
    </div>
  );
}