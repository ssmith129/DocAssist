import { PlaceholderPage } from "@/components/healthcare/PlaceholderPage";
import { Calendar } from "lucide-react";

export default function Schedule() {
  return (
    <PlaceholderPage
      title="Schedule Management"
      description="Manage appointments, view calendars, and coordinate resources. Schedule patient visits, manage provider availability, and track appointment statuses."
      icon={<Calendar className="w-16 h-16 text-healthcare-primary" />}
    />
  );
}
