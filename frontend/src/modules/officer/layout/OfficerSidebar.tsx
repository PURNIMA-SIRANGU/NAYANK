"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/officer/dashboard",
    icon: "📊",
  },
  {
    name: "Cases",
    href: "/officer/cases",
    icon: "📂",
  },
  {
    name: "Evidence",
    href: "/officer/evidence",
    icon: "🗂️",
  },
  {
    name: "NETRAI",
    href: "/officer/nethrai",
    icon: "👁️",
  },
  {
    name: "SANKET",
    href: "/officer/sanket",
    icon: "🎙️",
  },
  {
    name: "Reports",
    href: "/officer/reports",
    icon: "📑",
  },
];

export default function OfficerSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "300px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#08111F 0%,#040B14 100%)",
        borderRight: "1px solid rgba(255,255,255,.08)",
        padding: "24px",
        position: "sticky",
        top: 0,
      }}
    >
      {/* LOGO */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#60A5FA",
            fontFamily: "Space Grotesk",
          }}
        >
          NAYANK
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginTop: "6px",
            fontSize: "14px",
          }}
        >
          AI Investigation Platform
        </p>
      </div>

      {/* OFFICER PROFILE */}

      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "24px",
          padding: "18px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#2563EB,#60A5FA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            marginBottom: "12px",
          }}
        >
          👮
        </div>

        <h3
          style={{
            fontWeight: 700,
          }}
        >
          Investigation Officer
        </h3>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          Crime Investigation Unit
        </p>
      </div>

      {/* MENU */}

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
                gap: "14px",
                padding: "16px 18px",
                borderRadius: "18px",
                textDecoration: "none",

                background: active
                  ? "linear-gradient(90deg,#2563EB,#60A5FA)"
                  : "transparent",

                color: active
                  ? "#fff"
                  : "#CBD5E1",

                border: active
                  ? "none"
                  : "1px solid rgba(255,255,255,.04)",

                transition: ".25s",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* AI STATUS */}

      <div
        style={{
          marginTop: "40px",
          background:
            "linear-gradient(180deg, rgba(37,99,235,.15), rgba(37,99,235,.05))",
          border: "1px solid rgba(37,99,235,.25)",
          borderRadius: "24px",
          padding: "18px",
        }}
      >
        <h3
          style={{
            color: "#60A5FA",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          AI Systems
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: "#CBD5E1",
            fontSize: "14px",
          }}
        >
          <span>🟢 NETRAI Online</span>
          <span>🟢 SANKET Online</span>
          <span>🟢 Evidence Engine Active</span>
          <span>🟢 Investigation Ready</span>
        </div>
      </div>
    </aside>
  );
}