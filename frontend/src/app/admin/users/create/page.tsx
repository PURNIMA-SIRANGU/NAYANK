"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function CreateUserPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "OFFICER",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/users",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create user"
        );
      }

      alert("User created successfully");

      router.push("/admin/users");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
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
          title="Create User"
          subtitle="Add officers, analysts or administrators"
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <label>Name</label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius:
                    "12px",
                }}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius:
                    "12px",
                }}
              />
            </div>

            <div>
              <label>Password</label>

              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password:
                      e.target.value,
                  })
                }
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius:
                    "12px",
                }}
              />
            </div>

            <div>
              <label>Role</label>

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role:
                      e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius:
                    "12px",
                }}
              >
                <option value="ADMIN">
                  Admin
                </option>

                <option value="OFFICER">
                  Officer
                </option>

                <option value="ANALYST">
                  Analyst
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                border: "none",
                borderRadius: "14px",
                cursor: "pointer",
                color: "white",
                fontWeight: 600,
                background:
                  "linear-gradient(90deg,#2563EB,#60A5FA)",
              }}
            >
              {loading
                ? "Creating..."
                : "Create User"}
            </button>
          </form>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}