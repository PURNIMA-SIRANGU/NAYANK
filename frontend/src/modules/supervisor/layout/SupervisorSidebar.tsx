"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SupervisorSidebar() {
  const pathname = usePathname();

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

  return (
    <aside
      style={{
        width: "280px",
        minHeight: "100vh",
        padding: "24px",
        borderRight:
          "1px solid rgba(255,255,255,.06)",
        background:
          "linear-gradient(180deg,#040B14,#081120)",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          marginBottom: "40px",
        }}
      >
        NAYANK
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              background:
                pathname === item.href
                  ? "rgba(37,99,235,.15)"
                  : "transparent",
              color:
                pathname === item.href
                  ? "#60A5FA"
                  : "#CBD5E1",
              fontWeight: 600,
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}