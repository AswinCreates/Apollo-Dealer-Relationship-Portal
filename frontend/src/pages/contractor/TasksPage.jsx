import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Calendar, ChevronRight } from "lucide-react";
import { getAssignedTasks } from "../../api/taskApi";
import apolloLogo from "../../assets/apollo-tyres.png";
import "../../App.css";

export default function TasksPage() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const contractorId = 1;
      const response = await getAssignedTasks(contractorId);
      setTasks(response.data);
    } catch (error) {
      console.error("Task Loading Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => { loadTasks(); }, 0);
    return () => clearTimeout(id);
  }, []);

  if (loading) {
    return (
      <div className="auth-layout">
        <div className="loading-content">
          <div className="loading-spinner" />
          <p className="loading-text">Loading Tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <nav className="top-nav">
        <div className="top-nav-brand">
          <img src={apolloLogo} alt="Apollo" />
          <span>Apollo Tyres</span>
        </div>
        <div className="top-nav-actions">
          <div className="top-nav-user">
            <div className="avatar">C</div>
            <span>Contractor</span>
          </div>
          <button className="btn-logout" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>
      <div className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="page-header"
        >
          <h1>My Tasks</h1>
          <p className="subtitle">Assigned Compliance Activities</p>
        </motion.div>

        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-state"
          >
            <div className="empty-state-icon">
              <FileText size={24} />
            </div>
            <h3>No Tasks Assigned</h3>
            <p>Check back later for new assignments</p>
          </motion.div>
        ) : (
          <div className="task-list">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + index * 0.05, duration: 0.35 }}
                className="task-item"
                onClick={() => navigate(`/contractor/task/${task.id}`)}
              >
                <div className="task-item-icon">
                  <FileText size={20} />
                </div>
                <div className="task-item-content">
                  <h3>{task.complianceTask?.taskName}</h3>
                  <div className="task-meta">
                    <Calendar size={14} />
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
                <div className="task-item-meta">
                  <span className="badge badge-orange">{task.status}</span>
                  <ChevronRight className="task-chevron" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}