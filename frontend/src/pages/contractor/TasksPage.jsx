import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
FileText,
Calendar
} from "lucide-react";

import { getAssignedTasks }
from "../../api/taskApi";

export default function TasksPage() {

const navigate = useNavigate();

const [tasks, setTasks] =
    useState([]);

const [loading, setLoading] =
    useState(true);

const loadTasks = async () => {

    try {

        // Temporary contractor id

        const contractorId = 1;

        const response =
            await getAssignedTasks(
                contractorId
            );

        setTasks(response.data);

    } catch (error) {

        console.error(
            "Task Loading Error",
            error
        );

    } finally {

        setLoading(false);
    }
};

useEffect(() => {

    const id = setTimeout(() => {
        loadTasks();
    }, 0);

    return () => clearTimeout(id);

}, []);

if (loading) {

    return (

        <div className="min-h-screen min-h-[100dvh] bg-[#0f172a] flex items-center justify-center">

            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-white/10 border-t-[#f97316] animate-spin" />
                <p className="text-white/40 text-[14px] font-medium">Loading Tasks...</p>
            </div>

        </div>
    );
}

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

                    My Tasks

                </h1>

                <p className="text-white/40 mt-1 text-[14px]">

                    Assigned Compliance Activities

                </p>

            </motion.div>

            <div className="flex flex-col gap-3">

                {tasks.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="
                            bg-white/[0.05]
                            backdrop-blur-2xl
                            border
                            border-white/[0.08]
                            rounded-[20px]
                            p-8
                            text-center
                        "
                    >

                        <div className="w-14 h-14 rounded-[16px] bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
                            <FileText size={24} className="text-white/25" />
                        </div>

                        <p className="text-white/40 text-[15px] font-medium">

                            No Tasks Assigned

                        </p>

                        <p className="text-white/25 text-[13px] mt-1">

                            Check back later for new assignments

                        </p>

                    </motion.div>

                ) : (

                    tasks.map(
                        (task, index) => (

                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 0.1 + index * 0.06,
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    navigate(
                                        `/contractor/task/${task.id}`
                                    )
                                }
                                className="
                                    cursor-pointer
                                    bg-white/[0.05]
                                    backdrop-blur-2xl
                                    border
                                    border-white/[0.08]
                                    rounded-[20px]
                                    p-[18px]
                                    shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                                    transition-all
                                    duration-200
                                    hover:bg-white/[0.08]
                                    hover:border-white/[0.14]
                                    active:bg-white/[0.10]
                                "
                            >

                                <div className="flex justify-between items-start">

                                    <div className="flex-1 min-w-0 pr-3">

                                        <div className="flex items-center gap-2.5 mb-2.5">

                                            <div className="w-9 h-9 rounded-[10px] bg-[rgba(249,115,22,0.12)] flex items-center justify-center flex-shrink-0">
                                                <FileText
                                                    size={18}
                                                    className="text-[#fb923c]"
                                                />
                                            </div>

                                            <h3 className="text-white font-semibold text-[16px] leading-tight truncate">

                                                {
                                                    task
                                                        .complianceTask
                                                        ?.taskName
                                                }

                                            </h3>

                                        </div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1.5
                                                text-white/40
                                                text-[13px]
                                                ml-[46px]
                                            "
                                        >

                                            <Calendar size={14} />

                                            <span>Due: {task.dueDate}</span>

                                        </div>

                                    </div>

                                    <div className="flex flex-col items-end gap-2 flex-shrink-0">

                                        <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>

                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                px-2.5
                                                py-1
                                                rounded-[8px]
                                                text-[11px]
                                                font-semibold
                                                bg-[rgba(249,115,22,0.12)]
                                                text-[#fb923c]
                                                border
                                                border-[rgba(249,115,22,0.2)]
                                            "
                                        >

                                            {task.status}

                                        </span>

                                    </div>

                                </div>

                            </motion.div>

                        )
                    )

                )}

            </div>

        </div>

    </div>
);

}