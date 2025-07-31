import React, { useState } from 'react';
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
  Edit
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const organizations = [
  {
    id: 1,
    name: 'Premier Real Estate Firm',
    email: 'contact@premierrealestate.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    firmRegistrationNumber: 'RE-ORG-2023-045',
    firmLicenseNumber: 'REL-2023-SF-045',
    principalAgentName: 'David Wilson',
    principalAgentId: 'RE-PRI-2024-001',
    organizationSize: '50-100 employees',
    industry: 'Real Estate',
    tier: 'elite',
    status: 'active',
    memberCount: 7,
    joinDate: '2023-11-20',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2024-11-30'
  },
  {
    id: 2,
    name: 'Coastal Properties Group',
    email: 'info@coastalproperties.com',
    phone: '+1 (555) 345-6789',
    location: 'Miami, FL',
    firmRegistrationNumber: 'RE-ORG-2023-078',
    firmLicenseNumber: 'REL-2023-MI-078',
    principalAgentName: 'Maria Rodriguez',
    principalAgentId: 'RE-PRI-2024-002',
    organizationSize: '25-50 employees',
    industry: 'Real Estate',
    tier: 'premium',
    status: 'active',
    memberCount: 3,
    joinDate: '2023-08-10',
    lastActive: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2024-08-31'
  },
  {
    id: 3,
    name: 'Metropolitan Real Estate',
    email: 'admin@metropolitanre.com',
    phone: '+1 (555) 456-7890',
    location: 'New York, NY',
    firmRegistrationNumber: 'RE-ORG-2024-012',
    firmLicenseNumber: 'Pending',
    principalAgentName: 'James Thompson',
    principalAgentId: 'Pending',
    organizationSize: '10-25 employees',
    industry: 'Real Estate',
    tier: 'premium',
    status: 'pending',
    memberCount: 0,
    joinDate: '2024-02-01',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150',
    annualSubscriptionPaid: false,
    subscriptionExpiryDate: null
  },
  {
    id: 4,
    name: 'Elite Properties Ltd',
    email: 'contact@eliteproperties.com',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
    firmRegistrationNumber: 'RE-ORG-2023-089',
    firmLicenseNumber: 'REL-2023-LA-089',
    principalAgentName: 'Sarah Mitchell',
    principalAgentId: 'RE-PRI-2023-003',
    organizationSize: '100+ employees',
    industry: 'Real Estate',
    tier: 'elite',
    status: 'active',
    memberCount: 12,
    joinDate: '2023-06-15',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    annualSubscriptionPaid: true,
    subscriptionExpiryDate: '2024-06-30'
  },
  {
    id: 5,
    name: 'Sunshine Real Estate',
    email: 'info@sunshineproperties.com',
    phone: '+1 (555) 678-9012',
    location: 'Phoenix, AZ',
    firmRegistrationNumber: 'RE-ORG-2023-156',
    firmLicenseNumber: 'REL-2023-PH-156',
    principalAgentName: 'Robert Davis',
    principalAgentId: 'RE-PRI-2023-004',
    organizationSize: '5-10 employees',
    industry: 'Real Estate',
    tier: 'basic',
    status: 'inactive',
    memberCount: 5,
    joinDate: '2023-09-22',
    lastActive: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    annualSubscriptionPaid: false,
    subscriptionExpiryDate: '2024-01-22'
  }
];

const quickActions = [
  {
    title: 'Review Applications',
    description: '3 organizations awaiting approval',
    icon: UserCheck,
    color: 'blue',
    count: 3,
    action: 'Review Applications'
  },
  {
    title: 'Renewal Reminders',
    description: '5 organizations expiring soon',
    icon: Calendar,
    color: 'orange',
    count: 5,
    action: 'Send Reminders'
  },
  {
    title: 'Generate Reports',
    description: 'Monthly organization reports',
    icon: FileText,
    color: 'purple',
    count: null,
    action: 'Generate Report'
  },
  {
    title: 'Billing Issues',
    description: '2 payment failures need attention',
    icon: CreditCard,
    color: 'red',
    count: 2,
    action: 'Resolve Issues'
  }
];

export default function OrganizationManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState<typeof organizations[0] | null>(null);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.principalAgentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || org.tier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || org.status === selectedStatus;
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleOrganizationClick = (organization: typeof organizations[0]) => {
    setSelectedOrganization(organization);
    setShowOrganizationModal(true);
  };

  const closeOrganizationModal = () => {
    setShowOrganizationModal(false);
    setSelectedOrganization(null);
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
      'organizationName',
      'email', 
      'phone',
      'location',
      'firmRegistrationNumber',
      'firmLicenseNumber',
      'principalAgentName',
      'principalAgentId',
      'organizationSize',
      'industry',
      'tier'
    ];
    
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organizations_template.csv';
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
      successful: Math.floor(Math.random() * 20) + 10,
      failed: Math.floor(Math.random() * 3),
      errors: [
        'Row 5: Invalid email format for contact@invalid-domain',
        'Row 12: Missing required field: principalAgentName',
        'Row 18: Organization size must be one of the predefined options'
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
          <h1 className="text-2xl font-bold text-gray-900">Organization Management</h1>
          <p className="text-gray-600">Manage registered real estate organizations and firms</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} className="mr-2" />
            Add Organization
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
                    setSelectedStatus('pending');
                    break;
                  case 'Send Reminders':
                    alert('Renewal reminders sent to organizations with expiring memberships');
                    break;
                  case 'Generate Report':
                    navigate('/admin/reports');
                    break;
                  case 'Resolve Issues':
                    navigate('/admin/billing');
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
                  <div className={`text-sm font-medium text-${action.color}-900 text-center`}>
                    {action.title}
                  </div>
                  <div className={`text-xs text-${action.color}-600 text-center mt-1`}>
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
                placeholder="Search organizations by name, email, or principal agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
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

      {/* Organizations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Principal Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrganizations.map((organization) => (
                <tr 
                  key={organization.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOrganizationClick(organization)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={organization.avatar}
                          alt={organization.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-blue-500">
                          <Building2 size={8} className="text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{organization.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {organization.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{organization.firmRegistrationNumber}</div>
                      <div className="text-gray-500">{organization.firmLicenseNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{organization.principalAgentName}</div>
                      <div className="text-gray-500">{organization.principalAgentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail size={12} className="mr-1 text-gray-400" />
                        {organization.email}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Phone size={12} className="mr-1 text-gray-400" />
                        {organization.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{organization.memberCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        organization.status === 'active' ? 'bg-green-100 text-green-800' :
                        organization.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {organization.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                        {organization.status === 'pending' && <Clock size={10} className="mr-1" />}
                        {organization.status === 'inactive' && <AlertCircle size={10} className="mr-1" />}
                        {organization.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        organization.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                        organization.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {organization.tier === 'elite' && <Star size={10} className="mr-1" />}
                        {organization.tier}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(organization.joinDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrganizationClick(organization);
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit organization functionality
                          alert(`Edit organization functionality for ${organization.name} - would open edit form`);
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit size={16} />
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

      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add new organizations.</p>
        </div>
      )}

      {/* Organization Details Modal */}
      {showOrganizationModal && selectedOrganization && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedOrganization.avatar}
                    alt={selectedOrganization.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-500">
                    <Building2 size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedOrganization.name}</h2>
                  <p className="text-gray-600">{selectedOrganization.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedOrganization.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                      selectedOrganization.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedOrganization.tier === 'elite' && <Star size={10} className="mr-1" />}
                      {selectedOrganization.tier} Organization
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedOrganization.status === 'active' ? 'bg-green-100 text-green-800' :
                      selectedOrganization.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrganization.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                      {selectedOrganization.status === 'pending' && <Clock size={10} className="mr-1" />}
                      {selectedOrganization.status === 'inactive' && <AlertCircle size={10} className="mr-1" />}
                      {selectedOrganization.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeOrganizationModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Building2 size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.industry}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Size</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.organizationSize}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.firmRegistrationNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.firmLicenseNumber}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-900">{format(new Date(selectedOrganization.joinDate), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Tier</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Star size={16} className="text-gray-400" />
                      <span className="text-gray-900 capitalize">{selectedOrganization.tier}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principal Agent Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Principal Agent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Principal Agent Name</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <UserCheck size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.principalAgentName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Principal Agent ID</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.principalAgentId}</span>
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
                      <span className="text-gray-900">{selectedOrganization.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-900">{selectedOrganization.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Total Members</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{selectedOrganization.memberCount}</p>
                    <p className="text-sm text-blue-700">Active members</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-900">Subscription</span>
                    </div>
                    <p className="text-lg font-bold text-green-900">
                      {selectedOrganization.annualSubscriptionPaid ? 'Paid' : 'Unpaid'}
                    </p>
                    <p className="text-sm text-green-700">
                      {selectedOrganization.subscriptionExpiryDate 
                        ? `Expires: ${format(new Date(selectedOrganization.subscriptionExpiryDate), 'MMM d, yyyy')}`
                        : 'No expiry date'
                      }
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-900">Last Active</span>
                    </div>
                    <p className="text-lg font-bold text-purple-900">
                      {format(new Date(selectedOrganization.lastActive), 'MMM d')}
                    </p>
                    <p className="text-sm text-purple-700">Recent activity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeOrganizationModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Organization
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
                  <h2 className="text-xl font-bold text-gray-900">Bulk Upload Organizations</h2>
                  <p className="text-gray-600">Upload multiple organizations using CSV file</p>
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
                      <p>1. Download the CSV template for organizations</p>
                      <p>2. Fill in the organization information in the template</p>
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
                    <p className="text-sm text-gray-600">Download the template for organization data</p>
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
                      <p>organizationName, email, phone, principalAgentName are required fields</p>
                      <p className="mt-1">Optional: firmRegistrationNumber, firmLicenseNumber, principalAgentId, organizationSize, industry, tier</p>
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
                    Upload Organizations
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