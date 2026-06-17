export default function SanketPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        SANKET Audio Intelligence
      </h1>

      <div className="space-y-4">

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Audio Uploaded
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Transcription Complete
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Translation Complete
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Summary Generated
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Entities Extracted
        </div>

        <div className="bg-[#0B1220] p-5 rounded-xl">
          Behavior Analysis Complete
        </div>

      </div>
    </div>
  );
}