import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, Clock, XCircle, FileText } from "lucide-react";
import { getSubmissions } from "../../api/submissionApi";

const statusStyles = {
  APPROVED: { bg: "bg-green-500/15", text: "text-green-400", icon: FileCheck, label: "Approved" },
  PENDING: { bg: "bg-[#f97316]/15", text: "text-[#f97316]", icon: Clock, label: "Pending" },
  REJECTED: { bg: "bg-red-500/15", text: "text-red-400", icon: XCircle, label: "Rejected" },
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSubmissions();
        setSubmissions(res.data);
      } catch (err) {
        console.error("Submissions load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-[13px] mb-2">
        Your compliance submission history
      </motion.p>

      {submissions.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <FileText size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/30 text-[14px] font-medium">No submissions yet</p>
          <p className="text-white/20 text-[12px] mt-1">Your submitted compliance records will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub, i) => {
            const st = statusStyles[sub.status] || statusStyles.PENDING;
            const SIcon = st.icon;
            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[18px] p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-[14px]">
                      {sub.taskName || sub.complianceTask?.taskName || "Task"}
                    </h3>
                    <p className="text-white/40 text-[12px] mt-1">Submitted: {sub.submissionDate || sub.submittedAt || "N/A"}</p>
                    {sub.remarks && (
                      <p className="text-white/50 text-[12px] mt-2 italic">"{sub.remarks}"</p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] ${st.bg}`}>
                    <SIcon size={13} className={st.text} />
                    <span className={`text-[11px] font-bold ${st.text}`}>{st.label}</span>
                  </div>
                </div>
                {sub.supervisorRemarks && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <p className="text-white/35 text-[11px] font-semibold uppercase tracking-wider mb-1">Supervisor Remarks</p>
                    <p className="text-white/60 text-[12px]">{sub.supervisorRemarks}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}