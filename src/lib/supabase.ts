import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) throw error;
  return data;
};

export const getCurrentMember = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('members')
    .select(`
      *,
      organization:organizations(*),
      member_type:member_types(*)
    `)
    .eq('profile_id', user.id)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getMemberCPDHours = async (memberId: string, year?: number) => {
  const { data, error } = await supabase
    .rpc('get_member_cpd_hours', {
      member_uuid: memberId,
      year_filter: year || new Date().getFullYear()
    });
    
  if (error) throw error;
  return data[0];
};

export const getOrganizationMembers = async (organizationId: string) => {
  const { data, error } = await supabase
    .from('members')
    .select(`
      *,
      profile:profiles(*),
      member_type:member_types(*)
    `)
    .eq('organization_id', organizationId);
    
  if (error) throw error;
  return data;
};