import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Building2,
  User,
  Wallet,
  Smartphone,
  Globe,
  Receipt,
  RefreshCw,
  Shield,
  Award,
  ExternalLink,
  Loader
} from 'lucide-react';
import { format, addYears } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { PaynowService, PaynowPaymentData } from '../utils/paynow';

const membershipPlans = [
  {
    id: 'individual_basic',
    name: 'Individual Basic',
    type: 'individual',
    price: 150,
    features: [
      'Access to member directory',
      'Monthly newsletter',
      'Basic event access',
      'Community forum access',
      'CPD tracking and certificates',
      'Professional networking opportunities'
    ],
    color: 'gray',
    popular: false
  },
  {
    id: 'individual_premium',
    name: 'Individual Premium',
    type: 'individual',
    price: 250,
    features: [
      'Everything in Basic',
      'Priority event registration',
      'Advanced CPD workshops',
      'Professional development resources',
      'Direct messaging with members',
      'Exclusive networking events',
      'Career advancement support'
    ],
    color: 'blue',
    popular: true
  },
  {
    id: 'individual_elite',
    name: 'Individual Elite',
    type: 'individual',
    price: 400,
    features: [
      'Everything in Premium',
      'VIP event access',
      'One-on-one mentorship',
      'Advanced market analytics',
      'Custom professional profile',
      'Private member lounge access',
      'Priority customer support'
    ],
    color: 'purple',
    popular: false
  },
  {
    id: 'firm_basic',
    name: 'Real Estate Firm Basic',
    type: 'organization',
    price: 500,
    features: [
      'Up to 10 individual members',
      'Firm directory listing',
      'Basic event access for all members',
      'Bulk CPD tracking',
      'Team management tools',
      'Firm branding opportunities'
    ],
    color: 'green',
    popular: false
  },
  {
    id: 'firm_premium',
    name: 'Real Estate Firm Premium',
    type: 'organization',
    price: 800,
    features: [
      'Up to 25 individual members',
      'Everything in Firm Basic',
      'Priority event registration',
      'Advanced team analytics',
      'Custom training programs',
      'Dedicated account manager',
      'Marketing support'
    ],
    color: 'blue',
    popular: true
  },
  {
    id: 'firm_enterprise',
    name: 'Real Estate Firm Enterprise',
    type: 'organization',
    price: 1200,
    features: [
      'Unlimited individual members',
      'Everything in Firm Premium',
      'Custom integration support',
      'White-label solutions',
      'Advanced reporting suite',
      'Priority technical support',
      'Custom contract terms'
    ],
    color: 'purple',
    popular: false
  }
];

const paymentHistory = [
  {
    id: 1,
    date: '2024-01-15',
    amount: 250,
    method: 'Online - Paynow',
    status: 'completed',
    description: 'Annual Membership Renewal - Individual Premium',
    receiptNumber: 'REC-2024-001',
    membershipPeriod: '2024-01-15 to 2025-01-14'
  },
  {
    id: 2,
    date: '2023-01-15',
    amount: 250,
    method: 'Direct Debit Card',
    status: 'completed',
    description: 'Annual Membership Renewal - Individual Premium',
    receiptNumber: 'REC-2023-045',
    membershipPeriod: '2023-01-15 to 2024-01-14'
  },
  {
    id: 3,
    date: '2022-02-01',
    amount: 150,
    method: 'Cash',
    status: 'completed',
    description: 'Initial Membership Registration - Individual Basic',
    receiptNumber: 'REC-2022-089',
    membershipPeriod: '2022-02-01 to 2023-01-31'
  }
];

const stats = [
  {
    name: 'Current Membership',
    value: 'Individual Premium',
    change: 'Active',
    icon: Award,
    color: 'blue'
  },
  {
    name: 'Member Since',
    value: 'Feb 2022',
    change: '2+ years',
    icon: Calendar,
    color: 'green'
  },
  {
    name: 'Total Paid',
    value: '$650',
    change: '3 payments',
    icon: DollarSign,
    color: 'purple'
  },
  {
    name: 'Next Renewal',
    value: 'Jan 15, 2025',
    change: '11 months',
    icon: RefreshCw,
    color: 'orange'
  }
];

export default function Subscriptions() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online-paynow');
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('individual_premium');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { user } = useAuth();

  const currentPlan = membershipPlans.find(plan => plan.id === 'individual_premium');
  const membershipExpiry = new Date('2025-01-15');
  const isExpiringSoon = (membershipExpiry.getTime() - new Date().getTime()) < (30 * 24 * 60 * 60 * 1000); // 30 days

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash Payment',
      description: 'Pay at our office during business hours',
      icon: Wallet,
      available: true
    },
    {
      id: 'online-paynow',
      name: 'Paynow',
      description: 'Instant payment via Paynow mobile money',
      icon: Smartphone,
      available: true
    },
    {
      id: 'online-paypal',
      name: 'PayPal',
      description: 'Secure online payment via PayPal',
      icon: Globe,
      available: true
    },
    {
      id: 'debit-card',
      name: 'Direct Debit Card',
      description: 'Automatic payment from your debit card',
      icon: CreditCard,
      available: true
    }
  ];

  const handleRenewal = () => {
    setShowRenewalModal(true);
    setPaymentError(null);
  };

  const processPayment = async () => {
    if (!user) return;
    
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      const selectedPlanData = membershipPlans.find(p => p.id === selectedPlan);
      if (!selectedPlanData) throw new Error('Selected plan not found');

      if (selectedPaymentMethod === 'online-paynow') {
        // Process Paynow payment
        const paymentData: PaynowPaymentData = {
          reference: PaynowService.generateReference(user.name, selectedPlanData.name),
          amount: PaynowService.formatAmount(selectedPlanData.price),
          additionalInfo: `${selectedPlanData.name} - Annual Membership Renewal`,
          returnUrl: `${window.location.origin}/subscriptions?payment=success`,
          resultUrl: `${window.location.origin}/api/paynow/callback`,
          email: user.email,
          phone: user.phone || undefined
        };

        const paymentUrl = await PaynowService.initiatePayment(paymentData);
        
        // Redirect to Paynow payment page
        window.location.href = paymentUrl;
        
      } else if (selectedPaymentMethod === 'online-paypal') {
        // Handle PayPal payment
        console.log('Processing PayPal payment...');
        // Implement PayPal integration here
        
      } else if (selectedPaymentMethod === 'debit-card') {
        // Handle Direct Debit Card setup
        console.log('Setting up Direct Debit Card...');
        // Implement card processing here
        
      } else if (selectedPaymentMethod === 'cash') {
        // Handle cash payment instructions
        alert('Please visit our office during business hours (8:00 AM - 5:00 PM) to complete your cash payment. Bring this reference number: ' + PaynowService.generateReference(user.name, selectedPlanData.name));
        setShowRenewalModal(false);
      }
      
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentError(error instanceof Error ? error.message : 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Membership Subscription</h1>
          <p className="text-gray-600">Manage your membership and subscription details</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRenewal}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Renew Membership
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            Download Receipt
          </button>
        </div>
      </div>

      {/* Membership Status Alert */}
      {isExpiringSoon && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Membership Expiring Soon</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Your membership expires on {format(membershipExpiry, 'MMMM d, yyyy')}. 
                Renew now to avoid service interruption.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{stat.change}</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Membership Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Membership Details</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Information</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Member Type:</span>
                    <p className="font-medium text-gray-900 capitalize">{user?.memberType}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Registration Number:</span>
                    <p className="font-medium text-gray-900">{user?.registrationNumber || 'RE-IND-2024-001'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Real Estate Firm:</span>
                    <p className="font-medium text-gray-900">{user?.organizationName || 'TechCorp Solutions'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Registration Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Details</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Current Plan:</span>
                    <p className="font-medium text-blue-600">{currentPlan?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Annual Fee:</span>
                    <p className="font-medium text-gray-900">${currentPlan?.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Registered:</span>
                    <p className="font-medium text-gray-900">{format(new Date(user?.joinDate || '2024-01-15'), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Expires:</span>
                    <p className={`font-medium ${isExpiringSoon ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {format(membershipExpiry, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Subscription Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Active
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Auto-Renewal:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Disabled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Membership Benefits</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(payment.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                      <div className="text-sm text-gray-500">{payment.membershipPeriod}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {payment.method.includes('Online') ? (
                        <Smartphone size={16} className="mr-2 text-blue-500" />
                      ) : payment.method.includes('Card') ? (
                        <CreditCard size={16} className="mr-2 text-purple-500" />
                      ) : (
                        <Wallet size={16} className="mr-2 text-green-500" />
                      )}
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                      <Receipt size={14} className="mr-1" />
                      {payment.receiptNumber}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renewal Modal */}
      {showRenewalModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Renew Membership</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Membership Plan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {membershipPlans.filter(plan => plan.type === user?.memberType).map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{plan.name}</h4>
                        <span className="text-lg font-bold text-gray-900">${plan.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">Annual subscription</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => method.available && setSelectedPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Membership Period:</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date(), 'MMM d, yyyy')} - {format(addYears(new Date(), 1), 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${membershipPlans.find(p => p.id === selectedPlan)?.price}
                  </span>
                </div>
                {selectedPaymentMethod === 'online-paynow' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-sm text-blue-800">
                      <Smartphone size={16} className="mr-2" />
                      <span className="font-medium">Paynow Payment</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      You will be redirected to Paynow to complete your payment securely.
                    </p>
                  </div>
                )}
                {selectedPaymentMethod === 'cash' && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-sm text-green-800">
                      <Wallet size={16} className="mr-2" />
                      <span className="font-medium">Cash Payment</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Visit our office during business hours: Monday-Friday, 8:00 AM - 5:00 PM
                    </p>
                  </div>
                )}
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center text-sm text-red-800">
                    <AlertCircle size={16} className="mr-2" />
                    <span className="font-medium">Payment Error</span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">{paymentError}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRenewalModal(false)}
                  disabled={isProcessingPayment}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  disabled={isProcessingPayment}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader size={16} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : selectedPaymentMethod === 'online-paynow' ? (
                    <>
                      <ExternalLink size={16} className="mr-2" />
                      Proceed to Payment
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}