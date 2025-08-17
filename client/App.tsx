import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main pages
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Clinical from "./pages/Clinical";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";

// Patient Management pages
import PatientRegistration from "./pages/patients/PatientRegistration";

// Laboratory pages
import LabOrders from "./pages/laboratory/LabOrders";

// Pharmacy pages
import Medications from "./pages/pharmacy/Medications";

// Clinical pages
import ProgressNotes from "./pages/clinical/ProgressNotes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Patient Management */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/register" element={<PatientRegistration />} />
          <Route path="/patients/search" element={<Patients />} />
          <Route path="/patients/records" element={<Patients />} />

          {/* Clinical Care */}
          <Route path="/clinical" element={<Clinical />} />
          <Route path="/clinical/progress" element={<ProgressNotes />} />
          <Route path="/clinical/assessments" element={<Clinical />} />
          <Route path="/clinical/care-plans" element={<Clinical />} />
          <Route path="/clinical/procedures" element={<Clinical />} />
          <Route path="/clinical/vitals" element={<Clinical />} />

          {/* Laboratory */}
          <Route path="/laboratory/orders" element={<LabOrders />} />
          <Route path="/laboratory/results" element={<LabOrders />} />
          <Route path="/laboratory/microbiology" element={<LabOrders />} />
          <Route path="/laboratory/pathology" element={<LabOrders />} />
          <Route path="/laboratory/blood" element={<LabOrders />} />

          {/* Pharmacy */}
          <Route path="/pharmacy/medications" element={<Medications />} />
          <Route path="/pharmacy/prescriptions" element={<Medications />} />
          <Route path="/pharmacy/interactions" element={<Medications />} />
          <Route path="/pharmacy/inventory" element={<Medications />} />

          {/* Imaging & Diagnostics */}
          <Route path="/imaging/orders" element={<Clinical />} />
          <Route path="/imaging/results" element={<Clinical />} />
          <Route path="/imaging/viewer" element={<Clinical />} />
          <Route path="/imaging/reports" element={<Clinical />} />

          {/* Scheduling */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/calendar" element={<Schedule />} />
          <Route path="/schedule/resources" element={<Schedule />} />
          <Route path="/schedule/waitlist" element={<Schedule />} />

          {/* Communication */}
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/consultations" element={<Messages />} />
          <Route path="/messages/portal" element={<Messages />} />

          {/* System Items */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Settings />} />
          <Route path="/billing" element={<Settings />} />
          <Route path="/files" element={<Settings />} />
          <Route path="/rooms" element={<Settings />} />

          {/* Bottom Items */}
          <Route path="/security" element={<Settings />} />
          <Route path="/tools" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
