import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ChevronDown } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  reason: string;
  diagnosis: string;
  time: string;
  avatar?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    name: 'Rosa Charles',
    reason: 'Consultation',
    diagnosis: 'Headache',
    time: '09.50 AM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64'
  },
  {
    id: '2',
    name: 'Keenan Waller',
    reason: 'Re visit',
    diagnosis: 'Food Allergy',
    time: '10.30 AM'
  },
  {
    id: '3',
    name: 'Alexander Wells',
    reason: 'Scheduled visit',
    diagnosis: 'Hypertension',
    time: '11.50 AM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/989b6d028e8c0fe9641a68d350118eed89ecc59f?width=64'
  }
];

export function AppointmentsTable() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
            </div>
            <CardTitle className="text-lg font-bold">
              <span className="text-gray-700">Today's Appointments </span>
              <span className="text-gray-400">(15)</span>
            </CardTitle>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <span className="text-base">Today</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Headers */}
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
            <div>Name</div>
            <div>Reason for visit</div>
            <div>Diagnosis</div>
            <div>Time</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <div key={appointment.id} className="grid grid-cols-4 gap-4 items-center py-2">
                <div className="flex items-center space-x-3">
                  {appointment.avatar ? (
                    <img 
                      src={appointment.avatar}
                      alt={appointment.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {appointment.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-900">{appointment.name}</span>
                </div>
                <div className="text-sm text-gray-600">{appointment.reason}</div>
                <div className="text-sm text-gray-600">{appointment.diagnosis}</div>
                <div className="text-sm text-gray-600">{appointment.time}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
