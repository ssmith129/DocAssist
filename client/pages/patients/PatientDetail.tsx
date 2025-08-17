import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Heart, 
  Activity, 
  Pill, 
  TestTube, 
  Calendar, 
  Phone, 
  Mail,
  Edit,
  FileText,
  AlertTriangle,
  Clock,
  Thermometer,
  Droplets
} from "lucide-react";

// Mock patient data
const patient = {
  id: "1",
  name: "Sarah Johnson",
  mrn: "MRN-001234",
  age: 45,
  dateOfBirth: "1978-05-15",
  gender: "Female",
  bloodType: "A+",
  primaryCondition: "Hypertension, Type 2 Diabetes",
  status: "stable",
  location: "Room 302-A",
  attendingPhysician: "Dr. Smith",
  admissionDate: "2024-01-15",
  phone: "(555) 123-4567",
  email: "sarah.johnson@email.com",
  address: "123 Main St, City, State 12345",
  emergencyContact: {
    name: "John Johnson",
    relationship: "Spouse",
    phone: "(555) 123-4568"
  },
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC123456789",
    groupNumber: "GRP001"
  },
  allergies: ["Penicillin", "Shellfish"],
  vitalSigns: {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 98.6,
    oxygenSaturation: 98,
    respiratoryRate: 16,
    weight: "165 lbs",
    height: "5'6\"",
    bmi: "26.6",
    timestamp: "2024-01-21 10:30 AM"
  }
};

const recentNotes = [
  {
    date: "2024-01-21",
    time: "10:30 AM",
    physician: "Dr. Smith",
    type: "Progress Note",
    summary: "Patient responding well to treatment. Blood pressure stable."
  },
  {
    date: "2024-01-20",
    time: "2:15 PM",
    physician: "Dr. Rodriguez",
    type: "Consultation",
    summary: "Cardiology consultation for hypertension management."
  }
];

const medications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-01-15",
    prescriber: "Dr. Smith"
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2024-01-10",
    prescriber: "Dr. Smith"
  }
];

const labResults = [
  {
    test: "HbA1c",
    value: "7.2%",
    normalRange: "<7.0%",
    status: "high",
    date: "2024-01-20"
  },
  {
    test: "Total Cholesterol",
    value: "185 mg/dL",
    normalRange: "<200 mg/dL",
    status: "normal",
    date: "2024-01-20"
  },
  {
    test: "Creatinine",
    value: "0.9 mg/dL",
    normalRange: "0.6-1.2 mg/dL",
    status: "normal",
    date: "2024-01-20"
  }
];

const appointments = [
  {
    date: "2024-01-25",
    time: "2:00 PM",
    physician: "Dr. Smith",
    type: "Follow-up",
    status: "scheduled"
  },
  {
    date: "2024-02-15",
    time: "10:00 AM",
    physician: "Dr. Rodriguez",
    type: "Cardiology",
    status: "scheduled"
  }
];

const statusColors = {
  stable: 'bg-emerald-100 text-emerald-800',
  caution: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-100 text-gray-800'
};

const resultColors = {
  normal: 'bg-emerald-100 text-emerald-800',
  high: 'bg-red-100 text-red-800',
  low: 'bg-blue-100 text-blue-800',
  critical: 'bg-red-200 text-red-900'
};

export default function PatientDetail() {
  return (
    <BaseLayout title={`Patient: ${patient.name}`}>
      {/* Patient Header */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            {/* Patient Photo */}
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-violet-600" />
            </div>
            
            {/* Patient Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <Badge className={statusColors[patient.status as keyof typeof statusColors]}>
                  {patient.status}
                </Badge>
                {patient.allergies.length > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Allergies
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">MRN:</span>
                  <p className="font-medium">{patient.mrn}</p>
                </div>
                <div>
                  <span className="text-gray-500">Age:</span>
                  <p className="font-medium">{patient.age} years old</p>
                </div>
                <div>
                  <span className="text-gray-500">DOB:</span>
                  <p className="font-medium">{patient.dateOfBirth}</p>
                </div>
                <div>
                  <span className="text-gray-500">Blood Type:</span>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">{patient.location}</p>
                </div>
                <div>
                  <span className="text-gray-500">Attending:</span>
                  <p className="font-medium">{patient.attendingPhysician}</p>
                </div>
                <div>
                  <span className="text-gray-500">Admitted:</span>
                  <p className="font-medium">{patient.admissionDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Primary Condition:</span>
                  <p className="font-medium">{patient.primaryCondition}</p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Current Vital Signs */}
            <div className="col-span-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-700">Current Vital Signs</CardTitle>
                  <p className="text-sm text-gray-500">Last updated: {patient.vitalSigns.timestamp}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Heart className="w-8 h-8 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-600">Heart Rate</p>
                        <p className="text-xl font-bold">{patient.vitalSigns.heartRate} bpm</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Activity className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Blood Pressure</p>
                        <p className="text-xl font-bold">{patient.vitalSigns.bloodPressure} mmHg</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Thermometer className="w-8 h-8 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Temperature</p>
                        <p className="text-xl font-bold">{patient.vitalSigns.temperature}°F</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Droplets className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">Oxygen Sat</p>
                        <p className="text-xl font-bold">{patient.vitalSigns.oxygenSaturation}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="col-span-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-700">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                    <p className="text-sm text-gray-600">{patient.emergencyContact.name} ({patient.emergencyContact.relationship})</p>
                    <p className="text-sm text-gray-600">{patient.emergencyContact.phone}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Insurance</h4>
                    <p className="text-sm text-gray-600">{patient.insurance.provider}</p>
                    <p className="text-sm text-gray-600">Policy: {patient.insurance.policyNumber}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Notes */}
            <div className="col-span-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-700">Recent Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentNotes.map((note, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-800">{note.type}</Badge>
                            <span className="text-sm text-gray-600">{note.physician}</span>
                          </div>
                          <span className="text-sm text-gray-500">{note.date} {note.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{note.summary}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Allergies & Alerts */}
            <div className="col-span-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Allergies & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.allergies.map((allergy, index) => (
                      <div key={index} className="p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-medium text-red-800">{allergy}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tabs would contain more detailed views */}
        <TabsContent value="vitals">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Detailed vital signs tracking and trends would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {medications.map((med, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        <p className="text-sm text-gray-500">Prescribed by {med.prescriber} on {med.startDate}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Test</th>
                      <th className="text-left py-2">Value</th>
                      <th className="text-left py-2">Normal Range</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map((result, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{result.test}</td>
                        <td className="py-2 font-medium">{result.value}</td>
                        <td className="py-2 text-gray-600">{result.normalRange}</td>
                        <td className="py-2">
                          <Badge className={resultColors[result.status as keyof typeof resultColors]}>
                            {result.status}
                          </Badge>
                        </td>
                        <td className="py-2 text-gray-600">{result.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Comprehensive clinical notes and documentation would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.map((apt, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{apt.type} Appointment</h3>
                        <p className="text-sm text-gray-600">with {apt.physician}</p>
                        <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{apt.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
}
