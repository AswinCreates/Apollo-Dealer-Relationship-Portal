import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, FileUp, User } from "lucide-react";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/contractor/dashboard" },
  { key: "tasks", label: "Tasks", icon: ListTodo, route: "/contractor/tasks" },
  { key: "submissions", label: "Submissions", icon: FileUp, route: "/contractor/submissions" },
  { key: "profile", label: "Profile", icon: User, route: "/contractor/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 safe-area-pb">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname.startsWith(tab.route);
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={`flex flex-col items-center gap-1 py-2 px-3 transition-all duration-200 ${
                isActive ? "text-[#f97316]" : "text-white/40"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-[#f97316] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}