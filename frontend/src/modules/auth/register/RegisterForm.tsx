"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  registerUser,
  sendOtp,
  verifyOtp,
} from "@/services/auth.services";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [sendingOtp, setSendingOtp] =
    useState(false);

  const [verifyingOtp, setVerifyingOtp] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [form, setForm] =
    useState({
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
      governmentIdType:
        "AADHAAR",
      governmentIdNumber:
        "",
      password: "",
      confirmPassword:
        "",
    });

  const handleSendOtp =
    async () => {
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          form.email
        )
      ) {
        alert(
          "Enter a valid email address first"
        );
        return;
      }

      try {
        setSendingOtp(true);

        await sendOtp(
          form.email
        );

        setOtpSent(true);

        alert(
          "OTP sent successfully to your email"
        );
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to send OTP"
        );
      } finally {
        setSendingOtp(false);
      }
    };

  const handleVerifyOtp =
    async () => {
      if (
        otp.length !== 6
      ) {
        alert(
          "Enter a valid 6 digit OTP"
        );
        return;
      }

      try {
        setVerifyingOtp(true);

        await verifyOtp(
          form.email,
          otp
        );

        setEmailVerified(
          true
        );

        alert(
          "Email verified successfully"
        );
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "OTP verification failed"
        );
      } finally {
        setVerifyingOtp(false);
      }
    };

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        !emailVerified
      ) {
        alert(
          "Please verify your email OTP first"
        );
        return;
      }

      if (
        !/^[A-Za-z ]{3,100}$/.test(
          form.name.trim()
        )
      ) {
        alert(
          "Enter a valid full name"
        );
        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          form.email
        )
      ) {
        alert(
          "Enter a valid email address"
        );
        return;
      }

      if (
        !/^[6-9]\d{9}$/.test(
          form.mobile
        )
      ) {
        alert(
          "Enter a valid 10-digit mobile number"
        );
        return;
      }

      if (
        !/^[1-9][0-9]{5}$/.test(
          form.pincode
        )
      ) {
        alert(
          "Enter a valid 6-digit pincode"
        );
        return;
      }

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          form.password
        )
      ) {
        alert(
          "Password does not meet the required format. Please follow the password requirements shown above the password field."
        );
        return;
      }

      if (
        form.password !==
        form.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      if (
        form.governmentIdType ===
          "AADHAAR" &&
        !/^\d{12}$/.test(
          form.governmentIdNumber
        )
      ) {
        alert(
          "Aadhaar must contain exactly 12 digits"
        );
        return;
      }

      if (
        form.governmentIdType ===
          "VOTER_ID" &&
        !/^[A-Z]{3}[0-9]{7}$/.test(
          form.governmentIdNumber.toUpperCase()
        )
      ) {
        alert(
          "Invalid Voter ID format"
        );
        return;
      }

      if (
        form.governmentIdType ===
          "DRIVING_LICENSE" &&
        form.governmentIdNumber.trim()
          .length < 10
      ) {
        alert(
          "Invalid Driving License Number"
        );
        return;
      }

      try {
        setLoading(true);

        await registerUser({
          ...form,
          governmentIdNumber:
            form.governmentIdNumber.toUpperCase(),
          role: "CITIZEN",
        });

        alert(
          "Registration Successful"
        );

        router.push(
          "/login"
        );
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Registration Failed"
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
    boxSizing:
      "border-box" as const,
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
          radial-gradient(circle at top left, rgba(37,99,235,.35), transparent 40%),
          radial-gradient(circle at bottom right, rgba(96,165,250,.15), transparent 40%),
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
        onSubmit={
          handleRegister
        }
        style={{
          width: "1000px",
          padding: "42px",
          borderRadius:
            "36px",
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
            marginBottom:
              "35px",
          }}
        >
          <h1
            style={{
              fontSize:
                "3rem",
              marginBottom:
                "8px",
              fontWeight:
                800,
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
              color:
                "#CBD5E1",
              lineHeight:
                1.7,
            }}
          >
            Citizen Registration Portal
            <br />
            Register securely to report incidents, track complaints and upload evidence.
          </p>
        </div>

        <h3
          style={{
            color:
              "#60A5FA",
            marginBottom:
              "15px",
            marginTop:
              "25px",
          }}
        >
          Personal Details
        </h3>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr",
            gap: "18px",
          }}
        >
          <input
            placeholder="Full Name"
            style={
              inputStyle
            }
            value={
              form.name
            }
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Email Address"
            type="email"
            style={
              inputStyle
            }
            value={
              form.email
            }
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
            style={
              inputStyle
            }
            value={
              form.mobile
            }
            onChange={(e) =>
              setForm({
                ...form,
                mobile:
                  e.target.value,
              })
            }
          />
        </div>

        <div
          style={{
            display:
              "flex",
            gap: "12px",
            marginTop:
              "15px",
            alignItems:
              "center",
          }}
        >
          <button
            type="button"
            onClick={
              handleSendOtp
            }
            disabled={
              sendingOtp ||
              emailVerified
            }
            style={{
              padding:
                "14px 24px",
              borderRadius:
                "14px",
              border:
                "none",
              background:
                "#2563EB",
              color:
                "#fff",
              cursor:
                "pointer",
            }}
          >
            {sendingOtp
              ? "Sending..."
              : emailVerified
              ? "Verified"
              : "Send OTP"}
          </button>

          {emailVerified && (
            <span
              style={{
                color:
                  "#22C55E",
                fontWeight:
                  700,
              }}
            >
              ✓ Email Verified
            </span>
          )}
        </div>

        {otpSent &&
          !emailVerified && (
            <div
              style={{
                display:
                  "flex",
                gap: "12px",
                marginTop:
                  "15px",
              }}
            >
              <input
                placeholder="Enter OTP"
                value={
                  otp
                }
                onChange={(
                  e
                ) =>
                  setOtp(
                    e.target
                      .value
                  )
                }
                style={{
                  ...inputStyle,
                  flex: 1,
                }}
              />

              <button
                type="button"
                onClick={
                  handleVerifyOtp
                }
                disabled={
                  verifyingOtp
                }
                style={{
                  padding:
                    "14px 24px",
                  borderRadius:
                    "14px",
                  border:
                    "none",
                  background:
                    "#16A34A",
                  color:
                    "#fff",
                  cursor:
                    "pointer",
                }}
              >
                {verifyingOtp
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </div>
          )}

        <h3
          style={{
            color:
              "#60A5FA",
            marginBottom:
              "15px",
            marginTop:
              "25px",
          }}
        >
          Identity Verification
        </h3>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 2fr",
            gap: "18px",
          }}
        >
          <select
            style={{
              ...inputStyle,
              paddingRight:
                "10px",
            }}
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
              Aadhaar Card
            </option>
            <option value="VOTER_ID">
              Voter ID
            </option>
            <option value="DRIVING_LICENSE">
              Driving License
            </option>
          </select>

          <input
            placeholder="Government ID Number"
            style={
              inputStyle
            }
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
        </div>

        <h3
          style={{
            color:
              "#60A5FA",
            marginBottom:
              "15px",
            marginTop:
              "25px",
          }}
        >
          Address Details
        </h3>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "18px",
            marginBottom:
              "18px",
          }}
        >
          <input
            placeholder="Address Line 1"
            style={
              inputStyle
            }
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
            style={
              inputStyle
            }
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
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr",
            gap: "18px",
          }}
        >
          <input placeholder="Village" style={inputStyle} value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} />
          <input placeholder="Ward" style={inputStyle} value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} />
          <input placeholder="City" style={inputStyle} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input placeholder="District" style={inputStyle} value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "18px",
            marginTop:
              "18px",
          }}
        >
          <input placeholder="State" style={inputStyle} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <input placeholder="Pincode" style={inputStyle} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
        </div>

        <h3
          style={{
            color:
              "#60A5FA",
            marginBottom:
              "15px",
            marginTop:
              "25px",
          }}
        >
          Security Setup
        </h3>

        <div
          style={{
            marginBottom:
              "20px",
            padding:
              "18px",
            borderRadius:
              "18px",
            background:
              "rgba(37,99,235,.08)",
            border:
              "1px solid rgba(96,165,250,.25)",
          }}
        >
          <p
            style={{
              margin: 0,
              color:
                "#CBD5E1",
              lineHeight:
                1.9,
            }}
          >
            <strong
              style={{
                color:
                  "#60A5FA",
              }}
            >
              Password Requirements
            </strong>

            <br />
            ✓ Minimum 8 Characters
            <br />
            ✓ At Least 1 Uppercase Letter
            <br />
            ✓ At Least 1 Lowercase Letter
            <br />
            ✓ At Least 1 Number
            <br />
            ✓ At Least 1 Special Character
          </p>
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "18px",
          }}
        >
          <input placeholder="Password" type="password" style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <input placeholder="Confirm Password" type="password" style={inputStyle} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
        </div>

        <div
          style={{
            marginTop:
              "40px",
            display:
              "flex",
            justifyContent:
              "flex-end",
          }}
        >
          <button
            type="submit"
            disabled={
              loading ||
              !emailVerified
            }
            style={{
              padding:
                "16px 40px",
              borderRadius:
                "18px",
              border:
                "none",
              background:
                "linear-gradient(135deg,#2563EB,#60A5FA)",
              color:
                "#FFF",
              fontSize:
                "1rem",
              fontWeight:
                600,
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              opacity:
                loading ||
                !emailVerified
                  ? 0.6
                  : 1,
            }}
          >
            {loading
              ? "Registering..."
              : !emailVerified
              ? "Verify Email First"
              : "Create Account"}
          </button>
        </div>
      </motion.form>
    </main>
  );
}