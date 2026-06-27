"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [usersRes, casesRes, evidenceRes] =
        await Promise.all([
          fetch("https://nayank-backend.onrender.com/users"),
          fetch("https://nayank-backend.onrender.com/cases"),
          fetch("https://nayank-backend.onrender.com/evidence"),
        ]);

      const usersData = await usersRes.json();
      const casesData = await casesRes.json();
      const evidenceData = await evidenceRes.json();

      setUsers(usersData);
      setCases(casesData);
      setEvidence(evidenceData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Admin Dashboard...
      </div>
    );
  }

  const totalUsers = users.length;

  const officers = users.filter(
    (u) => u.role === "OFFICER"
  ).length;

  const totalCases = cases.length;

  const totalEvidence = evidence.length;

  const recentUsers = [...users]
    .reverse()
    .slice(0, 4);

  const recentCases = [...cases]
    .reverse()
    .slice(0, 4);

  const recentEvidence = [...evidence]
    .reverse()
    .slice(0, 4);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* HEADER */}

      <FadeUp>
        <SectionTitle
          title="Administration Command Center"
          subtitle="Monitor Users, Cases, Evidence & AI Intelligence"
        />
      </FadeUp>

      {/* STATS */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Total Users
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              {totalUsers}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Officers
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {officers}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Total Cases
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#FBBF24",
              }}
            >
              {totalCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Evidence Files
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              {totalEvidence}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* USER MANAGEMENT */}

      <FadeUp>
        <SectionTitle
          title="Recent Users"
          subtitle="Latest registered users"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {recentUsers.map((user) => (
            <PremiumCard key={user.id}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                {user.name}
              </h3>

              <p
                style={{
                  color: "#60A5FA",
                  marginTop: "10px",
                }}
              >
                {user.email}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span
                  style={{
                    color: "#4ADE80",
                  }}
                >
                  {user.role}
                </span>

                <span
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Active
                </span>
              </div>

              <Link
                href={`/admin/users/${user.id}`}
              >
                <button
                  style={{
                    marginTop: "20px",
                    padding:
                      "12px 20px",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    background:
                      "linear-gradient(90deg,#2563EB,#60A5FA)",
                  }}
                >
                  Manage User →
                </button>
              </Link>
            </PremiumCard>
          ))}
        </div>
      </FadeUp>

      {/* ACTIVE CASES */}

      <FadeUp>
        <SectionTitle
          title="Recent Cases"
          subtitle="Latest investigations"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {recentCases.map((item) => (
            <PremiumCard key={item.id}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#94A3B8",
                  marginTop: "12px",
                }}
              >
                {item.description?.slice(
                  0,
                  180
                )}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "18px",
                }}
              >
                <span
                  style={{
                    color: "#4ADE80",
                  }}
                >
                  {item.status}
                </span>

                <span>
                  Evidence:
                  {" "}
                  {item.evidences?.length || 0}
                </span>
              </div>
            </PremiumCard>
          ))}
        </div>
      </FadeUp>

      {/* RECENT EVIDENCE */}

      <FadeUp>
        <SectionTitle
          title="Recent Evidence"
          subtitle="Latest uploaded files"
        />

        <PremiumCard>
          {recentEvidence.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  padding:
                    "18px 0",
                  borderBottom:
                    "1px solid rgba(255,255,255,.08)",
                }}
              >
                <h4>
                  {
                    item.case
                      ?.title
                  }
                </h4>

                <p
                  style={{
                    color:
                      "#60A5FA",
                    marginTop:
                      "6px",
                  }}
                >
                  {item.type}
                </p>

                <p
                  style={{
                    color:
                      "#94A3B8",
                    marginTop:
                      "6px",
                  }}
                >
                  Uploaded:
                  {" "}
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </PremiumCard>
      </FadeUp>

      {/* QUICK ACTIONS */}

      <FadeUp>
        <SectionTitle
          title="Quick Actions"
          subtitle="Administrative controls"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <Link href="/admin/users">
            <PremiumCard>
              <h3>
                Manage Users
              </h3>
            </PremiumCard>
          </Link>

          <Link href="/admin/cases">
            <PremiumCard>
              <h3>
                Manage Cases
              </h3>
            </PremiumCard>
          </Link>

          <Link href="/admin/evidence">
            <PremiumCard>
              <h3>
                Evidence Center
              </h3>
            </PremiumCard>
          </Link>

          <Link href="/admin/audit">
            <PremiumCard>
              <h3>
                Audit Logs
              </h3>
            </PremiumCard>
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}