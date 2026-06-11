import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
FileCheck,
Clock3,
AlertTriangle,
Ban
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getContractorReport } from "../../api/reportApi";

export default function DashboardPage() {

const navigate = useNavigate();

const [report, setReport] = useState(null);
const [loading, setLoading] = useState(true);

const loadDashboard = async () => {

    try {

        // Temporary contractor id
        // Replace later from logged-in user

        const contractorId = 1;

        const response =
            await getContractorReport(
                contractorId
            );

        setReport(response.data);

    } catch (error) {

        console.error(
            "Dashboard Load Error:",
            error
        );

    } finally {

        setLoading(false);
    }
};

useEffect(() => {

    // defer dashboard load to avoid calling setState synchronously within the effect
    const id = setTimeout(() => {
        loadDashboard();
    }, 0);

    return () => clearTimeout(id);

}, []);

if (loading) {

    return (

        <div className="min-h-screen min-h-[100dvh] bg-[#0f172a] flex items-center justify-center">

            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
                <p className="text-white/40 text-[14px] font-medium">Loading Dashboard...</p>
            </div>

        </div>
    );
}

const stats = [
    {
        title: "Complied",
        value: report?.complied || 0,
        icon: FileCheck
    },
    {
        title: "Delayed",
        value: report?.delayed || 0,
        icon: AlertTriangle
    },
    {
        title: "Not Complied",
        value: report?.notComplied || 0,
        icon: Clock3
    },
    {
        title: "Not Applicable",
        value: report?.notApplicable || 0,
        icon: Ban
    }
];

return (

<div className="min-h-screen min-h-[100dvh] bg-[#0f172a] relative overflow-hidden ambient-glow">
      
      <div className="max-w-[400px] mx-auto px-5 pt-5 pb-28">

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7"
            >

                <h1 className="text-white text-[28px] font-extrabold tracking-[-0.5px]">
                    Dashboard
                </h1>

                <p className="text-white/40 mt-1 text-[14px]">
                    Compliance Overview
                </p>

            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">

                {stats.map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.1 + index * 0.08,
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="
                                bg-white/[0.05]
                                backdrop-blur-2xl
                                border
                                border-white/[0.08]
                                rounded-[18px]
                                p-[18px]
                                shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                            "
                        >

                            <div className="w-10 h-10 rounded-[12px] bg-white/[0.08] flex items-center justify-center mb-3">
                                <Icon size={20} className="text-[#fb923c]" />
                            </div>

                            <h3 className="text-white/45 text-[12px] font-semibold uppercase tracking-[0.06em]">
                                {item.title}
                            </h3>

                            <p className="text-white text-[28px] font-extrabold mt-1 tracking-[-0.5px]">
                                {item.value}
                            </p>

                        </motion.div>

                    );

                })}

            </div>

            {/* Progress Section */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="
                    mt-4
                    bg-white/[0.05]
                    backdrop-blur-2xl
                    border
                    border-white/[0.08]
                    rounded-[20px]
                    p-[20px]
                    shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                "
            >

                <h2 className="text-white font-bold text-[17px] mb-5">
                    Compliance Progress
                </h2>

                <div className="progress-track">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${report?.compliancePercentage || 0}%`
                        }}
                    />

                </div>

                <div className="flex items-center justify-between mt-3">

                    <p className="text-white/60 text-[14px] font-medium">

                        {report?.compliancePercentage?.toFixed(1) || 0}%

                        {" "}Completed

                    </p>

                    <p className="text-white/35 text-[13px]">

                        Total: {report?.totalTasks || 0}

                    </p>

                </div>

            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <button
                    onClick={() => navigate("/contractor/tasks")}
                    className="
                        w-full
                        mt-5
                        py-[16px]
                        rounded-[16px]
                        font-bold
                        text-[16px]
                        text-white
                        transition-all
                        duration-200
                        shadow-[0_4px_16px_rgba(249,115,22,0.35)]
                        relative
                        overflow-hidden
                        active:scale-[0.97]
                        active:shadow-[0_2px_8px_rgba(249,115,22,0.25)]
                        bg-gradient-to-br from-[#f97316] to-[#ea580c]
                    "
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        View Assigned Tasks
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>
            </motion.div>

        </div>

    </div>
);

}
