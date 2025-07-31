import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  User, 
  Menu, 
  X, 
  BarChart3,
  LogOut,
  Bell,
  MessageSquare,
  BookOpen,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const memberNavigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'My Profile', href: '/profile', icon: User },
  { name: 'Members Directory', href: '/directory', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
];

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || user.role !== 'member') {
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
              <h1 className="text-xl font-bold text-blue-600">Estate Agents Council</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-6 px-3">
            {memberNavigation.map((item) => {
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
              <h1 className="text-xl font-bold text-blue-600">Estate Agents Council</h1>
            </div>
          </div>
          <nav className="mt-6 flex-1 px-3">
            {memberNavigation.map((item) => {
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
          
          {/* Member info at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.membershipTier} Member</p>
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
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {location.pathname === '/' ? 'Dashboard' : 
                 location.pathname === '/directory' ? 'Members Directory' :
                 location.pathname.slice(1)}
              </h2>
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
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.membershipTier} Member</p>
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