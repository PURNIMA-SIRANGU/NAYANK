"use client";

import { useEffect, useState } from "react";

export default function NethraiLogo() {
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
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        width: "100%",
        overflow: "visible",
        whiteSpace: "nowrap",
        fontSize: isMobile
          ? "clamp(2.5rem,9vw,3.6rem)"
          : "5rem",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: isMobile ? "1px" : "3px",
      }}
    >
      N
      E
      T
      H
      R

      <span
        style={{
          color: "#60A5FA",
          margin: isMobile ? "0 4px" : "0 6px",
          display: "flex",
          alignItems: "center",
        }}
      >
        👁
      </span>

      I
    </div>
  );
}