import { motion } from "framer-motion";

export default function PageContainer({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1a3a] to-[#0e2a5c] pb-20 ${className}`}
    >
      <div className="max-w-[480px] mx-auto px-5 pt-4">
        {children}
      </div>
    </motion.div>
  );
}