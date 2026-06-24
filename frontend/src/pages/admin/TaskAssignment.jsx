import { useState } from "react";

export default function TaskAssignment() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Task Assignments</h2>
        <p className="text-white/70 text-[13px] mt-1">Assign tasks to contractors</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        {["all", "assigned", "in progress", "completed", "pending"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all ${filter === f ? "bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/25" : "bg-white text-gray-600 border border-gray-200 hover:border-[#7c3aed] hover:text-[#7c3aed]"}`}>
            {f === "all" ? "All" : f.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
          </button>
        ))}
      </div>

      <div className="text-center py-16">
        <p className="text-gray-400 text-[13px]">No assignments available</p>
      </div>
    </div>
  );
}