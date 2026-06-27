"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "OFFICER",
  });

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const res = await fetch(
      `https://nayank-backend.onrender.com/users/${id}`
    );

    const user = await res.json();

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  async function updateUser(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await fetch(
        `https://nayank-backend.onrender.com/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      router.push(
        `/admin/users/${id}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="Edit User"
          subtitle="Update User Details"
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <form
            onSubmit={updateUser}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              placeholder="Name"
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
              placeholder="Email"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role:
                    e.target.value,
                })
              }
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

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update User"}
            </button>
          </form>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}