"use client";

import { motion } from "framer-motion";
import WaveN from "@/components/branding/WaveN";

export default function NayankLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <WaveN />
      </motion.div>

      <h2
        style={{
          margin: 0,
          fontFamily:
            "Space Grotesk, sans-serif",
        }}
      >
        NAYANK
      </h2>

      <p
        style={{
          margin: 0,
          color: "#94A3B8",
        }}
      >
        Initializing Investigation System...
      </p>
    </div>
  );
}