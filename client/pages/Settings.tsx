import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Globe,
  Clock,
  Key,
  Users,
  Activity,
  Save,
  Camera,
  Mail,
  Phone
} from "lucide-react";

// Settings sections
const settingsSections = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'system', name: 'System', icon: Database },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'language', name: 'Language & Region', icon: Globe },
  { id: 'permissions', name: 'User Permissions', icon: Users },
  { id: 'audit', name: 'Audit Logs', icon: Activity },
];

export default function Settings() {
  return (
    <BaseLayout title="Settings">
      <div className="grid grid-cols-12 gap-6">
        {/* Settings Navigation - Left Side */}
        <div className="col-span-3">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingsSections.map((section, index) => (
                  <button
                    key={section.id}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'bg-violet-50 border-r-2 border-violet-600 text-violet-700' : 'text-gray-700'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content - Right Side */}
        <div className="col-span-9 space-y-6">
          {/* Profile Settings */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-violet-600" />
                </div>
                <div>
                  <Button variant="outline" className="mb-2">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input defaultValue="Dr. John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input defaultValue="Anderson" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input defaultValue="john.anderson@hospital.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Cardiology</option>
                    <option>Emergency Medicine</option>
                    <option>Internal Medicine</option>
                    <option>Surgery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Attending Physician</option>
                    <option>Resident</option>
                    <option>Nurse Practitioner</option>
                    <option>Administrator</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email alerts for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                    <p className="text-sm text-gray-600">Get text messages for urgent notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Patient Status Updates</h4>
                    <p className="text-sm text-gray-600">Notifications when patient status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Lab Results</h4>
                    <p className="text-sm text-gray-600">Alerts for new lab results and critical values</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Schedule Reminders</h4>
                    <p className="text-sm text-gray-600">Reminders for upcoming appointments</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <Input type="password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-600">Chrome on Windows • New York, NY</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Mobile App</p>
                      <p className="text-sm text-gray-600">iOS App • Last seen 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
