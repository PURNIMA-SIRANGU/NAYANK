"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function ReportsPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await fetch("http://localhost:3001/cases");
      const data = await res.json();
      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        Loading Intelligence Reports...
      </div>
    );
  }

  // --- Dynamic Live Metrics From Your State Arrays ---
  const totalCases = cases.length;
  
  const totalEvidence = cases.reduce(
    (sum, item) => sum + (item.evidences?.length || 0),
    0
  );

  const totalInterviews = cases.reduce(
    (sum, item) => sum + (item.interviews?.length || 0),
    0
  );

  const processedVideosCount = cases.flatMap((c: any) => c.evidences || [])
    .filter((e: any) => e.videoAnalysis).length;

  // --- Real-Time Search Filtering ---
  const filteredCases = cases.filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.status?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        backgroundColor: "#060B13",
        color: "#F8FAFC",
        padding: "32px",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* HEADER ROW DESCRIPTION */}
      <FadeUp>
        <SectionTitle
          title="Investigation Records & Reports"
          subtitle="Comprehensive investigation reports generated from cases, evidence, NETRAI and SANKET intelligence."
        />
      </FadeUp>

      {/* TOP METRIC TELEMETRY OVERVIEW PANELS */}
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#2563EB", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Total Cases</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0" }}>{totalCases}</h2>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#38BDF8", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Evidence Records</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0", color: "#38BDF8" }}>{totalEvidence}</h2>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#A855F7", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Interviews</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0", color: "#A855F7" }}>{totalInterviews}</h2>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#4ADE80", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Reports Generated</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0", color: "#4ADE80" }}>{totalCases}</h2>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#0EA5E9", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Processed Videos</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0", color: "#0EA5E9" }}>{processedVideosCount}</h2>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "4px", height: "32px", background: "#22C55E", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Downloadable Reports</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "4px 0 0 0", color: "#22C55E" }}>{totalCases}</h2>
            </div>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* FILTER SEARCH UTILITY INPUT */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "flex-end", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px" }}>
          <input
            type="text"
            placeholder="Search reports by case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "white", padding: "8px 16px", fontSize: "13px", width: "260px", outline: "none" }}
          />
        </div>
      </FadeUp>

      {/* REPORTS LIST TABLE SYSTEM */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Table Labels Row */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr 1fr 1fr 1fr 2fr", padding: "0 24px", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>Case Details</span>
          <span>Date Created</span>
          <span>Evidence</span>
          <span>NETRAI</span>
          <span>SANKET</span>
          <span style={{ textAlign: "right" }}>Available Actions</span>
        </div>

        {filteredCases.length > 0 ? (
          filteredCases.map((item) => {
            const netraiReports = item.evidences?.filter((e: any) => e.videoAnalysis) || [];
            const sanketReports = item.evidences?.filter((e: any) => e.summary) || [];

            return (
              <FadeUp key={item.id}>
                <PremiumCard style={{ padding: "20px 24px", background: "#090F1B", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr 1fr 1fr 1fr 2fr", alignItems: "center" }}>
                    
                    {/* Case Header Info */}
                    <div style={{ paddingRight: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#FFFFFF" }}>{item.title}</h4>
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: item.status === "OPEN" ? "rgba(56,189,248,0.1)" : item.status === "IN_PROGRESS" ? "rgba(251,191,36,0.1)" : "rgba(74,222,128,0.1)",
                          color: item.status === "OPEN" ? "#38BDF8" : item.status === "IN_PROGRESS" ? "#FBBF24" : "#4ADE80"
                        }}>
                          {item.status}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: "#64748B", fontSize: "12px", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.description || "No baseline text description mapped."}
                      </p>
                    </div>

                    {/* Allocation Timestamp */}
                    <div style={{ color: "#94A3B8", fontSize: "13px" }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent Intake"}
                    </div>

                    {/* Evidence Inventory Metrics */}
                    <div style={{ color: "#E2E8F0", fontSize: "14px", fontWeight: 500 }}>
                      {item.evidences?.length || 0}
                    </div>

                    {/* NETRAI Logs Metrics */}
                    <div style={{ color: "#38BDF8", fontSize: "14px", fontWeight: 600 }}>
                      {netraiReports.length}
                    </div>

                    {/* SANKET Logs Metrics */}
                    <div style={{ color: "#A855F7", fontSize: "14px", fontWeight: 600 }}>
                      {sanketReports.length}
                    </div>

                    {/* Action Download Controllers Area */}
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                      <button
                        onClick={() => window.open(`http://localhost:3001/cases/${item.id}/report/pdf`, "_blank")}
                        style={{ border: "none", padding: "8px 12px", borderRadius: "6px", background: "#2563EB", color: "white", fontWeight: 600, fontSize: "11px", cursor: "pointer", transition: "background 0.2s" }}
                      >
                        PDF Report
                      </button>

                      {netraiReports.length > 0 && (
                        <button
                          onClick={() => window.open(`http://localhost:3001/reports/${item.id}/video`, "_blank")}
                          style={{ border: "none", padding: "8px 12px", borderRadius: "6px", background: "#0EA5E9", color: "white", fontWeight: 600, fontSize: "11px", cursor: "pointer", transition: "background 0.2s" }}
                        >
                          Video Download
                        </button>
                      )}

                      <button
                        onClick={() => window.open(`http://localhost:3001/cases/${item.id}/report`, "_blank")}
                        style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "7px 12px", borderRadius: "6px", background: "transparent", color: "#94A3B8", fontWeight: 500, fontSize: "11px", cursor: "pointer", transition: "all 0.2s" }}
                      >
                        Intelligence Log
                      </button>
                    </div>

                  </div>
                </PremiumCard>
              </FadeUp>
            );
          })
        ) : (
          <div style={{ padding: "48px", textAlign: "center", color: "#64748B", background: "#090F1B", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.02)" }}>
            No compiled intelligence data maps to your current search query.
          </div>
        )}
      </div>
    </div>
  );
}