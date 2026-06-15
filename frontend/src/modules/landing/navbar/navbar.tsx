"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "85px",
        backdropFilter: "blur(25px)",
        background: "rgba(4,11,20,.75)",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5%",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <a href="#about">About</a>

        <a href="#nethrai">
          NETHRAI
        </a>

        <a href="#sanket">
          SANKET
        </a>

        <a href="#why">
          Why NAYANK
        </a>
      </div>

      <a
        href="#hero"
        style={{
          textDecoration: "none",
          color: "#FFFFFF",
          fontSize: "1.6rem",
          fontWeight: 800,
          letterSpacing: "3px",
          cursor: "pointer",
        }}
      >
        NAYANK
      </a>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link href="/login">
          <button
            style={{
              borderRadius: "999px",
              padding: "12px 24px",
              background:
                "rgba(255,255,255,.05)",
              color: "#fff",
              border:
                "1px solid rgba(255,255,255,.08)",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </Link>

        <Link href="/register">
          <button
            style={{
              borderRadius: "999px",
              padding: "12px 24px",
              background:
                "linear-gradient(90deg,#2563EB,#60A5FA)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}