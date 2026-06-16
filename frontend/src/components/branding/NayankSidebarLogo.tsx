"use client";

export default function NayankSidebarLogo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        marginBottom: "10px",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "2rem",
          fontWeight: 900,
          color: "#60A5FA",
          fontFamily: "Space Grotesk, sans-serif",
          letterSpacing: "2px",
        }}
      >
        NAYANK
      </h1>

      <span
        style={{
          color: "#94A3B8",
          fontSize: ".85rem",
        }}
      >
        Citizen Portal
      </span>
    </div>
  );
}