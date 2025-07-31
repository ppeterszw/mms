import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  MoreVertical,
  Download,
  Building2,
  Users,
  X,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  FileText,
  CreditCard,
  Settings,
  Eye,
  Upload,
  AlertTriangle,
  Info,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    memberType: 'individual',
    realEstateMemberType: 'real_estate_agent',
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    jobTitle: 'Real Estate Agent',
    department: 'Sales',
    tier: 'premium',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Passionate about helping clients find their dream homes.',
    registrationNumber: 'RE-REA-2024-001',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2025-01-15',
    registrationStatus: 'approved',
    documents: {
      educationalQualifications: ['O-Level Certificate.pdf', 'A-Level Certificate.pdf'],
      proofOfIdentity: 'National ID.pdf',
      birthCertificate: 'Birth Certificate.pdf',
      additionalDocuments: []
    },
    educationalQualifications: {
      level: 'A-Level',
      ordinaryLevelPasses: 7,
      hasEnglishAndMath: true,
      advancedLevelPasses: 3,
      meetsRequirements: true
    },
    cpdHours: {
      currentYear: 18.5,
      totalEarned: 45.5,
      annualTarget: 40,
      activities: [
        {
          id: '1',
          eventId: 'evt-001',
          eventTitle: 'Real Estate Law Workshop',
          hoursEarned: 4,
          dateEarned: '2024-01-20',
          certificateUrl: '/certificates/cpd-001.pdf'
        },
        {
          id: '2',
          eventId: 'evt-002',
          eventTitle: 'Property Valuation Seminar',
          hoursEarned: 3,
          dateEarned: '2024-02-05',
          certificateUrl: '/certificates/cpd-002.pdf'
        }
      ]
    }
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.negotiator@premierrealestate.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    memberType: 'individual',
    realEstateMemberType: 'property_negotiator',
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    jobTitle: 'Property Negotiator',
    department: 'Negotiations',
    tier: 'basic',
    status: 'active',
    joinDate: '2024-01-20',
    lastActive: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Experienced negotiator specializing in commercial properties.',
    registrationNumber: 'RE-PN-2024-002',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2025-01-20',
    registrationStatus: 'approved',
    documents: {
      educationalQualifications: ['O-Level Certificate.pdf', 'HND Certificate.pdf'],
      proofOfIdentity: 'Passport.pdf',
      birthCertificate: 'Birth Certificate.pdf',
      additionalDocuments: ['Professional Reference.pdf']
    },
    educationalQualifications: {
      level: 'HND',
      ordinaryLevelPasses: 6,
      hasEnglishAndMath: true,
      equivalentQualification: 'Higher National Diploma in Business',
      meetsRequirements: true
    },
    cpdHours: {
      currentYear: 12.0,
      totalEarned: 12.0,
      annualTarget: 40,
      activities: [
        {
          id: '3',
          eventId: 'evt-003',
          eventTitle: 'Negotiation Skills Workshop',
          hoursEarned: 6,
          dateEarned: '2024-01-25',
          certificateUrl: '/certificates/cpd-003.pdf'
        }
      ]
    }
  },
  {
    id: 3,
    name: 'David Wilson',
    email: 'david.principal@premierrealestate.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    memberType: 'individual',
    realEstateMemberType: 'principal_real_estate_agent',
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    managedOrganizationId: '2',
    managedOrganizationName: 'Premier Real Estate Firm',
    jobTitle: 'Principal Real Estate Agent',
    department: 'Management',
    tier: 'elite',
    status: 'active',
    joinDate: '2023-11-20',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Principal agent with over 10 years of experience managing real estate operations.',
    registrationNumber: 'RE-PRI-2024-001',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2024-11-20',
    registrationStatus: 'approved',
    documents: {
      educationalQualifications: ['O-Level Certificate.pdf', 'A-Level Certificate.pdf', 'Degree Certificate.pdf'],
      proofOfIdentity: 'National ID.pdf',
      birthCertificate: 'Birth Certificate.pdf',
      additionalDocuments: ['Professional Reference.pdf', 'Experience Certificate.pdf']
    },
    educationalQualifications: {
      level: 'Bachelors Degree',
      ordinaryLevelPasses: 8,
      hasEnglishAndMath: true,
      advancedLevelPasses: 4,
      meetsRequirements: true
    },
    cpdHours: {
      currentYear: 42.0,
      totalEarned: 98.5,
      annualTarget: 40,
      activities: [
        {
          id: '4',
          eventId: 'evt-004',
          eventTitle: 'Leadership in Real Estate',
          hoursEarned: 8,
          dateEarned: '2024-01-15',
          certificateUrl: '/certificates/cpd-004.pdf'
        },
        {
          id: '5',
          eventId: 'evt-005',
          eventTitle: 'Trust Account Management',
          hoursEarned: 6,
          dateEarned: '2024-02-01',
          certificateUrl: '/certificates/cpd-005.pdf'
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    email: 'maria.manager@coastalproperties.com',
    phone: '+1 (555) 456-7890',
    location: 'Miami, FL',
    memberType: 'individual',
    realEstateMemberType: 'property_manager',
    organizationId: '4',
    organizationName: 'Coastal Properties Group',
    jobTitle: 'Property Manager',
    department: 'Property Management',
    tier: 'premium',
    status: 'active',
    joinDate: '2024-01-05',
    lastActive: '2024-02-10',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Dedicated property manager with expertise in residential and commercial properties.',
    registrationNumber: 'RE-PM-2024-003',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2025-01-05',
    registrationStatus: 'approved',
    documents: {
      educationalQualifications: ['O-Level Certificate.pdf', 'A-Level Certificate.pdf'],
      proofOfIdentity: 'National ID.pdf',
      birthCertificate: 'Birth Certificate.pdf',
      additionalDocuments: ['Property Management Certification.pdf']
    },
    educationalQualifications: {
      level: 'A-Level',
      ordinaryLevelPasses: 6,
      hasEnglishAndMath: true,
      advancedLevelPasses: 2,
      meetsRequirements: true
    },
    cpdHours: {
      currentYear: 22.0,
      totalEarned: 22.0,
      annualTarget: 40,
      activities: [
        {
          id: '6',
          eventId: 'evt-006',
          eventTitle: 'Property Management Best Practices',
          hoursEarned: 5,
          dateEarned: '2024-01-30',
          certificateUrl: '/certificates/cpd-006.pdf'
        }
      ]
    }
  },
  {
    id: 5,
    name: 'Emily Watson',
    email: 'emily@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    memberType: 'individual',
    realEstateMemberType: 'real_estate_agent',
    organizationId: '6',
    organizationName: 'Creative Design Studio',
    jobTitle: 'Real Estate Agent',
    department: 'Sales',
    tier: 'elite',
    status: 'pending',
    joinDate: '2024-02-01',
    lastActive: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'New agent specializing in luxury residential properties.',
    registrationNumber: 'RE-REA-2024-004',
    annualSubscriptionPaid: false,
    subscriptionExpiryDate: null,
    registrationStatus: 'pending',
    documents: {
      educationalQualifications: ['O-Level Certificate.pdf'],
      proofOfIdentity: 'Passport.pdf',
      birthCertificate: null,
      additionalDocuments: []
    },
    educationalQualifications: {
      level: 'O-Level',
      ordinaryLevelPasses: 5,
      hasEnglishAndMath: true,
      age: 28,
      meetsRequirements: true
    },
    cpdHours: {
      currentYear: 0,
      totalEarned: 0,
      annualTarget: 40,
      activities: []
    }
  }
];

const quickActions = [
  {
    title: 'Review Applications',
    description: '15 members awaiting approval',
    icon: UserCheck,
    color: 'blue',
    count: 15,
    action: 'Review Applications'
  },
  {
    title: 'Approve Members',
    description: 'Bulk approve qualified members',
    icon: CheckCircle,
    color: 'green',
    count: 8,
    action: 'Bulk Approve'
  },
  {
    title: 'Payment Issues',
    description: '3 payment failures need attention',
    icon: CreditCard,
    color: 'red',
    count: 3,
    action: 'Resolve Issues'
  },
  {
    title: 'Generate Reports',
    description: 'Member analytics and reports',
    icon: FileText,
    color: 'purple',
    count: null,
    action: 'Generate Report'
  }
];

export default function Members() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMemberType, setSelectedMemberType] = useState('all');
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { user } = useAuth();

  // Get the organization ID that the current user manages
  const managedOrganizationId = user?.managedOrganizationId || user?.organizationId;
  
  // Filter members based on organization and other criteria
  const filteredMembers = members.filter(member => {
    // If user is a Principal Real Estate Agent, only show members from their organization
    if (user?.realEstateMemberType === 'principal_real_estate_agent') {
      if (member.organizationId !== managedOrganizationId) {
        return false;
      }
    }
    
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.organizationName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || member.tier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    const matchesMemberType = selectedMemberType === 'all' || member.realEstateMemberType === selectedMemberType;
    
    return matchesSearch && matchesTier && matchesStatus && matchesMemberType;
  });

  const handleMemberClick = (member: typeof members[0]) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const closeMemberModal = () => {
    setShowMemberModal(false);
    setSelectedMember(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadResults(null);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      'name',
      'email', 
      'phone',
      'location',
      'memberType',
      'realEstateMemberType',
      'organizationName',
      'jobTitle',
      'tier',
      'registrationNumber'
    ];
    
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const processBulkUpload = async () => {
    if (!uploadFile) return;
    
    setIsUploading(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results
    const mockResults = {
      successful: Math.floor(Math.random() * 50) + 20,
      failed: Math.floor(Math.random() * 5),
      errors: [
        'Row 3: Invalid email format for john@invalid-domain',
        'Row 7: Missing required field: realEstateMemberType',
        'Row 12: Organization not found: ABC Properties Ltd'
      ]
    };
    
    setUploadResults(mockResults);
    setIsUploading(false);
  };

  const closeBulkUploadModal = () => {
    setShowBulkUploadModal(false);
    setUploadFile(null);
    setUploadResults(null);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600">
            {user?.realEstateMemberType === 'principal_real_estate_agent' 
              ? `Manage members of ${user.managedOrganizationName || user.organizationName}`
              : 'Manage individual members and their registrations'
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} className="mr-2" />
            Add Member
          </button>
          <button 
            onClick={() => setShowBulkUploadModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload size={16} className="mr-2" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const handleActionClick = () => {
                switch (action.action) {
                  case 'Review Applications':
                    // Filter to show only pending members
                    setSelectedStatus('pending');
                    break;
                  case 'Bulk Approve':
                    // Open bulk approval modal or navigate to approval page
                    alert('Bulk approval feature - would open approval interface');
                    break;
                  case 'Resolve Issues':
                    window.location.href = '/admin/billing';
                    break;
                  case 'Generate Report':
                    window.location.href = '/admin/reports';
                    break;
                  default:
                    break;
                }
              };
              
              return (
                <button
                  key={index}
                  onClick={handleActionClick}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="relative">
                    <Icon className={`h-8 w-8 text-${action.color}-600 mb-2`} />
                    {action.count && (
                      <span className={`absolute -top-2 -right-2 h-5 w-5 bg-${action.color}-600 text-white text-xs rounded-full flex items-center justify-center`}>
                        {action.count}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-medium text-${action.color}-900`}>
                    {action.title}
                  </div>
                  <div className={`text-xs text-${action.color}-600 mt-1`}>
                    {action.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search members by name, email, or organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMemberType}
              onChange={(e) => setSelectedMemberType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Member Types</option>
              <option value="real_estate_agent">Real Estate Agent</option>
              <option value="property_negotiator">Property Negotiator</option>
              <option value="principal_real_estate_agent">Principal Agent</option>
              <option value="property_manager">Property Manager</option>
            </select>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="elite">Elite</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPD Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr 
                  key={member.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-green-500">
                          <User size={8} className="text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500 capitalize">
                          {member.realEstateMemberType?.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{member.registrationNumber}</div>
                      <div className="text-gray-500">
                        {member.registrationStatus === 'approved' ? 'Approved' : 'Pending'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{member.organizationName}</div>
                      <div className="text-gray-500">{member.jobTitle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail size={12} className="mr-1 text-gray-400" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Phone size={12} className="mr-1 text-gray-400" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">
                        {member.cpdHours?.currentYear || 0}h / {member.cpdHours?.annualTarget || 40}h
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            (member.cpdHours?.currentYear || 0) >= (member.cpdHours?.annualTarget || 40) 
                              ? 'bg-green-500' 
                              : (member.cpdHours?.currentYear || 0) >= (member.cpdHours?.annualTarget || 40) * 0.5 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min(((member.cpdHours?.currentYear || 0) / (member.cpdHours?.annualTarget || 40)) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' :
                        member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {member.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                        {member.status === 'pending' && <Clock size={10} className="mr-1" />}
                        {member.status === 'inactive' && <AlertCircle size={10} className="mr-1" />}
                        {member.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        member.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                        member.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {member.tier === 'elite' && <Star size={10} className="mr-1" />}
                        {member.tier}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(member.joinDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMemberClick(member);
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit member functionality
                          alert(`Edit member functionality for ${member.name} - would open edit form`);
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add new members.</p>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500">
                    <User size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMember.name}</h2>
                  <p className="text-gray-600">{selectedMember.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMember.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                      selectedMember.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedMember.tier === 'elite' && <Star size={10} className="mr-1" />}
                      {selectedMember.tier} Member
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMember.status === 'active' ? 'bg-green-100 text-green-800' :
                      selectedMember.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedMember.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                      {selectedMember.status === 'pending' && <Clock size={10} className="mr-1" />}
                      {selectedMember.status === 'inactive' && <AlertCircle size={10} className="mr-1" />}
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeMemberModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Type</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-gray-900 capitalize">
                        {selectedMember.realEstateMemberType?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.registrationNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.organizationName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.jobTitle}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.department}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-900">{format(new Date(selectedMember.joinDate), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedMember.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CPD Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CPD Progress</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Annual CPD Hours</span>
                    <span className="text-sm text-gray-600">
                      {selectedMember.cpdHours?.currentYear || 0} / {selectedMember.cpdHours?.annualTarget || 40} hours
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        (selectedMember.cpdHours?.currentYear || 0) >= (selectedMember.cpdHours?.annualTarget || 40) 
                          ? 'bg-green-500' 
                          : (selectedMember.cpdHours?.currentYear || 0) >= (selectedMember.cpdHours?.annualTarget || 40) * 0.5 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(((selectedMember.cpdHours?.currentYear || 0) / (selectedMember.cpdHours?.annualTarget || 40)) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    Progress: {Math.round(((selectedMember.cpdHours?.currentYear || 0) / (selectedMember.cpdHours?.annualTarget || 40)) * 100)}% complete
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeMemberModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeMemberModal();
                  alert(`Edit member functionality for ${selectedMember.name} - would open edit form`);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Bulk Upload Members</h2>
                  <p className="text-gray-600">Upload multiple members using CSV file</p>
                </div>
              </div>
              <button
                onClick={closeBulkUploadModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Upload Instructions</h3>
                    <div className="text-sm text-blue-700 mt-1 space-y-1">
                      <p>1. Download the CSV template for member data</p>
                      <p>2. Fill in the member information in the template</p>
                      <p>3. Save the file and upload it using the form below</p>
                      <p>4. Review the upload results and fix any errors</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Download */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">CSV Template</h4>
                    <p className="text-sm text-gray-600">Download the template for member data</p>
                  </div>
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Download size={16} className="mr-2" />
                    Download Template
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CSV File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="bulk-upload-file"
                  />
                  <label htmlFor="bulk-upload-file" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">
                      {uploadFile ? uploadFile.name : 'Click to select CSV file or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">CSV files only</p>
                  </label>
                </div>
              </div>

              {/* Required Fields Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Required Fields</h4>
                    <div className="text-sm text-yellow-700 mt-1">
                      <p>name, email, phone, realEstateMemberType are required fields</p>
                      <p className="mt-1">Optional: location, organizationName, jobTitle, tier, registrationNumber</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Results */}
              {uploadResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <p className="font-medium text-green-900">Successful</p>
                          <p className="text-2xl font-bold text-green-900">{uploadResults.successful}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        <div>
                          <p className="font-medium text-red-900">Failed</p>
                          <p className="text-2xl font-bold text-red-900">{uploadResults.failed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {uploadResults.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">Errors Found:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {uploadResults.errors.map((error, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeBulkUploadModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processBulkUpload}
                disabled={!uploadFile || isUploading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload Members
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}