"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function SanketPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "AUDIO" | "VIDEO">("ALL");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await fetch("http://localhost:3001/evidence");
      const data = await res.json();

      // Preserving your exact filtering predicate condition
      const sanketData = data.filter((item: any) => item.summary);
      setReports(sanketData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // --- Dynamic Telemetry Counters ---
  const totalReportsCount = reports.length;
  const audioReportsCount = reports.filter((item) => item.type === "AUDIO").length;
  const videoReportsCount = reports.filter((item) => item.type === "VIDEO").length;

  // --- Real-time Local String Search Match ---
  const filteredReports = reports.filter((item) => {
    if (activeTab === "AUDIO" && item.type !== "AUDIO") return false;
    if (activeTab === "VIDEO" && item.type !== "VIDEO") return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = item.case?.title?.toLowerCase().includes(query);
      const descMatch = item.case?.description?.toLowerCase().includes(query);
      const summaryMatch = item.summary?.toLowerCase().includes(query);
      return titleMatch || descMatch || summaryMatch;
    }
    return true;
  });

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        Loading SANKET Acoustic Pipeline...
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
      {/* SECTION BANNER TITLE */}
      <FadeUp>
        <SectionTitle
          title="SANKET Intelligence Engine"
          subtitle="Speech Intelligence, Transcript Analysis & AI Summarization"
        />
      </FadeUp>

      {/* SYSTEM SUMMARY METRIC CARDS */}
      <FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#A855F7", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Total Speech Reports</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0" }}>{totalReportsCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Across verified intakes</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#EC4899", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Audio Transcripts</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#EC4899" }}>{audioReportsCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Acoustic signals processed</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "6px", height: "32px", background: "#38BDF8", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Video Audio Signals</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#38BDF8" }}>{videoReportsCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Extracted video soundscapes</p>
            </div>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* FILTER SEARCH UTILITY ACTIONS HEADER BAR */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            <span
              onClick={() => setActiveTab("ALL")}
              style={{ fontSize: "14px", fontWeight: activeTab === "ALL" ? 600 : 400, color: activeTab === "ALL" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "ALL" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              All Transcripts
            </span>
            <span
              onClick={() => setActiveTab("AUDIO")}
              style={{ fontSize: "14px", fontWeight: activeTab === "AUDIO" ? 600 : 400, color: activeTab === "AUDIO" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "AUDIO" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              Audio Files ({audioReportsCount})
            </span>
            <span
              onClick={() => setActiveTab("VIDEO")}
              style={{ fontSize: "14px", fontWeight: activeTab === "VIDEO" ? 600 : 400, color: activeTab === "VIDEO" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "VIDEO" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              Video Streams ({videoReportsCount})
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Filter by case keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "white", padding: "8px 16px", fontSize: "13px", width: "220px", outline: "none" }}
            />
          </div>
        </div>
      </FadeUp>

      {/* CORE REPORTS CONTAINER MAP */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredReports.length > 0 ? (
          filteredReports.map((item) => (
            <FadeUp key={item.id}>
              <PremiumCard style={{ padding: "24px", background: "#090F1B", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <span style={{ fontSize: "11px", background: "rgba(168, 85, 247, 0.1)", color: "#A855F7", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, textTransform: "uppercase" }}>
                      Acoustic Log: Entry {item.id}
                    </span>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "8px 0 4px 0", color: "#FFFFFF" }}>
                      {item.case?.title || "Untitled Master Incident"}
                    </h2>
                    <p style={{ color: "#94A3B8", fontSize: "13px", margin: 0 }}>
                      {item.case?.description || "No supplemental case descriptive parameters mapped."}
                    </p>
                  </div>

                  <div style={{ fontSize: "12px", color: "#64748B", textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>Acoustic Intake Date:</p>
                    <p style={{ margin: "4px 0 0 0", color: "#94A3B8", fontFamily: "monospace" }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Recent Data Stream"}
                    </p>
                  </div>
                </div>

                {/* TELEMETRY READOUT INFO SUMMARY ROW */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "20px" }}>
                  <div style={{ background: "rgba(255,255,255,0.01)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#64748B", fontSize: "12px" }}>Input Interface Type</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#A855F7", display: "block", marginTop: "4px" }}>
                      {item.type || "AUDIO"} Source Line
                    </span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.01)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "#64748B", fontSize: "12px" }}>Case Workflow State</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#4ADE80", display: "block", marginTop: "4px" }}>
                      {item.case?.status || "UNDER_INVESTIGATION"}
                    </span>
                  </div>
                </div>

                {/* AUDIO CONTROLS PLAYER TRIGGER */}
                {item.type === "AUDIO" && item.fileUrl && (
                  <div style={{ marginTop: "20px", background: "rgba(255,255,255,0.01)", padding: "12px", borderRadius: "10px" }}>
                    <audio controls style={{ width: "100%" }}>
                      <source src={item.fileUrl} />
                    </audio>
                  </div>
                )}

                {/* COMPRESSED NATURAL NARRATIVE REPORT READOUT */}
                <div style={{ marginTop: "20px" }}>
                  <PremiumCard style={{ background: "#0B1320", border: "1px solid rgba(255,255,255,0.04)", padding: "16px" }}>
                    <h3 style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#A855F7", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                      SANKET Speech Synthesis & Semantic Analysis Report
                    </h3>
                    <div style={{ color: "#CBD5E1", fontSize: "13px", lineHeight: "1.7", whiteSpace: "pre-wrap", maxHeight: "300px", overflowY: "auto", paddingRight: "8px" }}>
                      {item.summary}
                    </div>
                  </PremiumCard>
                </div>

              </PremiumCard>
            </FadeUp>
          ))
        ) : (
          <div style={{ padding: "48px", textAlign: "center", color: "#64748B", background: "#090F1B", borderRadius: "16px" }}>
            No recorded speech processing arrays reflect active layout search properties.
          </div>
        )}
      </div>
    </div>
  );
}