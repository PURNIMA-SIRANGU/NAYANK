export default function SettingsPage() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        System Settings
      </h1>

      <div className="space-y-4">

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Notification Settings
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Security Settings
        </div>

        <div className="bg-[#0B1220] p-6 rounded-xl">
          Role Permissions
        </div>

      </div>

    </div>
  );
}