import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle,
  X,
  Eye,
  ChevronRight,
  Filter,
  Trash2,
  MoreVertical,
  Settings,
  Archive,
  Star,
  StarOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "critical" | "warning" | "info" | "success";
  timestamp: string;
  read: boolean;
  patient?: string;
  department?: string;
  priority?: "high" | "medium" | "low";
  starred?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Critical Lab Result",
    message: "Patient John Doe has abnormal blood glucose levels requiring immediate attention.",
    type: "critical",
    timestamp: "2 minutes ago",
    read: false,
    patient: "John Doe",
    department: "Laboratory",
    priority: "high",
    starred: true,
    action: {
      label: "Review",
      onClick: () => console.log("Reviewing critical lab result"),
    },
  },
  {
    id: "2",
    title: "Medication Reminder",
    message: "Patient Sarah Johnson is due for scheduled medication at 3:00 PM.",
    type: "warning",
    timestamp: "15 minutes ago",
    read: false,
    patient: "Sarah Johnson",
    department: "Pharmacy",
    priority: "medium",
  },
  {
    id: "3",
    title: "Surgery Schedule Update",
    message: "OR Room 3 scheduling conflict requires immediate attention.",
    type: "critical",
    timestamp: "8 minutes ago",
    read: false,
    department: "Surgery",
    priority: "high",
  },
  {
    id: "4",
    title: "Discharge Ready",
    message: "Patient Michael Chen has completed all requirements and is ready for discharge.",
    type: "success",
    timestamp: "1 hour ago",
    read: true,
    patient: "Michael Chen",
    department: "General Medicine",
    priority: "low",
  },
  {
    id: "5",
    title: "Equipment Alert",
    message: "MRI Machine 2 requires maintenance check.",
    type: "warning",
    timestamp: "1 hour ago",
    read: false,
    department: "Radiology",
    priority: "medium",
  },
  {
    id: "6",
    title: "Appointment Reminder",
    message: "Dr. Smith has a consultation scheduled in 30 minutes with Emma Davis.",
    type: "info",
    timestamp: "2 hours ago",
    read: true,
    patient: "Emma Davis",
    department: "Cardiology",
    priority: "low",
  },
];

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread" | "critical" | "starred">("all");
  const [open, setOpen] = useState(false);

  const unreadCount = notificationList.filter(n => !n.read).length;
  const criticalCount = notificationList.filter(n => n.type === "critical" && !n.read).length;
  const starredCount = notificationList.filter(n => n.starred).length;

  const getTypeConfig = (type: string) => {
    const configs = {
      critical: {
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        badgeColor: "bg-red-500",
        pulse: true
      },
      warning: {
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        badgeColor: "bg-yellow-500",
        pulse: false
      },
      success: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        badgeColor: "bg-green-500",
        pulse: false
      },
      info: {
        icon: Bell,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        badgeColor: "bg-blue-500",
        pulse: false
      }
    };
    return configs[type as keyof typeof configs];
  };

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleStar = (id: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, starred: !notif.starred } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const filteredNotifications = notificationList.filter(notif => {
    switch (filter) {
      case "unread":
        return !notif.read;
      case "critical":
        return notif.type === "critical" && !notif.read;
      case "starred":
        return notif.starred;
      default:
        return true;
    }
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative hover:bg-gray-100 focus:ring-2 focus:ring-violet-200 transition-all duration-200",
            className
          )}
          aria-label={`Notifications - ${unreadCount} unread`}
          aria-describedby="notification-count"
        >
          <Bell 
            className={cn(
              "w-5 h-5 text-gray-700 transition-transform duration-200",
              open && "scale-110",
              criticalCount > 0 && "animate-pulse"
            )} 
            aria-hidden="true" 
          />
          {unreadCount > 0 && (
            <span
              id="notification-count"
              className={cn(
                "absolute -top-1 -right-1 min-w-5 h-5 px-1 text-white text-xs rounded-full flex items-center justify-center font-medium transition-all duration-200",
                criticalCount > 0 ? "bg-red-500 animate-pulse" : "bg-blue-500"
              )}
              aria-live="polite"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-96 max-h-96 overflow-hidden shadow-xl border-0 bg-white rounded-lg"
        side="bottom"
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-violet-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Bell className="w-4 h-4 mr-2 text-violet-600" />
                Notifications
              </h3>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
                {criticalCount > 0 && (
                  <span className="ml-2 text-red-600 font-medium">
                    • {criticalCount} critical
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Filter Menu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Filter className="w-4 h-4" />
                  </Button>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    All ({notificationList.length})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("unread")}>
                    Unread ({unreadCount})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("critical")}>
                    Critical ({criticalCount})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("starred")}>
                    Starred ({starredCount})
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Settings Menu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={markAllAsRead}>
                    <Eye className="w-4 h-4 mr-2" />
                    Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearAll} className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear all
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Notification settings
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 mt-3">
            {["all", "unread", "critical", "starred"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={cn(
                  "px-2 py-1 text-xs rounded-full transition-all duration-200 capitalize",
                  filter === filterType
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                )}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">
                {filter === "all" ? "No notifications" : `No ${filter} notifications`}
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredNotifications.map((notification, index) => {
                const config = getTypeConfig(notification.type);
                const IconComponent = config.icon;
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "relative p-3 rounded-lg border transition-all duration-200 cursor-pointer group hover:shadow-md",
                      config.bgColor,
                      config.borderColor,
                      !notification.read && "ring-1 ring-violet-200 bg-opacity-80",
                      notification.type === "critical" && !notification.read && "ring-2 ring-red-200"
                    )}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    {/* Priority indicator */}
                    {notification.priority === "high" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        config.bgColor,
                        "group-hover:scale-110"
                      )}>
                        <IconComponent className={cn("w-4 h-4", config.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className={cn(
                              "font-medium text-gray-900 truncate transition-all duration-200",
                              !notification.read && "font-semibold"
                            )}>
                              {notification.title}
                            </h4>
                            
                            {/* Patient and Department badges */}
                            {(notification.patient || notification.department) && (
                              <div className="flex items-center space-x-2 mt-1">
                                {notification.patient && (
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    {notification.patient}
                                  </Badge>
                                )}
                                {notification.department && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    {notification.department}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                {notification.timestamp}
                              </span>
                              
                              {notification.action && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-6 text-xs px-2 hover:bg-violet-50 transition-all duration-200 hover:scale-105"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    notification.action?.onClick();
                                  }}
                                >
                                  {notification.action.label}
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-2 flex items-start space-x-1">
                            {/* Star toggle */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(notification.id);
                              }}
                              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80 rounded"
                              aria-label={`${notification.starred ? 'Remove star' : 'Add star'}`}
                            >
                              {notification.starred ? (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              ) : (
                                <StarOff className="w-3 h-3 text-gray-400" />
                              )}
                            </button>

                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className={cn("w-2 h-2 rounded-full mt-1", config.badgeColor)} />
                            )}
                            
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80 rounded text-red-500"
                              aria-label="Delete notification"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full hover:bg-violet-50 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            <Archive className="w-4 h-4 mr-2" />
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
