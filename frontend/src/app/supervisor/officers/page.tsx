export default function OfficersPage() {

  const officers = [
    "Officer Ravi",
    "Officer Kiran",
    "Officer Teja",
    "Officer Suresh",
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Officer Management
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {officers.map((officer) => (
          <div
            key={officer}
            className="bg-[#0B1220] p-6 rounded-xl"
          >
            {officer}
          </div>
        ))}

      </div>

    </div>
  );
}