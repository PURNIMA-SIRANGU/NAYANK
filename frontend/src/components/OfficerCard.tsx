export default function OfficerCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="
      bg-[#0B1220]
      border
      border-blue-900/30
      rounded-2xl
      p-6
    ">
      {children}
    </div>
  );
}