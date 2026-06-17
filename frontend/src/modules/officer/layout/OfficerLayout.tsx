import OfficerSidebar from "./OfficerSidebar";
import OfficerHeader from "./OfficerHeader";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020817]">
      <OfficerSidebar />

      <div className="flex-1">
        <OfficerHeader />
        {children}
      </div>
    </div>
  );
}