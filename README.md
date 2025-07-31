# Estate Agents Council - Professional Membership Portal

A comprehensive membership management system for real estate professionals, built with React, TypeScript, Tailwind CSS, and Supabase.

## 🏢 Features

### Member Management
- **Individual Members**: Real Estate Agents, Property Negotiators, Principal Agents, Property Managers
- **Organizations**: Real Estate Firms, Property Development Companies
- **Registration System**: Document upload, verification, and approval workflow
- **Educational Requirements**: O-Level, A-Level, and equivalent qualification tracking

### CPD (Continuing Professional Development)
- **Event Management**: Workshops, seminars, webinars
- **Attendance Tracking**: Automatic CPD hour calculation
- **Compliance Monitoring**: 40-hour annual requirement tracking
- **Certificate Generation**: Automated CPD certificates

### Multi-Portal System
- **Member Portal**: Personal dashboard, directory, events, resources
- **Admin Portal**: System administration, member approval, reporting
- **Organization Portal**: Firm management, member oversight, CPD tracking

### Payment Integration
- **Paynow Integration**: Zimbabwe mobile money payments
- **PayPal Support**: International payment processing
- **Subscription Management**: Annual membership renewals
- **Receipt Generation**: Automated billing and receipts

### Document Management
- **File Upload**: Secure document storage
- **Verification Workflow**: Admin review and approval
- **Certificate Generation**: Professional registration certificates
- **Compliance Tracking**: Required document monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/estate-agents-council.git
   cd estate-agents-council
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Setup Supabase database**
   - Create new Supabase project
   - Run migrations from `supabase/migrations/`
   - Configure authentication settings

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🗄️ Database Schema

### Core Tables
- **profiles**: User accounts and basic information
- **organizations**: Real estate firms and companies
- **members**: Individual member registrations
- **member_types**: Membership categories and requirements
- **cpd_events**: Training events and workshops
- **cpd_attendance**: Member participation tracking
- **documents**: File uploads and verification
- **payments**: Billing and subscription management
- **messages**: Internal communication system
- **notifications**: System alerts and updates

### Key Features
- **Row Level Security**: Secure data access based on user roles
- **Real-time Updates**: Live notifications and messaging
- **Automated Functions**: CPD calculation, registration numbers
- **Audit Trail**: Complete activity logging

## 👥 User Roles

### Member (Individual)
- Personal dashboard and profile management
- Event registration and CPD tracking
- Document upload and verification
- Member directory access
- Internal messaging system

### Manager (Principal Real Estate Agent)
- Organization member management
- Firm-specific reporting and analytics
- Event creation and management
- CPD oversight for organization members
- Billing and subscription management

### Admin (System Administrator)
- Complete system administration
- Member and organization approval
- System-wide reporting and analytics
- User management and permissions
- Payment processing oversight

## 🏗️ Architecture

### Frontend
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Lucide React**: Consistent iconography

### Backend
- **Supabase**: PostgreSQL database with real-time features
- **Row Level Security**: Database-level access control
- **Edge Functions**: Serverless API endpoints
- **Storage**: Secure file upload and management

### Deployment
- **Netlify**: Frontend hosting and deployment
- **Supabase**: Backend infrastructure
- **Custom Domain**: Professional branding
- **SSL/TLS**: Secure communications

## 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Progressive Web App**: App-like experience
- **Offline Support**: Basic functionality without internet
- **Touch-Friendly**: Mobile gesture support

## 🔐 Security Features

- **Authentication**: Email/password with optional 2FA
- **Authorization**: Role-based access control
- **Data Encryption**: End-to-end security
- **Audit Logging**: Complete activity tracking
- **GDPR Compliance**: Privacy and data protection

## 🌍 Internationalization

- **Multi-Currency**: USD, ZWL support
- **Payment Methods**: Regional payment integration
- **Localization**: Timezone and date formatting
- **Accessibility**: WCAG 2.1 compliance

## 📊 Analytics and Reporting

- **Member Analytics**: Registration trends and demographics
- **CPD Reporting**: Compliance tracking and certificates
- **Financial Reports**: Revenue and subscription analytics
- **Organization Insights**: Firm performance metrics

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── contexts/           # React context providers
├── lib/                # Utility functions and API clients
├── utils/              # Helper functions
└── types/              # TypeScript type definitions

supabase/
├── migrations/         # Database schema migrations
└── functions/          # Edge functions

docs/
├── INSTALLATION.md     # Server installation guide
├── DATABASE.md         # Database documentation
└── API.md             # API reference
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: TypeScript type checking

### Environment Variables
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PAYNOW_INTEGRATION_ID=your_paynow_id
VITE_PAYNOW_INTEGRATION_KEY=your_paynow_key
```

## 🚀 Deployment

### Production Deployment
1. **Build application**: `npm run build`
2. **Deploy to Netlify**: Automatic deployment from Git
3. **Configure environment**: Set production variables
4. **Setup custom domain**: Professional branding
5. **Enable SSL**: Secure communications

### Server Installation
See [INSTALLATION.md](docs/INSTALLATION.md) for complete Ubuntu 24.04 server setup guide.

## 📚 Documentation

- [Installation Guide](docs/INSTALLATION.md) - Ubuntu 24.04 server setup
- [Database Schema](docs/DATABASE.md) - Complete database documentation
- [API Reference](docs/API.md) - REST API endpoints and usage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the docs/ directory
- **Issues**: GitHub Issues for bug reports
- **Email**: support@estateagentscouncil.com
- **Phone**: +1 (555) 123-4567

## 🙏 Acknowledgments

- **Supabase**: Backend infrastructure and database
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide**: Beautiful icon library
- **React**: Frontend framework
- **Vite**: Build tool and development server

---

**Estate Agents Council** - Empowering real estate professionals through technology and community.