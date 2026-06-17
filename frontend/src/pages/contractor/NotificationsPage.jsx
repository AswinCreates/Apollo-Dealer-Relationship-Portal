import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { getNotifications, markAsRead } from "../../api/notificationApi";

const notifIcons = {
  NEW_TASK: { icon: Bell, color: "text-blue-400", bg: "bg-blue-500/15" },
  APPROVED: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/15" },
  REJECTED: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
  REMINDER: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/15" },
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res.data);
      } catch (err) {
        console.error("Notifications load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/50 text-[13px] font-medium hover:text-white/80 transition-colors mb-2"
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      {notifications.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Bell size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/30 text-[14px] font-medium">No notifications</p>
          <p className="text-white/20 text-[12px] mt-1">You're all caught up!</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, i) => {
            const type = notif.type || "NEW_TASK";
            const style = notifIcons[type] || notifIcons.NEW_TASK;
            const Icon = style.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => !notif.read && handleMarkRead(notif.id)}
                className={`bg-white/[0.06] backdrop-blur-2xl border rounded-[18px] p-4 cursor-pointer transition-all ${
                  notif.read ? "border-white/[0.06]" : "border-white/[0.12] bg-white/[0.08]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-[12px] ${style.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={style.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-[14px]">{notif.title || "Notification"}</h3>
                    <p className="text-white/45 text-[12px] mt-1 line-clamp-2">{notif.message || notif.body || ""}</p>
                    <p className="text-white/25 text-[11px] mt-2">{notif.time || notif.createdAt || ""}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] flex-shrink-0 mt-2" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}