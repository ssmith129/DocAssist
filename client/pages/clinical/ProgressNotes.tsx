import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileSignature, 
  Plus, 
  Search, 
  Filter, 
  Save, 
  Edit, 
  Clock,
  CheckCircle,
  User,
  Calendar,
  Stethoscope
} from "lucide-react";

// Mock progress notes data
const progressNotes = [
  {
    id: "PN-2024-001",
    patient: "Sarah Johnson",
    mrn: "MRN-001234",
    physician: "Dr. Smith",
    date: "2024-01-21",
    time: "10:30 AM",
    type: "Progress Note",
    status: "signed",
    subjective: "Patient reports feeling much better since starting new medication. No chest pain or shortness of breath.",
    objective: "Vital signs stable. Blood pressure 120/80. Heart rate 72 bpm regular. Lungs clear to auscultation.",
    assessment: "Hypertension well controlled on current regimen. Patient responding well to treatment.",
    plan: "Continue current medications. Follow up in 4 weeks. Patient education provided on lifestyle modifications."
  },
  {
    id: "PN-2024-002",
    patient: "Michael Chen",
    mrn: "MRN-001235",
    physician: "Dr. Rodriguez",
    date: "2024-01-21",
    time: "09:15 AM",
    type: "Post-operative Note",
    status: "draft",
    subjective: "Patient reports minimal pain at surgical site. Denies nausea or vomiting.",
    objective: "Surgical site clean and dry without signs of infection. Minimal swelling present.",
    assessment: "Post-operative day 2 following appendectomy. Recovery progressing as expected.",
    plan: "Continue current pain management. Advance diet as tolerated. Discharge planning initiated."
  },
  {
    id: "PN-2024-003",
    patient: "Emma Davis",
    mrn: "MRN-001236",
    physician: "Dr. Wilson",
    date: "2024-01-20",
    time: "02:45 PM",
    type: "Prenatal Visit",
    status: "signed",
    subjective: "32-week pregnant female with no acute complaints. Reports good fetal movement.",
    objective: "Fundal height appropriate for gestational age. Fetal heart rate 140 bpm.",
    assessment: "32-week intrauterine pregnancy progressing normally.",
    plan: "Continue prenatal vitamins. Return in 2 weeks for routine follow-up."
  }
];

const statusColors = {
  draft: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-orange-100 text-orange-800',
  signed: 'bg-green-100 text-green-800',
  amended: 'bg-blue-100 text-blue-800'
};

export default function ProgressNotes() {
  return (
    <BaseLayout title="Progress Notes">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Notes Today"
          value="28"
          icon={<FileSignature className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Pending Signatures"
          value="7"
          variant="primary"
          icon={<Clock className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Completed"
          value="156"
          icon={<CheckCircle className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="My Notes"
          value="12"
          icon={<User className="w-12 h-12 text-emerald-600" />}
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
                  placeholder="Search notes by patient, physician, or content..."
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="h-12">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
            <Button className="h-12 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Notes List - Left Side */}
        <div className="col-span-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Recent Notes <span className="text-gray-400 font-normal">({progressNotes.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[600px] overflow-y-auto">
              <div className="space-y-1">
                {progressNotes.map((note, index) => (
                  <div 
                    key={note.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors ${
                      index === 0 ? 'border-l-violet-600 bg-violet-50' : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{note.patient}</h3>
                        <p className="text-sm text-gray-600">{note.mrn}</p>
                      </div>
                      <Badge className={statusColors[note.status as keyof typeof statusColors]}>
                        {note.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">{note.type}</p>
                      <p className="text-gray-600">{note.physician}</p>
                      <p className="text-gray-500">{note.date} • {note.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note Details/Editor - Right Side */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-700">Progress Note - Sarah Johnson</CardTitle>
                  <p className="text-sm text-gray-600">MRN-001234 • January 21, 2024 • 10:30 AM</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                    <Save className="w-4 h-4 mr-2" />
                    Sign & Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Info Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Sarah Johnson, 45 years old</h3>
                  <p className="text-sm text-gray-600">Room 302-A • Dr. Smith • Hypertension, Type 2 Diabetes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Last vitals</p>
                  <p className="text-sm text-gray-600">BP: 120/80 • HR: 72</p>
                </div>
              </div>

              {/* SOAP Note Structure */}
              <div className="space-y-6">
                {/* Subjective */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Subjective</label>
                  <Textarea 
                    value="Patient reports feeling much better since starting new medication. No chest pain or shortness of breath."
                    rows={3}
                    className="w-full"
                  />
                </div>

                {/* Objective */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Objective</label>
                  <Textarea 
                    value="Vital signs stable. Blood pressure 120/80. Heart rate 72 bpm regular. Lungs clear to auscultation."
                    rows={3}
                    className="w-full"
                  />
                </div>

                {/* Assessment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Assessment</label>
                  <Textarea 
                    value="Hypertension well controlled on current regimen. Patient responding well to treatment."
                    rows={3}
                    className="w-full"
                  />
                </div>

                {/* Plan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Plan</label>
                  <Textarea 
                    value="Continue current medications. Follow up in 4 weeks. Patient education provided on lifestyle modifications."
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Templates and Quick Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Templates
                    </Button>
                    <Button variant="outline" size="sm">
                      Voice Dictation
                    </Button>
                    <Button variant="outline" size="sm">
                      Insert Vitals
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="bg-violet-600 hover:bg-violet-700">
                      <Save className="w-4 h-4 mr-2" />
                      Sign & Complete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
