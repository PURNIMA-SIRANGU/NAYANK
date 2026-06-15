"use client";

import WaveN from "./WaveN";

export default function SanketLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "5rem",
        fontWeight: 900,
      }}
    >
      <span>S</span>
      <span>A</span>

      <WaveN />

      <span>K</span>
      <span>E</span>
      <span>T</span>
    </div>
  );
}