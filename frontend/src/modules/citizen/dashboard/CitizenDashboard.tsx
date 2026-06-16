"use client";

import { useEffect, useState } from "react";
import NayankLoader from "@/components/ui/NayankLoader";
import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CitizenDashboard() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

 if (!user) {
  return <NayankLoader />;
}
  const complaints = [
    {
      id: "NAY-001",
      status: "Under Review",
      date: "15 Jun 2026",
    },
    {
      id: "NAY-002",
      status: "Open",
      date: "13 Jun 2026",
    },
    {
      id: "NAY-003",
      status: "Resolved",
      date: "10 Jun 2026",
    },
  ];

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title={`Welcome Back, ${user.name}`}
          subtitle="Your citizen investigation workspace is active."
        />
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <FadeUp>
          <PremiumCard
            style={{
              background:
                "rgba(139,92,246,.12)",

              border:
                "1px solid rgba(139,92,246,.35)",
            }}
          >
            <p
              style={{
                color:
                  "#A78BFA",
                marginBottom:
                  "10px",
              }}
            >
              Total Complaints
            </p>

            <h1
              style={{
                color:
                  "#A78BFA",
                fontSize:
                  "3rem",
                margin: 0,
              }}
            >
              12
            </h1>

            <small
              style={{
                color:
                  "#C4B5FD",
              }}
            >
              +2 this month
            </small>
          </PremiumCard>
        </FadeUp>

        <FadeUp>
          <PremiumCard
            style={{
              background:
                "rgba(59,130,246,.12)",

              border:
                "1px solid rgba(59,130,246,.35)",
            }}
          >
            <p
              style={{
                color:
                  "#60A5FA",
                marginBottom:
                  "10px",
              }}
            >
              Open
            </p>

            <h1
              style={{
                color:
                  "#60A5FA",
                fontSize:
                  "3rem",
                margin: 0,
              }}
            >
              4
            </h1>

            <small
              style={{
                color:
                  "#93C5FD",
              }}
            >
              Awaiting review
            </small>
          </PremiumCard>
        </FadeUp>

        <FadeUp>
          <PremiumCard
            style={{
              background:
                "rgba(245,158,11,.12)",

              border:
                "1px solid rgba(245,158,11,.35)",
            }}
          >
            <p
              style={{
                color:
                  "#FBBF24",
                marginBottom:
                  "10px",
              }}
            >
              Under Review
            </p>

            <h1
              style={{
                color:
                  "#FBBF24",
                fontSize:
                  "3rem",
                margin: 0,
              }}
            >
              5
            </h1>

            <small
              style={{
                color:
                  "#FCD34D",
              }}
            >
              Active investigations
            </small>
          </PremiumCard>
        </FadeUp>

        <FadeUp>
          <PremiumCard
            style={{
              background:
                "rgba(34,197,94,.12)",

              border:
                "1px solid rgba(34,197,94,.35)",
            }}
          >
            <p
              style={{
                color:
                  "#4ADE80",
                marginBottom:
                  "10px",
              }}
            >
              Resolved
            </p>

            <h1
              style={{
                color:
                  "#4ADE80",
                fontSize:
                  "3rem",
                margin: 0,
              }}
            >
              3
            </h1>

            <small
              style={{
                color:
                  "#86EFAC",
              }}
            >
              Successfully closed
            </small>
          </PremiumCard>
        </FadeUp>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <FadeUp>
          <PremiumCard>
            <h2
              style={{
                marginTop: 0,
                marginBottom:
                  "20px",
              }}
            >
              Recent Complaints
            </h2>

            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {complaints.map(
                (complaint) => (
                  <div
                    key={
                      complaint.id
                    }
                    style={{
                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      padding:
                        "16px",

                      borderRadius:
                        "16px",

                      background:
                        "rgba(255,255,255,.03)",

                      border:
                        "1px solid rgba(255,255,255,.05)",
                    }}
                  >
                    <div>
                      <strong>
                        {
                          complaint.id
                        }
                      </strong>

                      <p
                        style={{
                          margin:
                            "6px 0 0",

                          color:
                            "#94A3B8",
                        }}
                      >
                        {
                          complaint.date
                        }
                      </p>
                    </div>

                    <span
                      style={{
                        padding:
                          "8px 14px",

                        borderRadius:
                          "999px",

                        fontSize:
                          ".85rem",

                        background:
                          complaint.status ===
                          "Resolved"
                            ? "rgba(34,197,94,.15)"
                            : complaint.status ===
                              "Open"
                            ? "rgba(59,130,246,.15)"
                            : "rgba(245,158,11,.15)",

                        color:
                          complaint.status ===
                          "Resolved"
                            ? "#4ADE80"
                            : complaint.status ===
                              "Open"
                            ? "#60A5FA"
                            : "#FBBF24",
                      }}
                    >
                      {
                        complaint.status
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </PremiumCard>
        </FadeUp>

        <FadeUp>
          <PremiumCard>
  <h2
    style={{
      marginTop: 0,
      marginBottom: "20px",
    }}
  >
    Recent Activity
  </h2>

  <div
    style={{
      display: "grid",
      gap: "14px",
    }}
  >
    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background:
          "rgba(59,130,246,.08)",

        border:
          "1px solid rgba(59,130,246,.15)",
      }}
    >
      Complaint NAY-001
      submitted successfully
    </div>

    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background:
          "rgba(245,158,11,.08)",

        border:
          "1px solid rgba(245,158,11,.15)",
      }}
    >
      NAY-001 moved to
      Under Review
    </div>

    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background:
          "rgba(34,197,94,.08)",

        border:
          "1px solid rgba(34,197,94,.15)",
      }}
    >
      Evidence uploaded
      successfully
    </div>

    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background:
          "rgba(168,85,247,.08)",

        border:
          "1px solid rgba(168,85,247,.15)",
      }}
    >
      Profile verified
    </div>
  </div>
</PremiumCard>
        </FadeUp>
      </div>

      
    </div>
  );
}