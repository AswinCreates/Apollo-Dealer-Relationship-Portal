import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
FileText,
Calendar,
ChevronRight
} from "lucide-react";

import { getAssignedTasks }
from "../../api/taskApi";

export default function TasksPage() {

const navigate = useNavigate();

const [tasks, setTasks] =
    useState([]);

const [loading, setLoading] =
    useState(true);

useEffect(() => {

    loadTasks();

}, []);

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

if (loading) {

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">

            <h1 className="text-white text-xl">

                Loading Tasks...

            </h1>

        </div>
    );
}

return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5">

        <div className="max-w-md mx-auto">

            <div className="mb-8">

                <h1 className="text-white text-3xl font-bold">

                    My Tasks

                </h1>

                <p className="text-slate-300 mt-2">

                    Assigned Compliance Activities

                </p>

            </div>

            <div className="space-y-4">

                {tasks.length === 0 ? (

                    <div
                        className="
                        bg-white/10
                        backdrop-blur-xl
                        border
                        border-white/20
                        rounded-3xl
                        p-6
                        text-center
                    "
                    >

                        <p className="text-slate-300">

                            No Tasks Assigned

                        </p>

                    </div>

                ) : (

                    tasks.map(
                        (task, index) => (

                            <motion.div
                                key={task.id}
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay:
                                        index * 0.08
                                }}
                                onClick={() =>
                                    navigate(
                                        `/contractor/task/${task.id}`
                                    )
                                }
                                className="
                                cursor-pointer
                                bg-white/10
                                backdrop-blur-xl
                                border
                                border-white/20
                                rounded-3xl
                                p-5
                                shadow-xl
                                hover:bg-white/15
                                transition
                            "
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <div className="flex items-center gap-2 mb-3">

                                            <FileText
                                                size={20}
                                                className="text-orange-400"
                                            />

                                            <h3
                                                className="
                                                text-white
                                                font-semibold
                                            "
                                            >

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
                                            gap-2
                                            text-slate-300
                                            text-sm
                                        "
                                        >

                                            <Calendar
                                                size={16}
                                            />

                                            Due:
                                            {" "}
                                            {
                                                task.dueDate
                                            }

                                        </div>

                                        <div className="mt-4">

                                            <span
                                                className="
                                                bg-orange-500
                                                text-white
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                            "
                                            >

                                                {
                                                    task.status
                                                }

                                            </span>

                                        </div>

                                    </div>

                                    <ChevronRight
                                        className="
                                        text-white
                                        mt-1
                                    "
                                    />

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
