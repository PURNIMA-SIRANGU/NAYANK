"use client";

import { motion } from "framer-motion";
import NethraiLogo from "@/components/branding/NethraiLogo";

const features = [
  {
    title: "ANPR Intelligence",
    desc: "Automatic Number Plate Recognition and vehicle tracking.",
  },
  {
    title: "Face Recognition",
    desc: "Identify and correlate persons across evidence sources.",
  },
  {
    title: "Object Tracking",
    desc: "Track suspicious objects and movements across footage.",
  },
  {
    title: "Behavior Analysis",
    desc: "Detect abnormal and suspicious activities.",
  },
  {
    title: "Timeline AI",
    desc: "Generate chronological investigation timelines.",
  },
  {
    title: "Evidence Correlation",
    desc: "Connect evidence, suspects, vehicles and events.",
  },
];

export default function NethraiSection() {
  return (
    <section
      id="nethrai"
      style={{
        padding: "140px 8%",
        background: "#091423",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <NethraiLogo />

        <p
          style={{
            color: "#94A3B8",
            fontSize: "1.2rem",
            marginTop: "20px",
            marginBottom: "80px",
            maxWidth: "700px",
          }}
        >
          AI Visual Intelligence Engine transforming
          surveillance, evidence and investigation
          workflows into actionable intelligence.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -120 : 120,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -10,
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
              padding: "35px",
              cursor: "pointer",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background:
                  "rgba(37,99,235,.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                fontSize: "1.5rem",
                color: "#60A5FA",
              }}
            >
              👁
            </div>

            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: "15px",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                color: "#94A3B8",
                lineHeight: 1.8,
              }}
            >
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}