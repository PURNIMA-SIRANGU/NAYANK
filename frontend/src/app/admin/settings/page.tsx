"use client";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function SettingsPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* HEADER */}

      <FadeUp>
        <SectionTitle
          title="System Settings"
          subtitle="Manage platform configuration and security"
        />
      </FadeUp>

      {/* OVERVIEW */}

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Platform
            </p>

            <h2
              style={{
                marginTop: "12px",
                color: "#38BDF8",
              }}
            >
              NAYANK
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              AI Engine
            </p>

            <h2
              style={{
                marginTop: "12px",
                color: "#4ADE80",
              }}
            >
              NETRAI
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Analytics
            </p>

            <h2
              style={{
                marginTop: "12px",
                color: "#FBBF24",
              }}
            >
              SANKET
            </h2>
          </PremiumCard>

          <PremiumCard>
            <p style={{ color: "#94A3B8" }}>
              Version
            </p>

            <h2
              style={{
                marginTop: "12px",
                color: "#C084FC",
              }}
            >
              v1.0.0
            </h2>
          </PremiumCard>
        </div>
      </FadeUp>

      {/* SECURITY */}

      <FadeUp>
        <SectionTitle
          title="Security Settings"
          subtitle="Access control and monitoring"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Enable Audit Logging
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Track User Activities
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Enable Case Monitoring
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Secure Evidence Access
            </label>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* AI SETTINGS */}

      <FadeUp>
        <SectionTitle
          title="AI Configuration"
          subtitle="NETRAI Intelligence Modules"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Audio Transcription
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Language Detection
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              AI Summarization
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Behavioral Analysis
            </label>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* NOTIFICATIONS */}

      <FadeUp>
        <SectionTitle
          title="Notification Settings"
          subtitle="Manage alerts and updates"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Case Alerts
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Evidence Alerts
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Interview Alerts
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              AI Report Notifications
            </label>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* SYSTEM HEALTH */}

      <FadeUp>
        <SectionTitle
          title="System Health"
          subtitle="Platform status monitoring"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            <div>🟢 Backend Service Running</div>
            <div>🟢 PostgreSQL Connected</div>
            <div>🟢 NETRAI AI Engine Active</div>
            <div>🟢 SANKET Analytics Active</div>
            <div>🟢 File Storage Healthy</div>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* SAVE BUTTON */}

      <FadeUp>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: 600,
              background:
                "linear-gradient(90deg,#2563EB,#60A5FA)",
            }}
          >
            Save Settings
          </button>
        </div>
      </FadeUp>
    </div>
  );
}