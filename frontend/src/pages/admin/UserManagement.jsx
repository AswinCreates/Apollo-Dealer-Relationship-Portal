import { useState } from "react";

export default function UserManagement() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">User Management</h2>
        <p className="text-white/70 text-[13px] mt-1">Manage admin and supervisor accounts</p>
      </div>

      <div className="w-full">
        <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-gray-900 text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-[#7c3aed]" />
      </div>

      <div className="text-center py-16">
        <p className="text-gray-400 text-[13px]">No users available</p>
      </div>
    </div>
  );
}