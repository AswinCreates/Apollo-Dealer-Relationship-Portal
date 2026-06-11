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

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 flex items-center justify-center p-6 overflow-hidden">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)]" />

  <div className="w-full max-w-md relative z-10">

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >

      <div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-5">

        <img
    src={apolloLogo}
    alt="Apollo Tyres"
    className="w-32 object-contain"
  />

      </div>

      <h1 className="text-white text-3xl font-bold">
        Apollo Tyres
      </h1>

      <p className="text-slate-300 mt-2">
        Contractor Compliance Review System
      </p>

    </motion.div>

    <div className="space-y-4">

      {roles.map((role, index) => {

        const Icon = role.icon;

        return (
          <motion.div
            key={role.title}
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.15
            }}
            whileHover={{
              scale: 1.03
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => navigate(role.route)}
            className="
              cursor-pointer
              backdrop-blur-xl
              bg-white/10
              border border-white/20
              rounded-3xl
              p-5
              shadow-xl
            "
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">

                <Icon
                  size={26}
                  className="text-white"
                />

              </div>

              <div>

                <h3 className="text-white font-semibold text-lg">
                  {role.title}
                </h3>

                <p className="text-slate-300 text-sm">
                  {role.description}
                </p>

              </div>

            </div>

          </motion.div>
        );
      })}

    </div>

  </div>

</div>


);
}
