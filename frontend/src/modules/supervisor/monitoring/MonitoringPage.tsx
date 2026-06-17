export default function MonitoringPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Investigation Monitoring
      </h1>

      <div className="space-y-4">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          CASE-001 | Investigating
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          CASE-002 | Under Review
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          CASE-003 | Closed
        </div>

      </div>
    </div>
  );
}