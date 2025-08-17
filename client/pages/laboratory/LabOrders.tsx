import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  TestTube,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  FileText,
  Eye,
} from "lucide-react";

// Mock lab orders data
const labOrders = [
  {
    id: "LAB-2024-001",
    patient: "Sarah Johnson",
    mrn: "MRN-001234",
    physician: "Dr. Smith",
    tests: ["Complete Blood Count", "Basic Metabolic Panel", "Lipid Panel"],
    priority: "routine",
    status: "pending",
    orderDate: "2024-01-21",
    expectedDate: "2024-01-22",
    room: "Room 302-A",
  },
  {
    id: "LAB-2024-002",
    patient: "Michael Chen",
    mrn: "MRN-001235",
    physician: "Dr. Rodriguez",
    tests: ["Troponin I", "CK-MB", "BNP"],
    priority: "urgent",
    status: "in-progress",
    orderDate: "2024-01-21",
    expectedDate: "2024-01-21",
    room: "ICU 101",
  },
  {
    id: "LAB-2024-003",
    patient: "Emma Davis",
    mrn: "MRN-001236",
    physician: "Dr. Wilson",
    tests: ["Glucose Tolerance Test", "HbA1c"],
    priority: "routine",
    status: "completed",
    orderDate: "2024-01-20",
    expectedDate: "2024-01-21",
    room: "Room 405-C",
  },
  {
    id: "LAB-2024-004",
    patient: "Robert Taylor",
    mrn: "MRN-001237",
    physician: "Dr. Martinez",
    tests: ["Blood Culture", "Procalcitonin", "Lactate"],
    priority: "critical",
    status: "pending",
    orderDate: "2024-01-21",
    expectedDate: "2024-01-21",
    room: "ICU 101",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const priorityColors = {
  routine: "bg-gray-100 text-gray-800",
  urgent: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

export default function LabOrders() {
  return (
    <BaseLayout title="Laboratory Orders">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Pending Orders"
          value="24"
          variant="primary"
          icon={<Clock className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="In Progress"
          value="18"
          icon={<TestTube className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Completed Today"
          value="47"
          icon={<CheckCircle className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Critical Results"
          value="3"
          variant="primary"
          icon={<AlertTriangle className="w-12 h-12 text-white" />}
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
                  placeholder="Search orders by patient, order ID, or test..."
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
              New Lab Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-700">
              Laboratory Orders{" "}
              <span className="text-gray-400 font-normal">
                ({labOrders.length} orders)
              </span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Today
              </Button>
              <Button size="sm" className="bg-violet-600 text-white">
                This Week
              </Button>
              <Button size="sm" variant="outline">
                This Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tests Ordered
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Physician
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Expected
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {labOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {order.orderDate}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.patient}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.mrn} • {order.room}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {order.tests.slice(0, 2).map((test, index) => (
                          <div key={index} className="text-sm text-gray-900">
                            {test}
                          </div>
                        ))}
                        {order.tests.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{order.tests.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          priorityColors[
                            order.priority as keyof typeof priorityColors
                          ]
                        }
                      >
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          statusColors[
                            order.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {order.status.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{order.physician}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">
                        {order.expectedDate}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <User className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing 1 to {labOrders.length} of 156 orders
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm" className="bg-violet-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </BaseLayout>
  );
}
