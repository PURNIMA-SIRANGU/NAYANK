"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const roles = [
  {
    title: "Citizen",
    desc: "Submit incidents and evidence.",
  },
  {
    title: "Officer",
    desc: "Manage investigations and reports.",
  },
  {
    title: "Supervisor",
    desc: "Monitor and review investigations.",
  },
  {
    title: "Administrator",
    desc: "Manage platform operations.",
  },
];

export default function RolesSection() {
  const router = useRouter();

  return (
    <section
      id="roles"
      style={{
        padding: "140px 8%",
        background: "#091423",
      }}
    >
      <motion.h1
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
        }}
      >
        Investigation Roles
      </motion.h1>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: "80px",
          maxWidth: "700px",
          fontSize: "1.1rem",
        }}
      >
        Every stakeholder in the
        investigation ecosystem
        receives tools and
        intelligence tailored to
        their responsibilities.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "30px",
        }}
      >
        {roles.map(
          (role, index) => (
            <motion.div
              key={role.title}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                delay:
                  index * 0.1,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              onClick={() =>
                router.push(
                  "/login"
                )
              }
              style={{
                background:
                  "linear-gradient(145deg,#091423,#10203A)",

                border:
                  "1px solid rgba(37,99,235,.35)",

                borderRadius:
                  "24px",

                padding: "35px",

                cursor:
                  "pointer",

                transition:
                  "all .3s ease",

                boxShadow:
                  "0 10px 40px rgba(0,0,0,.25)",
              }}
            >
              <div
                style={{
                  color:
                    "#60A5FA",

                  fontSize:
                    "2rem",

                  marginBottom:
                    "20px",
                }}
              >
                ❯❯
              </div>

              <h3
                style={{
                  fontSize:
                    "1.5rem",

                  marginBottom:
                    "15px",
                }}
              >
                {role.title}
              </h3>

              <p
                style={{
                  color:
                    "#94A3B8",

                  lineHeight:
                    1.8,
                }}
              >
                {role.desc}
              </p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}