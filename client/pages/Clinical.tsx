import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Stethoscope,
  FileText,
  Activity,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Thermometer,
  Heart,
  Droplets,
} from "lucide-react";

// Mock clinical data
const recentNotes = [
  {
    id: "1",
    patient: "Sarah Johnson",
    type: "Progress Note",
    physician: "Dr. Smith",
    date: "2024-01-21",
    time: "10:30 AM",
    summary:
      "Patient showing good response to current medication regimen. Blood pressure stable.",
    status: "signed",
  },
  {
    id: "2",
    patient: "Michael Chen",
    type: "Consultation",
    physician: "Dr. Rodriguez",
    date: "2024-01-21",
    time: "09:15 AM",
    summary:
      "Post-operative assessment. Wound healing well, no signs of infection.",
    status: "pending",
  },
  {
    id: "3",
    patient: "Emma Davis",
    type: "Assessment",
    physician: "Dr. Wilson",
    date: "2024-01-20",
    time: "02:45 PM",
    summary:
      "Routine prenatal checkup. Fetal development normal, maternal vitals stable.",
    status: "signed",
  },
];

const labResults = [
  {
    id: "1",
    patient: "Robert Taylor",
    test: "Complete Blood Count",
    result: "Critical",
    value: "Hemoglobin: 7.2 g/dL",
    normalRange: "13.5-17.5 g/dL",
    date: "2024-01-21",
    physician: "Dr. Martinez",
  },
  {
    id: "2",
    patient: "Anna Williams",
    test: "HbA1c",
    result: "High",
    value: "8.5%",
    normalRange: "<7.0%",
    date: "2024-01-21",
    physician: "Dr. Thompson",
  },
  {
    id: "3",
    patient: "David Brown",
    test: "Creatinine",
    result: "Elevated",
    value: "2.1 mg/dL",
    normalRange: "0.6-1.2 mg/dL",
    date: "2024-01-20",
    physician: "Dr. Lee",
  },
];

const vitalSigns = [
  {
    patient: "Sarah Johnson",
    heartRate: "72 bpm",
    bloodPressure: "120/80 mmHg",
    temperature: "98.6°F",
    oxygenSat: "98%",
    timestamp: "11:30 AM",
  },
  {
    patient: "Michael Chen",
    heartRate: "85 bpm",
    bloodPressure: "140/90 mmHg",
    temperature: "99.2°F",
    oxygenSat: "95%",
    timestamp: "10:15 AM",
  },
];

const statusColors = {
  signed: "bg-emerald-100 text-emerald-800",
  pending: "bg-yellow-100 text-yellow-800",
  draft: "bg-gray-100 text-gray-800",
};

const resultColors = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Elevated: "bg-yellow-100 text-yellow-800",
  Normal: "bg-emerald-100 text-emerald-800",
};

export default function Clinical() {
  return (
    <BaseLayout title="Clinical">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Active Cases"
          value="42"
          icon={<Stethoscope className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Pending Notes"
          value="8"
          variant="primary"
          icon={<FileText className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Lab Results"
          value="15"
          icon={<Activity className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Critical Alerts"
          value="3"
          variant="primary"
          icon={<AlertTriangle className="w-12 h-12 text-white" />}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Clinical Notes - Left Side */}
        <div className="col-span-8 space-y-6">
          {/* Recent Clinical Notes */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-700">
                  Recent Clinical Notes
                </CardTitle>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Note
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search notes..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {note.patient}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-800">
                            {note.type}
                          </Badge>
                          <Badge
                            className={
                              statusColors[
                                note.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {note.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {note.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {note.physician}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {note.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {note.time}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lab Results */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Lab Results{" "}
                <span className="text-gray-400 font-normal">
                  ({labResults.length} pending review)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Patient
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Test
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Result
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map((result) => (
                      <tr
                        key={result.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900">
                            {result.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {result.physician}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {result.test}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              resultColors[
                                result.result as keyof typeof resultColors
                              ]
                            }
                          >
                            {result.result}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-900">
                            {result.value}
                          </p>
                          <p className="text-xs text-gray-500">
                            Normal: {result.normalRange}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {result.date}
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vital Signs & Quick Actions - Right Side */}
        <div className="col-span-4 space-y-6">
          {/* Latest Vital Signs */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Latest Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vitalSigns.map((vitals, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">
                      {vitals.patient}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {vitals.timestamp}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">HR:</span>
                      <span className="font-medium">{vitals.heartRate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">BP:</span>
                      <span className="font-medium">
                        {vitals.bloodPressure}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-600">Temp:</span>
                      <span className="font-medium">{vitals.temperature}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">SpO2:</span>
                      <span className="font-medium">{vitals.oxygenSat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Documentation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Quick Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <Input placeholder="Search patient..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>Progress Note</option>
                  <option>Consultation</option>
                  <option>Assessment</option>
                  <option>Procedure Note</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <Textarea placeholder="Enter your clinical note..." rows={4} />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Save Draft
                </Button>
                <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
                  Sign & Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
