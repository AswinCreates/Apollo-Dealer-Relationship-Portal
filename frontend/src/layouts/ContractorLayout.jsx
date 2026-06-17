import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import BottomNav from "../components/BottomNav";
import apolloLogo from "../assets/apollo-tyres.png";

const pageTitles = {
  "/contractor/dashboard": "Dashboard",
  "/contractor/tasks": "My Tasks",
  "/contractor/submissions": "Submissions",
  "/contractor/profile": "Profile",
  "/contractor/reports": "Reports",
  "/contractor/notifications": "Notifications",
};

export default function ContractorLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = Object.keys(pageTitles).find((key) =>
    location.pathname.startsWith(key)
  );
  const title = pageTitles[currentPath] || "Contractor";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1a3a] to-[#0e2a5c]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-[480px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-[#f97316] flex items-center justify-center">
              <img src={apolloLogo} alt="Apollo" className="w-5 h-5 object-contain filter brightness-0 invert" />
            </div>
            <h1 className="text-white font-bold text-[16px]">{title}</h1>
          </div>
          <button
            onClick={() => navigate("/contractor/notifications")}
            className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white/80 transition-colors"
          >
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="max-w-[480px] mx-auto px-5 py-4 pb-24"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}