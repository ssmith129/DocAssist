import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  MessageSquare,
  FileText,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  trends: {
    heartRate: 'up' | 'down' | 'stable';
    bloodPressure: 'up' | 'down' | 'stable';
    temperature: 'up' | 'down' | 'stable';
    oxygenSaturation: 'up' | 'down' | 'stable';
  };
}

interface Patient {
  id: string;
  name: string;
  mrn: string;
  age: number;
  photo?: string;
  primaryCondition: string;
  status: 'stable' | 'caution' | 'critical' | 'inactive';
  location: string;
  attendingPhysician: string;
  admissionDate: string;
  vitalSigns: VitalSigns;
  alerts: string[];
  allergies: string[];
  nextAppointment?: string;
}

interface PatientCardProps {
  patient: Patient;
  size?: 'compact' | 'standard' | 'detailed';
  showVitalSigns?: boolean;
}

const statusColors = {
  stable: 'bg-healthcare-success text-white',
  caution: 'bg-healthcare-warning text-gray-900',
  critical: 'bg-healthcare-critical text-white',
  inactive: 'bg-gray-400 text-white'
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-600" />;
  return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
};

export function PatientCard({ patient, size = 'standard', showVitalSigns = true }: PatientCardProps) {
  const isCompact = size === 'compact';
  const isDetailed = size === 'detailed';

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-gray-200">
      <CardHeader className={cn("pb-3", isCompact && "pb-2")}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Patient Photo */}
            <div className={cn(
              "rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium",
              isCompact ? "w-10 h-10 text-sm" : "w-16 h-16 text-lg"
            )}>
              {patient.photo ? (
                <img 
                  src={patient.photo} 
                  alt={patient.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)
              )}
            </div>

            {/* Patient Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className={cn(
                  "font-semibold text-hc-text-primary",
                  isCompact ? "text-sm" : "text-lg"
                )}>
                  {patient.name}
                </h3>
                <Badge className={cn("text-xs", statusColors[patient.status])}>
                  {patient.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-hc-text-secondary mt-1">
                <span>MRN: {patient.mrn}</span>
                <span>Age: {patient.age}</span>
              </div>
              {!isCompact && (
                <p className="text-sm text-hc-text-tertiary mt-1">{patient.primaryCondition}</p>
              )}
            </div>
          </div>

          {/* Alerts */}
          {patient.alerts.length > 0 && (
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-healthcare-critical" />
              <Badge variant="destructive" className="text-xs">
                {patient.alerts.length}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location and Physician */}
        {!isCompact && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-hc-text-secondary">Location:</span>
              <p className="font-medium text-hc-text-primary">{patient.location}</p>
            </div>
            <div>
              <span className="text-hc-text-secondary">Attending:</span>
              <p className="font-medium text-hc-text-primary">{patient.attendingPhysician}</p>
            </div>
          </div>
        )}

        {/* Vital Signs */}
        {showVitalSigns && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-hc-text-primary mb-3">Latest Vital Signs</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-hc-text-secondary">HR</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{patient.vitalSigns.heartRate}</span>
                  <TrendIcon trend={patient.vitalSigns.trends.heartRate} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-hc-text-secondary">BP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{patient.vitalSigns.bloodPressure}</span>
                  <TrendIcon trend={patient.vitalSigns.trends.bloodPressure} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-hc-text-secondary">Temp</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{patient.vitalSigns.temperature}°F</span>
                  <TrendIcon trend={patient.vitalSigns.trends.temperature} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-hc-text-secondary">SpO2</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{patient.vitalSigns.oxygenSaturation}%</span>
                  <TrendIcon trend={patient.vitalSigns.trends.oxygenSaturation} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Allergies */}
        {patient.allergies.length > 0 && isDetailed && (
          <div>
            <h4 className="text-sm font-medium text-hc-text-primary mb-2">Allergies</h4>
            <div className="flex flex-wrap gap-1">
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Chart
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" />
              Message
            </Button>
            {!isCompact && (
              <Button size="sm" variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Schedule
              </Button>
            )}
          </div>
          
          <Button size="sm" variant="outline" className="text-xs">
            <Phone className="w-3 h-3 mr-1" />
            Contact
          </Button>
        </div>

        {/* Next Appointment */}
        {patient.nextAppointment && isDetailed && (
          <div className="bg-blue-50 rounded-lg p-2 text-sm">
            <span className="text-hc-text-secondary">Next appointment: </span>
            <span className="font-medium text-healthcare-primary">{patient.nextAppointment}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
