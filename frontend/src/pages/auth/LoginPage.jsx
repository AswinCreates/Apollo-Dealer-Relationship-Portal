import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";

export default function LoginPage() {

const { role } = useParams();
const navigate = useNavigate();

const [vendorCode, setVendorCode] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleLogin = async () => {

    try {

        setLoading(true);
        setError("");

        const response = await loginUser({
            vendorCode,
            password
        });

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "role",
            response.data.role
        );

        localStorage.setItem(
            "vendorCode",
            vendorCode
        );

        if (response.data.firstLogin) {

            navigate("/change-password");
            return;
        }

        if (response.data.role === "CONTRACTOR") {

            navigate("/contractor/dashboard");

        } else if (
            response.data.role === "SUPERVISOR"
        ) {

            navigate("/supervisor/dashboard");

        } else {

            navigate("/admin/dashboard");
        }

    } catch (err) {

        setError(
            err.response?.data ||
            err.message ||
            "Login Failed"
        );

    } finally {

        setLoading(false);
    }
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
        className="
            w-full
            max-w-[400px]
            relative z-10
        "
    >

        {/* Back button */}
        <button
            onClick={() => navigate("/")}
            className="
                text-white/50
                flex
                items-center
                gap-1.5
                mb-7
                text-[15px]
                font-medium
                transition-colors
                duration-200
                hover:text-white/80
                active:text-white
            "
        >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Back
        </button>

        {/* Header */}
        <div className="mb-8">

            <h1 className="text-white text-[28px] font-extrabold tracking-[-0.5px] leading-tight">

                {role?.charAt(0).toUpperCase() +
                    role?.slice(1)}

                {" "}Login

            </h1>

            <p className="text-white/40 mt-1.5 text-[14px]">
                Sign in to continue
            </p>

        </div>

        {/* Form card */}
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
                    Vendor Code
                </label>

                <input
                    type="text"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                    placeholder="Enter your vendor code"
                    className="
                        w-full
                        p-4
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

            </div>

            <div className="mb-1">

                <label className="block text-white/50 text-[12px] font-semibold uppercase tracking-[0.08em] mb-2 ml-1">
                    Password
                </label>

                <div className="relative">

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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
                        onClick={() => setShowPassword(!showPassword)}
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

                        {
                            showPassword
                                ? <EyeOff size={20} />
                                : <Eye size={20} />
                        }

                    </button>

                </div>

            </div>

            {
                error &&
                <div className="
                    text-[#f87171]
                    text-[13px]
                    font-medium
                    mt-3
                    p-3
                    bg-[rgba(239,68,68,0.08)]
                    rounded-[10px]
                    border
                    border-[rgba(239,68,68,0.15)]
                ">

                    {error}

                </div>
            }

            <button
                onClick={handleLogin}
                disabled={loading}
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
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    active:scale-[0.97]
                    active:shadow-[0_2px_8px_rgba(249,115,22,0.25)]
                    bg-gradient-to-br from-[#f97316] to-[#ea580c]
                "
            >
                <span className="relative z-10">
                    {
                        loading
                            ? "Signing In..."
                            : "Sign In"
                    }
                </span>
            </button>

        </div>

    </motion.div>

</div>
);
}
