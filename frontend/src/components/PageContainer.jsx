import { motion } from "framer-motion";
import "../../src/App.css";

export default function PageContainer({ children, className = "" }) {
  return (
    <div className="page-card-layout-dark">
      <div className="page-card">
        <div className="page-card-body">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={className}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}