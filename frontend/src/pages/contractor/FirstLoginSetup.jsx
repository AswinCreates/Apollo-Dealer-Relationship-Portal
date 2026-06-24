import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, User, UserCog, MapPin, Save, Briefcase, Calendar, FileText, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FirstLoginSetup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clientName: "",
    contractorName: "",
    ownerName: "",
    address: "",
    natureOfJob: "",
    dateOfEngagement: "",
    agreementPeriod: "",
    licenseNumber: "",
    licenseStrength: "",
    headCount: "",
    licenseValidity: "",
    registrationCertificateStrength: "",
    contractValidity: "",
    epfCode: "",
    esiCode: "",
    lwfCode: "",
    ptCodeEstablishment: "",
    ptCodeEmployer: "",
  });
  const [files, setFiles] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const alreadyDone = localStorage.getItem("firstLoginDone");
    if (alreadyDone) navigate("/contractor/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFiles({ ...files, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("firstLoginDone", "true");
    localStorage.setItem("contractorProfile", JSON.stringify({ ...form, files: Object.keys(files) }));
    setSaved(true);
    setTimeout(() => navigate("/contractor/dashboard"), 1200);
  };

  const fields = [
    { name: "clientName", label: "Client Name", icon: Building2, placeholder: "Enter client name" },
    { name: "contractorName", label: "Name of the Contractor", icon: User, placeholder: "Enter contractor name" },
    { name: "ownerName", label: "Name of the Owner / Proprietor", icon: UserCog, placeholder: "Enter owner/proprietor name" },
    { name: "address", label: "Address", icon: MapPin, placeholder: "Enter full address", textarea: true },
    { name: "natureOfJob", label: "Nature of Job", icon: Briefcase, placeholder: "Enter nature of job" },
    { name: "dateOfEngagement", label: "Date of Engagement", icon: Calendar, placeholder: "DD/MM/YYYY", type: "date" },
    { name: "agreementPeriod", label: "Agreement Period", icon: Calendar, placeholder: "e.g., 1 Year" },
    { name: "licenseNumber", label: "License Number", icon: FileText, placeholder: "Enter license number", upload: true },
    { name: "licenseStrength", label: "License Strength", icon: Shield, placeholder: "Enter license strength" },
    { name: "headCount", label: "Head Count", icon: Users, placeholder: "Enter head count", type: "number" },
    { name: "licenseValidity", label: "License Validity", icon: Calendar, placeholder: "DD/MM/YYYY", type: "date" },
    { name: "registrationCertificateStrength", label: "Registration Certificate Strength (Contractor)", icon: Shield, placeholder: "Enter strength" },
    { name: "contractValidity", label: "Validity of Contract As Per Registration Certificate", icon: Calendar, placeholder: "DD/MM/YYYY", type: "date" },
    { name: "epfCode", label: "EPF Code Number & Remittance Location", icon: FileText, placeholder: "Enter EPF code & location", upload: true },
    { name: "esiCode", label: "ESI Code Number & Remittance Location", icon: FileText, placeholder: "Enter ESI code & location", upload: true },
    { name: "lwfCode", label: "LWF Code Number & Remittance Location", icon: FileText, placeholder: "Enter LWF code & location", upload: true },
    { name: "ptCodeEstablishment", label: "PT Code Number & Remittance Location (Establishment)", icon: FileText, placeholder: "Enter PT code (establishment)" },
    { name: "ptCodeEmployer", label: "PT Code Number & Remittance Location (Employer)", icon: FileText, placeholder: "Enter PT code (employer)" },
  ];

  return (
    <div className="auth-layout">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="auth-card"
      >
        <div className="auth-header">
          <h1>Complete Your Profile</h1>
          <p>Please provide your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="form-label">
                  <field.icon size={14} className="inline mr-1.5" />
                  {field.label}
                </label>
                {field.upload ? (
                  <div>
                    <input
                      type="file"
                      name={field.name}
                      onChange={handleFileChange}
                      className="form-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {files[field.name] && (
                      <p className="text-[11px] text-green-600 mt-1">Selected: {files[field.name].name}</p>
                    )}
                  </div>
                ) : field.textarea ? (
                  <textarea
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={3}
                    className="form-input resize-none"
                    required
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="form-input"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary" disabled={saved}>
            <Save size={16} />
            {saved ? "Profile Saved!" : "Save & Continue"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}