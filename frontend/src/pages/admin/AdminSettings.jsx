import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Info, Save } from "lucide-react";

export default function AdminSettings() {
  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@apollo.com" });
  const [password, setPassword] = useState({ current: "", newPass: "", confirm: "" });
  const [toast, setToast] = useState(null);

  const handleProfileSave = () => {
    setToast({ type: "success", msg: "Profile updated successfully" });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePasswordSave = () => {
    if (password.newPass !== password.confirm) { setToast({ type: "error", msg: "Passwords do not match" }); }
    else { setToast({ type: "success", msg: "Password changed successfully" }); setPassword({ current: "", newPass: "", confirm: "" }); }
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.msg}
        </motion.div>
      )}

      {/* Profile Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-5 flex items-center gap-2"><User size={18} /> Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
        </div>
        <button onClick={handleProfileSave} className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700 transition-colors">
          <Save size={15} /> Save Profile
        </button>
      </motion.div>

      {/* Change Password Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-5 flex items-center gap-2"><Lock size={18} /> Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Current Password</label>
            <input type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">New Password</label>
            <input type="password" value={password.newPass} onChange={(e) => setPassword({ ...password, newPass: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 uppercase mb-1.5">Confirm New Password</label>
            <input type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
              className="w-full h-10 border border-gray-200 rounded-[10px] px-3 text-[13px] text-gray-700 outline-none focus:border-[#E31E24]" />
          </div>
        </div>
        <button onClick={handlePasswordSave} className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#E31E24] text-white text-[13px] font-bold hover:bg-red-700 transition-colors">
          <Save size={15} /> Update Password
        </button>
      </motion.div>

      {/* System Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-[15px] font-bold text-gray-800 mb-5 flex items-center gap-2"><Info size={18} /> System Information</h3>
        <div className="space-y-3">
          {[["Application", "Apollo Tyres Compliance Portal"], ["Version", "1.0.0"], ["Environment", "Production"], ["Last Updated", "2026-06-17"]].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-[13px] text-gray-500 font-medium">{k}</span>
              <span className="text-[13px] text-gray-700 font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}