"use client";

import { motion } from "framer-motion";
import SanketLogo from "@/components/branding/SanketLogo";

const modules = [
  {
    title: "Audio Capture",
    desc: "Collect investigation audio from interviews and recordings.",
  },
  {
    title: "Transcription AI",
    desc: "Convert speech into structured investigation text.",
  },
  {
    title: "Translation AI",
    desc: "Translate multilingual conversations instantly.",
  },
  {
    title: "Summarization",
    desc: "Generate concise investigation summaries.",
  },
  {
    title: "Entity Extraction",
    desc: "Extract names, locations, organizations and events.",
  },
  {
    title: "Investigation Notes",
    desc: "Generate actionable case notes automatically.",
  },
];

export default function SanketSection() {
  return (
    <section
      id="sanket"
      style={{
        padding: "140px 8%",
        background: "#040B14",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1,
        }}
      >
        <SanketLogo />

        <p
          style={{
            color: "#94A3B8",
            fontSize: "1.2rem",
            maxWidth: "700px",
            marginTop: "20px",
            marginBottom: "80px",
          }}
        >
          AI Audio Intelligence Engine transforming
          conversations into investigation insights.
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
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
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
              scale: 1.03,
              y: -10,
            }}
            animate={{
              y: [0, -4, 0],
            }}
            style={{
              background:
                "linear-gradient(145deg,#091423,#10203A)",
              border: "1px solid rgba(37,99,235,.35)",
              borderRadius: "24px",
              padding: "35px",
              cursor: "pointer",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                color: "#60A5FA",
                fontSize: "2rem",
                marginBottom: "20px",
              }}
            >
              ılıılıılıılıılı
            </div>

            <h3
              style={{
                marginBottom: "15px",
                fontSize: "1.4rem",
              }}
            >
              {module.title}
            </h3>

            <p
              style={{
                color: "#94A3B8",
                lineHeight: 1.8,
              }}
            >
              {module.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}