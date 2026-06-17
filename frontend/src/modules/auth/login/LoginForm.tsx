"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginUser } from "@/services/auth.services";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email.trim(), password);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      switch (data.user.role) {
        case "CITIZEN":
          router.push("/citizen/dashboard");
          break;
        case "OFFICER":
          router.push("/officer/dashboard");
          break;
        case "SUPERVISOR":
          router.push("/supervisor/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        default:
          alert("Unknown Role");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "8vw",
        background: `radial-gradient( circle at top left, rgba(37,99,235,.35), transparent 40% ), radial-gradient( circle at bottom right, rgba(96,165,250,.15), transparent 40% ), #040B14`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleLogin}
        style={{
          width: "460px",
          padding: "42px",
          borderRadius: "36px",
          backdropFilter: "blur(32px)",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 40px 120px rgba(0,0,0,.45)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "8px",
              fontWeight: 800,
              background: "linear-gradient(135deg,#93C5FD,#60A5FA,#2563EB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-1px",
              textShadow: "0 0 30px rgba(96,165,250,.35)",
            }}
          >
            NAYANK
          </h1>
          <p
            style={{
              color: "#CBD5E1",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            AI-Powered Investigation Platform
            <br />
            Secure access for citizens, officers, supervisors and
            administrators.
          </p>
        </motion.div>

        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            height: "60px",
            marginBottom: "18px",
            padding: "0 18px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.04)",
            color: "white",
            outline: "none",
          }}
        />

        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            height: "60px",
            marginBottom: "24px",
            padding: "0 18px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.04)",
            color: "white",
            outline: "none",
          }}
        />

        <motion.button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "60px",
            border: "none",
            borderRadius: "18px",
            background: "linear-gradient(135deg,#2563EB,#60A5FA)",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Authenticating..." : "Secure Login"}
        </motion.button>
      </motion.form>
    </main>
  );
}
