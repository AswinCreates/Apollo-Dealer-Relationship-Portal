import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_atlcr";
const TEMPLATE_ID = "template_vv5w5xl";
const PUBLIC_KEY = "O2ltgmUa3G58SsS5N";

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let pwd = "";
  for (let i = 0; i < 10; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return pwd;
}

export default function AddContractor() {
  const [vendorId, setVendorId] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!vendorId || !email) {
      setError("Please enter both Vendor ID and Email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const password = generatePassword();

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          vendor_id: vendorId,
          password: password,
          reply_to: email,
          from_name: "Apollo Tyres Admin",
        },
        PUBLIC_KEY
      );

      setSent(true);
      setVendorId("");
      setEmail("");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("EmailJS full error:", err);
      setError("Failed to send. Check browser console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Add Contractor</h2>
        <p className="text-white/70 text-[13px] mt-1">Send login credentials to contractor email</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[18px] border border-gray-200 shadow-sm p-5">
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-gray-500 text-[11px] font-semibold mb-1.5 uppercase tracking-wide">Vendor ID</label>
            <input
              type="text"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              placeholder="Enter vendor ID"
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-gray-900 text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-[#7c3aed]"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-[11px] font-semibold mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter contractor email"
                className="w-full bg-white border border-gray-200 rounded-[12px] pl-9 pr-4 py-2.5 text-gray-900 text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-[#7c3aed]"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-[13px] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !vendorId || !email}
            className="w-full py-3 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white font-semibold rounded-[12px] flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
            {loading ? "Sending..." : sent ? "Credentials Sent!" : "Send Login Credentials"}
          </button>

          {sent && (
            <p className="text-green-600 text-[13px] text-center">
              A random password has been sent to {email}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}