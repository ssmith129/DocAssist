import { Navigation } from "@/components/healthcare/Navigation";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";

// Mock patients data (expanded)
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
    vitalSigns: {
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 98.6,
      oxygenSaturation: 98,
      trends: {
        heartRate: "stable" as const,
        bloodPressure: "down" as const,
        temperature: "stable" as const,
        oxygenSaturation: "stable" as const,
      }
    },
    alerts: [],
    allergies: ["Penicillin", "Shellfish"],
    nextAppointment: "Jan 25, 2024 at 2:00 PM"
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
    vitalSigns: {
      heartRate: 85,
      bloodPressure: "140/90",
      temperature: 99.2,
      oxygenSaturation: 95,
      trends: {
        heartRate: "up" as const,
        bloodPressure: "up" as const,
        temperature: "up" as const,
        oxygenSaturation: "down" as const,
      }
    },
    alerts: ["High BP", "Elevated temp"],
    allergies: ["Latex"],
    nextAppointment: "Jan 22, 2024 at 10:00 AM"
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
    vitalSigns: {
      heartRate: 78,
      bloodPressure: "110/70",
      temperature: 98.4,
      oxygenSaturation: 99,
      trends: {
        heartRate: "stable" as const,
        bloodPressure: "stable" as const,
        temperature: "stable" as const,
        oxygenSaturation: "stable" as const,
      }
    },
    alerts: [],
    allergies: [],
    nextAppointment: "Jan 24, 2024 at 11:30 AM"
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
    vitalSigns: {
      heartRate: 110,
      bloodPressure: "160/100",
      temperature: 100.1,
      oxygenSaturation: 92,
      trends: {
        heartRate: "up" as const,
        bloodPressure: "up" as const,
        temperature: "up" as const,
        oxygenSaturation: "down" as const,
      }
    },
    alerts: ["Critical BP", "Low oxygen", "Arrhythmia"],
    allergies: ["Aspirin"],
    nextAppointment: "Jan 21, 2024 at 9:00 AM"
  }
];

export default function Patients() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-hc-text-primary">Patients</h1>
            <p className="text-hc-text-secondary mt-1">Manage and monitor patient records</p>
          </div>
          <Button className="bg-healthcare-primary hover:bg-healthcare-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients by name, MRN, or condition..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              size="standard"
              showVitalSigns={true}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-hc-text-secondary">
            Showing 1 to 4 of 24 patients
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
