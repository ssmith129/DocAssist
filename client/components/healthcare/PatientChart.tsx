import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartData = [
  { day: "M", men: 18, women: 15 },
  { day: "T", men: 25, women: 20 },
  { day: "W", men: 32, women: 12 },
  { day: "T", men: 15, women: 8 },
  { day: "F", men: 28, women: 22 },
  { day: "S", men: 35, women: 28 },
  { day: "S", men: 30, women: 18 },
];

const patientTypes = [
  { label: "Outpatient", count: 34, color: "#C4B5FD" },
  { label: "Inpatient", count: 12, color: "#8B5CF6" },
  { label: "Emergency", count: 65, color: "#6EE7B7" },
];

export function PatientChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">New patients</p>
          <div className="flex flex-col space-y-1.5 text-right">
            <span className="text-sm text-gray-600">Men</span>
            <span className="text-sm text-gray-600">Women</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                domain={[0, 36]}
                ticks={[0, 9, 18, 27, 36]}
              />
              <Bar
                dataKey="men"
                fill="#8B5CF6"
                radius={[2, 2, 0, 0]}
                barSize={40}
              />
              <Bar
                dataKey="women"
                fill="#C4B5FD"
                radius={[2, 2, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function PatientTypeChart() {
  return (
    <Card className="shadow-lg w-60">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-4">Patient type</p>

        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            {patientTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-xs text-gray-600">{type.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 text-right">
            {patientTypes.map((type, index) => (
              <div key={index} className="text-xs text-gray-600">
                {type.count}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="relative w-28 h-28 mx-auto">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#C4B5FD"
              strokeWidth="10"
              strokeDasharray="70 212"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="10"
              strokeDasharray="30 252"
              strokeDashoffset="-70"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#6EE7B7"
              strokeWidth="10"
              strokeDasharray="163 119"
              strokeDashoffset="-100"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
