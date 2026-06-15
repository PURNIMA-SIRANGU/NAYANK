"use client";

import { motion } from "framer-motion";

const features = [
  "AI Powered Investigation",
  "Visual Intelligence",
  "Audio Intelligence",
  "Evidence Correlation",
  "Timeline Generation",
  "Risk Assessment",
  "Case Analytics",
  "Role Based Access",
];

export default function WhyNayank() {
  return (
    <section 
  id="why"
      style={{
        minHeight: "100vh",
        padding: "120px 8%",
        background: "#091423",
      }}
    >
      <motion.h1
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
          fontSize: "4rem",
          marginBottom: "30px",
        }}
      >
        Why NAYANK?
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
          maxWidth: "900px",
          color: "#94A3B8",
          marginBottom: "60px",
          fontSize: "1.1rem",
        }}
      >
        Built specifically for modern investigations,
        NAYANK combines visual intelligence,
        audio intelligence, analytics and evidence
        management into a single AI-driven ecosystem.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "24px",
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileHover={{
  y: -10,
  scale: 1.04,
}}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
            }}
            style={{
              background: "#040B14",
              border: "1px solid #2563EB",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            {feature}
          </motion.div>
        ))}
      </div>
    </section>
  );
}