export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          location: string | null
          avatar_url: string | null
          role: 'admin' | 'manager' | 'member'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone?: string | null
          location?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'member'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          location?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'member'
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          location: string | null
          firm_registration_number: string | null
          firm_license_number: string | null
          principal_agent_id: string | null
          organization_size: string | null
          industry: string | null
          tier: 'basic' | 'premium' | 'elite'
          status: 'pending' | 'approved' | 'rejected'
          annual_subscription_paid: boolean
          subscription_expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          location?: string | null
          firm_registration_number?: string | null
          firm_license_number?: string | null
          principal_agent_id?: string | null
          organization_size?: string | null
          industry?: string | null
          tier?: 'basic' | 'premium' | 'elite'
          status?: 'pending' | 'approved' | 'rejected'
          annual_subscription_paid?: boolean
          subscription_expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          location?: string | null
          firm_registration_number?: string | null
          firm_license_number?: string | null
          principal_agent_id?: string | null
          organization_size?: string | null
          industry?: string | null
          tier?: 'basic' | 'premium' | 'elite'
          status?: 'pending' | 'approved' | 'rejected'
          annual_subscription_paid?: boolean
          subscription_expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      member_types: {
        Row: {
          id: string
          name: string
          category: 'individual' | 'organization'
          description: string | null
          requirements: string[]
          annual_fee: number
          benefits: string[]
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'individual' | 'organization'
          description?: string | null
          requirements?: string[]
          annual_fee?: number
          benefits?: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'individual' | 'organization'
          description?: string | null
          requirements?: string[]
          annual_fee?: number
          benefits?: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      members: {
        Row: {
          id: string
          profile_id: string
          organization_id: string | null
          member_type_id: string | null
          real_estate_member_type: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager' | null
          registration_number: string | null
          membership_tier: 'basic' | 'premium' | 'elite'
          registration_status: 'pending' | 'approved' | 'rejected'
          job_title: string | null
          department: string | null
          bio: string | null
          annual_subscription_paid: boolean
          subscription_expiry_date: string | null
          join_date: string
          last_active: string
          educational_level: string | null
          ordinary_level_passes: number
          has_english_and_math: boolean
          advanced_level_passes: number
          equivalent_qualification: string | null
          age: number | null
          meets_requirements: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          organization_id?: string | null
          member_type_id?: string | null
          real_estate_member_type?: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager' | null
          registration_number?: string | null
          membership_tier?: 'basic' | 'premium' | 'elite'
          registration_status?: 'pending' | 'approved' | 'rejected'
          job_title?: string | null
          department?: string | null
          bio?: string | null
          annual_subscription_paid?: boolean
          subscription_expiry_date?: string | null
          join_date?: string
          last_active?: string
          educational_level?: string | null
          ordinary_level_passes?: number
          has_english_and_math?: boolean
          advanced_level_passes?: number
          equivalent_qualification?: string | null
          age?: number | null
          meets_requirements?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          organization_id?: string | null
          member_type_id?: string | null
          real_estate_member_type?: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager' | null
          registration_number?: string | null
          membership_tier?: 'basic' | 'premium' | 'elite'
          registration_status?: 'pending' | 'approved' | 'rejected'
          job_title?: string | null
          department?: string | null
          bio?: string | null
          annual_subscription_paid?: boolean
          subscription_expiry_date?: string | null
          join_date?: string
          last_active?: string
          educational_level?: string | null
          ordinary_level_passes?: number
          has_english_and_math?: boolean
          advanced_level_passes?: number
          equivalent_qualification?: string | null
          age?: number | null
          meets_requirements?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cpd_events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          start_time: string | null
          end_time: string | null
          duration_hours: number
          event_type: string
          format: string
          location: string | null
          capacity: number
          price: number
          provider: string | null
          accreditation_number: string | null
          category: string | null
          cpd_accredited: boolean
          status: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          start_time?: string | null
          end_time?: string | null
          duration_hours: number
          event_type?: string
          format?: string
          location?: string | null
          capacity?: number
          price?: number
          provider?: string | null
          accreditation_number?: string | null
          category?: string | null
          cpd_accredited?: boolean
          status?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          start_time?: string | null
          end_time?: string | null
          duration_hours?: number
          event_type?: string
          format?: string
          location?: string | null
          capacity?: number
          price?: number
          provider?: string | null
          accreditation_number?: string | null
          category?: string | null
          cpd_accredited?: boolean
          status?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cpd_attendance: {
        Row: {
          id: string
          member_id: string
          event_id: string
          attended: boolean
          hours_earned: number
          certificate_url: string | null
          attendance_date: string
          created_at: string
        }
        Insert: {
          id?: string
          member_id: string
          event_id: string
          attended?: boolean
          hours_earned?: number
          certificate_url?: string | null
          attendance_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          member_id?: string
          event_id?: string
          attended?: boolean
          hours_earned?: number
          certificate_url?: string | null
          attendance_date?: string
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          member_id: string | null
          organization_id: string | null
          document_type: 'educational_qualifications' | 'proof_of_identity' | 'birth_certificate' | 'additional_documents' | 'trust_account_confirmation' | 'annual_return_forms' | 'certificate_of_incorporation' | 'cr6_form' | 'cr11_forms' | 'tax_clearance_certificate' | 'police_clearance_letters'
          file_name: string
          file_url: string
          file_size: number | null
          mime_type: string | null
          status: 'pending' | 'approved' | 'rejected'
          uploaded_by: string | null
          reviewed_by: string | null
          review_notes: string | null
          uploaded_at: string
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id?: string | null
          organization_id?: string | null
          document_type: 'educational_qualifications' | 'proof_of_identity' | 'birth_certificate' | 'additional_documents' | 'trust_account_confirmation' | 'annual_return_forms' | 'certificate_of_incorporation' | 'cr6_form' | 'cr11_forms' | 'tax_clearance_certificate' | 'police_clearance_letters'
          file_name: string
          file_url: string
          file_size?: number | null
          mime_type?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          uploaded_by?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
          uploaded_at?: string
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string | null
          organization_id?: string | null
          document_type?: 'educational_qualifications' | 'proof_of_identity' | 'birth_certificate' | 'additional_documents' | 'trust_account_confirmation' | 'annual_return_forms' | 'certificate_of_incorporation' | 'cr6_form' | 'cr11_forms' | 'tax_clearance_certificate' | 'police_clearance_letters'
          file_name?: string
          file_url?: string
          file_size?: number | null
          mime_type?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          uploaded_by?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
          uploaded_at?: string
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          member_id: string | null
          organization_id: string | null
          amount: number
          currency: string
          payment_method: string | null
          payment_reference: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          description: string | null
          receipt_number: string | null
          payment_date: string
          membership_period_start: string | null
          membership_period_end: string | null
          paynow_reference: string | null
          external_transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          member_id?: string | null
          organization_id?: string | null
          amount: number
          currency?: string
          payment_method?: string | null
          payment_reference?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          description?: string | null
          receipt_number?: string | null
          payment_date?: string
          membership_period_start?: string | null
          membership_period_end?: string | null
          paynow_reference?: string | null
          external_transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          member_id?: string | null
          organization_id?: string | null
          amount?: number
          currency?: string
          payment_method?: string | null
          payment_reference?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          description?: string | null
          receipt_number?: string | null
          payment_date?: string
          membership_period_start?: string | null
          membership_period_end?: string | null
          paynow_reference?: string | null
          external_transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          subject: string | null
          content: string
          read: boolean
          read_at: string | null
          sent_at: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          subject?: string | null
          content: string
          read?: boolean
          read_at?: string | null
          sent_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          subject?: string | null
          content?: string
          read?: boolean
          read_at?: string | null
          sent_at?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_member_cpd_hours: {
        Args: {
          member_uuid: string
          year_filter?: number
        }
        Returns: {
          current_year_hours: number
          total_hours: number
          annual_target: number
          compliance_status: string
        }[]
      }
      generate_registration_number: {
        Args: {
          member_type_param: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager'
        }
        Returns: string
      }
    }
    Enums: {
      user_role: 'admin' | 'manager' | 'member'
      member_type_category: 'individual' | 'organization'
      real_estate_member_type: 'real_estate_agent' | 'property_negotiator' | 'principal_real_estate_agent' | 'property_manager'
      membership_tier: 'basic' | 'premium' | 'elite'
      registration_status: 'pending' | 'approved' | 'rejected'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      document_type: 'educational_qualifications' | 'proof_of_identity' | 'birth_certificate' | 'additional_documents' | 'trust_account_confirmation' | 'annual_return_forms' | 'certificate_of_incorporation' | 'cr6_form' | 'cr11_forms' | 'tax_clearance_certificate' | 'police_clearance_letters'
      document_status: 'pending' | 'approved' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}