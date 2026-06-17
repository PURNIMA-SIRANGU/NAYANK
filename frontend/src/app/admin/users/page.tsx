"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function disableUser(id: string) {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: false,
        }),
      });

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <div className="p-10 text-white">Loading Users...</div>;
  }

  const totalUsers = users.length;

  const officers = users.filter((u) => u.role === "OFFICER").length;

  const admins = users.filter((u) => u.role === "ADMIN").length;

  const citizens = users.filter((u) => u.role === "CITIZEN").length;

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const roleMatch =
      roleFilter === "ALL" ? true : user.role === roleFilter;

    return searchMatch && roleMatch;
  });

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <SectionTitle
            title="User Management Center"
            subtitle={`Total Users: ${totalUsers}`}
          />

          <Link href="/admin/users/create">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontWeight: 600,
                background: "linear-gradient(90deg,#2563EB,#60A5FA)",
              }}
            >
              + Add User
            </button>
          </Link>
        </div>
      </FadeUp>

      {/* STATS */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Total Users</p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
              }}
            >
              {totalUsers}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Officers</p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              {officers}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Admins</p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              {admins}
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>Citizens</p>

            <h2
              style={{
                fontSize: "2.5rem",
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              {citizens}
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SEARCH TOOLBAR */}

      <FadeUp>
        <PremiumCard>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px",
                borderRadius: "12px",
              }}
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="OFFICER">Officer</option>
              <option value="CITIZEN">Citizen</option>
            </select>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* USERS GRID */}

      <FadeUp>
        <SectionTitle
          title="Registered Users"
          subtitle="Manage platform access"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {filteredUsers.map((user) => (
            <PremiumCard key={user.id}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                {user.name}
              </h3>

              <p
                style={{
                  color: "#60A5FA",
                  marginTop: "10px",
                }}
              >
                {user.email}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#4ADE80",
                    fontWeight: 600,
                  }}
                >
                  {user.role}
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
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Link href={`/admin/users/${user.id}`}>
                  <button
                    style={{
                      padding: "12px 20px",
                      borderRadius: "14px",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      background: "linear-gradient(90deg,#2563EB,#60A5FA)",
                    }}
                  >
                    View
                  </button>
                </Link>

                <Link href={`/admin/users/${user.id}/edit`}>
                  <button
                    style={{
                      padding: "12px 20px",
                      borderRadius: "14px",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      background: "linear-gradient(90deg,#16A34A,#4ADE80)",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => disableUser(user.id)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    background: "linear-gradient(90deg,#DC2626,#F87171)",
                  }}
                >
                  Disable
                </button>
              </div>
            </PremiumCard>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}