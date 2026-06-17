"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CaseDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCase();
    }
  }, [id]);

  async function loadCase() {
    try {
      console.log("Loading Case:", id);

      const res = await fetch(
        `http://localhost:3001/cases/${id}`
      );

      const result = await res.json();

      console.log("Case Data:", result);

      setData(result);
    } catch (error) {
      console.error("Case Load Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading Case...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-red-500">
        Case Not Found
      </div>
    );
  }

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-6">
        {data.title}
      </h1>

      <div className="bg-[#0B1220] p-6 rounded-xl border border-blue-900/30 mb-6">

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <p className="text-slate-400">
              Status
            </p>

            <p className="font-bold text-blue-400">
              {data.status}
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Created
            </p>

            <p>
              {new Date(
                data.createdAt
              ).toLocaleString()}
            </p>
          </div>

        </div>

        <div className="mt-6">

          <h2 className="text-xl font-bold mb-3">
            Description
          </h2>

          <p className="text-slate-300 whitespace-pre-wrap">
            {data.description}
          </p>

        </div>

      </div>

      <h2 className="text-2xl font-bold mb-4">
        Evidence ({data.evidences?.length || 0})
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {data.evidences?.map((e: any) => (
          <div
            key={e.id}
            className="bg-[#0B1220] p-4 rounded-xl border border-blue-900/30"
          >

            <p className="font-bold text-blue-400 mb-3">
              {e.type}
            </p>

            {e.type === "IMAGE" && (
              <img
                src={e.fileUrl}
                alt="Evidence"
                className="w-full rounded-lg"
              />
            )}

            {e.type === "VIDEO" && (
              <video
                controls
                className="w-full rounded-lg"
              >
                <source
                  src={e.fileUrl}
                />
              </video>
            )}

            {e.type === "AUDIO" && (
              <audio
                controls
                className="w-full"
              >
                <source
                  src={e.fileUrl}
                />
              </audio>
            )}

            {e.type === "DOCUMENT" && (
              <a
                href={e.fileUrl}
                target="_blank"
                className="text-blue-400 underline"
              >
                Open Document
              </a>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}