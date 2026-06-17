"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      
    },
    {
      label: "Users",
      href: "/admin/users",
      
    },
    {
      label: "Officers",
      href: "/admin/officers",
  
    },
    {
      label: "Supervisors",
      href: "/admin/supervisors",
      
    },
    {
      label: "Cases",
      href: "/admin/cases",
    
    },
    {
      label: "Evidence",
      href: "/admin/evidence",
      
    },
    {
      label: "Reports",
      href: "/admin/reports",
      
    },
    {
      label: "Audit",
      href: "/admin/audit",
      
    },
    {
      label: "System",
      href: "/admin/system",
   
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: "",
    },
  ];

  return (
    <aside
      style={{
        width: "320px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#061120 0%,#020817 100%)",
        borderRight: "1px solid rgba(255,255,255,.06)",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: "#60A5FA",
        }}
      >
        NAYANK
      </h1>

      <p
        style={{
          color: "#94A3B8",
          marginTop: "8px",
        }}
      >
        System Administration
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              color: "white",
              padding: "18px 20px",
              borderRadius: "18px",
              background:
                pathname === item.href
                  ? "linear-gradient(90deg,#2563EB,#60A5FA)"
                  : "rgba(255,255,255,.02)",
              border:
                "1px solid rgba(255,255,255,.06)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontWeight: 600,
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}