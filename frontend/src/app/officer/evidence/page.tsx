"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadEvidence();
  }, []);

  async function loadEvidence() {
    try {
      const res = await fetch("https://nayank-backend.onrender.com/evidence");
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
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        Loading Evidence Repository...
      </div>
    );
  }

  // --- Live Dynamic Arrays Logic ---
  const totalEvidence = evidence.length;
  const totalImages = evidence.filter((e) => e.type === "IMAGE").length;
  const totalVideos = evidence.filter((e) => e.type === "VIDEO").length;
  const totalAudio = evidence.filter((e) => e.type === "AUDIO").length;
  const totalDocuments = evidence.filter((e) => e.type === "DOCUMENT").length;

  // Real-time processed vs pending metrics mapped dynamically off existence of data analysis structures
  const processedCount = evidence.filter((e) => e.videoAnalysis || e.summary).length;
  const processingCount = totalEvidence - processedCount;

  // --- Filtering & Query Logic ---
  const filteredEvidence = evidence.filter((item) => {
    if (activeTab !== "ALL" && item.type !== activeTab) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const caseMatch = item.case?.title?.toLowerCase().includes(query);
      const caseDescMatch = item.case?.description?.toLowerCase().includes(query);
      const typeMatch = item.type?.toLowerCase().includes(query);
      const fileMatch = item.fileUrl?.toLowerCase().includes(query);
      return caseMatch || caseDescMatch || typeMatch || fileMatch;
    }
    return true;
  });

  const getTypeStyles = (type: string) => {
    const t = type?.toUpperCase();
    if (t === "VIDEO") return { color: "#A855F7", bg: "rgba(168, 85, 247, 0.12)" };
    if (t === "AUDIO") return { color: "#EC4899", bg: "rgba(236, 72, 153, 0.12)" };
    if (t === "IMAGE") return { color: "#38BDF8", bg: "rgba(56, 189, 248, 0.12)" };
    return { color: "#22C55E", bg: "rgba(34, 197, 94, 0.12)" };
  };

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
          title="Evidence Management"
          subtitle="Upload, manage and analyze case evidence"
        />
      </FadeUp>

      {/* TOP METRIC TELEMETRY OVERVIEW PANELS */}
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "8px", height: "32px", background: "#2563EB", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Total Evidence</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0" }}>{totalEvidence}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Files uploaded</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "8px", height: "32px", background: "#22C55E", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Processed</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#22C55E" }}>{processedCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Evidence processed</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "8px", height: "32px", background: "#F59E0B", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Processing</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#F59E0B" }}>{processingCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>In progress</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ width: "8px", height: "32px", background: "#6366F1", borderRadius: "4px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Archived</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#6366F1" }}>0</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Evidence archived</p>
            </div>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* FILTER CONTROLS SEGMENT BAR */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            <span
              onClick={() => setActiveTab("ALL")}
              style={{ fontSize: "14px", fontWeight: activeTab === "ALL" ? 600 : 400, color: activeTab === "ALL" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "ALL" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer" }}
            >
              All Evidence
            </span>
            <span
              onClick={() => setActiveTab("IMAGE")}
              style={{ fontSize: "14px", fontWeight: activeTab === "IMAGE" ? 600 : 400, color: activeTab === "IMAGE" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "IMAGE" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Images <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px" }}>{totalImages}</span>
            </span>
            <span
              onClick={() => setActiveTab("VIDEO")}
              style={{ fontSize: "14px", fontWeight: activeTab === "VIDEO" ? 600 : 400, color: activeTab === "VIDEO" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "VIDEO" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Videos <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px" }}>{totalVideos}</span>
            </span>
            <span
              onClick={() => setActiveTab("AUDIO")}
              style={{ fontSize: "14px", fontWeight: activeTab === "AUDIO" ? 600 : 400, color: activeTab === "AUDIO" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "AUDIO" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Audio <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px" }}>{totalAudio}</span>
            </span>
            <span
              onClick={() => setActiveTab("DOCUMENT")}
              style={{ fontSize: "14px", fontWeight: activeTab === "DOCUMENT" ? 600 : 400, color: activeTab === "DOCUMENT" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "DOCUMENT" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Documents <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px" }}>{totalDocuments}</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "white", padding: "8px 16px", fontSize: "13px", width: "220px", outline: "none" }}
            />
            <button style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", color: "#94A3B8", padding: "8px 16px", fontSize: "13px", cursor: "pointer" }}>
              Filter
            </button>
          </div>
        </div>
      </FadeUp>

      {/* GRID CONTAINER FOR INVENTORY LISTINGS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {/* Row Header Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 1.5fr 1.2fr 1fr 1.5fr", padding: "0 24px", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>Evidence Details</span>
          <span>Case Details</span>
          <span>Uploaded On</span>
          <span>Type</span>
          <span>Status</span>
          <span style={{ textAlign: "right" }}>Actions</span>
        </div>

        {/* Dynamic Items Row Grid Mapping */}
        {filteredEvidence.length > 0 ? (
          filteredEvidence.map((item) => {
            const typeStyles = getTypeStyles(item.type);
            const isProcessed = !!(item.videoAnalysis || item.summary);

            return (
              <FadeUp key={item.id}>
                <PremiumCard style={{ padding: "16px 24px", background: "#090F1B", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 1.5fr 1.2fr 1fr 1.5fr", alignItems: "center" }}>
                    
                    {/* Column 1: Evidence File Info */}
                    <div style={{ paddingRight: "16px" }}>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.type || "DATA"}_Asset_Ref_{item.id}.{item.type === "VIDEO" ? "mp4" : item.type === "AUDIO" ? "m4a" : "dat"}
                      </p>
                      <p style={{ margin: "4px 0 0 0", color: "#64748B", fontSize: "12px", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.case?.description || "No file description details found."}
                      </p>
                    </div>

                    {/* Column 2: Parent Case Link Details */}
                    <div style={{ paddingRight: "16px" }}>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#38BDF8" }}>
                        CASE-REF-0{item.case?.id || item.id}
                      </p>
                      <p style={{ margin: "2px 0 0 0", color: "#94A3B8", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.case?.title || "Detached Case Context"}
                      </p>
                    </div>

                    {/* Column 3: Upload Time */}
                    <div style={{ color: "#94A3B8", fontSize: "13px" }}>
                      <p style={{ margin: 0, fontWeight: 500 }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                      </p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748B" }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "10:30 AM"}
                      </p>
                    </div>

                    {/* Column 4: Category Data Badge Tag */}
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: typeStyles.color, background: typeStyles.bg, padding: "4px 10px", borderRadius: "6px", textTransform: "capitalize" }}>
                        {item.type || "File"}
                      </span>
                    </div>

                    {/* Column 5: Pipeline Core Status State */}
                    <div>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: isProcessed ? "#22C55E" : "#F59E0B",
                        background: isProcessed ? "rgba(34, 197, 94, 0.08)" : "rgba(245, 158, 11, 0.08)",
                        padding: "4px 10px",
                        borderRadius: "6px"
                      }}>
                        {isProcessed ? "Processed" : "Processing"}
                      </span>
                    </div>

                    {/* Column 6: Action Targets Links */}
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                      {item.fileUrl && (
                        <a href={item.fileUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                          <button style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "6px 12px", borderRadius: "6px", background: "transparent", color: "#94A3B8", fontSize: "12px", cursor: "pointer", transition: "all 0.15s" }}>
                            View Asset
                          </button>
                        </a>
                      )}
                    </div>

                  </div>
                </PremiumCard>
              </FadeUp>
            );
          })
        ) : (
          <div style={{ padding: "48px", textAlign: "center", color: "#64748B", background: "#090F1B", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.02)" }}>
            No loaded evidence files match the filter settings.
          </div>
        )}
      </div>

      {/* ADVISORY FOOTER */}
      <FadeUp>
        <div
          style={{
            marginTop: "12px",
            padding: "14px 20px",
            background: "rgba(56, 189, 248, 0.02)",
            border: "1px solid rgba(56, 189, 248, 0.12)",
            borderRadius: "12px",
            fontSize: "12px",
            color: "#94A3B8",
          }}
        >
          Securely store and manage all types of digital evidence. All active database entries are fully synchronized and tracked inside the core intelligence infrastructure log.
        </div>
      </FadeUp>
    </div>
  );
}