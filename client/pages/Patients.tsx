import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  UserCheck, 
  AlertTriangle,
  Calendar,
  Phone,
  FileText,
  Eye
} from "lucide-react";

// Mock patients data
const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    mrn: "MRN-001234",
    age: 45,
    primaryCondition: "Hypertension, Type 2 Diabetes",
    status: "stable" as const,
    location: "Room 302-A",
    attendingPhysician: "Dr. Smith",
    admissionDate: "2024-01-15",
    lastVisit: "2024-01-20",
    bloodType: "A+",
    alerts: [],
    allergies: ["Penicillin", "Shellfish"],
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64"
  },
  {
    id: "2",
    name: "Michael Chen",
    mrn: "MRN-001235",
    age: 62,
    primaryCondition: "Post-operative care",
    status: "caution" as const,
    location: "Room 201-B",
    attendingPhysician: "Dr. Rodriguez",
    admissionDate: "2024-01-18",
    lastVisit: "2024-01-19",
    bloodType: "O-",
    alerts: ["High BP", "Elevated temp"],
    allergies: ["Latex"]
  },
  {
    id: "3",
    name: "Emma Davis",
    mrn: "MRN-001236",
    age: 28,
    primaryCondition: "Pregnancy - 32 weeks",
    status: "stable" as const,
    location: "Room 405-C",
    attendingPhysician: "Dr. Wilson",
    admissionDate: "2024-01-20",
    lastVisit: "2024-01-21",
    bloodType: "AB+",
    alerts: [],
    allergies: [],
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/989b6d028e8c0fe9641a68d350118eed89ecc59f?width=64"
  },
  {
    id: "4",
    name: "Robert Taylor",
    mrn: "MRN-001237",
    age: 67,
    primaryCondition: "Heart failure",
    status: "critical" as const,
    location: "ICU 101",
    attendingPhysician: "Dr. Martinez",
    admissionDate: "2024-01-19",
    lastVisit: "2024-01-21",
    bloodType: "B+",
    alerts: ["Critical BP", "Low oxygen", "Arrhythmia"],
    allergies: ["Aspirin"]
  },
  {
    id: "5",
    name: "Anna Williams",
    mrn: "MRN-001238",
    age: 34,
    primaryCondition: "Diabetes Type 1",
    status: "stable" as const,
    location: "Room 150-A",
    attendingPhysician: "Dr. Thompson",
    admissionDate: "2024-01-17",
    lastVisit: "2024-01-20",
    bloodType: "A-",
    alerts: [],
    allergies: ["Nuts"]
  },
  {
    id: "6",
    name: "David Brown",
    mrn: "MRN-001239",
    age: 52,
    primaryCondition: "Chronic kidney disease",
    status: "caution" as const,
    location: "Room 220-B",
    attendingPhysician: "Dr. Lee",
    admissionDate: "2024-01-16",
    lastVisit: "2024-01-21",
    bloodType: "O+",
    alerts: ["Elevated creatinine"],
    allergies: ["Iodine"]
  }
];

const statusColors = {
  stable: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  caution: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function Patients() {
  return (
    <BaseLayout title="Patients">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Patients"
          value="247"
          icon={<Users className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Active Patients"
          value="189"
          icon={<UserCheck className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Critical Status"
          value="12"
          variant="primary"
          icon={<AlertTriangle className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="New Admissions"
          value="8"
          icon={<Plus className="w-12 h-12 text-emerald-600" />}
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
                  placeholder="Search patients by name, MRN, or condition..."
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button className="h-12 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-700">
            Patient List <span className="text-gray-400 font-normal">({mockPatients.length} patients)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Condition</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Physician</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Visit</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPatients.map((patient, index) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        {patient.avatar ? (
                          <img 
                            src={patient.avatar}
                            alt={patient.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                            <span className="text-violet-600 font-medium text-sm">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.mrn} • Age {patient.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{patient.primaryCondition}</p>
                      {patient.bloodType && (
                        <p className="text-xs text-gray-500">Blood Type: {patient.bloodType}</p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={statusColors[patient.status]}>
                          {patient.status}
                        </Badge>
                        {patient.alerts.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-red-600">{patient.alerts.length}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{patient.location}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{patient.attendingPhysician}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{patient.lastVisit}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Calendar className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Phone className="w-4 h-4" />
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
              Showing 1 to {mockPatients.length} of 247 patients
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
    </BaseLayout>
  );
}
