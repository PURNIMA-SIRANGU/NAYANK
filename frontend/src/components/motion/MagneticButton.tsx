"use client";

import { motion } from "framer-motion";

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      whileTap={{
        scale: 0.95,
      }}
      style={{
        padding: "16px 30px",
        borderRadius: "14px",
        border: "none",
        background: "#2563EB",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}