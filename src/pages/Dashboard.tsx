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
    name: 'Active Events',
    value: '23',
    change: '+18%',
    changeType: 'increase',
    icon: Calendar,
    color: 'green'
  },
  {
    name: 'Monthly Revenue',
    value: '$42,350',
    change: '+8.2%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'purple'
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
    type: 'member_joined',
    title: 'New member joined',
    description: 'Sarah Johnson joined as Premium member',
    time: '2 minutes ago',
    icon: UserCheck,
    color: 'green'
  },
  {
    id: 2,
    type: 'event_created',
    title: 'Event created',
    description: 'Tech Innovation Summit scheduled for March 15',
    time: '15 minutes ago',
    icon: Calendar,
    color: 'blue'
  },
  {
    id: 3,
    type: 'payment_received',
    title: 'Payment received',
    description: 'Monthly subscription payment from Alex Chen',
    time: '1 hour ago',
    icon: CreditCard,
    color: 'green'
  },
  {
    id: 4,
    type: 'achievement_earned',
    title: 'Achievement earned',
    description: 'Maria Rodriguez earned Community Contributor badge',
    time: '2 hours ago',
    icon: Award,
    color: 'purple'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Monthly Networking Mixer',
    date: '2024-02-20',
    time: '6:00 PM',
    attendees: 45,
    maxAttendees: 60
  },
  {
    id: 2,
    title: 'Tech Innovation Summit',
    date: '2024-03-15',
    time: '9:00 AM',
    attendees: 120,
    maxAttendees: 150
  },
  {
    id: 3,
    title: 'Professional Development Workshop',
    date: '2024-03-22',
    time: '2:00 PM',
    attendees: 28,
    maxAttendees: 40
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening in your community today.
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
              onClick={() => navigate('/events')}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Calendar className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Create Event</span>
            </button>
            <button 
              onClick={() => navigate('/members')}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Invite Members</span>
            </button>
            <button 
              onClick={() => navigate('/admin/reports')}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">View Reports</span>
            </button>
            <button 
              onClick={() => window.open('/certificate', '_blank')}
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Award className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Certificate</span>
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
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
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
                    <p className="text-xs text-gray-500">of {event.maxAttendees}</p>
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