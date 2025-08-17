import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  MessageSquare,
  FileText,
  Shield,
  Wrench,
  Settings,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Appointments", href: "/schedule", icon: Calendar },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Rooms", href: "/rooms", icon: Building2 },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Files", href: "/files", icon: FileText },
];

const bottomItems = [
  { name: "Authentications", href: "/auth", icon: Shield },
  { name: "Utility", href: "/utility", icon: Wrench },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-[228px] h-screen bg-white shadow-lg">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-gray-900">Sprkl</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-violet-50 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive ? "text-violet-600" : "text-violet-600",
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6" />

        {/* Bottom navigation */}
        <div className="space-y-2">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-violet-50 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive ? "text-violet-600" : "text-gray-600",
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Settings at bottom */}
      <div className="p-6">
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-6 h-6 text-violet-600" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
