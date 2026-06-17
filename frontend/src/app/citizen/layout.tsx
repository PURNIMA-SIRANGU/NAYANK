"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/citizen/dashboard",
    },
    {
      label: "Report Incident",
      href: "/citizen/report-incident",
    },
    {
      label: "My Complaints",
      href: "/citizen/my-complaints",
    },
    {
      label: "Upload Evidence",
      href: "/citizen/upload-evidence",
    },
    {
      label: "Notifications",
      href: "/citizen/notifications",
    },
    {
      label: "Profile",
      href: "/citizen/profile",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#040B14",
      }}
    >
      <aside
        style={{
          width: "280px",
          padding: "30px 20px",
          borderRight:
            "1px solid rgba(255,255,255,.06)",
        }}
      >
        <h1
          style={{
            color: "#60A5FA",
            marginBottom: "40px",
          }}
        >
          NAYANK
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: "14px 18px",
                    borderRadius: "16px",
                    color: active
                      ? "#FFFFFF"
                      : "#94A3B8",
                    overflow: "hidden",
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="active-nav"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "16px",
                        background:
                          "rgba(59,130,246,.15)",
                        border:
                          "1px solid rgba(59,130,246,.3)",
                      }}
                    />
                  )}

                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}