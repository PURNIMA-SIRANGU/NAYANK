"use client";

import WaveN from "./WaveN";

export default function NayankLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "6rem",
        fontWeight: 900,
        justifyContent: "center",
        flexWrap: "wrap",
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