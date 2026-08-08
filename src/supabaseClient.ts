/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Read configuration keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Export connection state flag
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Lazy client initialization to prevent crash on startup if credentials are not provided
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

import { 
  settingsHiveBox, 
  doctorsHiveBox, 
  servicesHiveBox, 
  galleryHiveBox 
} from './lib/hiveCache';

// DATA FETCHING & SYNC FUNCTIONS (Relying on Supabase Database with Hive local cache sync)

/**
 * Fetch clinic settings from Supabase and sync with Hive box
 */
export async function getSettings() {
  const cached = settingsHiveBox.get('clinic_data');
  if (!supabase) return cached || null;
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();
    
    if (error || !data) {
      console.warn('Supabase Settings fetch empty or error, using Hive cache:', error);
      return cached || null;
    }
    settingsHiveBox.put('clinic_data', data);
    return data;
  } catch (err) {
    console.error('Settings query error, falling back to Hive cache:', err);
    return cached || null;
  }
}

/**
 * Fetch all registered doctors from Supabase and sync with Hive box
 */
export async function getDoctors() {
  const cached = doctorsHiveBox.get('doctors_list');
  if (!supabase) return cached || [];
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error || !data) {
      console.warn('Supabase Doctors fetch empty or error, using Hive cache:', error);
      return cached || [];
    }
    doctorsHiveBox.put('doctors_list', data);
    return data;
  } catch (err) {
    console.error('Doctors query error, falling back to Hive cache:', err);
    return cached || [];
  }
}

/**
 * Fetch active clinical services from Supabase and sync with Hive box
 */
export async function getServices() {
  const cached = servicesHiveBox.get('services_list');
  if (!supabase) return cached || [];
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    
    if (error || !data) {
      console.warn('Supabase Services fetch empty or error, using Hive cache:', error);
      return cached || [];
    }
    servicesHiveBox.put('services_list', data);
    return data;
  } catch (err) {
    console.error('Services query error, falling back to Hive cache:', err);
    return cached || [];
  }
}

/**
 * Fetch clinic gallery photos from Supabase and sync with Hive box
 */
export async function getGallery() {
  const cached = galleryHiveBox.get('gallery_list');
  if (!supabase) return cached || [];
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data) {
      console.warn('Supabase Gallery fetch empty or error, using Hive cache:', error);
      return cached || [];
    }
    galleryHiveBox.put('gallery_list', data);
    return data;
  } catch (err) {
    console.error('Gallery query error, falling back to Hive cache:', err);
    return cached || [];
  }
}

/**
 * Helper to get or create a stable client-side device_id
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server-side';
  let id = localStorage.getItem('rifai_device_id');
  if (!id) {
    id = 'device-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
    localStorage.setItem('rifai_device_id', id);
  }
  return id;
}

/**
 * Book a new appointment
 */
export async function createAppointment(appointment: {
  patient_name: string;
  phone: string;
  email?: string;
  service_id?: string;
  preferred_language?: 'ar' | 'en';
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  device_id?: string;
}) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') };
  }
  try {
    const devId = appointment.device_id || getOrCreateDeviceId();
    
    // Generate a client-side UUID v4
    const appId = typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID 
      ? window.crypto.randomUUID() 
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });

    const newRow = {
      id: appId,
      device_id: devId,
      patient_name: appointment.patient_name,
      phone: appointment.phone,
      email: appointment.email || null,
      service_id: appointment.service_id || null,
      preferred_language: appointment.preferred_language || 'ar',
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      notes: appointment.notes || '',
      status: 'pending'
    };

    // ANTI-SPAM: Check if there's already a pending appointment with this phone number.
    // Note: Due to SELECT RLS restrictions, this check might return empty, but we still try.
    try {
      const { data: existing } = await supabase
        .from('appointments')
        .select('*')
        .eq('phone', appointment.phone)
        .eq('status', 'pending')
        .maybeSingle();

      if (existing) {
        console.log('Anti-spam: Syncing to existing pending booking instead of creating a duplicate');
        return { data: existing, error: null };
      }
    } catch (err) {
      console.warn('Error during anti-spam phone check, proceeding with creation:', err);
    }

    // Do NOT use .select() here because of RLS SELECT restrictions on the appointments table.
    const { error } = await supabase
      .from('appointments')
      .insert([newRow]);

    if (error) {
      console.error('Supabase Appointment creation error:', error);
      return { data: null, error };
    }

    // Since the database insert succeeded, we return the row we constructed
    return { data: newRow, error: null };
  } catch (err: any) {
    console.error('Appointment query exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Update an existing appointment (e.g. reschedule)
 */
export async function updateAppointment(id: string, appointment_date: string, appointment_time: string) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') };
  }
  try {
    // Do NOT use .select() here because of RLS SELECT restrictions on the appointments table.
    const { error } = await supabase
      .from('appointments')
      .update({ appointment_date, appointment_time })
      .eq('id', id);
    
    if (error) {
      console.error('Supabase Appointment update error:', error);
      return { data: null, error };
    }

    return { data: { id, appointment_date, appointment_time }, error: null };
  } catch (err: any) {
    console.error('Appointment update exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Cancel/Delete an existing appointment
 */
export async function cancelAppointment(id: string) {
  if (!supabase) {
    return { error: new Error('Supabase is not configured') };
  }
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase Appointment cancel error:', error);
      return { error };
    }
    return { error: null };
  } catch (err: any) {
    console.error('Appointment cancel exception:', err);
    return { error: err };
  }
}

/**
 * Fetch a single appointment by ID
 */
export async function getAppointment(id: string) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
