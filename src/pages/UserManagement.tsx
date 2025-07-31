import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Users,
  Shield,
  Settings,
  Eye,
  MoreVertical,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Key,
  Activity,
  Clock,
  Building2,
  Star,
  Download,
  Upload
} from 'lucide-react';
import { format } from 'date-fns';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'manager' | 'member';
  userType: 'system_admin' | 'organization_manager' | 'member_user';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  createdDate: string;
  permissions: string[];
  organizationId?: string;
  organizationName?: string;
  avatar: string;
  loginAttempts: number;
  isLocked: boolean;
  twoFactorEnabled: boolean;
  sessionCount: number;
}

interface UserType {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  defaultRole: 'admin' | 'manager' | 'member';
  canManageOrganizations: boolean;
  canManageMembers: boolean;
  canManageEvents: boolean;
  canManageBilling: boolean;
  canViewReports: boolean;
  canManageSystem: boolean;
  status: 'active' | 'inactive';
  userCount: number;
}

const userAccounts: UserAccount[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@example.com',
    phone: '+1 (555) 000-0001',
    role: 'admin',
    userType: 'system_admin',
    status: 'active',
    lastLogin: '2024-02-12T10:30:00Z',
    createdDate: '2023-01-01T00:00:00Z',
    permissions: ['manage_all_members', 'manage_all_events', 'manage_all_billing', 'system_settings', 'approve_organizations'],
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    loginAttempts: 0,
    isLocked: false,
    twoFactorEnabled: true,
    sessionCount: 2
  },
  {
    id: '2',
    name: 'David Wilson',
    email: 'david.principal@premierrealestate.com',
    phone: '+1 (555) 345-6789',
    role: 'manager',
    userType: 'organization_manager',
    status: 'active',
    lastLogin: '2024-02-12T09:15:00Z',
    createdDate: '2023-11-20T00:00:00Z',
    permissions: ['manage_own_organization_members', 'view_own_organization_reports', 'manage_own_organization_events'],
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    loginAttempts: 0,
    isLocked: false,
    twoFactorEnabled: false,
    sessionCount: 1
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.manager@coastalproperties.com',
    phone: '+1 (555) 456-7890',
    role: 'manager',
    userType: 'organization_manager',
    status: 'active',
    lastLogin: '2024-02-11T16:45:00Z',
    createdDate: '2024-01-05T00:00:00Z',
    permissions: ['manage_organization_members', 'view_organization_reports', 'approve_organization_activities'],
    organizationId: '4',
    organizationName: 'Coastal Properties Group',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    loginAttempts: 0,
    isLocked: false,
    twoFactorEnabled: true,
    sessionCount: 1
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    role: 'member',
    userType: 'member_user',
    status: 'active',
    lastLogin: '2024-02-12T08:20:00Z',
    createdDate: '2024-01-15T00:00:00Z',
    permissions: [],
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    loginAttempts: 0,
    isLocked: false,
    twoFactorEnabled: false,
    sessionCount: 1
  },
  {
    id: '5',
    name: 'John Smith',
    email: 'john.negotiator@premierrealestate.com',
    phone: '+1 (555) 234-5678',
    role: 'member',
    userType: 'member_user',
    status: 'suspended',
    lastLogin: '2024-02-08T14:30:00Z',
    createdDate: '2024-01-20T00:00:00Z',
    permissions: [],
    organizationId: '2',
    organizationName: 'Premier Real Estate Firm',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    loginAttempts: 3,
    isLocked: true,
    twoFactorEnabled: false,
    sessionCount: 0
  }
];

const userTypes: UserType[] = [
  {
    id: '1',
    name: 'System Administrator',
    description: 'Full system access with all administrative privileges',
    permissions: ['manage_all_members', 'manage_all_events', 'manage_all_billing', 'system_settings', 'approve_organizations', 'user_management'],
    defaultRole: 'admin',
    canManageOrganizations: true,
    canManageMembers: true,
    canManageEvents: true,
    canManageBilling: true,
    canViewReports: true,
    canManageSystem: true,
    status: 'active',
    userCount: 1
  },
  {
    id: '2',
    name: 'Organization Manager',
    description: 'Manage specific organization members and activities',
    permissions: ['manage_own_organization_members', 'view_own_organization_reports', 'manage_own_organization_events', 'manage_own_organization_billing'],
    defaultRole: 'manager',
    canManageOrganizations: false,
    canManageMembers: true,
    canManageEvents: true,
    canManageBilling: true,
    canViewReports: true,
    canManageSystem: false,
    status: 'active',
    userCount: 2
  },
  {
    id: '3',
    name: 'Member User',
    description: 'Standard member access with basic privileges',
    permissions: ['view_own_profile', 'update_own_profile', 'view_events', 'register_for_events'],
    defaultRole: 'member',
    canManageOrganizations: false,
    canManageMembers: false,
    canManageEvents: false,
    canManageBilling: false,
    canViewReports: false,
    canManageSystem: false,
    status: 'active',
    userCount: 2
  },
  {
    id: '4',
    name: 'Read Only User',
    description: 'View-only access for auditing and reporting purposes',
    permissions: ['view_reports', 'view_members', 'view_events'],
    defaultRole: 'member',
    canManageOrganizations: false,
    canManageMembers: false,
    canManageEvents: false,
    canManageBilling: false,
    canViewReports: true,
    canManageSystem: false,
    status: 'inactive',
    userCount: 0
  }
];

const userStats = [
  {
    name: 'Total Users',
    value: '5',
    change: '+2',
    changeType: 'increase',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Active Sessions',
    value: '5',
    change: '+1',
    changeType: 'increase',
    icon: Activity,
    color: 'green'
  },
  {
    name: 'Locked Accounts',
    value: '1',
    change: '0',
    changeType: 'neutral',
    icon: Lock,
    color: 'red'
  },
  {
    name: 'Admin Users',
    value: '1',
    change: '0',
    changeType: 'neutral',
    icon: Shield,
    color: 'purple'
  }
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredUsers = userAccounts.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.organizationName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserClick = (user: UserAccount) => {
    setSelectedUser(user);
    setShowUserModal(true);
    setIsEditing(false);
  };

  const handleUserTypeClick = (userType: UserType) => {
    setSelectedUserType(userType);
    setShowUserTypeModal(true);
    setIsEditing(false);
  };

  const closeModals = () => {
    setShowUserModal(false);
    setShowUserTypeModal(false);
    setSelectedUser(null);
    setSelectedUserType(null);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={12} className="mr-1" />;
      case 'suspended':
        return <AlertCircle size={12} className="mr-1" />;
      case 'pending':
        return <Clock size={12} className="mr-1" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'member':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'users', name: 'User Accounts', icon: Users },
    { id: 'types', name: 'User Types', icon: Shield },
    { id: 'settings', name: 'User Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts, types, and system access</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export Users
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus size={16} className="mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change !== '0' && (
                    <span>{stat.change}</span>
                  )}
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
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or organization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="member">Member</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role & Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Security
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr 
                          key={user.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleUserClick(user)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                {user.role === 'admin' && <Shield size={10} className="mr-1" />}
                                {user.role}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {user.userType.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.organizationName ? (
                                <>
                                  <div className="font-medium">{user.organizationName}</div>
                                  <div className="text-gray-500">Organization Member</div>
                                </>
                              ) : (
                                <span className="text-gray-500">System User</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {getStatusIcon(user.status)}
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(user.lastLogin), 'MMM d, yyyy HH:mm')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {user.twoFactorEnabled ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Shield size={10} className="mr-1" />
                                  2FA
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  No 2FA
                                </span>
                              )}
                              {user.isLocked && (
                                <Lock size={14} className="text-red-500" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUserClick(user);
                                }}
                                className="text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUser(user);
                                  setIsEditing(true);
                                  setShowUserModal(true);
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
            </div>
          )}

          {activeTab === 'types' && (
            <div className="space-y-6">
              {/* User Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userTypes.map((userType) => (
                  <div 
                    key={userType.id} 
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleUserTypeClick(userType)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          userType.defaultRole === 'admin' ? 'bg-red-50' :
                          userType.defaultRole === 'manager' ? 'bg-blue-50' :
                          'bg-green-50'
                        }`}>
                          <Shield className={`h-6 w-6 ${
                            userType.defaultRole === 'admin' ? 'text-red-600' :
                            userType.defaultRole === 'manager' ? 'text-blue-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{userType.name}</h3>
                          <p className="text-sm text-gray-600">{userType.description}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        userType.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userType.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Default Role:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userType.defaultRole)}`}>
                          {userType.defaultRole}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Active Users:</span>
                        <span className="font-medium text-gray-900">{userType.userCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Permissions:</span>
                        <span className="font-medium text-gray-900">{userType.permissions.length}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center ${userType.canManageMembers ? 'text-green-600' : 'text-gray-400'}`}>
                          <CheckCircle size={12} className="mr-1" />
                          Manage Members
                        </div>
                        <div className={`flex items-center ${userType.canManageEvents ? 'text-green-600' : 'text-gray-400'}`}>
                          <CheckCircle size={12} className="mr-1" />
                          Manage Events
                        </div>
                        <div className={`flex items-center ${userType.canViewReports ? 'text-green-600' : 'text-gray-400'}`}>
                          <CheckCircle size={12} className="mr-1" />
                          View Reports
                        </div>
                        <div className={`flex items-center ${userType.canManageSystem ? 'text-green-600' : 'text-gray-400'}`}>
                          <CheckCircle size={12} className="mr-1" />
                          System Access
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Global User Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Password Requirements</h4>
                      <p className="text-sm text-gray-600">Enforce strong password policies</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Require 2FA for admin users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Account Lockout</h4>
                      <p className="text-sm text-gray-600">Lock accounts after failed login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Session Timeout</h4>
                      <p className="text-sm text-gray-600">Automatically log out inactive users</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Login Notifications</h4>
                      <p className="text-sm text-gray-600">Email notifications for new logins</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {getStatusIcon(selectedUser.status)}
                      {selectedUser.status}
                    </span>
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">User Type</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedUser.userType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created</label>
                      <p className="text-sm text-gray-900">{format(new Date(selectedUser.createdDate), 'MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Login</label>
                      <p className="text-sm text-gray-900">{format(new Date(selectedUser.lastLogin), 'MMMM d, yyyy HH:mm')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                      <p className={`text-sm ${selectedUser.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Status</label>
                      <p className={`text-sm ${selectedUser.isLocked ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedUser.isLocked ? 'Locked' : 'Unlocked'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Failed Login Attempts</label>
                      <p className="text-sm text-gray-900">{selectedUser.loginAttempts}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Active Sessions</label>
                      <p className="text-sm text-gray-900">{selectedUser.sessionCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedUser.organizationName && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedUser.organizationName}</p>
                        <p className="text-sm text-gray-600">Organization Member</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedUser.permissions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedUser.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle size={14} className="text-green-500 mr-2" />
                          {permission.replace('_', ' ')}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No special permissions assigned</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Type Details Modal */}
      {showUserTypeModal && selectedUserType && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedUserType.defaultRole === 'admin' ? 'bg-red-50' :
                  selectedUserType.defaultRole === 'manager' ? 'bg-blue-50' :
                  'bg-green-50'
                }`}>
                  <Shield className={`h-6 w-6 ${
                    selectedUserType.defaultRole === 'admin' ? 'text-red-600' :
                    selectedUserType.defaultRole === 'manager' ? 'text-blue-600' :
                    'text-green-600'
                  }`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedUserType.name}</h2>
                  <p className="text-gray-600">{selectedUserType.description}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Default Role</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUserType.defaultRole)}`}>
                        {selectedUserType.defaultRole}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUserType.status)}`}>
                        {selectedUserType.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Active Users</label>
                      <p className="text-sm text-gray-900">{selectedUserType.userCount}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Capabilities</h3>
                  <div className="space-y-2">
                    <div className={`flex items-center text-sm ${selectedUserType.canManageOrganizations ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      Manage Organizations
                    </div>
                    <div className={`flex items-center text-sm ${selectedUserType.canManageMembers ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      Manage Members
                    </div>
                    <div className={`flex items-center text-sm ${selectedUserType.canManageEvents ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      Manage Events
                    </div>
                    <div className={`flex items-center text-sm ${selectedUserType.canManageBilling ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      Manage Billing
                    </div>
                    <div className={`flex items-center text-sm ${selectedUserType.canViewReports ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      View Reports
                    </div>
                    <div className={`flex items-center text-sm ${selectedUserType.canManageSystem ? 'text-green-600' : 'text-gray-400'}`}>
                      <CheckCircle size={14} className="mr-2" />
                      System Management
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedUserType.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle size={14} className="text-green-500 mr-2" />
                        {permission.replace('_', ' ')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Edit User Type
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}