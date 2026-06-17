"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function OfficersPage() {
  const [officers, setOfficers] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [usersRes, casesRes] = await Promise.all([
        fetch("http://localhost:3001/users"),
        fetch("http://localhost:3001/cases"),
      ]);

      const users = await usersRes.json();
      const casesData = await casesRes.json();

      const officerUsers = users.filter(
        (user: any) =>
          user.role === "OFFICER"
      );

      setOfficers(officerUsers);
      setCases(casesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading Officers...
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
          title="Officer Management"
          subtitle="Monitor investigation officers and workload."
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
            Total Officers
          </p>

          <h2
            style={{
              fontSize: "2.5rem",
              marginTop: "10px",
            }}
          >
            {officers.length}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Total Cases
          </p>

          <h2
            style={{
              fontSize: "2.5rem",
              color: "#38BDF8",
              marginTop: "10px",
            }}
          >
            {cases.length}
          </h2>
        </PremiumCard>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "24px",
        }}
      >
        {officers.map((officer) => (
          <FadeUp key={officer.id}>
            <PremiumCard>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {officer.name}
              </h2>

              <p
                style={{
                  color: "#94A3B8",
                  marginTop: "10px",
                }}
              >
                {officer.email}
              </p>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    Role
                  </p>

                  <h4
                    style={{
                      color: "#4ADE80",
                    }}
                  >
                    {officer.role}
                  </h4>
                </div>

                <div>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    Cases
                  </p>

                  <h4>
                    {
                      cases.filter(
                        (c: any) =>
                          c.createdById ===
                          officer.id
                      ).length
                    }
                  </h4>
                </div>
              </div>
            </PremiumCard>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}