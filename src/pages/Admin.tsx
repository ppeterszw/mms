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
  MapPin,
  Star,
  Building2,
  GraduationCap,
  Target,
  Award,
  BookOpen,
  Bell,
  AlertCircle,
  Info,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle,
  UserCheck,
  CreditCard,
  User,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const stats = [
  {
    name: 'Total Members',
    value: '1,249',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Organizations',
    value: '342',
    change: '+18%',
    changeType: 'increase',
    icon: Building2,
    color: 'purple'
  },
  {
    name: 'Monthly Revenue',
    value: '$42,350',
    change: '+8.2%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'green'
  },
  {
    name: 'Member Retention',
    value: '94.5%',
    change: '-1.2%',
    changeType: 'decrease',
    icon: TrendingUp,
    color: 'orange'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'member_approval',
    title: 'New member approved',
    description: 'John Doe - Premium membership',
    time: '2 minutes ago',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment processed',
    description: 'Sarah Johnson - $250 annual fee',
    time: '15 minutes ago',
    icon: DollarSign,
    color: 'green'
  },
  {
    id: 3,
    type: 'event',
    title: 'Event published',
    description: 'Real Estate Law Workshop - March 15',
    time: '1 hour ago',
    icon: Calendar,
    color: 'blue'
  },
  {
    id: 4,
    type: 'alert',
    title: 'System maintenance',
    description: 'Scheduled maintenance completed',
    time: '2 hours ago',
    icon: Shield,
    color: 'gray'
  },
  {
    id: 5,
    type: 'organization',
    title: 'New organization registered',
    description: 'Premier Properties Ltd',
    time: '3 hours ago',
    icon: Building2,
    color: 'purple'
  }
];

const recentMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    memberType: 'individual',
    organizationName: 'TechCorp Solutions',
    jobTitle: 'Senior Developer',
    tier: 'premium',
    joinDate: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Premier Real Estate Firm',
    email: 'contact@premierrealestate.com',
    memberType: 'organization',
    industry: 'Real Estate',
    tier: 'elite',
    joinDate: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    memberType: 'individual',
    organizationName: 'Green Energy Partners',
    jobTitle: 'Marketing Manager',
    tier: 'basic',
    joinDate: '2024-02-10',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 4,
    name: 'Alex Chen',
    email: 'alex.chen@techcorp.com',
    memberType: 'individual',
    organizationName: 'TechCorp Solutions',
    jobTitle: 'CTO',
    tier: 'elite',
    joinDate: '2024-02-09',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 🏢
        </h1>
        <p className="text-blue-100">
          Administrative Control Panel - Manage your organization
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
              onClick={() => navigate('/admin/members')}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="relative">
                <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  23
                </span>
              </div>
              <span className="text-sm font-medium text-blue-900">Review Applications</span>
              <span className="text-xs text-blue-600">Pending approvals</span>
            </button>
            <button 
              onClick={() => navigate('/admin/members')}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="relative">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                  156
                </span>
              </div>
              <span className="text-sm font-medium text-green-900">Approve Members</span>
              <span className="text-xs text-green-600">Bulk approval</span>
            </button>
            <button 
              onClick={() => navigate('/admin/billing')}
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="relative">
                <CreditCard className="h-8 w-8 text-orange-600 mb-2" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  15
                </span>
              </div>
              <span className="text-sm font-medium text-orange-900">Payment Issues</span>
              <span className="text-xs text-orange-600">Failed payments</span>
            </button>
            <button 
              onClick={() => navigate('/admin/reports')}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Generate Report</span>
              <span className="text-xs text-purple-600">Member analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                See all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
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

        {/* Recent Members */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">New Members</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                See all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full ${
                      member.memberType === 'organization' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {member.memberType === 'organization' ? (
                        <Building2 size={8} className="text-white" />
                      ) : (
                        <User size={8} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {member.memberType === 'individual' && member.organizationName 
                        ? `${member.jobTitle} at ${member.organizationName}`
                        : member.memberType === 'organization' && member.industry
                        ? `${member.industry} • ${member.email}`
                        : member.email
                      }
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                      member.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.tier === 'elite' && <Star size={10} className="mr-1" />}
                      {member.tier}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(member.joinDate), 'MMM d')}
                    </p>
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