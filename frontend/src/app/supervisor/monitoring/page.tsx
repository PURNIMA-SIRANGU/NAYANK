"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function MonitoringPage() {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMonitoring();
  }, []);

  async function loadMonitoring() {
    try {
      const res = await fetch(
        "https://nayank-backend.onrender.com/evidence"
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
        Loading Monitoring...
      </div>
    );
  }

  const netraiAlerts = evidence.filter(
    (e) => e.videoAnalysis
  );

  const sanketAlerts = evidence.filter(
    (e) => e.summary
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
          title="AI Monitoring Center"
          subtitle="NETRAI + SANKET Intelligence Supervision"
        />
      </FadeUp>

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
            NETRAI Alerts
          </p>

          <h2
            style={{
              fontSize: "2.6rem",
              color: "#06B6D4",
              marginTop: "10px",
            }}
          >
            {netraiAlerts.length}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            SANKET Analyses
          </p>

          <h2
            style={{
              fontSize: "2.6rem",
              color: "#A855F7",
              marginTop: "10px",
            }}
          >
            {sanketAlerts.length}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Evidence Records
          </p>

          <h2
            style={{
              fontSize: "2.6rem",
              color: "#4ADE80",
              marginTop: "10px",
            }}
          >
            {evidence.length}
          </h2>
        </PremiumCard>
      </div>

      <PremiumCard>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "24px",
          }}
        >
          NETRAI Intelligence Feed
        </h2>

        {netraiAlerts.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,.06)",
            }}
          >
            <h3>{item.case?.title}</h3>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <span>
                Persons:
                {" "}
                {
                  item.videoAnalysis
                    ?.persons
                }
              </span>

              <span>
                Vehicles:
                {" "}
                {
                  item.videoAnalysis
                    ?.vehicles
                }
              </span>
            </div>

            <p
              style={{
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {
                item.videoAnalysis
                  ?.summary
              }
            </p>
          </div>
        ))}
      </PremiumCard>

      <PremiumCard>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "24px",
          }}
        >
          SANKET Intelligence Feed
        </h2>

        {sanketAlerts.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,.06)",
            }}
          >
            <h3>{item.case?.title}</h3>

            <p
              style={{
                color: "#CBD5E1",
                marginTop: "12px",
              }}
            >
              {item.summary?.slice(
                0,
                350
              )}
            </p>
          </div>
        ))}
      </PremiumCard>
    </div>
  );
}