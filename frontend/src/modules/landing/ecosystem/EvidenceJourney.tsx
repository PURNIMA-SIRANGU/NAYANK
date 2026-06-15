"use client";

import WaveN from "@/components/branding/WaveN";
import { motion } from "framer-motion";

const nodes = [
  {
    icon: "◈",
    title: "Incident",
    desc: "Case Reported",
  },
  {
    icon: "⛶",
    title: "Evidence",
    desc: "Data Collected",
  },
  {
    icon: "👁",
    title: "NETHRAI",
    desc: "Visual Intelligence",
  },
  {
    icon: "⬡",
    title: "Investigation",
    desc: "Case Analysis",
  },
  {
    icon: "|l|",
    title: "SANKET",
    desc: "Audio Intelligence",
  },
  {
    icon: "◆",
    title: "Resolution",
    desc: "Case Closed",
  },
];

export default function EvidenceJourney() {
  return (
    <section
      style={{
        padding: "100px 4%",
        background: "#091423",
      }}
    >
      <motion.h2
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "70px",
          fontFamily: "Space Grotesk",
        }}
      >
        Investigation Flow
      </motion.h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "0",
          width: "100%",
        }}
      >
        {nodes.map((node, index) => (
          <div
            key={node.title}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "24px",
                background:
                  "linear-gradient(145deg,#091423,#10203A)",
                border:
                  "1px solid rgba(37,99,235,.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.25)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  color: "#60A5FA",
                  marginBottom: "10px",
                }}
              >
                {node.icon}
              </div>

              <div
                style={{
                  fontWeight: 700,
                  marginBottom: "5px",
                  fontSize: ".95rem",
                }}
              >
                {node.title}
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: ".8rem",
                }}
              >
                {node.desc}
              </div>
            </motion.div>

            {index !== nodes.length - 1 && (
              <div
                style={{
                  width: "70px",
                  height: "4px",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "rgba(255,255,255,.08)",
                }}
              >
                <motion.div
                  animate={{
                    x: [-70, 70],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: "35px",
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#2563EB,#60A5FA,#2563EB)",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}