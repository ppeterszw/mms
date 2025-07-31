import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Camera,
  Bell,
  Shield,
  CreditCard,
  Settings,
  Star,
  Award,
  Clock,
  Building2,
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const activityHistory = [
  {
    id: 1,
    type: 'event',
    title: 'Attended Monthly Networking Mixer',
    date: '2024-02-10',
    icon: Calendar
  },
  {
    id: 2,
    type: 'membership',
    title: 'Upgraded to Premium membership',
    date: '2024-01-15',
    icon: Star
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Earned Community Contributor badge',
    date: '2024-01-08',
    icon: Award
  },
  {
    id: 4,
    type: 'event',
    title: 'RSVP for Tech Innovation Summit',
    date: '2024-01-20',
    icon: Calendar
  }
];

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);
  const [documents, setDocuments] = useState({
    educationalQualifications: [
      { id: 1, name: 'O-Level Certificate.pdf', type: 'educational', uploadDate: '2024-01-15', status: 'approved', size: '2.4 MB' },
      { id: 2, name: 'A-Level Certificate.pdf', type: 'educational', uploadDate: '2024-01-15', status: 'approved', size: '1.8 MB' }
    ],
    proofOfIdentity: [
      { id: 3, name: 'National ID.pdf', type: 'identity', uploadDate: '2024-01-15', status: 'approved', size: '1.2 MB' }
    ],
    birthCertificate: [
      { id: 4, name: 'Birth Certificate.pdf', type: 'birth', uploadDate: '2024-01-15', status: 'approved', size: '0.9 MB' }
    ],
    additionalDocuments: [
      { id: 5, name: 'Professional Reference.pdf', type: 'additional', uploadDate: '2024-01-20', status: 'pending', size: '1.5 MB' }
    ]
  });

  if (!user) return null;

  const handleFileUpload = async (documentType: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setUploadingDocument(documentType);
    
    // Simulate file upload
    setTimeout(() => {
      const newDocument = {
        id: Date.now(),
        name: files[0].name,
        type: documentType,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setDocuments(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType as keyof typeof prev] || []), newDocument]
      }));
      
      setUploadingDocument(null);
    }, 2000);
  };
  
  const handleDeleteDocument = (documentType: string, documentId: number) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: prev[documentType as keyof typeof prev].filter(doc => doc.id !== documentId)
    }));
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={12} className="mr-1" />;
      case 'pending':
        return <Clock size={12} className="mr-1" />;
      case 'rejected':
        return <AlertCircle size={12} className="mr-1" />;
      default:
        return null;
    }
  };
  
  const requiredDocuments = [
    {
      key: 'educationalQualifications',
      title: 'Educational Qualifications',
      description: 'O-Level and A-Level certificates or equivalent qualifications',
      required: true,
      multiple: true
    },
    {
      key: 'proofOfIdentity',
      title: 'Proof of Identity',
      description: 'National ID, Passport, or other government-issued identification',
      required: true,
      multiple: false
    },
    {
      key: 'birthCertificate',
      title: 'Birth Certificate',
      description: 'Certified copy of birth certificate',
      required: true,
      multiple: false
    },
    {
      key: 'additionalDocuments',
      title: 'Additional Documents',
      description: 'Professional references, work experience certificates, etc.',
      required: false,
      multiple: true
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'activity', name: 'Activity', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover border-4 border-white/20"
            />
            <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-blue-100">{user.email}</p>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.membershipTier === 'elite' ? 'bg-purple-500/20 text-purple-100' :
                user.membershipTier === 'premium' ? 'bg-blue-500/20 text-blue-100' :
                'bg-gray-500/20 text-gray-100'
              }`}>
                {user.membershipTier === 'elite' && <Star size={14} className="mr-1" />}
                {user.membershipTier} Member
              </span>
              <span className="ml-3 text-blue-200 text-sm">
                Joined {format(new Date(user.joinDate), 'MMMM yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Certificate Download Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Certificate of Registration</h3>
                      <p className="text-sm text-gray-600">Download your official membership certificate - Available upon registration approval</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('/certificate', '_blank')}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      user.registrationStatus === 'approved' 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={user.registrationStatus !== 'approved'}
                  >
                    <Download size={16} className="mr-2" />
                    {user.registrationStatus === 'approved' ? 'Download Certificate' : 'Pending Approval'}
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Registration No:</span>
                    <p className="font-medium text-gray-900">{user.registrationNumber || 'Pending'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Member Type:</span>
                    <p className="font-medium text-gray-900 capitalize">{user.memberType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Registered:</span>
                    <p className="font-medium text-gray-900">
                      {user.registrationStatus === 'approved' 
                        ? format(new Date(user.joinDate), 'MMM d, yyyy')
                        : 'Pending Approval'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Expires:</span>
                    <p className="font-medium text-gray-900">
                      {user.registrationStatus === 'approved' 
                        ? format(new Date(new Date(user.joinDate).getFullYear() + 1, new Date(user.joinDate).getMonth(), new Date(user.joinDate).getDate()), 'MMM d, yyyy')
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
                
                {/* Registration Status */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Registration Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      user.registrationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.registrationStatus === 'approved' && <CheckCircle size={12} className="mr-1" />}
                      {user.registrationStatus === 'pending' && <Clock size={12} className="mr-1" />}
                      {user.registrationStatus === 'rejected' && <AlertCircle size={12} className="mr-1" />}
                      {user.registrationStatus.charAt(0).toUpperCase() + user.registrationStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Edit size={16} className="mr-1" />
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <User size={18} className="text-gray-400" />
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                  )}
                </div>

                {user.memberType === 'individual' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={user.organizationName || 'TechCorp Solutions'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <Building2 size={18} className="text-gray-400" />
                          <span className="text-gray-900">{user.organizationName || 'TechCorp Solutions'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue="Senior Developer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <User size={18} className="text-gray-400" />
                          <span className="text-gray-900">Senior Developer</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Phone size={18} className="text-gray-400" />
                      <span className="text-gray-900">+1 (555) 123-4567</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue="New York, NY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin size={18} className="text-gray-400" />
                      <span className="text-gray-900">New York, NY</span>
                    </div>
                  )}
                </div>
              </div>

              {user.memberType === 'individual' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Educational Level</label>
                  {isEditing ? (
                    <select
                      defaultValue={user.educationalQualifications?.level || 'O-Level'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="O-Level">O-Level</option>
                      <option value="A-Level">A-Level</option>
                      <option value="Bachelors Degree">Bachelors Degree</option>
                      <option value="HND">HND (Higher National Diploma)</option>
                      <option value="Masters">Masters Degree</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <GraduationCap size={18} className="text-gray-400" />
                      <span className="text-gray-900">{user.educationalQualifications?.level || 'A-Level'}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    defaultValue="Passionate about technology and community building. Love connecting with like-minded professionals and sharing knowledge."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">
                      Passionate about technology and community building. Love connecting with like-minded professionals and sharing knowledge.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'documents' && user.memberType === 'individual' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Required Documents</h2>
                <div className="text-sm text-gray-600">
                  <span className="text-green-600 font-medium">
                    {Object.values(documents).flat().filter(doc => doc.status === 'approved').length}
                  </span>
                  {' / '}
                  <span className="font-medium">
                    {Object.values(documents).flat().length}
                  </span>
                  {' documents approved'}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Document Requirements</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      All individual members must upload certified copies of required documents for membership approval.
                      Documents should be clear, legible, and in PDF format.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {requiredDocuments.map((docType) => (
                  <div key={docType.key} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          {docType.title}
                          {docType.required && (
                            <span className="ml-2 text-red-500 text-sm">*</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{docType.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          id={`upload-${docType.key}`}
                          multiple={docType.multiple}
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(docType.key, e.target.files)}
                          className="hidden"
                          disabled={uploadingDocument === docType.key}
                        />
                        <label
                          htmlFor={`upload-${docType.key}`}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                            uploadingDocument === docType.key
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <Upload size={16} className="mr-2" />
                          {uploadingDocument === docType.key ? 'Uploading...' : 'Upload'}
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {documents[docType.key as keyof typeof documents]?.map((document) => (
                        <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText size={20} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{document.name}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                                <span>Size: {document.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                              {getStatusIcon(document.status)}
                              {document.status}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                              <Download size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteDocument(docType.key, document.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {(!documents[docType.key as keyof typeof documents] || documents[docType.key as keyof typeof documents].length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No documents uploaded yet</p>
                          <p className="text-xs mt-1">
                            {docType.required ? 'This document is required for membership approval' : 'Optional document'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && user.memberType === 'organization' && (
            <div className="text-center py-12">
              <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Organization Documents</h3>
              <p className="text-gray-600">Document management for organizations is handled separately.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive email updates about events and community news</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Privacy Settings</p>
                        <p className="text-sm text-gray-600">Make your profile visible to other members</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              
              <div className="space-y-4">
                {activityHistory.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'event' ? 'bg-blue-100' :
                        activity.type === 'membership' ? 'bg-purple-100' :
                        'bg-green-100'
                      }`}>
                        <Icon size={18} className={
                          activity.type === 'event' ? 'text-blue-600' :
                          activity.type === 'membership' ? 'text-purple-600' :
                          'text-green-600'
                        } />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{format(new Date(activity.date), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}