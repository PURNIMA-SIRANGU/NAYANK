"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import NayankLoader from "@/components/ui/NayankLoader";

import { getCase } from "@/services/case.services";
import { getCaseEvidence } from "@/services/evidence.services";

export default function ComplaintDetails() {
  const params = useParams();

  const [loading, setLoading] =
    useState(true);

  const [complaint, setComplaint] =
    useState<any>(null);

  const [evidence, setEvidence] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const caseData =
        await getCase(
          params.id as string
        );

      const evidenceData =
        await getCaseEvidence(
          params.id as string
        );

      setComplaint(caseData);
      setEvidence(evidenceData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <NayankLoader />;
  }

  if (!complaint) {
    return null;
  }

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "OPEN":
        return {
          bg: "rgba(59,130,246,.15)",
          color: "#60A5FA",
        };

      case "IN_PROGRESS":
        return {
          bg: "rgba(245,158,11,.15)",
          color: "#FBBF24",
        };

      case "CLOSED":
        return {
          bg: "rgba(34,197,94,.15)",
          color: "#4ADE80",
        };

      default:
        return {
          bg: "rgba(255,255,255,.08)",
          color: "#FFFFFF",
        };
    }
  };

  const status =
    getStatusColor(
      complaint.status
    );

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title={complaint.title}
          subtitle="Investigation Details & Evidence Intelligence"
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard
          style={{
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "flex-start",
              gap: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  marginTop: 0,
                }}
              >
                Complaint Overview
              </h2>

              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: 1.8,
                }}
              >
                {
                  complaint.description
                }
              </p>

              <p
                style={{
                  color: "#64748B",
                }}
              >
                Created:
                {" "}
                {new Date(
                  complaint.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div
              style={{
                padding:
                  "12px 20px",
                borderRadius:
                  "999px",
                background:
                  status.bg,
                color:
                  status.color,
                fontWeight:
                  700,
              }}
            >
              {
                complaint.status
              }
            </div>
          </div>
        </PremiumCard>
      </FadeUp>

      <FadeUp>
        <SectionTitle
          title="Evidence"
          subtitle={`${evidence.length} evidence files attached`}
        />
      </FadeUp>

      {evidence.length === 0 ? (
        <PremiumCard>
          <h3>
            No Evidence Uploaded
          </h3>

          <p
            style={{
              color: "#94A3B8",
            }}
          >
            Upload evidence
            from the Upload
            Evidence page.
          </p>
        </PremiumCard>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {evidence.map(
            (item) => (
              <FadeUp
                key={item.id}
              >
                <PremiumCard>
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      marginBottom:
                        "20px",
                    }}
                  >
                    <h3>
                      {
                        item.type
                      }
                    </h3>

                    <div
                      style={{
                        color:
                          "#60A5FA",
                      }}
                    >
                      AI Ready
                    </div>
                  </div>

                  <a
                    href={
                      item.fileUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color:
                        "#60A5FA",
                    }}
                  >
                    Open Evidence
                  </a>

                  {item.summary && (
                    <PremiumCard
                      style={{
                        marginTop:
                          "20px",
                        background:
                          "rgba(59,130,246,.08)",
                        border:
                          "1px solid rgba(59,130,246,.25)",
                      }}
                    >
                      <h3>
                        AI Analysis
                      </h3>

                      <pre
                        style={{
                          whiteSpace:
                            "pre-wrap",
                          color:
                            "#CBD5E1",
                          fontFamily:
                            "inherit",
                        }}
                      >
                        {
                          item.summary
                        }
                      </pre>
                    </PremiumCard>
                  )}

                  {item.videoAnalysis && (
                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(3,1fr)",
                        gap: "16px",
                        marginTop:
                          "20px",
                      }}
                    >
                      <PremiumCard
                        style={{
                          background:
                            "rgba(59,130,246,.12)",
                          border:
                            "1px solid rgba(59,130,246,.3)",
                        }}
                      >
                        <h4
                          style={{
                            color:
                              "#60A5FA",
                          }}
                        >
                          Persons
                        </h4>

                        <h1>
                          {
                            item
                              .videoAnalysis
                              .persons
                          }
                        </h1>
                      </PremiumCard>

                      <PremiumCard
                        style={{
                          background:
                            "rgba(245,158,11,.12)",
                          border:
                            "1px solid rgba(245,158,11,.3)",
                        }}
                      >
                        <h4
                          style={{
                            color:
                              "#FBBF24",
                          }}
                        >
                          Vehicles
                        </h4>

                        <h1>
                          {
                            item
                              .videoAnalysis
                              .vehicles
                          }
                        </h1>
                      </PremiumCard>

                      <PremiumCard
                        style={{
                          background:
                            "rgba(34,197,94,.12)",
                          border:
                            "1px solid rgba(34,197,94,.3)",
                        }}
                      >
                        <h4
                          style={{
                            color:
                              "#4ADE80",
                          }}
                        >
                          Plates
                        </h4>

                        <p>
                          {
                            item
                              .videoAnalysis
                              .plates
                          }
                        </p>
                      </PremiumCard>
                    </div>
                  )}
                </PremiumCard>
              </FadeUp>
            )
          )}
        </div>
      )}
    </div>
  );
}