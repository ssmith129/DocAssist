import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  User,
  FileText,
  Database,
  Activity,
  Fingerprint,
  KeyRound
} from "lucide-react";

// HIPAA-compliant session management
interface SessionManagerProps {
  sessionTimeout?: number; // in minutes
  warningTime?: number; // in minutes
  onSessionExpired?: () => void;
  onSessionWarning?: () => void;
  children: React.ReactNode;
}

export function SessionManager({
  sessionTimeout = 20,
  warningTime = 5,
  onSessionExpired,
  onSessionWarning,
  children
}: SessionManagerProps) {
  const [timeRemaining, setTimeRemaining] = useState(sessionTimeout * 60);
  const [showWarning, setShowWarning] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const warningShown = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Reset timer on user activity
  const resetTimer = () => {
    setTimeRemaining(sessionTimeout * 60);
    setShowWarning(false);
    warningShown.current = false;
    setIsActive(true);
  };

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetOnActivity = () => {
      if (isActive) resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, resetOnActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetOnActivity, true);
      });
    };
  }, [isActive, sessionTimeout]);

  // Session countdown
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Show warning
        if (newTime <= warningTime * 60 && !warningShown.current) {
          setShowWarning(true);
          warningShown.current = true;
          onSessionWarning?.();
        }
        
        // Session expired
        if (newTime <= 0) {
          setIsActive(false);
          onSessionExpired?.();
          clearInterval(intervalRef.current);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [warningTime, onSessionExpired, onSessionWarning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const extendSession = () => {
    resetTimer();
  };

  const logoutNow = () => {
    setIsActive(false);
    onSessionExpired?.();
  };

  if (!isActive) {
    return (
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="session-expired-title"
        aria-describedby="session-expired-description"
      >
        <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-red-600" />
            <h2 id="session-expired-title" className="text-lg font-semibold text-gray-900">
              Session Expired
            </h2>
          </div>
          <p id="session-expired-description" className="text-gray-600 mb-4">
            Your session has expired for security purposes. Please log in again to continue accessing patient information.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={resetTimer}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      
      {/* Session Warning Modal */}
      {showWarning && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="session-warning-title"
          aria-describedby="session-warning-description"
          aria-live="assertive"
        >
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
              <h2 id="session-warning-title" className="text-lg font-semibold text-gray-900">
                Session Expiring Soon
              </h2>
            </div>
            <p id="session-warning-description" className="text-gray-600 mb-4">
              Your session will expire in <strong>{formatTime(timeRemaining)}</strong> for security purposes. 
              Click "Stay Logged In" to continue working.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={extendSession}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Stay Logged In
              </button>
              <button
                onClick={logoutNow}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Timer (for development/admin view) */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-75">
        Session: {formatTime(timeRemaining)}
      </div>
    </>
  );
}

// HIPAA-compliant data masking component
interface DataMaskingProps {
  data: string;
  maskType?: 'ssn' | 'phone' | 'email' | 'custom';
  showLength?: number;
  maskCharacter?: string;
  label: string;
  requireAuth?: boolean;
  onUnmask?: () => void;
}

export function DataMasking({
  data,
  maskType = 'custom',
  showLength = 4,
  maskCharacter = '•',
  label,
  requireAuth = true,
  onUnmask
}: DataMaskingProps) {
  const [isUnmasked, setIsUnmasked] = useState(false);
  const [authAttempts, setAuthAttempts] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getMaskedData = () => {
    if (!data) return '';
    
    switch (maskType) {
      case 'ssn':
        return `${maskCharacter.repeat(3)}-${maskCharacter.repeat(2)}-${data.slice(-4)}`;
      case 'phone':
        return `(${maskCharacter.repeat(3)}) ${maskCharacter.repeat(3)}-${data.slice(-4)}`;
      case 'email':
        const [username, domain] = data.split('@');
        return `${username.slice(0, 2)}${maskCharacter.repeat(username.length - 2)}@${domain}`;
      default:
        return data.slice(0, showLength) + maskCharacter.repeat(Math.max(0, data.length - showLength));
    }
  };

  const handleUnmask = async () => {
    if (requireAuth && !isAuthorized) {
      // In a real implementation, this would trigger actual authentication
      const authSuccess = await simulateAuth();
      if (authSuccess) {
        setIsAuthorized(true);
        setIsUnmasked(true);
        onUnmask?.();
      } else {
        setAuthAttempts(prev => prev + 1);
      }
    } else {
      setIsUnmasked(true);
      onUnmask?.();
    }
  };

  const simulateAuth = (): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate successful auth for demo
        resolve(authAttempts < 2);
      }, 1000);
    });
  };

  const handleMask = () => {
    setIsUnmasked(false);
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <span 
        className={cn(
          "font-mono text-sm px-2 py-1 rounded",
          isUnmasked ? "bg-yellow-50 border border-yellow-200" : "bg-gray-100 border border-gray-200"
        )}
        aria-label={`${label}: ${isUnmasked ? 'visible' : 'masked for privacy'}`}
      >
        {isUnmasked ? data : getMaskedData()}
      </span>
      
      <button
        type="button"
        onClick={isUnmasked ? handleMask : handleUnmask}
        className={cn(
          "p-1 rounded text-xs transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          isUnmasked 
            ? "text-red-600 hover:bg-red-50" 
            : "text-blue-600 hover:bg-blue-50"
        )}
        aria-label={`${isUnmasked ? 'Hide' : 'Show'} ${label}`}
        disabled={authAttempts >= 3}
      >
        {isUnmasked ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>

      {authAttempts >= 3 && (
        <span className="text-xs text-red-600 ml-2">
          Max auth attempts reached
        </span>
      )}
    </div>
  );
}

// HIPAA audit logging component
interface AuditLogProps {
  action: string;
  resourceType: 'patient' | 'medication' | 'lab' | 'appointment' | 'system';
  resourceId?: string;
  userId: string;
  userRole: string;
  timestamp?: Date;
  ipAddress?: string;
  userAgent?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  children?: React.ReactNode;
}

export function AuditLogger({
  action,
  resourceType,
  resourceId,
  userId,
  userRole,
  timestamp = new Date(),
  ipAddress,
  userAgent,
  severity = 'medium',
  children
}: AuditLogProps) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    // In a real implementation, this would send to a secure audit service
    const auditEntry = {
      timestamp: timestamp.toISOString(),
      action,
      resourceType,
      resourceId,
      user: {
        id: userId,
        role: userRole,
        ipAddress: ipAddress || 'unknown',
        userAgent: userAgent || navigator.userAgent
      },
      severity,
      sessionId: sessionStorage.getItem('sessionId') || 'unknown'
    };

    // Log to secure audit trail
    console.log('HIPAA Audit Log:', auditEntry);
    
    // In production, send to secure logging service
    // await sendToAuditService(auditEntry);
    
    setLogged(true);
  }, [action, resourceType, resourceId, userId, userRole, timestamp, ipAddress, userAgent, severity]);

  if (!logged) {
    return (
      <div className="inline-flex items-center text-xs text-gray-500">
        <Activity className="w-3 h-3 mr-1 animate-spin" />
        Logging access...
      </div>
    );
  }

  return children || null;
}

// HIPAA-compliant data access wrapper
interface SecureDataAccessProps {
  data: any;
  accessLevel: 'basic' | 'clinical' | 'financial' | 'administrative';
  userPermissions: string[];
  patientId?: string;
  onAccessGranted?: (data: any) => void;
  onAccessDenied?: (reason: string) => void;
  children: (data: any, hasAccess: boolean) => React.ReactNode;
}

export function SecureDataAccess({
  data,
  accessLevel,
  userPermissions,
  patientId,
  onAccessGranted,
  onAccessDenied,
  children
}: SecureDataAccessProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [accessReason, setAccessReason] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      setIsChecking(true);
      
      // Simulate access control check
      const requiredPermissions = {
        basic: ['read_basic'],
        clinical: ['read_clinical', 'read_basic'],
        financial: ['read_financial'],
        administrative: ['read_admin']
      };

      const required = requiredPermissions[accessLevel] || [];
      const hasPermission = required.every(perm => userPermissions.includes(perm));
      
      if (hasPermission) {
        setHasAccess(true);
        setAccessReason('Access granted');
        onAccessGranted?.(data);
      } else {
        setHasAccess(false);
        setAccessReason(`Insufficient permissions for ${accessLevel} access`);
        onAccessDenied?.(accessReason);
      }
      
      setIsChecking(false);
    };

    checkAccess();
  }, [data, accessLevel, userPermissions, onAccessGranted, onAccessDenied]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
        <span className="ml-2 text-sm text-gray-600">Verifying access permissions...</span>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="font-medium text-red-800">Access Restricted</h3>
            <p className="text-sm text-red-600">{accessReason}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuditLogger
        action={`view_${accessLevel}_data`}
        resourceType="patient"
        resourceId={patientId}
        userId="current-user" // In real app, get from auth context
        userRole="physician" // In real app, get from auth context
        severity={accessLevel === 'financial' ? 'high' : 'medium'}
      />
      {children(data, hasAccess)}
    </>
  );
}

// HIPAA Privacy Notice component
export function HIPAAPrivacyNotice() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [showFullNotice, setShowFullNotice] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900">HIPAA Privacy Notice</h3>
          <p className="text-sm text-blue-800 mt-1">
            This system contains protected health information (PHI) covered by HIPAA privacy regulations.
          </p>
          
          {showFullNotice && (
            <div className="mt-3 p-3 bg-white rounded border text-sm text-gray-700">
              <h4 className="font-medium mb-2">Your Rights Under HIPAA:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Right to access your health information</li>
                <li>Right to request amendments to your health information</li>
                <li>Right to request restrictions on use and disclosure</li>
                <li>Right to request confidential communications</li>
                <li>Right to file a complaint</li>
              </ul>
              
              <h4 className="font-medium mt-4 mb-2">How We Use Your Information:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Treatment - To provide and coordinate your care</li>
                <li>Payment - To obtain payment for your treatment</li>
                <li>Operations - To improve our healthcare services</li>
              </ul>
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowFullNotice(!showFullNotice)}
              className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showFullNotice ? 'Hide Full Notice' : 'View Full Privacy Notice'}
            </button>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <span className="text-sm text-blue-800">
                I acknowledge receipt of the Privacy Notice
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Encryption status indicator
export function EncryptionStatus({ 
  encrypted = true, 
  algorithm = "AES-256", 
  className 
}: { 
  encrypted?: boolean; 
  algorithm?: string; 
  className?: string; 
}) {
  return (
    <div className={cn("inline-flex items-center space-x-1 text-xs", className)}>
      {encrypted ? (
        <>
          <Lock className="w-3 h-3 text-green-600" />
          <span className="text-green-700">Encrypted ({algorithm})</span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-3 h-3 text-red-600" />
          <span className="text-red-700">Not Encrypted</span>
        </>
      )}
    </div>
  );
}
