import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Phone,
} from "lucide-react";

// Mock appointments data
const appointments = [
  {
    id: "1",
    time: "09:00 AM",
    patient: "Sarah Johnson",
    type: "Consultation",
    physician: "Dr. Smith",
    room: "Room 302-A",
    status: "confirmed",
    duration: "30 min",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64",
  },
  {
    id: "2",
    time: "09:30 AM",
    patient: "Michael Chen",
    type: "Follow-up",
    physician: "Dr. Rodriguez",
    room: "Room 201-B",
    status: "confirmed",
    duration: "45 min",
  },
  {
    id: "3",
    time: "10:30 AM",
    patient: "Emma Davis",
    type: "Checkup",
    physician: "Dr. Wilson",
    room: "Room 405-C",
    status: "pending",
    duration: "30 min",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/989b6d028e8c0fe9641a68d350118eed89ecc59f?width=64",
  },
  {
    id: "4",
    time: "11:00 AM",
    patient: "Robert Taylor",
    type: "Emergency",
    physician: "Dr. Martinez",
    room: "ICU 101",
    status: "urgent",
    duration: "60 min",
  },
  {
    id: "5",
    time: "02:00 PM",
    patient: "Anna Williams",
    type: "Consultation",
    physician: "Dr. Thompson",
    room: "Room 150-A",
    status: "confirmed",
    duration: "30 min",
  },
  {
    id: "6",
    time: "03:30 PM",
    patient: "David Brown",
    type: "Treatment",
    physician: "Dr. Lee",
    room: "Room 220-B",
    status: "confirmed",
    duration: "90 min",
  },
];

const statusColors = {
  confirmed: "bg-emerald-100 text-emerald-800",
  pending: "bg-yellow-100 text-yellow-800",
  urgent: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const typeColors = {
  Consultation: "bg-blue-100 text-blue-800",
  "Follow-up": "bg-green-100 text-green-800",
  Checkup: "bg-purple-100 text-purple-800",
  Emergency: "bg-red-100 text-red-800",
  Treatment: "bg-orange-100 text-orange-800",
};

// Calendar data
const currentDate = new Date();
const currentMonth = currentDate.toLocaleString("default", {
  month: "long",
  year: "numeric",
});

export default function Schedule() {
  return (
    <BaseLayout title="Schedule">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Today's Appointments"
          value="18"
          icon={<Calendar className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Confirmed"
          value="14"
          icon={<Clock className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Pending"
          value="3"
          variant="primary"
          icon={<Clock className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Available Slots"
          value="7"
          icon={<Plus className="w-12 h-12 text-emerald-600" />}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Calendar View - Left Side */}
        <div className="col-span-4">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-700">
                  {currentMonth}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="p-2 font-medium text-gray-500">
                      {day}
                    </div>
                  ),
                )}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      i + 1 === currentDate.getDate()
                        ? "bg-violet-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List - Right Side */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-700">
                  Today's Schedule{" "}
                  <span className="text-gray-400 font-normal">
                    ({appointments.length} appointments)
                  </span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Day
                  </Button>
                  <Button size="sm" variant="outline">
                    Week
                  </Button>
                  <Button size="sm" className="bg-violet-600 text-white">
                    Month
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-violet-600">
                            {appointment.time}
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.duration}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {appointment.avatar ? (
                            <img
                              src={appointment.avatar}
                              alt={appointment.patient}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-violet-600" />
                            </div>
                          )}

                          <div>
                            <h3 className="font-medium text-gray-900">
                              {appointment.patient}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.physician}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge
                              className={
                                typeColors[
                                  appointment.type as keyof typeof typeColors
                                ]
                              }
                            >
                              {appointment.type}
                            </Badge>
                            <Badge
                              className={
                                statusColors[
                                  appointment.status as keyof typeof statusColors
                                ]
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.room}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Appointments</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
