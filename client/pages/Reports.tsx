import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Activity,
  DollarSign,
  Clock,
  Filter,
  Search,
  Plus
} from "lucide-react";

// Mock reports data
const availableReports = [
  {
    id: "RPT-001",
    name: "Patient Census Report",
    category: "Operations",
    description: "Daily patient census by department and unit",
    lastGenerated: "2024-01-21 08:00",
    frequency: "Daily",
    status: "automated"
  },
  {
    id: "RPT-002",
    name: "Quality Metrics Dashboard",
    category: "Quality",
    description: "Patient safety indicators and quality measures",
    lastGenerated: "2024-01-21 06:00",
    frequency: "Daily",
    status: "automated"
  },
  {
    id: "RPT-003",
    name: "Financial Summary",
    category: "Finance",
    description: "Revenue, expenses, and billing statistics",
    lastGenerated: "2024-01-20 23:59",
    frequency: "Monthly",
    status: "manual"
  },
  {
    id: "RPT-004",
    name: "Medication Utilization",
    category: "Pharmacy",
    description: "Drug usage patterns and cost analysis",
    lastGenerated: "2024-01-21 07:30",
    frequency: "Weekly",
    status: "automated"
  },
  {
    id: "RPT-005",
    name: "Lab Turnaround Times",
    category: "Laboratory",
    description: "Lab test processing and reporting metrics",
    lastGenerated: "2024-01-21 09:00",
    frequency: "Daily",
    status: "automated"
  },
  {
    id: "RPT-006",
    name: "Readmission Analysis",
    category: "Quality",
    description: "30-day readmission rates and trends",
    lastGenerated: "2024-01-20 12:00",
    frequency: "Weekly",
    status: "manual"
  }
];

const recentReports = [
  {
    name: "Daily Census Report",
    generatedBy: "System",
    timestamp: "2024-01-21 08:00 AM",
    size: "2.3 MB",
    downloads: 12
  },
  {
    name: "Quality Metrics Q4 2023",
    generatedBy: "Dr. Anderson",
    timestamp: "2024-01-20 4:30 PM",
    size: "5.7 MB",
    downloads: 28
  },
  {
    name: "Pharmacy Utilization Weekly",
    generatedBy: "System",
    timestamp: "2024-01-20 7:30 AM",
    size: "1.2 MB",
    downloads: 8
  }
];

const categoryColors = {
  Operations: 'bg-blue-100 text-blue-800',
  Quality: 'bg-green-100 text-green-800',
  Finance: 'bg-yellow-100 text-yellow-800',
  Pharmacy: 'bg-purple-100 text-purple-800',
  Laboratory: 'bg-orange-100 text-orange-800'
};

const statusColors = {
  automated: 'bg-green-100 text-green-800',
  manual: 'bg-gray-100 text-gray-800',
  error: 'bg-red-100 text-red-800'
};

export default function Reports() {
  return (
    <BaseLayout title="Reports & Analytics">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Reports"
          value="247"
          icon={<FileText className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Generated Today"
          value="18"
          icon={<TrendingUp className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Automated Reports"
          value="89%"
          icon={<Clock className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Total Downloads"
          value="1,247"
          variant="primary"
          icon={<Download className="w-12 h-12 text-white" />}
        />
      </div>

      {/* Search and Actions */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search reports by name or category..."
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="h-12">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
            <Button className="h-12 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Available Reports - Main Content */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Available Reports <span className="text-gray-400 font-normal">({availableReports.length} reports)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {availableReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{report.name}</h3>
                          <Badge className={categoryColors[report.category as keyof typeof categoryColors]}>
                            {report.category}
                          </Badge>
                          <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Last: {report.lastGenerated}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {report.frequency}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                          <Download className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing 1 to {availableReports.length} of 24 reports
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button size="sm" className="bg-violet-600 text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports & Quick Stats - Right Side */}
        <div className="col-span-4 space-y-6">
          {/* Recent Reports */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{report.name}</h4>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>Generated by: {report.generatedBy}</p>
                    <p>{report.timestamp}</p>
                    <div className="flex items-center justify-between">
                      <span>{report.size}</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reports this month</span>
                <span className="font-medium text-gray-900">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average generation time</span>
                <span className="font-medium text-gray-900">2.3 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Most popular report</span>
                <span className="font-medium text-gray-900">Daily Census</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage used</span>
                <span className="font-medium text-gray-900">15.7 GB</span>
              </div>
            </CardContent>
          </Card>

          {/* Report Categories */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-sm text-gray-700">Operations</span>
                <Badge className="bg-blue-100 text-blue-800">12</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-sm text-gray-700">Quality</span>
                <Badge className="bg-green-100 text-green-800">8</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-sm text-gray-700">Finance</span>
                <Badge className="bg-yellow-100 text-yellow-800">6</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-sm text-gray-700">Clinical</span>
                <Badge className="bg-purple-100 text-purple-800">15</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-sm text-gray-700">Compliance</span>
                <Badge className="bg-orange-100 text-orange-800">4</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Custom Report Builder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
