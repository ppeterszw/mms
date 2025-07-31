import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Star,
  Building2,
  GraduationCap,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  UserCheck,
  CreditCard,
  FileText,
  Bell,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

// Mock data for organization members - in real app this would come from API
const getOrganizationMembers = (organizationId: string) => {
  const allMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'real_estate_agent',
      status: 'active',
      joinDate: '2024-01-15',
      cpdHours: {
        currentYear: 18.5,
        totalEarned: 45.5,
        annualTarget: 40,
        complianceStatus: 'on-track'
      }
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.negotiator@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'property_negotiator',
      status: 'active',
      joinDate: '2024-01-20',
      cpdHours: {
        currentYear: 12.0,
        totalEarned: 12.0,
        annualTarget: 40,
        complianceStatus: 'behind'
      }
    },
    {
      id: 3,
      name: 'David Wilson',
      email: 'david.principal@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'principal_real_estate_agent',
      status: 'active',
      joinDate: '2023-11-20',
      cpdHours: {
        currentYear: 42.0,
        totalEarned: 98.5,
        annualTarget: 40,
        complianceStatus: 'compliant'
      }
    },
    {
      id: 4,
      name: 'Jennifer Adams',
      email: 'jennifer@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'real_estate_agent',
      status: 'active',
      joinDate: '2024-02-01',
      cpdHours: {
        currentYear: 8.0,
        totalEarned: 8.0,
        annualTarget: 40,
        complianceStatus: 'behind'
      }
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'property_negotiator',
      status: 'active',
      joinDate: '2024-01-25',
      cpdHours: {
        currentYear: 25.5,
        totalEarned: 25.5,
        annualTarget: 40,
        complianceStatus: 'on-track'
      }
    },
    {
      id: 6,
      name: 'Lisa Chen',
      email: 'lisa@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'property_manager',
      status: 'active',
      joinDate: '2023-12-10',
      cpdHours: {
        currentYear: 35.0,
        totalEarned: 67.5,
        annualTarget: 40,
        complianceStatus: 'on-track'
      }
    },
    {
      id: 7,
      name: 'Robert Wilson',
      email: 'robert@premierrealestate.com',
      organizationId: '2',
      organizationName: 'Premier Real Estate Firm',
      realEstateMemberType: 'property_negotiator',
      status: 'pending',
      joinDate: '2024-02-10',
      cpdHours: {
        currentYear: 0,
        totalEarned: 0,
        annualTarget: 40,
        complianceStatus: 'not-started'
      }
    },
    // Members from other organizations (should not show in Premier Real Estate portal)
    {
      id: 8,
      name: 'Maria Rodriguez',
      email: 'maria@coastalproperties.com',
      organizationId: '4',
      organizationName: 'Coastal Properties Group',
      realEstateMemberType: 'property_manager',
      status: 'active',
      joinDate: '2024-01-05',
      cpdHours: {
        currentYear: 22.0,
        totalEarned: 22.0,
        annualTarget: 40,
        complianceStatus: 'on-track'
      }
    }
  ];
  
  return allMembers.filter(member => member.organizationId === organizationId);
};

const getOrganizationStats = (organizationId: string) => {
  const orgMembers = getOrganizationMembers(organizationId);
  const activeMembers = orgMembers.filter(m => m.status === 'active');
  const pendingMembers = orgMembers.filter(m => m.status === 'pending');
  
  // Calculate CPD compliance based on actual member data
  const cpdCompliantMembers = activeMembers.filter(m => m.cpdHours?.complianceStatus === 'compliant' || m.cpdHours?.complianceStatus === 'on-track').length;
  const cpdComplianceRate = activeMembers.length > 0 ? Math.round((cpdCompliantMembers / activeMembers.length) * 100) : 0;
  
  return [
  {
    name: 'Total Members',
    value: orgMembers.length.toString(),
    change: '+2',
    changeType: 'increase',
    icon: Users,
    color: 'blue',
    description: 'Active organization members'
  },
  {
    name: 'Pending Applications',
    value: pendingMembers.length.toString(),
    change: '+1',
    changeType: 'increase',
    icon: UserCheck,
    color: 'yellow',
    description: 'New member applications'
  },
  {
    name: 'CPD Compliance',
    value: `${cpdComplianceRate}%`,
    change: '+5%',
    changeType: 'increase',
    icon: GraduationCap,
    color: 'green',
    description: 'Members meeting CPD requirements'
  }
  ];
};

const getMembersByType = (organizationId: string) => {
  const orgMembers = getOrganizationMembers(organizationId);
  const activeMembers = orgMembers.filter(m => m.status === 'active');
  
  const agentCount = activeMembers.filter(m => m.realEstateMemberType === 'real_estate_agent').length;
  const negotiatorCount = activeMembers.filter(m => m.realEstateMemberType === 'property_negotiator').length;
  const managerCount = activeMembers.filter(m => m.realEstateMemberType === 'property_manager').length;
  const principalCount = activeMembers.filter(m => m.realEstateMemberType === 'principal_real_estate_agent').length;
  
  const total = activeMembers.length;
  
  return [
    { 
      type: 'Real Estate Agents', 
      count: agentCount, 
      percentage: total > 0 ? Math.round((agentCount / total) * 100) : 0, 
      color: 'blue' 
    },
    { 
      type: 'Property Negotiators', 
      count: negotiatorCount, 
      percentage: total > 0 ? Math.round((negotiatorCount / total) * 100) : 0, 
      color: 'green' 
    },
    { 
      type: 'Property Managers', 
      count: managerCount, 
      percentage: total > 0 ? Math.round((managerCount / total) * 100) : 0, 
      color: 'purple' 
    },
    { 
      type: 'Principal Agents', 
      count: principalCount, 
      percentage: total > 0 ? Math.round((principalCount / total) * 100) : 0, 
      color: 'orange' 
    }
  ];
};

const getRecentActivity = (organizationId: string) => {
  const orgMembers = getOrganizationMembers(organizationId);
  
  return [
  {
    id: 1,
    type: 'member_joined',
    title: 'New member approved',
    description: `${orgMembers.find(m => m.name === 'Jennifer Adams')?.name || 'Jennifer Adams'} joined as Real Estate Agent`,
    time: '2 hours ago',
    icon: UserCheck,
    color: 'green'
  },
  {
    id: 2,
    type: 'cpd_completed',
    title: 'CPD training completed',
    description: `${orgMembers.find(m => m.name === 'Michael Brown')?.name || 'Michael Brown'} completed Property Law workshop`,
    time: '4 hours ago',
    icon: Award,
    color: 'blue'
  },
  {
    id: 3,
    type: 'payment_received',
    title: 'Payment processed',
    description: 'Monthly subscription payment received',
    time: '1 day ago',
    icon: CreditCard,
    color: 'green'
  },
  {
    id: 4,
    type: 'application_pending',
    title: 'New application',
    description: `${orgMembers.find(m => m.name === 'Robert Wilson')?.name || 'Robert Wilson'} applied for Property Negotiator role`,
    time: '2 days ago',
    icon: Clock,
    color: 'yellow'
  }
  ];
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Monthly Team Meeting',
    date: '2024-02-20',
    time: '10:00 AM',
    attendees: 15,
    type: 'internal'
  },
  {
    id: 2,
    title: 'Property Law Update Seminar',
    date: '2024-02-25',
    time: '2:00 PM',
    attendees: 8,
    type: 'cpd'
  },
  {
    id: 3,
    title: 'New Member Orientation',
    date: '2024-03-01',
    time: '9:00 AM',
    attendees: 3,
    type: 'orientation'
  }
];

export default function OrganizationDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get organization-specific data
  const organizationId = user?.managedOrganizationId || user?.organizationId || '2';
  const organizationStats = getOrganizationStats(organizationId);
  const membersByType = getMembersByType(organizationId);
  const recentActivity = getRecentActivity(organizationId);
  const organizationMembers = getOrganizationMembers(organizationId);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 🏢
        </h1>
        <p className="text-blue-100">
          Managing {user?.managedOrganizationName || user?.organizationName} - {organizationMembers.length} members
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/organization/members')}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Review Applications</span>
              <span className="text-xs text-blue-600">5 pending</span>
            </button>
            <button 
              onClick={() => navigate('/organization/events')}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Calendar className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Schedule Event</span>
              <span className="text-xs text-green-600">Create new</span>
            </button>
            <button 
              onClick={() => navigate('/organization/reports')}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Generate Report</span>
              <span className="text-xs text-purple-600">Monthly</span>
            </button>
            <button 
              onClick={() => window.open('/certificate', '_blank')}
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Award className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Certificate</span>
              <span className="text-xs text-orange-600">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {organizationStats.map((stat) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === 'increase';
          
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  isIncrease ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isIncrease ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Members by Type Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Members by Type</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {membersByType.map((memberType) => (
                <div key={memberType.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 bg-${memberType.color}-500 rounded-full`}></div>
                    <span className="text-sm text-gray-700">{memberType.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${memberType.color}-500 h-2 rounded-full transition-all`}
                        style={{ width: `${memberType.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right min-w-[3rem]">
                      <span className="text-sm font-medium text-gray-900">{memberType.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({memberType.percentage}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-${activity.color}-100`}>
                      <Icon size={16} className={`text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Member CPD Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">CPD Management - Organization Members</h3>
              <span className="text-sm text-gray-500">{organizationMembers.filter(m => m.status === 'active').length} active members</span>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Organization CPD Overview</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Track and manage Continuing Professional Development hours for all organization members. 
                    Each member must complete 40 CPD hours annually to maintain their registration.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {organizationMembers.filter(m => m.status === 'active').map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-3 h-3 rounded-full ${
                      member.cpdHours?.complianceStatus === 'compliant' ? 'bg-green-500' :
                      member.cpdHours?.complianceStatus === 'on-track' ? 'bg-blue-500' :
                      member.cpdHours?.complianceStatus === 'behind' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="capitalize">{member.realEstateMemberType?.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>Reg: {member.id.toString().padStart(3, '0')}</span>
                        <span>•</span>
                        <span>Joined: {format(new Date(member.joinDate), 'MMM yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {member.cpdHours?.currentYear || 0}h / {member.cpdHours?.annualTarget || 40}h
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round(((member.cpdHours?.currentYear || 0) / (member.cpdHours?.annualTarget || 40)) * 100)}% complete
                      </p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            member.cpdHours?.complianceStatus === 'compliant' ? 'bg-green-500' :
                            member.cpdHours?.complianceStatus === 'on-track' ? 'bg-blue-500' :
                            member.cpdHours?.complianceStatus === 'behind' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}
                          style={{ 
                            width: `${Math.min(((member.cpdHours?.currentYear || 0) / (member.cpdHours?.annualTarget || 40)) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.cpdHours?.complianceStatus === 'compliant' ? 'bg-green-100 text-green-800' :
                      member.cpdHours?.complianceStatus === 'on-track' ? 'bg-blue-100 text-blue-800' :
                      member.cpdHours?.complianceStatus === 'behind' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.cpdHours?.complianceStatus === 'compliant' && <CheckCircle size={10} className="mr-1" />}
                      {member.cpdHours?.complianceStatus === 'on-track' && <Clock size={10} className="mr-1" />}
                      {member.cpdHours?.complianceStatus === 'behind' && <AlertCircle size={10} className="mr-1" />}
                      {member.cpdHours?.complianceStatus === 'compliant' ? 'Compliant' :
                       member.cpdHours?.complianceStatus === 'on-track' ? 'On Track' :
                       member.cpdHours?.complianceStatus === 'behind' ? 'Behind' :
                       'Not Started'}
                    </span>
                  </div>
                </div>
              ))}
              
              {organizationMembers.filter(m => m.status === 'active').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No active members found</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Organization CPD Summary:</span>
                  <span className="ml-2">
                    {organizationMembers.filter(m => m.status === 'active' && (m.cpdHours?.complianceStatus === 'compliant' || m.cpdHours?.complianceStatus === 'on-track')).length} of {organizationMembers.filter(m => m.status === 'active').length} members on track
                  </span>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  Generate CPD Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      event.type === 'cpd' ? 'bg-green-100' :
                      event.type === 'internal' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      {event.type === 'cpd' ? (
                        <GraduationCap className={`h-4 w-4 ${
                          event.type === 'cpd' ? 'text-green-600' :
                          event.type === 'internal' ? 'text-blue-600' :
                          'text-purple-600'
                        }`} />
                      ) : event.type === 'internal' ? (
                        <Users className="h-4 w-4 text-blue-600" />
                      ) : (
                        <UserCheck className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(event.date), 'MMM d, yyyy')} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{event.attendees}</p>
                    <p className="text-xs text-gray-500">attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}