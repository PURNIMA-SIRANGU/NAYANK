"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState("ALL");

  useEffect(() => {
    loadEvidence();
  }, []);

  async function loadEvidence() {
    try {
      const res = await fetch(
        "http://localhost:3001/evidence"
      );

      const data = await res.json();

      setEvidence(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredEvidence =
    evidence.filter((item) => {
      const searchMatch =
        item.summary
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const typeMatch =
        typeFilter === "ALL"
          ? true
          : item.type === typeFilter;

      return searchMatch && typeMatch;
    });

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Evidence...
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
          title="Evidence Intelligence Center"
          subtitle="Manage investigation evidence and AI analysis"
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
            <p>Total Evidence</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
              }}
            >
              {evidence.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Audio Files</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
              }}
            >
              {
                evidence.filter(
                  (e) =>
                    e.type ===
                    "AUDIO"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Images</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#FBBF24",
              }}
            >
              {
                evidence.filter(
                  (e) =>
                    e.type ===
                    "IMAGE"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Documents</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#C084FC",
              }}
            >
              {
                evidence.filter(
                  (e) =>
                    e.type ===
                    "DOCUMENT"
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
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Search evidence..."
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
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option value="ALL">
                All Types
              </option>

              <option value="AUDIO">
                Audio
              </option>

              <option value="IMAGE">
                Image
              </option>

              <option value="VIDEO">
                Video
              </option>

              <option value="DOCUMENT">
                Document
              </option>
            </select>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* EVIDENCE LIST */}

      <FadeUp>
        <SectionTitle
          title="Evidence Repository"
          subtitle="Uploaded investigation evidence"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {filteredEvidence.map(
            (item) => (
              <PremiumCard
                key={item.id}
              >
                <h3
                  style={{
                    fontSize:
                      "1.2rem",
                    fontWeight:
                      700,
                  }}
                >
                  {item.type}
                </h3>

                <p
                  style={{
                    color:
                      "#94A3B8",
                    marginTop:
                      "12px",
                  }}
                >
                  {item.summary}
                </p>

                <div
                  style={{
                    marginTop:
                      "16px",
                  }}
                >
                  <span
                    style={{
                      color:
                        "#38BDF8",
                    }}
                  >
                    Case:
                    {" "}
                    {item.caseId}
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
                  <button>
                    View
                  </button>

                  <button>
                    Analyze
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