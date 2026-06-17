"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function SanketPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await fetch(
        "http://localhost:3001/evidence"
      );

      const data = await res.json();

      const sanketData = data.filter(
        (item: any) => item.summary
      );

      setReports(sanketData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading SANKET...
      </div>
    );
  }

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
          title="SANKET Intelligence Engine"
          subtitle="Speech Intelligence, Transcript Analysis & AI Summarization"
        />
      </FadeUp>

      {reports.length === 0 && (
        <PremiumCard>
          <h2>No SANKET Reports Available</h2>
        </PremiumCard>
      )}

      {reports.map((item) => (
        <FadeUp key={item.id}>
          <PremiumCard>

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

            {/* AUDIO PLAYER */}

            {item.type === "AUDIO" && (
              <div
                style={{
                  marginTop: "24px",
                }}
              >
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
              </div>
            )}

            {/* ANALYTICS */}

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
                    color: "#94A3B8",
                  }}
                >
                  Report Type
                </p>

                <h2
                  style={{
                    fontSize: "1.4rem",
                    color: "#A855F7",
                  }}
                >
                  Transcript
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Language
                </p>

                <h2
                  style={{
                    fontSize: "1.4rem",
                    color: "#38BDF8",
                  }}
                >
                  English
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Generated On
                </p>

                <h2
                  style={{
                    fontSize: "1rem",
                    color: "#4ADE80",
                  }}
                >
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </h2>
              </PremiumCard>
            </div>

            {/* TRANSCRIPT + SUMMARY */}

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <PremiumCard>
                <h3
                  style={{
                    marginBottom: "12px",
                    color: "#A855F7",
                  }}
                >
                  SANKET Intelligence Report
                </h3>

                <div
                  style={{
                    color: "#CBD5E1",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  {item.summary}
                </div>
              </PremiumCard>
            </div>

          </PremiumCard>
        </FadeUp>
      ))}
    </div>
  );
}