import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TaskDetailsPage() {
  const { taskId } = useParams();

  return (
    <div className="space-y-5">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-[#a78bfa] text-[13px] font-semibold hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </motion.button>

      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[20px] sm:text-[24px] font-extrabold leading-tight">Task #{taskId || "Details"}</h2>
        <p className="text-white/60 text-[13px] mt-1">View task information</p>
      </div>

      <div className="text-center py-16">
        <p className="text-white/40 text-[13px]">No task details available</p>
      </div>
    </div>
  );
}