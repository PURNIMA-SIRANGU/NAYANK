"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import NayankSidebarLogo from "@/components/branding/NayankSidebarLogo";

export default function CitizenSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/citizen/dashboard",
    },
    {
      name: "Report Incident",
      path: "/citizen/report-incident",
    },
    {
      name: "My Complaints",
      path: "/citizen/my-complaints",
    },
    {
      name: "Upload Evidence",
      path: "/citizen/upload-evidence",
    },
    {
      name: "Notifications",
      path: "/citizen/notifications",
    },
    {
      name: "Profile",
      path: "/citizen/profile",
    },
  ];

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside
      style={{
        width: "280px",
        padding: "24px",

        background:
          "rgba(9,20,35,.92)",

        borderRight:
          "1px solid rgba(255,255,255,.08)",

        backdropFilter: "blur(20px)",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
  style={{
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <NayankSidebarLogo />
</div>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            textDecoration: "none",

            padding: "14px 18px",

            marginBottom: "10px",

            borderRadius: "16px",

            color:
              pathname === item.path
                ? "#60A5FA"
                : "#FFFFFF",

            background:
              pathname === item.path
                ? "rgba(37,99,235,.12)"
                : "transparent",

            transition:
              "all .25s ease",
          }}
        >
          {item.name}
        </Link>
      ))}

      
    </aside>
  );
}