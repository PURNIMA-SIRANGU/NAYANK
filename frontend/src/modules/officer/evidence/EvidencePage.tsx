export default function EvidencePage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Evidence Management
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          📹 Video
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          🎤 Audio
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          🖼️ Image
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          📄 Document
        </div>

      </div>

      <div className="bg-[#0B1220] p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Recent Evidence
        </h2>

        <ul className="space-y-3">
          <li>EV-001 | CCTV Footage | Analyzed</li>
          <li>EV-002 | Interview Audio | Processing</li>
          <li>EV-003 | Vehicle Image | Analyzed</li>
        </ul>
      </div>
    </div>
  );
}