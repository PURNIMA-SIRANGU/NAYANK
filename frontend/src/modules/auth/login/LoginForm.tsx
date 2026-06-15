"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.services";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      router.push("/");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login Failed"
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
        onSubmit={handleLogin}
        style={{
          width: "420px",
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
          Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
          }}
        />

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
            cursor: "pointer",
          }}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>
      </form>
    </main>
  );
}