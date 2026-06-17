"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import FadeUp from "@/components/motion/FadeUp";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionTitle from "@/components/ui/SectionTitle";
import NayankLoader from "@/components/ui/NayankLoader";

import { getUserCases } from "@/services/case.services";
import { uploadEvidence } from "@/services/evidence.services";
import { uploadToCloudinary } from "@/services/cloudinary.services";

function UploadEvidenceContent() {
  const searchParams = useSearchParams();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedEvidence, setUploadedEvidence] = useState<any>(null);
  
  const [form, setForm] = useState({
    caseId: "",
    type: "IMAGE",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  // Sync automatic case selection whenever parameters parse successfully
  useEffect(() => {
    const caseId = searchParams.get("caseId");
    if (caseId) {
      setForm((prev) => ({
        ...prev,
        caseId,
      }));
    }
  }, [searchParams]);

  const fetchCases = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const data = await getUserCases(userId);
      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.caseId) {
      alert("Select a complaint");
      return;
    }

    if (!file) {
      alert("Select a file");
      return;
    }

    try {
      setUploading(true);
      const fileUrl = await uploadToCloudinary(file);

      const evidence = await uploadEvidence({
        caseId: form.caseId,
        type: form.type,
        fileUrl,
        userId: localStorage.getItem("userId"),
      });

      setUploadedEvidence(evidence);
      alert("Evidence Uploaded Successfully");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Evidence Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <NayankLoader />;
  }

  return (
    <div>
      <FadeUp>
        <SectionTitle
          title="Upload Evidence"
          subtitle="Attach images, videos, audio recordings and documents to an investigation."
        />
      </FadeUp>

      <FadeUp>
        <PremiumCard>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
            <div>
              <label style={{ color: "#94A3B8" }}>Complaint</label>
              <select
                value={form.caseId}
                disabled={!!searchParams.get("caseId")}
                onChange={(e) => setForm({ ...form, caseId: e.target.value })}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "#0F172A",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <option value="">Select Complaint</option>
                {cases.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: "#94A3B8" }}>Evidence Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "#0F172A",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="AUDIO">Audio</option>
                <option value="DOCUMENT">Document</option>
              </select>
            </div>

            <div>
              <label style={{ color: "#94A3B8" }}>Upload File</label>
              <label
                style={{
                  display: "block",
                  marginTop: "10px",
                  padding: "40px",
                  borderRadius: "24px",
                  border: "2px dashed rgba(96,165,250,.35)",
                  background: "rgba(96,165,250,.05)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  style={{ display: "none" }}
                />
                <span style={{ color: "#60A5FA", fontWeight: 500 }}>
                  {file ? "Change File" : "Click to select file"}
                </span>
                {file && (
                  <p style={{ marginTop: "12px", color: "#4ADE80", wordBreak: "break-all", fontSize: "14px" }}>
                    Selected: {file.name}
                  </p>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{
                padding: "18px",
                border: "none",
                borderRadius: "18px",
                background: uploading ? "#475569" : "linear-gradient(90deg,#2563EB,#60A5FA)",
                color: "white",
                fontWeight: 700,
                cursor: uploading ? "not-allowed" : "pointer",
                opacity: uploading ? 0.7 : 1,
              }}
            >
              {uploading ? "Uploading Evidence..." : "Upload Evidence"}
            </button>
          </form>
        </PremiumCard>
      </FadeUp>

      {uploadedEvidence && (
        <FadeUp>
          <PremiumCard style={{ marginTop: "24px" }}>
            <h2 style={{ color: "white" }}>Evidence Uploaded Successfully</h2>
            <p style={{ color: "#4ADE80", marginTop: "4px" }}>AI Processing Started</p>

            <div style={{ marginTop: "20px" }}>
              <Link href={`/citizen/my-complaints/${uploadedEvidence.caseId}`}>
                <button
                  style={{
                    padding: "14px 20px",
                    border: "none",
                    borderRadius: "14px",
                    background: "#2563EB",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  View Complaint →
                </button>
              </Link>
            </div>
          </PremiumCard>
        </FadeUp>
      )}
    </div>
  );
}

// Global wrap wrapper ensuring safe build execution on Server/Client bounds 
export default function UploadEvidence() {
  return (
    <Suspense fallback={<NayankLoader />}>
      <UploadEvidenceContent />
    </Suspense>
  );
}
