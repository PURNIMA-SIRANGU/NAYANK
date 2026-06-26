"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import NayankLogo from "@/components/branding/NayankLogo";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 30,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 30,
  });

  // Mobile Performance Optimization: Disables tracking computations on mobile
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

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
        padding: isMobile ? "120px 20px 60px" : "120px 8%",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: isMobile ? "260px" : "500px",
          height: isMobile ? "260px" : "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle,#2563EB33,transparent)",
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
          maxWidth: isMobile ? "100%" : "1200px",
          paddingInline: isMobile ? "8px" : 0,
        }}
      >
        {/* Restored: Original floating duration animation settings */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
        >
          {/* Updated: Prevent clipping wrapper optimizations */}
          <div
            style={{
              transform: isMobile ? "scale(0.58)" : "scale(1)",
              transformOrigin: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              overflow: "visible",
            }}
          >
            <NayankLogo />
          </div>
        </motion.div>

        {/* Restored: Original H1 slide-up offsets, timings and durations */}
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
            fontSize: isMobile
              ? "clamp(2.8rem, 10vw, 3.8rem)"
              : "clamp(4rem, 7vw, 7rem)",
            fontWeight: 900,
            lineHeight: isMobile ? 1.08 : 1,
            marginTop: isMobile ? "8px" : "30px",
            marginBottom: isMobile ? "20px" : "30px",
            fontFamily: "Space Grotesk",
            letterSpacing: isMobile ? "-1px" : "-2px",
            paddingInline: isMobile ? "6px" : 0,
          }}
        >
          Every Clue Has A Story.
          <br />
          Every Story Has A Truth.
        </motion.h1>

        {/* Restored: Original description configuration parameters */}
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
            fontSize: isMobile ? "1rem" : "1.3rem",
            color: "#94A3B8",
            maxWidth: isMobile ? "100%" : "900px",
            margin: "0 auto",
            lineHeight: isMobile ? 1.6 : 1.8,
            paddingInline: isMobile ? "10px" : 0,
          }}
        >
          AI Powered Investigation Ecosystem connecting Evidence Intelligence,
          Visual Intelligence and Audio Intelligence into a unified investigative platform.
        </motion.p>

        {/* Restored: Original anchor arrow animation parameters */}
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          style={{
            marginTop: isMobile ? "40px" : "80px",
            fontSize: isMobile ? "1.5rem" : "2rem",
            color: "#60A5FA",
          }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}