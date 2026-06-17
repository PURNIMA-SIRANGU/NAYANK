"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function NethraiPage() {
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  async function loadAnalysis() {
    try {
      const res = await fetch(
        "http://localhost:3001/evidence"
      );

      const data = await res.json();

      const netraiData = data.filter(
        (item: any) => item.videoAnalysis
      );

      setAnalysis(netraiData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading NETRAI...
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
          title="NETRAI Intelligence Engine"
          subtitle="AI Powered Video Intelligence & Investigation Analysis"
        />
      </FadeUp>

      {analysis.length === 0 && (
        <PremiumCard>
          <h2>No NETRAI Analysis Available</h2>
        </PremiumCard>
      )}

      {analysis.map((item) => (
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
                  Persons Detected
                </p>

                <h2
                  style={{
                    fontSize: "2.4rem",
                    color: "#38BDF8",
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.persons
                  }
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Vehicles Detected
                </p>

                <h2
                  style={{
                    fontSize: "2.4rem",
                    color: "#4ADE80",
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.vehicles
                  }
                </h2>
              </PremiumCard>

              <PremiumCard>
                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Number Plates
                </p>

                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "#FBBF24",
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.plates
                  }
                </h2>
              </PremiumCard>
            </div>

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <PremiumCard>
                <h3
                  style={{
                    marginBottom: "12px",
                    color: "#38BDF8",
                  }}
                >
                  AI Summary
                </h3>

                <p
                  style={{
                    color: "#CBD5E1",
                    lineHeight: 1.8,
                  }}
                >
                  {
                    item.videoAnalysis
                      ?.summary
                  }
                </p>
              </PremiumCard>
            </div>

            {item.type === "VIDEO" && (
              <div
                style={{
                  marginTop: "24px",
                }}
              >
                <video
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <source
                    src={item.fileUrl}
                  />
                </video>
              </div>
            )}
          </PremiumCard>
        </FadeUp>
      ))}
    </div>
  );
}