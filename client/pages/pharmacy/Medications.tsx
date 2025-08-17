import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  Calendar,
  User,
  FileText,
  Eye,
  ShoppingCart,
  Package,
} from "lucide-react";

// Mock medications data
const medications = [
  {
    id: "MED-001",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    patient: "Sarah Johnson",
    mrn: "MRN-001234",
    physician: "Dr. Smith",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "active",
    refillsRemaining: 3,
    lastFilled: "2024-01-15",
    nextRefill: "2024-02-15",
  },
  {
    id: "MED-002",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    patient: "Michael Chen",
    mrn: "MRN-001235",
    physician: "Dr. Rodriguez",
    startDate: "2024-01-10",
    endDate: "2024-07-10",
    status: "active",
    refillsRemaining: 0,
    lastFilled: "2024-01-10",
    nextRefill: "2024-02-10",
  },
  {
    id: "MED-003",
    name: "Prenatal Vitamins",
    dosage: "1 tablet",
    frequency: "Once daily",
    patient: "Emma Davis",
    mrn: "MRN-001236",
    physician: "Dr. Wilson",
    startDate: "2024-01-01",
    endDate: "2024-10-01",
    status: "active",
    refillsRemaining: 5,
    lastFilled: "2024-01-01",
    nextRefill: "2024-02-01",
  },
  {
    id: "MED-004",
    name: "Warfarin",
    dosage: "5mg",
    frequency: "Once daily",
    patient: "Robert Taylor",
    mrn: "MRN-001237",
    physician: "Dr. Martinez",
    startDate: "2024-01-18",
    endDate: "2024-04-18",
    status: "hold",
    refillsRemaining: 2,
    lastFilled: "2024-01-18",
    nextRefill: "2024-02-18",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  discontinued: "bg-gray-100 text-gray-800",
  hold: "bg-yellow-100 text-yellow-800",
  expired: "bg-red-100 text-red-800",
};

export default function Medications() {
  return (
    <BaseLayout title="Medications">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Active Prescriptions"
          value="247"
          icon={<Pill className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Pending Refills"
          value="23"
          variant="primary"
          icon={<Clock className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Drug Interactions"
          value="5"
          variant="primary"
          icon={<AlertTriangle className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Dispensed Today"
          value="89"
          icon={<CheckCircle className="w-12 h-12 text-emerald-600" />}
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
                  placeholder="Search medications by name, patient, or physician..."
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="h-12">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Interactions
              </Button>
            </div>
            <Button className="h-12 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Medications Table - Main Content */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-700">
                  Current Medications{" "}
                  <span className="text-gray-400 font-normal">
                    ({medications.length} prescriptions)
                  </span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-violet-600 text-white">
                    Active
                  </Button>
                  <Button size="sm" variant="outline">
                    All
                  </Button>
                  <Button size="sm" variant="outline">
                    Discontinued
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
                        Medication
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Patient
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Dosage
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Refills
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Next Refill
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((medication) => (
                      <tr
                        key={medication.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {medication.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {medication.frequency}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {medication.patient}
                            </p>
                            <p className="text-sm text-gray-500">
                              {medication.mrn}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">
                            {medication.dosage}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              statusColors[
                                medication.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {medication.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-gray-900">
                              {medication.refillsRemaining} remaining
                            </p>
                            <p className="text-xs text-gray-500">
                              Last: {medication.lastFilled}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">
                            {medication.nextRefill}
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
                              <Package className="w-4 h-4" />
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
                  Showing 1 to {medications.length} of 247 medications
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
        </div>

        {/* Quick Actions & Alerts - Right Side */}
        <div className="col-span-4 space-y-6">
          {/* Drug Interaction Alerts */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                Interaction Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  Critical Interaction
                </p>
                <p className="text-sm text-red-600">
                  Warfarin + Aspirin for Robert Taylor
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Review
                </Button>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Moderate Interaction
                </p>
                <p className="text-sm text-yellow-600">
                  Lisinopril + Ibuprofen for Sarah Johnson
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Refill Reminders */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                Refill Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Michael Chen
                  </p>
                  <p className="text-sm text-gray-600">
                    Metformin - 0 refills left
                  </p>
                </div>
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                  Refill
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Emma Davis
                  </p>
                  <p className="text-sm text-gray-600">
                    Prenatal Vitamins - Due tomorrow
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Pill className="w-4 h-4 mr-2" />
                Drug Formulary Lookup
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Interaction Checker
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Inventory Management
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Prescription Reports
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    New prescription dispensed
                  </span>
                  <span className="text-gray-400">2 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Refill request approved</span>
                  <span className="text-gray-400">15 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Drug interaction alert resolved
                  </span>
                  <span className="text-gray-400">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
