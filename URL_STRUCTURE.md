# Healthcare EHR Dashboard - URL Structure

## Production URLs

**Base URL**: `https://yourapp.vercel.app` (replace with actual Vercel deployment URL)

## Main Application Routes

### 🏠 **Dashboard & Overview**

- `/dashboard-home` - Main Dashboard (Home Page)
- `/` - Redirects to `/dashboard-home` (handled automatically)
- `/Dashboard` - Legacy redirect (removed)

### 👥 **Patient Management**

- `/patients` - Patient list and search
- `/patients/register` - New patient registration
- `/patients/search` - Patient search interface
- `/patients/records` - Patient records view
- `/patients/:id` - Individual patient details (dynamic route)

### 🩺 **Clinical Care**

- `/clinical` - Clinical overview
- `/clinical/progress` - Progress notes
- `/clinical/assessments` - Clinical assessments
- `/clinical/care-plans` - Patient care plans
- `/clinical/procedures` - Medical procedures
- `/clinical/vitals` - Vital signs monitoring

### 🧪 **Laboratory & Diagnostics**

- `/laboratory/orders` - Lab test orders
- `/laboratory/results` - Lab test results
- `/laboratory/microbiology` - Microbiology results
- `/laboratory/pathology` - Pathology reports
- `/laboratory/blood` - Blood bank management

### 🖼️ **Imaging & Radiology**

- `/imaging/orders` - Imaging orders
- `/imaging/results` - Imaging results
- `/imaging/viewer` - PACS viewer
- `/imaging/reports` - Radiology reports

### 💊 **Pharmacy**

- `/pharmacy/medications` - Medication management
- `/pharmacy/prescriptions` - Prescription management
- `/pharmacy/interactions` - Drug interaction checking
- `/pharmacy/inventory` - Pharmacy inventory

### 📅 **Scheduling**

- `/schedule` - Appointment scheduling
- `/schedule/calendar` - Calendar view
- `/schedule/resources` - Resource booking
- `/schedule/waitlist` - Patient waitlist

### 💬 **Communication**

- `/messages` - Secure messaging
- `/messages/consultations` - Inter-departmental consultations
- `/messages/portal` - Patient communication portal

### 📊 **Analytics & Reports**

- `/analytics` - System analytics (legacy route)
- `/reports` - Report generation
- `/admin` - System administration
- `/billing` - Financial management

### 📁 **System Management**

- `/files` - Document management
- `/rooms` - Room and bed management
- `/settings` - User settings
- `/security` - Security settings
- `/tools` - System tools

### 🚨 **Quick Access**

- `/emergency` - Emergency alerts
- `/notifications` - System notifications

## API Endpoints

### 🔧 **Backend API Routes**

- `/api/ping` - Health check endpoint
- `/api/demo` - Demo data endpoint
- `/api/*` - All API routes (served by serverless functions)

## Special Routes

### 🔗 **Redirects & Aliases**

- `/Dashboard` → `/` (automatic redirect)
- Any undefined route → `404 Not Found` page

## URL Parameters

### 📋 **Dynamic Routes**

- `/patients/:id` - Patient ID parameter
  - Example: `/patients/12345`
  - Example: `/patients/john-doe-mrn-67890`

### 🔍 **Query Parameters** (Future Implementation)

- `/patients?search=john` - Search patients
- `/laboratory/results?date=2024-01-01` - Filter by date
- `/schedule?provider=dr-smith` - Filter by provider
- `/reports?type=monthly&department=cardiology` - Report filters

## SEO & Meta Information

### 🎯 **Page Titles**

- Home: "Healthcare EHR Dashboard"
- Patients: "Patient Management - Healthcare EHR"
- Clinical: "Clinical Documentation - Healthcare EHR"
- Schedule: "Appointment Scheduling - Healthcare EHR"

### 📝 **Meta Descriptions**

- Optimized for healthcare workflow keywords
- HIPAA compliance mentions where appropriate
- Professional healthcare terminology

## Security Considerations

### 🔒 **Access Control**

- All routes require authentication (implement as needed)
- Role-based access to specific sections
- Audit logging for sensitive pages

### 🛡️ **Privacy Protection**

- Patient data URLs are parameterized
- No sensitive information in URL structures
- HIPAA-compliant routing patterns

## Mobile & Responsive

### 📱 **Mobile-Optimized Routes**

- All routes fully responsive
- Touch-friendly navigation
- Optimized for bedside tablet use

## Performance

### ⚡ **Optimization Features**

- Client-side routing (React Router)
- Code splitting by route
- Lazy loading for non-critical pages
- Static asset optimization via Vercel CDN

## Deployment Notes

### 🚀 **Vercel Configuration**

- SPA routing handled by `vercel.json`
- API routes as serverless functions
- Automatic HTTPS for all URLs
- Global CDN distribution

## Usage Examples

### 👨‍⚕️ **Common User Workflows**

```
Doctor Login → Dashboard (/dashboard-home) → Patient Search (/patients) → Patient Record (/patients/12345) → Clinical Notes (/clinical/progress)

Nurse Login → Dashboard (/dashboard-home) → Schedule (/schedule) → Patient Care (/patients) → Medication Admin (/pharmacy/medications)

Admin Login → Dashboard (/dashboard-home) → Reports (/reports) → Analytics (/analytics) → Settings (/settings)
```

### 🔗 **Direct Access URLs**

```bash
# Patient lookup
https://yourapp.vercel.app/patients/search?q=smith

# Specific clinical workflow
https://yourapp.vercel.app/clinical/progress

# Emergency access
https://yourapp.vercel.app/emergency
```

---

**Note**: Replace `yourapp.vercel.app` with your actual Vercel deployment URL after deployment.
