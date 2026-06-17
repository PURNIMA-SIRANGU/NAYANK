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
      <FadeUp>
        <SectionTitle
          title="System Configuration Center"
          subtitle="Manage platform settings and administration"
        />
      </FadeUp>

      {/* SYSTEM */}

      <FadeUp>
        <SectionTitle
          title="Platform Information"
          subtitle="NAYANK Core Settings"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            <div>
              <strong>
                Platform Name:
              </strong>
              <p>NAYANK</p>
            </div>

            <div>
              <strong>
                AI Engine:
              </strong>
              <p>
                NETRAI Nexus
              </p>
            </div>

            <div>
              <strong>
                Analytics Engine:
              </strong>
              <p>SANKET</p>
            </div>

            <div>
              <strong>
                Version:
              </strong>
              <p>1.0.0</p>
            </div>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* AI */}

      <FadeUp>
        <SectionTitle
          title="AI Configuration"
          subtitle="NETRAI Intelligence Services"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
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

      {/* SECURITY */}

      <FadeUp>
        <SectionTitle
          title="Security Settings"
          subtitle="Access control and permissions"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
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
              Case Activity Tracking
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Evidence Monitoring
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              User Activity Monitoring
            </label>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* NOTIFICATIONS */}

      <FadeUp>
        <SectionTitle
          title="Notification Settings"
          subtitle="System alerts and notifications"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
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
              AI Report Alerts
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked
              />
              {" "}
              Supervisor Alerts
            </label>
          </div>
        </PremiumCard>
      </FadeUp>

      {/* SYSTEM STATUS */}

      <FadeUp>
        <SectionTitle
          title="System Status"
          subtitle="Service monitoring"
        />

        <PremiumCard>
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            <div>
              🟢 Backend Service
            </div>

            <div>
              🟢 Database Service
            </div>

            <div>
              🟢 NETRAI Engine
            </div>

            <div>
              🟢 SANKET Analytics
            </div>
          </div>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}