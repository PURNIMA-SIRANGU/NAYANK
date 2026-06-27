"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function SupervisorsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSupervisors();
  }, []);

  async function loadSupervisors() {
    try {
      const res = await fetch(
        "https://nayank-backend.onrender.com/users"
      );

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const supervisors = users.filter(
    (user) => user.role === "SUPERVISOR"
  );

  const filteredSupervisors =
    supervisors.filter((supervisor) =>
      supervisor.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Supervisors...
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
          title="Supervisor Command Center"
          subtitle="Manage investigation supervisors"
        />
      </FadeUp>

      {/* STATS */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Total Supervisors
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#FBBF24",
              }}
            >
              {supervisors.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Active Supervisors
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {supervisors.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Investigation Teams
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              12
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SEARCH */}

      <FadeUp>
        <PremiumCard>
          <input
            placeholder="Search supervisors..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
            }}
          />
        </PremiumCard>
      </FadeUp>

      {/* SUPERVISORS */}

      <FadeUp>
        <SectionTitle
          title="Supervisor Directory"
          subtitle="Investigation leadership"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {filteredSupervisors.map(
            (supervisor) => (
              <PremiumCard
                key={supervisor.id}
              >
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                  }}
                >
                  {supervisor.name}
                </h3>

                <p
                  style={{
                    color: "#60A5FA",
                    marginTop: "10px",
                  }}
                >
                  {supervisor.email}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "18px",
                  }}
                >
                  <span
                    style={{
                      color: "#FBBF24",
                    }}
                  >
                    SUPERVISOR
                  </span>

                  <span
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    Active
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Link
                    href={`/admin/users/${supervisor.id}`}
                  >
                    <button
                      style={{
                        padding: "12px 20px",
                        borderRadius: "14px",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        background:
                          "linear-gradient(90deg,#2563EB,#60A5FA)",
                      }}
                    >
                      View
                    </button>
                  </Link>

                  <Link
                    href={`/admin/users/${supervisor.id}/edit`}
                  >
                    <button
                      style={{
                        padding: "12px 20px",
                        borderRadius: "14px",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        background:
                          "linear-gradient(90deg,#16A34A,#4ADE80)",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </PremiumCard>
            )
          )}
        </div>
      </FadeUp>
    </div>
  );
}