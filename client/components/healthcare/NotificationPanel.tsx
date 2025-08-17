import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "status" | "alert" | "meeting";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Patients status",
    message: "Rosa Charles status has changed to outpatient",
    type: "status",
  },
  {
    id: "2",
    title: "A new case of allergy",
    message: "Alexander Wells has a new allergy",
    type: "alert",
  },
  {
    id: "3",
    title: "Meeting today",
    message: "In a big hall",
    type: "meeting",
  },
];

export function NotificationPanel() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-2">
            <div className="w-2.5 h-2.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                {notification.title}
              </p>
              <p className="text-sm text-gray-500">{notification.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
