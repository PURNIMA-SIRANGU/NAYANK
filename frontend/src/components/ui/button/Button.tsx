"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      style={{
        padding: "14px 24px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",

        background:
          "linear-gradient(90deg,#2563EB,#60A5FA)",

        color: "white",

        fontWeight: 600,
      }}
    >
      {children}
    </motion.button>
  );
}