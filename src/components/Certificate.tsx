import React from 'react';
import { Award, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

export default function Certificate() {
  const { user } = useAuth();

  if (!user) return null;

  const registrationDate = new Date(user.joinDate);
  const expiryDate = new Date(registrationDate.getFullYear() + 1, registrationDate.getMonth(), registrationDate.getDate());
  
  // Generate QR code data
  const qrData = `REG:${user.registrationNumber}|NAME:${user.name}|TYPE:${user.memberType}|DATE:${format(registrationDate, 'yyyy-MM-dd')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
          {/* Header with Logo */}
          <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mr-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ESTATE AGENTS COUNCIL</h1>
                <p className="text-sm text-gray-600">Professional Regulatory Body</p>
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">CERTIFICATE OF REGISTRATION</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded"></div>
          </div>

          {/* Certificate Content */}
          <div className="text-center mb-8 space-y-6">
            <p className="text-lg text-gray-700">This is to certify that</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mx-auto max-w-2xl">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{user.name}</h3>
              {user.organizationName && (
                <p className="text-lg text-gray-700 mb-2">of {user.organizationName}</p>
              )}
              <p className="text-gray-600">
                is registered as a <span className="font-semibold capitalize">{user.memberType} Member</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-left">
                <p className="text-sm text-gray-600">Registration Number:</p>
                <p className="text-lg font-bold text-gray-900">{user.registrationNumber}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Membership Type:</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{user.membershipTier}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Date of Registration:</p>
                <p className="text-lg font-bold text-gray-900">{format(registrationDate, 'MMMM d, yyyy')}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Date of Expiry:</p>
                <p className="text-lg font-bold text-gray-900">{format(expiryDate, 'MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mb-8">
            <img 
              src={qrCodeUrl} 
              alt="Certificate QR Code" 
              className="mx-auto border border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 mt-2">Scan to verify certificate authenticity</p>
          </div>

          {/* Signature Section */}
          <div className="flex justify-between items-end mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="w-48 border-b border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Date of Issue</p>
              <p className="text-sm font-medium">{format(registrationDate, 'MMMM d, yyyy')}</p>
            </div>
            <div className="text-center">
              <div className="w-48 border-b border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Registrar's Signature</p>
              <p className="text-sm font-medium">Estate Agents Council</p>
            </div>
          </div>

          {/* Download Button - Hidden in print */}
          <div className="text-center mt-8 print:hidden">
            <button
              onClick={handleDownload}
              className="flex items-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} className="mr-2" />
              Download Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:p-0 { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}