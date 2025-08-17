import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  Users,
  Stethoscope,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard-home", icon: Activity },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Clinical", href: "/clinical", icon: Stethoscope },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: 7 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-healthcare-primary text-white shadow-lg sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <Activity className="w-5 h-5 text-healthcare-primary" />
              </div>
              <span className="text-xl font-semibold">DocAssist</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="ml-1 px-1.5 py-0.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-healthcare-secondary border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 h-12 text-sm">
            <span className="text-white/80">Today's Patients</span>
            <span className="text-white/80">My Schedule</span>
            <span className="text-white/80 flex items-center space-x-1">
              <span>Alerts</span>
              <Badge variant="destructive" className="px-1.5 py-0.5 text-xs">
                3
              </Badge>
            </span>
            <span className="text-white/80 flex items-center space-x-1">
              <span>Messages</span>
              <Badge
                variant="secondary"
                className="px-1.5 py-0.5 text-xs bg-white/20 text-white"
              >
                7
              </Badge>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
