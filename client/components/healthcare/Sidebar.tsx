import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  MessageSquare,
  FileText,
  Shield,
  Settings,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Activity,
  TestTube,
  Pill,
  Scan,
  BarChart3,
  UserCog,
  CreditCard,
  ClipboardList,
  Heart,
  Brain,
  Eye,
  Thermometer,
  FileSignature,
  AlertTriangle,
  Clock,
  Archive,
  Database,
  Search,
  Plus,
  Bookmark,
  Bell,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  description?: string;
}

interface MenuSection {
  name: string;
  icon: React.ElementType;
  items: MenuItem[];
  defaultOpen?: boolean;
  priority?: "high" | "medium" | "low";
}

// Reorganized and simplified menu structure
const menuSections: MenuSection[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    defaultOpen: false,
    priority: "high",
    items: [],
  },
  {
    name: "Patient Care",
    icon: Users,
    defaultOpen: false,
    priority: "high",
    items: [],
    href: "/patients",
  },
  {
    name: "Clinical",
    icon: Stethoscope,
    defaultOpen: false,
    priority: "high",
    items: [
      {
        name: "Progress Notes",
        href: "/clinical/progress",
        icon: FileSignature,
        description: "Patient documentation",
      },
      {
        name: "Assessments",
        href: "/clinical/assessments",
        icon: ClipboardList,
        description: "Clinical evaluations",
      },
      {
        name: "Care Plans",
        href: "/clinical/care-plans",
        icon: Heart,
        description: "Treatment planning",
      },
      {
        name: "Vital Signs",
        href: "/clinical/vitals",
        icon: Thermometer,
        description: "Monitor vitals",
      },
    ],
  },
  {
    name: "Diagnostics",
    icon: TestTube,
    defaultOpen: false,
    priority: "medium",
    items: [
      {
        name: "Lab Orders",
        href: "/laboratory/orders",
        icon: TestTube,
        description: "Laboratory tests",
      },
      {
        name: "Lab Results",
        href: "/laboratory/results",
        icon: Activity,
        description: "Test results",
      },
      {
        name: "Imaging",
        href: "/imaging/orders",
        icon: Scan,
        description: "Radiology and imaging",
      },
      {
        name: "Pathology",
        href: "/laboratory/pathology",
        icon: Brain,
        description: "Pathology reports",
      },
    ],
  },
  {
    name: "Pharmacy",
    icon: Pill,
    defaultOpen: false,
    priority: "medium",
    items: [
      {
        name: "Medications",
        href: "/pharmacy/medications",
        icon: Pill,
        description: "Patient medications",
      },
      {
        name: "Prescriptions",
        href: "/pharmacy/prescriptions",
        icon: FileSignature,
        description: "Write prescriptions",
      },
      {
        name: "Drug Interactions",
        href: "/pharmacy/interactions",
        icon: AlertTriangle,
        description: "Check interactions",
      },
    ],
  },
  {
    name: "Scheduling",
    icon: Calendar,
    defaultOpen: false,
    priority: "medium",
    items: [
      {
        name: "Appointments",
        href: "/schedule",
        icon: Calendar,
        description: "Manage appointments",
      },
      {
        name: "Calendar View",
        href: "/schedule/calendar",
        icon: Calendar,
        description: "Calendar interface",
      },
      {
        name: "Waitlist",
        href: "/schedule/waitlist",
        icon: Clock,
        description: "Patient waitlist",
      },
    ],
  },
];

// Simplified system items
const systemItems: MenuItem[] = [
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Reports and metrics",
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
    description: "Communication hub",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    description: "Generate reports",
  },
];

const bottomItems: MenuItem[] = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System configuration",
  },
];

// Quick access items for frequent actions
const quickAccessItems: MenuItem[] = [
  {
    name: "Emergency",
    href: "/emergency",
    icon: AlertTriangle,
    badge: "2",
    description: "Emergency alerts",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: "5",
    description: "System notifications",
  },
];

export function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(
      menuSections.map((section) => [
        section.name,
        section.defaultOpen || false,
      ]),
    ),
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-expand section when navigating to its items
  useEffect(() => {
    menuSections.forEach((section) => {
      const hasActiveItem = section.items.some(
        (item) =>
          location.pathname === item.href ||
          (item.href !== "/" && location.pathname.startsWith(item.href)),
      );
      if (hasActiveItem && !openSections[section.name]) {
        setOpenSections((prev) => ({ ...prev, [section.name]: true }));
      }
    });
  }, [location.pathname]);

  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const isItemActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-violet-600";
      case "medium":
        return "text-blue-600";
      case "low":
        return "text-gray-600";
      default:
        return "text-violet-600";
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-[280px]"
      }`}
    >
      {/* Enhanced Logo Section */}
      <div
        className={`px-6 py-6 border-b border-gray-100 relative ${isCollapsed ? "px-4" : ""}`}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">HealthCare</h1>
                <p className="text-xs text-gray-500">EHR System</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Bar */}
      {!isCollapsed && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Access
            </h3>
          </div>
          <div className="flex space-x-2 mt-2">
            {quickAccessItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group",
                  isItemActive(item.href)
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-600 shadow-sm",
                )}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
                {hoveredItem === item.href && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-2">
          {/* Main Menu Sections */}
          {menuSections.map((section) => (
            <div key={section.name} className="mb-1">
              {/* Dashboard as direct link, others as expandable sections */}
              {section.name === "Dashboard" ? (
                <Link
                  to="/"
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group",
                    "hover:bg-violet-50 hover:text-violet-700",
                    isItemActive("/")
                      ? "bg-violet-100 text-violet-800 shadow-sm border-l-2 border-violet-600"
                      : "text-gray-700",
                    isCollapsed ? "justify-center" : "",
                  )}
                  onMouseEnter={() => setHoveredItem(section.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label="Main Dashboard"
                >
                  <div className="flex items-center space-x-3">
                    <section.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        getPriorityColor(section.priority),
                      )}
                    />
                    {!isCollapsed && (
                      <span className="font-medium">{section.name}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex items-center space-x-1">
                      {section.priority === "high" && (
                        <div className="w-2 h-2 bg-violet-500 rounded-full" />
                      )}
                      {isItemActive("/") && (
                        <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
                      )}
                    </div>
                  )}
                  {isCollapsed && hoveredItem === section.name && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50">
                      {section.name}
                    </div>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => !isCollapsed && toggleSection(section.name)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group",
                      "hover:bg-violet-50 hover:text-violet-700",
                      openSections[section.name] && !isCollapsed
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-700",
                      isCollapsed ? "justify-center" : "",
                    )}
                    onMouseEnter={() => setHoveredItem(section.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    aria-expanded={openSections[section.name]}
                    aria-label={`${section.name} section`}
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          getPriorityColor(section.priority),
                        )}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{section.name}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex items-center space-x-1">
                        {section.priority === "high" && (
                          <div className="w-2 h-2 bg-violet-500 rounded-full" />
                        )}
                        {openSections[section.name] ? (
                          <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                        ) : (
                          <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                        )}
                      </div>
                    )}
                    {isCollapsed && hoveredItem === section.name && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50">
                        {section.name}
                      </div>
                    )}
                  </button>

                  {/* Section Items */}
                  {openSections[section.name] && !isCollapsed && (
                    <div className="ml-8 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-300 group",
                            isItemActive(item.href)
                              ? "bg-violet-100 text-violet-800 font-medium shadow-sm border-l-2 border-violet-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          )}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                          aria-label={`${item.name} - ${item.description}`}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4" aria-hidden="true" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span
                                className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse"
                                aria-label={`${item.badge} notifications`}
                              >
                                {item.badge}
                              </span>
                            )}
                            {isItemActive(item.href) && (
                              <div
                                className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          {hoveredItem === item.href && (
                            <div
                              className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50"
                              role="tooltip"
                            >
                              {item.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="h-px bg-gray-200 my-4" />

          {/* System Items */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </div>
            )}
            {systemItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-300 group",
                  isItemActive(item.href)
                    ? "bg-violet-100 text-violet-800 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isCollapsed ? "justify-center" : "",
                )}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.name}</span>}
                {item.badge && !isCollapsed && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isCollapsed && hoveredItem === item.href && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Section */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-300 group",
                isItemActive(item.href)
                  ? "bg-violet-100 text-violet-800 font-medium"
                  : "text-gray-600 hover:bg-white hover:text-gray-900",
                isCollapsed ? "justify-center" : "",
              )}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.name}</span>}
              {isCollapsed && hoveredItem === item.href && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                  {item.description}
                </div>
              )}
            </Link>
          ))}

          {/* User Profile Section */}
          {!isCollapsed && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">DR</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Dr. Sarah Johnson
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Attending Physician
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
