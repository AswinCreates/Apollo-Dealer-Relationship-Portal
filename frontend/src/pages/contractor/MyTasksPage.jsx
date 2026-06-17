import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { getContractorTasks } from "../../api/taskApi";
import TaskCard from "../../components/TaskCard";

const filters = ["ALL", "PENDING", "SUBMITTED", "APPROVED", "REJECTED"];

export default function MyTasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContractorTasks();
        setTasks(res.data);
        setFiltered(res.data);
      } catch (e) {
        console.error("Tasks load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let result = tasks;
    if (activeFilter !== "ALL") {
      result = result.filter((t) => t.status === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => (t.complianceTask?.taskName || t.taskName || "").toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [activeFilter, search, tasks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-10 rounded-[14px] bg-white/[0.06] border border-white/[0.08] text-white text-[14px] placeholder-white/30 outline-none focus:border-[#f97316]/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            <X size={16} />
          </button>
        )}
      </motion.div>

      {/* Filter Chips */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-[12px] text-[12px] font-semibold transition-all ${
              activeFilter === f
                ? "bg-[#f97316] text-white"
                : "bg-white/[0.06] text-white/50 border border-white/[0.08] hover:bg-white/[0.08]"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-white/30 text-[14px] font-medium">No tasks found</p>
          </motion.div>
        ) : (
          filtered.map((task, i) => (
            <TaskCard key={task.id} task={task} delay={i * 0.04} onClick={() => navigate(`/contractor/tasks/${task.id}`)} />
          ))
        )}
      </div>
    </div>
  );
}