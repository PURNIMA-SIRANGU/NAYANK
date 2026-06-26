"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/officer/dashboard",
  },
  {
    name: "Assigned Cases",
    href: "/officer/cases",
  },
  {
    name: "Evidence Manager",
    href: "/officer/evidence",
  },
  {
    name: "NETRAI",
    href: "/officer/nethrai",
  },
  {
    name: "SANKET",
    href: "/officer/sanket",
  },
  {
    name: "Reports",
    href: "/officer/reports",
  },
  {
    name: "Profile",
    href: "/officer/profile",
  },
];

export default function OfficerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clean up local tracking session data
    localStorage.clear();
    sessionStorage.clear();
    
    // Explicitly redirect to your login path location
    router.replace("/login");
  };

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "#030712",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* BRANDING LOGO -> POINTS DIRECTLY TO YOUR ROOT LANDING PAGE */}
      <Link href="/" style={{ textDecoration: "none", display: "block", marginBottom: "36px", paddingLeft: "12px" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#38BDF8",
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          NAYANK
        </h1>
        <p
          style={{
            color: "#475569",
            marginTop: "2px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: "2px 0 0 0",
          }}
        >
          Investigation Intelligence
        </p>
      </Link>

      {/* PORTAL LINKS */}
      <div style={{ marginBottom: "auto" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#475569",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            paddingLeft: "12px",
            marginBottom: "12px",
          }}
        >
          OFFICER PORTAL
        </p>
        
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  background: active ? "#1E3A8A" : "transparent",
                  color: active ? "#FFFFFF" : "#94A3B8",
                  transition: "all 0.15s ease",
                  fontWeight: active ? 500 : 400,
                  fontSize: "14px",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SYSTEM STATUS FOOTER & LOGOUT ACTION */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          paddingTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
            }}
          ></span>
          <div>
            <p style={{ margin: 0, color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>
              System Status
            </p>
            <p style={{ margin: "1px 0 0 0", color: "#64748B", fontSize: "11px" }}>
              All systems operational
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            textAlign: "left",
            background: "transparent",
            border: "none",
            color: "#94A3B8",
            fontSize: "13px",
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.15s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FF4D4D";
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94A3B8";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Logout Session
        </button>
      </div>
    </aside>
  );
}