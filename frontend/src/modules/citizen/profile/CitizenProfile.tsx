"use client";

import { useEffect, useState } from "react";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CitizenProfile() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="Citizen Profile"
          subtitle="Manage your NAYANK account information."
        />
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 2fr",
          gap: "20px",
        }}
      >
        <FadeUp>
          <PremiumCard>
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",

                alignItems:
                  "center",
              }}
            >
              <div
                style={{
                  width: "120px",

                  height: "120px",

                  borderRadius:
                    "50%",

                  background:
                    "linear-gradient(135deg,#2563EB,#60A5FA)",

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  fontSize:
                    "2.5rem",

                  fontWeight: 700,

                  marginBottom:
                    "20px",
                }}
              >
                {user?.name?.charAt(
                  0
                )}
              </div>

              <h2>
                {user.name}
              </h2>

              <p
                style={{
                  color:
                    "#94A3B8",
                }}
              >
                {user.role}
              </p>
            </div>
          </PremiumCard>
        </FadeUp>

        <FadeUp>
          <PremiumCard>
            <h2
              style={{
                marginTop: 0,
                marginBottom:
                  "25px",
              }}
            >
              Account Details
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "20px",
              }}
            >
              <ProfileField
                label="Full Name"
                value={user.name}
              />

              <ProfileField
                label="Email"
                value={user.email}
              />

              <ProfileField
                label="Role"
                value={user.role}
              />

              <ProfileField
                label="Status"
                value="Verified Citizen"
              />

              <ProfileField
                label="Account Type"
                value="Citizen"
              />

              <ProfileField
                label="Member Since"
                value="2026"
              />
            </div>
          </PremiumCard>
        </FadeUp>
      </div>

      <FadeUp>
        <PremiumCard
          style={{
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Account Security
          </h2>

          <p
            style={{
              color:
                "#94A3B8",
              marginBottom:
                "20px",
            }}
          >
            Manage your
            authentication and
            account access.
          </p>

          <button
            style={{
              padding:
                "14px 24px",

              borderRadius:
                "16px",

              border: "none",

              background:
                "linear-gradient(135deg,#2563EB,#60A5FA)",

              color: "white",

              cursor:
                "pointer",

              fontWeight: 600,
            }}
          >
            Change Password
          </button>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "18px",

        borderRadius: "18px",

        background:
          "rgba(255,255,255,.03)",

        border:
          "1px solid rgba(255,255,255,.05)",
      }}
    >
      <p
        style={{
          color: "#94A3B8",

          marginBottom:
            "8px",

          fontSize: ".9rem",
        }}
      >
        {label}
      </p>

      <strong>{value}</strong>
    </div>
  );
}