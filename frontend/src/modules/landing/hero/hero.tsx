"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import NayankLogo from "@/components/branding/NayankLogo";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 30,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 8%",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#2563EB33,transparent)",
          filter: "blur(80px)",
          x: smoothX,
          y: smoothY,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "1200px",
        }}
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
        >
          <NayankLogo />
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          style={{
            fontSize: "clamp(4rem,7vw,7rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginTop: "30px",
            marginBottom: "30px",
            fontFamily: "Space Grotesk",
          }}
        >
          Every Clue Has A Story.
          <br />
          Every Story Has A Truth.
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          style={{
            fontSize: "1.3rem",
            color: "#94A3B8",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          AI Powered Investigation Ecosystem
          connecting Evidence Intelligence,
          Visual Intelligence and Audio Intelligence
          into a unified investigative platform.
        </motion.p>

        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          style={{
            marginTop: "80px",
            fontSize: "2rem",
            color: "#60A5FA",
          }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}