"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const res = await fetch(
        "http://localhost:3001/audit"
      );

      const data = await res.json();

      setLogs(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredLogs =
    logs.filter((log) =>
      log.action
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Audit Logs...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <FadeUp>
        <SectionTitle
          title="Audit Intelligence Center"
          subtitle="Track all system activities and investigations"
        />
      </FadeUp>

      {/* STATS */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p>Total Logs</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#38BDF8",
              }}
            >
              {logs.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Case Activities</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#4ADE80",
              }}
            >
              {
                logs.filter(
                  (l) =>
                    l.action?.includes(
                      "CASE"
                    )
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>Evidence Activities</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#FBBF24",
              }}
            >
              {
                logs.filter(
                  (l) =>
                    l.action?.includes(
                      "EVIDENCE"
                    )
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p>AI Activities</p>

            <h2
              style={{
                fontSize: "2.5rem",
                color: "#C084FC",
              }}
            >
              {
                logs.filter(
                  (l) =>
                    l.action?.includes(
                      "REPORT"
                    )
                ).length
              }
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SEARCH */}

      <FadeUp>
        <PremiumCard>
          <input
            placeholder="Search audit logs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
            }}
          />
        </PremiumCard>
      </FadeUp>

      {/* TIMELINE */}

      <FadeUp>
        <SectionTitle
          title="System Activity Timeline"
          subtitle="Investigation history and actions"
        />

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "16px",
          }}
        >
          {filteredLogs.map(
            (log) => (
              <PremiumCard
                key={log.id}
              >
                <h3
                  style={{
                    color:
                      "#38BDF8",
                  }}
                >
                  {
                    log.action
                  }
                </h3>

                <p
                  style={{
                    marginTop:
                      "8px",
                  }}
                >
                  {
                    log.details
                  }
                </p>

                <div
                  style={{
                    marginTop:
                      "12px",
                    color:
                      "#94A3B8",
                  }}
                >
                  User:
                  {" "}
                  {log.userId}
                </div>

                <div
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Case:
                  {" "}
                  {log.caseId}
                </div>

                <div
                  style={{
                    marginTop:
                      "8px",
                    color:
                      "#64748B",
                  }}
                >
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </div>
              </PremiumCard>
            )
          )}
        </div>
      </FadeUp>
    </div>
  );
}