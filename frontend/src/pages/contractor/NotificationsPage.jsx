import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const notifications = [
  { id: 1, title: "New Task Assigned", message: "Monthly Safety Report has been assigned to you", time: "2 hours ago", type: "info", read: false },
  { id: 2, title: "Submission Approved", message: "Your Waste Audit Q4 submission has been approved", time: "1 day ago", type: "success", read: false },
  { id: 3, title: "Deadline Approaching", message: "Water Treatment Compliance due in 3 days", time: "2 days ago", type: "warning", read: false },
  { id: 4, title: "Reminder", message: "Complete your profile information", time: "3 days ago", type: "info", read: true },
  { id: 5, title: "Submission Rejected", message: "Air Quality Check submission needs revision", time: "5 days ago", type: "error", read: true },
];

const typeConfig = {
  info: { icon: Info, bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/20" },
  success: { icon: CheckCircle2, bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/20" },
  warning: { icon: AlertTriangle, bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/20" },
  error: { icon: AlertTriangle, bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/20" },
};

export default function NotificationsPage() {
  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Notifications</h2>
        <p className="text-white/70 text-[13px] mt-1">Stay updated with your activities</p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif, i) => {
          const cfg = typeConfig[notif.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              className={`flex gap-4 p-4 rounded-[16px] border backdrop-blur-2xl ${
                notif.read ? "bg-white/[0.04] border-white/[0.06]" : "bg-white/[0.08] border-white/[0.12]"
              }`}
            >
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                <Icon size={18} className={cfg.text} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-semibold text-[14px]">{notif.title}</p>
                    <p className="text-white/50 text-[13px] mt-0.5">{notif.message}</p>
                  </div>
                  <button className="text-white/20 hover:text-white/60 transition-colors flex-shrink-0">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-white/30 text-[11px] mt-2">{notif.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}