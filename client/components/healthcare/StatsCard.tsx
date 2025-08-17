import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary";
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
    period?: string;
  };
  loading?: boolean;
  animated?: boolean;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  variant = "default",
  change,
  loading = false,
  animated = true
}: StatsCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState("0");
  const [isHovered, setIsHovered] = useState(false);

  // Animate the value when it changes
  useEffect(() => {
    if (!animated) {
      setAnimatedValue(value);
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Simple animation for numeric values
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      let currentValue = 0;
      const increment = numericValue / 30; // 30 frames
      const animationTimer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          currentValue = numericValue;
          clearInterval(animationTimer);
        }
        
        // Preserve the original format
        const suffix = value.replace(/[0-9.]/g, '');
        const animatedNum = Math.round(currentValue * 10) / 10;
        setAnimatedValue(animatedNum + suffix.replace(/[^a-zA-Z%]/g, ''));
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(animationTimer);
      };
    } else {
      setAnimatedValue(value);
    }

    return () => clearTimeout(timer);
  }, [value, animated]);

  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "neutral":
        return <Minus className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (!change) return "";
    
    switch (change.trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "neutral":
        return "text-gray-600";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-500 ease-out cursor-pointer group",
        "",
        variant === "primary" 
          ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg" 
          : "bg-white shadow-sm hover:shadow-lg",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isHovered && "scale-105"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className={cn(
        "absolute inset-0 opacity-10 transition-opacity duration-300",
        variant === "primary" ? "bg-white" : "bg-gradient-to-br from-violet-100 to-blue-100",
        isHovered ? "opacity-20" : "opacity-10"
      )}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title */}
            <p className={cn(
              "text-sm font-medium transition-all duration-300",
              variant === "primary" ? "text-white/80" : "text-gray-600"
            )}>
              {title}
            </p>
            
            {/* Value */}
            <p className={cn(
              "text-3xl font-bold mt-2 transition-all duration-500",
              variant === "primary" ? "text-white" : "text-gray-900",
              isHovered && "scale-110 transform-origin-left"
            )}>
              {animatedValue}
            </p>

            {/* Change Indicator */}
            {change && (
              <div className={cn(
                "flex items-center space-x-1 mt-3 transition-all duration-300"
              )}>
                {getTrendIcon()}
                <span className={cn(
                  "text-sm font-medium",
                  variant === "primary" ? "text-white/90" : getTrendColor()
                )}>
                  {change.value}
                </span>
                {change.period && (
                  <span className={cn(
                    "text-xs",
                    variant === "primary" ? "text-white/70" : "text-gray-500"
                  )}>
                    {change.period}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Icon */}
          {icon && (
            <div className={cn(
              "transition-all duration-500 ease-out",
              isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            )}>
              <div className={cn(
                "p-3 rounded-2xl transition-all duration-300",
                variant === "primary" 
                  ? "bg-white/20 backdrop-blur-sm" 
                  : "bg-gradient-to-br from-violet-50 to-blue-50"
              )}>
                {icon}
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Line */}
        <div className={cn(
          "absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-500 ease-out",
          variant === "primary" 
            ? "from-white/50 to-white/30" 
            : "from-violet-500 to-blue-500",
          isHovered ? "w-full" : "w-0"
        )} />

        {/* Shimmer Effect */}
        <div className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          isVisible && "translate-x-full"
        )} />
      </CardContent>
    </Card>
  );
}
