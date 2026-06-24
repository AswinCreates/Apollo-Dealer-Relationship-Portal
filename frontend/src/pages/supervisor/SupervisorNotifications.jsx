import { Info } from "lucide-react";

export default function SupervisorNotifications() {
  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Notifications</h2>
        <p className="text-white/70 text-[13px] mt-1">Stay updated with submission alerts</p>
      </div>

      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-[14px] bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
          <Info size={28} className="text-white/20" />
        </div>
        <p className="text-white/40 text-[13px]">No notifications</p>
      </div>
    </div>
  );
}