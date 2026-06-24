import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function ContractorManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Contractor Management</h2>
        <p className="text-white/70 text-[13px] mt-1">Manage registered contractors</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <input type="text" placeholder="Search contractors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-gray-900 text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-[#7c3aed]" />
        </div>
        <button onClick={() => navigate("/admin/contractors/new")} className="px-4 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white text-[13px] font-semibold rounded-[12px] flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="text-center py-16">
        <p className="text-gray-400 text-[13px]">No contractors available</p>
      </div>
    </div>
  );
}