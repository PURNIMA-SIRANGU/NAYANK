"use client";

import { useEffect, useState } from "react";
import WaveN from "./WaveN";

export default function NayankLogo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "2px" : "6px",
        flexWrap: "nowrap",
        width: "100%",
        overflow: "visible",
        fontSize: isMobile
          ? "clamp(2.8rem,11vw,4rem)"
          : "6rem",
        fontWeight: 900,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <WaveN />

      <span
        style={{
          color: "#60A5FA",
        }}
      >
        Λ
      </span>

      <span>Y</span>

      <span
        style={{
          color: "#60A5FA",
        }}
      >
        Λ
      </span>

      <WaveN />

      <span>K</span>
    </div>
  );
}