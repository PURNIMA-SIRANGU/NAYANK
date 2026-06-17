"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NayankLoader from "@/components/ui/NayankLoader";
import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { getUserCases } from "@/services/case.services";

export default function MyComplaints() {
  const router = useRouter();

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

  if (loading) {
    return <NayankLoader />;
  }

  const openCases =
    cases.filter(
      (c) => c.status === "OPEN"
    ).length;

  const reviewCases =
    cases.filter(
      (c) =>
        c.status ===
        "IN_PROGRESS"
    ).length;

  const closedCases =
    cases.filter(
      (c) =>
        c.status === "CLOSED"
    ).length;

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="My Complaints"
          subtitle="Track and monitor all submitted incidents."
        />
      </FadeUp>

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <PremiumCard
            style={{
              background:
                "rgba(139,92,246,.12)",
              border:
                "1px solid rgba(139,92,246,.35)",
            }}
          >
            <h3
              style={{
                color: "#A78BFA",
              }}
            >
              Total Complaints
            </h3>

            <h1
              style={{
                color: "#A78BFA",
                margin: 0,
              }}
            >
              {cases.length}
            </h1>
          </PremiumCard>

          <PremiumCard
            style={{
              background:
                "rgba(59,130,246,.12)",
              border:
                "1px solid rgba(59,130,246,.35)",
            }}
          >
            <h3
              style={{
                color: "#60A5FA",
              }}
            >
              Open
            </h3>

            <h1
              style={{
                color: "#60A5FA",
                margin: 0,
              }}
            >
              {openCases}
            </h1>
          </PremiumCard>

          <PremiumCard
            style={{
              background:
                "rgba(245,158,11,.12)",
              border:
                "1px solid rgba(245,158,11,.35)",
            }}
          >
            <h3
              style={{
                color: "#FBBF24",
              }}
            >
              Under Review
            </h3>

            <h1
              style={{
                color: "#FBBF24",
                margin: 0,
              }}
            >
              {reviewCases}
            </h1>
          </PremiumCard>

          <PremiumCard
            style={{
              background:
                "rgba(34,197,94,.12)",
              border:
                "1px solid rgba(34,197,94,.35)",
            }}
          >
            <h3
              style={{
                color: "#4ADE80",
              }}
            >
              Resolved
            </h3>

            <h1
              style={{
                color: "#4ADE80",
                margin: 0,
              }}
            >
              {closedCases}
            </h1>
          </PremiumCard>
        </div>
      </FadeUp>

      {cases.length === 0 ? (
        <PremiumCard>
          <div
            style={{
              textAlign:
                "center",
              padding:
                "60px 20px",
            }}
          >
            <h2>
              No Complaints Found
            </h2>

            <p
              style={{
                color:
                  "#94A3B8",
              }}
            >
              Your submitted
              incidents will
              appear here.
            </p>
          </div>
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
                  <PremiumCard
                    style={{
                      cursor:
                        "pointer",
                    }}
                  >
                    <div
                      onClick={() =>
                        router.push(
                          `/citizen/my-complaints/${item.id}`
                        )
                      }
                    >
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

                        <div
                          style={{
                            padding:
                              "8px 14px",

                            borderRadius:
                              "12px",

                            background:
                              "rgba(96,165,250,.08)",

                            color:
                              "#60A5FA",
                          }}
                        >
                          View Details →
                        </div>
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