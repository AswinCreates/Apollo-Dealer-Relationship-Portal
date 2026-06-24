import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Palette } from "lucide-react";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Settings</h2>
        <p className="text-white/70 text-[13px] mt-1">Manage portal configuration</p>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: Shield,
            title: "Security Settings",
            desc: "Password policy, 2FA, session timeout",
            fields: ["Enable Two-Factor Authentication", "Session Timeout (minutes)"],
          },
          {
            icon: Bell,
            title: "Notification Settings",
            desc: "Email and SMS notification preferences",
            fields: ["Email notifications", "SMS alerts", "Daily digest"],
          },
          {
            icon: Palette,
            title: "Portal Settings",
            desc: "Branding and display preferences",
            fields: ["Portal name", "Primary color", "Logo URL"],
          },
        ].map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-[18px] border border-gray-200 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[12px] bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-[15px]">{section.title}</h3>
                  <p className="text-gray-500 text-[12px]">{section.desc}</p>
                </div>
              </div>
              <div className="space-y-3">
                {section.fields.map((field) => (
                  <div key={field} className="flex items-center justify-between">
                    <span className="text-gray-700 text-[13px] font-medium">{field}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7c3aed]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <button
          onClick={handleSave}
          className="w-full py-3 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white font-semibold rounded-[12px] flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          <Save size={16} /> {saved ? "Saved!" : "Save Settings"}
        </button>
      </motion.div>
    </div>
  );
}