"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading Evidence...
      </div>
    );
  }

  const totalEvidence = evidence.length;

  const totalImages = evidence.filter(
    (e) => e.type === "IMAGE"
  ).length;

  const totalVideos = evidence.filter(
    (e) => e.type === "VIDEO"
  ).length;

  const totalAudio = evidence.filter(
    (e) => e.type === "AUDIO"
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
          title="Evidence Intelligence Center"
          subtitle="All investigation evidence collected across the NAYANK platform."
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
              Total Evidence
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "10px",
              }}
            >
              {totalEvidence}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Images
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {totalImages}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Videos
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
                marginTop: "10px",
              }}
            >
              {totalVideos}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Audio Files
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#A855F7",
                marginTop: "10px",
              }}
            >
              {totalAudio}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* EVIDENCE LIST */}

      {evidence.map((item) => (
        <FadeUp key={item.id}>
          <PremiumCard>

            {/* HEADER */}

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
                    fontSize: "1.6rem",
                    fontWeight: 700,
                  }}
                >
                  {item.case?.title}
                </h2>

                <p
                  style={{
                    color: "#94A3B8",
                    marginTop: "10px",
                  }}
                >
                  {item.case?.description}
                </p>
              </div>

              <div
                style={{
                  padding:
                    "10px 16px",
                  borderRadius:
                    "14px",
                  background:
                    item.type ===
                    "IMAGE"
                      ? "rgba(56,189,248,.15)"
                      : item.type ===
                        "VIDEO"
                      ? "rgba(74,222,128,.15)"
                      : "rgba(168,85,247,.15)",
                  color:
                    item.type ===
                    "IMAGE"
                      ? "#38BDF8"
                      : item.type ===
                        "VIDEO"
                      ? "#4ADE80"
                      : "#A855F7",
                  fontWeight:
                    600,
                }}
              >
                {item.type}
              </div>
            </div>

            {/* PREVIEW */}

            <div
              style={{
                marginTop: "24px",
              }}
            >
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
                      "20px",
                    maxHeight:
                      "500px",
                    objectFit:
                      "cover",
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
                    borderRadius:
                      "20px",
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
                  }}
                >
                  <source
                    src={
                      item.fileUrl
                    }
                  />
                </audio>
              )}
            </div>

            {/* DETAILS */}

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
                  Case Status
                </p>

                <h3
                  style={{
                    marginTop:
                      "10px",
                  }}
                >
                  {
                    item.case
                      ?.status
                  }
                </h3>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Uploaded On
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

              <PremiumCard>
                <p
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Evidence Type
                </p>

                <h3
                  style={{
                    marginTop:
                      "10px",
                  }}
                >
                  {item.type}
                </h3>
              </PremiumCard>
            </div>

            {/* NETRAI */}

            {item.videoAnalysis && (
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
                        "15px",
                    }}
                  >
                    NETRAI Analysis
                  </h3>

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <p>
                        Persons
                      </p>
                      <h2>
                        {
                          item
                            .videoAnalysis
                            ?.persons
                        }
                      </h2>
                    </div>

                    <div>
                      <p>
                        Vehicles
                      </p>
                      <h2>
                        {
                          item
                            .videoAnalysis
                            ?.vehicles
                        }
                      </h2>
                    </div>

                    <div>
                      <p>
                        Plates
                      </p>
                      <h2>
                        {
                          item
                            .videoAnalysis
                            ?.plates
                        }
                      </h2>
                    </div>
                  </div>

                  <p
                    style={{
                      marginTop:
                        "16px",
                      color:
                        "#CBD5E1",
                    }}
                  >
                    {
                      item
                        .videoAnalysis
                        ?.summary
                    }
                  </p>
                </PremiumCard>
              </div>
            )}

            {/* SANKET */}

            {item.summary && (
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
                        "#A855F7",
                      marginBottom:
                        "15px",
                    }}
                  >
                    SANKET Report
                  </h3>

                  <div
                    style={{
                      maxHeight:
                        "350px",
                      overflowY:
                        "auto",
                      color:
                        "#CBD5E1",
                      lineHeight:
                        1.8,
                      whiteSpace:
                        "pre-wrap",
                    }}
                  >
                    {item.summary}
                  </div>
                </PremiumCard>
              </div>
            )}

          </PremiumCard>
        </FadeUp>
      ))}
    </div>
  );
}