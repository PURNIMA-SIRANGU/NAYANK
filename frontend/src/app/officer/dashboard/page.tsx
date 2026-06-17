"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function OfficerDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [casesRes, evidenceRes] = await Promise.all([
        fetch("http://localhost:3001/cases"),
        fetch("http://localhost:3001/evidence"),
      ]);

      const casesData = await casesRes.json();
      const evidenceData = await evidenceRes.json();

      setCases(casesData);
      setEvidence(evidenceData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const totalCases = cases.length;

  const openCases = cases.filter(
    (c) => c.status === "OPEN"
  ).length;

  const netraiReports = evidence.filter(
    (e) => e.videoAnalysis
  ).length;

  const sanketReports = evidence.filter(
    (e) => e.summary
  ).length;

  const recentCases = [...cases].reverse().slice(0, 4);

  const recentEvidence = [...evidence]
    .reverse()
    .slice(0, 4);

  const netraiData = evidence.filter(
    (e) => e.videoAnalysis
  );

  const sanketData = evidence.filter(
    (e) => e.summary
  );

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <FadeUp>
        <SectionTitle
          title="Officer Investigation Center"
          subtitle="AI Powered Investigation & Evidence Intelligence"
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
              Total Cases
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
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
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {openCases}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              NETRAI Reports
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
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
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              {sanketReports}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* ACTIVE CASES */}

      <FadeUp>
        <SectionTitle
          title="Active Investigations"
          subtitle="Latest cases under investigation"
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
                  lineHeight: 1.7,
                }}
              >
                {item.description?.slice(0, 180)}
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
                    fontWeight: 600,
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

              <Link
                href={`/officer/cases/${item.id}`}
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
                  View Investigation →
                </button>
              </Link>
            </PremiumCard>
          ))}
        </div>
      </FadeUp>

      {/* RECENT EVIDENCE */}

      <FadeUp>
        <SectionTitle
          title="Recent Evidence"
          subtitle="Latest uploaded evidence files"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            gap: "20px",
          }}
        >
          {recentEvidence.map((item) => (
            <PremiumCard key={item.id}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                {item.case?.title}
              </h3>

              <p
                style={{
                  color: "#60A5FA",
                  marginTop: "8px",
                  marginBottom: "16px",
                }}
              >
                {item.type}
              </p>

              {item.type === "IMAGE" && (
                <img
                  src={item.fileUrl}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "18px",
                    maxHeight: "350px",
                    objectFit: "cover",
                  }}
                />
              )}

              {item.type === "VIDEO" && (
                <video
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "18px",
                  }}
                >
                  <source
                    src={item.fileUrl}
                  />
                </video>
              )}

              {item.type === "AUDIO" && (
                <audio
                  controls
                  style={{
                    width: "100%",
                  }}
                >
                  <source
                    src={item.fileUrl}
                  />
                </audio>
              )}
            </PremiumCard>
          ))}
        </div>
      </FadeUp>

      {/* NETRAI */}

      <FadeUp>
        <SectionTitle
          title="NETRAI Intelligence"
          subtitle="Video Analysis Results"
        />

        {netraiData.map((item) => (
          <PremiumCard
            key={item.id}
            style={{
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              {item.case?.title}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Persons
                </p>

                <h2
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.persons
                  }
                </h2>
              </div>

              <div>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Vehicles
                </p>

                <h2
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.vehicles
                  }
                </h2>
              </div>

              <div>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Plates
                </p>

                <h2>
                  {
                    item.videoAnalysis
                      ?.plates
                  }
                </h2>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                color: "#38BDF8",
              }}
            >
              {
                item.videoAnalysis
                  ?.summary
              }
            </div>
          </PremiumCard>
        ))}
      </FadeUp>

      {/* SANKET */}

      <FadeUp>
        <SectionTitle
          title="SANKET Intelligence"
          subtitle="Transcript & Audio Analysis"
        />

        {sanketData.map((item) => (
          <PremiumCard
            key={item.id}
            style={{
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              {item.case?.title}
            </h3>

            <p
              style={{
                color: "#CBD5E1",
                marginTop: "16px",
                whiteSpace:
                  "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {item.summary?.slice(
                0,
                600
              )}
            </p>
          </PremiumCard>
        ))}
      </FadeUp>

      {/* ACTIVITY */}

      <FadeUp>
        <SectionTitle
          title="Recent Activity"
          subtitle="Latest evidence operations"
        />

        <PremiumCard>
          {evidence
            .slice(0, 6)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  padding:
                    "16px 0",
                  borderBottom:
                    "1px solid rgba(255,255,255,.08)",
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Evidence Uploaded
                </p>

                <p
                  style={{
                    color: "#94A3B8",
                    marginTop: "6px",
                  }}
                >
                  {item.case?.title}
                </p>

                <p
                  style={{
                    color: "#64748B",
                    fontSize: "12px",
                    marginTop: "6px",
                  }}
                >
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            ))}
        </PremiumCard>
      </FadeUp>
    </div>
  );
}