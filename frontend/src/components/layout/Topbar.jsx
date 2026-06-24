import { useNavigate } from "react-router-dom";
import { Bell, User, LogOut } from "lucide-react";

export default function Topbar({ title, onNotifClick }) {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between lg:ml-0 ml-10">
        <h1 className="text-[15px] sm:text-[18px] font-bold text-gray-800 truncate">{title}</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={onNotifClick}
            className="w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-purple-500/25">
              <User size={14} className="text-white" />
            </div>
            <span className="text-[13px] font-medium text-gray-600 hidden sm:block">User</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}