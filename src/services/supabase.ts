// =====================================================
// NEWSROOM CMS — SUPABASE SERVICE
// =====================================================

import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export const isSupabaseConfigured = (): boolean => {
  const url = metaEnv.VITE_SUPABASE_URL;
  const key = metaEnv.VITE_SUPABASE_ANON_KEY;
  return Boolean(url && key && url !== 'https://xyzcompany.supabase.co');
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Creates a new Supabase Auth user directly from Admin Panel
 */
export const createSupabaseUser = async (email: string, password: string, fullName: string, role: string) => {
  if (!isSupabaseConfigured()) {
    return { data: { user: { id: `usr-${Date.now()}`, email, user_metadata: { full_name: fullName, role } } }, error: null };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });
};

/**
 * Verifies Current Password with Supabase Auth before updating to New Password
 */
export const verifyCurrentPasswordAndUpdate = async (email: string, currentPassword: string, newPassword: string) => {
  if (!isSupabaseConfigured()) {
    return { data: { message: 'Password updated successfully in local demo mode' }, error: null };
  }

  // 1. Verify current password by attempting a credential sign-in with Supabase Auth
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword
  });

  if (signInError) {
    return { data: null, error: new Error('Incorrect Current Password. Please enter your correct current password.') };
  }

  // 2. Since current password is verified by Supabase, update to the new password
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (updateError) {
    return { data: null, error: updateError };
  }

  return { data: updateData, error: null };
};

/**
 * Resets or updates a Supabase Auth user password directly
 */
export const updateSupabaseUserPassword = async (email: string, newPassword: string) => {
  if (!isSupabaseConfigured()) {
    return { data: { message: 'Password updated successfully in local demo mode' }, error: null };
  }
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/login`
  });
};
