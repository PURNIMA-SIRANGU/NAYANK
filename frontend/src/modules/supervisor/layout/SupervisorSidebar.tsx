"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SupervisorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    {
      name: "Dashboard",
      href: "/supervisor/dashboard",
    },
    {
      name: "Cases",
      href: "/supervisor/cases",
    },
    {
      name: "Officers",
      href: "/supervisor/officers",
    },
    {
      name: "Monitoring",
      href: "/supervisor/monitoring",
    },
    {
      name: "Analytics",
      href: "/supervisor/analytics",
    },
    {
      name: "Reports",
      href: "/supervisor/reports",
    },
  ];

  const handleLogout = () => {
    // Clear browser tracking cache structures safely
    localStorage.clear();
    sessionStorage.clear();
    
    // Direct point-to entry back to the login path location
    router.replace("/login");
  };

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        padding: "24px",
        borderRight: "1px solid rgba(255,255,255,.06)",
        background: "linear-gradient(180deg,#040B14,#081120)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        {/* INTERACTIVE BRANDING HEADER -> INTERFACES TO ROOT LANDING CONFIGURATION */}
        <Link href="/" style={{ textDecoration: "none", display: "block" }}>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: "40px",
              color: "#38BDF8",
              margin: "0 0 40px 0",
            }}
          >
            NAYANK
          </h1>
        </Link>

        {/* PORTAL LINKS FEED */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  background: active ? "rgba(37,99,235,.15)" : "transparent",
                  color: active ? "#60A5FA" : "#CBD5E1",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* LOWER FOOTER LOGOUT UTILITY ACTION BUTTON */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            textAlign: "left",
            background: "transparent",
            border: "none",
            color: "#94A3B8",
            fontSize: "14px",
            fontWeight: 600,
            padding: "12px 18px",
            borderRadius: "14px",
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