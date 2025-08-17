import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Main pages
import Dashboard from "./pages/Dashboard"; // New unified dashboard
import Patients from "./pages/Patients";
import Clinical from "./pages/Clinical";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics"; // Keep for backwards compatibility
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";

// Patient Management pages
import PatientRegistration from "./pages/patients/PatientRegistration";
import PatientDetail from "./pages/patients/PatientDetail";

// Laboratory pages
import LabOrders from "./pages/laboratory/LabOrders";

// Pharmacy pages
import Medications from "./pages/pharmacy/Medications";

// Clinical pages
import ProgressNotes from "./pages/clinical/ProgressNotes";

// Placeholder component for routes under development
import { PlaceholderPage } from "./components/healthcare/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard-home for backward compatibility */}
          <Route path="/" element={<Navigate to="/dashboard-home" replace />} />

          {/* Main Dashboard - Unified Overview and Analytics */}
          <Route path="/dashboard-home" element={<Dashboard />} />

          {/* Dashboard redirect - handle /Dashboard route */}
          <Route
            path="/Dashboard"
            element={<Navigate to="/dashboard-home" replace />}
          />

          {/* Legacy Analytics Route - Redirect to main dashboard with analytics tab */}
          <Route path="/analytics" element={<Analytics />} />

          {/* Patient Management */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/register" element={<PatientRegistration />} />
          <Route path="/patients/search" element={<Patients />} />
          <Route path="/patients/records" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />

          {/* Clinical Care */}
          <Route path="/clinical" element={<Clinical />} />
          <Route path="/clinical/progress" element={<ProgressNotes />} />
          <Route
            path="/clinical/assessments"
            element={
              <PlaceholderPage
                title="Clinical Assessments"
                description="Comprehensive patient assessments and evaluations"
              />
            }
          />
          <Route
            path="/clinical/care-plans"
            element={
              <PlaceholderPage
                title="Care Plans"
                description="Patient care planning and management"
              />
            }
          />
          <Route
            path="/clinical/procedures"
            element={
              <PlaceholderPage
                title="Procedures"
                description="Medical procedures and interventions"
              />
            }
          />
          <Route
            path="/clinical/vitals"
            element={
              <PlaceholderPage
                title="Vital Signs"
                description="Patient vital signs monitoring"
              />
            }
          />

          {/* Diagnostics - Consolidated Laboratory and Imaging */}
          <Route path="/laboratory/orders" element={<LabOrders />} />
          <Route
            path="/laboratory/results"
            element={
              <PlaceholderPage
                title="Lab Results"
                description="Laboratory test results and analysis"
              />
            }
          />
          <Route
            path="/laboratory/microbiology"
            element={
              <PlaceholderPage
                title="Microbiology"
                description="Microbiology test results"
              />
            }
          />
          <Route
            path="/laboratory/pathology"
            element={
              <PlaceholderPage
                title="Pathology"
                description="Pathology reports and analysis"
              />
            }
          />
          <Route
            path="/laboratory/blood"
            element={
              <PlaceholderPage
                title="Blood Bank"
                description="Blood bank management"
              />
            }
          />

          {/* Imaging & Diagnostics */}
          <Route
            path="/imaging/orders"
            element={
              <PlaceholderPage
                title="Imaging Orders"
                description="Radiology and imaging orders"
              />
            }
          />
          <Route
            path="/imaging/results"
            element={
              <PlaceholderPage
                title="Imaging Results"
                description="Radiology results and reports"
              />
            }
          />
          <Route
            path="/imaging/viewer"
            element={
              <PlaceholderPage
                title="PACS Viewer"
                description="Medical image viewing and analysis"
              />
            }
          />
          <Route
            path="/imaging/reports"
            element={
              <PlaceholderPage
                title="Imaging Reports"
                description="Radiology reports and documentation"
              />
            }
          />

          {/* Pharmacy */}
          <Route path="/pharmacy/medications" element={<Medications />} />
          <Route
            path="/pharmacy/prescriptions"
            element={
              <PlaceholderPage
                title="Prescriptions"
                description="Prescription management and e-prescribing"
              />
            }
          />
          <Route
            path="/pharmacy/interactions"
            element={
              <PlaceholderPage
                title="Drug Interactions"
                description="Drug interaction checking and alerts"
              />
            }
          />
          <Route
            path="/pharmacy/inventory"
            element={
              <PlaceholderPage
                title="Pharmacy Inventory"
                description="Medication inventory management"
              />
            }
          />

          {/* Scheduling */}
          <Route path="/schedule" element={<Schedule />} />
          <Route
            path="/schedule/calendar"
            element={
              <PlaceholderPage
                title="Calendar View"
                description="Calendar-based appointment scheduling"
              />
            }
          />
          <Route
            path="/schedule/resources"
            element={
              <PlaceholderPage
                title="Resource Booking"
                description="Hospital resource and room booking"
              />
            }
          />
          <Route
            path="/schedule/waitlist"
            element={
              <PlaceholderPage
                title="Waitlist"
                description="Patient waitlist management"
              />
            }
          />

          {/* Communication */}
          <Route path="/messages" element={<Messages />} />
          <Route
            path="/messages/consultations"
            element={
              <PlaceholderPage
                title="Consultations"
                description="Inter-departmental consultations"
              />
            }
          />
          <Route
            path="/messages/portal"
            element={
              <PlaceholderPage
                title="Patient Portal"
                description="Patient communication portal"
              />
            }
          />

          {/* System & Administrative */}
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/admin"
            element={
              <PlaceholderPage
                title="Administration"
                description="System administration and user management"
              />
            }
          />
          <Route
            path="/billing"
            element={
              <PlaceholderPage
                title="Billing"
                description="Financial management and billing"
              />
            }
          />
          <Route
            path="/files"
            element={
              <PlaceholderPage
                title="Files & Documents"
                description="Document management system"
              />
            }
          />
          <Route
            path="/rooms"
            element={
              <PlaceholderPage
                title="Room Management"
                description="Hospital room and bed management"
              />
            }
          />

          {/* Quick Access Routes */}
          <Route
            path="/emergency"
            element={
              <PlaceholderPage
                title="Emergency"
                description="Emergency alerts and critical notifications"
              />
            }
          />
          <Route
            path="/notifications"
            element={
              <PlaceholderPage
                title="Notifications"
                description="System-wide notifications and alerts"
              />
            }
          />

          {/* Settings & Security */}
          <Route
            path="/security"
            element={
              <PlaceholderPage
                title="Security"
                description="Security settings and access controls"
              />
            }
          />
          <Route
            path="/tools"
            element={
              <PlaceholderPage
                title="System Tools"
                description="System maintenance and diagnostic tools"
              />
            }
          />
          <Route path="/settings" element={<Settings />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
