import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Building, Mail, Wrench, FileText, Hash, Shield, Settings, HelpCircle, LogOut, Lock } from "lucide-react";
import { getProfile } from "../../api/profileApi";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  const fields = [
    { icon: User, label: "Name", value: profile?.name || "Contractor" },
    { icon: Hash, label: "Vendor Code", value: profile?.vendorCode || "N/A" },
    { icon: Mail, label: "Email", value: profile?.email || "N/A" },
    { icon: Wrench, label: "Nature of Job", value: profile?.natureOfJob || "N/A" },
    { icon: FileText, label: "License Number", value: profile?.licenseNumber || "N/A" },
    { icon: Shield, label: "EPF Code", value: profile?.epfCode || "N/A" },
    { icon: Building, label: "ESIC Code", value: profile?.esicCode || "N/A" },
  ];

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#f97316]/20 to-[#ea580c]/10 border border-[#f97316]/20 rounded-[20px] p-6 text-center"
      >
        <div className="w-16 h-16 rounded-[18px] bg-[#f97316] flex items-center justify-center mx-auto mb-3">
          <User size={28} className="text-white" />
        </div>
        <h2 className="text-white text-[18px] font-bold">{profile?.name || "Contractor"}</h2>
        <p className="text-white/50 text-[13px] mt-1">{profile?.vendorCode || "Vendor"}</p>
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5 space-y-0"
      >
        {fields.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className={`flex items-center gap-3 py-3.5 ${i < fields.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
              <div className="w-8 h-8 rounded-[9px] bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/35 text-[10px] font-semibold uppercase tracking-[0.06em]">{f.label}</p>
                <p className="text-white text-[13px] font-medium truncate mt-0.5">{f.value}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5 space-y-0"
      >
        <button className="w-full flex items-center gap-3 py-3.5 border-b border-white/[0.06] hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-[9px] bg-blue-500/15 flex items-center justify-center"><Lock size={15} className="text-blue-400" /></div>
          <span className="text-white text-[13px] font-medium">Change Password</span>
        </button>
        <button className="w-full flex items-center gap-3 py-3.5 border-b border-white/[0.06] hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-[9px] bg-[#f97316]/15 flex items-center justify-center"><Settings size={15} className="text-[#f97316]" /></div>
          <span className="text-white text-[13px] font-medium">Notification Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 py-3.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-[9px] bg-green-500/15 flex items-center justify-center"><HelpCircle size={15} className="text-green-400" /></div>
          <span className="text-white text-[13px] font-medium">Help & Support</span>
        </button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[16px] bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-[14px] hover:bg-red-500/15 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}