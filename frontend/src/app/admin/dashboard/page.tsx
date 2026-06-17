export default function AdminDashboard() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Users
          <h2 className="text-4xl font-bold">500</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Cases
          <h2 className="text-4xl font-bold">220</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Officers
          <h2 className="text-4xl font-bold">48</h2>
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Supervisors
          <h2 className="text-4xl font-bold">12</h2>
        </div>

      </div>

    </div>
  );
}