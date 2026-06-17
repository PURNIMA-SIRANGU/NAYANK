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

  const totalCases = cases.length;

  const openCases = cases.filter(
    (item) => item.status === "OPEN"
  ).length;

  const progressCases = cases.filter(
    (item) => item.status === "IN_PROGRESS"
  ).length;

  const closedCases = cases.filter(
    (item) => item.status === "CLOSED"
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
          title="Investigation Cases"
          subtitle="Monitor, investigate and manage all complaints reported through the NAYANK platform."
        />
      </FadeUp>

      {/* ANALYTICS */}

      <FadeUp>
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
                fontSize: "2.5rem",
                marginTop: "10px",
              }}
            >
              {totalCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Open Cases
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {openCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Under Investigation
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#FBBF24",
                marginTop: "10px",
              }}
            >
              {progressCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Closed Cases
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
                marginTop: "10px",
              }}
            >
              {closedCases}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* CASES */}

      {cases.map((item) => (
        <FadeUp key={item.id}>
          <PremiumCard>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "start",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 700,
                  }}
                >
                  {item.title || "Untitled Case"}
                </h2>

                <p
                  style={{
                    color: "#94A3B8",
                    marginTop: "12px",
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  padding:
                    "10px 16px",
                  borderRadius:
                    "14px",

                  background:
                    item.status ===
                    "OPEN"
                      ? "rgba(56,189,248,.15)"
                      : item.status ===
                        "IN_PROGRESS"
                      ? "rgba(251,191,36,.15)"
                      : "rgba(74,222,128,.15)",

                  color:
                    item.status ===
                    "OPEN"
                      ? "#38BDF8"
                      : item.status ===
                        "IN_PROGRESS"
                      ? "#FBBF24"
                      : "#4ADE80",

                  fontWeight: 700,
                }}
              >
                {item.status}
              </div>
            </div>

            {/* CASE INFO */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <PremiumCard>
                <p
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Evidence Count
                </p>

                <h2
                  style={{
                    marginTop:
                      "10px",
                    fontSize:
                      "2rem",
                  }}
                >
                  {item.evidences
                    ?.length || 0}
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Interviews
                </p>

                <h2
                  style={{
                    marginTop:
                      "10px",
                    fontSize:
                      "2rem",
                  }}
                >
                  {item.interviews
                    ?.length || 0}
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Created Date
                </p>

                <h3
                  style={{
                    marginTop:
                      "10px",
                  }}
                >
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </h3>
              </PremiumCard>
            </div>

            {/* EVIDENCE PREVIEW */}

            {item.evidences &&
              item.evidences.length >
                0 && (
                <div
                  style={{
                    marginTop:
                      "24px",
                  }}
                >
                  <PremiumCard>
                    <h3
                      style={{
                        color:
                          "#38BDF8",
                        marginBottom:
                          "16px",
                      }}
                    >
                      Evidence Preview
                    </h3>

                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "16px",
                      }}
                    >
                      {item.evidences
                        .slice(0, 4)
                        .map(
                          (
                            evidence: any
                          ) => (
                            <div
                              key={
                                evidence.id
                              }
                            >
                              {evidence.type ===
                                "IMAGE" && (
                                <img
                                  src={
                                    evidence.fileUrl
                                  }
                                  alt=""
                                  style={{
                                    width:
                                      "100%",
                                    height:
                                      "180px",
                                    objectFit:
                                      "cover",
                                    borderRadius:
                                      "14px",
                                  }}
                                />
                              )}

                              <p
                                style={{
                                  marginTop:
                                    "8px",
                                  color:
                                    "#94A3B8",
                                }}
                              >
                                {
                                  evidence.type
                                }
                              </p>
                            </div>
                          )
                        )}
                    </div>
                  </PremiumCard>
                </div>
              )}

            {/* ACTIONS */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href={`/officer/cases/${item.id}`}
              >
                <button
                  style={{
                    border: "none",
                    padding:
                      "14px 22px",
                    borderRadius:
                      "14px",
                    background:
                      "linear-gradient(90deg,#2563EB,#60A5FA)",
                    color: "white",
                    fontWeight: 700,
                    cursor:
                      "pointer",
                  }}
                >
                  View Investigation →
                </button>
              </Link>

              <button
                style={{
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  padding:
                    "14px 22px",
                  borderRadius:
                    "14px",
                  background:
                    "transparent",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Evidence (
                {item.evidences
                  ?.length || 0}
                )
              </button>
            </div>

          </PremiumCard>
        </FadeUp>
      ))}
    </div>
  );
}