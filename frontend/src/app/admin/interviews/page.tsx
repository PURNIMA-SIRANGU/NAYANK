"use client";

import { useEffect, useState } from "react";

import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/motion/FadeUp";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    try {
      const res = await fetch(
        "http://localhost:3001/interviews"
      );

      const data = await res.json();

      setInterviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading Interviews...
      </div>
    );
  }

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
          title="Interview Intelligence Center"
          subtitle="Interview analysis and behavioral insights"
        />
      </FadeUp>

      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >
          <PremiumCard>
            <p>Total Interviews</p>
            <h2>{interviews.length}</h2>
          </PremiumCard>

          <PremiumCard>
            <p>Completed Analysis</p>
            <h2>{interviews.length}</h2>
          </PremiumCard>

          <PremiumCard>
            <p>Behavior Reports</p>
            <h2>{interviews.length}</h2>
          </PremiumCard>

          <PremiumCard>
            <p>Languages Detected</p>
            <h2>5</h2>
          </PremiumCard>
        </div>
      </FadeUp>

      <FadeUp>
        <SectionTitle
          title="Interview Records"
          subtitle="AI processed interviews"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "20px",
          }}
        >
          {interviews.map((item) => (
            <PremiumCard key={item.id}>
              <h3>
                Interview #{item.id}
              </h3>

              <p>
                Language:
                {" "}
                {item.language}
              </p>

              <p>
                Summary:
                {" "}
                Available
              </p>

              <p>
                Transcript:
                {" "}
                Available
              </p>

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <button>
                  View
                </button>
              </div>
            </PremiumCard>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}