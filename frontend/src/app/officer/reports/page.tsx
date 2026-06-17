export default function ReportsPage() {
  const reports = [
    "CASE-001 Investigation Report",
    "CASE-002 Investigation Report",
    "CASE-003 Investigation Report",
    "CASE-004 Investigation Report",
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Investigation Reports
      </h1>

      <div className="space-y-4">

        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-[#0B1220] p-6 rounded-xl flex justify-between items-center"
          >
            <span>{report}</span>

            <button className="bg-blue-600 px-4 py-2 rounded-lg">
              Download
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}