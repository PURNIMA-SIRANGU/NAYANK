export default function SupervisorDashboard() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Supervisor Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <p>Active Cases</p>
          <h2 className="text-4xl font-bold">54</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <p>Officers</p>
          <h2 className="text-4xl font-bold">18</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <p>High Risk Alerts</p>
          <h2 className="text-4xl font-bold text-red-400">7</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <p>Reports</p>
          <h2 className="text-4xl font-bold">32</h2>
        </div>

      </div>
    </div>
  );
}