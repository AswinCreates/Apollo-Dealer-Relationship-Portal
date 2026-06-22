import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ClipboardList, FileText, Bell,
  ChevronLeft, Menu, X, Shield, Settings,
  Building2, FileCheck, LogOut
} from "lucide-react";
import apolloLogo from "../../assets/apollo-tyres.png";

const supervisorLinks = [
  { label: "Dashboard", path: "/supervisor/dashboard", icon: LayoutDashboard },
  { label: "Submissions", path: "/supervisor/submissions", icon: ClipboardList },
  { label: "Reports", path: "/supervisor/reports", icon: FileText },
  { label: "Notifications", path: "/supervisor/notifications", icon: Bell },
];

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Contractors", path: "/admin/contractors", icon: Building2 },
  { label: "Users", path: "/admin/users", icon: Shield },
  { label: "Task Master", path: "/admin/tasks", icon: FileCheck },
  { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { label: "Reports", path: "/admin/reports", icon: FileText },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

function NavContent({ collapsed, links, location, onNavigate, onLogout }) {
  return (
    <>
      <div className={`flex items-center gap-2.5 px-4 py-2 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-7 h-7 rounded-[7px] bg-[#E31E24] flex items-center justify-center flex-shrink-0">
          <img src={apolloLogo} alt="Apollo" className="w-4 h-4 object-contain" />
        </div>
        {!collapsed && <span className="text-white font-bold text-[13px]">Apollo Tyres</span>}
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname.startsWith(link.path);
          return (
            <button
              key={link.path}
              onClick={() => { onNavigate(link.path); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition-all ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={collapsed ? "mx-auto" : "flex-shrink-0"} />
              {!collapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </div>

      <div className={`px-3 pb-4 ${collapsed ? "flex justify-center" : ""}`}>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-medium text-red-400 hover:bg-red-500/10 w-full transition-all"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ collapsed, onToggle, role = "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = role === "supervisor" ? supervisorLinks : adminLinks;

  const handleNavigate = (path) => { navigate(path); setMobileOpen(false); };
  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const navProps = { collapsed, links, location, onNavigate: handleNavigate, onLogout: handleLogout };

  return (
    <>
      {/* Mobile Toggle - hidden when drawer is open */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-40 w-9 h-9 rounded-[10px] bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#1a1d29] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end p-3 border-b border-white/10">
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <NavContent {...navProps} collapsed={false} links={links} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-[#1a1d29] fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[240px]"
        }`}
      >
        <div className="flex flex-col h-full py-4">
          <NavContent {...navProps} />
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-50"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={14} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>
    </>
  );
}