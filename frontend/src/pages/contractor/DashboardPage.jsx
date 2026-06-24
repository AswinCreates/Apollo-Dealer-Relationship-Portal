import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();

  console.log("DashboardPage rendered");

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <p className="text-white/80 text-[13px] font-medium">Welcome back</p>
        <h2 className="text-white text-[22px] font-extrabold mt-0.5">Contractor</h2>
        <p className="text-white/70 text-[13px] mt-1">Here's your compliance overview</p>
      </div>

      <div className="text-center py-16">
        <p className="text-white/40 text-[13px]">No data available</p>
      </div>

      <div>
        <h3 className="text-white font-bold text-[15px] mb-3">Quick Actions</h3>
        <div className="space-y-3">
          <button onClick={() => navigate("/contractor/tasks")} className="w-full flex items-center justify-between bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[16px] p-4 hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#7c3aed]/20 flex items-center justify-center"><ArrowRight size={18} className="text-[#a78bfa]" /></div>
              <span className="text-white font-semibold text-[14px]">View Tasks</span>
            </div>
            <ArrowRight size={18} className="text-white/30" />
          </button>
        </div>
      </div>
    </div>
  );
}