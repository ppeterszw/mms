import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Building2,
  Calendar,
  GraduationCap,
  Award,
  Shield,
  CreditCard,
  Users,
  Eye,
  Download
} from 'lucide-react';

interface ApplicationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  
  // Member Type
  memberType: 'individual' | 'organization';
  
  // For Individual Members
  realEstateFirmId?: string;
  realEstateFirmName?: string;
  realEstateMemberType?: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager';
  
  // Educational Qualifications (Individual only)
  ordinaryLevelPasses?: number;
  hasEnglishAndMath?: boolean;
  advancedLevelPasses?: number;
  equivalentQualification?: string;
  age?: number;
  
  // For Organizations
  organizationName?: string;
  organizationSize?: string;
  firmRegistrationNumber?: string;
  firmLicenseNumber?: string;
  principalAgentName?: string;
  principalAgentId?: string;
  
  // Documents
  documents: {
    // Individual Documents
    educationalQualifications: File[];
    proofOfIdentity: File | null;
    birthCertificate: File | null;
    additionalDocuments: File[];
    
    // Organization Documents
    trustAccountConfirmation: File | null;
    annualReturnForms: File[];
    certificateOfIncorporation: File | null;
    cr6Form: File | null;
    cr11Forms: File[];
    taxClearanceCertificate: File | null;
    policeClearanceLetters: File[];
  };
}

const individualRequirements = [
  {
    id: 'educationalQualifications',
    title: 'Educational Qualifications',
    description: 'Certified copies of O-Level & A-Level certificates or equivalent qualifications',
    required: true,
    multiple: true
  },
  {
    id: 'proofOfIdentity',
    title: 'Proof of Identity',
    description: 'Certified copy of National ID or Passport',
    required: true,
    multiple: false
  },
  {
    id: 'birthCertificate',
    title: 'Birth Certificate',
    description: 'Certified copy of birth certificate',
    required: true,
    multiple: false
  }
];

const organizationRequirements = [
  {
    id: 'trustAccountConfirmation',
    title: 'Trust Account Confirmation',
    description: 'Letter of Trust Account confirmation from Commercial Bank',
    required: true,
    multiple: false
  },
  {
    id: 'annualReturnForms',
    title: 'Annual Return Forms',
    description: '3 Annual return forms (collected by Principal Registered Agent)',
    required: true,
    multiple: true
  },
  {
    id: 'certificateOfIncorporation',
    title: 'Certificate of Incorporation',
    description: 'Certificate of Incorporation or Partnership Agreement',
    required: true,
    multiple: false
  },
  {
    id: 'cr6Form',
    title: 'CR6 Form',
    description: 'CR6 Form proving Principal Agent is a Director',
    required: true,
    multiple: false
  },
  {
    id: 'cr11Forms',
    title: 'CR11 Forms',
    description: 'Certified copies of CR11 forms',
    required: true,
    multiple: true
  },
  {
    id: 'taxClearanceCertificate',
    title: 'Tax Clearance Certificate',
    description: 'Valid Tax Clearance Certificate',
    required: true,
    multiple: false
  },
  {
    id: 'policeClearanceLetters',
    title: 'Police Clearance Letters',
    description: 'Police Clearance Letters for all Directors',
    required: true,
    multiple: true
  }
];

const membershipBenefits = [
  {
    category: 'Professional Recognition',
    benefits: [
      'Official Certificate of Registration',
      'Professional membership credentials',
      'Industry recognition and credibility',
      'Access to professional networks'
    ]
  },
  {
    category: 'Education and Development',
    benefits: [
      'Continuing Professional Development (CPD) programs',
      'Industry workshops and seminars',
      'Professional training courses',
      'Access to educational resources and materials'
    ]
  },
  {
    category: 'Business Support',
    benefits: [
      'Business development resources',
      'Industry updates and market insights',
      'Networking opportunities',
      'Professional advisory services'
    ]
  }
];

export default function MemberApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    memberType: 'individual',
    ordinaryLevelPasses: 0,
    hasEnglishAndMath: false,
    advancedLevelPasses: 0,
    age: 0,
    realEstateMemberType: 'real_estate_agent',
    documents: {
      educationalQualifications: [],
      proofOfIdentity: null,
      birthCertificate: null,
      additionalDocuments: [],
      trustAccountConfirmation: null,
      annualReturnForms: [],
      certificateOfIncorporation: null,
      cr6Form: null,
      cr11Forms: [],
      taxClearanceCertificate: null,
      policeClearanceLetters: []
    }
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  const validateEducationalRequirements = () => {
    const errors: string[] = [];
    
    if (formData.memberType === 'individual') {
      // Check O-Level requirements
      if (!formData.ordinaryLevelPasses || formData.ordinaryLevelPasses < 5) {
        errors.push('Minimum 5 Ordinary Level passes required');
      }
      
      if (!formData.hasEnglishAndMath) {
        errors.push('English and Mathematics O-Level passes are mandatory');
      }
      
      // Check A-Level or age requirements
      const hasAdvancedLevel = formData.advancedLevelPasses && formData.advancedLevelPasses >= 2;
      const hasEquivalent = formData.equivalentQualification && formData.equivalentQualification.trim() !== '';
      const isMatureEntry = formData.age && formData.age >= 27;
      
      if (!hasAdvancedLevel && !hasEquivalent && !isMatureEntry) {
        errors.push('Must have either 2 A-Level passes, equivalent qualification, or be at least 27 years old for mature entry');
      }
    }
    
    return errors;
  };

  const validateOrganizationRequirements = () => {
    const errors: string[] = [];
    
    if (formData.memberType === 'organization') {
      if (!formData.principalAgentName) {
        errors.push('Principal Registered Estate Agent must be designated');
      }
      
      if (!formData.organizationName) {
        errors.push('Organization name is required');
      }
    }
    
    return errors;
  };

  const validateDocuments = () => {
    const errors: string[] = [];
    const requirements = formData.memberType === 'individual' ? individualRequirements : organizationRequirements;
    
    requirements.forEach(req => {
      const docKey = req.id as keyof ApplicationFormData['documents'];
      const doc = formData.documents[docKey];
      
      if (req.required) {
        if (req.multiple) {
          if (!Array.isArray(doc) || doc.length === 0) {
            errors.push(`${req.title} is required`);
          }
        } else {
          if (!doc) {
            errors.push(`${req.title} is required`);
          }
        }
      }
    });
    
    return errors;
  };

  const getRequirementStatus = () => {
    const requirements = formData.memberType === 'individual' ? individualRequirements : organizationRequirements;
    const completed = requirements.filter(req => {
      const docKey = req.id as keyof ApplicationFormData['documents'];
      const doc = formData.documents[docKey];
      
      if (req.multiple) {
        return Array.isArray(doc) && doc.length > 0;
      } else {
        return doc !== null;
      }
    });
    
    return {
      completed: completed.length,
      total: requirements.length,
      percentage: Math.round((completed.length / requirements.length) * 100)
    };
  };

  const handleFileUpload = (documentType: keyof ApplicationFormData['documents'], files: FileList | null) => {
    if (!files) return;
    
    const requirement = [...individualRequirements, ...organizationRequirements].find(req => req.id === documentType);
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: requirement?.multiple ? Array.from(files) : files[0]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const educationErrors = validateEducationalRequirements();
    const orgErrors = validateOrganizationRequirements();
    const docErrors = validateDocuments();
    const allErrors = [...educationErrors, ...orgErrors, ...docErrors];
    
    setValidationErrors(allErrors);
    
    if (allErrors.length === 0) {
      // Submit application
      console.log('Application submitted:', formData);
      // Handle successful submission
      alert('Application submitted successfully! You will receive a confirmation email shortly.');
    }
    
    setIsSubmitting(false);
  };

  const meetsRequirements = validateEducationalRequirements().length === 0 && 
                           validateOrganizationRequirements().length === 0;
  const requirementStatus = getRequirementStatus();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Real Estate Professional Membership Application</h1>
          <p className="text-gray-600 mt-2">Complete this form to apply for membership with the Estate Agents Council</p>
        </div>

        {/* Membership Benefits Section */}
        <div className="p-6 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Award className="mr-2 text-blue-600" />
              Membership Benefits
            </h2>
            <button
              type="button"
              onClick={() => setShowBenefits(!showBenefits)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {showBenefits ? 'Hide Benefits' : 'View Benefits'}
            </button>
          </div>
          
          {showBenefits && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipBenefits.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <CheckCircle size={14} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Member Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Membership Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  value="individual"
                  checked={formData.memberType === 'individual'}
                  onChange={(e) => setFormData(prev => ({ ...prev, memberType: e.target.value as 'individual' | 'organization' }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Individual Member</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  value="organization"
                  checked={formData.memberType === 'organization'}
                  onChange={(e) => setFormData(prev => ({ ...prev, memberType: e.target.value as 'individual' | 'organization' }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Estate Agency/Company/Firm</span>
              </label>
            </div>
          </div>

          {/* Personal/Organization Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.memberType === 'individual' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Real Estate Member Type</label>
                  <select
                    value={formData.realEstateMemberType || 'real_estate_agent'}
                    onChange={(e) => setFormData(prev => ({ ...prev, realEstateMemberType: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="real_estate_agent">Real Estate Agent</option>
                    <option value="property_negotiator">Property Negotiator</option>
                    <option value="principal_real_estate_agent">Principal Real Estate Agent</option>
                    <option value="property_manager">Property Manager</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Real Estate Firm Name</label>
                  <input
                    type="text"
                    value={formData.realEstateFirmName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, realEstateFirmName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the real estate firm you work for"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                  <input
                    type="text"
                    value={formData.organizationName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Principal Registered Estate Agent</label>
                  <input
                    type="text"
                    value={formData.principalAgentName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, principalAgentName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name of Principal Agent in charge of trust account"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Size</label>
                  <select
                    value={formData.organizationSize || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select organization size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-10">6-10 employees</option>
                    <option value="11-25">11-25 employees</option>
                    <option value="26-50">26-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Educational Requirements (Individual Only) */}
          {formData.memberType === 'individual' && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="mr-2 text-blue-600" />
                Educational Requirements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Ordinary Level Passes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.ordinaryLevelPasses || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ordinaryLevelPasses: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 5 passes required</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasEnglishAndMath}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasEnglishAndMath: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I have Ordinary Level passes in English and Mathematics
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advanced Level Passes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.advancedLevelPasses || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, advancedLevelPasses: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 2 passes OR equivalent qualification OR age 27+</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equivalent Qualification (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.equivalentQualification || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, equivalentQualification: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Diploma in Real Estate"
                  />
                </div>
              </div>

              {/* Requirements Status */}
              <div className="mt-4 p-3 rounded-lg border-l-4 border-l-blue-500 bg-white">
                <div className="flex items-center">
                  {meetsRequirements ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className={`font-medium ${meetsRequirements ? 'text-green-700' : 'text-red-700'}`}>
                    {meetsRequirements ? 'Educational requirements met' : 'Educational requirements not met'}
                  </span>
                </div>
                {validationErrors.length > 0 && (
                  <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                    {validationErrors.filter(error => 
                      error.includes('Level') || error.includes('English') || error.includes('Mathematics') || error.includes('qualification') || error.includes('age')
                    ).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Document Upload Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="mr-2 text-blue-600" />
                Required Documents
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${requirementStatus.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {requirementStatus.completed}/{requirementStatus.total} completed
                </span>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Requirements Checklist for {formData.memberType === 'individual' ? 'Individual' : 'Organization'} Members:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(formData.memberType === 'individual' ? individualRequirements : organizationRequirements).map((req) => {
                  const docKey = req.id as keyof ApplicationFormData['documents'];
                  const doc = formData.documents[docKey];
                  const isCompleted = req.multiple ? (Array.isArray(doc) && doc.length > 0) : (doc !== null);
                  
                  return (
                    <div key={req.id} className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full mt-0.5 ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {isCompleted ? (
                          <CheckCircle size={14} className="text-green-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isCompleted ? 'text-green-900' : 'text-gray-900'}`}>
                          {req.title}
                        </p>
                        <p className="text-xs text-gray-600">{req.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Upload Fields */}
            <div className="space-y-6">
              {(formData.memberType === 'individual' ? individualRequirements : organizationRequirements).map((req) => (
                <div key={req.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900 flex items-center">
                        {req.title}
                        {req.required && <span className="ml-2 text-red-500 text-sm">*</span>}
                      </h5>
                      <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                    </div>
                    <input
                      type="file"
                      id={`upload-${req.id}`}
                      multiple={req.multiple}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(req.id as keyof ApplicationFormData['documents'], e.target.files)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`upload-${req.id}`}
                      className="flex items-center px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <Upload size={16} className="mr-2" />
                      Upload
                    </label>
                  </div>
                  
                  {/* Show uploaded files */}
                  <div className="space-y-2">
                    {(() => {
                      const docKey = req.id as keyof ApplicationFormData['documents'];
                      const doc = formData.documents[docKey];
                      
                      if (req.multiple && Array.isArray(doc)) {
                        return doc.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                              <CheckCircle size={16} className="text-green-500" />
                            </div>
                          </div>
                        ));
                      } else if (!req.multiple && doc) {
                        const file = doc as File;
                        return (
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                              <CheckCircle size={16} className="text-green-500" />
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-center py-4 text-gray-500">
                            <FileText size={24} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No documents uploaded yet</p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <h4 className="font-medium text-red-900">Please address the following issues:</h4>
              </div>
              <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || requirementStatus.percentage < 100}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}