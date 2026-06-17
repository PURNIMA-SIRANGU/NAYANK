"use client";

import { useEffect, useState } from "react";

import NayankLoader from "@/components/ui/NayankLoader";
import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { getUserCases } from "@/services/case.services";

export default function CitizenDashboard() {
  const [user, setUser] =
    useState<any>(null);

  const [cases, setCases] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      try {
        const storedUser =
          localStorage.getItem(
            "user"
          );

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          storedUser
        ) {
          setUser(
            JSON.parse(
              storedUser
            )
          );
        }

        if (
          userId
        ) {
          const data =
            await getUserCases(
              userId
            );

          setCases(
            data
          );
        }
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  if (
    loading ||
    !user
  ) {
    return (
      <NayankLoader />
    );
  }

  const totalCases =
    cases.length;

  const openCases =
    cases.filter(
      (
        c
      ) =>
        c.status ===
        "OPEN"
    ).length;

  const reviewCases =
    cases.filter(
      (
        c
      ) =>
        c.status ===
        "IN_PROGRESS"
    ).length;

  const closedCases =
    cases.filter(
      (
        c
      ) =>
        c.status ===
        "CLOSED"
    ).length;

  const recentCases =
    [...cases]
      .sort(
        (
          a,
          b
        ) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(
        0,
        5
      );

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
          display:
            "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginBottom:
            "30px",
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
          <p
            style={{
              color:
                "#A78BFA",
            }}
          >
            Total Complaints
          </p>

          <h1
            style={{
              color:
                "#A78BFA",
              margin:
                0,
            }}
          >
            {
              totalCases
            }
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
          <p
            style={{
              color:
                "#60A5FA",
            }}
          >
            Open
          </p>

          <h1
            style={{
              color:
                "#60A5FA",
              margin:
                0,
            }}
          >
            {
              openCases
            }
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
          <p
            style={{
              color:
                "#FBBF24",
            }}
          >
            Under Review
          </p>

          <h1
            style={{
              color:
                "#FBBF24",
              margin:
                0,
            }}
          >
            {
              reviewCases
            }
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
          <p
            style={{
              color:
                "#4ADE80",
            }}
          >
            Resolved
          </p>

          <h1
            style={{
              color:
                "#4ADE80",
              margin:
                0,
            }}
          >
            {
              closedCases
            }
          </h1>
        </PremiumCard>
      </div>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
        }}
      >
        <PremiumCard>
          <h2>
            Recent Complaints
          </h2>

          <div
            style={{
              display:
                "grid",
              gap:
                "12px",
            }}
          >
            {recentCases.map(
              (
                item
              ) => (
                <div
                  key={
                    item.id
                  }
                  style={{
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
                  <strong>
                    {
                      item.title
                    }
                  </strong>

                  <p
                    style={{
                      color:
                        "#94A3B8",
                    }}
                  >
                    {
                      item.status
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </PremiumCard>

        <PremiumCard>
          <h2>
            Recent Activity
          </h2>

          <div
            style={{
              display:
                "grid",
              gap:
                "12px",
            }}
          >
            {recentCases.map(
              (
                item
              ) => (
                <div
                  key={
                    item.id
                  }
                  style={{
                    padding:
                      "14px",
                    borderRadius:
                      "14px",
                    background:
                      "rgba(59,130,246,.08)",
                  }}
                >
                  Complaint
                  submitted:
                  {" "}
                  {
                    item.title
                  }
                </div>
              )
            )}
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}