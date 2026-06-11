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

useEffect(() => {

    loadDashboard();

}, []);

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

if (loading) {

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <h1 className="text-white text-xl">
                Loading Dashboard...
            </h1>

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

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5">

        <div className="max-w-md mx-auto">

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
            >

                <h1 className="text-white text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-slate-300 mt-2">
                    Compliance Overview
                </p>

            </motion.div>

            <div className="grid grid-cols-2 gap-4">

                {stats.map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <motion.div
                            key={item.title}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.1
                            }}
                            className="
                                backdrop-blur-xl
                                bg-white/10
                                border
                                border-white/20
                                rounded-3xl
                                p-5
                                shadow-xl
                            "
                        >

                            <Icon
                                size={28}
                                className="text-white mb-3"
                            />

                            <h3 className="text-slate-300 text-sm">
                                {item.title}
                            </h3>

                            <p className="text-white text-3xl font-bold mt-2">
                                {item.value}
                            </p>

                        </motion.div>

                    );

                })}

            </div>

            <div
                className="
                    mt-6
                    backdrop-blur-xl
                    bg-white/10
                    border
                    border-white/20
                    rounded-3xl
                    p-5
                "
            >

                <h2 className="text-white font-semibold text-lg mb-4">
                    Compliance Progress
                </h2>

                <div className="w-full bg-white/10 rounded-full h-4">

                    <div
                        className="bg-orange-500 h-4 rounded-full"
                        style={{
                            width:
                                `${report?.compliancePercentage || 0}%`
                        }}
                    />

                </div>

                <p className="text-slate-300 mt-3">

                    {report?.compliancePercentage?.toFixed(1) || 0}%

                    {" "}Completed

                </p>

                <p className="text-slate-400 text-sm mt-2">

                    Total Tasks :
                    {" "}
                    {report?.totalTasks || 0}

                </p>

            </div>

            <button
                onClick={() =>
                    navigate("/contractor/tasks")
                }
                className="
                    w-full
                    mt-6
                    bg-orange-500
                    hover:bg-orange-600
                    transition
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    shadow-lg
                "
            >

                View Assigned Tasks

            </button>

        </div>

    </div>
);

}
