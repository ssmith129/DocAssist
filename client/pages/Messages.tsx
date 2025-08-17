import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Bell,
  Users
} from "lucide-react";

// Mock messages data
const conversations = [
  {
    id: "1",
    name: "Dr. Sarah Martinez",
    role: "Cardiologist",
    lastMessage: "Patient's test results look good. Let's schedule a follow-up next week.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64"
  },
  {
    id: "2",
    name: "Nursing Team",
    role: "ICU Department",
    lastMessage: "Mr. Johnson's vitals are stable. Ready for discharge tomorrow.",
    timestamp: "15 min ago",
    unread: 0,
    online: true
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    role: "Emergency Medicine",
    lastMessage: "Need consultation on trauma patient in ER bed 3",
    timestamp: "1 hour ago",
    unread: 1,
    online: false
  },
  {
    id: "4",
    name: "Pharmacy",
    role: "Medication Alerts",
    lastMessage: "Drug interaction alert for patient MRN-001234",
    timestamp: "2 hours ago",
    unread: 0,
    online: true
  },
  {
    id: "5",
    name: "Lab Department",
    role: "Results Team",
    lastMessage: "Critical lab values for patient in room 205",
    timestamp: "3 hours ago",
    unread: 3,
    online: false
  }
];

const messages = [
  {
    id: "1",
    sender: "Dr. Sarah Martinez",
    message: "Good morning! I've reviewed the latest cardiac enzyme results for Mrs. Johnson.",
    timestamp: "09:15 AM",
    isOwn: false
  },
  {
    id: "2",
    sender: "You",
    message: "Thanks for the quick review. What's your assessment?",
    timestamp: "09:17 AM",
    isOwn: true
  },
  {
    id: "3",
    sender: "Dr. Sarah Martinez",
    message: "The troponin levels have normalized, which is excellent news. I recommend continuing current medication and scheduling a follow-up echo in 2 weeks.",
    timestamp: "09:20 AM",
    isOwn: false
  },
  {
    id: "4",
    sender: "You",
    message: "Perfect. I'll coordinate with the patient and schedule the echo. Should we adjust the beta-blocker dosage?",
    timestamp: "09:22 AM",
    isOwn: true
  },
  {
    id: "5",
    sender: "Dr. Sarah Martinez",
    message: "Current dosage is working well. Let's maintain it for now and reassess after the echo.",
    timestamp: "09:25 AM",
    isOwn: false
  }
];

export default function Messages() {
  return (
    <BaseLayout title="Messages">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Messages"
          value="127"
          icon={<MessageSquare className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Unread"
          value="6"
          variant="primary"
          icon={<Bell className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Active Chats"
          value="12"
          icon={<Users className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Online Staff"
          value="23"
          icon={<Users className="w-12 h-12 text-emerald-600" />}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Conversations List - Left Side */}
        <div className="col-span-4">
          <Card className="shadow-lg h-[600px] flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-700">Conversations</CardTitle>
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
                  <div 
                    key={conversation.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                      index === 0 ? 'border-l-violet-600 bg-violet-50' : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        {conversation.avatar ? (
                          <img 
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                            <span className="text-violet-600 font-medium text-sm">
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <div className="mt-2">
                            <Badge className="bg-red-500 text-white text-xs">
                              {conversation.unread}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface - Right Side */}
        <div className="col-span-8">
          <Card className="shadow-lg h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/94725adbbe1b8f9e7ac623d88dc44cfe413a9fad?width=64"
                    alt="Dr. Sarah Martinez"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">Dr. Sarah Martinez</h3>
                    <p className="text-sm text-gray-600">Cardiologist • Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-violet-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button size="sm" variant="ghost">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
