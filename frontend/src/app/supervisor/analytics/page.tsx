export default function AnalyticsPage() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Crime Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Crime Hotspots
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Risk Zones
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Weekly Trends
        </div>

      </div>

    </div>
  );
}