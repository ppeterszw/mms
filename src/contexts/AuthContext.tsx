import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'manager';
  memberType: 'individual' | 'organization';
  // Real Estate specific member types for individuals
  realEstateMemberType?: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager';
  membershipTier: 'basic' | 'premium' | 'elite';
  avatar?: string;
  joinDate: string;
  permissions?: string[];
  // Real Estate specific fields
  registrationNumber?: string;
  annualSubscriptionPaid?: boolean;
  subscriptionExpiryDate?: string;
  registrationStatus: 'pending' | 'approved' | 'rejected';
  documents?: {
    educationalQualifications?: string[];
    proofOfIdentity?: string;
    birthCertificate?: string;
    additionalDocuments?: string[];
  };
  // Educational requirements for individuals
  educationalQualifications?: {
    level?: 'O-Level' | 'A-Level' | 'Bachelors Degree' | 'HND' | 'Masters';
    ordinaryLevelPasses?: number;
    hasEnglishAndMath?: boolean;
    advancedLevelPasses?: number;
    equivalentQualification?: string;
    age?: number;
    meetsRequirements?: boolean;
  };
  // For organizations
  organizationSize?: string;
  industry?: string;
  firmType?: 'real_estate_firm';
  firmRegistrationNumber?: string;
  firmLicenseNumber?: string;
  // For individuals
  organizationId?: string;
  organizationName?: string;
  // Principal Agent specific - organization they manage
  managedOrganizationId?: string;
  managedOrganizationName?: string;
  jobTitle?: string;
  department?: string;
  // CPD tracking for individuals
  cpdHours?: {
    currentYear: number;
    totalEarned: number;
    annualTarget: number;
    activities: Array<{
      id: string;
      eventId: string;
      eventTitle: string;
      hoursEarned: number;
      dateEarned: string;
      certificateUrl?: string;
    }>;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, portal?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, portal: string = 'member') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock member database - in real app this would be API call
    const memberDatabase = {
      'sarah@example.com': {
        id: '1',
        name: 'Sarah Johnson',
        role: 'member' as const,
        memberType: 'individual' as const,
        realEstateMemberType: 'real_estate_agent' as const,
        membershipTier: 'premium' as const,
        organizationId: '2',
        organizationName: 'Premier Real Estate Firm',
        jobTitle: 'Real Estate Agent',
        registrationNumber: 'RE-REA-2024-001'
      },
      'john.negotiator@premierrealestate.com': {
        id: '2',
        name: 'John Smith',
        role: 'member' as const,
        memberType: 'individual' as const,
        realEstateMemberType: 'property_negotiator' as const,
        membershipTier: 'basic' as const,
        organizationId: '2',
        organizationName: 'Premier Real Estate Firm',
        jobTitle: 'Property Negotiator',
        registrationNumber: 'RE-PN-2024-002'
      },
      'david.principal@premierrealestate.com': {
        id: '3',
        name: 'David Wilson',
        role: 'manager' as const,
        memberType: 'individual' as const,
        realEstateMemberType: 'principal_real_estate_agent' as const,
        membershipTier: 'elite' as const,
        organizationId: '2',
        organizationName: 'Premier Real Estate Firm',
        managedOrganizationId: '2',
        managedOrganizationName: 'Premier Real Estate Firm',
        jobTitle: 'Principal Real Estate Agent',
        registrationNumber: 'RE-PRI-2024-001'
      },
      'maria.manager@coastalproperties.com': {
        id: '4',
        name: 'Maria Rodriguez',
        role: 'manager' as const,
        memberType: 'individual' as const,
        realEstateMemberType: 'property_manager' as const,
        membershipTier: 'premium' as const,
        organizationId: '4',
        organizationName: 'Coastal Properties Group',
        jobTitle: 'Property Manager',
        registrationNumber: 'RE-PM-2024-003'
      },
      'admin@example.com': {
        id: 'admin-1',
        name: 'System Administrator',
        role: 'admin' as const,
        memberType: 'individual' as const,
        realEstateMemberType: 'real_estate_agent' as const,
        membershipTier: 'premium' as const,
        jobTitle: 'System Administrator',
        registrationNumber: 'ADMIN-001'
      }
    };
    
    // Find member by email
    const memberData = memberDatabase[email as keyof typeof memberDatabase];
    
    if (!memberData) {
      throw new Error('Invalid email or password');
    }
    
    // Get avatar based on role and member type
    const getAvatar = (role: string, realEstateMemberType: string) => {
      if (role === 'admin') {
        return 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150';
      } else if (realEstateMemberType === 'principal_real_estate_agent') {
        return 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150';
      } else if (realEstateMemberType === 'property_manager') {
        return 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150';
      } else if (realEstateMemberType === 'property_negotiator') {
        return 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150';
      } else {
        return 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150';
      }
    };
    
    setUser({
      id: memberData.id,
      name: memberData.name,
      email,
      role: memberData.role,
      memberType: memberData.memberType,
      realEstateMemberType: memberData.realEstateMemberType,
      membershipTier: memberData.membershipTier,
      displayMembershipType: memberData.realEstateMemberType?.replace('_', ' '),
      avatar: getAvatar(memberData.role, memberData.realEstateMemberType),
      joinDate: '2024-01-15',
      organizationId: memberData.organizationId,
      organizationName: memberData.organizationName,
      managedOrganizationId: memberData.managedOrganizationId,
      managedOrganizationName: memberData.managedOrganizationName,
      jobTitle: memberData.jobTitle,
      department: memberData.role === 'admin' ? 'IT' : 'Real Estate',
      permissions: memberData.role === 'admin' ? ['manage_all_members', 'manage_all_events', 'manage_all_billing', 'system_settings', 'approve_organizations'] : 
                   memberData.role === 'manager' && memberData.realEstateMemberType === 'principal_real_estate_agent' ? ['manage_own_organization_members', 'view_own_organization_reports', 'manage_own_organization_events', 'manage_own_organization_billing'] :
                   memberData.role === 'manager' ? ['manage_organization_members', 'view_organization_reports', 'approve_organization_activities'] : [],
      registrationStatus: 'approved',
      registrationNumber: memberData.registrationNumber,
      educationalQualifications: memberData.role === 'member' ? {
        level: 'A-Level',
        ordinaryLevelPasses: 7,
        hasEnglishAndMath: true,
        advancedLevelPasses: 3,
        meetsRequirements: true
      } : undefined
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}