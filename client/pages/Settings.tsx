import { PlaceholderPage } from "@/components/healthcare/PlaceholderPage";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <PlaceholderPage
      title="System Settings"
      description="Configure user preferences, system settings, and account management. Customize your dashboard, manage notifications, and update profile information."
      icon={<SettingsIcon className="w-16 h-16 text-healthcare-primary" />}
    />
  );
}
