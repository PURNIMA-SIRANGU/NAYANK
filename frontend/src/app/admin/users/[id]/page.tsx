"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function UserDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await fetch(
        `https://nayank-backend.onrender.com/users/${id}`
      );

      const data = await res.json();

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading User...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-red-400">
        User Not Found
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
          title={user.name}
          subtitle="User Profile Information"
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            <div>
              <strong>Name:</strong>
              <p>{user.name}</p>
            </div>

            <div>
              <strong>Email:</strong>
              <p>{user.email}</p>
            </div>

            <div>
              <strong>Role:</strong>
              <p>{user.role}</p>
            </div>

            <div>
              <strong>Status:</strong>
              <p>
                {user.isActive
                  ? "Active"
                  : "Disabled"}
              </p>
            </div>

            <div>
              <strong>Created At:</strong>
              <p>
                {new Date(
                  user.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </PremiumCard>
      </FadeUp>

      <FadeUp>
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <Link
            href={`/admin/users/${id}/edit`}
          >
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(90deg,#2563EB,#60A5FA)",
                color: "white",
              }}
            >
              Edit User
            </button>
          </Link>

          <Link href="/admin/users">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}