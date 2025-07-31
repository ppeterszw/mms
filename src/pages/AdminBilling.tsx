import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Building2, 
  CreditCard, 
  Calendar, 
  Download,
  Filter,
  Search,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Smartphone,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  PieChart,
  BarChart3,
  Target,
  Banknote,
  RefreshCw,
  Eye,
  User,
  X,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  FileText
} from 'lucide-react';
import { format, subMonths } from 'date-fns';

const revenueMetrics = {
  individual: {
    totalRevenue: 156750,
    monthlyRevenue: 18500,
    memberCount: 627,
    averageRevenue: 250,
    growth: 12.5,
    renewalRate: 89.2
  },
  organization: {
    totalRevenue: 284300,
    monthlyRevenue: 31200,
    memberCount: 89,
    averageRevenue: 3195,
    growth: 18.7,
    renewalRate: 94.1
  }
};

const paymentMethods = [
  {
    id: 'paynow',
    name: 'Paynow',
    description: 'Mobile money payments via Paynow',
    icon: Smartphone,
    usage: 45.2,
    revenue: 198750,
    transactions: 892,
    color: 'blue'
  },
  {
    id: 'card',
    name: 'Credit/Debit Cards',
    description: 'Direct card payments',
    icon: CreditCard,
    usage: 32.8,
    revenue: 144320,
    transactions: 456,
    color: 'purple'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfers',
    icon: Banknote,
    usage: 15.6,
    revenue: 68580,
    transactions: 234,
    color: 'green'
  },
  {
    id: 'cash',
    name: 'Cash Payment',
    description: 'In-person cash payments',
    icon: Wallet,
    usage: 6.4,
    revenue: 28350,
    transactions: 167,
    color: 'orange'
  }
];

const recentTransactions = [
  {
    id: 1,
    memberName: 'Premier Real Estate Firm',
    memberType: 'organization',
    amount: 1200,
    method: 'Bank Transfer',
    status: 'completed',
    date: '2024-02-12',
    reference: 'TXN-2024-001',
    description: 'Annual Organization Subscription - Elite Plan'
  },
  {
    id: 2,
    memberName: 'Sarah Johnson',
    memberType: 'individual',
    amount: 250,
    method: 'Paynow',
    status: 'completed',
    date: '2024-02-12',
    reference: 'TXN-2024-002',
    description: 'Annual Individual Subscription - Premium Plan'
  },
  {
    id: 3,
    memberName: 'Coastal Properties Group',
    memberType: 'organization',
    amount: 800,
    method: 'Credit Card',
    status: 'failed',
    date: '2024-02-11',
    reference: 'TXN-2024-003',
    description: 'Annual Organization Subscription - Premium Plan'
  },
  {
    id: 4,
    memberName: 'Maria Rodriguez',
    memberType: 'individual',
    amount: 150,
    method: 'Cash',
    status: 'completed',
    date: '2024-02-11',
    reference: 'TXN-2024-004',
    description: 'Annual Individual Subscription - Basic Plan'
  },
  {
    id: 5,
    memberName: 'Elite Properties Ltd',
    memberType: 'organization',
    amount: 1200,
    method: 'Paynow',
    status: 'pending',
    date: '2024-02-10',
    reference: 'TXN-2024-005',
    description: 'Annual Organization Subscription - Elite Plan'
  }
];

const monthlyData = [
  { month: 'Aug 2023', individual: 14200, organization: 28900 },
  { month: 'Sep 2023', individual: 15800, organization: 31200 },
  { month: 'Oct 2023', individual: 16500, organization: 29800 },
  { month: 'Nov 2023', individual: 17200, organization: 33100 },
  { month: 'Dec 2023', individual: 18900, organization: 35400 },
  { month: 'Jan 2024', individual: 18500, organization: 31200 },
  { month: 'Feb 2024', individual: 19800, organization: 34600 }
];

const memberFinancialHistory = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    memberType: 'individual',
    organizationName: 'Premier Real Estate Firm',
    registrationNumber: 'RE-IND-2024-001',
    tier: 'premium',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalPaid: 750,
    currentSubscription: {
      plan: 'Premium Individual',
      amount: 250,
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      status: 'active',
      paymentMethod: 'Paynow'
    },
    paymentHistory: [
      {
        id: 1,
        date: '2024-01-15',
        amount: 250,
        method: 'Paynow',
        status: 'completed',
        description: 'Annual Premium Subscription',
        reference: 'PAY-2024-001'
      },
      {
        id: 2,
        date: '2023-01-15',
        amount: 250,
        method: 'Credit Card',
        status: 'completed',
        description: 'Annual Premium Subscription',
        reference: 'PAY-2023-045'
      },
      {
        id: 3,
        date: '2022-02-01',
        amount: 250,
        method: 'Bank Transfer',
        status: 'completed',
        description: 'Initial Premium Subscription',
        reference: 'PAY-2022-089'
      }
    ],
    outstandingPayments: []
  },
  {
    id: 2,
    name: 'Premier Real Estate Firm',
    email: 'contact@premierrealestate.com',
    phone: '+1 (555) 234-5678',
    memberType: 'organization',
    registrationNumber: 'RE-ORG-2023-045',
    tier: 'elite',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalPaid: 3600,
    currentSubscription: {
      plan: 'Elite Organization',
      amount: 1200,
      startDate: '2023-11-20',
      endDate: '2024-11-19',
      status: 'active',
      paymentMethod: 'Bank Transfer'
    },
    paymentHistory: [
      {
        id: 1,
        date: '2023-11-20',
        amount: 1200,
        method: 'Bank Transfer',
        status: 'completed',
        description: 'Annual Elite Organization Subscription',
        reference: 'PAY-2023-156'
      },
      {
        id: 2,
        date: '2022-11-20',
        amount: 1200,
        method: 'Bank Transfer',
        status: 'completed',
        description: 'Annual Elite Organization Subscription',
        reference: 'PAY-2022-234'
      },
      {
        id: 3,
        date: '2021-11-20',
        amount: 1200,
        method: 'Credit Card',
        status: 'completed',
        description: 'Annual Elite Organization Subscription',
        reference: 'PAY-2021-345'
      }
    ],
    outstandingPayments: []
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    phone: '+1 (555) 345-6789',
    memberType: 'individual',
    organizationName: 'Coastal Properties Group',
    registrationNumber: 'RE-IND-2024-003',
    tier: 'basic',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalPaid: 300,
    currentSubscription: {
      plan: 'Basic Individual',
      amount: 150,
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      status: 'active',
      paymentMethod: 'Cash'
    },
    paymentHistory: [
      {
        id: 1,
        date: '2024-02-01',
        amount: 150,
        method: 'Cash',
        status: 'completed',
        description: 'Annual Basic Subscription',
        reference: 'PAY-2024-067'
      },
      {
        id: 2,
        date: '2023-02-01',
        amount: 150,
        method: 'Paynow',
        status: 'completed',
        description: 'Annual Basic Subscription',
        reference: 'PAY-2023-089'
      }
    ],
    outstandingPayments: []
  },
  {
    id: 4,
    name: 'Coastal Properties Group',
    email: 'info@coastalproperties.com',
    phone: '+1 (555) 456-7890',
    memberType: 'organization',
    registrationNumber: 'RE-ORG-2023-078',
    tier: 'premium',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalPaid: 1600,
    currentSubscription: {
      plan: 'Premium Organization',
      amount: 800,
      startDate: '2023-08-10',
      endDate: '2024-08-09',
      status: 'expiring_soon',
      paymentMethod: 'Credit Card'
    },
    paymentHistory: [
      {
        id: 1,
        date: '2023-08-10',
        amount: 800,
        method: 'Credit Card',
        status: 'completed',
        description: 'Annual Premium Organization Subscription',
        reference: 'PAY-2023-178'
      },
      {
        id: 2,
        date: '2022-08-10',
        amount: 800,
        method: 'Bank Transfer',
        status: 'completed',
        description: 'Annual Premium Organization Subscription',
        reference: 'PAY-2022-267'
      }
    ],
    outstandingPayments: [
      {
        id: 1,
        amount: 800,
        dueDate: '2024-08-09',
        description: 'Annual Premium Organization Subscription Renewal',
        status: 'overdue',
        daysPastDue: 187
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2024-003',
    currentSubscription: {
      plan: 'Individual Basic',
      amount: 150,
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      paymentMethod: 'Bank Transfer',
      status: 'active'
    },
    totalPaid: 150,
    totalTransactions: 1,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2024-02-01',
        amount: 150,
        description: 'Annual Membership - Individual Basic',
        method: 'Bank Transfer',
        status: 'completed',
        reference: 'PAY-2024-012'
      }
    ]
  },
  {
    id: 3,
    name: 'Alex Chen',
    email: 'alex.chen@techcorp.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2023-089',
    currentSubscription: {
      plan: 'Individual Elite',
      amount: 400,
      startDate: '2023-11-20',
      endDate: '2024-11-19',
      paymentMethod: 'Credit Card',
      status: 'expiring_soon'
    },
    totalPaid: 800,
    totalTransactions: 2,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2023-11-20',
        amount: 400,
        description: 'Annual Membership - Individual Elite',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2023-156'
      },
      {
        id: 2,
        date: '2022-11-20',
        amount: 400,
        description: 'Annual Membership - Individual Elite',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2022-234'
      }
    ]
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@greenenergypartners.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2023-067',
    currentSubscription: {
      plan: 'Individual Premium',
      amount: 250,
      startDate: '2023-08-10',
      endDate: '2024-08-09',
      paymentMethod: 'Paynow',
      status: 'expired'
    },
    totalPaid: 250,
    totalTransactions: 1,
    outstandingPayments: 250,
    paymentHistory: [
      {
        id: 1,
        date: '2023-08-10',
        amount: 250,
        description: 'Annual Membership - Individual Premium',
        method: 'Paynow',
        status: 'completed',
        reference: 'PAY-2023-089'
      },
      {
        id: 2,
        date: '2024-08-10',
        amount: 250,
        description: 'Annual Membership Renewal - Individual Premium',
        method: 'Pending',
        status: 'overdue',
        reference: 'PAY-2024-PENDING-067',
        daysOverdue: 187
      }
    ]
  },
  {
    id: 5,
    name: 'Emily Watson',
    email: 'emily@example.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2023-045',
    currentSubscription: {
      plan: 'Individual Elite',
      amount: 400,
      startDate: '2023-05-15',
      endDate: '2024-05-14',
      paymentMethod: 'Credit Card',
      status: 'active'
    },
    totalPaid: 1200,
    totalTransactions: 3,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2023-05-15',
        amount: 400,
        description: 'Annual Membership - Individual Elite',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2023-067'
      },
      {
        id: 2,
        date: '2022-05-15',
        amount: 400,
        description: 'Annual Membership - Individual Elite',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2022-123'
      },
      {
        id: 3,
        date: '2021-05-15',
        amount: 400,
        description: 'Initial Membership - Individual Elite',
        method: 'Bank Transfer',
        status: 'completed',
        reference: 'PAY-2021-089'
      }
    ]
  },
  {
    id: 6,
    name: 'Alex Chen',
    email: 'alex.chen@techcorp.com',
    phone: '+1 (555) 789-0123',
    memberType: 'individual',
    organizationName: 'TechCorp Solutions',
    registrationNumber: 'RE-IND-2023-089',
    tier: 'elite',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    totalPaid: 1200,
    currentSubscription: {
      plan: 'Elite Individual',
      amount: 400,
      startDate: '2023-11-20',
      endDate: '2024-11-19',
      status: 'active',
      paymentMethod: 'Credit Card'
    },
    paymentHistory: [
      {
        id: 1,
        date: '2023-11-20',
        amount: 400,
        method: 'Credit Card',
        status: 'completed',
        description: 'Annual Elite Individual Subscription',
        reference: 'PAY-2023-189'
      },
      {
        id: 2,
        date: '2022-11-20',
        amount: 400,
        method: 'Paynow',
        status: 'completed',
        description: 'Annual Elite Individual Subscription',
        reference: 'PAY-2022-278'
      },
      {
        id: 3,
        date: '2021-11-20',
        amount: 400,
        method: 'Bank Transfer',
        status: 'completed',
        description: 'Annual Elite Individual Subscription',
        reference: 'PAY-2021-389'
      }
    ],
    outstandingPayments: []
  },
  {
    id: 8,
    name: 'Elite Properties Ltd',
    email: 'contact@eliteproperties.com',
    memberType: 'organization',
    registrationNumber: 'RE-ORG-2023-089',
    currentSubscription: {
      plan: 'Real Estate Firm Enterprise',
      amount: 1200,
      startDate: '2023-06-15',
      endDate: '2024-06-14',
      paymentMethod: 'Bank Transfer',
      status: 'active'
    },
    totalPaid: 3600,
    totalTransactions: 3,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2023-06-15',
        amount: 1200,
        description: 'Annual Subscription - Real Estate Firm Enterprise',
        method: 'Bank Transfer',
        status: 'completed',
        reference: 'PAY-2023-ORG-089'
      },
      {
        id: 2,
        date: '2022-06-15',
        amount: 1200,
        description: 'Annual Subscription - Real Estate Firm Enterprise',
        method: 'Bank Transfer',
        status: 'completed',
        reference: 'PAY-2022-ORG-089'
      },
      {
        id: 3,
        date: '2021-06-15',
        amount: 1200,
        description: 'Initial Subscription - Real Estate Firm Enterprise',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2021-ORG-089'
      }
    ]
  },
  {
    id: 9,
    name: 'Sunshine Real Estate',
    email: 'info@sunshineproperties.com',
    memberType: 'organization',
    registrationNumber: 'RE-ORG-2023-156',
    currentSubscription: {
      plan: 'Real Estate Firm Basic',
      amount: 500,
      startDate: '2023-09-22',
      endDate: '2024-09-21',
      paymentMethod: 'Paynow',
      status: 'expiring_soon'
    },
    totalPaid: 1000,
    totalTransactions: 2,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2023-09-22',
        amount: 500,
        description: 'Annual Subscription - Real Estate Firm Basic',
        method: 'Paynow',
        status: 'completed',
        reference: 'PAY-2023-ORG-156'
      },
      {
        id: 2,
        date: '2022-09-22',
        amount: 500,
        description: 'Annual Subscription - Real Estate Firm Basic',
        method: 'Cash',
        status: 'completed',
        reference: 'PAY-2022-ORG-156'
      }
    ]
  },
  {
    id: 10,
    name: 'Metropolitan Real Estate',
    email: 'admin@metropolitanre.com',
    memberType: 'organization',
    registrationNumber: 'RE-ORG-2024-012',
    currentSubscription: {
      plan: 'Real Estate Firm Premium',
      amount: 800,
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      paymentMethod: 'Credit Card',
      status: 'active'
    },
    totalPaid: 800,
    totalTransactions: 1,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2024-02-01',
        amount: 800,
        description: 'Initial Subscription - Real Estate Firm Premium',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2024-ORG-012'
      }
    ]
  },
  {
    id: 11,
    name: 'John Smith',
    email: 'john.negotiator@premierrealestate.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2024-002',
    currentSubscription: {
      plan: 'Individual Basic',
      amount: 150,
      startDate: '2024-01-20',
      endDate: '2025-01-19',
      paymentMethod: 'Paynow',
      status: 'active'
    },
    totalPaid: 150,
    totalTransactions: 1,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2024-01-20',
        amount: 150,
        description: 'Annual Membership - Individual Basic',
        method: 'Paynow',
        status: 'completed',
        reference: 'PAY-2024-002'
      }
    ]
  },
  {
    id: 12,
    name: 'Jennifer Adams',
    email: 'jennifer@premierrealestate.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2024-004',
    currentSubscription: {
      plan: 'Individual Premium',
      amount: 250,
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      paymentMethod: 'Credit Card',
      status: 'active'
    },
    totalPaid: 250,
    totalTransactions: 1,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2024-02-01',
        amount: 250,
        description: 'Annual Membership - Individual Premium',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2024-004'
      }
    ]
  },
  {
    id: 13,
    name: 'Michael Brown',
    email: 'michael@premierrealestate.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2024-005',
    currentSubscription: {
      plan: 'Individual Basic',
      amount: 150,
      startDate: '2024-01-25',
      endDate: '2025-01-24',
      paymentMethod: 'Bank Transfer',
      status: 'active'
    },
    totalPaid: 150,
    totalTransactions: 1,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2024-01-25',
        amount: 150,
        description: 'Annual Membership - Individual Basic',
        method: 'Bank Transfer',
        status: 'completed',
        reference: 'PAY-2024-005'
      }
    ]
  },
  {
    id: 14,
    name: 'Lisa Chen',
    email: 'lisa@premierrealestate.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2023-078',
    currentSubscription: {
      plan: 'Individual Premium',
      amount: 250,
      startDate: '2023-12-10',
      endDate: '2024-12-09',
      paymentMethod: 'Paynow',
      status: 'active'
    },
    totalPaid: 500,
    totalTransactions: 2,
    outstandingPayments: 0,
    paymentHistory: [
      {
        id: 1,
        date: '2023-12-10',
        amount: 250,
        description: 'Annual Membership - Individual Premium',
        method: 'Paynow',
        status: 'completed',
        reference: 'PAY-2023-078'
      },
      {
        id: 2,
        date: '2022-12-10',
        amount: 250,
        description: 'Annual Membership - Individual Premium',
        method: 'Credit Card',
        status: 'completed',
        reference: 'PAY-2022-078'
      }
    ]
  },
  {
    id: 15,
    name: 'Robert Wilson',
    email: 'robert@premierrealestate.com',
    memberType: 'individual',
    registrationNumber: 'RE-IND-2024-006',
    currentSubscription: {
      plan: 'Individual Basic',
      amount: 150,
      startDate: '2024-02-10',
      endDate: '2025-02-09',
      paymentMethod: 'Cash',
      status: 'pending'
    },
    totalPaid: 0,
    totalTransactions: 0,
    outstandingPayments: 150,
    paymentHistory: [
      {
        id: 1,
        date: '2024-02-10',
        amount: 150,
        description: 'Annual Membership - Individual Basic',
        method: 'Cash',
        status: 'pending',
        reference: 'PAY-2024-PENDING-006',
        daysOverdue: 5
      }
    ]
  }
];

export default function AdminBilling() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMemberType, setSelectedMemberType] = useState('all');
  const [selectedMember, setSelectedMember] = useState<typeof memberFinancialHistory[0] | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const totalRevenue = revenueMetrics.individual.totalRevenue + revenueMetrics.organization.totalRevenue;
  const totalMonthlyRevenue = revenueMetrics.individual.monthlyRevenue + revenueMetrics.organization.monthlyRevenue;
  const totalMembers = revenueMetrics.individual.memberCount + revenueMetrics.organization.memberCount;

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredMembers = memberFinancialHistory.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                         member.registrationNumber.toLowerCase().includes(memberSearchQuery.toLowerCase());
    const matchesType = selectedMemberType === 'all' || member.memberType === selectedMemberType;
    
    return matchesSearch && matchesType;
  });

  const handleMemberClick = (member: typeof memberFinancialHistory[0]) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const closeMemberModal = () => {
    setShowMemberModal(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Revenue</h1>
          <p className="text-gray-600">Monitor financial performance and payment analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight size={16} />
              +15.2%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-xs text-gray-500 mt-1">All time earnings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-blue-600">
              <ArrowUpRight size={16} />
              +8.7%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">${totalMonthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-xs text-gray-500 mt-1">Current month earnings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-purple-600">
              <ArrowUpRight size={16} />
              +12.3%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalMembers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Paying Members</p>
            <p className="text-xs text-gray-500 mt-1">Active subscriptions</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-50">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-orange-600">
              <ArrowUpRight size={16} />
              +2.1%
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">91.7%</p>
            <p className="text-sm text-gray-600">Renewal Rate</p>
            <p className="text-xs text-gray-500 mt-1">Average retention</p>
          </div>
        </div>
      </div>

      {/* Individual vs Organization Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Members Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Individual Members</h3>
                  <p className="text-sm text-gray-600">{revenueMetrics.individual.memberCount} active members</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm font-medium text-green-600">
                  <ArrowUpRight size={14} />
                  +{revenueMetrics.individual.growth}%
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.individual.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.individual.monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average per Member</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.individual.averageRevenue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Renewal Rate</span>
                <span className="text-lg font-bold text-green-600">
                  {revenueMetrics.individual.renewalRate}%
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Revenue contribution:</span>
                <span className="font-medium text-blue-600">
                  {Math.round((revenueMetrics.individual.totalRevenue / totalRevenue) * 100)}%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(revenueMetrics.individual.totalRevenue / totalRevenue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Members Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Organization Members</h3>
                  <p className="text-sm text-gray-600">{revenueMetrics.organization.memberCount} active organizations</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm font-medium text-green-600">
                  <ArrowUpRight size={14} />
                  +{revenueMetrics.organization.growth}%
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.organization.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.organization.monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average per Organization</span>
                <span className="text-lg font-bold text-gray-900">
                  ${revenueMetrics.organization.averageRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Renewal Rate</span>
                <span className="text-lg font-bold text-green-600">
                  {revenueMetrics.organization.renewalRate}%
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Revenue contribution:</span>
                <span className="font-medium text-purple-600">
                  {Math.round((revenueMetrics.organization.totalRevenue / totalRevenue) * 100)}%
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${(revenueMetrics.organization.totalRevenue / totalRevenue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-600 mt-1">Revenue breakdown by payment method</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="text-center">
                  <div className={`p-4 rounded-lg bg-${method.color}-50 mb-4`}>
                    <Icon className={`h-8 w-8 text-${method.color}-600 mx-auto`} />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{method.name}</h4>
                  <p className="text-xs text-gray-600 mb-3">{method.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium">{method.usage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium">${method.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transactions:</span>
                      <span className="font-medium">{method.transactions}</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${method.color}-600 h-2 rounded-full transition-all`}
                      style={{ width: `${method.usage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Member Financial History */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Member Financial History</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search members..."
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedMemberType}
              onChange={(e) => setSelectedMemberType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Members</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Member Financial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              {/* Member Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                    member.memberType === 'organization' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {member.memberType === 'organization' ? (
                      <Building2 size={10} className="text-white" />
                    ) : (
                      <User size={10} className="text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{member.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.memberType === 'organization' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {member.memberType === 'organization' ? 'Organization' : 'Individual'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      member.currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                      member.currentSubscription.status === 'expiring_soon' ? 'bg-yellow-100 text-yellow-800' :
                      member.currentSubscription.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.currentSubscription.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                      {member.currentSubscription.status === 'expiring_soon' && <Clock size={10} className="mr-1" />}
                      {member.currentSubscription.status === 'expired' && <AlertCircle size={10} className="mr-1" />}
                      {member.currentSubscription.status === 'pending' && <Clock size={10} className="mr-1" />}
                      {member.currentSubscription.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Subscription */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-blue-900">Current Subscription</h5>
                  <span className="text-lg font-bold text-blue-900">${member.currentSubscription.amount}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-blue-800 font-medium">{member.currentSubscription.plan}</p>
                  <p className="text-xs text-blue-700">
                    {format(new Date(member.currentSubscription.startDate), 'MMM d, yyyy')} - 
                    {format(new Date(member.currentSubscription.endDate), 'MMM d, yyyy')}
                  </p>
                  <div className="flex items-center space-x-2">
                    <CreditCard size={12} className="text-blue-600" />
                    <span className="text-xs text-blue-700">{member.currentSubscription.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign size={14} className="text-green-600" />
                    <span className="text-xs font-medium text-green-900">Total Paid</span>
                  </div>
                  <p className="text-lg font-bold text-green-900">${member.totalPaid}</p>
                  <p className="text-xs text-green-700">{member.totalTransactions || member.paymentHistory.length} transactions</p>
                </div>
                
                <div className={`rounded-lg p-3 ${
                  (member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0 ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle size={14} className={(member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0 ? 'text-red-600' : 'text-gray-600'} />
                    <span className={`text-xs font-medium ${
                      (member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0 ? 'text-red-900' : 'text-gray-900'
                    }`}>Outstanding</span>
                  </div>
                  <p className={`text-lg font-bold ${
                    (member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0 ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    ${Array.isArray(member.outstandingPayments) ? member.outstandingPayments.reduce((sum, payment) => sum + payment.amount, 0) : member.outstandingPayments || 0}
                  </p>
                  {((member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0) && (
                    <p className="text-xs text-red-700">
                      {Array.isArray(member.outstandingPayments) ? 
                        `${member.outstandingPayments[0]?.daysPastDue || 0} days overdue` :
                        'Payment overdue'
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Payment History Preview */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-gray-900">Recent Payments</h5>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {member.paymentHistory.slice(0, 2).map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          payment.status === 'completed' ? 'bg-green-500' :
                          payment.status === 'pending' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">${payment.amount}</p>
                          <p className="text-xs text-gray-500">{format(new Date(payment.date), 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{payment.method}</p>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {member.paymentHistory.length === 0 && (
                    <div className="text-center py-3 text-gray-500">
                      <p className="text-xs">No payment history</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMemberClick(member);
                  }}
                  className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Details
                </button>
                {((member.outstandingPayments && member.outstandingPayments.length > 0) || member.outstandingPayments > 0) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle payment reminder
                    }}
                    className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Send Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.memberName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {transaction.memberType === 'organization' ? (
                          <Building2 size={12} className="mr-1" />
                        ) : (
                          <Users size={12} className="mr-1" />
                        )}
                        {transaction.memberType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.amount}</div>
                    <div className="text-sm text-gray-500">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.method === 'Paynow' && <Smartphone size={16} className="mr-2 text-blue-500" />}
                      {transaction.method === 'Credit Card' && <CreditCard size={16} className="mr-2 text-purple-500" />}
                      {transaction.method === 'Bank Transfer' && <Banknote size={16} className="mr-2 text-green-500" />}
                      {transaction.method === 'Cash' && <Wallet size={16} className="mr-2 text-orange-500" />}
                      <span className="text-sm text-gray-900">{transaction.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status === 'completed' && <CheckCircle size={10} className="mr-1" />}
                      {transaction.status === 'pending' && <Clock size={10} className="mr-1" />}
                      {transaction.status === 'failed' && <AlertCircle size={10} className="mr-1" />}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 transition-colors">
                        <Receipt size={16} />
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

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
            <p className="text-blue-100">Total Revenue Generated</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">+15.2%</h3>
            <p className="text-blue-100">Revenue Growth Rate</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <RefreshCw className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">91.7%</h3>
            <p className="text-blue-100">Average Renewal Rate</p>
          </div>
        </div>
      </div>

      {/* Member Financial Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                    selectedMember.memberType === 'organization' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {selectedMember.memberType === 'organization' ? (
                      <Building2 size={12} className="text-white" />
                    ) : (
                      <User size={12} className="text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMember.name}</h2>
                  <p className="text-gray-600">{selectedMember.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMember.tier === 'elite' ? 'bg-purple-100 text-purple-800' :
                      selectedMember.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedMember.tier} {selectedMember.memberType}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeMemberModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Total Paid</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">${selectedMember.totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-green-700">Lifetime payments</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Current Plan</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{selectedMember.currentSubscription.plan}</p>
                  <p className="text-sm text-blue-700">${selectedMember.currentSubscription.amount}/year</p>
                </div>
                <div className={`rounded-lg p-4 ${
                  selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className={`h-5 w-5 ${
                      selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <span className={`font-medium ${
                      selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 ? 'text-red-900' : 'text-gray-900'
                    }`}>Outstanding</span>
                  </div>
                  <p className={`text-2xl font-bold ${
                    selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    ${selectedMember.outstandingPayments ? selectedMember.outstandingPayments.reduce((sum, payment) => sum + payment.amount, 0) : 0}
                  </p>
                  <p className={`text-sm ${
                    selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 
                      ? `${selectedMember.outstandingPayments.length} overdue payments`
                      : 'All payments up to date'
                    }
                  </p>
                </div>
              </div>

              {/* Current Subscription Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <Award size={16} className="text-gray-400" />
                        <span className="text-gray-900">{selectedMember.currentSubscription.plan}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annual Amount</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-gray-900">${selectedMember.currentSubscription.amount}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-900">{format(new Date(selectedMember.currentSubscription.startDate), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-900">{format(new Date(selectedMember.currentSubscription.endDate), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        {selectedMember.currentSubscription.paymentMethod === 'Paynow' && <Smartphone size={16} className="text-gray-400" />}
                        {selectedMember.currentSubscription.paymentMethod === 'Credit Card' && <CreditCard size={16} className="text-gray-400" />}
                        {selectedMember.currentSubscription.paymentMethod === 'Bank Transfer' && <Banknote size={16} className="text-gray-400" />}
                        {selectedMember.currentSubscription.paymentMethod === 'Cash' && <Wallet size={16} className="text-gray-400" />}
                        <span className="text-gray-900">{selectedMember.currentSubscription.paymentMethod}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedMember.currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                          selectedMember.currentSubscription.status === 'expiring_soon' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedMember.currentSubscription.status === 'active' && <CheckCircle size={10} className="mr-1" />}
                          {selectedMember.currentSubscription.status === 'expiring_soon' && <Clock size={10} className="mr-1" />}
                          {selectedMember.currentSubscription.status === 'expired' && <AlertCircle size={10} className="mr-1" />}
                          {selectedMember.currentSubscription.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outstanding Payments */}
              {selectedMember.outstandingPayments && selectedMember.outstandingPayments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Payments</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    {selectedMember.outstandingPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg mb-3 last:mb-0">
                        <div>
                          <p className="font-medium text-red-900">{payment.description}</p>
                          <p className="text-sm text-red-700">Due: {format(new Date(payment.dueDate), 'MMM d, yyyy')}</p>
                          <p className="text-xs text-red-600">{payment.daysPastDue} days overdue</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-900">${payment.amount}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle size={10} className="mr-1" />
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {selectedMember.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            {payment.method === 'Paynow' && <Smartphone size={16} className="text-green-600" />}
                            {payment.method === 'Credit Card' && <CreditCard size={16} className="text-green-600" />}
                            {payment.method === 'Bank Transfer' && <Banknote size={16} className="text-green-600" />}
                            {payment.method === 'Cash' && <Wallet size={16} className="text-green-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.description}</p>
                            <p className="text-sm text-gray-600">{format(new Date(payment.date), 'MMM d, yyyy')} • {payment.method}</p>
                            <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${payment.amount}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle size={10} className="mr-1" />
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeMemberModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Send Payment Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}