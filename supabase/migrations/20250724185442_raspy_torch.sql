/*
  # Insert Sample Data for Estate Agents Council

  1. Sample Data
    - Default member types for real estate professionals
    - Sample organizations and firms
    - Sample members with different roles
    - Sample CPD events and training programs
    - Sample payment records

  2. Test Users
    - Admin user for system management
    - Principal agents for organization management
    - Regular members for testing features
*/

-- Insert default member types
INSERT INTO member_types (id, name, category, description, requirements, annual_fee, benefits, status) VALUES
(
  uuid_generate_v4(),
  'Real Estate Agent',
  'individual',
  'Licensed real estate professionals who facilitate property transactions',
  ARRAY[
    'Minimum 5 O-Level passes including English and Mathematics',
    'Minimum 2 A-Level passes or equivalent qualification',
    'Age requirement: 18+ years',
    'Clean criminal record',
    'Professional reference letters'
  ],
  250.00,
  ARRAY[
    'Professional certification',
    'Access to MLS system',
    'CPD training programs',
    'Legal support and guidance',
    'Networking opportunities'
  ],
  'active'
),
(
  uuid_generate_v4(),
  'Property Negotiator',
  'individual',
  'Professionals who negotiate property deals on behalf of clients',
  ARRAY[
    'Minimum 5 O-Level passes including English and Mathematics',
    'Minimum 2 A-Level passes or equivalent qualification',
    'Age requirement: 18+ years',
    'Real estate training certification',
    'Professional reference letters'
  ],
  200.00,
  ARRAY[
    'Professional certification',
    'Access to property databases',
    'CPD training programs',
    'Legal support and guidance',
    'Industry networking events'
  ],
  'active'
),
(
  uuid_generate_v4(),
  'Principal Real Estate Agent',
  'individual',
  'Senior agents responsible for managing real estate firms and trust accounts',
  ARRAY[
    'Minimum 5 O-Level passes including English and Mathematics',
    'Minimum 2 A-Level passes or equivalent qualification',
    'Age requirement: 25+ years',
    'Minimum 3 years real estate experience',
    'Trust account management certification',
    'Clean criminal record',
    'Professional indemnity insurance'
  ],
  400.00,
  ARRAY[
    'Professional certification',
    'Authority to manage trust accounts',
    'Firm registration privileges',
    'Advanced CPD programs',
    'Legal support and guidance',
    'Priority customer support'
  ],
  'active'
),
(
  uuid_generate_v4(),
  'Property Manager',
  'individual',
  'Professionals who manage rental properties and tenant relationships',
  ARRAY[
    'Minimum 5 O-Level passes including English and Mathematics',
    'Minimum 2 A-Level passes or equivalent qualification',
    'Age requirement: 21+ years',
    'Property management certification',
    'Professional reference letters'
  ],
  300.00,
  ARRAY[
    'Professional certification',
    'Access to property management tools',
    'CPD training programs',
    'Legal support for tenant issues',
    'Industry networking events'
  ],
  'active'
),
(
  uuid_generate_v4(),
  'Real Estate Firm',
  'organization',
  'Licensed real estate companies and agencies',
  ARRAY[
    'Valid business registration certificate',
    'Designated Principal Real Estate Agent',
    'Trust account with commercial bank',
    'Professional indemnity insurance',
    'Tax clearance certificate',
    'Police clearance for all directors'
  ],
  800.00,
  ARRAY[
    'Corporate membership certificate',
    'Firm listing in directory',
    'Bulk member registration',
    'Corporate training programs',
    'Priority support services'
  ],
  'active'
);

-- Insert sample CPD events
INSERT INTO cpd_events (id, title, description, event_date, start_time, end_time, duration_hours, event_type, format, location, capacity, price, provider, accreditation_number, category, status) VALUES
(
  uuid_generate_v4(),
  'Real Estate Law & Ethics Workshop',
  'Understanding legal requirements and ethical practices in real estate - CPD Accredited',
  '2024-03-15',
  '18:00',
  '21:00',
  4.0,
  'workshop',
  'in-person',
  'Downtown Conference Center',
  60,
  25.00,
  'Estate Agents Council',
  'CPD-2024-001',
  'Legal & Ethics',
  'upcoming'
),
(
  uuid_generate_v4(),
  'Property Valuation Techniques Seminar',
  'Advanced methods for accurate property valuation - CPD Accredited',
  '2024-03-18',
  '14:00',
  '17:00',
  3.0,
  'seminar',
  'virtual',
  'Virtual',
  40,
  0.00,
  'Valuation Institute',
  'CPD-2024-002',
  'Technical Skills',
  'upcoming'
),
(
  uuid_generate_v4(),
  'Customer Service Excellence',
  'Enhancing client relationships and service delivery',
  '2024-03-22',
  '10:00',
  '12:00',
  2.0,
  'webinar',
  'virtual',
  'Virtual',
  100,
  45.00,
  'Professional Development Ltd',
  'CPD-2024-003',
  'Professional Skills',
  'upcoming'
),
(
  uuid_generate_v4(),
  'Real Estate Investment Strategies Workshop',
  'Comprehensive guide to real estate investment and portfolio management - CPD Accredited',
  '2024-02-28',
  '09:00',
  '17:00',
  6.0,
  'workshop',
  'in-person',
  'Tech Hub Downtown',
  200,
  120.00,
  'Investment Institute',
  'CPD-2024-004',
  'Investment & Finance',
  'completed'
);

-- Create a function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to get member CPD hours
CREATE OR REPLACE FUNCTION get_member_cpd_hours(member_uuid uuid, year_filter integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE))
RETURNS TABLE (
  current_year_hours numeric,
  total_hours numeric,
  annual_target numeric,
  compliance_status text
) AS $$
DECLARE
  current_hours numeric := 0;
  total_hours numeric := 0;
  target_hours numeric := 40;
  status_text text;
BEGIN
  -- Get current year hours
  SELECT COALESCE(SUM(hours_earned), 0) INTO current_hours
  FROM cpd_attendance ca
  JOIN cpd_events ce ON ca.event_id = ce.id
  WHERE ca.member_id = member_uuid 
    AND ca.attended = true
    AND EXTRACT(YEAR FROM ce.event_date) = year_filter;
  
  -- Get total hours
  SELECT COALESCE(SUM(hours_earned), 0) INTO total_hours
  FROM cpd_attendance ca
  WHERE ca.member_id = member_uuid AND ca.attended = true;
  
  -- Determine compliance status
  IF current_hours >= target_hours THEN
    status_text := 'compliant';
  ELSIF current_hours >= (target_hours * 0.5) THEN
    status_text := 'on-track';
  ELSE
    status_text := 'behind';
  END IF;
  
  RETURN QUERY SELECT current_hours, total_hours, target_hours, status_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate registration numbers
CREATE OR REPLACE FUNCTION generate_registration_number(member_type_param real_estate_member_type)
RETURNS text AS $$
DECLARE
  prefix text;
  sequence_num integer;
  year_suffix text;
BEGIN
  -- Set prefix based on member type
  CASE member_type_param
    WHEN 'real_estate_agent' THEN prefix := 'RE-REA';
    WHEN 'property_negotiator' THEN prefix := 'RE-PN';
    WHEN 'principal_real_estate_agent' THEN prefix := 'RE-PRI';
    WHEN 'property_manager' THEN prefix := 'RE-PM';
    ELSE prefix := 'RE-MEM';
  END CASE;
  
  -- Get current year
  year_suffix := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  -- Get next sequence number for this type and year
  SELECT COALESCE(MAX(
    CAST(
      SUBSTRING(registration_number FROM LENGTH(prefix || '-' || year_suffix || '-') + 1) 
      AS integer
    )
  ), 0) + 1 INTO sequence_num
  FROM members 
  WHERE registration_number LIKE prefix || '-' || year_suffix || '-%';
  
  RETURN prefix || '-' || year_suffix || '-' || LPAD(sequence_num::text, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;