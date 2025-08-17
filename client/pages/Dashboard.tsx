import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { NotificationPanel } from "@/components/healthcare/NotificationPanel";
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
  { name: "Emergency", value: 85, color: "#EF4444" },
  { name: "ICU", value: 92, color: "#F97316" },
  { name: "General Medicine", value: 78, color: "#EAB308" },
  { name: "Surgery", value: 67, color: "#22C55E" },
  { name: "Pediatrics", value: 54, color: "#3B82F6" },
  { name: "Maternity", value: 71, color: "#8B5CF6" },
];

const qualityMetrics = [
  {
    metric: "Patient Satisfaction",
    score: "4.7/5.0",
    trend: "up",
    change: "+0.3",
    target: "4.5",
  },
  {
    metric: "Average Length of Stay",
    score: "3.2 days",
    trend: "down",
    change: "-0.5",
    target: "3.0",
  },
  {
    metric: "Readmission Rate",
    score: "8.4%",
    trend: "down",
    change: "-1.2%",
    target: "7.0%",
  },
];

// Quick action items for overview
const quickActions = [
  {
    id: 1,
    title: "Review Critical Alerts",
    description: "3 high-priority patient alerts",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    urgent: true,
  },
  {
    id: 2,
    title: "Schedule Rounds",
    description: "Morning rounds in 30 minutes",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    urgent: false,
  },
  {
    id: 3,
    title: "Lab Results Ready",
    description: "15 results pending review",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    urgent: false,
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
  },
  {
    id: 2,
    type: "Lab Result",
    patient: "Michael Chen",
    time: "5 minutes ago",
    department: "Laboratory",
    status: "normal",
  },
  {
    id: 3,
    type: "Discharge",
    patient: "Emma Davis",
    time: "12 minutes ago",
    department: "General Medicine",
    status: "completed",
  },
  {
    id: 4,
    type: "Surgery Scheduled",
    patient: "Robert Wilson",
    time: "18 minutes ago",
    department: "Surgery",
    status: "scheduled",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      critical: { color: "bg-red-100 text-red-800", dot: "bg-red-500" },
      normal: { color: "bg-green-100 text-green-800", dot: "bg-green-500" },
      completed: { color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
      scheduled: { color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <Badge className={`${config.color} border-0`}>{status}</Badge>
      </div>
    );
  };

  return (
    <BaseLayout title="Dashboard">
      <div className="space-y-6">
        {/* Enhanced Stats Cards with animations */}
        <div className={`grid grid-cols-4 gap-4 transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <StatsCard
              title="New patients"
              value="15"
              variant="primary"
              icon={
                <div className="p-3 rounded-full bg-violet-100">
                  <Users className="w-8 h-8 text-violet-600" />
                </div>
              }
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <StatsCard
              title="Total patients"
              value="1,247"
              icon={
                <div className="p-3 rounded-full bg-emerald-100">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
              }
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <StatsCard
              title="Bed Occupancy"
              value="87%"
              icon={
                <div className="p-3 rounded-full bg-blue-100">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              }
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <StatsCard
              title="Patient Satisfaction"
              value="4.7/5"
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="bg-white/80 backdrop-blur-sm">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-300"
                    >
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics"
                      className="data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all duration-300"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="h-6 w-px bg-gray-300" />
                <Button 
                  variant="outline" 
                  className="hover:bg-white/80 transition-all duration-300 hover:scale-105"
                  onClick={() => setCompactView(!compactView)}
                >
                  {compactView ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                  {compactView ? "Expanded" : "Compact"}
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  className="hover:bg-white/80 transition-all duration-300"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-12 gap-6">
              {/* Quick Actions */}
              <div className="col-span-4">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-violet-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <div
                        key={action.id}
                        className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-102 ${
                          action.urgent 
                            ? 'border-red-500 bg-red-50 hover:bg-red-100' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        } ${index === 0 ? 'animate-pulse' : ''}`}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${action.bgColor}`}>
                              <action.icon className={`w-4 h-4 ${action.color}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{action.title}</h4>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="col-span-8">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-violet-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-102 cursor-pointer"
                          style={{
                            animationDelay: `${index * 150}ms`
                          }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                              <Thermometer className="w-5 h-5 text-violet-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{activity.type}</h4>
                              <p className="text-sm text-gray-600">
                                {activity.patient} • {activity.department}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(activity.status)}
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Overview Grid */}
            <div className={`grid grid-cols-12 gap-6 ${compactView ? 'grid-rows-2' : ''}`}>
              {/* Today's Appointments */}
              <div className={compactView ? "col-span-6" : "col-span-7"}>
                <div className="transform hover:scale-102 transition-all duration-300">
                  <AppointmentsTable />
                </div>
              </div>

              {/* Notifications & Charts */}
              <div className={`${compactView ? "col-span-6" : "col-span-5"} flex flex-col space-y-6`}>
                <div className="transform hover:scale-102 transition-all duration-300">
                  <NotificationPanel />
                </div>
                {!compactView && (
                  <div className="transform hover:scale-102 transition-all duration-300">
                    <PatientTypeChart />
                  </div>
                )}
              </div>

              {/* Patients List */}
              <div className={compactView ? "col-span-6" : "col-span-5"}>
                <div className="transform hover:scale-102 transition-all duration-300">
                  <PatientsTable />
                </div>
              </div>

              {/* Patient Chart */}
              <div className={compactView ? "col-span-6" : "col-span-7"}>
                <div className="transform hover:scale-102 transition-all duration-300">
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
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
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
                          <Bar dataKey="admissions" fill="#8B5CF6" name="Admissions" />
                          <Bar dataKey="discharges" fill="#10B981" name="Discharges" />
                          <Bar dataKey="transfers" fill="#F59E0B" name="Transfers" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Utilization */}
              <div className="col-span-4">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
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
                          className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-all duration-300"
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: dept.color }}
                            />
                            <span className="text-sm text-gray-700">{dept.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
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

              {/* Quality Metrics */}
              <div className="col-span-12">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">
                      Quality Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      {qualityMetrics.map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                          style={{
                            animationDelay: `${index * 200}ms`
                          }}
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {metric.metric}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Target: {metric.target}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-900">
                                {metric.score}
                              </span>
                              {metric.trend === "up" ? (
                                <TrendingUp className="w-5 h-5 text-green-500 animate-bounce" />
                              ) : (
                                <TrendingDown className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <p
                              className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                            >
                              {metric.change}
                            </p>
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
