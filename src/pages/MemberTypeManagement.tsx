import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Users,
  Building2,
  Shield,
  Star,
  Settings,
  Eye,
  MoreVertical
} from 'lucide-react';
import { format } from 'date-fns';

interface MemberType {
  id: string;
  name: string;
  category: 'individual' | 'organization';
  description: string;
  requirements: string[];
  annualFee: number;
  benefits: string[];
  status: 'active' | 'inactive';
  memberCount: number;
  createdDate: string;
  lastModified: string;
}

const memberTypes: MemberType[] = [
  {
    id: '1',
    name: 'Real Estate Agent',
    category: 'individual',
    description: 'Licensed real estate professionals who facilitate property transactions',
    requirements: [
      'Minimum 5 O-Level passes including English and Mathematics',
      'Minimum 2 A-Level passes or equivalent qualification',
      'Age requirement: 18+ years',
      'Clean criminal record',
      'Professional reference letters'
    ],
    annualFee: 250,
    benefits: [
      'Professional certification',
      'Access to MLS system',
      'CPD training programs',
      'Legal support and guidance',
      'Networking opportunities'
    ],
    status: 'active',
    memberCount: 156,
    createdDate: '2023-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '2',
    name: 'Property Negotiator',
    category: 'individual',
    description: 'Professionals who negotiate property deals on behalf of clients',
    requirements: [
      'Minimum 5 O-Level passes including English and Mathematics',
      'Minimum 2 A-Level passes or equivalent qualification',
      'Age requirement: 18+ years',
      'Real estate training certification',
      'Professional reference letters'
    ],
    annualFee: 200,
    benefits: [
      'Professional certification',
      'Access to property databases',
      'CPD training programs',
      'Legal support and guidance',
      'Industry networking events'
    ],
    status: 'active',
    memberCount: 89,
    createdDate: '2023-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '3',
    name: 'Principal Real Estate Agent',
    category: 'individual',
    description: 'Senior agents responsible for managing real estate firms and trust accounts',
    requirements: [
      'Minimum 5 O-Level passes including English and Mathematics',
      'Minimum 2 A-Level passes or equivalent qualification',
      'Age requirement: 25+ years',
      'Minimum 3 years real estate experience',
      'Trust account management certification',
      'Clean criminal record',
      'Professional indemnity insurance'
    ],
    annualFee: 400,
    benefits: [
      'Professional certification',
      'Authority to manage trust accounts',
      'Firm registration privileges',
      'Advanced CPD programs',
      'Legal support and guidance',
      'Priority customer support'
    ],
    status: 'active',
    memberCount: 23,
    createdDate: '2023-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '4',
    name: 'Property Manager',
    category: 'individual',
    description: 'Professionals who manage rental properties and tenant relationships',
    requirements: [
      'Minimum 5 O-Level passes including English and Mathematics',
      'Minimum 2 A-Level passes or equivalent qualification',
      'Age requirement: 21+ years',
      'Property management certification',
      'Professional reference letters'
    ],
    annualFee: 300,
    benefits: [
      'Professional certification',
      'Access to property management tools',
      'CPD training programs',
      'Legal support for tenant issues',
      'Industry networking events'
    ],
    status: 'active',
    memberCount: 67,
    createdDate: '2023-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '5',
    name: 'Real Estate Firm',
    category: 'organization',
    description: 'Licensed real estate companies and agencies',
    requirements: [
      'Valid business registration certificate',
      'Designated Principal Real Estate Agent',
      'Trust account with commercial bank',
      'Professional indemnity insurance',
      'Tax clearance certificate',
      'Police clearance for all directors'
    ],
    annualFee: 800,
    benefits: [
      'Corporate membership certificate',
      'Firm listing in directory',
      'Bulk member registration',
      'Corporate training programs',
      'Priority support services'
    ],
    status: 'active',
    memberCount: 45,
    createdDate: '2023-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '6',
    name: 'Property Development Company',
    category: 'organization',
    description: 'Companies involved in property development and construction',
    requirements: [
      'Valid business registration certificate',
      'Construction industry license',
      'Environmental compliance certificates',
      'Professional indemnity insurance',
      'Tax clearance certificate',
      'Financial statements (last 3 years)'
    ],
    annualFee: 1200,
    benefits: [
      'Corporate membership certificate',
      'Development project listings',
      'Regulatory compliance support',
      'Industry networking events',
      'Priority consultation services'
    ],
    status: 'active',
    memberCount: 12,
    createdDate: '2023-06-01',
    lastModified: '2024-01-20'
  },
  {
    id: '7',
    name: 'Real Estate Appraiser',
    category: 'individual',
    description: 'Certified professionals who provide property valuations',
    requirements: [
      'Minimum 5 O-Level passes including English and Mathematics',
      'Degree in Real Estate, Surveying, or related field',
      'Age requirement: 23+ years',
      'Property valuation certification',
      'Professional reference letters',
      'Continuing education requirements'
    ],
    annualFee: 350,
    benefits: [
      'Professional certification',
      'Access to valuation databases',
      'Advanced CPD programs',
      'Legal support and guidance',
      'Professional networking events'
    ],
    status: 'inactive',
    memberCount: 0,
    createdDate: '2023-08-15',
    lastModified: '2023-12-10'
  }
];

export default function MemberTypeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMemberType, setSelectedMemberType] = useState<MemberType | null>(null);
  const [formData, setFormData] = useState<Partial<MemberType>>({
    name: '',
    category: 'individual',
    description: '',
    requirements: [''],
    annualFee: 0,
    benefits: [''],
    status: 'active'
  });

  const filteredMemberTypes = memberTypes.filter(type => {
    const matchesSearch = type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         type.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || type.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || type.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddMemberType = () => {
    setFormData({
      name: '',
      category: 'individual',
      description: '',
      requirements: [''],
      annualFee: 0,
      benefits: [''],
      status: 'active'
    });
    setShowAddModal(true);
  };

  const handleEditMemberType = (memberType: MemberType) => {
    setSelectedMemberType(memberType);
    setFormData(memberType);
    setShowEditModal(true);
  };

  const handleViewMemberType = (memberType: MemberType) => {
    setSelectedMemberType(memberType);
    setShowViewModal(true);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving member type:', formData);
    setShowAddModal(false);
    setShowEditModal(false);
    setFormData({
      name: '',
      category: 'individual',
      description: '',
      requirements: [''],
      annualFee: 0,
      benefits: [''],
      status: 'active'
    });
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), '']
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.map((req, i) => i === index ? value : req) || []
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...(prev.benefits || []), '']
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index) || []
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.map((benefit, i) => i === index ? value : benefit) || []
    }));
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedMemberType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Type Management</h1>
          <p className="text-gray-600">Manage membership categories and their requirements</p>
        </div>
        <button
          onClick={handleAddMemberType}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Member Type
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {memberTypes.filter(t => t.category === 'individual').length}
            </p>
            <p className="text-sm text-gray-600">Individual Types</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {memberTypes.filter(t => t.category === 'organization').length}
            </p>
            <p className="text-sm text-gray-600">Organization Types</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {memberTypes.filter(t => t.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active Types</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {memberTypes.reduce((sum, type) => sum + type.memberCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Members</p>
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
                placeholder="Search member types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Member Types Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMemberTypes.map((memberType) => (
                <tr key={memberType.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        memberType.category === 'individual' ? 'bg-blue-50' : 'bg-purple-50'
                      }`}>
                        {memberType.category === 'individual' ? (
                          <Users className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Building2 className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{memberType.name}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{memberType.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      memberType.category === 'individual' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {memberType.category === 'individual' ? (
                        <Users size={10} className="mr-1" />
                      ) : (
                        <Building2 size={10} className="mr-1" />
                      )}
                      {memberType.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${memberType.annualFee}</div>
                    <div className="text-sm text-gray-500">per year</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{memberType.memberCount}</span>
                      <span className="text-sm text-gray-500 ml-1">members</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      memberType.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {memberType.status === 'active' ? (
                        <CheckCircle size={10} className="mr-1" />
                      ) : (
                        <AlertCircle size={10} className="mr-1" />
                      )}
                      {memberType.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(memberType.lastModified), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewMemberType(memberType)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditMemberType(memberType)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
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

      {/* Add/Edit Member Type Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {showAddModal ? 'Add New Member Type' : 'Edit Member Type'}
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Type Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Real Estate Agent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category || 'individual'}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'individual' | 'organization' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Fee ($)</label>
                  <input
                    type="number"
                    value={formData.annualFee || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, annualFee: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="250"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of this member type..."
                />
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Requirements</label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Requirement
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements?.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter requirement..."
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Benefits</label>
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Benefit
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter benefit..."
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} className="mr-2" />
                {showAddModal ? 'Create Member Type' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Member Type Modal */}
      {showViewModal && selectedMemberType && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedMemberType.category === 'individual' ? 'bg-blue-50' : 'bg-purple-50'
                }`}>
                  {selectedMemberType.category === 'individual' ? (
                    <Users className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Building2 className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMemberType.name}</h2>
                  <p className="text-gray-600 capitalize">{selectedMemberType.category} Member Type</p>
                </div>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Fee</label>
                  <div className="text-2xl font-bold text-gray-900">${selectedMemberType.annualFee}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Members</label>
                  <div className="text-2xl font-bold text-gray-900">{selectedMemberType.memberCount}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedMemberType.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedMemberType.status === 'active' ? (
                      <CheckCircle size={14} className="mr-1" />
                    ) : (
                      <AlertCircle size={14} className="mr-1" />
                    )}
                    {selectedMemberType.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                  <div className="text-sm text-gray-900">
                    {format(new Date(selectedMemberType.lastModified), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMemberType.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Requirements</label>
                <ul className="space-y-2">
                  {selectedMemberType.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Benefits</label>
                <ul className="space-y-2">
                  {selectedMemberType.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Star size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditMemberType(selectedMemberType);
                }}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Edit Member Type
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}