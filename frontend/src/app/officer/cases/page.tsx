"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "IN_PROGRESS" | "CLOSED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    try {
      const res = await fetch("https://nayank-backend.onrender.com/cases");
      const data = await res.json();
      setCases(data);
    } catch (error) {
      console.error("Error loading case files:", error);
    } finally {
      setLoading(false);
    }
  }

  // --- Dynamic Live Counter Logic ---
  const totalCases = cases.length;
  const pendingAcceptanceCount = cases.filter(
    (item) => item.status === "OPEN" || item.status === "PENDING_ACCEPTANCE"
  ).length;
  const inProgressCount = cases.filter((item) => item.status === "IN_PROGRESS").length;
  const completedCount = cases.filter(
    (item) => item.status === "CLOSED" || item.status === "COMPLETED"
  ).length;

  // --- Dynamic Filtering Engine ---
  const filteredCases = cases.filter((item) => {
    if (activeTab === "IN_PROGRESS" && item.status !== "IN_PROGRESS") return false;
    if (activeTab === "CLOSED" && item.status !== "CLOSED" && item.status !== "COMPLETED") return false;
    if (activeTab === "ALL" && (item.status === "CLOSED" || item.status === "COMPLETED" || item.status === "IN_PROGRESS")) {
      if (item.status !== "OPEN" && item.status !== "PENDING_ACCEPTANCE") return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(query);
      const idMatch = (item.caseNumber || item.id?.toString())?.toLowerCase().includes(query);
      const locationMatch = item.location?.toLowerCase().includes(query);
      return titleMatch || idMatch || locationMatch;
    }

    return true;
  });

  const getPriorityStyles = (priority: string) => {
    const normalize = priority?.toUpperCase() || "MEDIUM";
    if (normalize === "HIGH") return { color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)", dot: "#EF4444" };
    if (normalize === "LOW") return { color: "#22C55E", bg: "rgba(34, 197, 94, 0.1)", dot: "#22C55E" };
    return { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)", dot: "#F59E0B" };
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white", backgroundColor: "#060B13", minHeight: "100vh" }}>
        Loading Assigned Workspaces...
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
      {/* HEADER SECTION */}
      <FadeUp>
        <SectionTitle
          title="Assign Cases"
          subtitle="View and accept cases assigned to you by your supervisor"
        />
      </FadeUp>

      {/* METRIC ANALYTICS HERO CARDS */}
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ padding: "12px", background: "rgba(37, 99, 235, 0.1)", borderRadius: "50%", color: "#2563EB", fontSize: "20px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Total Assigned</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0" }}>{totalCases}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Cases assigned to you</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ padding: "12px", background: "rgba(245, 158, 11, 0.1)", borderRadius: "50%", color: "#F59E0B", fontSize: "20px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Pending Acceptance</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#F59E0B" }}>{pendingAcceptanceCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Awaiting your acceptance</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", color: "#10B981", fontSize: "20px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>In Progress</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#10B981" }}>{inProgressCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Cases in progress</p>
            </div>
          </PremiumCard>

          <PremiumCard style={{ display: "flex", alignItems: "center", gap: "16px", background: "#0B1320", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
            <div style={{ padding: "12px", background: "rgba(139, 92, 246, 0.1)", borderRadius: "50%", color: "#8B5CF6", fontSize: "20px" }}></div>
            <div>
              <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0, fontWeight: 500 }}>Completed</p>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "4px 0 0 0", color: "#8B5CF6" }}>{completedCount}</h2>
              <p style={{ color: "#64748B", fontSize: "11px", margin: "2px 0 0 0" }}>Cases completed</p>
            </div>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* FILTER SEARCH UTILITY ACTIONS HEADER BAR */}
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "4px" }}>
          <div style={{ display: "flex", gap: "28px" }}>
            <span
              onClick={() => setActiveTab("ALL")}
              style={{ fontSize: "14px", fontWeight: activeTab === "ALL" ? 600 : 400, color: activeTab === "ALL" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "ALL" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              New Assignments <span style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px", fontWeight: 700 }}>{pendingAcceptanceCount}</span>
            </span>
            <span
              onClick={() => setActiveTab("IN_PROGRESS")}
              style={{ fontSize: "14px", fontWeight: activeTab === "IN_PROGRESS" ? 600 : 400, color: activeTab === "IN_PROGRESS" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "IN_PROGRESS" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              In Progress <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px", fontWeight: 700 }}>{inProgressCount}</span>
            </span>
            <span
              onClick={() => setActiveTab("CLOSED")}
              style={{ fontSize: "14px", fontWeight: activeTab === "CLOSED" ? 600 : 400, color: activeTab === "CLOSED" ? "#38BDF8" : "#64748B", borderBottom: activeTab === "CLOSED" ? "2px solid #38BDF8" : "none", paddingBottom: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Completed <span style={{ background: "rgba(100, 116, 139, 0.15)", color: "#94A3B8", fontSize: "11px", padding: "2px 6px", borderRadius: "10px", fontWeight: 700 }}>{completedCount}</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Search cases..."
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

      {/* CORE DATAGRID LISTING */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "3.5fr 2fr 2fr 1.2fr 1.5fr 2fr", padding: "0 24px", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>Case Details</span>
          <span>Assigned By</span>
          <span>Date Assigned</span>
          <span>Priority</span>
          <span>Status</span>
          <span style={{ textAlign: "right" }}>Actions</span>
        </div>

        {filteredCases.length > 0 ? (
          filteredCases.map((item) => {
            const priorityStyles = getPriorityStyles(item.priority);
            return (
              <FadeUp key={item.id}>
                <PremiumCard style={{ padding: "16px 24px", background: "#090F1B", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "3.5fr 2fr 2fr 1.2fr 1.5fr 2fr", alignItems: "center" }}>
                    
                    <div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#38BDF8" }}>
                          {item.caseNumber || `CASE-REF-${item.id}`}
                        </h4>
                        <p style={{ margin: "2px 0 0 0", color: "#FFFFFF", fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title || "Untitled Violation"}</p>
                        <p style={{ margin: "2px 0 0 0", color: "#64748B", fontSize: "11px" }}>{item.location || "Location unassigned"}</p>
                      </div>
                    </div>

                    {/* DYNAMICALLY FEEDS FROM YOUR payload 'item.assignedBy' INSIDE THE ROW CONTEXT */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div>
                        <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "#E2E8F0" }}>
                          {item.assignedBy || "System Admin"}
                        </p>
                        <p style={{ margin: 0, fontSize: "11px", color: "#64748B" }}>Supervisor</p>
                      </div>
                    </div>

                    <div style={{ color: "#94A3B8", fontSize: "13px" }}>
                      <p style={{ margin: 0, fontWeight: 500 }}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}</p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748B" }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                      </p>
                    </div>

                    <div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: priorityStyles.color, background: priorityStyles.bg, padding: "3px 10px", borderRadius: "12px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: priorityStyles.dot }}></span>
                        {item.priority || "Medium"}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 500, background: "rgba(245, 158, 11, 0.08)", color: "#F59E0B", padding: "4px 12px", borderRadius: "6px", border: "1px solid rgba(245, 158, 11, 0.15)" }}>
                        {item.status === "OPEN" ? "Pending Acceptance" : item.status}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                      <Link href={`/officer/cases/${item.id}`} style={{ width: "110px" }}>
                        <button style={{ width: "100%", border: "none", padding: "8px 12px", borderRadius: "6px", background: "#2563EB", color: "white", fontWeight: 600, fontSize: "12px", cursor: "pointer", transition: "all 0.15s" }}>
                          Accept Case
                        </button>
                      </Link>
                      <Link href={`/officer/cases/${item.id}`} style={{ textDecoration: "none" }}>
                        <span style={{ fontSize: "12px", color: "#64748B", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          View Details
                        </span>
                      </Link>
                    </div>

                  </div>
                </PremiumCard>
              </FadeUp>
            );
          })
        ) : (
          <div style={{ padding: "48px", textAlign: "center", color: "#64748B", background: "#090F1B", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.02)" }}>
            No incident profiles conform to active query properties.
          </div>
        )}
      </div>

      {/* WORKSPACE ADVISORY NOTE FOOTER */}
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
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#38BDF8", fontWeight: 700 }}>Note:</span>
          Please review case details before accepting. Once accepted, the case will appear in your In Progress list.
        </div>
      </FadeUp>
    </div>
  );
}