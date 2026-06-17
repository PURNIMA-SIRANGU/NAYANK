export default function SupervisorDashboard() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Supervisor Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <h3>Total Cases</h3>
          <p className="text-4xl font-bold mt-2">124</p>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <h3>Active Officers</h3>
          <p className="text-4xl font-bold mt-2">18</p>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <h3>Pending Reviews</h3>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          <h3>Critical Alerts</h3>
          <p className="text-4xl font-bold mt-2 text-red-400">4</p>
        </div>

      </div>
    </div>
  );
}