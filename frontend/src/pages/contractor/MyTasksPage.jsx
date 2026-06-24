import { useState } from "react";
import { Search } from "lucide-react";

export default function MyTasksPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">My Tasks</h2>
        <p className="text-white/70 text-[13px] mt-1">Manage your compliance tasks</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/[0.06] border border-white/[0.08] rounded-[12px] pl-9 pr-4 py-2.5 text-white text-[13px] placeholder:text-white/30 focus:outline-none focus:border-[#7c3aed]"
        />
      </div>

      {/* Empty State */}
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-[14px] bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
          <Search size={28} className="text-white/20" />
        </div>
        <p className="text-white/40 text-[13px]">No tasks available</p>
      </div>
    </div>
  );
}