import OfficerSidebar from "@/modules/officer/layout/OfficerSidebar";
import OfficerHeader from "@/modules/officer/layout/OfficerHeader";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <OfficerHeader />

        <main
  style={{
    flex: 1,
    padding: "40px",
    overflowY: "auto",
  }}
>
  {children}
</main>
      </div>
    </div>
  );
}