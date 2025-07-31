/*
  # Estate Agents Council Database Schema

  1. New Tables
    - `profiles` - User profile information
    - `organizations` - Real estate organizations and firms
    - `member_types` - Different types of memberships available
    - `members` - Individual member registrations
    - `cpd_events` - Continuing Professional Development events
    - `cpd_attendance` - Member attendance at CPD events
    - `documents` - Member document uploads
    - `payments` - Payment records and billing
    - `messages` - Internal messaging system
    - `notifications` - System notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Organization-specific access controls
    - Admin and manager permissions

  3. Features
    - Real estate member type management
    - CPD hour tracking and compliance
    - Document management system
    - Payment processing integration
    - Multi-organization support
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'member');
CREATE TYPE member_type_category AS ENUM ('individual', 'organization');
CREATE TYPE real_estate_member_type AS ENUM ('real_estate_agent', 'property_negotiator', 'principal_real_estate_agent', 'property_manager');
CREATE TYPE membership_tier AS ENUM ('basic', 'premium', 'elite');
CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE document_type AS ENUM ('educational_qualifications', 'proof_of_identity', 'birth_certificate', 'additional_documents', 'trust_account_confirmation', 'annual_return_forms', 'certificate_of_incorporation', 'cr6_form', 'cr11_forms', 'tax_clearance_certificate', 'police_clearance_letters');
CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location text,
  avatar_url text,
  role user_role DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
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

-- Member types table
CREATE TABLE IF NOT EXISTS member_types (
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

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
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
  -- Educational qualifications for individuals
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

-- CPD Events table
CREATE TABLE IF NOT EXISTS cpd_events (
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

-- CPD Attendance table
CREATE TABLE IF NOT EXISTS cpd_attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid REFERENCES members(id) ON DELETE CASCADE,
  event_id uuid REFERENCES cpd_events(id) ON DELETE CASCADE,
  attended boolean DEFAULT false,
  hours_earned numeric(4,2) DEFAULT 0,
  certificate_url text,
  attendance_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(member_id, event_id)
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id uuid REFERENCES members(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
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

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
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

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject text,
  content text NOT NULL,
  read boolean DEFAULT false,
  read_at timestamptz,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpd_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpd_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Organizations policies
CREATE POLICY "Anyone can view active organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Admins can manage all organizations"
  ON organizations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Principal agents can view own organization"
  ON organizations FOR SELECT
  TO authenticated
  USING (principal_agent_id = auth.uid());

-- Member types policies
CREATE POLICY "Anyone can view active member types"
  ON member_types FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Admins can manage member types"
  ON member_types FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Members policies
CREATE POLICY "Users can view own member record"
  ON members FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can update own member record"
  ON members FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can manage all members"
  ON members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Organization managers can view organization members"
  ON members FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations 
      WHERE principal_agent_id = auth.uid()
    )
  );

-- CPD Events policies
CREATE POLICY "Anyone can view active CPD events"
  ON cpd_events FOR SELECT
  TO authenticated
  USING (status = 'upcoming' OR status = 'completed');

CREATE POLICY "Admins and managers can manage CPD events"
  ON cpd_events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND (role = 'admin' OR role = 'manager')
    )
  );

-- CPD Attendance policies
CREATE POLICY "Users can view own CPD attendance"
  ON cpd_attendance FOR SELECT
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM members WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all CPD attendance"
  ON cpd_attendance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Documents policies
CREATE POLICY "Users can manage own documents"
  ON documents FOR ALL
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM members WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all documents"
  ON documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    member_id IN (
      SELECT id FROM members WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Messages policies
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update own sent messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_principal_agent ON organizations(principal_agent_id);
CREATE INDEX IF NOT EXISTS idx_members_profile_id ON members(profile_id);
CREATE INDEX IF NOT EXISTS idx_members_organization_id ON members(organization_id);
CREATE INDEX IF NOT EXISTS idx_members_registration_status ON members(registration_status);
CREATE INDEX IF NOT EXISTS idx_cpd_events_date ON cpd_events(event_date);
CREATE INDEX IF NOT EXISTS idx_cpd_events_status ON cpd_events(status);
CREATE INDEX IF NOT EXISTS idx_cpd_attendance_member_id ON cpd_attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_documents_member_id ON documents(member_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_member_types_updated_at BEFORE UPDATE ON member_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cpd_events_updated_at BEFORE UPDATE ON cpd_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();