"use client";

import { useEffect, useState } from "react";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { getUserCases } from "@/services/case.services";

export default function MyComplaints() {
  const [cases, setCases] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const userId =
        localStorage.getItem(
          "userId"
        );

      if (!userId) return;

      const data =
        await getUserCases(
          userId
        );

      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "OPEN":
        return {
          bg: "rgba(59,130,246,.15)",
          color: "#60A5FA",
        };

      case "IN_PROGRESS":
        return {
          bg: "rgba(245,158,11,.15)",
          color: "#FBBF24",
        };

      case "CLOSED":
        return {
          bg: "rgba(34,197,94,.15)",
          color: "#4ADE80",
        };

      default:
        return {
          bg: "rgba(255,255,255,.08)",
          color: "#FFFFFF",
        };
    }
  };

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="My Complaints"
          subtitle="Track all incidents submitted through NAYANK."
        />
      </FadeUp>

      {loading ? (
        <PremiumCard>
          Loading complaints...
        </PremiumCard>
      ) : cases.length === 0 ? (
        <PremiumCard>
          <h2>
            No Complaints Yet
          </h2>

          <p
            style={{
              color:
                "#94A3B8",
            }}
          >
            Submit your first
            incident from Report
            Incident.
          </p>
        </PremiumCard>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {cases.map(
            (item) => {
              const status =
                getStatusColor(
                  item.status
                );

              return (
                <FadeUp
                  key={item.id}
                >
                  <PremiumCard>
                    <div
                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "flex-start",
                      }}
                    >
                      <div>
                        <h2
                          style={{
                            marginTop: 0,
                          }}
                        >
                          {
                            item.title
                          }
                        </h2>

                        <p
                          style={{
                            color:
                              "#94A3B8",

                            lineHeight:
                              1.7,
                          }}
                        >
                          {
                            item.description
                          }
                        </p>

                        <small
                          style={{
                            color:
                              "#64748B",
                          }}
                        >
                          Created:
                          {" "}
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </small>
                      </div>

                      <div
                        style={{
                          padding:
                            "10px 18px",

                          borderRadius:
                            "999px",

                          background:
                            status.bg,

                          color:
                            status.color,

                          fontWeight:
                            600,
                        }}
                      >
                        {
                          item.status
                        }
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop:
                          "20px",

                        display:
                          "flex",

                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          padding:
                            "8px 14px",

                          borderRadius:
                            "12px",

                          background:
                            "rgba(255,255,255,.04)",
                        }}
                      >
                        Evidence:
                        {" "}
                        {item
                          .evidences
                          ?.length ||
                          0}
                      </div>
                    </div>
                  </PremiumCard>
                </FadeUp>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}