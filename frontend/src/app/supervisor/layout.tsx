import SupervisorSidebar from "../../modules/supervisor/layout/SupervisorSidebar";

export default function SupervisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#040B14",
        color: "white",
      }}
    >
      <SupervisorSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
        }}
      >
        {children}
      </main>
    </div>
  );
}