import CitizenLayout from "@/modules/citizen/layout/CitizenLayout";
import CitizenDashboard from "@/modules/citizen/dashboard/CitizenDashboard";

export default function Page() {
  return (
    <CitizenLayout>
      <CitizenDashboard />
    </CitizenLayout>
  );
}