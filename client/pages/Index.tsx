import { Navigation } from "@/components/healthcare/Navigation";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  MessageSquare,
  Stethoscope
} from "lucide-react";

// Mock data for the dashboard
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
  }
];

const mockSchedule = [
  { time: "9:00 AM", patient: "John Smith", type: "Consultation", room: "Exam 1" },
  { time: "10:30 AM", patient: "Lisa Wong", type: "Follow-up", room: "Exam 2" },
  { time: "2:00 PM", patient: "Sarah Johnson", type: "Diabetes Review", room: "Exam 1" },
  { time: "3:30 PM", patient: "David Brown", type: "Physical", room: "Exam 3" },
];

const mockAlerts = [
  { patient: "Michael Chen", alert: "Blood pressure elevated", severity: "medium", time: "10 min ago" },
  { patient: "Robert Taylor", alert: "Lab results critical", severity: "high", time: "25 min ago" },
  { patient: "Anna White", alert: "Medication due", severity: "low", time: "1 hour ago" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-hc-text-primary">Dashboard</h1>
          <p className="text-hc-text-secondary mt-1">Welcome back, Dr. Anderson</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hc-text-secondary">Total Patients</p>
                  <p className="text-3xl font-bold text-hc-text-primary">24</p>
                </div>
                <Users className="w-8 h-8 text-healthcare-primary" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+2 from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hc-text-secondary">Active Alerts</p>
                  <p className="text-3xl font-bold text-hc-text-primary">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-healthcare-critical" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-healthcare-critical">2 critical, 1 moderate</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hc-text-secondary">Today's Appointments</p>
                  <p className="text-3xl font-bold text-hc-text-primary">8</p>
                </div>
                <Calendar className="w-8 h-8 text-healthcare-primary" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Clock className="w-4 h-4 text-hc-text-secondary mr-1" />
                <span className="text-hc-text-secondary">Next: 2:00 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hc-text-secondary">Pending Reviews</p>
                  <p className="text-3xl font-bold text-hc-text-primary">5</p>
                </div>
                <Stethoscope className="w-8 h-8 text-healthcare-primary" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-hc-text-secondary">Lab results & reports</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Patients - Left Column */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Patients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    size="compact"
                    showVitalSigns={false}
                  />
                ))}
                <Button variant="outline" className="w-full">
                  View All Patients
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Selected Patient & Schedule */}
          <div className="lg:col-span-1 space-y-6">
            {/* Featured Patient */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Patient Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientCard
                  patient={mockPatients[1]}
                  size="detailed"
                  showVitalSigns={true}
                />
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSchedule.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-hc-text-primary">{appointment.time}</p>
                        <p className="text-sm text-hc-text-secondary">{appointment.patient}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-hc-text-primary">{appointment.type}</p>
                        <p className="text-xs text-hc-text-secondary">{appointment.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-healthcare-critical" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAlerts.map((alert, index) => (
                    <div key={index} className="border-l-4 border-healthcare-critical pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-hc-text-primary">{alert.patient}</p>
                        <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-hc-text-secondary">{alert.alert}</p>
                      <p className="text-xs text-hc-text-tertiary mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Clinical Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-healthcare-primary text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span>24 patients</span>
              <span>3 critical alerts</span>
              <span>Next appointment: 2:00 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
