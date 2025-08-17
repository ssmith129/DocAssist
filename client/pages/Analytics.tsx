import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock analytics data
const patientFlowData = [
  { month: 'Jan', admissions: 45, discharges: 42, transfers: 8 },
  { month: 'Feb', admissions: 52, discharges: 48, transfers: 12 },
  { month: 'Mar', admissions: 48, discharges: 51, transfers: 6 },
  { month: 'Apr', admissions: 61, discharges: 55, transfers: 14 },
  { month: 'May', admissions: 55, discharges: 58, transfers: 10 },
  { month: 'Jun', admissions: 67, discharges: 62, transfers: 18 }
];

const departmentUtilization = [
  { name: 'Emergency', value: 85, color: '#EF4444' },
  { name: 'ICU', value: 92, color: '#F97316' },
  { name: 'General Medicine', value: 78, color: '#EAB308' },
  { name: 'Surgery', value: 67, color: '#22C55E' },
  { name: 'Pediatrics', value: 54, color: '#3B82F6' },
  { name: 'Maternity', value: 71, color: '#8B5CF6' }
];

const readmissionData = [
  { day: 'Mon', rate: 12 },
  { day: 'Tue', rate: 15 },
  { day: 'Wed', rate: 8 },
  { day: 'Thu', rate: 18 },
  { day: 'Fri', rate: 22 },
  { day: 'Sat', rate: 14 },
  { day: 'Sun', rate: 9 }
];

const qualityMetrics = [
  {
    metric: "Patient Satisfaction",
    score: "4.7/5.0",
    trend: "up",
    change: "+0.3",
    target: "4.5"
  },
  {
    metric: "Average Length of Stay",
    score: "3.2 days",
    trend: "down",
    change: "-0.5",
    target: "3.0"
  },
  {
    metric: "Readmission Rate",
    score: "8.4%",
    trend: "down",
    change: "-1.2%",
    target: "7.0%"
  },
  {
    metric: "Mortality Rate",
    score: "1.2%",
    trend: "down",
    change: "-0.3%",
    target: "1.0%"
  }
];

const departmentColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'];

export default function Analytics() {
  return (
    <BaseLayout title="Analytics">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Patients"
          value="1,247"
          icon={<Users className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Bed Occupancy"
          value="87%"
          variant="primary"
          icon={<Activity className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Avg Length of Stay"
          value="3.2 days"
          icon={<Calendar className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Patient Satisfaction"
          value="4.7/5"
          icon={<TrendingUp className="w-12 h-12 text-emerald-600" />}
        />
      </div>

      {/* Controls */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Patient Flow Chart - Top Left */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Patient Flow Trends</CardTitle>
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

        {/* Department Utilization - Top Right */}
        <div className="col-span-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Department Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentUtilization.map((dept, index) => (
                  <div key={dept.name} className="flex items-center justify-between">
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
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${dept.value}%`, 
                            backgroundColor: dept.color 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Readmission Trends - Bottom Left */}
        <div className="col-span-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Weekly Readmission Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={readmissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quality Metrics - Bottom Right */}
        <div className="col-span-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                      <p className="text-sm text-gray-600">Target: {metric.target}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">{metric.score}</span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary - Full Width */}
        <div className="col-span-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">94.2%</div>
                  <div className="text-sm text-gray-600">Patient Safety Score</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87.5%</div>
                  <div className="text-sm text-gray-600">Clinical Quality</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">92.1%</div>
                  <div className="text-sm text-gray-600">Staff Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">89.3%</div>
                  <div className="text-sm text-gray-600">Efficiency Score</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">91.7%</div>
                  <div className="text-sm text-gray-600">Care Coordination</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">95.4%</div>
                  <div className="text-sm text-gray-600">Technology Adoption</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
