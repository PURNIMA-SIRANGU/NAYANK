"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function ReportsPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await fetch("http://localhost:3001/cases");
      const data = await res.json();
      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-white p-8">Loading Reports...</div>;
  }

  const totalCases = cases.length;

  const totalEvidence = cases.reduce(
    (sum, item) => sum + (item.evidences?.length || 0),
    0
  );

  const totalInterviews = cases.reduce(
    (sum, item) => sum + (item.interviews?.length || 0),
    0
  );

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
          title="Investigation Records & Reports"
          subtitle="Comprehensive investigation reports generated from cases, evidence, NETRAI and SANKET intelligence."
        />
      </FadeUp>

      {/* ANALYTICS */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Total Cases</p>
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
            <p style={{ color: "#94A3B8" }}>Evidence Records</p>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {totalEvidence}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Interviews</p>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#A855F7",
                marginTop: "10px",
              }}
            >
              {totalInterviews}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Reports Generated</p>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
                marginTop: "10px",
              }}
            >
              {totalCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Processed Videos</p>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {
                cases
                  .flatMap((c: any) => c.evidences || [])
                  .filter((e: any) => e.videoAnalysis).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Downloadable Reports</p>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#22C55E",
                marginTop: "10px",
              }}
            >
              {cases.length}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* REPORTS */}

      {cases.map((item) => {
        const netraiReports =
          item.evidences?.filter((e: any) => e.videoAnalysis) || [];

        const sanketReports =
          item.evidences?.filter((e: any) => e.summary) || [];

        return (
          <FadeUp key={item.id}>
            <PremiumCard>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                </div>

                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "14px",

                    background:
                      item.status === "OPEN"
                        ? "rgba(56,189,248,.15)"
                        : item.status === "IN_PROGRESS"
                        ? "rgba(251,191,36,.15)"
                        : "rgba(74,222,128,.15)",

                    color:
                      item.status === "OPEN"
                        ? "#38BDF8"
                        : item.status === "IN_PROGRESS"
                        ? "#FBBF24"
                        : "#4ADE80",

                    fontWeight: 700,
                  }}
                >
                  {item.status}
                </div>
              </div>

              {/* SUMMARY */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "20px",
                  marginTop: "24px",
                }}
              >
                <PremiumCard>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    Evidence
                  </p>

                  <h2
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {item.evidences?.length || 0}
                  </h2>
                </PremiumCard>

                <PremiumCard>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    NETRAI Reports
                  </p>

                  <h2
                    style={{
                      marginTop: "10px",
                      color: "#38BDF8",
                    }}
                  >
                    {netraiReports.length}
                  </h2>
                </PremiumCard>

                <PremiumCard>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    SANKET Reports
                  </p>

                  <h2
                    style={{
                      marginTop: "10px",
                      color: "#A855F7",
                    }}
                  >
                    {sanketReports.length}
                  </h2>
                </PremiumCard>

                <PremiumCard>
                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    Created
                  </p>

                  <h3
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {new Date(item.createdAt).toLocaleDateString()}
                  </h3>
                </PremiumCard>
              </div>

              {/* NETRAI */}

              {netraiReports.length > 0 && (
                <div
                  style={{
                    marginTop: "24px",
                  }}
                >
                  <PremiumCard>
                    <h3
                      style={{
                        color: "#38BDF8",
                        marginBottom: "14px",
                      }}
                    >
                      NETRAI Intelligence
                    </h3>

                    {netraiReports.map((report: any) => (
                      <div
                        key={report.id}
                        style={{
                          marginBottom: "12px",
                        }}
                      >
                        <p>
                          👤 Persons: {report.videoAnalysis?.persons}
                        </p>

                        <p>
                          🚗 Vehicles: {report.videoAnalysis?.vehicles}
                        </p>

                        <p>
                          🔍 Plates: {report.videoAnalysis?.plates}
                        </p>

                        <p
                          style={{
                            color: "#CBD5E1",
                            marginTop: "8px",
                          }}
                        >
                          {report.videoAnalysis?.summary}
                        </p>
                      </div>
                    ))}
                  </PremiumCard>
                </div>
              )}

              {/* SANKET */}

              {sanketReports.length > 0 && (
                <div
                  style={{
                    marginTop: "24px",
                  }}
                >
                  <PremiumCard>
                    <h3
                      style={{
                        color: "#A855F7",
                        marginBottom: "14px",
                      }}
                    >
                      SANKET Intelligence
                    </h3>

                    {sanketReports.map((report: any) => (
                      <div
                        key={report.id}
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            color: "#CBD5E1",
                            whiteSpace: "pre-wrap",
                            lineHeight: 1.8,
                          }}
                        >
                          {report.summary.slice(0, 500)}
                        </div>
                      </div>
                    ))}
                  </PremiumCard>
                </div>
              )}

              {/* ACTION BUTTONS */}
              
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:3001/cases/${item.id}/report/pdf`,
                      "_blank"
                    )
                  }
                  style={{
                    border: "none",
                    padding: "14px 22px",
                    borderRadius: "14px",
                    background: "linear-gradient(90deg,#2563EB,#60A5FA)",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  📄 Download Report PDF
                </button>

                {item.evidences?.some((e: any) => e.videoAnalysis) && (
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:3001/reports/${item.id}/video`,
                        "_blank"
                      )
                    }
                    style={{
                      border: "none",
                      padding: "14px 22px",
                      borderRadius: "14px",
                      background: "linear-gradient(90deg,#0EA5E9,#06B6D4)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    🎥 Download Processed Video
                  </button>
                )}

                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:3001/cases/${item.id}/report`,
                      "_blank"
                    )
                  }
                  style={{
                    border: "1px solid rgba(255,255,255,.1)",
                    padding: "14px 22px",
                    borderRadius: "14px",
                    background: "transparent",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  📊 Intelligence Report
                </button>
              </div>

            </PremiumCard>
          </FadeUp>
        );
      })}
    </div>
  );
}