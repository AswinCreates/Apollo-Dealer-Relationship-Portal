export default function AdminReports() {
  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Reports</h2>
        <p className="text-white/70 text-[13px] mt-1">View and export portal analytics</p>
      </div>

      <div className="text-center py-16">
        <p className="text-gray-400 text-[13px]">No reports available</p>
      </div>
    </div>
  );
}