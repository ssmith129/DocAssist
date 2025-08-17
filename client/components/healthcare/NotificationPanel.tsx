import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  action?: {
    label: string;
    onClick: () => void;
  };
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Critical Lab Result",
    message:
      "Patient John Doe has abnormal blood glucose levels requiring immediate attention.",
    type: "critical",
    timestamp: "2 minutes ago",
    read: false,
    patient: "John Doe",
    department: "Laboratory",
    action: {
      label: "Review",
      onClick: () => console.log("Reviewing critical lab result"),
    },
  },
  {
    id: "2",
    title: "Medication Reminder",
    message:
      "Patient Sarah Johnson is due for scheduled medication at 3:00 PM.",
    type: "warning",
    timestamp: "15 minutes ago",
    read: false,
    patient: "Sarah Johnson",
    department: "Pharmacy",
  },
  {
    id: "3",
    title: "Discharge Ready",
    message:
      "Patient Michael Chen has completed all requirements and is ready for discharge.",
    type: "success",
    timestamp: "1 hour ago",
    read: true,
    patient: "Michael Chen",
    department: "General Medicine",
  },
  {
    id: "4",
    title: "Appointment Reminder",
    message:
      "Dr. Smith has a consultation scheduled in 30 minutes with Emma Davis.",
    type: "info",
    timestamp: "2 hours ago",
    read: true,
    patient: "Emma Davis",
    department: "Cardiology",
  },
];

export function NotificationPanel() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const getTypeConfig = (type: string) => {
    const configs = {
      critical: {
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        badgeColor: "bg-red-500",
        pulse: true,
      },
      warning: {
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        badgeColor: "bg-yellow-500",
        pulse: false,
      },
      success: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        badgeColor: "bg-green-500",
        pulse: false,
      },
      info: {
        icon: Bell,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        badgeColor: "bg-blue-500",
        pulse: false,
      },
    };
    return configs[type as keyof typeof configs];
  };

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notificationList.filter((notif) => {
    switch (filter) {
      case "unread":
        return !notif.read;
      case "critical":
        return notif.type === "critical";
      default:
        return true;
    }
  });

  const unreadCount = notificationList.filter((n) => !n.read).length;
  const criticalCount = notificationList.filter(
    (n) => n.type === "critical",
  ).length;

  return (
    <Card
      className={cn(
        "shadow-lg transition-all duration-500",
        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-violet-600" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {unreadCount}
                  </span>
                </div>
              )}
            </div>
            <CardTitle className="text-lg font-bold text-gray-700">
              Notifications
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-violet-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter === "all"
                  ? "All"
                  : filter === "unread"
                    ? "Unread"
                    : "Critical"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="animate-in slide-in-from-top-2"
            >
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("unread")}>
                Unread ({unreadCount})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("critical")}>
                Critical ({criticalCount})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const config = getTypeConfig(notification.type);
            const IconComponent = config.icon;

            return (
              <div
                key={notification.id}
                className={cn(
                  "relative p-4 rounded-lg border transition-all duration-300 cursor-pointer group",
                  config.bgColor,
                  config.borderColor,
                  !notification.read && "ring-2 ring-violet-200",
                  hoveredId === notification.id && "shadow-md",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredId(notification.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  !notification.read && markAsRead(notification.id)
                }
              >
                {/* Pulse indicator for critical notifications */}
                {config.pulse && !notification.read && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}

                <div className="flex items-start space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      config.bgColor,
                      "",
                    )}
                  >
                    <IconComponent className={cn("w-4 h-4", config.color)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-medium text-gray-900 transition-all duration-300",
                            !notification.read && "font-semibold",
                          )}
                        >
                          {notification.title}
                        </h4>

                        {notification.patient && (
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {notification.patient}
                            </Badge>
                            {notification.department && (
                              <Badge variant="secondary" className="text-xs">
                                {notification.department}
                              </Badge>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>

                          {notification.action && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs hover:bg-violet-50 transition-all duration-300"
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

                      <div className="ml-2 flex items-center space-x-1">
                        {!notification.read && (
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              config.badgeColor,
                            )}
                          />
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="animate-in slide-in-from-top-2"
                          >
                            {!notification.read && (
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300",
                    hoveredId === notification.id ? "w-full" : "w-0",
                  )}
                />
              </div>
            );
          })
        )}

        {filteredNotifications.length > 0 && (
          <div className="text-center pt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-violet-50 transition-all duration-300"
            >
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
