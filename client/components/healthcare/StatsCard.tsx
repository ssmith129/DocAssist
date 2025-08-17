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
        "flex flex-col gap-1 p-6 rounded-2xl relative overflow-hidden min-h-[128px]",
        variant === "primary"
          ? "bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 shadow-[0_10px_16px_0_rgba(178,108,249,0.5)]"
          : "bg-gradient-to-br from-emerald-200 via-emerald-300 to-cyan-200 shadow-[6px_6px_30px_0_rgba(69,93,140,0.1),_2px_2px_2px_0_rgba(73,96,141,0.1)]",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col">
        <p
          className={cn(
            "text-sm font-medium mb-1",
            variant === "primary" ? "text-white/90" : "text-black/50",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-3xl font-bold leading-tight",
            variant === "primary" ? "text-white" : "text-gray-900",
          )}
        >
          {value}
        </p>
      </div>

      {/* Icon positioned at bottom right */}
      {icon && (
        <div className="absolute bottom-0 right-[-14px] opacity-90">{icon}</div>
      )}
    </div>
  );
}
