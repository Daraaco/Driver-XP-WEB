import Dashboard from "@/features/dashboard/components/Dashboard";
import { Toaster } from "@/components/ui/toaster";

export default function DriverXPDashboard({ entry = "company" }) {
  return (
    <>
      <Dashboard entry={entry} />
      <Toaster />
    </>
  );
}
