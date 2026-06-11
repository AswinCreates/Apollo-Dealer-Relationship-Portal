import { motion } from "framer-motion";
import { ShieldCheck, UserCog, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apolloLogo from "../../assets/apollo-tyres.png";

export default function RoleSelectionPage() {

const navigate = useNavigate();

const roles = [
{
title: "Contractor",
description:
"Submit compliance documents and track assignments",
icon: Briefcase,
route: "/login/contractor"
},
{
title: "Supervisor",
description:
"Review submissions and monitor compliance",
icon: ShieldCheck,
route: "/login/supervisor"
},
{
title: "Admin",
description:
"Manage users, tasks and reports",
icon: UserCog,
route: "/login/admin"
}
];

return (
<div className="min-h-screen min-h-[100dvh] bg-[#0f172a] flex items-center justify-center p-5 overflow-hidden relative">

  {/* Ambient background effects */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
    <div className="absolute -bottom-[20%] -left-[20%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.07)_0%,transparent_70%)]" />
  </div>

  <div className="w-full max-w-[400px] relative z-10">

    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-10"
    >

      <div className="w-20 h-20 mx-auto rounded-[22px] bg-white/[0.07] backdrop-blur-2xl border border-white/[0.1] flex items-center justify-center mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

        <img
          src={apolloLogo}
          alt="Apollo Tyres"
          className="w-28 object-contain"
        />

      </div>

      <h1 className="text-white text-[28px] font-extrabold tracking-[-0.5px]">
        Apollo Tyres
      </h1>

      <p className="text-white/45 mt-1.5 text-[14px] font-normal">
        Contractor Compliance Review System
      </p>

    </motion.div>

    <div className="flex flex-col gap-3">

      {roles.map((role, index) => {

        const Icon = role.icon;

        return (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15 + index * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(role.route)}
            className="
              cursor-pointer
              bg-white/[0.05]
              backdrop-blur-2xl
              border border-white/[0.08]
              rounded-[20px]
              p-[18px]
              shadow-[0_4px_24px_rgba(0,0,0,0.25)]
              transition-all duration-200
              hover:bg-white/[0.08]
              hover:border-white/[0.14]
              active:bg-white/[0.10]
            "
          >

            <div className="flex items-center gap-4">

              <div className="w-[52px] h-[52px] rounded-[16px] bg-white/[0.08] flex items-center justify-center flex-shrink-0">

                <Icon size={24} className="text-white/90" />

              </div>

              <div className="flex-1 min-w-0">

                <h3 className="text-white font-semibold text-[17px] leading-tight">
                  {role.title}
                </h3>

                <p className="text-white/40 text-[13px] mt-0.5 leading-snug">
                  {role.description}
                </p>

              </div>

              <svg className="w-5 h-5 text-white/25 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

            </div>

          </motion.div>
        );
      })}

    </div>

  </div>

</div>
);
}
