export default function OfficerHeader() {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#08111F] flex items-center justify-between px-8">
      <h1 className="text-white font-semibold">
        NAYANK Investigation Platform
      </h1>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search Cases..."
          className="bg-slate-900 px-4 py-2 rounded-lg text-white"
        />

        <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
      </div>
    </header>
  );
}