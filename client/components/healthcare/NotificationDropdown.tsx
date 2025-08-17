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
  BellDot,
  ArrowUpRight,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
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
  const [showActions, setShowActions] = useState(false);

  const unreadCount = notificationList.filter(n => !n.read).length;
  const criticalCount = notificationList.filter(n => n.type === "critical" && !n.read).length;
  const starredCount = notificationList.filter(n => n.starred).length;

  const getTypeConfig = (type: string) => {
    const configs = {
      critical: {
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50/80",
        borderColor: "border-red-200",
        badgeColor: "bg-red-500",
        pulse: true,
        gradient: "from-red-50 to-red-100"
      },
      warning: {
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50/80",
        borderColor: "border-amber-200",
        badgeColor: "bg-amber-500",
        pulse: false,
        gradient: "from-amber-50 to-amber-100"
      },
      success: {
        icon: CheckCircle,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50/80",
        borderColor: "border-emerald-200",
        badgeColor: "bg-emerald-500",
        pulse: false,
        gradient: "from-emerald-50 to-emerald-100"
      },
      info: {
        icon: BellDot,
        color: "text-blue-600",
        bgColor: "bg-blue-50/80",
        borderColor: "border-blue-200",
        badgeColor: "bg-blue-500",
        pulse: false,
        gradient: "from-blue-50 to-blue-100"
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

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-3 h-3 text-red-500" />;
      case "medium":
        return <Clock className="w-3 h-3 text-amber-500" />;
      case "low":
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative hover:bg-gray-100/80 focus:ring-2 focus:ring-violet-200 transition-all duration-200 rounded-lg",
            className
          )}
          aria-label={`Notifications - ${unreadCount} unread`}
          aria-describedby="notification-count"
        >
          <Bell
            className={cn(
              "w-5 h-5 text-gray-700 transition-all duration-200",
              criticalCount > 0 && "text-red-600",
              unreadCount > 0 && "text-blue-600"
            )}
            aria-hidden="true"
          />
          {unreadCount > 0 && (
            <span
              id="notification-count"
              className={cn(
                "absolute -top-1 -right-1 min-w-5 h-5 px-1 text-white text-xs rounded-full flex items-center justify-center font-medium transition-all duration-300 shadow-sm",
                criticalCount > 0
                  ? "bg-red-500 ring-2 ring-red-200"
                  : "bg-blue-500",
                unreadCount > 99 && "px-0.5"
              )}
              aria-live="polite"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          {criticalCount > 0 && (
            <span className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-[420px] max-h-[500px] overflow-hidden shadow-2xl border-0 bg-white rounded-xl p-0"
        side="bottom"
        sideOffset={12}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-5 border-b bg-gradient-to-r from-violet-50 via-blue-50 to-indigo-50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Bell className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Notifications
                </h3>
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                  {unreadCount > 0 ? (
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{unreadCount} unread</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <CheckCheck className="w-4 h-4 text-green-500" />
                      <span>All caught up!</span>
                    </span>
                  )}
                  {criticalCount > 0 && (
                    <span className="flex items-center space-x-1 text-red-600 font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{criticalCount} critical</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Quick actions */}
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-8 px-3 text-xs hover:bg-white/80 rounded-lg"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Mark all read
                </Button>
              )}
              
              {/* Actions Menu */}
              <DropdownMenu open={showActions} onOpenChange={setShowActions}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/80 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 mt-4">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            {[
              { key: "all", label: "All", count: notificationList.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "critical", label: "Critical", count: criticalCount },
              { key: "starred", label: "Starred", count: starredCount }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center space-x-1.5 border",
                  filter === filterOption.key
                    ? "bg-violet-600 text-white shadow-md border-violet-600 ring-2 ring-violet-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                )}
              >
                <span>{filterOption.label}</span>
                {filterOption.count > 0 && (
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-medium",
                    filter === filterOption.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {filterOption.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {filter === "all" ? "No notifications" : `No ${filter} notifications`}
              </p>
              <p className="text-xs text-gray-400">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-3">
              {filteredNotifications.map((notification, index) => {
                const config = getTypeConfig(notification.type);
                const IconComponent = config.icon;
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "relative p-4 rounded-xl border transition-all duration-200 cursor-pointer group hover:shadow-md",
                      config.bgColor,
                      config.borderColor,
                      !notification.read && "ring-1 ring-violet-200/50 shadow-sm",
                      notification.type === "critical" && !notification.read && "ring-2 ring-red-200 shadow-red-100",
                      "hover:border-opacity-60"
                    )}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    {/* Priority indicator */}
                    {notification.priority === "high" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg transition-all duration-200 shadow-sm",
                        `bg-gradient-to-br ${config.gradient}`,
                        config.borderColor,
                        "border"
                      )}>
                        <IconComponent className={cn("w-4 h-4", config.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className={cn(
                                "font-medium text-gray-900 truncate transition-all duration-200",
                                !notification.read && "font-semibold"
                              )}>
                                {notification.title}
                              </h4>
                              {getPriorityIcon(notification.priority)}
                            </div>
                            
                            {/* Patient and Department badges */}
                            {(notification.patient || notification.department) && (
                              <div className="flex items-center space-x-2 mt-2">
                                {notification.patient && (
                                  <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium">
                                    👤 {notification.patient}
                                  </Badge>
                                )}
                                {notification.department && (
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5 font-medium bg-gray-100 text-gray-700">
                                    🏥 {notification.department}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs text-gray-500 font-medium">
                                {notification.timestamp}
                              </span>
                              
                              {notification.action && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs px-3 hover:bg-violet-50 transition-all duration-200 font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    notification.action?.onClick();
                                  }}
                                >
                                  {notification.action.label}
                                  <ArrowUpRight className="w-3 h-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-3 flex items-start space-x-2">
                            {/* Star toggle */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(notification.id);
                              }}
                              className="p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/80 rounded-lg"
                              aria-label={`${notification.starred ? 'Remove star' : 'Add star'}`}
                            >
                              {notification.starred ? (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              ) : (
                                <StarOff className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                              )}
                            </button>

                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className={cn(
                                "w-2.5 h-2.5 rounded-full mt-1.5 shadow-sm",
                                config.badgeColor
                              )} />
                            )}
                            
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600"
                              aria-label="Delete notification"
                            >
                              <X className="w-4 h-4" />
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
        <div className="sticky bottom-0 border-t bg-gray-50/80 backdrop-blur-sm p-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full hover:bg-violet-50 transition-all duration-200 font-medium border-gray-200 hover:border-violet-200"
            onClick={() => setOpen(false)}
          >
            <Archive className="w-4 h-4 mr-2" />
            View All Notifications
            <ArrowUpRight className="w-4 h-4 ml-auto" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
