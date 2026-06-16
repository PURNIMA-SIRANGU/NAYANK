"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import CitizenSidebar from "./CitizenSidebar";

interface CitizenLayoutProps {
  children: ReactNode;
}

export default function CitizenLayout({
  children,
}: CitizenLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login");
      return;
    }

    if (role !== "CITIZEN") {
      router.push("/login");
    }
  }, [router]);

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
        }}
      >
        {children}
      </main>
    </div>
  );
}