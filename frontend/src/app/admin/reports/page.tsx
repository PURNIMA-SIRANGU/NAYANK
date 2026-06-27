"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function ReportsPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    try {
      const res = await fetch(
        "https://nayank-backend.onrender.com/cases"
      );

      const data = await res.json();

      setCases(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredCases = cases.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Reports...
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
      {/* HEADER */}

      <FadeUp>
        <SectionTitle
          title="Investigation Reports Center"
          subtitle="AI Generated Investigation Reports"
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
              Total Reports
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              {cases.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Approved
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {
                cases.filter(
                  (c) =>
                    c.status ===
                    "CLOSED"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              In Review
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#FBBF24",
              }}
            >
              {
                cases.filter(
                  (c) =>
                    c.status ===
                    "IN_PROGRESS"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Pending
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              {
                cases.filter(
                  (c) =>
                    c.status ===
                    "OPEN"
                ).length
              }
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SEARCH */}

      <FadeUp>
        <PremiumCard>
          <input
            placeholder="Search report..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
            }}
          />
        </PremiumCard>
      </FadeUp>

      {/* REPORTS */}

      <FadeUp>
        <SectionTitle
          title="Generated Reports"
          subtitle="Investigation outcomes and summaries"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {filteredCases.map(
            (item) => (
              <PremiumCard
                key={item.id}
              >
                <h3
                  style={{
                    fontSize:
                      "1.3rem",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color:
                      "#94A3B8",
                    marginTop:
                      "12px",
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    marginTop:
                      "16px",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "8px",
                  }}
                >
                  <span>
                    Case ID:
                    {" "}
                    {item.id}
                  </span>

                  <span>
                    Status:
                    {" "}
                    {item.status}
                  </span>

                  <span>
                    Created:
                    {" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    marginTop:
                      "20px",
                  }}
                >
                  <button
                    style={{
                      padding:
                        "12px 20px",
                      borderRadius:
                        "14px",
                      border:
                        "none",
                      cursor:
                        "pointer",
                      color:
                        "white",
                      background:
                        "linear-gradient(90deg,#2563EB,#60A5FA)",
                    }}
                  >
                    View Report
                  </button>

                  <button
                    style={{
                      padding:
                        "12px 20px",
                      borderRadius:
                        "14px",
                      border:
                        "none",
                      cursor:
                        "pointer",
                      color:
                        "white",
                      background:
                        "linear-gradient(90deg,#16A34A,#4ADE80)",
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </PremiumCard>
            )
          )}
        </div>
      </FadeUp>
    </div>
  );
}