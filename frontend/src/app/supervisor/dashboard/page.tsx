"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function SupervisorDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [casesRes, evidenceRes, usersRes] =
        await Promise.all([
          fetch("http://localhost:3001/cases"),
          fetch("http://localhost:3001/evidence"),
          fetch("http://localhost:3001/users"),
        ]);

      const casesData = await casesRes.json();
      const evidenceData =
        await evidenceRes.json();
      const usersData = await usersRes.json();

      setCases(casesData);
      setEvidence(evidenceData);
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading Dashboard...
      </div>
    );
  }

  const officers = users.filter(
    (u) => u.role === "OFFICER"
  );

  const openCases = cases.filter(
    (c) => c.status === "OPEN"
  ).length;

  const closedCases = cases.filter(
    (c) => c.status === "CLOSED"
  ).length;

  const netraiReports = evidence.filter(
    (e) => e.videoAnalysis
  ).length;

  const sanketReports = evidence.filter(
    (e) => e.summary
  ).length;

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
          title="Supervisor Command Center"
          subtitle="Monitor officers, investigations and AI intelligence."
        />
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Total Cases
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              marginTop: "10px",
            }}
          >
            {cases.length}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Open Cases
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#FBBF24",
              marginTop: "10px",
            }}
          >
            {openCases}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Closed Cases
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#4ADE80",
              marginTop: "10px",
            }}
          >
            {closedCases}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Officers
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#38BDF8",
              marginTop: "10px",
            }}
          >
            {officers.length}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            NETRAI Reports
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#06B6D4",
              marginTop: "10px",
            }}
          >
            {netraiReports}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            SANKET Reports
          </p>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#A855F7",
              marginTop: "10px",
            }}
          >
            {sanketReports}
          </h2>
        </PremiumCard>
      </div>

      <PremiumCard>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          Recent Investigations
        </h2>

        {cases.slice(0, 5).map((item) => (
          <div
            key={item.id}
            style={{
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,.06)",
            }}
          >
            <h3>{item.title}</h3>

            <p
              style={{
                color: "#94A3B8",
                marginTop: "8px",
              }}
            >
              {item.description?.slice(
                0,
                140
              )}
            </p>

            <p
              style={{
                marginTop: "10px",
                color: "#38BDF8",
              }}
            >
              {item.status}
            </p>
          </div>
        ))}
      </PremiumCard>
    </div>
  );
}