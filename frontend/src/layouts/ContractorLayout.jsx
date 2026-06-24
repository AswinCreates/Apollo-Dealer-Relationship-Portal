import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import apolloLogo from "../assets/apollo-tyres.png";
import "../App.css";

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
      {/* Card Container */}
      <div className="page-card">
        {/* Card Body */}
        <div className="page-card-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Page Header with logo + title */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <img src={apolloLogo} alt="Apollo" style={{ width: "22px", height: "22px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </div>
                <h1 style={{
                  fontSize: "clamp(18px, 4vw, 24px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0
                }}>{title}</h1>
              </div>

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