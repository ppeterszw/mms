import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  Users,
  Building2,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreVertical,
  X,
  FileText,
  Star,
  TrendingUp,
  Target,
  User,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

// Mock CPD events data
const cpdEvents = [
  {
    id: 1,
    title: 'Real Estate Law & Ethics Workshop',
    description: 'Understanding legal requirements and ethical practices in real estate',
    date: '2024-02-15',
    duration: 4,
    type: 'workshop',
    status: 'completed',
    attendees: 45,
    maxAttendees: 60,
    provider: 'Estate Agents Council',
    accreditationNumber: 'CPD-2024-001',
    category: 'Legal & Ethics'
  },
  {
    id: 2,
    title: 'Property Valuation Techniques Seminar',
    description: 'Advanced methods for accurate property valuation',
    date: '2024-02-18',
    duration: 3,
    type: 'seminar',
    status: 'upcoming',
    attendees: 28,
    maxAttendees: 40,
    provider: 'Valuation Institute',
    accreditationNumber: 'CPD-2024-002',
    category: 'Technical Skills'
  },
  {
    id: 3,
    title: 'Customer Service Excellence',
    description: 'Enhancing client relationships and service delivery',
    date: '2024-03-05',
    duration: 2,
    type: 'webinar',
    status: 'upcoming',
    attendees: 67,
    maxAttendees: 100,
    provider: 'Professional Development Ltd',
    accreditationNumber: 'CPD-2024-003',
    category: 'Professional Skills'
  }
];

// Mock member CPD progress data
const memberCPDProgress = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    organizationName: 'Premier Real Estate Firm',
    memberType: 'real_estate_agent',
    currentYearHours: 18.5,
    totalHours: 45.5,
    targetHours: 40,
    complianceStatus: 'on-track',
    lastActivity: '2024-02-05',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.negotiator@premierrealestate.com',
    organizationName: 'Premier Real Estate Firm',
    memberType: 'property_negotiator',
    currentYearHours: 12.0,
    totalHours: 12.0,
    targetHours: 40,
    complianceStatus: 'behind',
    lastActivity: '2024-01-25',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'David Wilson',
    email: 'david.principal@premierrealestate.com',
    organizationName: 'Premier Real Estate Firm',
    memberType: 'principal_real_estate_agent',
    currentYearHours: 42.0,
    totalHours: 98.5,
    targetHours: 40,
    complianceStatus: 'compliant',
    lastActivity: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    email: 'maria.manager@coastalproperties.com',
    organizationName: 'Coastal Properties Group',
    memberType: 'property_manager',
    currentYearHours: 22.0,
    totalHours: 22.0,
    targetHours: 40,
    complianceStatus: 'on-track',
    lastActivity: '2024-01-30',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

const cpdStats = [
  {
    name: 'Total CPD Events',
    value: '24',
    change: '+3',
    changeType: 'increase',
    icon: Calendar,
    color: 'blue'
  },
  {
    name: 'Active Participants',
    value: '1,156',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'green'
  },
  {
    name: 'Compliance Rate',
    value: '87%',
    change: '+5%',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'purple'
  },
  {
    name: 'Total CPD Hours',
    value: '4,680',
    change: '+18%',
    changeType: 'increase',
    icon: Clock,
    color: 'orange'
  }
];

export default function AdminCPDManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { user } = useAuth();

  const filteredEvents = cpdEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredMembers = memberCPDProgress.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.organizationName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'on-track':
        return 'bg-blue-100 text-blue-800';
      case 'behind':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle size={12} className="mr-1" />;
      case 'on-track':
        return <Clock size={12} className="mr-1" />;
      case 'behind':
        return <AlertCircle size={12} className="mr-1" />;
      default:
        return null;
    }
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
      'title',
      'description',
      'date',
      'duration',
      'type',
      'maxAttendees',
      'provider',
      'category',
      'accreditationNumber'
    ];
    
    const csvContent = headers.join(',') + '\n' +
      'Real Estate Law Workshop,Understanding legal requirements and ethical practices,2024-03-15,4,workshop,60,Estate Agents Council,Legal & Ethics,CPD-2024-004\n' +
      'Property Investment Seminar,Advanced investment strategies and market analysis,2024-03-20,3,seminar,40,Investment Institute,Technical Skills,CPD-2024-005';
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cpd_events_template.csv';
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
      successful: Math.floor(Math.random() * 15) + 5,
      failed: Math.floor(Math.random() * 3),
      errors: [
        'Row 3: Invalid date format - use YYYY-MM-DD',
        'Row 7: Duration must be a number between 1-8 hours',
        'Row 12: Event type must be workshop, seminar, or webinar'
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

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'events', name: 'CPD Events', icon: Calendar },
    { id: 'members', name: 'Member Progress', icon: Users },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CPD Management</h1>
          <p className="text-gray-600">Manage Continuing Professional Development programs and member compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} className="mr-2" />
            Add CPD Event
          </button>
          <button 
            onClick={() => setShowBulkUploadModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload size={16} className="mr-2" />
            Bulk Add Events
          </button>
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cpdStats.map((stat) => {
                  const Icon = stat.icon;
                  const isIncrease = stat.changeType === 'increase';
                  
                  return (
                    <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                          <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                        </div>
                        <div className={`flex items-center text-sm font-medium ${
                          isIncrease ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp size={16} className="mr-1" />
                          {stat.change}
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('events')}
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-blue-900">Schedule Event</span>
                  </button>
                  <button 
                    onClick={() => alert('Certificate issuance feature - would open certificate management interface')}
                    className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Award className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-900">Issue Certificates</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('reports')}
                    className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <FileText className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-900">Generate Reports</span>
                  </button>
                  <button 
                    onClick={() => setShowBulkUploadModal(true)}
                    className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-orange-900">Bulk Import</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent CPD Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-green-100">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Real Estate Law Workshop completed</p>
                      <p className="text-sm text-gray-600">45 members earned 4 CPD hours • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New CPD event scheduled</p>
                      <p className="text-sm text-gray-600">Property Valuation Seminar • March 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Award size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Certificates issued</p>
                      <p className="text-sm text-gray-600">67 CPD certificates generated and sent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search CPD events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Legal & Ethics">Legal & Ethics</option>
                    <option value="Technical Skills">Technical Skills</option>
                    <option value="Professional Skills">Professional Skills</option>
                  </select>
                </div>
              </div>

              {/* Events Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Provider
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg mr-3 ${
                                event.type === 'workshop' ? 'bg-blue-50' :
                                event.type === 'seminar' ? 'bg-green-50' :
                                'bg-purple-50'
                              }`}>
                                <GraduationCap className={`h-5 w-5 ${
                                  event.type === 'workshop' ? 'text-blue-600' :
                                  event.type === 'seminar' ? 'text-green-600' :
                                  'text-purple-600'
                                }`} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                <div className="text-sm text-gray-500">{event.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <div>{format(new Date(event.date), 'MMM d, yyyy')}</div>
                              <div className="text-gray-500">{event.duration} hours</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <div className="font-medium">{event.attendees}/{event.maxAttendees}</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.provider}</div>
                            <div className="text-sm text-gray-500">{event.accreditationNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              event.status === 'completed' ? 'bg-green-100 text-green-800' :
                              event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {event.status === 'completed' && <CheckCircle size={10} className="mr-1" />}
                              {event.status === 'upcoming' && <Clock size={10} className="mr-1" />}
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                                <Eye size={16} />
                              </button>
                              <button className="text-blue-600 hover:text-blue-700 transition-colors">
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
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Members Progress Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPD Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Compliance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500 capitalize">
                                  {member.memberType.replace('_', ' ')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.organizationName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <div className="font-medium">{member.currentYearHours}h / {member.targetHours}h</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    member.complianceStatus === 'compliant' ? 'bg-green-500' :
                                    member.complianceStatus === 'on-track' ? 'bg-blue-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ 
                                    width: `${Math.min((member.currentYearHours / member.targetHours) * 100, 100)}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(member.complianceStatus)}`}>
                              {getComplianceIcon(member.complianceStatus)}
                              {member.complianceStatus === 'compliant' ? 'Compliant' :
                               member.complianceStatus === 'on-track' ? 'On Track' :
                               'Behind'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(member.lastActivity), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                                View Progress
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
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">CPD Reports</h3>
                <p className="text-gray-600 mb-6">Generate comprehensive reports on CPD activities and member compliance</p>
                <div className="flex justify-center space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Generate Compliance Report
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export Member Progress
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
                  <h2 className="text-xl font-bold text-gray-900">Bulk Add CPD Events</h2>
                  <p className="text-gray-600">Upload multiple CPD events using CSV file</p>
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
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">Upload Instructions</h3>
                    <div className="text-sm text-blue-700 mt-1 space-y-1">
                      <p>1. Download the CSV template for CPD event data</p>
                      <p>2. Fill in the event information in the template</p>
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
                    <p className="text-sm text-gray-600">Download the template for CPD event data</p>
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
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Required Fields</h4>
                    <div className="text-sm text-yellow-700 mt-1">
                      <p><strong>Required:</strong> title, description, date, duration, type, maxAttendees, provider, category</p>
                      <p className="mt-1"><strong>Optional:</strong> accreditationNumber</p>
                      <p className="mt-1"><strong>Date Format:</strong> YYYY-MM-DD (e.g., 2024-03-15)</p>
                      <p className="mt-1"><strong>Event Types:</strong> workshop, seminar, webinar</p>
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
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
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
                    Upload CPD Events
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