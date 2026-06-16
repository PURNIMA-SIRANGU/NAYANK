"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";

import { createCase } from "@/services/case.services";

export default function CitizenReportIncident() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const submitCase =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );

        await createCase({
          title,
          description,

          createdById:
            user.id,
        });

        alert(
          "Incident Submitted Successfully"
        );

        router.push(
          "/citizen/my-complaints"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to submit incident"
        );
      } finally {
        setLoading(false);
      }
    };

  const inputStyle = {
    width: "100%",

    padding: "16px",

    borderRadius: "18px",

    border:
      "1px solid rgba(255,255,255,.08)",

    background:
      "rgba(255,255,255,.04)",

    color: "white",

    outline: "none",
  };

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="Report Incident"
          subtitle="Create a new complaint and begin the investigation process."
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <form
            onSubmit={
              submitCase
            }
          >
            <div
              style={{
                display:
                  "grid",

                gap: "20px",
              }}
            >
              <div>
                <label>
                  Incident Title
                </label>

                <input
                  style={
                    inputStyle
                  }
                  placeholder="Enter incident title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target
                        .value
                    )
                  }
                />
              </div>

              <div>
                <label>
                  Description
                </label>

                <textarea
                  style={{
                    ...inputStyle,

                    minHeight:
                      "180px",

                    resize:
                      "vertical",
                  }}
                  placeholder="Describe the incident in detail..."
                  value={
                    description
                  }
                  onChange={(e) =>
                    setDescription(
                      e.target
                        .value
                    )
                  }
                />
              </div>

              <button
                type="submit"
                disabled={
                  loading
                }
                style={{
                  height:
                    "60px",

                  border:
                    "none",

                  borderRadius:
                    "18px",

                  background:
                    "linear-gradient(135deg,#2563EB,#60A5FA)",

                  color:
                    "white",

                  fontWeight:
                    700,

                  cursor:
                    "pointer",
                }}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Incident"}
              </button>
            </div>
          </form>
        </PremiumCard>
      </FadeUp>
    </div>
  );
}