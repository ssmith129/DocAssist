import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { AppointmentsTable } from "@/components/healthcare/AppointmentsTable";
import { PatientsTable } from "@/components/healthcare/PatientsTable";
import {
  PatientChart,
  PatientTypeChart,
} from "@/components/healthcare/PatientChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Heart,
  Thermometer,
  Stethoscope,
  Building2,
  UserPlus,
  Bed,
  ClipboardList,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Analytics data
const patientFlowData = [
  { month: "Jan", admissions: 45, discharges: 42, transfers: 8 },
  { month: "Feb", admissions: 52, discharges: 48, transfers: 12 },
  { month: "Mar", admissions: 48, discharges: 51, transfers: 6 },
  { month: "Apr", admissions: 61, discharges: 55, transfers: 14 },
  { month: "May", admissions: 55, discharges: 58, transfers: 10 },
  { month: "Jun", admissions: 67, discharges: 62, transfers: 18 },
];

const departmentUtilization = [
  { name: "Emergency", value: 85, color: "#EF4444", change: "+5%" },
  { name: "ICU", value: 92, color: "#F97316", change: "-2%" },
  { name: "General Medicine", value: 78, color: "#EAB308", change: "+8%" },
  { name: "Surgery", value: 67, color: "#22C55E", change: "+12%" },
  { name: "Pediatrics", value: 54, color: "#3B82F6", change: "-1%" },
  { name: "Maternity", value: 71, color: "#8B5CF6", change: "+3%" },
];

const qualityMetrics = [
  {
    metric: "Patient Satisfaction",
    score: "4.7/5.0",
    trend: "up",
    change: "+0.3",
    target: "4.5",
    icon: Heart,
  },
  {
    metric: "Average Length of Stay",
    score: "3.2 days",
    trend: "down",
    change: "-0.5",
    target: "3.0",
    icon: Clock,
  },
  {
    metric: "Readmission Rate",
    score: "8.4%",
    trend: "down",
    change: "-1.2%",
    target: "7.0%",
    icon: Activity,
  },
  {
    metric: "Staff Efficiency",
    score: "89.3%",
    trend: "up",
    change: "+2.1%",
    target: "90.0%",
    icon: Target,
  },
];

// Quick action items for overview
const quickActions = [
  {
    id: 1,
    title: "Review Critical Alerts",
    description: "3 high-priority patient alerts requiring immediate attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    urgent: true,
    count: 3,
    href: "/alerts",
  },
  {
    id: 2,
    title: "Pending Lab Results",
    description: "15 lab results ready for physician review",
    icon: ClipboardList,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    urgent: false,
    count: 15,
    href: "/laboratory/results",
  },
  {
    id: 3,
    title: "Schedule Rounds",
    description: "Morning rounds starting in 30 minutes",
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    urgent: false,
    count: null,
    href: "/schedule/rounds",
  },
  {
    id: 4,
    title: "Discharge Prep",
    description: "5 patients ready for discharge processing",
    icon: CheckCircle,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    urgent: false,
    count: 5,
    href: "/patients/discharge",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Patient Admission",
    patient: "Sarah Johnson",
    time: "2 minutes ago",
    department: "Emergency",
    status: "critical",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "Lab Result",
    patient: "Michael Chen",
    time: "5 minutes ago",
    department: "Laboratory",
    status: "normal",
    icon: ClipboardList,
  },
  {
    id: 3,
    type: "Discharge",
    patient: "Emma Davis",
    time: "12 minutes ago",
    department: "General Medicine",
    status: "completed",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "Surgery Scheduled",
    patient: "Robert Wilson",
    time: "18 minutes ago",
    department: "Surgery",
    status: "scheduled",
    icon: Calendar,
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      critical: { color: "bg-red-100 text-red-800", dot: "bg-red-500" },
      normal: { color: "bg-green-100 text-green-800", dot: "bg-green-500" },
      completed: { color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
      scheduled: {
        color: "bg-yellow-100 text-yellow-800",
        dot: "bg-yellow-500",
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
        <Badge className={`${config.color} border-0`}>{status}</Badge>
      </div>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <BaseLayout title="Dashboard">
      <div className="space-y-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="transition-all duration-300">
            <StatsCard
              title="New Patients Today"
              value="15"
              variant="primary"
              change={{ value: "+12%", trend: "up", period: "vs yesterday" }}
              icon={
                <div className="p-3 rounded-full bg-violet-100">
                  <UserPlus className="w-8 h-8 text-violet-600" />
                </div>
              }
            />
          </div>
          <div className="transition-all duration-300">
            <StatsCard
              title="Total Active Patients"
              value="1,247"
              change={{ value: "+3.2%", trend: "up", period: "this month" }}
              icon={
                <div className="p-3 rounded-full bg-emerald-100">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
              }
            />
          </div>
          <div className="transition-all duration-300">
            <StatsCard
              title="Bed Occupancy"
              value="87%"
              change={{ value: "-2%", trend: "down", period: "optimal level" }}
              icon={
                <div className="p-3 rounded-full bg-blue-100">
                  <Bed className="w-8 h-8 text-blue-600" />
                </div>
              }
            />
          </div>
          <div className="transition-all duration-300">
            <StatsCard
              title="Patient Satisfaction"
              value="4.7/5"
              change={{ value: "+0.3", trend: "up", period: "this quarter" }}
              icon={
                <div className="p-3 rounded-full bg-green-100">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
              }
            />
          </div>
        </div>

        {/* Enhanced Control Panel */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-violet-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList className="bg-white/80 backdrop-blur-sm">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-300"
                    >
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Clinical Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-300"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics & Insights
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="h-6 w-px bg-gray-300" />
                <Button
                  variant="outline"
                  className="hover:bg-white/80 transition-all duration-300"
                  onClick={() => setCompactView(!compactView)}
                >
                  {compactView ? (
                    <Eye className="w-4 h-4 mr-2" />
                  ) : (
                    <EyeOff className="w-4 h-4 mr-2" />
                  )}
                  {compactView ? "Expanded View" : "Compact View"}
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-white/80">
                  <Clock className="w-3 h-3 mr-1" />
                  Last updated: {new Date().toLocaleTimeString()}
                </Badge>
                <Button
                  variant="outline"
                  className="hover:bg-white/80 transition-all duration-300"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing..." : "Refresh"}
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions Section */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="hc-card-title flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-violet-600" />
                        Quick Actions & Priority Items
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-violet-100 text-violet-700"
                      >
                        4 Action Items
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      {quickActions.map((action, index) => (
                        <div
                          key={action.id}
                          className={`mb-[7px] px-4 pt-4 pb-0 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            action.urgent
                              ? `${action.borderColor} ${action.bgColor} ring-2 ring-red-200`
                              : `${action.borderColor} ${action.bgColor} hover:shadow-lg`
                          }`}
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`p-2 rounded-full ${action.bgColor}`}
                            >
                              <action.icon
                                className={`w-5 h-5 ${action.color}`}
                              />
                            </div>
                            {action.count && (
                              <Badge
                                className={`${
                                  action.urgent
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-600 text-white"
                                }`}
                              >
                                {action.count}
                              </Badge>
                            )}
                          </div>
                          <h4
                            className={`hc-text-medical-data mb-2 ${action.color}`}
                          >
                            {action.title}
                          </h4>
                          <p className="hc-text-secondary text-gray-600 mb-3">
                            {action.description}
                          </p>
                          <div className="flex items-center justify-end">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity & Key Metrics */}
            <div className="grid grid-cols-12 gap-6">
              {/* Recent Activity */}
              <div className="col-span-5">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-violet-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                          style={{
                            animationDelay: `${index * 150}ms`,
                          }}
                        >
                          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                            <activity.icon className="w-5 h-5 text-violet-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {activity.type}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {activity.patient} • {activity.department}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(activity.status)}
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quality Metrics Overview */}
              <div className="col-span-7">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-violet-600" />
                      Key Performance Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {qualityMetrics.map((metric, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                          style={{
                            animationDelay: `${index * 200}ms`,
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <metric.icon className="w-4 h-4 text-violet-600" />
                              <h4 className="font-medium text-gray-900 text-sm">
                                {metric.metric}
                              </h4>
                            </div>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                              {metric.score}
                            </span>
                            <div className="text-right">
                              <p
                                className={`text-sm font-medium ${
                                  metric.trend === "up"
                                    ? "text-green-600"
                                    : metric.trend === "down"
                                      ? "text-red-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {metric.change}
                              </p>
                              <p className="text-xs text-gray-500">
                                Target: {metric.target}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Clinical Data Grid */}
            <div
              className={`grid grid-cols-12 gap-6 ${compactView ? "grid-rows-2" : ""}`}
            >
              {/* Today's Appointments */}
              <div className={compactView ? "col-span-6" : "col-span-7"}>
                <div className="transition-all duration-300">
                  <AppointmentsTable />
                </div>
              </div>

              {/* Patient Demographics */}
              <div
                className={`${compactView ? "col-span-6" : "col-span-5"} space-y-6`}
              >
                <div className="transition-all duration-300">
                  <PatientTypeChart />
                </div>
              </div>

              {/* Patients List */}
              <div className={compactView ? "col-span-6" : "col-span-5"}>
                <div className="transition-all duration-300">
                  <PatientsTable />
                </div>
              </div>

              {/* Patient Chart */}
              <div className={compactView ? "col-span-6" : "col-span-7"}>
                <div className="transition-all duration-300">
                  <PatientChart />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Patient Flow Chart */}
              <div className="col-span-8">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">
                      Patient Flow Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={patientFlowData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="admissions"
                            fill="#8B5CF6"
                            name="Admissions"
                          />
                          <Bar
                            dataKey="discharges"
                            fill="#10B981"
                            name="Discharges"
                          />
                          <Bar
                            dataKey="transfers"
                            fill="#F59E0B"
                            name="Transfers"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Utilization */}
              <div className="col-span-4">
                <Card className="shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">
                      Department Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentUtilization.map((dept, index) => (
                        <div
                          key={dept.name}
                          className="flex items-center justify-between hover:bg-gray-50 p-3 rounded transition-all duration-300"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: dept.color }}
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                {dept.name}
                              </span>
                              <p className="text-xs text-gray-500">
                                {dept.change}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${dept.value}%`,
                                  backgroundColor: dept.color,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {dept.value}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BaseLayout>
  );
}
