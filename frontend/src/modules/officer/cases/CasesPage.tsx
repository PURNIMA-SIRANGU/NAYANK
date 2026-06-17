export default function CasesPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Investigation Cases</h1>

      <div className="grid gap-4">

        <div className="bg-[#0B1220] p-6 rounded-xl border border-blue-900/30">
          <h2 className="text-xl font-semibold">
            CASE-001
          </h2>

          <p className="text-slate-400 mt-2">
            House Theft Investigation
          </p>

          <div className="mt-4 flex gap-4">
            <span>OPEN</span>
            <span>HIGH PRIORITY</span>
          </div>
        </div>

      </div>
    </div>
  );
}