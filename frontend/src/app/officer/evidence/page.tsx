export default function EvidencePage() {
  const evidence = [
    {
      id: "EVD-001",
      caseId: "CASE-001",
      type: "IMAGE",
      status: "VERIFIED",
    },
    {
      id: "EVD-002",
      caseId: "CASE-002",
      type: "VIDEO",
      status: "PENDING",
    },
    {
      id: "EVD-003",
      caseId: "CASE-003",
      type: "DOCUMENT",
      status: "VERIFIED",
    },
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Evidence Management
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#0B1220] p-5 rounded-xl">
          <p>Total Evidence</p>
          <h2 className="text-4xl font-bold">132</h2>
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          <p>Images</p>
          <h2 className="text-4xl font-bold">76</h2>
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          <p>Videos</p>
          <h2 className="text-4xl font-bold">32</h2>
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          <p>Documents</p>
          <h2 className="text-4xl font-bold">24</h2>
        </div>

      </div>

      <div className="bg-[#0B1220] p-6 rounded-xl">

        <table className="w-full">

          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="py-3">Evidence ID</th>
              <th>Case</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {evidence.map((item) => (
              <tr key={item.id}>
                <td className="py-4">{item.id}</td>
                <td>{item.caseId}</td>
                <td>{item.type}</td>
                <td className="text-green-400">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}