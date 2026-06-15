"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.services";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CITIZEN",
  });

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(form);

      alert(
        "Registration Successful"
      );

      router.push("/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#040B14",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "500px",
          background: "#091423",
          padding: "40px",
          borderRadius: "24px",
          border:
            "1px solid rgba(37,99,235,.3)",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          Register
        </h1>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
          }}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
          }}
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
          }}
        >
          <option value="CITIZEN">
            Citizen
          </option>

          <option value="OFFICER">
            Officer
          </option>

          <option value="INVESTIGATOR">
            Investigator
          </option>

          <option value="SUPERVISOR">
            Supervisor
          </option>

          <option value="ADMIN">
            Administrator
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(90deg,#2563EB,#60A5FA)",
            color: "white",
          }}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>
    </main>
  );
}