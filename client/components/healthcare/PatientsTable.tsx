import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  diagnosis: string;
  bloodType: string;
  avatar?: string;
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Rosa Charles",
    diagnosis: "Headache",
    bloodType: "AB-",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64",
  },
  {
    id: "2",
    name: "Alexander Wells",
    diagnosis: "Food Allergy",
    bloodType: "AB+",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/989b6d028e8c0fe9641a68d350118eed89ecc59f?width=64",
  },
  {
    id: "3",
    name: "Keenan Waller",
    diagnosis: "Hypertension",
    bloodType: "B-",
  },
];

export function PatientsTable() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-100 rounded-md flex items-center justify-center">
            <Users className="w-5 h-5 text-sky-600" />
          </div>
          <CardTitle className="hc-card-title">
            <span className="text-healthcare-primary">Patients list </span>
            <span className="text-gray-500">(120)</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Headers */}
          <div className="grid grid-cols-3 gap-4 hc-text-label border-b pb-2">
            <div>Name</div>
            <div>Diagnosis</div>
            <div>Blood type</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="grid grid-cols-3 gap-4 items-center py-2"
              >
                <div className="flex items-center space-x-3">
                  {patient.avatar ? (
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-900">{patient.name}</span>
                </div>
                <div className="text-sm text-gray-600">{patient.diagnosis}</div>
                <div className="text-sm text-gray-600">{patient.bloodType}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
