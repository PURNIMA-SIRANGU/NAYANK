"use client";

import { motion } from "framer-motion";

export default function PremiumCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",

        backdropFilter: "blur(24px)",

        border:
          "1px solid rgba(255,255,255,.08)",

        boxShadow:
          "0 20px 60px rgba(0,0,0,.25)",

        borderRadius: "28px",

        padding: "24px",

        overflow: "hidden",

        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}