"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function OfficerDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // --- DYNAMIC INDIVIDUAL OFFICER PROFILE STATE ---
  const [officerProfile, setOfficerProfile] = useState<{
    name: string;
    role: string;
    unit: string;
  }>({
    name: "Officer", // Smart fallback until storage hydrates
    role: "Investigation Officer",
    unit: "Crime Investigation Unit"
  });

  useEffect(() => {
    setCurrentTime(new Date());

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Parse the individual authenticated context from local session configurations
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setOfficerProfile({
            name: parsedUser.name || "Officer",
            role: parsedUser.role || "Investigation Officer",
            unit: parsedUser.unit || "Crime Investigation Unit"
          });
        }
      } catch (err) {
        console.error("Failed to parse individual officer profile metadata:", err);
      }
    }

    loadDashboard();

    return () => clearInterval(clockInterval);
  }, []);

  async function loadDashboard() {
    try {
      const [casesRes, evidenceRes] = await Promise.all([
        fetch("http://localhost:3001/cases"),
        fetch("http://localhost:3001/evidence"),
      ]);

      const casesData = await casesRes.json();
      const evidenceData = await evidenceRes.json();

      setCases(casesData);
      setEvidence(evidenceData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // --- Dynamic Metrics Engine ---
  const totalCases = cases.length;
  const totalEvidence = evidence.length;

  const openCasesCount = cases.filter((c) => c.status === "OPEN").length;
  const closedCasesCount = cases.filter((c) => c.status === "CLOSED").length;
  const investigationCount = cases.filter((c) => c.status === "UNDER_INVESTIGATION").length;
  const inProgressCount = cases.filter((c) => c.status === "IN_PROGRESS").length;
  const evidenceCollectedCount = cases.filter((c) => c.status === "EVIDENCE_COLLECTED").length;

  const displayUnderInvestigation = investigationCount || openCasesCount;
  const netraiReports = evidence.filter((e) => e.videoAnalysis).length;
  const sanketReports = evidence.filter((e) => e.summary).length;

  const recentCases = [...cases].reverse().slice(0, 4);
  const recentEvidence = [...evidence].reverse().slice(0, 4);
  const netraiData = evidence.filter((e) => e.videoAnalysis);
  const sanketData = evidence.filter((e) => e.summary);

  const getPercentage = (count: number) => {
    if (totalCases === 0) return "0%";
    return `${((count / totalCases) * 100).toFixed(1)}%`;
  };

  const formattedDate = currentTime
    ? currentTime.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Loading Date...";

  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "Loading Time...";

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh" }}>
        Loading Dashboard Metrics...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        backgroundColor: "#060B13",
        color: "#f8fafc",
        padding: "32px",
        minHeight: "100vh",
        fontFamily: "sans-serif"
      }}
    >
      {/* HEADER BANNER - FEEDS INDIVIDUAL METADATA */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "24px" }}>
          <div>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600, letterSpacing: "1px" }}>GOOD MORNING, OFFICER</p>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", marginTop: "4px" }}>
              Welcome back, {officerProfile.name} 🛡️
            </h1>
            <p style={{ color: "#64748B", fontSize: "14px", marginTop: "4px" }}>
              Logged in under {officerProfile.role} • {officerProfile.unit}
            </p>
          </div>
          <div style={{ display: "flex", gap: "16px", color: "#94A3B8", fontSize: "13px", background: "rgba(15,23,42,0.6)", padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", fontWeight: 500, fontFamily: "monospace" }}>
            <span>📅 {formattedDate}</span>
            <span>⏰ {formattedTime}</span>
          </div>
        </div>
      </FadeUp>

      {/* TOP DYNAMIC HERO METRICS */}
      <FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <PremiumCard style={{ borderLeft: "4px solid #2563EB" }}>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>ASSIGNED CASES</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "12px" }}>{totalCases}</h2>
            <p style={{ color: "#64748B", fontSize: "11px", marginTop: "4px" }}>Active system records</p>
          </PremiumCard>

          <PremiumCard style={{ borderLeft: "4px solid #F59E0B" }}>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>UNDER INVESTIGATION</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "12px", color: "#F59E0B" }}>{displayUnderInvestigation}</h2>
            <p style={{ color: "#64748B", fontSize: "11px", marginTop: "4px" }}>In progress status</p>
          </PremiumCard>

          <PremiumCard style={{ borderLeft: "4px solid #10B981" }}>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>EVIDENCE ITEMS</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "12px" }}>{totalEvidence}</h2>
            <p style={{ color: "#64748B", fontSize: "11px", marginTop: "4px" }}>Total processed assets</p>
          </PremiumCard>

          <PremiumCard style={{ borderLeft: "4px solid #8B5CF6" }}>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>NETRAI REPORTS</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "12px", color: "#A78BFA" }}>{netraiReports}</h2>
            <p style={{ color: "#64748B", fontSize: "11px", marginTop: "4px" }}>Video pipelines</p>
          </PremiumCard>

          <PremiumCard style={{ borderLeft: "4px solid #06B6D4" }}>
            <p style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>SANKET REPORTS</p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "12px", color: "#22D3EE" }}>{sanketReports}</h2>
            <p style={{ color: "#64748B", fontSize: "11px", marginTop: "4px" }}>Audio analytics summaries</p>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* DYNAMIC CASES LIST & OPERATIONAL BREAKDOWN CHART */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        <div style={{ gridColumn: "span 2" }}>
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <SectionTitle title="My Assigned Cases" subtitle="Live state arrays rendered below" />
              <Link href="/officer/cases" style={{ fontSize: "12px", color: "#38BDF8", textDecoration: "none" }}>View All</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentCases.map((item) => (
                <PremiumCard key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ fontSize: "1.5rem", padding: "8px", background: "rgba(255,255,255,0.04)", borderRadius: "10px" }}>💼</div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9" }}>{item.title}</h3>
                      <p style={{ color: "#64748B", fontSize: "11px", marginTop: "2px" }}>ID: {item.caseNumber || `NAYANK-REF-${item.id}`}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <span style={{ color: "#94A3B8", fontSize: "12px" }}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}</span>
                    <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(56,189,248,0.1)", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.2)" }}>
                      {item.status || "ACTIVE"}
                    </span>
                    <Link href={`/officer/cases/${item.id}`}>
                      <button style={{ background: "transparent", border: "none", color: "#38BDF8", cursor: "pointer" }}>→</button>
                    </Link>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </FadeUp>
        </div>

        <div>
          <FadeUp>
            <SectionTitle title="Case Overview" subtitle="Real-time live database percentages" />
            <PremiumCard style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 24px)" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                <div style={{ width: "130px", height: "130px", borderRadius: "50%", border: "10px solid #1e293b", borderTopColor: "#F59E0B", borderRightColor: "#2563EB", borderBottomColor: "#10B981", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: 700 }}>{totalCases}</span>
                  <span style={{ fontSize: "9px", color: "#64748B", textTransform: "uppercase" }}>Total Cases</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px", fontSize: "12px", color: "#94A3B8" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Under Investigation</span><span style={{ color: "white" }}>{displayUnderInvestigation} ({getPercentage(displayUnderInvestigation)})</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>In Progress</span><span style={{ color: "white" }}>{inProgressCount} ({getPercentage(inProgressCount)})</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Evidence Collected</span><span style={{ color: "white" }}>{evidenceCollectedCount} ({getPercentage(evidenceCollectedCount)})</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Closed</span><span style={{ color: "white" }}>{closedCasesCount} ({getPercentage(closedCasesCount)})</span></div>
              </div>
            </PremiumCard>
          </FadeUp>
        </div>
      </div>

      {/* LOWER TRI-GRID CONFIGURATION */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        <div>
          <FadeUp>
            <SectionTitle title="Recent Evidence" subtitle="Dynamic stream array" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentEvidence.map((item) => (
                <PremiumCard key={item.id} style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(56,189,248,0.08)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                      {item.type === "VIDEO" ? "📹" : item.type === "AUDIO" ? "🎵" : "📄"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#60A5FA", margin: 0 }}>{item.type || "UNKNOWN FILE"}</h4>
                      <p style={{ color: "#CBD5E1", fontSize: "11px", margin: "4px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.case?.title || "Associated case profile detached"}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {item.type === "IMAGE" && item.fileUrl && <img src={item.fileUrl} alt="" style={{ width: "100%", borderRadius: "8px", maxHeight: "140px", objectFit: "cover" }} />}
                    {item.type === "VIDEO" && item.fileUrl && <video controls style={{ width: "100%", borderRadius: "8px" }}><source src={item.fileUrl}/></video>}
                    {item.type === "AUDIO" && item.fileUrl && <audio controls style={{ width: "100%" }}><source src={item.fileUrl}/></audio>}
                  </div>
                </PremiumCard>
              ))}
            </div>
          </FadeUp>
        </div>

        <div>
          <FadeUp>
            <SectionTitle title="AI Analysis Summary" subtitle="Active Processing Feeds" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {netraiData.length > 0 ? netraiData.slice(0, 2).map((item) => (
                <PremiumCard key={`netrai-${item.id}`} style={{ borderTop: "2px solid #38BDF8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#94A3B8" }}>{item.case?.title || "Video Stream Target"}</span>
                    <span style={{ fontSize: "10px", background: "rgba(37,99,235,0.15)", color: "#3b82f6", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>NETRAI</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", margin: "8px 0", fontSize: "12px" }}>
                    <div>Persons: <strong>{item.videoAnalysis?.persons || 0}</strong></div>
                    <div>Vehicles: <strong>{item.videoAnalysis?.vehicles || 0}</strong></div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#38BDF8", margin: 0 }}>{item.videoAnalysis?.summary}</p>
                </PremiumCard>
              )) : (
                <p style={{ color: "#64748B", fontSize: "12px" }}>No running NETRAI engine instances detect reports yet.</p>
              )}

              {sanketData.length > 0 ? sanketData.slice(0, 2).map((item) => (
                <PremiumCard key={`sanket-${item.id}`} style={{ borderTop: "2px solid #C084FC" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#94A3B8" }}>Transcript Engine</span>
                    <span style={{ fontSize: "10px", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>SANKET</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#CBD5E1", margin: 0, lineHeight: 1.5 }}>
                    {item.summary?.slice(0, 200)}...
                  </p>
                </PremiumCard>
              )) : (
                <p style={{ color: "#64748B", fontSize: "12px" }}>No running SANKET transcript pipelines detect instances.</p>
              )}
            </div>
          </FadeUp>
        </div>

        <div>
          <FadeUp>
            <SectionTitle title="Pending Actions" subtitle="Operational checklists" />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "rgba(15,23,42,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", fontSize: "12px" }}>
                <div>
                  <p style={{ fontWeight: 600, color: "#f1f5f9", margin: 0 }}>Validate Intake Audit Log</p>
                  <p style={{ color: "#64748B", fontSize: "10px", marginTop: "2px", margin: 0 }}>System auto-evaluation checkpoint</p>
                </div>
                <span style={{ fontSize: "10px", color: "#EF4444", background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: "4px" }}>Urgent</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}