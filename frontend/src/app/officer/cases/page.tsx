export default function CasesPage() {
  const cases = [
    {
      id: "CASE-001",
      title: "House Theft Investigation",
      status: "OPEN",
      priority: "HIGH",
    },
    {
      id: "CASE-002",
      title: "Missing Person",
      status: "INVESTIGATING",
      priority: "MEDIUM",
    },
    {
      id: "CASE-003",
      title: "Vehicle Theft",
      status: "CLOSED",
      priority: "LOW",
    },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Investigation Cases
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((item) => (
          <div
            key={item.id}
            className="bg-[#0B1220] p-6 rounded-xl border border-blue-900/30"
          >
            <h2 className="text-2xl font-bold">
              {item.id}
            </h2>

            <p className="text-slate-400 mt-2">
              {item.title}
            </p>

            <div className="flex gap-8 mt-4">
              <span>
                Status:
                <span className="text-blue-400 ml-1">
                  {item.status}
                </span>
              </span>

              <span>
                Priority:
                <span className="text-red-400 ml-1">
                  {item.priority}
                </span>
              </span>
            </div>

            <button className="mt-5 px-5 py-2 bg-blue-600 rounded-lg">
              View Case
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}