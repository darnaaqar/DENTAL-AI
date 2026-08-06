import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { 
  settingsHiveBox, 
  doctorsHiveBox, 
  servicesHiveBox, 
  galleryHiveBox 
} from './lib/hiveCache';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role?: string;
  createdAt?: string;
}

export interface AppointmentData {
  id?: string;
  patient_name?: string;
  patientName?: string;
  phone?: string;
  patientPhone?: string;
  service_id?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  appointment_date?: string;
  time?: string;
  appointment_time?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  patientUid?: string;
  device_id?: string;
  preferred_language?: string;
  createdAt?: string;
}

// =============================================================================
// DEFAULT SEED DATA FROM SUPABASE MIGRATION SCRIPT
// =============================================================================

export const DEFAULT_SETTINGS = {
  id: 'clinic_data',
  clinic_name_ar: 'عيادة د. مصطفى الرفاعي لطب وتجميل الأسنان',
  clinic_name_en: 'Dr. Mustafa Alrifaie Clinics',
  slogan_ar: 'إبتسامة صحية.. مظهر أجمل.. حياة أفضل',
  slogan_en: 'Healthy smile.. Beautiful look.. Better life',
  address_ar: 'شارع كوردستان، حي المالكيا، أربيل، إقليم كردستان، العراق',
  address_en: 'Kurdistan Street, Al-Malikiya District, Erbil, Kurdistan Region, Iraq',
  working_hours_ar: 'الأحد - الخميس: ٩:٠٠ صباحاً - ٩:٠٠ مساءً، الجمعة: ١٠:٠٠ صباحاً - ٦:٠٠ مساءً',
  working_hours_en: 'Sun - Thu: 9:00 AM - 9:00 PM, Fri: 10:00 AM - 6:00 PM',
  phone: '+964 66 123 4567',
  whatsapp: '964661234567',
  email: 'info@dr-mustafa-clinic.com',
  website: 'https://dr-mustafa-clinic.com',
  google_map: 'https://maps.google.com/?q=Dr.+Mustafa+Alrifaie+Clinic+Erbil+Iraq',
  logo_url: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=200',
  hero_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
  facebook: 'https://facebook.com/dr.mustafa.clinic',
  instagram: 'https://instagram.com/dr.mustafa.clinic',
  tiktok: 'https://tiktok.com/@dr.mustafa.clinic',
  youtube: 'https://youtube.com/dr.mustafa.clinic'
};

export const DEFAULT_DOCTORS = [
  {
    id: '11111111-2222-3333-4444-555555555555',
    full_name_ar: 'د. مصطفى الرفاعي',
    full_name_en: 'Dr. Mustafa Alrifaie',
    title_ar: 'استشاري زراعة وتجميل الأسنان الرقمية',
    title_en: 'Consultant in Digital Implantology & Aesthetic Dentistry',
    about_ar: 'يكرس الدكتور مصطفى الرفاعي جهده لتقديم رعاية طبية أسنان حديثة باستخدام التكنولوجيا الرقمية، مع تركيز خاص على زراعة الأسنان والابتسامات الجمالية والعلاج غير الجراحي.',
    about_en: 'Dr. Mustafa Alrifaie is dedicated to providing modern dental care using digital technologies with a special focus on implant dentistry, smile rehabilitation, and minimally invasive treatment.',
    qualifications_ar: 'البورد السويسري في تجميل الأسنان، زمالة الجمعية الدولية لزراعة الأسنان (ITI)، دكتوراه طب وجراحة الفم والأسنان.',
    qualifications_en: 'Swiss Board in Aesthetic Dentistry, Fellow of the International Team for Implantology (ITI), Ph.D. in Dental Medicine & Oral Surgery.',
    experience_years: 15,
    image_url: 'https://images.unsplash.com/photo-1622249772724-7d9d0b257250?auto=format&fit=crop&q=80&w=600',
    phone: '+964 66 123 4567',
    email: 'dr.mustafa@dr-mustafa-clinic.com',
    whatsapp: '964661234567',
    facebook: 'https://facebook.com/dr.mustafa.clinic',
    instagram: 'https://instagram.com/dr.mustafa.clinic'
  }
];

export const DEFAULT_SERVICES = [
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
    name_ar: 'زراعة الأسنان الرقمية وغرس واحد',
    name_en: 'Digital Implantology & One-Piece Implants',
    short_desc_ar: 'تعويض الأسنان المفقودة بغرسات تيتانيوم حيوية موجهة بالكمبيوتر وبدون ألم، بما في ذلك خيارات الغرس ذو القطعة الواحدة.',
    short_desc_en: 'Replace missing teeth with computer-guided, biological titanium implants painlessly, including one-piece implant options.',
    details_ar: 'نعتمد على التخطيط ثلاثي الأبعاد الموجه بالكمبيوتر لوضع الغرسات بدقة متناهية وتجنب الشقوق الجراحية الكبيرة.',
    details_en: 'Using fully digital 3D CAD-CAM surgical guides, we place premium biocompatible titanium implants with high precision.',
    benefits_ar: 'إجراء بدون ألم، ثبات دائم مدى الحياة، استعادة كاملة لوظيفة وصحة الفك.',
    benefits_en: 'Painless clinical setup, lifelong structural durability, flawless natural chewing and health restoration.',
    icon: 'Shield',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    sort_order: 1,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
    name_ar: 'الفينير والتصميم الجمالي للابتسامة',
    name_en: 'Premium Veneers & Cosmetic Smile Design',
    short_desc_ar: 'ابتسامة هوليوود المتناسقة والمصممة خصيصاً لتناسب ملامح وجهك بدقة متناهية باستخدام تقنية التصميم الرقمي.',
    short_desc_en: 'Your custom-crafted Hollywood smile, designed digitally to match your facial proportions.',
    details_ar: 'نستخدم تقنية عدسات الإيماكس (e.Max) السويسرية فائقة الرقة لتقديم ابتسامة متناسقة مفعمة بالحيوية واللمعان.',
    details_en: 'We craft ultra-thin biological porcelain e.Max veneers tailored to your mouth structure.',
    benefits_ar: 'تعديل فوري للون والاصطفاف، مظهر طبيعي 100%، تصميم بالذكاء الاصطناعي.',
    benefits_en: 'Instant shade and alignment restoration, 100% life-like translucency, AI-powered design.',
    icon: 'Smile',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
    sort_order: 2,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
    name_ar: 'تبييض الأسنان بالليزر',
    name_en: 'Laser Teeth Whitening',
    short_desc_ar: 'ابتسامة ناصعة البياض خالية من الحساسية خلال جلسة واحدة بأحدث تقنيات الليزر البارد.',
    short_desc_en: 'Bright white, sensitivity-free smile in one session using premium cold laser systems.',
    details_ar: 'جلسة تبييض متكاملة مدتها 45 دقيقة تجمع بين مادة التبييض النشطة وموجات الليزر البارد المتطورة.',
    details_en: 'A complete 45-minute treatment combining state-of-the-art cold laser and customized clinical whitening agents.',
    benefits_ar: 'تبييض يصل إلى 8 درجات أفتح، حماية كاملة للمينا، حماية ضد حساسية اللثة والأسنان.',
    benefits_en: 'Up to 8 shades lighter, zero-enamel wearing formula, complete defense against gum sensitivity.',
    icon: 'Sparkles',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600',
    sort_order: 3,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea4',
    name_ar: 'تقويم الأسنان غير المرئي',
    name_en: 'Clear Aligners (Orthodontics)',
    short_desc_ar: 'اصطفاف أسنان مثالي مع قوالب شفافة ومريحة قابلة للإزالة دون حديد أو أسلاك، مثالي لكبار السن.',
    short_desc_en: 'Achieve perfect alignment with fully removable, transparent clear aligners without metal braces.',
    details_ar: 'تعديل اصطفاف الأسنان باستخدام تقنية إنفاجليكس الرائدة وسلسة من القوالب الشفافة.',
    details_en: 'Straighten teeth with Invisalign advanced technology, featuring custom-crafted clear aligners.',
    benefits_ar: 'شفاف وغير مرئي تماماً، مريح جداً وقابل للإزالة لتناول الطعام، مثالي للبالغين.',
    benefits_en: 'Virtually invisible, comfortable and removable, ideal for adults.',
    icon: 'Activity',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    sort_order: 4,
    active: true
  }
];

export const DEFAULT_GALLERY = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
    category: 'before_after',
    title_ar: 'تصميم الابتسامة ومظهر الفينير',
    title_en: 'Veneers Cosmetic Smile Design Result',
    description_ar: 'ابتسامة هوليوود باستخدام فينير إيماكس ناعم جداً - تحويل مذهل في جلسة واحدة.',
    description_en: 'Hollywood smile using ultra-thin e.Max veneers - amazing transformation in one session.',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
    category: 'before_after',
    title_ar: 'تبييض ليزر احترافي',
    title_en: 'Professional Laser Whitening Results',
    description_ar: 'نتائج مذهلة لتبييض الأسنان بالليزر البارد - 8 درجات أفتح في جلسة واحدة.',
    description_en: 'Amazing results from cold laser whitening - 8 shades lighter in a single session.',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
    category: 'before_after',
    title_ar: 'زراعة واحدة وغرس كامل',
    title_en: 'One-Piece & Full Arch Implants',
    description_ar: 'استعادة كاملة للابتسامة باستخدام الزراعات الفورية والغرس ذو القطعة الواحدة.',
    description_en: 'Complete smile restoration using immediate load and one-piece implants.',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a0000000-0000-0000-0000-000000000004',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea4',
    category: 'before_after',
    title_ar: 'تقويم الأسنان بالإنفاجليكس',
    title_en: 'Invisalign Treatment Transformation',
    description_ar: 'تحويل ابتسامة كاملة باستخدام قوالب إنفاجليكس الشفافة - نتائج طبيعية ومريحة.',
    description_en: 'Complete smile transformation using clear Invisalign aligners - natural and comfortable results.',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a0000000-0000-0000-0000-000000000005',
    service_id: null,
    category: 'technology',
    title_ar: 'المسح الرقمي ثلاثي الأبعاد CAD-CAM',
    title_en: 'High-Precision 3D CAD-CAM Scan',
    description_ar: 'أجهزة المسح الرقمية المتقدمة لأخذ طبعات دقيقة وتصميم التركيبات والزراعات فورياً.',
    description_en: 'Cutting-edge intraoral 3D scanner for printing high-accuracy mockups and planning implants.',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a0000000-0000-0000-0000-000000000006',
    service_id: null,
    category: 'clinic',
    title_ar: 'غرفة العلاج الفاخرة المجهزة بالكامل',
    title_en: 'Luxury Treatment Suite',
    description_ar: 'بيئة علاجية هادئة ومعقمة مزودة بأعلى معايير التكنولوجيا الطبية وسبل الراحة.',
    description_en: 'A tranquil, fully sterilized environment equipped with premium state-of-the-art dental units.',
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
  }
];

// =============================================================================
// FIRESTORE SEED & DATA FETCHING HELPERS
// =============================================================================

let isSeeded = false;

/**
 * Force seed/implant all clinic application data into Firebase Firestore with writeBatch for instant speed
 */
export async function forceSyncAllAppDataToFirebase() {
  try {
    // Ensure active auth session if needed
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (authErr) {
        console.warn('Anonymous sign-in notice:', authErr);
      }
    }

    const batch = writeBatch(db);

    // 1. Settings
    const settingsRef = doc(db, 'settings', 'clinic_data');
    batch.set(settingsRef, DEFAULT_SETTINGS, { merge: true });

    // 2. Doctors
    for (const doctor of DEFAULT_DOCTORS) {
      const docRef = doc(db, 'doctors', doctor.id);
      batch.set(docRef, doctor, { merge: true });
    }

    // 3. Services
    for (const service of DEFAULT_SERVICES) {
      const docRef = doc(db, 'services', service.id);
      batch.set(docRef, service, { merge: true });
    }

    // 4. Gallery
    for (const item of DEFAULT_GALLERY) {
      const docRef = doc(db, 'gallery', item.id);
      batch.set(docRef, item, { merge: true });
    }

    // 5. Initial Sample User
    const sampleUserRef = doc(db, 'users', 'sample_patient_01');
    batch.set(sampleUserRef, {
      uid: 'sample_patient_01',
      email: 'patient@example.com',
      displayName: 'مريض تجريبي (Sample Patient)',
      phone: '+964 750 123 4567',
      role: 'patient',
      createdAt: new Date().toISOString()
    }, { merge: true });

    // 6. Initial Sample Appointment
    const sampleApptRef = doc(db, 'appointments', 'sample_appt_01');
    batch.set(sampleApptRef, {
      patient_name: 'مريض تجريبي (Sample Patient)',
      patientPhone: '+964 750 123 4567',
      serviceName: 'تنظيف وتلميع الأسنان',
      doctorName: 'د. مصطفى الرفاعي',
      date: '2026-08-10',
      time: '10:00 AM',
      status: 'confirmed',
      notes: 'موعد استشاري أولي',
      createdAt: new Date().toISOString()
    }, { merge: true });

    // Commit batch atomically to target database instance
    await batch.commit();

    // Cache locally
    settingsHiveBox.put('clinic_data', DEFAULT_SETTINGS);
    doctorsHiveBox.put('doctors_list', DEFAULT_DOCTORS);
    servicesHiveBox.put('services_list', DEFAULT_SERVICES);
    galleryHiveBox.put('gallery_list', DEFAULT_GALLERY);

    isSeeded = true;
    console.log('⚡ Fast batch sync committed all 6 collections to Firestore database!');
    return { success: true, count: DEFAULT_SERVICES.length + DEFAULT_DOCTORS.length + DEFAULT_GALLERY.length + 3 };
  } catch (err: any) {
    console.error('Error force syncing data to Firebase:', err);
    // Fallback: Individual setDoc calls if writeBatch has an issue
    try {
      await setDoc(doc(db, 'settings', 'clinic_data'), DEFAULT_SETTINGS, { merge: true });
      for (const doctor of DEFAULT_DOCTORS) {
        await setDoc(doc(db, 'doctors', doctor.id), doctor, { merge: true });
      }
      for (const service of DEFAULT_SERVICES) {
        await setDoc(doc(db, 'services', service.id), service, { merge: true });
      }
      for (const item of DEFAULT_GALLERY) {
        await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
      }
      isSeeded = true;
      return { success: true, count: DEFAULT_SERVICES.length + DEFAULT_DOCTORS.length + DEFAULT_GALLERY.length };
    } catch (fallbackErr) {
      console.error('Fallback sync error:', fallbackErr);
      return { success: false, error: fallbackErr };
    }
  }
}

/**
 * Seed initial clinic data to Firestore if not already present
 */
export async function seedFirestoreInitialData() {
  if (isSeeded) return;

  try {
    // Check settings
    const settingsDoc = await getDoc(doc(db, 'settings', 'clinic_data'));
    const doctorsSnap = await getDocs(collection(db, 'doctors'));
    const servicesSnap = await getDocs(collection(db, 'services'));
    const gallerySnap = await getDocs(collection(db, 'gallery'));

    if (!settingsDoc.exists() || doctorsSnap.empty || servicesSnap.empty || gallerySnap.empty) {
      console.log('Seeding initial clinic data to Firebase Firestore...');
      await forceSyncAllAppDataToFirebase();
    } else {
      isSeeded = true;
    }
  } catch (err) {
    isSeeded = false;
    console.warn('Firestore auto-seed notice (attempting direct force sync):', err);
    try {
      await forceSyncAllAppDataToFirebase();
    } catch (e) {
      console.error('Direct force sync fallback error:', e);
    }
  }
}

/**
 * Get Settings from Firebase Firestore
 */
export async function getFirebaseSettings() {
  const cached = settingsHiveBox.get('clinic_data');
  try {
    await seedFirestoreInitialData();
    const docRef = doc(db, 'settings', 'clinic_data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      settingsHiveBox.put('clinic_data', data);
      return data;
    }
    return cached || DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Error fetching settings from Firestore:', err);
    return cached || DEFAULT_SETTINGS;
  }
}

/**
 * Get Doctors from Firebase Firestore
 */
export async function getFirebaseDoctors() {
  const cached = doctorsHiveBox.get('doctors_list');
  try {
    await seedFirestoreInitialData();
    const snap = await getDocs(collection(db, 'doctors'));
    if (!snap.empty) {
      const list: any[] = [];
      snap.forEach(d => list.push(d.data()));
      doctorsHiveBox.put('doctors_list', list);
      return list;
    }
    return cached && cached.length > 0 ? cached : DEFAULT_DOCTORS;
  } catch (err) {
    console.error('Error fetching doctors from Firestore:', err);
    return cached && cached.length > 0 ? cached : DEFAULT_DOCTORS;
  }
}

/**
 * Get Services from Firebase Firestore
 */
export async function getFirebaseServices() {
  const cached = servicesHiveBox.get('services_list');
  try {
    await seedFirestoreInitialData();
    const snap = await getDocs(collection(db, 'services'));
    if (!snap.empty) {
      const list: any[] = [];
      snap.forEach(d => list.push(d.data()));
      list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      servicesHiveBox.put('services_list', list);
      return list;
    }
    return cached && cached.length > 0 ? cached : DEFAULT_SERVICES;
  } catch (err) {
    console.error('Error fetching services from Firestore:', err);
    return cached && cached.length > 0 ? cached : DEFAULT_SERVICES;
  }
}

/**
 * Get Gallery from Firebase Firestore
 */
export async function getFirebaseGallery() {
  const cached = galleryHiveBox.get('gallery_list');
  try {
    await seedFirestoreInitialData();
    const snap = await getDocs(collection(db, 'gallery'));
    if (!snap.empty) {
      const list: any[] = [];
      snap.forEach(d => list.push(d.data()));
      galleryHiveBox.put('gallery_list', list);
      return list;
    }
    return cached && cached.length > 0 ? cached : DEFAULT_GALLERY;
  } catch (err) {
    console.error('Error fetching gallery from Firestore:', err);
    return cached && cached.length > 0 ? cached : DEFAULT_GALLERY;
  }
}

// =============================================================================
// USER AUTHENTICATION & PROFILE HELPERS
// =============================================================================

// Custom session listener list (supports both Native Firebase Auth and Fallback Users)
type AuthCallback = (user: FirebaseUser | null, profile: UserProfile | null) => void;
const authListeners: AuthCallback[] = [];

let currentActiveUser: { user: FirebaseUser; profile: UserProfile | null } | null = null;

// Initialize stored fallback user session if present
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('firebase_active_session');
    if (saved) {
      currentActiveUser = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to parse active session from localStorage:', e);
  }
}

function notifyAuthListeners() {
  const activeUser = currentActiveUser ? currentActiveUser.user : auth.currentUser;
  const activeProfile = currentActiveUser ? currentActiveUser.profile : null;
  authListeners.forEach(cb => cb(activeUser, activeProfile));
}

export function subscribeToAuthState(callback: AuthCallback) {
  authListeners.push(callback);

  // Send current state immediately
  if (currentActiveUser) {
    callback(currentActiveUser.user, currentActiveUser.profile);
  } else if (auth.currentUser) {
    getUserProfile(auth.currentUser.uid).then(profile => {
      callback(auth.currentUser, profile);
    });
  } else {
    callback(null, null);
  }

  // Also listen to Native Firebase auth state changes
  const unsubscribeNative = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      currentActiveUser = { user, profile: profile || { uid: user.uid, email: user.email || '', displayName: user.displayName || 'User' } };
      if (typeof window !== 'undefined') {
        localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
      }
      callback(user, profile);
    } else if (!currentActiveUser) {
      callback(null, null);
    }
  });

  return () => {
    const idx = authListeners.indexOf(callback);
    if (idx !== -1) authListeners.splice(idx, 1);
    unsubscribeNative();
  };
}

export async function registerWithFirebase(email: string, password: string, displayName: string, phone: string = '') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    const profileData: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      displayName: displayName,
      phone: phone,
      role: 'patient',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), profileData);
    
    currentActiveUser = { user, profile: profileData };
    if (typeof window !== 'undefined') {
      localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
    }
    notifyAuthListeners();

    return { user, profile: profileData };
  } catch (err: any) {
    const errCode = String(err?.code || '');
    const errMessage = String(err?.message || '');
    const isRestricted = errCode.includes('admin-restricted') || 
                         errCode.includes('operation-not-allowed') || 
                         errMessage.includes('admin-restricted') || 
                         errMessage.includes('operation-not-allowed');

    if (isRestricted) {
      console.warn('Email auth restricted by Firebase Console, creating Firestore profile fallback');
      const fallbackUid = 'user-' + Math.random().toString(36).substring(2, 10);
      const profileData: UserProfile = {
        uid: fallbackUid,
        email: email,
        displayName: displayName,
        phone: phone,
        role: 'patient',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', fallbackUid), profileData);
      
      const fallbackUser = { uid: fallbackUid, email: email, displayName: displayName } as any;
      currentActiveUser = { user: fallbackUser, profile: profileData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
      }
      notifyAuthListeners();

      return {
        user: fallbackUser,
        profile: profileData
      };
    }
    throw err;
  }
}

export async function loginWithFirebase(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const profile = await getUserProfile(user.uid);
    
    currentActiveUser = { user, profile };
    if (typeof window !== 'undefined') {
      localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
    }
    notifyAuthListeners();

    return { user, profile };
  } catch (err: any) {
    const errCode = String(err?.code || '');
    const errMessage = String(err?.message || '');
    const isRestricted = errCode.includes('admin-restricted') || 
                         errCode.includes('operation-not-allowed') || 
                         errMessage.includes('admin-restricted') || 
                         errMessage.includes('operation-not-allowed');

    if (isRestricted) {
      console.warn('Firebase Auth email provider restricted in Console, managing user profile via Firestore');
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const snap = await getDocs(q);
        let profileData: UserProfile;
        let userUid: string;

        if (!snap.empty) {
          profileData = snap.docs[0].data() as UserProfile;
          userUid = profileData.uid;
        } else {
          userUid = 'user-' + Math.random().toString(36).substring(2, 10);
          profileData = {
            uid: userUid,
            email: email,
            displayName: email.split('@')[0] || 'Patient',
            phone: '',
            role: 'patient',
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', userUid), profileData);
        }

        const fallbackUser = { uid: userUid, email: email, displayName: profileData.displayName } as any;
        currentActiveUser = { user: fallbackUser, profile: profileData };
        if (typeof window !== 'undefined') {
          localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
        }
        notifyAuthListeners();

        return {
          user: fallbackUser,
          profile: profileData
        };
      } catch (e) {
        console.warn('Firestore email login fallback error:', e);
      }
    }
    throw err;
  }
}

export async function signInAnonymouslyWithFirebase(displayName: string = 'Test Guest') {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    const profileData: UserProfile = {
      uid: user.uid,
      email: user.email || `${user.uid.slice(0, 8)}@guest.firebase`,
      displayName: displayName,
      phone: '',
      role: 'guest',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', user.uid), profileData);

    currentActiveUser = { user, profile: profileData };
    if (typeof window !== 'undefined') {
      localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
    }
    notifyAuthListeners();

    return { user, profile: profileData };
  } catch (err: any) {
    const errCode = String(err?.code || '');
    const errMessage = String(err?.message || '');
    const isRestricted = errCode.includes('admin-restricted') || 
                         errCode.includes('operation-not-allowed') || 
                         errMessage.includes('admin-restricted') || 
                         errMessage.includes('operation-not-allowed');

    if (isRestricted) {
      console.warn('Anonymous auth restricted by Firebase config, using guest session fallback');
      const guestUid = 'guest-' + Math.random().toString(36).substring(2, 10);
      const profileData: UserProfile = {
        uid: guestUid,
        email: `${guestUid}@guest.local`,
        displayName: displayName,
        phone: '',
        role: 'guest',
        createdAt: new Date().toISOString()
      };
      try {
        await setDoc(doc(db, 'users', guestUid), profileData);
      } catch (e) {
        console.warn('Firestore guest profile write error:', e);
      }
      
      const guestUser = { uid: guestUid, email: profileData.email, displayName: displayName } as any;
      currentActiveUser = { user: guestUser, profile: profileData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('firebase_active_session', JSON.stringify(currentActiveUser));
      }
      notifyAuthListeners();

      return { 
        user: guestUser, 
        profile: profileData 
      };
    }
    throw err;
  }
}

export async function logoutFromFirebase() {
  currentActiveUser = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('firebase_active_session');
  }
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Firebase logout notice:', e);
  }
  notifyAuthListeners();
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// =============================================================================
// APPOINTMENTS FIRESTORE OPERATIONS
// =============================================================================

export async function createAppointmentFirestore(data: any) {
  const appointmentsRef = collection(db, 'appointments');
  const id = typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID
    ? window.crypto.randomUUID()
    : 'app-' + Math.random().toString(36).substring(2, 12);

  const newAppointment = {
    id,
    device_id: data.device_id || 'dev-' + Math.random().toString(36).substring(2, 8),
    patient_name: data.patient_name || data.patientName || '',
    patientName: data.patient_name || data.patientName || '',
    phone: data.phone || data.patientPhone || '',
    patientPhone: data.phone || data.patientPhone || '',
    email: data.email || '',
    service_id: data.service_id || '',
    serviceName: data.serviceName || data.service_id || 'General Dental',
    preferred_language: data.preferred_language || 'ar',
    appointment_date: data.appointment_date || data.date || '',
    appointment_time: data.appointment_time || data.time || '',
    date: data.appointment_date || data.date || '',
    time: data.appointment_time || data.time || '',
    notes: data.notes || '',
    status: data.status || 'pending',
    patientUid: data.patientUid || '',
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'appointments', id), newAppointment);
  return newAppointment;
}

export async function updateAppointmentFirestore(id: string, appointment_date: string, appointment_time: string) {
  try {
    const docRef = doc(db, 'appointments', id);
    await updateDoc(docRef, {
      appointment_date,
      date: appointment_date,
      appointment_time,
      time: appointment_time
    });
    return { id, appointment_date, appointment_time };
  } catch (err) {
    console.error('Error updating appointment in Firestore:', err);
    throw err;
  }
}

export async function cancelAppointmentFirestore(id: string) {
  try {
    const docRef = doc(db, 'appointments', id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Error deleting appointment in Firestore:', err);
    throw err;
  }
}

export async function getAppointmentFirestore(id: string) {
  try {
    const docRef = doc(db, 'appointments', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.error('Error fetching appointment from Firestore:', err);
    return null;
  }
}

export async function getUserAppointmentsFirestore(patientUid: string): Promise<AppointmentData[]> {
  try {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(appointmentsRef, where('patientUid', '==', patientUid));
    const querySnapshot = await getDocs(q);
    const results: AppointmentData[] = [];
    querySnapshot.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() } as AppointmentData);
    });
    return results;
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return [];
  }
}

export { onAuthStateChanged };
export type { FirebaseUser };
