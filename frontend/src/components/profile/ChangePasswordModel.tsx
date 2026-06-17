"use client";

import { changePassword } from "@/services/auth.services";

interface Props {
  open: boolean;
  onClose: () => void;

  userId: string;

  currentPassword: string;
  setCurrentPassword: (
    value: string
  ) => void;

  newPassword: string;
  setNewPassword: (
    value: string
  ) => void;

  confirmPassword: string;
  setConfirmPassword: (
    value: string
  ) => void;

  changingPassword: boolean;
  setChangingPassword: (
    value: boolean
  ) => void;
}

export default function ChangePasswordModal({
  open,
  onClose,

  userId,

  currentPassword,
  setCurrentPassword,

  newPassword,
  setNewPassword,

  confirmPassword,
  setConfirmPassword,

  changingPassword,
  setChangingPassword,
}: Props) {
  if (!open) {
    return null;
  }

  const handleSubmit =
    async () => {
      if (
        !currentPassword
      ) {
        alert(
          "Current Password is required"
        );
        return;
      }

      if (
        !newPassword
      ) {
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
          userId,
          currentPassword,
          newPassword
        );

        alert(
          "Password changed successfully"
        );

        setCurrentPassword(
          ""
        );

        setNewPassword(
          ""
        );

        setConfirmPassword(
          ""
        );

        onClose();
      } catch (
        error: any
      ) {
        alert(
          error?.response
            ?.data
            ?.message ||
            "Failed to change password"
        );
      } finally {
        setChangingPassword(
          false
        );
      }
    };

  return (
    <div
      style={{
        position:
          "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,.65)",
        backdropFilter:
          "blur(8px)",
        display:
          "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width:
            "450px",

          background:
            "#0F172A",

          border:
            "1px solid rgba(255,255,255,.08)",

          borderRadius:
            "24px",

          padding:
            "24px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
          }}
        >
          Change Password
        </h2>

        <div
          style={{
            display:
              "grid",
            gap: "15px",
          }}
        >
          <input
            type="password"
            placeholder="Current Password"
            value={
              currentPassword
            }
            onChange={(e) =>
              setCurrentPassword(
                e.target
                  .value
              )
            }
            style={{
              padding:
                "14px",
              borderRadius:
                "14px",
              background:
                "#1E293B",
              border:
                "1px solid rgba(255,255,255,.08)",
              color:
                "#fff",
            }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={
              newPassword
            }
            onChange={(e) =>
              setNewPassword(
                e.target
                  .value
              )
            }
            style={{
              padding:
                "14px",
              borderRadius:
                "14px",
              background:
                "#1E293B",
              border:
                "1px solid rgba(255,255,255,.08)",
              color:
                "#fff",
            }}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target
                  .value
              )
            }
            style={{
              padding:
                "14px",
              borderRadius:
                "14px",
              background:
                "#1E293B",
              border:
                "1px solid rgba(255,255,255,.08)",
              color:
                "#fff",
            }}
          />
        </div>

        <div
          style={{
            display:
              "flex",
            justifyContent:
              "flex-end",
            gap: "12px",
            marginTop:
              "20px",
          }}
        >
          <button
            onClick={
              onClose
            }
            style={{
              padding:
                "12px 20px",
              borderRadius:
                "12px",
              border:
                "none",
              cursor:
                "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={
              handleSubmit
            }
            disabled={
              changingPassword
            }
            style={{
              padding:
                "12px 20px",
              borderRadius:
                "12px",
              border:
                "none",
              background:
                "linear-gradient(135deg,#2563EB,#60A5FA)",
              color:
                "#fff",
              cursor:
                "pointer",
            }}
          >
            {changingPassword
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}