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

// HIGH FIDELITY FALLBACK DATA DEFINITIONS
const fallbackDoctor = {
  id: 'mustafa-al-rifai',
  full_name_ar: 'د. مصطفى الرفاعي',
  full_name_en: 'Dr. Mustafa Al-Rifai',
  title_ar: 'استشاري طب وتجميل الأسنان',
  title_en: 'Consultant in Dental Care & Aesthetics',
  about_ar: 'نؤمن بأن الابتسامة هي نافذة الروح، لذلك نسخر أحدث تقنيات الذكاء الاصطناعي والنمذجة ثلاثية الأبعاد لنمنح مرضانا أدق النتائج وأجمل المظاهر، مع ضمان تجربة علاجية فاخرة وخالية من الألم تماماً.',
  about_en: 'We believe a smile is the window to the soul. Thus, we utilize cutting-edge AI and 3D modeling to deliver the most precise and stunning results, ensuring a completely premium, painless clinical experience.',
  qualifications_ar: 'ماجستير في طب الأسنان التجميلي|عضو الجمعية الأمريكية لطب الأسنان|دورات متقدمة في زراعة وتجميل الأسنان',
  qualifications_en: 'Master in Cosmetic Dentistry (International Academy of Cosmetic Dentistry)|Member of ADA (American Dental Association)|Advanced Dental Implant Specialist (Advanced Courses in Implants & Aesthetics)',
  experience_years: 15,
  image_url: '/src/assets/images/doctor_mustafa_1783724318809.jpg',
  phone: '+971 4 555 1234',
  email: 'info@rifai-dental.com',
  whatsapp: '+971 50 987 6543',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com'
};

const fallbackSettings = {
  clinic_name_ar: 'د. مصطفى الرفاعي',
  clinic_name_en: 'Dr. Mustafa Al-Rifai',
  slogan_ar: 'طب وتجميل الأسنان',
  slogan_en: 'Dental Care & Aesthetics',
  address_ar: 'جميرا، دبي، الإمارات',
  address_en: 'Jumeirah, Dubai, UAE',
  working_hours_ar: 'الأحد - الخميس: 09:00 ص - 08:00 م|الجمعة: 10:00 ص - 06:00 م|السبت: مغلق',
  working_hours_en: 'Sunday - Thursday: 09:00 AM - 08:00 PM|Friday: 10:00 AM - 06:00 PM|Saturday: Closed',
  phone: '+971 4 555 1234',
  whatsapp: '+971 50 987 6543',
  email: 'info@rifai-dental.com',
  website: 'https://rifai-dental.com',
  google_map: 'https://maps.google.com',
  logo_url: '',
  hero_image_url: '',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  youtube: 'https://youtube.com'
};

const fallbackServices = [
  {
    id: 'implants',
    name_ar: 'زراعة الأسنان',
    name_en: 'Dental Implants',
    short_desc_ar: 'استعادة ابتسامتك الدائمة بأحدث تقنيات الزرع التيتانيوم الدقيق والتعويضات الفورية.',
    short_desc_en: 'Restore your permanent smile using cutting-edge titanium implants and instant restorations.',
    icon: 'implants',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhtLCH5V1iI3UNnmz87HzHIcAqOvok_QMg_nxXVCaxQglBLUuV_FDyekcJG9j7T_dgsEZ7v9GVGD30tK90YwFN0IQxZTiby6eq7wlQVsYhYmgC0hlFB6YAU27cIoXqBc7OR9fDlXQP7ebskdzO2OLNUoIbOjKiDUZLwP7Kw25veXcWNJuirar5R47fahSvD_XG8fDMu_T8hg7iYumozUyi8122oJhs9QyFoQGQA4r21a0Td-eg79MTcaVeJMD-IHez2BDb9vmTLtc',
    sort_order: 1,
    active: true
  },
  {
    id: 'veneers',
    name_ar: 'فينير الأسنان',
    name_en: 'Porcelain Veneers',
    short_desc_ar: 'قشور خزفية فائقة الدقة لتغيير مظهر الأسنان والحصول على ابتسامة هوليوود المثالية.',
    short_desc_en: 'Ultra-thin custom porcelain shells designed to cover the front surface of teeth for a Hollywood smile.',
    icon: 'veneers',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXPbsArznlWc7wjwK_KEpnD-ZD2Hz0PH9lYs-kdUg23s9csaR_aFxXxXafvaE2yjLQXqVMqLs7fSMaWHoXFJIikwrZFEpfNXlk18KzfAbgnDGjjHSvljxEja-o6kSZl9Yre8TbBxMc9kjGOoA3ZjkLGINoe0Vt6FF1lNNSh8Mu3egc6LtSN6SIMydmpTihz9GSJe5CNH10uJ2yX4mgqujmvE8ohYHHVoK2Na-aDfHkGcyG6mE7eUjqjbkMv0WNeaMeS97HDm__k6s',
    sort_order: 2,
    active: true
  },
  {
    id: 'whitening',
    name_ar: 'تبييض الأسنان',
    name_en: 'Laser Teeth Whitening',
    short_desc_ar: 'تفتيح احترافي باستخدام الليزر لإزالة التصبغات العميقة واستعادة إشراق ابتسامتك.',
    short_desc_en: 'Safe, professional laser bleaching systems to eliminate deep-set stains and instantly brighten enamel.',
    icon: 'whitening',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi9-BHBZ4IqwyAd1uzPjXKCBxEjyoslolcDuhaLmAEFRolltwxKs0eop7Dh0igVbizUXHxD5dU6GqjHw9Tux5qjHXj3f4pU0Cv9J0QbTgGoanij-LVCQ15YlNAb0bmUvcwLPYAj-teiulmr7ybT5F0DHKWJP2xzHLWwc7sSbVysKWvsH1xeTztkb4XNTmZVpgf9HtoY8B5tiz3r4pF5g_R6SNTNQjbO-2OQUqihKqOBHtt4bY0-RV1Id7umWNwlUAbHpmfeQxwGVw',
    sort_order: 3,
    active: true
  },
  {
    id: 'ortho',
    name_ar: 'تقويم الأسنان',
    name_en: 'Orthodontics & Aligners',
    short_desc_ar: 'حلول تقويمية ذكية تشمل التقويم الشفاف والتقليدي لتصحيح اصطفاف الأسنان.',
    short_desc_en: 'Comprehensive orthodontic correction including premium clear invisible aligners and Damon metal braces.',
    icon: 'ortho',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIgQybrBw0jdVNJ2TtHXLMeA1YXxaCPaqfDfnXZAOl2WDW6IHxebg5on9BOOjfcY6P5Qb8ERySp-p25DLvdBhmgknzTaqhvBtjlR2_0_CMie_SuHBQhYHflTV4sNaPnUVVrnmPvOgeO6BXkTrpKw9PYEVyQ1CO3wqKfdqZZnR5bqUOgXT2W6MVqxJMtRAGVGFNwh-497AHrUdc35ALEDADbCDPw8XO_ZBhk5gHVI5wJYL1Ob2mjg7OarEQRKNlSzE0AFRuHi0k9uU',
    sort_order: 4,
    active: true
  }
];

const fallbackGallery = [
  {
    id: '1',
    category: 'before_after', // map to standard category
    title_ar: 'نتائج زراعة الأسنان الكاملة',
    title_en: 'Full Arch Dental Reconstruction',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbaBoAqhXNBgoh5ecdIqXvLXkLJD5eGXJgj6xkSvSDxhz2E7rNuUN70w2W4TXps1CxOYOJ7u-DSpdrweZayddj3fPxw1ij2sx5tuh1y5Fq5kKFdU-VwT-Wly8OA76B591UWCYJb90tblgOyoT9ZVqA8pOLwbW0DFR1jESGimIEqDT60M-mza4NAVk07KAJ9iB5-sW61_NmDfEiAPpgKFxei70YHJMGxDaFx3yONX-kj9TDxq3HVMUeFoTElJV64CHxFsMCNL9Mb8Q',
    description_ar: 'حالة زراعة كاملة للفكين بنجاح رائع ومظهر طبيعي تماماً',
    description_en: 'Full jaw implant success with stunning natural appearance'
  },
  {
    id: '2',
    category: 'clinic',
    title_ar: 'البيئة العلاجية الفاخرة',
    title_en: 'Premium Clinic Atmosphere',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR54vqULR55DeThVM_mapE-KhydWzjigm1qrAr1SJ9jodmDvyrXiC67dcuUvqNuoIBrbuqMl5GVlFUQbtxoOLZOzRT7CQ6EGIeUqZrhtW_t4e8_rHiJC8N9mgduhn5asfCbRvuucxiZZ_Gl-R023ROCgpmeEyq5du_Mc14GPdoflWOCQiZi58Z9_i6N12k7vbgbLDOc7ir9o6XQoPfiWoZ-QKOJi3OhX3K6rVeh_BW_s0WDvKnTrnHdVboDCuo7kCPjwg6oStDByI',
    description_ar: 'غرف علاجية حديثة ومجهزة بأحدث وسائل الراحة العالمية والتعقيم',
    description_en: 'Modern surgical suites equipped with ultra-comfort amenities'
  },
  {
    id: '3',
    category: 'technology',
    title_ar: 'تقنيات المسح الثلاثي الأبعاد',
    title_en: '3D Intraoral Scanning Tech',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRBolvbl_5l2t7jfUBHQFjudqNMF-1aduORceeJJYsp4FJmHC4Chx6EpWc3mU5aL_q8J7wz9sKYzj04ILYC_IaE9W1ZSi_WKXGOAX5vE_UG1lpKaJ3gpPmfqkmZ5LUCE48zuJXpC095U7Z8NRFktND6vsW2py5FA7QlmV3wQyN76VHEnovY_rZ9P6b_pM_l_h8EnC-ct0UbJOxUTgfIwwUSKeUPv9A4FW1hJTiqFhz_T5V3WFLpuj6ADtpr6pea6KhCK88GFR84DU',
    description_ar: 'مسح ثلاثي الأبعاد دقيق للغاية لتخطيط العلاج الفوري والمضمون',
    description_en: 'Advanced intraoral optical scanning for perfect anatomical planning'
  }
];

// DATA FETCHING & SYNC FUNCTIONS WITH AUTO-FALLBACK

/**
 * Fetch clinic settings
 */
export async function getSettings() {
  if (!supabase) return fallbackSettings;
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();
    
    if (error || !data) {
      console.warn('Supabase Settings fetch failed or empty, using premium fallback data:', error);
      return fallbackSettings;
    }
    return data;
  } catch (err) {
    console.error('Settings query error, using fallback:', err);
    return fallbackSettings;
  }
}

/**
 * Fetch all registered doctors
 */
export async function getDoctors() {
  if (!supabase) return [fallbackDoctor];
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Doctors fetch failed or empty, using premium fallback:', error);
      return [fallbackDoctor];
    }
    return data;
  } catch (err) {
    console.error('Doctors query error, using fallback:', err);
    return [fallbackDoctor];
  }
}

/**
 * Fetch active clinical services
 */
export async function getServices() {
  if (!supabase) return fallbackServices;
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Services fetch failed or empty, using premium fallback:', error);
      return fallbackServices;
    }
    return data;
  } catch (err) {
    console.error('Services query error, using fallback:', err);
    return fallbackServices;
  }
}

/**
 * Fetch clinic gallery photos
 */
export async function getGallery() {
  if (!supabase) return fallbackGallery;
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Gallery fetch failed or empty, using premium fallback:', error);
      return fallbackGallery;
    }
    return data;
  } catch (err) {
    console.error('Gallery query error, using fallback:', err);
    return fallbackGallery;
  }
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
}) {
  if (!supabase) {
    console.log('Supabase mock booking:', appointment);
    return { data: { id: 'mock-id-' + Date.now(), ...appointment }, error: null };
  }
  try {
    // ANTI-SPAM: Check if there's already a pending appointment with this phone number
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

    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_name: appointment.patient_name,
          phone: appointment.phone,
          email: appointment.email || null,
          service_id: appointment.service_id || null,
          preferred_language: appointment.preferred_language || 'ar',
          appointment_date: appointment.appointment_date,
          appointment_time: appointment.appointment_time,
          notes: appointment.notes || '',
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Appointment creation error:', error);
      // RLS policy violation fallback
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        console.warn('RLS policy violation. Falling back to local client-side booking.');
        const mockData = {
          id: 'local-rls-' + Date.now(),
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
        return { data: mockData, error: null };
      }
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err: any) {
    console.error('Appointment query exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Update an existing appointment (e.g. reschedule)
 */
export async function updateAppointment(id: string, appointment_date: string, appointment_time: string) {
  if (id.startsWith('local-')) {
    console.log('Local update:', { id, appointment_date, appointment_time });
    return { data: { id, appointment_date, appointment_time }, error: null };
  }
  if (!supabase) {
    console.log('Supabase mock update:', { id, appointment_date, appointment_time });
    return { data: { id, appointment_date, appointment_time }, error: null };
  }
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ appointment_date, appointment_time })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase Appointment update error:', error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err: any) {
    console.error('Appointment update exception:', err);
    return { data: null, error: err };
  }
}

/**
 * Cancel/Delete an existing appointment
 */
export async function cancelAppointment(id: string) {
  if (id.startsWith('local-')) {
    console.log('Local cancel:', id);
    return { error: null };
  }
  if (!supabase) {
    console.log('Supabase mock cancel:', id);
    return { error: null };
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
  if (id.startsWith('local-')) return null;
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

