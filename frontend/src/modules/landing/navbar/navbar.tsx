"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "85px",
          backdropFilter: "blur(25px)",
          background: "rgba(4,11,20,.75)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 5%",
          zIndex: 9999,
        }}
      >
        {/* LEFT MENU (Desktop Only) */}
        <div
          style={{
            display: isMobile ? "none" : "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <a href="#about">About</a>

          <a href="#nethrai">NETHRAI</a>

          <a href="#sanket">SANKET</a>

          <a href="#why">Why NAYANK</a>
        </div>

        {/* LOGO */}
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

        {/* DESKTOP BUTTONS */}
        <div
          style={{
            display: isMobile ? "none" : "flex",
            gap: "15px",
          }}
        >
          <Link href="/login">
            <button
              style={{
                borderRadius: "999px",
                padding: "12px 24px",
                background: "rgba(255,255,255,.05)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.08)",
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

        {/* MOBILE MENU BUTTON */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(20px)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Menu size={22} />
          </button>
        )}
      </nav>
            {/* ================= MOBILE DRAWER ================= */}

      {isMobile && menuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.55)",
              backdropFilter: "blur(6px)",
              zIndex: 9998,
            }}
          />

          {/* Drawer */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "300px",
              maxWidth: "85%",
              height: "100vh",
              background: "rgba(8,15,28,.96)",
              backdropFilter: "blur(30px)",
              borderLeft: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              flexDirection: "column",
              padding: "30px 24px",
              zIndex: 9999,
              boxShadow: "-20px 0 60px rgba(0,0,0,.5)",
            }}
          >
            {/* Close */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "35px",
              }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "rgba(255,255,255,.05)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a href="#nethrai" onClick={() => setMenuOpen(false)}>
                NETHRAI
              </a>

              <a href="#sanket" onClick={() => setMenuOpen(false)}>
                SANKET
              </a>

              <a href="#why" onClick={() => setMenuOpen(false)}>
                Why NAYANK
              </a>
            </div>

            <div style={{ flex: 1 }} />

            {/* Buttons */}
            <Link href="/login">
              <button
                style={{
                  width: "100%",
                  height: "52px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "#fff",
                  marginBottom: "14px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Login
              </button>
            </Link>

            <Link href="/register">
              <button
                style={{
                  width: "100%",
                  height: "52px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg,#2563EB,#60A5FA)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Register
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}