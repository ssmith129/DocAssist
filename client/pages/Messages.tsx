import { PlaceholderPage } from "@/components/healthcare/PlaceholderPage";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <PlaceholderPage
      title="Secure Messaging"
      description="Communicate securely with your care team, patients, and colleagues. Send HIPAA-compliant messages, share patient information, and coordinate care."
      icon={<MessageSquare className="w-16 h-16 text-healthcare-primary" />}
    />
  );
}
