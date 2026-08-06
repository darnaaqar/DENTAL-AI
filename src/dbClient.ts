/// <reference types="vite/client" />
import { 
  getFirebaseSettings, 
  getFirebaseDoctors, 
  getFirebaseServices, 
  getFirebaseGallery,
  createAppointmentFirestore,
  updateAppointmentFirestore,
  cancelAppointmentFirestore,
  getAppointmentFirestore,
  forceSyncAllAppDataToFirebase,
  DEFAULT_SETTINGS,
  DEFAULT_DOCTORS,
  DEFAULT_SERVICES,
  DEFAULT_GALLERY
} from './firebase';

export { forceSyncAllAppDataToFirebase };

// Primary Database Configuration Flag for Firebase Firestore
export const isFirebaseConfigured = true;

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
 * Fetch clinic settings from Firebase Firestore
 */
export async function getSettings() {
  try {
    const data = await getFirebaseSettings();
    return data || DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Settings query error, using fallback:', err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Fetch all registered doctors from Firebase Firestore
 */
export async function getDoctors() {
  try {
    const data = await getFirebaseDoctors();
    return data && data.length > 0 ? data : DEFAULT_DOCTORS;
  } catch (err) {
    console.error('Doctors query error, using fallback:', err);
    return DEFAULT_DOCTORS;
  }
}

/**
 * Fetch active clinical services from Firebase Firestore
 */
export async function getServices() {
  try {
    const data = await getFirebaseServices();
    return data && data.length > 0 ? data : DEFAULT_SERVICES;
  } catch (err) {
    console.error('Services query error, using fallback:', err);
    return DEFAULT_SERVICES;
  }
}

/**
 * Fetch clinic gallery photos from Firebase Firestore
 */
export async function getGallery() {
  try {
    const data = await getFirebaseGallery();
    return data && data.length > 0 ? data : DEFAULT_GALLERY;
  } catch (err) {
    console.error('Gallery query error, using fallback:', err);
    return DEFAULT_GALLERY;
  }
}

/**
 * Book a new appointment in Firebase Firestore
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
  try {
    const devId = appointment.device_id || getOrCreateDeviceId();
    const newAppointment = await createAppointmentFirestore({
      ...appointment,
      device_id: devId
    });
    return { data: newAppointment, error: null };
  } catch (err: any) {
    console.error('Firebase Appointment creation error:', err);
    return { data: null, error: err };
  }
}

/**
 * Update an existing appointment (e.g. reschedule) in Firebase Firestore
 */
export async function updateAppointment(id: string, appointment_date: string, appointment_time: string) {
  try {
    const data = await updateAppointmentFirestore(id, appointment_date, appointment_time);
    return { data, error: null };
  } catch (err: any) {
    console.error('Firebase Appointment update error:', err);
    return { data: null, error: err };
  }
}

/**
 * Cancel/Delete an existing appointment in Firebase Firestore
 */
export async function cancelAppointment(id: string) {
  try {
    await cancelAppointmentFirestore(id);
    return { error: null };
  } catch (err: any) {
    console.error('Firebase Appointment cancel error:', err);
    return { error: err };
  }
}

/**
 * Fetch a single appointment by ID from Firebase Firestore
 */
export async function getAppointment(id: string) {
  try {
    const data = await getAppointmentFirestore(id);
    return data;
  } catch {
    return null;
  }
}
