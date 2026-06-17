"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword } from "@/services/auth.services";
import ChangePasswordModal from "@/components/profile/ChangePasswordModel";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import NayankLoader from "@/components/ui/NayankLoader";

export default function CitizenProfile() {
  const [user, setUser] =
    useState<any>(null);
const [currentPassword, setCurrentPassword] =
  useState("");
const [showPasswordModal, setShowPasswordModal] =
  useState(false);

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");

const [changingPassword, setChangingPassword] =
  useState(false);
  const router =
    useRouter();

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }
  }, []);
const handleChangePassword =
  async () => {
    if (!currentPassword) {
      alert(
        "Current Password is required"
      );
      return;
    }

    if (!newPassword) {
      alert(
        "New Password is required"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      setChangingPassword(
        true
      );

      await changePassword(
        user.id,
        currentPassword,
        newPassword
      );

      alert(
        "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordModal(
        false
      );
    } catch (
      error: any
    ) {
      alert(
        error?.response
          ?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setChangingPassword(
        false
      );
    }
  };
  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (!user) {
    return (
      <NayankLoader />
    );
  }

  const profile =
    user.citizenProfile ||
    {};

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
          marginBottom:
            "20px",
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
                  fontWeight:
                    700,
                  marginBottom:
                    "20px",
                }}
              >
                {user.name?.charAt(
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

              <div
                style={{
                  marginTop:
                    "10px",
                  padding:
                    "8px 16px",
                  borderRadius:
                    "999px",
                  background:
                    profile.isVerified
                      ? "rgba(34,197,94,.15)"
                      : "rgba(245,158,11,.15)",
                  color:
                    profile.isVerified
                      ? "#4ADE80"
                      : "#FBBF24",
                }}
              >
                {profile.isVerified
                  ? "Verified"
                  : "Pending Verification"}
              </div>
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
              Citizen Information
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
                value={
                  user.name
                }
              />

              <ProfileField
                label="Email"
                value={
                  user.email
                }
              />

              <ProfileField
                label="Mobile"
                value={
                  profile.mobile ||
                  "-"
                }
              />

              <ProfileField
                label="Government ID Type"
                value={
                  profile.governmentIdType ||
                  "-"
                }
              />

              <ProfileField
                label="Government ID Number"
                value={
                  profile.governmentIdNumber ||
                  "-"
                }
              />

              <ProfileField
                label="Village"
                value={
                  profile.village ||
                  "-"
                }
              />

              <ProfileField
                label="Ward"
                value={
                  profile.ward ||
                  "-"
                }
              />

              <ProfileField
                label="City"
                value={
                  profile.city ||
                  "-"
                }
              />

              <ProfileField
                label="District"
                value={
                  profile.district ||
                  "-"
                }
              />

              <ProfileField
                label="State"
                value={
                  profile.state ||
                  "-"
                }
              />

              <ProfileField
                label="Pincode"
                value={
                  profile.pincode ||
                  "-"
                }
              />

              <ProfileField
                label="Role"
                value={
                  user.role
                }
              />
            </div>
          </PremiumCard>
        </FadeUp>
      </div>

      <FadeUp>
        <PremiumCard>
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Address Information
          </h2>

          <div
            style={{
              marginTop:
                "20px",
              display: "grid",
              gap: "16px",
            }}
          >
            <ProfileField
              label="Address Line 1"
              value={
                profile.addressLine1 ||
                "-"
              }
            />

            <ProfileField
              label="Address Line 2"
              value={
                profile.addressLine2 ||
                "-"
              }
            />
          </div>
        </PremiumCard>
      </FadeUp>

      <FadeUp>
        <PremiumCard
          style={{
            marginTop:
              "20px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Account Security
          </h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop:
                "20px",
            }}
          >
           <button
  onClick={() =>
    setShowPasswordModal(
      true
    )
  }
  style={{
    padding:
      "14px 24px",
    borderRadius:
      "16px",
    border:
      "none",
    background:
      "linear-gradient(135deg,#2563EB,#60A5FA)",
    color:
      "#fff",
    cursor:
      "pointer",
    fontWeight:
      600,
  }}
>
  Change Password
</button>
            <button
              onClick={
                logout
              }
              style={{
                padding:
                  "14px 24px",
                borderRadius:
                  "16px",
                border:
                  "none",
                background:
                  "rgba(239,68,68,.15)",
                color:
                  "#F87171",
                cursor:
                  "pointer",
                fontWeight:
                  600,
              }}
            >
              Logout
            </button>
          </div>
        </PremiumCard>
      </FadeUp>
      <ChangePasswordModal
  open={showPasswordModal}
  onClose={() =>
    setShowPasswordModal(
      false
    )
  }
  userId={user.id}
  currentPassword={
    currentPassword
  }
  setCurrentPassword={
    setCurrentPassword
  }
  newPassword={
    newPassword
  }
  setNewPassword={
    setNewPassword
  }
  confirmPassword={
    confirmPassword
  }
  setConfirmPassword={
    setConfirmPassword
  }
  changingPassword={
    changingPassword
  }
  setChangingPassword={
    setChangingPassword
  }
/>
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
        borderRadius:
          "18px",
        background:
          "rgba(255,255,255,.03)",
        border:
          "1px solid rgba(255,255,255,.05)",
      }}
    >
      <p
        style={{
          color:
            "#94A3B8",
          marginBottom:
            "8px",
          fontSize:
            ".9rem",
        }}
      >
        {label}
      </p>

      <strong>
        {value}
      </strong>
    
    </div>
  );
}