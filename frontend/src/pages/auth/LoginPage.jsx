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

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 flex items-center justify-center p-6">

        <motion.div
            initial={{
                opacity: 0,
                y: 25
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            className="
            w-full
            max-w-md
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
        "
        >

            <button
                onClick={() => navigate("/")}
                className="
                text-white
                flex
                items-center
                gap-2
                mb-6
            "
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <h1 className="text-white text-3xl font-bold">

                {role?.charAt(0).toUpperCase() +
                    role?.slice(1)}

                {" "}Login

            </h1>

            <p className="text-slate-300 mt-2 mb-8">
                Sign in to continue
            </p>

            <input
                type="text"
                value={vendorCode}
                onChange={(e) =>
                    setVendorCode(
                        e.target.value
                    )
                }
                placeholder="Vendor Code"
                className="
                w-full
                p-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-slate-300
                mb-4
                outline-none
            "
            />

            <div className="relative">

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    placeholder="Password"
                    className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder-slate-300
                    outline-none
                "
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }
                    className="
                    absolute
                    right-4
                    top-4
                    text-white
                "
                >

                    {
                        showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />
                    }

                </button>

            </div>

            {
                error &&

                <p className="text-red-400 text-sm mt-4">

                    {error}

                </p>
            }

            <button
                onClick={handleLogin}
                disabled={loading}
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
            "
            >

                {
                    loading
                        ? "Signing In..."
                        : "Sign In"
                }

            </button>

        </motion.div>

    </div>
);


}
