"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    try {
      const res = await fetch(
        "http://localhost:3001/cases"
      );

      const data = await res.json();

      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading Cases...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <FadeUp>
        <SectionTitle
          title="Investigation Cases"
          subtitle="Supervisor access to all investigations"
        />
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(380px,1fr))",
          gap: "24px",
        }}
      >
        {cases.map((item) => (
          <FadeUp key={item.id}>
            <PremiumCard>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#94A3B8",
                  marginTop: "10px",
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#38BDF8",
                  }}
                >
                  {item.status}
                </span>

                <span>
                  Evidence:
                  {" "}
                  {item.evidences?.length || 0}
                </span>

                <span>
                  Interviews:
                  {" "}
                  {item.interviews?.length || 0}
                </span>
              </div>

              <Link
                href={`/officer/cases/${item.id}`}
              >
                <button
                  style={{
                    marginTop: "20px",
                    border: "none",
                    padding:
                      "14px 22px",
                    borderRadius:
                      "14px",
                    background:
                      "linear-gradient(90deg,#2563EB,#60A5FA)",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View Investigation
                </button>
              </Link>
            </PremiumCard>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}