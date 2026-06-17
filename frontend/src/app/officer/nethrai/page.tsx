export default function NethraiPage() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        NETRAI Intelligence Engine
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Face Recognition
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Vehicle Detection
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          ANPR Recognition
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Behaviour Analysis
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Timeline Generation
        </div>

        <div className="bg-[#0B1220] p-8 rounded-xl">
          Person Tracking
        </div>

      </div>

    </div>
  );
}