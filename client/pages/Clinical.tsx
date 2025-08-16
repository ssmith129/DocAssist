import { PlaceholderPage } from "@/components/healthcare/PlaceholderPage";
import { Stethoscope } from "lucide-react";

export default function Clinical() {
  return (
    <PlaceholderPage
      title="Clinical Documentation"
      description="Access clinical documentation tools, templates, and patient records. Create progress notes, manage prescriptions, and collaborate with your care team."
      icon={<Stethoscope className="w-16 h-16 text-healthcare-primary" />}
    />
  );
}
