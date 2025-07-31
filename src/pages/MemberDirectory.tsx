import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  Building2,
  User,
  Users as UsersIcon,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    memberType: 'individual',
    organizationId: '2',
    organizationName: 'TechCorp Solutions',
    jobTitle: 'Senior Developer',
    department: 'Engineering',
    tier: 'premium',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Passionate about technology and community building.'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Miami, FL',
    memberType: 'individual',
    organizationId: '4',
    organizationName: 'Green Energy Partners',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    tier: 'basic',
    status: 'active',
    joinDate: '2024-02-01',
    lastActive: '2024-02-10',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Marketing professional with focus on sustainable energy solutions.'
  },
  {
    id: 5,
    name: 'Emily Watson',
    email: 'emily@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    memberType: 'individual',
    organizationId: '6',
    organizationName: 'Creative Design Studio',
    jobTitle: 'Creative Director',
    department: 'Design',
    tier: 'elite',
    status: 'active',
    joinDate: '2023-05-15',
    lastActive: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Creative professional specializing in brand identity and digital design.'
  },
  {
    id: 7,
    name: 'Alex Chen',
    email: 'alex.chen@techcorp.com',
    phone: '+1 (555) 789-0123',
    location: 'San Francisco, CA',
    memberType: 'individual',
    organizationId: '2',
    organizationName: 'TechCorp Solutions',
    jobTitle: 'CTO',
    department: 'Technology',
    tier: 'elite',
    status: 'active',
    joinDate: '2023-11-20',
    lastActive: '2024-02-12',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Technology leader with expertise in scalable systems and team management.'
  },
  {
    id: 8,
    name: 'David Kim',
    email: 'david.kim@greenenergypartners.com',
    phone: '+1 (555) 890-1234',
    location: 'Seattle, WA',
    memberType: 'individual',
    realEstateMemberType: 'property_negotiator',
    organizationId: '4',
    organizationName: 'Green Energy Partners',
    jobTitle: 'CEO',
    department: 'Executive',
    tier: 'premium',
    status: 'active',
    joinDate: '2023-08-10',
    lastActive: '2024-02-11',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Entrepreneur focused on renewable energy solutions and sustainable business practices.'
  }
];

export default function MemberDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.organizationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || member.tier === selectedTier;
    const matchesOrganization = selectedOrganization === 'all' || member.organizationName === selectedOrganization;
    
    return matchesSearch && matchesTier && matchesOrganization;
  });

  const organizations = [...new Set(members.map(m => m.organizationName).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
          <p className="text-gray-600">Connect with fellow community members</p>
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
                placeholder="Search members by name, email, organization, or job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="elite">Elite</option>
            </select>
            <select
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Organizations</option>
              {organizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500">
                  <User size={10} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.jobTitle}</p>
                <p className="text-sm text-blue-600">{member.organizationName}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  member.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                  member.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {member.tier === 'elite' && <Star size={10} className="mr-1" />}
                  {member.tier}
                </span>
              </div>
            </div>

            {member.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{member.bio}</p>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={14} className="mr-2 text-gray-400" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-2 text-gray-400" />
                {member.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 size={14} className="mr-2 text-gray-400" />
                {member.department}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageSquare size={14} className="mr-1" />
                Message
              </button>
              <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Calendar size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}