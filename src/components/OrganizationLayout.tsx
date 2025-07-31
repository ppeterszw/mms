import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BarChart3,
  LogOut,
  Bell,
  Building2,
  UserCheck,
  CreditCard,
  Settings,
  FileText,
  Award,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const organizationNavigation = [
  { name: 'Dashboard', href: '/organization', icon: BarChart3 },
  { name: 'Manage Members', href: '/organization/members', icon: Users },
  { name: 'Events & Training', href: '/organization/events', icon: Calendar },
  { name: 'CPD Management', href: '/organization/cpd', icon: Award },
  { name: 'Billing & Payments', href: '/organization/billing', icon: CreditCard },
  { name: 'Reports', href: '/organization/reports', icon: FileText },
  { name: 'Organization Settings', href: '/organization/settings', icon: Settings },
];

export default function OrganizationLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Only Principal Real Estate Agents can access this portal
  if (!user || user.realEstateMemberType !== 'principal_real_estate_agent') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src="/eaclogo.png" alt="Estate Agents Council" className="h-8 w-8" />
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">Estate Agents Council</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-6 px-3">
            {organizationNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon 
                    size={18} 
                    className={`mr-3 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src="/eaclogo.png" alt="Estate Agents Council" className="h-8 w-8" />
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">Estate Agents Council</h1>
            </div>
          </div>
          <nav className="mt-6 flex-1 px-3">
            {organizationNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`mr-3 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Organization info at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              {/* Principal Agent Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">Principal Real Estate Agent</p>
                </div>
              </div>
              
              {/* Organization Info */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {user.managedOrganizationName || user.organizationName}
                  </span>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>License: {user.registrationNumber}</p>
                  <p>Certificate: <button className="text-blue-800 hover:underline" onClick={() => window.open('/certificate', '_blank')}>Download</button></p>
                  <p>Members: {(() => {
                    const orgId = user.managedOrganizationId || user.organizationId || '2';
                    // Mock member count calculation - in real app this would come from API
                    const memberCounts = {
                      '2': { total: 7, active: 6 }, // Premier Real Estate Firm
                      '4': { total: 3, active: 3 }  // Coastal Properties Group
                    };
                    const counts = memberCounts[orgId as keyof typeof memberCounts] || { total: 0, active: 0 };
                    return `${counts.total} • Active: ${counts.active}`;
                  })()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-gray-400 hover:text-gray-600 lg:hidden mr-4 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {location.pathname === '/organization' ? 'Organization Dashboard' : 
                     location.pathname.replace('/organization/', '').replace('/organization', 'Dashboard').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h2>
                  <p className="text-sm text-gray-600">{user.managedOrganizationName || user.organizationName}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">Principal Real Estate Agent</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}