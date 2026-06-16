"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { registerUser } from "@/services/auth.services";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",

    addressLine1: "",
    addressLine2: "",

    village: "",
    ward: "",

    city: "",
    district: "Eluru",

    state: "Andhra Pradesh",

    pincode: "",

    governmentIdType: "AADHAAR",

    governmentIdNumber: "",

    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        ...form,
        role: "CITIZEN",
      });

      alert(
        "Registration Successful"
      );

      router.push("/login");
    } catch (error: any) {
      console.log(error);

      alert(
        JSON.stringify(
          error?.response?.data ||
            error?.message ||
            error
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",

    height: "60px",

    padding: "0 18px",

    borderRadius: "18px",

    border:
      "1px solid rgba(255,255,255,.08)",

    background:
      "rgba(255,255,255,.04)",

    color: "white",

    outline: "none",
  };

  return (
    <main
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "40px",

        background: `
          radial-gradient(
            circle at top left,
            rgba(37,99,235,.35),
            transparent 40%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(96,165,250,.15),
            transparent 40%
          ),
          #040B14
        `,
      }}
    >
      <motion.form
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        onSubmit={handleRegister}
        style={{
          width: "1000px",

          padding: "42px",

          borderRadius: "36px",

          backdropFilter:
            "blur(32px)",

          background:
            "rgba(255,255,255,.05)",

          border:
            "1px solid rgba(255,255,255,.08)",

          boxShadow:
            "0 40px 120px rgba(0,0,0,.45)",
        }}
      >
        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",

              marginBottom: "8px",

              fontWeight: 800,

              background:
                "linear-gradient(135deg,#93C5FD,#60A5FA,#2563EB)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",

              fontFamily:
                "Space Grotesk, sans-serif",
            }}
          >
            NAYANK
          </h1>

          <p
            style={{
              color: "#CBD5E1",

              lineHeight: 1.7,
            }}
          >
            Citizen Registration
            Portal

            <br />

            Register securely to
            report incidents,
            track complaints and
            upload evidence.
          </p>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: "18px",
          }}
        >
          <input
            placeholder="Full Name"
            style={inputStyle}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            style={inputStyle}
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Mobile Number"
            style={inputStyle}
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Address Line 1"
            style={inputStyle}
            value={
              form.addressLine1
            }
            onChange={(e) =>
              setForm({
                ...form,
                addressLine1:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Address Line 2"
            style={inputStyle}
            value={
              form.addressLine2
            }
            onChange={(e) =>
              setForm({
                ...form,
                addressLine2:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Village"
            style={inputStyle}
            value={form.village}
            onChange={(e) =>
              setForm({
                ...form,
                village:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Ward"
            style={inputStyle}
            value={form.ward}
            onChange={(e) =>
              setForm({
                ...form,
                ward:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            style={inputStyle}
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="District"
            style={inputStyle}
            value={form.district}
            onChange={(e) =>
              setForm({
                ...form,
                district:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="State"
            style={inputStyle}
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Pincode"
            style={inputStyle}
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode:
                  e.target.value,
              })
            }
          />

          <select
            style={inputStyle}
            value={
              form.governmentIdType
            }
            onChange={(e) =>
              setForm({
                ...form,
                governmentIdType:
                  e.target.value,
              })
            }
          >
            <option value="AADHAAR">
              Aadhaar
            </option>

            <option value="VOTER_ID">
              Voter ID
            </option>

            <option value="DRIVING_LICENSE">
              Driving License
            </option>

            <option value="RATION_CARD">
              Ration Card
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          <input
            placeholder="Government ID Number"
            style={inputStyle}
            value={
              form.governmentIdNumber
            }
            onChange={(e) =>
              setForm({
                ...form,
                governmentIdNumber:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
            value={
              form.confirmPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",

            height: "60px",

            marginTop: "30px",

            borderRadius: "18px",

            border: "none",

            background:
              "linear-gradient(135deg,#2563EB,#60A5FA)",

            color: "white",

            fontWeight: 700,

            cursor: "pointer",
          }}
        >
          {loading
            ? "Creating Account..."
            : "Create Citizen Account"}
        </button>

        <p
          style={{
            textAlign: "center",

            marginTop: "20px",

            color: "#94A3B8",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() =>
              router.push("/login")
            }
            style={{
              color: "#60A5FA",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </motion.form>
    </main>
  );
}