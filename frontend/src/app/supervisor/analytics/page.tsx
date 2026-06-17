"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function AnalyticsPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [casesRes, evidenceRes] =
        await Promise.all([
          fetch("http://localhost:3001/cases"),
          fetch("http://localhost:3001/evidence"),
        ]);

      const casesData =
        await casesRes.json();

      const evidenceData =
        await evidenceRes.json();

      setCases(casesData);
      setEvidence(evidenceData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white p-8">
        Loading Analytics...
      </div>
    );
  }

  const openCases = cases.filter(
    (c) => c.status === "OPEN"
  ).length;

  const closedCases = cases.filter(
    (c) => c.status === "CLOSED"
  ).length;

  const inProgressCases = cases.filter(
    (c) => c.status === "IN_PROGRESS"
  ).length;

  const imageEvidence = evidence.filter(
    (e) => e.type === "IMAGE"
  ).length;

  const videoEvidence = evidence.filter(
    (e) => e.type === "VIDEO"
  ).length;

  const audioEvidence = evidence.filter(
    (e) => e.type === "AUDIO"
  ).length;

  const netraiReports = evidence.filter(
    (e) => e.videoAnalysis
  ).length;

  const sanketReports = evidence.filter(
    (e) => e.summary
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
          title="Crime Analytics Center"
          subtitle="Investigation insights and intelligence metrics"
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
            Open Cases
          </p>

          <h2
            style={{
              fontSize: "2.8rem",
              color: "#FBBF24",
              marginTop: "10px",
            }}
          >
            {openCases}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            In Progress
          </p>

          <h2
            style={{
              fontSize: "2.8rem",
              color: "#38BDF8",
              marginTop: "10px",
            }}
          >
            {inProgressCases}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Closed Cases
          </p>

          <h2
            style={{
              fontSize: "2.8rem",
              color: "#4ADE80",
              marginTop: "10px",
            }}
          >
            {closedCases}
          </h2>
        </PremiumCard>

        <PremiumCard>
          <p style={{ color: "#94A3B8" }}>
            Total Evidence
          </p>

          <h2
            style={{
              fontSize: "2.8rem",
              color: "#A855F7",
              marginTop: "10px",
            }}
          >
            {evidence.length}
          </h2>
        </PremiumCard>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        <PremiumCard>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Evidence Distribution
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              🖼 Images : {imageEvidence}
            </div>

            <div>
              🎥 Videos : {videoEvidence}
            </div>

            <div>
              🎤 Audio : {audioEvidence}
            </div>
          </div>
        </PremiumCard>

        <PremiumCard>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Intelligence Reports
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              🔍 NETRAI : {netraiReports}
            </div>

            <div>
              🧠 SANKET : {sanketReports}
            </div>
          </div>
        </PremiumCard>
      </div>

      <PremiumCard>
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Investigation Overview
        </h2>

        {cases.slice(0, 6).map((item) => (
          <div
            key={item.id}
            style={{
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,.06)",
            }}
          >
            <h3>{item.title}</h3>

            <p
              style={{
                color: "#94A3B8",
                marginTop: "8px",
              }}
            >
              {item.description?.slice(
                0,
                120
              )}
            </p>

            <p
              style={{
                color: "#38BDF8",
                marginTop: "10px",
              }}
            >
              {item.status}
            </p>
          </div>
        ))}
      </PremiumCard>
    </div>
  );
}