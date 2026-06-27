"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CaseDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCase();
    }
  }, [id]);

  async function loadCase() {
    try {
      console.log("Loading Case:", id);
      const res = await fetch(`https://nayank-backend.onrender.com/cases/${id}`);
      const result = await res.json();
      console.log("Case Data:", result);
      setData(result);
    } catch (error) {
      console.error("Case Load Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getPriorityColor = (priority: string) => {
    const p = priority?.toUpperCase() || "MEDIUM";
    if (p === "HIGH") return "#EF4444";
    if (p === "LOW") return "#22C55E";
    return "#F59E0B";
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "#94A3B8" }}>Loading Case Record File...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "40px", color: "#EF4444", backgroundColor: "#060B13", minHeight: "100vh", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "16px", fontWeight: 600 }}>Case Record Not Found</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#060B13",
        color: "#F8FAFC",
        padding: "32px",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "28px"
      }}
    >
      {/* HEADER SECTION METADATA CONTROL */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "24px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Case File: {data.caseNumber || `NAYANK-REF-${id}`}
        </span>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#FFFFFF", marginTop: "6px", marginBottom: "0" }}>
          {data.title || "Untitled Incident Case"}
        </h1>
      </div>

      {/* TACTICAL METRIC PARAMS MATRIX ROWS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "start" }}>
        
        {/* Left Area: Summary Meta Descriptions Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", gridColumn: "span 2" }}>
          <div style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "16px", padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#38BDF8", margin: "0 0 16px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "10px" }}>
              Incident Summary & Context
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: "14px", lineHeight: "1.7", margin: 0, whiteSpace: "pre-wrap" }}>
              {data.description || "No narrative details added to the root record."}
            </p>
          </div>
        </div>

        {/* Right Area: Core System Status Sidebar Widget */}
        <div style={{ background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
            System Classification
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "10px" }}>
              <span style={{ color: "#64748B" }}>Investigation Status</span>
              <span style={{ fontWeight: 600, background: "rgba(56, 189, 248, 0.08)", color: "#38BDF8", padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
                {data.status || "ACTIVE"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "10px" }}>
              <span style={{ color: "#64748B" }}>Priority Level</span>
              <span style={{ 
                fontWeight: 600, 
                color: getPriorityColor(data.priority), 
                background: `${getPriorityColor(data.priority)}15`, 
                padding: "4px 12px", 
                borderRadius: "6px" 
              }}>
                {data.priority || "High"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "4px" }}>
              <span style={{ color: "#64748B" }}>Record Created</span>
              <span style={{ color: "#E2E8F0", fontWeight: 500 }}>
                {new Date(data.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ASSET FILE CONTAINER STREAM GRID */}
      <div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "16px" }}>
          Evidence Inventory Assets ({data.evidences?.length || 0})
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {data.evidences?.map((e: any) => (
            <div
              key={e.id}
              style={{
                background: "#090F1B",
                border: "1px solid rgba(255, 255, 255, 0.04)",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#60A5FA", letterSpacing: "0.03em" }}>
                    {e.type || "FILE DATA"}
                  </span>
                  <span style={{ fontSize: "11px", color: "#475569" }}>ID: #{e.id}</span>
                </div>

                {/* CONDITIONAL MEDIA HANDLERS LAYER */}
                {e.type === "IMAGE" && e.fileUrl && (
                  <img
                    src={e.fileUrl}
                    alt="Evidence file snapshot"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      height: "180px",
                      objectFit: "cover",
                      border: "1px solid rgba(255,255,255,0.02)"
                    }}
                  />
                )}

                {e.type === "VIDEO" && e.fileUrl && (
                  <video
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      maxHeight: "180px",
                      background: "black"
                    }}
                  >
                    <source src={e.fileUrl} />
                  </video>
                )}

                {e.type === "AUDIO" && e.fileUrl && (
                  <div style={{ padding: "10px 0" }}>
                    <audio controls style={{ width: "100%" }}>
                      <source src={e.fileUrl} />
                    </audio>
                  </div>
                )}
              </div>

              {/* ACTION ANCHOR AREA */}
              {e.type === "DOCUMENT" && e.fileUrl && (
                <div style={{ padding: "16px 0", textAlign: "center" }}>
                  <a
                    href={e.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      color: "#FFFFFF",
                      background: "#1E3A8A",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "10px 20px",
                      borderRadius: "8px",
                      width: "calc(100% - 40px)",
                      transition: "background 0.2s"
                    }}
                  >
                    Open Document
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}