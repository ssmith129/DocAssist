import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useRef } from "react";
import {
  UserPlus,
  Save,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Heart,
  AlertTriangle,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  maritalStatus: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  preferredLanguage: string;
  race: string;
  ethnicity: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  previousHospitals: string;
}

export default function PatientRegistration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    ssn: '',
    maritalStatus: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    preferredLanguage: '',
    race: '',
    ethnicity: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    previousHospitals: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSSN, setShowSSN] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // HIPAA Privacy Notice acknowledgment
  const [privacyNoticeAcknowledged, setPrivacyNoticeAcknowledged] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? `${name === 'firstName' ? 'First' : 'Last'} name is required` : '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const date = new Date(value);
        const today = new Date();
        if (date > today) return 'Date of birth cannot be in the future';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Please enter a valid phone number' : '';
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'ssn':
        if (value && !/^\d{3}-?\d{2}-?\d{4}$/.test(value)) {
          return 'Please enter a valid SSN format (XXX-XX-XXXX)';
        }
        return '';
      case 'zipCode':
        if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
          return 'Please enter a valid ZIP code';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Real-time validation for critical fields
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields
    const newErrors: FormErrors = {};
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'phone', 'address', 'city', 'state', 'zipCode'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field] = error;
    });

    // Check consent and privacy acknowledgment
    if (!consentGiven) {
      newErrors.consent = 'You must provide consent to continue';
    }
    if (!privacyNoticeAcknowledged) {
      newErrors.privacy = 'You must acknowledge the HIPAA Privacy Notice';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit data
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success feedback
        alert('Patient registered successfully');
        
        // Reset form
        setFormData({
          firstName: '', lastName: '', dateOfBirth: '', gender: '', ssn: '', maritalStatus: '',
          phone: '', email: '', address: '', city: '', state: '', zipCode: '',
          emergencyContactName: '', emergencyContactRelationship: '', emergencyContactPhone: '',
          preferredLanguage: '', race: '', ethnicity: '', insuranceProvider: '', insurancePolicyNumber: '',
          medicalHistory: '', currentMedications: '', allergies: '', previousHospitals: '',
        });
        setConsentGiven(false);
        setPrivacyNoticeAcknowledged(false);
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } else {
      // Focus first error field
      const firstErrorField = document.querySelector(`[aria-invalid="true"]`) as HTMLElement;
      firstErrorField?.focus();
    }

    setIsSubmitting(false);
  };

  return (
    <BaseLayout title="Patient Registration">
      {/* Accessibility announcement */}
      <div className="sr-only" aria-live="polite" id="form-status" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Today's Registrations"
          value="12"
          icon={<UserPlus className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Pending Verifications"
          value="5"
          variant="primary"
          icon={<AlertTriangle className="w-12 h-12 text-white" />}
        />
        <StatsCard
          title="Active Patients"
          value="1,247"
          icon={<User className="w-12 h-12 text-emerald-600" />}
        />
        <StatsCard
          title="Insurance Verified"
          value="89%"
          icon={<Heart className="w-12 h-12 text-emerald-600" />}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Registration Form - Main Content */}
        <div className="col-span-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-violet-600" />
                New Patient Registration
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                All information is encrypted and HIPAA compliant. Required fields are marked with an asterisk (*).
              </p>
            </CardHeader>
            <CardContent>
              {/* HIPAA Privacy Notice */}
              <Alert className="mb-6 border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>HIPAA Privacy Notice:</strong> Your health information is protected by law. 
                  By proceeding with registration, you acknowledge that you have received and reviewed our 
                  Notice of Privacy Practices.
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={privacyNoticeAcknowledged}
                        onChange={(e) => setPrivacyNoticeAcknowledged(e.target.checked)}
                        className="focus-hc w-4 h-4 text-blue-600 border-2 border-blue-300 rounded"
                        aria-describedby="privacy-notice-description"
                      />
                      <span className="text-sm">I acknowledge receipt of the HIPAA Privacy Notice</span>
                    </label>
                    {errors.privacy && (
                      <div className="error-message mt-1" role="alert">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        {errors.privacy}
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                {/* Patient Photo */}
                <fieldset className="mb-8">
                  <legend className="text-lg font-semibold text-gray-900 mb-4">Patient Photo (Optional)</legend>
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300"
                      role="img"
                      aria-label="Patient photo placeholder"
                    >
                      <Camera className="w-8 h-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="focus-hc"
                        aria-describedby="photo-help"
                      >
                        <Camera className="w-4 h-4 mr-2" aria-hidden="true" />
                        Upload Photo
                      </Button>
                      <p id="photo-help" className="text-sm text-gray-500">
                        Optional patient photo for identification. JPG or PNG format, max 5MB.
                      </p>
                    </div>
                  </div>
                </fieldset>

                {/* Personal Information */}
                <fieldset className="mb-8">
                  <legend className="text-lg font-semibold text-gray-900 mb-4">Personal Information</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                        className={`input-hc ${errors.firstName ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        required
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <div id="firstName-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                        className={`input-hc ${errors.lastName ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                        required
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <div id="lastName-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.lastName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={`input-hc ${errors.dateOfBirth ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.dateOfBirth}
                        aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : 'dateOfBirth-help'}
                        required
                        autoComplete="bday"
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <div id="dateOfBirth-help" className="text-xs text-gray-500 mt-1">
                        Used for age verification and medical calculations
                      </div>
                      {errors.dateOfBirth && (
                        <div id="dateOfBirth-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.dateOfBirth}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="gender" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="input-hc focus-hc"
                        aria-describedby="gender-help"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                      <div id="gender-help" className="text-xs text-gray-500 mt-1">
                        Used for appropriate medical care and room assignments
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-1">
                        Social Security Number
                      </label>
                      <div className="relative">
                        <Input
                          id="ssn"
                          name="ssn"
                          type={showSSN ? "text" : "password"}
                          value={formData.ssn}
                          onChange={(e) => handleInputChange('ssn', e.target.value)}
                          placeholder="XXX-XX-XXXX"
                          className={`input-hc pr-10 ${errors.ssn ? 'input-hc-error' : ''}`}
                          aria-invalid={!!errors.ssn}
                          aria-describedby={errors.ssn ? 'ssn-error' : 'ssn-help'}
                          autoComplete="off"
                          maxLength={11}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus-hc rounded"
                          onClick={() => setShowSSN(!showSSN)}
                          aria-label={showSSN ? "Hide SSN" : "Show SSN"}
                        >
                          {showSSN ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div id="ssn-help" className="text-xs text-gray-500 mt-1">
                        <Shield className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        Encrypted and HIPAA protected. Used for insurance verification.
                      </div>
                      {errors.ssn && (
                        <div id="ssn-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.ssn}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Marital Status
                      </label>
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                        className="input-hc focus-hc"
                      >
                        <option value="">Select status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="domestic-partnership">Domestic Partnership</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Contact Information */}
                <fieldset className="mb-8">
                  <legend className="text-lg font-semibold text-gray-900 mb-4">Contact Information</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className={`input-hc ${errors.phone ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                        required
                        autoComplete="tel"
                      />
                      <div id="phone-help" className="text-xs text-gray-500 mt-1">
                        Primary contact for appointments and important communications
                      </div>
                      {errors.phone && (
                        <div id="phone-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="patient@email.com"
                        className={`input-hc ${errors.email ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : 'email-help'}
                        autoComplete="email"
                      />
                      <div id="email-help" className="text-xs text-gray-500 mt-1">
                        Optional. Used for appointment reminders and test results
                      </div>
                      {errors.email && (
                        <div id="email-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="address" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="123 Main Street"
                        className={`input-hc ${errors.address ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                        required
                        autoComplete="street-address"
                      />
                      {errors.address && (
                        <div id="address-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        className={`input-hc ${errors.city ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                        required
                        autoComplete="address-level2"
                      />
                      {errors.city && (
                        <div id="city-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.city}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`input-hc focus-hc ${errors.state ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.state}
                        aria-describedby={errors.state ? 'state-error' : undefined}
                        required
                        autoComplete="address-level1"
                      >
                        <option value="">Select state</option>
                        <option value="AL">Alabama</option>
                        <option value="CA">California</option>
                        <option value="FL">Florida</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                      </select>
                      {errors.state && (
                        <div id="state-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.state}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="12345"
                        className={`input-hc ${errors.zipCode ? 'input-hc-error' : ''}`}
                        aria-invalid={!!errors.zipCode}
                        aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                        required
                        autoComplete="postal-code"
                        maxLength={10}
                      />
                      {errors.zipCode && (
                        <div id="zipCode-error" className="error-message" role="alert">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.zipCode}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Emergency Contact */}
                <fieldset className="mb-8">
                  <legend className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</legend>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="emergencyContactName" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Contact Name
                      </label>
                      <Input
                        id="emergencyContactName"
                        name="emergencyContactName"
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="Full name"
                        className="input-hc"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergencyContactRelationship" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <select
                        id="emergencyContactRelationship"
                        name="emergencyContactRelationship"
                        value={formData.emergencyContactRelationship}
                        onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                        className="input-hc focus-hc"
                        required
                      >
                        <option value="">Select relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                        <option value="sibling">Sibling</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="emergencyContactPhone" className="required-field block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="input-hc"
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Consent Section */}
                <fieldset className="mb-8 p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                  <legend className="text-lg font-semibold text-gray-900 mb-4 px-2">Treatment Consent</legend>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="focus-hc w-5 h-5 text-blue-600 border-2 border-blue-300 rounded mt-0.5"
                        aria-describedby="consent-description"
                        required
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          I consent to treatment and acknowledge the following:
                        </span>
                        <ul id="consent-description" className="text-sm text-gray-700 mt-2 ml-4 list-disc space-y-1">
                          <li>I have the right to make decisions about my healthcare</li>
                          <li>I understand the risks and benefits of proposed treatments</li>
                          <li>I consent to the release of medical information for treatment, payment, and operations</li>
                          <li>I understand that this facility follows HIPAA privacy regulations</li>
                        </ul>
                      </div>
                    </label>
                    {errors.consent && (
                      <div className="error-message" role="alert">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        {errors.consent}
                      </div>
                    )}
                  </div>
                </fieldset>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <Shield className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    All data is encrypted and HIPAA compliant
                  </div>
                  <div className="space-x-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="focus-hc"
                      disabled={isSubmitting}
                    >
                      Save Draft
                    </Button>
                    <Button 
                      type="submit" 
                      className="button-hc-primary"
                      disabled={isSubmitting || !privacyNoticeAcknowledged || !consentGiven}
                      aria-describedby="submit-help"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                          Register Patient
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div id="submit-help" className="text-xs text-gray-500 mt-2 text-right">
                  Registration creates a new patient record and medical record number
                </div>

                {errors.submit && (
                  <Alert className="mt-4 border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800" role="alert">
                      {errors.submit}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with help information */}
        <div className="col-span-4">
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Registration Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-gray-900">HIPAA Compliant</h4>
                    <p className="text-sm text-gray-600">All information is encrypted and protected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-gray-900">Required Fields</h4>
                    <p className="text-sm text-gray-600">Fields marked with * are required for registration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-violet-600 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-gray-900">Need Help?</h4>
                    <p className="text-sm text-gray-600">Contact registration desk at (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start focus-hc" disabled>
                <User className="w-4 h-4 mr-2" aria-hidden="true" />
                Search Existing Patient
              </Button>
              <Button variant="outline" className="w-full justify-start focus-hc" disabled>
                <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start focus-hc" disabled>
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Insurance Verification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
