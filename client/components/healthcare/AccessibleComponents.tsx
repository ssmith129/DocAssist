import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  ChevronDown, 
  ChevronUp,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  User,
  Heart,
  Activity
} from "lucide-react";

// WCAG compliant Alert component for healthcare notifications
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error' | 'critical';
  title: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  autoAnnounce?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export function AccessibleAlert({ 
  type, 
  title, 
  children, 
  dismissible = false, 
  onDismiss,
  autoAnnounce = true,
  priority = 'medium'
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoAnnounce && alertRef.current) {
      // Announce to screen readers
      const announcement = `${type === 'critical' ? 'Critical alert: ' : ''}${title}`;
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', type === 'critical' ? 'assertive' : 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      
      setTimeout(() => document.body.removeChild(announcer), 1000);
    }
  }, [autoAnnounce, title, type]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const alertConfig = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    error: {
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    },
    critical: {
      icon: AlertTriangle,
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      textColor: 'text-red-900',
      iconColor: 'text-red-700'
    }
  };

  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      ref={alertRef}
      role="alert"
      aria-live={type === 'critical' ? 'assertive' : 'polite'}
      aria-labelledby={`alert-title-${type}`}
      aria-describedby={`alert-content-${type}`}
      className={cn(
        "relative rounded-lg border-l-4 p-4 transition-all duration-300",
        config.bgColor,
        config.borderColor,
        priority === 'high' && "shadow-lg ring-2 ring-offset-2 ring-red-200",
        type === 'critical' && "animate-pulse"
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <IconComponent 
            className={cn("h-5 w-5", config.iconColor)} 
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 
            id={`alert-title-${type}`}
            className={cn("text-sm font-medium", config.textColor)}
          >
            {title}
          </h3>
          <div 
            id={`alert-content-${type}`}
            className={cn("mt-2 text-sm", config.textColor)}
          >
            {children}
          </div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                "inline-flex rounded-md p-1.5 transition-colors",
                config.textColor,
                "hover:bg-black hover:bg-opacity-10",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              )}
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// WCAG compliant expandable section for patient information
interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  priority?: 'high' | 'medium' | 'low';
}

export function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  icon,
  badge,
  priority = 'medium'
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonId = `expandable-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const contentId = `${buttonId}-content`;

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-all duration-200",
      priority === 'high' ? "border-red-200 bg-red-50" : "border-gray-200 bg-white",
      isExpanded && "shadow-md"
    )}>
      <button
        id={buttonId}
        type="button"
        className={cn(
          "w-full px-4 py-3 text-left flex items-center justify-between",
          "hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-200",
          "transition-colors duration-200"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title} section`}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <span className="text-gray-500" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="font-medium text-gray-900">{title}</span>
          {badge && (
            <span 
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                priority === 'high' ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
              )}
              aria-label={`${badge} items`}
            >
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
        )}
      </button>
      
      <div
        id={contentId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

// WCAG compliant patient status indicator
interface PatientStatusProps {
  status: 'stable' | 'critical' | 'monitoring' | 'discharge' | 'emergency';
  patientName: string;
  lastUpdated?: string;
  vitals?: {
    heartRate?: number;
    bloodPressure?: string;
    temperature?: number;
    oxygenSaturation?: number;
  };
}

export function PatientStatusIndicator({ 
  status, 
  patientName, 
  lastUpdated,
  vitals 
}: PatientStatusProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const statusConfig = {
    stable: {
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-400',
      icon: CheckCircle,
      label: 'Stable condition'
    },
    critical: {
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      icon: AlertTriangle,
      label: 'Critical condition'
    },
    monitoring: {
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      icon: Activity,
      label: 'Under monitoring'
    },
    discharge: {
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-400',
      icon: User,
      label: 'Ready for discharge'
    },
    emergency: {
      color: 'text-red-900',
      bgColor: 'bg-red-200',
      borderColor: 'border-red-600',
      icon: AlertTriangle,
      label: 'Emergency condition'
    }
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  // Play alert sound for critical/emergency status
  useEffect(() => {
    if (soundEnabled && (status === 'critical' || status === 'emergency')) {
      // In a real implementation, you would play an actual alert sound
      console.log(`Alert sound for ${status} status`);
    }
  }, [status, soundEnabled]);

  return (
    <div
      role="status"
      aria-live={status === 'critical' || status === 'emergency' ? 'assertive' : 'polite'}
      className={cn(
        "relative rounded-lg border-l-4 p-4 transition-all duration-300",
        config.bgColor,
        config.borderColor,
        (status === 'critical' || status === 'emergency') && "animate-pulse shadow-lg"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={cn("p-2 rounded-full", config.bgColor)}>
            <IconComponent 
              className={cn("h-5 w-5", config.color)} 
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className={cn("font-medium", config.color)}>
              {patientName}
            </h3>
            <p className={cn("text-sm", config.color)}>
              Status: {config.label}
            </p>
            {lastUpdated && (
              <p className="text-xs text-gray-600 mt-1">
                <Clock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>

        {/* Sound toggle for critical alerts */}
        {(status === 'critical' || status === 'emergency') && (
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={cn(
              "p-2 rounded-md transition-colors",
              "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
            aria-label={`${soundEnabled ? 'Disable' : 'Enable'} alert sounds`}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-gray-600" />
            ) : (
              <VolumeX className="h-4 w-4 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Vitals display for critical patients */}
      {vitals && (status === 'critical' || status === 'monitoring') && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Vitals</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {vitals.heartRate && (
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-red-500" aria-hidden="true" />
                <span>HR: {vitals.heartRate} bpm</span>
              </div>
            )}
            {vitals.bloodPressure && (
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-blue-500" aria-hidden="true" />
                <span>BP: {vitals.bloodPressure}</span>
              </div>
            )}
            {vitals.temperature && (
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-orange-400" aria-hidden="true" />
                <span>Temp: {vitals.temperature}°F</span>
              </div>
            )}
            {vitals.oxygenSaturation && (
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-blue-400" aria-hidden="true" />
                <span>O2: {vitals.oxygenSaturation}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        {patientName} is in {config.label}
        {vitals && `, vital signs: heart rate ${vitals.heartRate}, blood pressure ${vitals.bloodPressure}`}
      </div>
    </div>
  );
}

// WCAG compliant toggle for sensitive information
interface SensitiveInfoToggleProps {
  children: React.ReactNode;
  label: string;
  defaultVisible?: boolean;
  requireConfirmation?: boolean;
}

export function SensitiveInfoToggle({
  children,
  label,
  defaultVisible = false,
  requireConfirmation = true
}: SensitiveInfoToggleProps) {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggle = () => {
    if (!isVisible && requireConfirmation) {
      setShowConfirmation(true);
    } else {
      setIsVisible(!isVisible);
      setShowConfirmation(false);
    }
  };

  const handleConfirm = () => {
    setIsVisible(true);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-md text-sm font-medium",
            "border-2 transition-colors duration-200",
            "focus:outline-none focus:ring-4 focus:ring-blue-200",
            isVisible 
              ? "border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
              : "border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100"
          )}
          aria-pressed={isVisible}
          aria-label={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
        >
          {isVisible ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" aria-hidden="true" />
              Hide
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
              Show
            </>
          )}
        </button>
      </div>

      {showConfirmation && (
        <div 
          role="dialog" 
          aria-labelledby="confirmation-title"
          aria-describedby="confirmation-description"
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <h3 id="confirmation-title" className="font-medium text-yellow-800">
            Confirm Access to Sensitive Information
          </h3>
          <p id="confirmation-description" className="text-sm text-yellow-700 mt-1">
            You are about to view sensitive patient information. Please confirm this action is authorized.
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="px-3 py-1 bg-yellow-600 text-white rounded text-sm font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isVisible && (
        <div 
          className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
          aria-live="polite"
        >
          {children}
        </div>
      )}
    </div>
  );
}
