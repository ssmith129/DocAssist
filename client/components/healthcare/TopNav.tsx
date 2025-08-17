import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  return (
    <div className="bg-gray-50 h-[72px] flex items-center justify-between px-7">
      <h1 className="hc-heading-1">
        Overview
      </h1>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <Input
            placeholder="Search.."
            className="pl-12 w-[267px] h-12 bg-gray-50 border-2 border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:border-gray-300"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative w-10 h-10 p-0">
          <Bell className="w-5 h-5 text-gray-700 stroke-[1.5]" />
          <div className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-red-400 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-900 font-medium">3</span>
          </div>
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
          <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center">
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.4424 11.0295C12.6806 11.0295 14.6924 8.81647 14.6924 5.25416C14.6924 2.35701 12.3372 0 9.4424 0C6.54755 0 4.19241 2.35701 4.19241 5.25416C4.19241 8.81647 6.2042 11.0295 9.4424 11.0295ZM9.44999 12.5933C4.75387 12.5933 0 14.0372 0 16.7966C0 19.5561 4.75387 21 9.44999 21C14.1461 21 18.9 19.5561 18.9 16.7966C18.9 14.0372 14.1461 12.5933 9.44999 12.5933Z"
                fill="#9C80F4"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
}
