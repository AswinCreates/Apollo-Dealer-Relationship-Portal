import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import "../../src/App.css";

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

  const currentPath = Object.keys(pageTitles).find((key) =>
    location.pathname.startsWith(key)
  );
  const title = pageTitles[currentPath] || "Contractor";

  return (
    <div className="page-card-layout-dark">
      {/* Card Container - like login card pattern */}
      <div className="page-card">
        {/* Card Body with animated content */}
        <div className="page-card-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Page title */}
              <h1 className="text-white font-bold text-[20px] sm:text-[24px] mb-5">{title}</h1>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation - mobile only */}
      <div className="block lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}