export default function ReportsPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Investigation Reports
      </h1>

      <div className="bg-[#0B1220] p-6 rounded-xl">

        <h2 className="text-xl font-semibold mb-4">
          CASE-001 Report
        </h2>

        <ul className="space-y-2">
          <li>Case Summary</li>
          <li>Evidence Summary</li>
          <li>NETHRAI Findings</li>
          <li>SANKET Findings</li>
          <li>Risk Assessment</li>
          <li>Recommendations</li>
        </ul>

      </div>
    </div>
  );
}