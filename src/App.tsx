import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberLayout from './components/MemberLayout';
import AdminLayout from './components/AdminLayout';
import OrganizationLayout from './components/OrganizationLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDirectory from './pages/MemberDirectory';
import Events from './pages/Events';
import Subscriptions from './pages/Billing';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Resources from './pages/Resources';
import Messages from './pages/Messages';
import Certificate from './components/Certificate';
import OrganizationDashboard from './pages/OrganizationDashboard';
import MemberApplicationForm from './components/MemberApplicationForm';
import OrganizationManagement from './pages/OrganizationManagement';
import AdminBilling from './pages/AdminBilling';
import MemberTypeManagement from './pages/MemberTypeManagement';
import AdminCPDManagement from './pages/AdminCPDManagement';
import UserManagement from './pages/UserManagement';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/apply" element={<MemberApplicationForm />} />
      </Routes>
    );
  }

  // Admin routes
  if (user.role === 'admin' || user.role === 'manager') {
    // Principal Real Estate Agents get organization portal
    if (user.realEstateMemberType === 'principal_real_estate_agent') {
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/" element={<OrganizationLayout />}>
            <Route index element={<OrganizationDashboard />} />
            <Route path="organization" element={<OrganizationDashboard />} />
            <Route path="organization/members" element={<Members />} />
            <Route path="admin/billing" element={<AdminBilling />} />
            <Route path="organization/events" element={<Events />} />
            <Route path="organization/cpd" element={<Dashboard />} />
            <Route path="organization/billing" element={<Subscriptions />} />
            <Route path="organization/reports" element={<Dashboard />} />
            <Route path="organization/settings" element={<Dashboard />} />
          </Route>
        </Routes>
      );
    }
    
    // System admins get admin portal
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/members" element={<Members />} />
          <Route path="admin/organizations" element={<OrganizationManagement />} />
          <Route path="admin/member-types" element={<MemberTypeManagement />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/cpd" element={<AdminCPDManagement />} />
          <Route path="admin/events" element={<Events />} />
          <Route path="admin/billing" element={<Subscriptions />} />
          <Route path="admin/communications" element={<Admin />} />
          <Route path="admin/reports" element={<Admin />} />
          <Route path="admin/settings" element={<Admin />} />
          <Route path="admin/security" element={<Admin />} />
          <Route path="admin/database" element={<Admin />} />
        </Route>
      </Routes>
    );
  }

  // Member routes
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/" element={<MemberLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="directory" element={<MemberDirectory />} />
        <Route path="events" element={<Events />} />
        <Route path="resources" element={<Resources />} />
        <Route path="messages" element={<Messages />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;