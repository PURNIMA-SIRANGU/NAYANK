"use client";

import { motion } from "framer-motion";

export default function About() {
  const cards = [
    {
      title: "NETHR👁I",
      desc: "Visual Intelligence Engine",
    },
    {
      title: "SAlIlKET",
      desc: "Audio Intelligence Engine",
    },
    {
      title: "Timeline AI",
      desc: "Case Reconstruction",
    },
    {
      title: "Risk Engine",
      desc: "Threat Assessment",
    },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        padding: "140px 8%",
        background: "#040B14",
      }}
    >
      <motion.div
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
          duration: 1,
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
            fontFamily: "Space Grotesk",
          }}
        >
          About NAYANK
        </h1>

        <p
          style={{
            color: "#60A5FA",
            fontSize: "1rem",
            marginBottom: "30px",
          }}
        >
          Developed for SAFER ELURU • RTIH Amaravati
          Innovation Program
        </p>

        <p
          style={{
            maxWidth: "950px",
            fontSize: "1.2rem",
            lineHeight: 1.9,
            color: "#94A3B8",
            marginBottom: "80px",
          }}
        >
          NAYANK is an AI Powered Investigation
          Ecosystem designed to strengthen public
          safety, evidence intelligence and modern
          investigation workflows.

          Through NETHRAI and SANKET, investigators
          gain visual intelligence, audio
          intelligence, timeline generation,
          evidence correlation and risk assessment
          capabilities from a unified platform.

          Built as part of the SAFER ELURU challenge
          under RTIH Amaravati, NAYANK focuses on
          transforming fragmented evidence into
          actionable intelligence.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        {cards.map((item, index) => (
          <motion.div
            key={item.title}
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
              delay: index * 0.1,
              duration: 0.8,
            }}
            whileHover={{
              y: -12,
              scale: 1.03,
            }}
            animate={{
              y: [0, -4, 0],
            }}
            style={{
              background:
                "linear-gradient(145deg,#091423,#10203A)",
              border:
                "1px solid rgba(37,99,235,.35)",
              borderRadius: "24px",
              padding: "30px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            <h3
              style={{
                color: "#60A5FA",
                marginBottom: "12px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#94A3B8",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}