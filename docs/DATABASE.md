# Estate Agents Council - Database Documentation

## Database Schema Overview

The Estate Agents Council application uses Supabase (PostgreSQL) with a comprehensive schema designed for real estate professional membership management.

## Core Tables

### 1. Profiles Table
Extends Supabase auth.users with additional profile information.

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location text,
  avatar_url text,
  role user_role DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Fields:**
- `id`: UUID linked to Supabase auth.users
- `name`: Full name of the user
- `email`: Email address (unique)
- `phone`: Contact phone number
- `location`: Geographic location
- `avatar_url`: Profile picture URL
- `role`: User role (admin, manager, member)

### 2. Organizations Table
Real estate firms and companies.

```sql
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location text,
  firm_registration_number text UNIQUE,
  firm_license_number text,
  principal_agent_id uuid REFERENCES profiles(id),
  organization_size text,
  industry text DEFAULT 'Real Estate',
  tier membership_tier DEFAULT 'basic',
  status registration_status DEFAULT 'pending',
  annual_subscription_paid boolean DEFAULT false,
  subscription_expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Key Features:**
- Links to principal agent (Principal Real Estate Agent)
- Tracks subscription status and expiry
- Supports different membership tiers
- Registration and license number tracking

### 3. Member Types Table
Defines different types of memberships available.

```sql
CREATE TABLE member_types (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category member_type_category NOT NULL,
  description text,
  requirements text[] DEFAULT '{}',
  annual_fee numeric(10,2) DEFAULT 0,
  benefits text[] DEFAULT '{}',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Default Member Types:**
- Real Estate Agent
- Property Negotiator  
- Principal Real Estate Agent
- Property Manager
- Real Estate Firm (organization)

### 4. Members Table
Individual member registrations and details.

```sql
CREATE TABLE members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  organization_id uuid REFERENCES organizations(id),
  member_type_id uuid REFERENCES member_types(id),
  real_estate_member_type real_estate_member_type,
  registration_number text UNIQUE,
  membership_tier membership_tier DEFAULT 'basic',
  registration_status registration_status DEFAULT 'pending',
  job_title text,
  department text,
  bio text,
  annual_subscription_paid boolean DEFAULT false,
  subscription_expiry_date date,
  join_date date DEFAULT CURRENT_DATE,
  last_active timestamptz DEFAULT now(),
  -- Educational qualifications
  educational_level text,
  ordinary_level_passes integer DEFAULT 0,
  has_english_and_math boolean DEFAULT false,
  advanced_level_passes integer DEFAULT 0,
  equivalent_qualification text,
  age integer,
  meets_requirements boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Educational Requirements:**
- O-Level and A-Level tracking
- English and Mathematics requirements
- Equivalent qualification support
- Age-based mature entry (27+ years)

### 5. CPD Events Table
Continuing Professional Development events and training.

```sql
CREATE TABLE cpd_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  start_time time,
  end_time time,
  duration_hours numeric(4,2) NOT NULL,
  event_type text DEFAULT 'workshop',
  format text DEFAULT 'in-person',
  location text,
  capacity integer DEFAULT 50,
  price numeric(10,2) DEFAULT 0,
  provider text,
  accreditation_number text,
  category text,
  cpd_accredited boolean DEFAULT true,
  status text DEFAULT 'upcoming',
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Event Types:**
- Workshop
- Seminar  
- Webinar
- Conference

**Formats:**
- In-person
- Virtual
- Hybrid

### 6. CPD Attendance Table
Tracks member attendance and CPD hours earned.

```sql
CREATE TABLE cpd_attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid REFERENCES members(id),
  event_id uuid REFERENCES cpd_events(id),
  attended boolean DEFAULT false,
  hours_earned numeric(4,2) DEFAULT 0,
  certificate_url text,
  attendance_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(member_id, event_id)
);
```

**CPD Compliance:**
- 40 hours annual requirement
- Automatic compliance status calculation
- Certificate generation and storage

### 7. Documents Table
Member and organization document management.

```sql
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid REFERENCES members(id),
  organization_id uuid REFERENCES organizations(id),
  document_type document_type NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size bigint,
  mime_type text,
  status document_status DEFAULT 'pending',
  uploaded_by uuid REFERENCES profiles(id),
  reviewed_by uuid REFERENCES profiles(id),
  review_notes text,
  uploaded_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Document Types:**
- Educational qualifications
- Proof of identity
- Birth certificate
- Trust account confirmation
- Annual return forms
- Certificate of incorporation
- CR6 and CR11 forms
- Tax clearance certificate
- Police clearance letters

### 8. Payments Table
Payment processing and billing records.

```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid REFERENCES members(id),
  organization_id uuid REFERENCES organizations(id),
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_method text,
  payment_reference text,
  status payment_status DEFAULT 'pending',
  description text,
  receipt_number text UNIQUE,
  payment_date date DEFAULT CURRENT_DATE,
  membership_period_start date,
  membership_period_end date,
  paynow_reference text,
  external_transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Payment Methods:**
- Paynow (Zimbabwe mobile money)
- PayPal
- Direct debit card
- Cash payments

### 9. Messages Table
Internal messaging system between members.

```sql
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  subject text,
  content text NOT NULL,
  read boolean DEFAULT false,
  read_at timestamptz,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
```

### 10. Notifications Table
System notifications for users.

```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);
```

## Enums and Types

### User Roles
```sql
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'member');
```

### Real Estate Member Types
```sql
CREATE TYPE real_estate_member_type AS ENUM (
  'real_estate_agent',
  'property_negotiator', 
  'principal_real_estate_agent',
  'property_manager'
);
```

### Membership Tiers
```sql
CREATE TYPE membership_tier AS ENUM ('basic', 'premium', 'elite');
```

### Registration Status
```sql
CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');
```

### Payment Status
```sql
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
```

## Database Functions

### 1. CPD Hours Calculation
```sql
CREATE OR REPLACE FUNCTION get_member_cpd_hours(
  member_uuid uuid, 
  year_filter integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)
)
RETURNS TABLE (
  current_year_hours numeric,
  total_hours numeric,
  annual_target numeric,
  compliance_status text
)
```

**Usage:**
```sql
SELECT * FROM get_member_cpd_hours('member-uuid', 2024);
```

### 2. Registration Number Generation
```sql
CREATE OR REPLACE FUNCTION generate_registration_number(
  member_type_param real_estate_member_type
)
RETURNS text
```

**Generated Formats:**
- Real Estate Agent: `RE-REA-2024-001`
- Property Negotiator: `RE-PN-2024-001`
- Principal Agent: `RE-PRI-2024-001`
- Property Manager: `RE-PM-2024-001`

## Row Level Security (RLS)

### Profile Access
- Users can view/update own profile
- Admins can view all profiles

### Organization Access
- Anyone can view approved organizations
- Admins can manage all organizations
- Principal agents can view own organization

### Member Access
- Users can view/update own member record
- Admins can manage all members
- Organization managers can view organization members

### CPD Events Access
- Anyone can view active CPD events
- Admins and managers can manage events

### Document Access
- Users can manage own documents
- Admins can manage all documents

### Payment Access
- Users can view own payments
- Admins can manage all payments

### Message Access
- Users can view own sent/received messages
- Users can send messages to other members

## Indexes for Performance

```sql
-- Profile indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Organization indexes
CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_organizations_principal_agent ON organizations(principal_agent_id);

-- Member indexes
CREATE INDEX idx_members_profile_id ON members(profile_id);
CREATE INDEX idx_members_organization_id ON members(organization_id);
CREATE INDEX idx_members_registration_status ON members(registration_status);

-- CPD indexes
CREATE INDEX idx_cpd_events_date ON cpd_events(event_date);
CREATE INDEX idx_cpd_events_status ON cpd_events(status);
CREATE INDEX idx_cpd_attendance_member_id ON cpd_attendance(member_id);

-- Document indexes
CREATE INDEX idx_documents_member_id ON documents(member_id);
CREATE INDEX idx_documents_status ON documents(status);

-- Payment indexes
CREATE INDEX idx_payments_member_id ON payments(member_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Message indexes
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
```

## Data Relationships

### User Hierarchy
```
auth.users (Supabase)
    ↓
profiles (Application users)
    ↓
members (Real estate professionals)
    ↓
organizations (Real estate firms)
```

### CPD Tracking
```
members
    ↓
cpd_attendance ← cpd_events
    ↓
certificates & compliance
```

### Document Management
```
members/organizations
    ↓
documents (uploaded files)
    ↓
approval workflow
```

### Payment Processing
```
members/organizations
    ↓
payments (billing records)
    ↓
subscription management
```

## Sample Queries

### Get Member with Organization
```sql
SELECT 
  m.*,
  p.name,
  p.email,
  o.name as organization_name,
  mt.name as member_type_name
FROM members m
JOIN profiles p ON m.profile_id = p.id
LEFT JOIN organizations o ON m.organization_id = o.id
LEFT JOIN member_types mt ON m.member_type_id = mt.id
WHERE m.id = 'member-uuid';
```

### Get Organization Members
```sql
SELECT 
  m.*,
  p.name,
  p.email,
  m.real_estate_member_type
FROM members m
JOIN profiles p ON m.profile_id = p.id
WHERE m.organization_id = 'organization-uuid'
  AND m.registration_status = 'approved';
```

### Get Member CPD Summary
```sql
SELECT 
  m.id,
  p.name,
  cpd.current_year_hours,
  cpd.total_hours,
  cpd.compliance_status
FROM members m
JOIN profiles p ON m.profile_id = p.id
CROSS JOIN LATERAL get_member_cpd_hours(m.id) cpd
WHERE m.registration_status = 'approved';
```

### Get Upcoming CPD Events
```sql
SELECT 
  ce.*,
  COUNT(ca.id) as registered_count
FROM cpd_events ce
LEFT JOIN cpd_attendance ca ON ce.id = ca.event_id
WHERE ce.event_date >= CURRENT_DATE
  AND ce.status = 'upcoming'
GROUP BY ce.id
ORDER BY ce.event_date ASC;
```

## Backup and Maintenance

### Daily Backup
```bash
# Backup database (if self-hosted)
pg_dump estate_agents_council > backup_$(date +%Y%m%d).sql

# For Supabase, use dashboard backup features
```

### Data Cleanup
```sql
-- Clean old notifications (older than 90 days)
DELETE FROM notifications 
WHERE created_at < NOW() - INTERVAL '90 days' 
  AND read = true;

-- Archive old messages (older than 1 year)
-- Move to archive table before deletion
```

### Performance Monitoring
```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public';

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

## Security Considerations

### Row Level Security
- All tables have RLS enabled
- Policies enforce data access based on user roles
- Organization-specific data isolation
- Admin override capabilities

### Data Encryption
- Sensitive data encrypted at rest (Supabase)
- SSL/TLS for data in transit
- API key rotation recommended

### Audit Trail
- All tables include created_at and updated_at
- Document review tracking
- Payment transaction logging

## Migration Strategy

### Adding New Fields
```sql
-- Example: Add new field to members table
ALTER TABLE members 
ADD COLUMN new_field text DEFAULT '';

-- Update RLS policies if needed
```

### Data Migration
```sql
-- Example: Migrate existing data
UPDATE members 
SET new_field = 'default_value' 
WHERE new_field IS NULL;
```

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**
   ```sql
   -- Check current policies
   SELECT * FROM pg_policies WHERE tablename = 'members';
   ```

2. **Performance Issues**
   ```sql
   -- Analyze query performance
   EXPLAIN ANALYZE SELECT * FROM members WHERE organization_id = 'uuid';
   ```

3. **Connection Issues**
   ```sql
   -- Check active connections
   SELECT * FROM pg_stat_activity;
   ```

### Monitoring Queries

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('estate_agents_council'));

-- Check table sizes
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename::regclass) DESC;

-- Check index usage
SELECT 
  indexrelname,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_tup_read DESC;
```

This database schema provides a robust foundation for the Estate Agents Council application with proper security, performance optimization, and scalability considerations.