"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    try {
      const res = await fetch(
        "https://nayank-backend.onrender.com/cases"
      );

      const data = await res.json();

      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCases = cases.filter(
    (item) => {
      const searchMatch =
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const statusMatch =
        statusFilter === "ALL"
          ? true
          : item.status ===
            statusFilter;

      return (
        searchMatch &&
        statusMatch
      );
    }
  );

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Cases...
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
          title="Case Management Center"
          subtitle="Monitor investigations and case progress"
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
            <p>Total Cases</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
              }}
            >
              {cases.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Open Cases</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
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

          <PremiumCard>
            <p>Closed Cases</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#FBBF24",
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
            <p>In Progress</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#C084FC",
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
        </div>
      </FadeUp>

      {/* SEARCH */}

      <FadeUp>
        <PremiumCard>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Search case..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px",
                borderRadius: "12px",
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option value="ALL">
                All Status
              </option>

              <option value="OPEN">
                Open
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="CLOSED">
                Closed
              </option>
            </select>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* CASES */}

      <FadeUp>
        <SectionTitle
          title="Investigation Cases"
          subtitle="Active and historical investigations"
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
                    fontWeight:
                      700,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color:
                      "#94A3B8",
                    marginTop:
                      "10px",
                  }}
                >
                  {
                    item.description
                  }
                </p>

                <div
                  style={{
                    marginTop:
                      "16px",
                    display:
                      "flex",
                    gap: "12px",
                  }}
                >
                  <span>
                    {
                      item.status
                    }
                  </span>
                </div>

                <div
                  style={{
                    marginTop:
                      "20px",
                    display:
                      "flex",
                    gap: "10px",
                  }}
                >
                  <button>
                    View
                  </button>

                  <button>
                    Manage
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