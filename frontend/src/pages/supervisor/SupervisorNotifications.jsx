import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const dummy = [
  { id: 1, title: "New Submission", message: "ABC Constructions submitted Safety Audit Q1", date: "2026-06-10 14:30", type: "NEW_TASK", read: false },
  { id: 2, title: "Submission Approved", message: "EPF Compliance from XYZ Builders was approved", date: "2026-06-09 11:20", type: "APPROVED", read: false },
  { id: 3, title: "Submission Rejected", message: "ESIC Report from PQR Enterprises was rejected", date: "2026-06-08 16:45", type: "REJECTED", read: true },
  { id: 4, title: "Due Date Reminder", message: "License Renewal for LMN Ltd is due tomorrow", date: "2026-06-07 09:00", type: "REMINDER", read: true },
  { id: 5, title: "New Submission", message: "Safety Training from ABC Constructions", date: "2026-06-06 10:15", type: "NEW_TASK", read: true },
];

const typeStyles = {
  NEW_TASK: { icon: Info, color: "text-blue-600 bg-blue-50" },
  APPROVED: { icon: CheckCircle, color: "text-green-600 bg-green-50" },
  REJECTED: { icon: XCircle, color: "text-red-600 bg-red-50" },
  REMINDER: { icon: AlertTriangle, color: "text-yellow-600 bg-yellow-50" },
};

export default function SupervisorNotifications() {
  const [notifs, setNotifs] = useState(dummy);

  const markRead = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[13px] text-gray-500">{notifs.filter((n) => !n.read).length} unread notifications</p>
      </div>

      {notifs.map((n, i) => {
        const st = typeStyles[n.type] || typeStyles.NEW_TASK;
        const Icon = st.icon;
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => markRead(n.id)}
            className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${n.read ? "border-gray-200" : "border-[#E31E24]/20 bg-red-50/30"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${st.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-gray-800">{n.title}</h3>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-[#E31E24]" />}
                </div>
                <p className="text-[13px] text-gray-600 mt-0.5">{n.message}</p>
                <p className="text-[11px] text-gray-400 mt-2">{n.date}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}