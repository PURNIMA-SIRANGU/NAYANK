"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function NethraiPage() {
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "PROCESSED" | "PENDING">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAnalysis();
  }, []);

  async function loadAnalysis() {
    try {
      const res = await fetch("https://nayank-backend.onrender.com/evidence");
      const data = await res.json();

      // Focusing strictly on your original filtering logic
      const netraiData = data.filter((item: any) => item.videoAnalysis);
      setAnalysis(netraiData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // --- Core State Logic Counters ---
  const totalItems = analysis.length;
  const processedCount = analysis.filter((item) => item.videoAnalysis?.summary).length;
  const pendingCount = totalItems - processedCount;

  // --- Pure Data Array Filtering ---
  const filteredAnalysis = analysis.filter((item) => {
    if (activeTab === "PROCESSED" && !item.videoAnalysis?.summary) return false;
    if (activeTab === "PENDING" && item.videoAnalysis?.summary) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = item.case?.title?.toLowerCase().includes(query);
      const descMatch = item.case?.description?.toLowerCase().includes(query);
      const summaryMatch = item.videoAnalysis?.summary?.toLowerCase().includes(query);
      return titleMatch || descMatch || summaryMatch;
    }
    return true;
  });

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        Loading Analysis Platform...
      </div>
    );
  }

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
      {/* HEADER TITLE */}
      <FadeUp>
        <SectionTitle
          title="NETRAI Intelligence Engine"
          subtitle="AI Powered Video Intelligence & Investigation Analysis"
        />
      </FadeUp>

      {/* METRICS STATS TILES */}
      <FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#8B5CF6", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Total Video Records</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0" }}>{totalItems}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Across all data entries</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#22C55E", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Analysis Completed</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#22C55E" }}>{processedCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Summaries generated</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#F59E0B", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Queue Pending</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#F59E0B" }}>{pendingCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Awaiting pipeline compilation</p>
            </div>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* FILTER SEARCH ACTIONS HEADER BAR */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            <span
              onClick={() => setActiveTab("ALL")}
              style={{ fontSize: "14px", fontWeight: activeTab === "ALL" ? 600 : 400, color: activeTab === "ALL" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "ALL" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              All Analysis
            </span>
            <span
              onClick={() => setActiveTab("PROCESSED")}
              style={{ fontSize: "14px", fontWeight: activeTab === "PROCESSED" ? 600 : 400, color: activeTab === "PROCESSED" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "PROCESSED" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              Processed Logs ({processedCount})
            </span>
            <span
              onClick={() => setActiveTab("PENDING")}
              style={{ fontSize: "14px", fontWeight: activeTab === "PENDING" ? 600 : 400, color: activeTab === "PENDING" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "PENDING" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              In Queue ({pendingCount})
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Filter by case info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "white", padding: "8px 16px", fontSize: "13px", width: "220px", outline: "none" }}
            />
          </div>
        </div>
      </FadeUp>

      {/* RENDER DATAGRID LISTING */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredAnalysis.length > 0 ? (
          filteredAnalysis.map((item) => (
            <FadeUp key={item.id}>
              <PremiumCard style={{ padding: "24px", background: "#090F1B", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <span style={{ fontSize: "11px", background: "rgba(56,189,248,0.1)", color: "#38BDF8", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, textTransform: "uppercase" }}>
                      Pipeline Instance: ID {item.id}
                    </span>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "8px 0 4px 0", color: "#FFFFFF" }}>
                      {item.case?.title || "Untitled Incident Case"}
                    </h2>
                    <p style={{ color: "#94A3B8", fontSize: "13px", margin: 0 }}>
                      {item.case?.description || "No baseline text description mapped."}
                    </p>
                  </div>

                  <div style={{ fontSize: "12px", color: "#64748B", textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>Uploaded on:</p>
                    <p style={{ margin: "4px 0 0 0", color: "#94A3B8", fontFamily: "monospace" }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Recent Intake"}
                    </p>
                  </div>
                </div>

                {/* TELEMETRY READOUT METRICS */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "20px" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#64748B", fontSize: "12px", display: "block" }}>Persons Tracked</span>
                    <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#38BDF8", display: "block", marginTop: "4px" }}>
                      {item.videoAnalysis?.persons ?? 0}
                    </span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#64748B", fontSize: "12px", display: "block" }}>Vehicles Cataloged</span>
                    <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#4ADE80", display: "block", marginTop: "4px" }}>
                      {item.videoAnalysis?.vehicles ?? 0}
                    </span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#64748B", fontSize: "12px", display: "block" }}>License Plates Captured</span>
                    <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#FBBF24", display: "block", marginTop: "4px" }}>
                      {item.videoAnalysis?.plates ?? 0}
                    </span>
                  </div>
                </div>

                {/* NARRATIVE INSIGHT SUMMARY BLOCK */}
                {item.videoAnalysis?.summary && (
                  <div style={{ marginTop: "20px", background: "rgba(56, 189, 248, 0.02)", border: "1px solid rgba(56, 189, 248, 0.1)", borderRadius: "10px", padding: "16px" }}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#38BDF8", fontWeight: 600, textTransform: "uppercase", }}>
                      NERTAI Summary Engine Analysis
                    </h3>
                    <p style={{ margin: 0, color: "#E2E8F0", fontSize: "13px", lineHeight: "1.6" }}>
                      {item.videoAnalysis.summary}
                    </p>
                  </div>
                )}

                {/* NATIVE RENDER RUNTIME VIDEO INTAKE CHANNEL */}
                {item.type === "VIDEO" && item.fileUrl && (
                  <div style={{ marginTop: "20px" }}>
                    <video controls style={{ width: "100%", borderRadius: "10px", maxHeight: "360px", background: "black" }}>
                      <source src={item.fileUrl} />
                    </video>
                  </div>
                )}

                {/* REDIRECT ACTION LINK TRIGGER */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                  <Link href={`/officer/cases/${item.case?.id || item.id}`}>
                    <button style={{ border: "none", padding: "10px 20px", borderRadius: "6px", background: "#2563EB", color: "white", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
                      View Master Investigation File Base
                    </button>
                  </Link>
                </div>

              </PremiumCard>
            </FadeUp>
          ))
        ) : (
          <div style={{ padding: "48px", textAlign: "center", color: "#64748B", background: "#090F1B", borderRadius: "16px" }}>
            No recorded analysis structures match core string params query properties.
          </div>
        )}
      </div>
    </div>
  );
}