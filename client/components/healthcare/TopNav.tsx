import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>

        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search.."
              className="pl-10 w-64 bg-gray-50 border-2 border-gray-200 focus:border-gray-300"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </div>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="sm" className="p-1">
            <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-violet-600" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
