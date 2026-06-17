export default function UsersPage() {

  const users = [
    "Citizen",
    "Officer",
    "Supervisor",
    "Admin",
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        User Management
      </h1>

      <div className="space-y-4">

        {users.map((user) => (
          <div
            key={user}
            className="bg-[#0B1220] p-6 rounded-xl"
          >
            {user}
          </div>
        ))}

      </div>

    </div>
  );
}