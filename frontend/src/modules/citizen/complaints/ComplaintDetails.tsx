"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import NayankLoader from "@/components/ui/NayankLoader";

import {
  getCase,
} from "@/services/case.services";

import {
  getCaseEvidence,
} from "@/services/evidence.services";

export default function ComplaintDetails() {
  const params =
    useParams();

  const [complaint, setComplaint] =
    useState<any>(null);

  const [evidence, setEvidence] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (
      params?.id
    ) {
      loadComplaint();
    }
  }, [params]);

  const loadComplaint =
    async () => {
      try {
        const caseData =
          await getCase(
            params.id as string
          );

        const evidenceData =
          await getCaseEvidence(
            params.id as string
          );

        setComplaint(
          caseData
        );

        setEvidence(
          evidenceData
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  if (loading) {
    return (
      <NayankLoader />
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title={
            complaint.title
          }
          subtitle="Complaint Investigation Details"
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px",
            }}
          >
            <InfoField
              label="Status"
              value={
                complaint.status
              }
            />

            <InfoField
              label="Complaint ID"
              value={
                complaint.id
              }
            />

            <InfoField
              label="Created On"
              value={new Date(
                complaint.createdAt
              ).toLocaleString()}
            />

            <InfoField
              label="Evidence Count"
              value={String(
                evidence.length
              )}
            />
          </div>

          <div
            style={{
              marginTop:
                "25px",
            }}
          >
            <h3>
              Description
            </h3>

            <p
              style={{
                color:
                  "#94A3B8",
                lineHeight:
                  1.8,
              }}
            >
              {
                complaint.description
              }
            </p>
          </div>
        </PremiumCard>
      </FadeUp>

      <FadeUp>
        <PremiumCard
          style={{
            marginTop:
              "20px",
          }}
        >
          <h2>
            Evidence
          </h2>

          {evidence.length ===
          0 ? (
            <p
              style={{
                color:
                  "#94A3B8",
              }}
            >
              No evidence
              uploaded.
            </p>
          ) : (
            <div
              style={{
                display:
                  "grid",
                gap: "20px",
              }}
            >
              {evidence.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.id
                    }
                    style={{
                      padding:
                        "20px",
                      borderRadius:
                        "16px",
                      background:
                        "rgba(255,255,255,.03)",
                      border:
                        "1px solid rgba(255,255,255,.05)",
                    }}
                  >
                    <h3>
                      {
                        item.type
                      }
                    </h3>

                    {item.type ===
                      "IMAGE" && (
                      <img
                        src={
                          item.fileUrl
                        }
                        alt=""
                        style={{
                          width:
                            "100%",
                          borderRadius:
                            "12px",
                          marginTop:
                            "15px",
                        }}
                      />
                    )}

                    {item.type ===
                      "VIDEO" && (
                      <video
                        controls
                        style={{
                          width:
                            "100%",
                          marginTop:
                            "15px",
                          borderRadius:
                            "12px",
                        }}
                      >
                        <source
                          src={
                            item.fileUrl
                          }
                        />
                      </video>
                    )}

                    {item.type ===
                      "AUDIO" && (
                      <audio
                        controls
                        style={{
                          width:
                            "100%",
                          marginTop:
                            "15px",
                        }}
                      >
                        <source
                          src={
                            item.fileUrl
                          }
                        />
                      </audio>
                    )}

                    <div
                      style={{
                        marginTop:
                          "20px",
                      }}
                    >
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
                        Open Original
                        Evidence
                      </a>
                    </div>

                    {item.summary && (
                      <div
                        style={{
                          marginTop:
                            "20px",
                        }}
                      >
                        <h4>
                          AI Analysis
                        </h4>

                        <pre
                          style={{
                            whiteSpace:
                              "pre-wrap",
                            color:
                              "#94A3B8",
                          }}
                        >
                          {
                            item.summary
                          }
                        </pre>
                      </div>
                    )}

                    {item.videoAnalysis && (
                      <div
                        style={{
                          marginTop:
                            "20px",
                        }}
                      >
                        <h4>
                          Video Analysis
                        </h4>

                        <p>
                          Persons:
                          {" "}
                          {
                            item
                              .videoAnalysis
                              .persons
                          }
                        </p>

                        <p>
                          Vehicles:
                          {" "}
                          {
                            item
                              .videoAnalysis
                              .vehicles
                          }
                        </p>

                        <p>
                          Plates:
                          {" "}
                          {
                            item
                              .videoAnalysis
                              .plates
                          }
                        </p>

                        <p>
                          Summary:
                          {" "}
                          {
                            item
                              .videoAnalysis
                              .summary
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </PremiumCard>
      </FadeUp>
    </div>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius:
          "16px",
        background:
          "rgba(255,255,255,.03)",
      }}
    >
      <p
        style={{
          color:
            "#94A3B8",
          marginBottom:
            "8px",
        }}
      >
        {label}
      </p>

      <strong>
        {value}
      </strong>
    </div>
  );
}