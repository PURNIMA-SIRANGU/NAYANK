export default function AuditPage() {

  const logs = [
    "Officer created case",
    "Citizen uploaded evidence",
    "Admin updated settings",
    "Supervisor approved report",
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Audit Logs
      </h1>

      <div className="space-y-4">

        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-[#0B1220] p-6 rounded-xl"
          >
            {log}
          </div>
        ))}

      </div>

    </div>
  );
}