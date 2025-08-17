import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  variant = "secondary",
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-6 rounded-2xl shadow-lg relative overflow-hidden",
        variant === "primary"
          ? "bg-gradient-to-br from-violet-600 to-purple-500"
          : "bg-gradient-to-br from-emerald-200 to-emerald-300",
        className,
      )}
    >
      <div className="relative z-10">
        <p
          className={cn(
            "text-sm font-medium",
            variant === "primary" ? "text-white/80" : "text-black/50",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-3xl font-bold",
            variant === "primary" ? "text-white" : "text-gray-900",
          )}
        >
          {value}
        </p>
      </div>

      {/* Icon positioned at bottom right */}
      {icon && (
        <div className="absolute bottom-4 right-4 opacity-80">{icon}</div>
      )}
    </div>
  );
}
