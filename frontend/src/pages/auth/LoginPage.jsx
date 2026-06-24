import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ShieldCheck, UserCog, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apolloLogo from "../../assets/apollo-tyres.png";
import "../../App.css";

const roles = [
  { key: "contractor", label: "Contractor", icon: Briefcase, identifierLabel: "Contractor ID", identifierPlaceholder: "Enter your contractor ID", identifierKey: "vendorCode" },
  { key: "supervisor", label: "Supervisor", icon: ShieldCheck, identifierLabel: "Email", identifierPlaceholder: "Enter your email", identifierKey: "email" },
  { key: "admin", label: "Admin", icon: UserCog, identifierLabel: "Email", identifierPlaceholder: "Enter your admin email", identifierKey: "email" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("contractor");
  const [identifierValue, setIdentifierValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentRole = roles.find((r) => r.key === selectedRole);

  const handleRoleChange = (key) => {
    setSelectedRole(key);
    setIdentifierValue("");
    setError("");
  };

  const handleLogin = async () => {
    if (!identifierValue || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 600));

      const roleKey = selectedRole.toUpperCase();

      localStorage.setItem("token", "demo-token");
      localStorage.setItem("role", roleKey);

      if (selectedRole === "contractor") {
        localStorage.setItem("vendorCode", identifierValue);
      } else {
        localStorage.setItem("email", identifierValue);
      }

      if (roleKey === "CONTRACTOR") {
        const isFirstLogin = !localStorage.getItem("firstLoginDone");
        navigate(isFirstLogin ? "/contractor/first-login" : "/contractor/dashboard");
      } else if (roleKey === "SUPERVISOR") {
        navigate("/supervisor/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="auth-card"
      >
        <div className="auth-header">
          <div className="auth-logo">
            <img src={apolloLogo} alt="Apollo Tyres" />
          </div>
          <h1>Apollo Tyres</h1>
          <p>Contractor Compliance Review System</p>
        </div>

        <div className="role-selector">
          <div className="role-selector-label">Select Your Role</div>
          <div className="role-tabs">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.key}
                  className={`role-tab ${selectedRole === role.key ? "active" : ""}`}
                  onClick={() => handleRoleChange(role.key)}
                >
                  <Icon size={15} />
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">{currentRole.identifierLabel}</label>
            <input
              type="text"
              className="form-input"
              value={identifierValue}
              onChange={(e) => setIdentifierValue(e.target.value)}
              placeholder={currentRole.identifierPlaceholder}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-icon">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && (
            <div className="error-alert" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}