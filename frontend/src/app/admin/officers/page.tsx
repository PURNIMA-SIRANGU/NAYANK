"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function OfficersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    loadOfficers();
  }, []);

  async function loadOfficers() {
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

  const officers = users.filter(
    (user) =>
      user.role === "OFFICER" 
  );

  const filteredOfficers =
    officers.filter((officer) => {
      const searchMatch =
        officer.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        officer.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const roleMatch =
        roleFilter === "ALL"
          ? true
          : officer.role === roleFilter;

      return searchMatch && roleMatch;
    });

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Officers...
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
      {/* HEADER */}

      <FadeUp>
        <SectionTitle
          title="Officer Command Center"
          subtitle="Manage investigators and supervisors"
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
            <p style={{ color: "#94A3B8" }}>
              Total Officers
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              {officers.length}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Officers
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {
                officers.filter(
                  (o) =>
                    o.role === "OFFICER"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Supervisors
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#FBBF24",
              }}
            >
              {
                officers.filter(
                  (o) =>
                    o.role ===
                    "SUPERVISOR"
                ).length
              }
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Active Personnel
            </p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              {officers.length}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SEARCH */}

      <FadeUp>
        <PremiumCard>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Search officers..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px",
                borderRadius: "12px",
              }}
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(
                  e.target.value
                )
              }
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option value="ALL">
                All Roles
              </option>

              <option value="OFFICER">
                Officer
              </option>

              <option value="SUPERVISOR">
                Supervisor
              </option>
            </select>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* OFFICERS */}

      <FadeUp>
        <SectionTitle
          title="Personnel Directory"
          subtitle="Investigation workforce"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {filteredOfficers.map(
            (officer) => (
              <PremiumCard
                key={officer.id}
              >
                <h3
                  style={{
                    fontSize:
                      "1.3rem",
                    fontWeight: 700,
                  }}
                >
                  {officer.name}
                </h3>

                <p
                  style={{
                    color:
                      "#60A5FA",
                    marginTop:
                      "10px",
                  }}
                >
                  {
                    officer.email
                  }
                </p>

                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    marginTop:
                      "18px",
                  }}
                >
                  <span
                    style={{
                      color:
                        "#4ADE80",
                    }}
                  >
                    {
                      officer.role
                    }
                  </span>

                  <span
                    style={{
                      color:
                        "#94A3B8",
                    }}
                  >
                    Active
                  </span>
                </div>

                <div
                  style={{
                    marginTop:
                      "20px",
                    display:
                      "flex",
                    gap: "10px",
                  }}
                >
                  <Link
                    href={`/admin/users/${officer.id}`}
                  >
                    <button
                      style={{
                        padding:
                          "12px 20px",
                        borderRadius:
                          "14px",
                        border:
                          "none",
                        cursor:
                          "pointer",
                        color:
                          "white",
                        background:
                          "linear-gradient(90deg,#2563EB,#60A5FA)",
                      }}
                    >
                      View
                    </button>
                  </Link>

                  <Link
                    href={`/admin/users/${officer.id}/edit`}
                  >
                    <button
                      style={{
                        padding:
                          "12px 20px",
                        borderRadius:
                          "14px",
                        border:
                          "none",
                        cursor:
                          "pointer",
                        color:
                          "white",
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