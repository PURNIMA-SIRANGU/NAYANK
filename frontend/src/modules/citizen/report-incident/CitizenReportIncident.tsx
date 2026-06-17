"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { createCase } from "@/services/case.services";

export default function CitizenReportIncident() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitCase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Incident title is required");
      return;
    }

    if (!description.trim()) {
      alert("Incident description is required");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.id) {
        alert("User session not found. Please log in again.");
        return;
      }

      const createdCase = await createCase({
        title,
        description,
        createdById: user.id,
      });

      alert("Incident Submitted Successfully");

      // Redirects user to the evidence upload screen with the new case ID query parameter
      router.push(`/citizen/upload-evidence?caseId=${createdCase.id}`);
    } catch (error) {
      console.error("Error creating case:", error);
      alert("Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.04)",
    color: "white",
    outline: "none",
    marginTop: "8px", // Ensures clear spacing from the labels
  };

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="Report Incident"
          subtitle="Create a complaint and immediately attach evidence."
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <form onSubmit={submitCase}>
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              <div>
                <label style={{ color: "#94A3B8", fontSize: "14px" }}>
                  Incident Title
                </label>
                <input
                  style={inputStyle}
                  placeholder="Enter incident title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#94A3B8", fontSize: "14px" }}>
                  Description
                </label>
                <textarea
                  style={{
                    ...inputStyle,
                    minHeight: "180px",
                    resize: "vertical",
                  }}
                  placeholder="Describe the incident in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: "60px",
                  border: "none",
                  borderRadius: "18px",
                  background: loading
                    ? "#475569"
                    : "linear-gradient(135deg,#2563EB,#60A5FA)",
                  color: "white",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Creating Complaint..." : "Create Complaint & Continue"}
              </button>
            </div>
          </form>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}
