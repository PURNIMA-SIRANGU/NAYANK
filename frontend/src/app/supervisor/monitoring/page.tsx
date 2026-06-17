export default function MonitoringPage() {
  const alerts = [
    "High Risk Vehicle Detected",
    "Crowd Density Alert",
    "Suspicious Movement",
    "Pending Evidence Verification",
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Live Monitoring
      </h1>

      <div className="space-y-4">

        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-[#0B1220] p-6 rounded-xl"
          >
            {alert}
          </div>
        ))}

      </div>

    </div>
  );
}