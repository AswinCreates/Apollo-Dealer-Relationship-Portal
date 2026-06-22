import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const titles = {
  "/supervisor/dashboard": "Supervisor Dashboard",
  "/supervisor/submissions": "Submissions Review",
  "/supervisor/reports": "Reports",
  "/supervisor/notifications": "Notifications",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/contractors": "Contractor Management",
  "/admin/contractors/new": "Add Contractor",
  "/admin/users": "User Management",
  "/admin/tasks": "Task Master",
  "/admin/assignments": "Task Assignments",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

export default function DashboardLayout({ role = "admin" }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = Object.keys(titles).find((k) => location.pathname.startsWith(k));
  const rawTitle = titles[currentPath];
  const title = rawTitle || (role === "supervisor" ? "Supervisor Panel" : "Admin Panel");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} role={role} />

      {/* Content wrapper */}
      <div
        className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:pl-[70px]" : "lg:pl-[240px]"}`}
      >
        {/* Topbar */}
        <div className="sticky top-0 z-30">
          <Topbar
            title={title}
            onNotifClick={() =>
              navigate(role === "supervisor" ? "/supervisor/notifications" : "/admin/settings")
            }
          />
        </div>

        {/* Page Content - Card container like login page */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 lg:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}