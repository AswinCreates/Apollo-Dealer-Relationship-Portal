import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {

const navigate = useNavigate();

const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const handleChange = () => {

    if (!newPassword || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    alert("Password changed successfully");
    navigate("/");
};

return (

<div className="min-h-screen min-h-[100dvh] bg-[#0f172a] flex items-center justify-center p-5 relative overflow-hidden">

    {/* Ambient background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
        <div className="absolute -bottom-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.07)_0%,transparent_70%)]" />
    </div>

    <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[400px] relative z-10"
    >

        <div className="mb-8">

            <h1 className="text-white text-[28px] font-extrabold tracking-[-0.5px] leading-tight">
                Change Password
            </h1>

            <p className="text-white/40 mt-1.5 text-[14px]">
                Create a new secure password
            </p>

        </div>

        <div className="
            bg-white/[0.05]
            backdrop-blur-2xl
            border
            border-white/[0.08]
            rounded-[22px]
            p-6
            shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        ">

            <div className="mb-4">

                <label className="block text-white/50 text-[12px] font-semibold uppercase tracking-[0.08em] mb-2 ml-1">
                    New Password
                </label>

                <div className="relative">

                    <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="
                            w-full
                            p-4
                            pr-12
                            rounded-[14px]
                            bg-white/[0.07]
                            border
                            border-white/[0.1]
                            text-white
                            text-[16px]
                            placeholder-white/30
                            transition-all
                            duration-200
                            focus:bg-white/[0.10]
                            focus:border-[rgba(249,115,22,0.5)]
                            focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]
                        "
                    />

                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-white/35
                            p-1
                            transition-colors
                            duration-200
                            hover:text-white/60
                        "
                    >
                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>

            </div>

            <div className="mb-1">

                <label className="block text-white/50 text-[12px] font-semibold uppercase tracking-[0.08em] mb-2 ml-1">
                    Confirm Password
                </label>

                <div className="relative">

                    <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="
                            w-full
                            p-4
                            pr-12
                            rounded-[14px]
                            bg-white/[0.07]
                            border
                            border-white/[0.1]
                            text-white
                            text-[16px]
                            placeholder-white/30
                            transition-all
                            duration-200
                            focus:bg-white/[0.10]
                            focus:border-[rgba(249,115,22,0.5)]
                            focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]
                        "
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-white/35
                            p-1
                            transition-colors
                            duration-200
                            hover:text-white/60
                        "
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                </div>

            </div>

            <button
                onClick={handleChange}
                className="
                    w-full
                    mt-6
                    py-[15px]
                    rounded-[14px]
                    font-bold
                    text-[16px]
                    text-white
                    tracking-[0.02em]
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
                <span className="relative z-10">Change Password</span>
            </button>

        </div>

    </motion.div>

</div>

);

}