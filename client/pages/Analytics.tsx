import { PlaceholderPage } from "@/components/healthcare/PlaceholderPage";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <PlaceholderPage
      title="Analytics & Reports"
      description="View comprehensive analytics, performance metrics, and quality measures. Generate reports on patient outcomes, operational efficiency, and clinical indicators."
      icon={<BarChart3 className="w-16 h-16 text-healthcare-primary" />}
    />
  );
}
