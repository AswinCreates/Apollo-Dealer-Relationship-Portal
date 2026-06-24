import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("contractorProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const vendorCode = localStorage.getItem("vendorCode") || "";
  const email = localStorage.getItem("email") || "";

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] p-5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]">
        <h2 className="text-white text-[22px] font-extrabold">Profile</h2>
        <p className="text-white/70 text-[13px] mt-1">Your account & registration details</p>
      </div>

      <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] p-5">
        <div className="space-y-4">
          <div>
            <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Vendor ID</p>
            <p className="text-white font-bold text-[15px]">{vendorCode || "—"}</p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Email</p>
            <p className="text-white font-bold text-[15px]">{email || "—"}</p>
          </div>

          {profile && (
            <>
              <hr className="border-white/[0.08]" />
              {profile.clientName && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Client Name</p>
                  <p className="text-white font-medium text-[14px]">{profile.clientName}</p>
                </div>
              )}
              {profile.contractorName && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Contractor Name</p>
                  <p className="text-white font-medium text-[14px]">{profile.contractorName}</p>
                </div>
              )}
              {profile.ownerName && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Owner / Proprietor</p>
                  <p className="text-white font-medium text-[14px]">{profile.ownerName}</p>
                </div>
              )}
              {profile.address && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Address</p>
                  <p className="text-white font-medium text-[14px]">{profile.address}</p>
                </div>
              )}
              {profile.natureOfJob && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Nature of Job</p>
                  <p className="text-white font-medium text-[14px]">{profile.natureOfJob}</p>
                </div>
              )}
              {profile.dateOfEngagement && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Date of Engagement</p>
                  <p className="text-white font-medium text-[14px]">{profile.dateOfEngagement}</p>
                </div>
              )}
              {profile.agreementPeriod && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Agreement Period</p>
                  <p className="text-white font-medium text-[14px]">{profile.agreementPeriod}</p>
                </div>
              )}
              {profile.licenseNumber && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">License Number</p>
                  <p className="text-white font-medium text-[14px]">{profile.licenseNumber}</p>
                </div>
              )}
              {profile.licenseStrength && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">License Strength</p>
                  <p className="text-white font-medium text-[14px]">{profile.licenseStrength}</p>
                </div>
              )}
              {profile.headCount && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Head Count</p>
                  <p className="text-white font-medium text-[14px]">{profile.headCount}</p>
                </div>
              )}
              {profile.licenseValidity && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">License Validity</p>
                  <p className="text-white font-medium text-[14px]">{profile.licenseValidity}</p>
                </div>
              )}
              {profile.registrationCertificateStrength && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Registration Certificate Strength</p>
                  <p className="text-white font-medium text-[14px]">{profile.registrationCertificateStrength}</p>
                </div>
              )}
              {profile.contractValidity && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">Contract Validity</p>
                  <p className="text-white font-medium text-[14px]">{profile.contractValidity}</p>
                </div>
              )}
              {profile.epfCode && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">EPF Code & Remittance Location</p>
                  <p className="text-white font-medium text-[14px]">{profile.epfCode}</p>
                </div>
              )}
              {profile.esiCode && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">ESI Code & Remittance Location</p>
                  <p className="text-white font-medium text-[14px]">{profile.esiCode}</p>
                </div>
              )}
              {profile.lwfCode && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">LWF Code & Remittance Location</p>
                  <p className="text-white font-medium text-[14px]">{profile.lwfCode}</p>
                </div>
              )}
              {profile.ptCodeEstablishment && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">PT Code (Establishment)</p>
                  <p className="text-white font-medium text-[14px]">{profile.ptCodeEstablishment}</p>
                </div>
              )}
              {profile.ptCodeEmployer && (
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mb-1">PT Code (Employer)</p>
                  <p className="text-white font-medium text-[14px]">{profile.ptCodeEmployer}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}