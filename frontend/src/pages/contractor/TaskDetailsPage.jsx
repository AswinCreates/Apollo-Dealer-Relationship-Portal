import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, FileText, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { getContractorTasks, submitCompliance } from "../../api/submissionApi";

const statusColors = {
  PENDING: { bg: "bg-[#f97316]/15", text: "text-[#f97316]", label: "Pending" },
  SUBMITTED: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Submitted" },
  APPROVED: { bg: "bg-green-500/15", text: "text-green-400", label: "Approved" },
  REJECTED: { bg: "bg-red-500/15", text: "text-red-400", label: "Rejected" },
  DELAYED: { bg: "bg-yellow-500/15", text: "text-yellow-400", label: "Delayed" },
};

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContractorTasks();
        const found = res.data.find((t) => String(t.id) === String(taskId));
        setTask(found || null);
      } catch (err) {
        console.error("Task load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskId]);

  const handleSubmit = async () => {
    if (!remarks.trim()) {
      setToast({ type: "error", msg: "Please enter remarks before submitting" });
      return;
    }
    setSubmitting(true);
    try {
      await submitCompliance(taskId, { remarks, file });
      setToast({ type: "success", msg: "Compliance submitted successfully!" });
      setTimeout(() => navigate("/contractor/tasks"), 2000);
    } catch (e) {
      setToast({ type: "error", msg: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-[14px]">Task not found</p>
        <button onClick={() => navigate("/contractor/tasks")} className="mt-4 text-[#f97316] text-[13px] font-semibold">Go Back</button>
      </div>
    );
  }

  const sc = statusColors[task.status] || statusColors.PENDING;

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[14px] text-[13px] font-semibold ${
            toast.type === "success" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={15} className="inline mr-2" /> : <AlertTriangle size={15} className="inline mr-2" />}
          {toast.msg}
        </motion.div>
      )}

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/contractor/tasks")}
        className="flex items-center gap-2 text-white/50 text-[13px] font-medium hover:text-white/80 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Tasks
      </motion.button>

      {/* Task Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-white text-[18px] font-bold">{task.complianceTask?.taskName || task.taskName || "Untitled Task"}</h2>
            <p className="text-white/40 text-[13px] mt-1">Task ID: #{task.id}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-[10px] text-[11px] font-bold ${sc.bg} ${sc.text}`}>{sc.label}</span>
        </div>

        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-white/50 text-[13px]">
            <Calendar size={15} className="text-[#f97316]" />
            <span>Due Date: {task.dueDate}</span>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-[13px]">
            <Clock size={15} className="text-blue-400" />
            <span>Assigned: {task.assignedDate}</span>
          </div>
          {task.complianceTask?.description && (
            <div className="flex items-start gap-3 text-white/50 text-[13px]">
              <FileText size={15} className="text-green-400 mt-0.5" />
              <span>{task.complianceTask.description}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Compliance Submission */}
      {task.status === "PENDING" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5 space-y-4"
        >
          <h3 className="text-white font-bold text-[15px]">Submit Compliance</h3>

          <div className="space-y-2">
            <label className="text-white/50 text-[12px] font-semibold">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter your remarks..."
              rows={4}
              className="w-full rounded-[14px] bg-white/[0.06] border border-white/[0.08] text-white text-[14px] placeholder-white/30 p-3.5 outline-none focus:border-[#f97316]/50 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/50 text-[12px] font-semibold">Document Upload</label>
            <label className="flex flex-col items-center justify-center w-full h-32 rounded-[16px] border-2 border-dashed border-white/[0.12] bg-white/[0.03] cursor-pointer hover:bg-white/[0.05] hover:border-white/[0.2] transition-all">
              <Upload size={28} className="text-white/25 mb-2" />
              <p className="text-white/35 text-[13px] font-medium">{file ? file.name : "Tap to upload document"}</p>
              <p className="text-white/20 text-[11px] mt-1">PDF, DOC, or Images</p>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
            </label>
            {file && (
              <div className="flex items-center justify-between bg-white/[0.04] rounded-[12px] px-4 py-2.5 mt-2">
                <span className="text-white/60 text-[12px] truncate">{file.name}</span>
                <button onClick={() => setFile(null)} className="text-red-400 text-[12px] font-semibold ml-3 flex-shrink-0">Remove</button>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full h-12 rounded-[14px] bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#f97316]/25 transition-all disabled:opacity-60"
          >
            {submitting ? (
              <div className="w-5 h-5 rounded-full border-[2px] border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <CheckCircle2 size={18} />
                Submit Compliance
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Rejection Remarks */}
      {task.status === "REJECTED" && task.remarks && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-500/10 border border-red-500/20 rounded-[20px] p-5"
        >
          <h3 className="text-red-400 font-bold text-[15px] mb-2">Supervisor Remarks</h3>
          <p className="text-white/60 text-[13px]">{task.remarks}</p>
        </motion.div>
      )}
    </div>
  );
}