"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CitizenSidebar from "./CitizenSidebar";
import NayankLoader from "@/components/ui/NayankLoader";

interface CitizenLayoutProps {
  children: ReactNode;
}

export default function CitizenLayout({ children }: CitizenLayoutProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    // Check if any required auth flags are completely missing
    if (!token || !role || !user) {
      localStorage.clear();
      router.replace("/login");
      return;
    }

    // Verify individual role matches exact authorized routing constraints
    if (role !== "CITIZEN") {
      localStorage.clear();
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return <NayankLoader />;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#040B14",
      }}
    >
      <CitizenSidebar />
      <main
        style={{
          flex: 1,
          padding: "30px",
          color: "white", // Sets base scannable text colors over dark theme
        }}
      >
        {children}
      </main>
    </div>
  );
}
