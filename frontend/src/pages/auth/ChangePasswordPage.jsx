import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import apolloLogo from "../../assets/apollo-tyres.png";
import "../../App.css";

export default function ChangePasswordPage() {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = () => {

    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Password changed successfully");
      setLoading(false);
      navigate("/");
    }, 800);
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
          <h1>Change Password</h1>
          <p>Create a new secure password</p>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="form-input-icon">
              <input
                type={showNew ? "text" : "password"}
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button type="button" onClick={() => setShowNew(!showNew)}>
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="form-input-icon">
              <input
                type={showConfirm ? "text" : "password"}
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleChange}
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}