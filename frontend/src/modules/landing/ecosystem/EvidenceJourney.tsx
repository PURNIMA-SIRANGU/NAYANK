"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WaveN from "@/components/branding/WaveN";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      style={{
        padding: isMobile ? "70px 20px" : "100px 4%",
        background: "#091423",
      }}
    >
      {/* RESPONSIVE TIMELINE HEADER */}
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
          fontSize: isMobile ? "2.2rem" : "3rem",
          marginBottom: isMobile ? "45px" : "70px",
          fontFamily: "Space Grotesk",
          color: "#FFFFFF",
        }}
      >
        Investigation Flow
      </motion.h2>

      {/* CORE DISPLAY FLEX ROW OR VERTICAL FLOW COLUMN MAP */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: isMobile ? "nowrap" : "nowrap",
          gap: isMobile ? "20px" : "0",
          width: "100%",
        }}
      >
        {nodes.map((node, index) => (
          <div
            key={node.title}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            {/* INDIE FLOW DISPLAY BLOCK */}
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
                width: isMobile ? "240px" : "140px",
                height: isMobile ? "110px" : "140px",
                borderRadius: isMobile ? "18px" : "24px",
                background: "linear-gradient(145deg, #091423, #10203A)",
                border: "1px solid rgba(37, 99, 235, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
                color: "#FFFFFF",
                padding: isMobile ? "12px" : "0",
                boxSizing: "border-box",
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
                  fontSize: isMobile ? "1rem" : ".95rem",
                }}
              >
                {node.title}
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: isMobile ? ".85rem" : ".8rem",
                  textAlign: "center",
                }}
              >
                {node.desc}
              </div>
            </motion.div>

            {/* PIPELINE STREAM CONNECTOR */}
            {index !== nodes.length - 1 && (
              <div
                style={{
                  width: isMobile ? "4px" : "70px",
                  height: isMobile ? "40px" : "4px",
                  position: "relative",
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, .08)",
                }}
              >
                <motion.div
                  animate={
                    isMobile
                      ? {
                          y: [-40, 40],
                        }
                      : {
                          x: [-70, 70],
                        }
                  }
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: isMobile ? "100%" : "35px",
                    height: isMobile ? "18px" : "100%",
                    background: "linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)",
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