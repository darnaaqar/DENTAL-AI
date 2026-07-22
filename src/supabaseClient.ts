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

// PREMIUM CLINIC DEFAULT DATA (Used as high-fidelity fallback when Supabase data is loading or empty)
export const DEFAULT_SETTINGS = {
  id: true,
  clinic_name_ar: 'عيادة د. مصطفى الرفاعي لطب وتجميل الأسنان',
  clinic_name_en: 'Dr. Mustafa Al-Rifai Dental Care & Aesthetics',
  slogan_ar: 'إبتسامة صحية.. مظهر أجمل.. حياة أفضل',
  slogan_en: 'Healthy smile.. Beautiful look.. Better life',
  address_ar: 'شارع التخصصي، الرياض، المملكة العربية السعودية',
  address_en: 'Takhassusi Street, Riyadh, Saudi Arabia',
  working_hours_ar: 'السبت - الخميس: ٩:٠٠ صباحاً - ٩:٠٠ مساءً',
  working_hours_en: 'Saturday - Thursday: 9:00 AM - 9:00 PM',
  phone: '+966 50 123 4567',
  whatsapp: '966501234567',
  email: 'info@dr-mustafa-clinic.com',
  website: 'https://dr-mustafa-clinic.com',
  google_map: 'https://maps.google.com/?q=Riyadh',
  logo_url: 'https://lh3.googleusercontent.com/aida/AP1WRLvgpJuNbz7ZGBSUud_zbYaRxgvpRkXubIr9UDnaFKaCeDZH5fWaQtfNJE9WRNmtOJeAjeGXfGK_iajc4akHDTJjiyZC5ATTuYC--1l7gOgaq35HTTNE0KiTX9vlW-WthJ87N_OAxlXAR7grSPmEisQhtU6Obp9FNyv6SKR4dad81sTNF8-0sKgWccdIiq9J9hI1HejVCC00DAP7ioDxnnWCGgNdmwyD2-MDvhpZyedHKIUXyzjdGJGNT7I',
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
    full_name_en: 'Dr. Mustafa Al-Rifai',
    title_ar: 'استشاري زراعة وتجميل الأسنان',
    title_en: 'Consultant in Implantology & Aesthetic Dentistry',
    about_ar: 'يعد الدكتور مصطفى الرفاعي أحد رواد طب الأسنان الرقمي والتجميلي بمجموع خبرة تتجاوز 15 عاماً في تصميم الابتسامات الرقمية المتطورة وهندسة حيوية الفم لتعود بأجمل شكل وأقوى متانة.',
    about_en: 'Dr. Mustafa Al-Rifai is a leading pioneer of digital and cosmetic dentistry with over 15 years of experience in advanced CAD-CAM digital smile designs and biological oral rehabilitation.',
    qualifications_ar: 'البورد السويسري في تجميل الأسنان، زمالة الجمعية الدولية لزراعة الأسنان (ITI)، دكتوراه طب وجراحة الفم والأسنان.',
    qualifications_en: 'Swiss Board in Aesthetic Dentistry, Fellow of the International Team for Implantology (ITI), Ph.D. in Dental Medicine & Oral Surgery.',
    experience_years: 15,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8IhJhiFXgCJoUCUhdnc489Z5-t5f73w8_vrm1xpYXedmkJ03q-koJmRfbOUzS_KQB0wsM6NaXDIHtJwV0K5zDDPGeUiBqxJ1vahCOg4L_EOFtulSHKST682LV0CZ5esHQYRSk_GGGGfRSBitnzecYBWkSCsJoqy8_nsg06W7xEsAhpHHHrHBwqXslITJ85aSDIxTyNuG8ThD74NSybCASpY9V3MVWaet_3GWL3yhamaVQj4dbDGJVwpsxnrt-nByMJbCOw2YSxps',
    phone: '+966 50 123 4567',
    email: 'dr.mustafa@dr-mustafa-clinic.com',
    whatsapp: '966501234567',
    facebook: 'https://facebook.com/dr.mustafa.clinic',
    instagram: 'https://instagram.com/dr.mustafa.clinic'
  }
];

export const DEFAULT_SERVICES = [
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
    name_ar: 'تبييض الأسنان بالليزر',
    name_en: 'Laser Teeth Whitening',
    short_desc_ar: 'ابتسامة ناصعة البياض خالية من الحساسية خلال جلسة واحدة بأحدث تقنيات الليزر البارد.',
    short_desc_en: 'Bright white, sensitivity-free smile in one session using premium cold laser systems.',
    details_ar: 'جلسة تبييض متكاملة مدتها 45 دقيقة تجمع بين مادة التبييض النشطة وموجات الليزر البارد المتطورة لضمان إزالة تامة للتصبغات العنيدة بدون أي ألم.',
    details_en: 'A complete 45-minute treatment combining state-of-the-art cold laser and customized clinical whitening agents to eliminate deepest stains painlessly.',
    benefits_ar: 'تبييض يصل إلى 8 درجات أفتح، حماية كاملة للمينا، حماية ضد حساسية اللثة والأسنان.',
    benefits_en: 'Up to 8 shades lighter, zero-enamel wearing formula, complete defense against gum sensitivity.',
    icon: 'Sparkles',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600',
    sort_order: 1,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
    name_ar: 'الفينير والعدسات التجميلية',
    name_en: 'Premium Veneers & Smile Design',
    short_desc_ar: 'ابتسامة هوليوود المتناسقة والمصممة خصيصاً لتناسب ملامح وجهك بدقة متناهية.',
    short_desc_en: 'Your custom-crafted Hollywood smile, designed digitally to match your facial proportions.',
    details_ar: 'نستخدم تقنية عدسات الإيماكس (e.Max) السويسرية فائقة الرقة لتقديم ابتسامة متناسقة مفعمة بالحيوية واللمعان تتطلب الحد الأدنى من تحضير الأسنان.',
    details_en: 'We craft ultra-thin biological porcelain e.Max veneers tailored to your mouth structure to give you an extremely natural smile with minimal tooth reduction.',
    benefits_ar: 'تعديل فوري للون والاصطفاف، مظهر طبيعي 100% متناسب حيوياً، مقاوم تماماً للتصبغات.',
    benefits_en: 'Instant shade and alignment restoration, 100% life-like translucency, highly stain-resistant finish.',
    icon: 'Smile',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
    sort_order: 2,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
    name_ar: 'زراعة الأسنان الرقمية',
    name_en: 'Digital Dental Implants',
    short_desc_ar: 'تعويض الأسنان المفقودة بغرسات تيتانيوم حيوية موجهة بالكمبيوتر وبدون ألم.',
    short_desc_en: 'Replace missing teeth with computer-guided, biological titanium implants painlessly.',
    details_ar: 'نعتمد على التخطيط ثلاثي الأبعاد الموجه بالكمبيوتر لوضع الغرسات بدقة متناهية وتفادي الشقوق الجراحية الكبيرة، مما يضمن شفاءً فائق السرعة واستعادة فورية للابتسامة.',
    details_en: 'Using fully digital 3D CAD-CAM surgical guides, we place premium biocompatible titanium implants with high micrometric precision and minimal healing downtime.',
    benefits_ar: 'إجراء بدون ألم، ثبات دائم مدى الحياة، استعادة كاملة لوظيفة وصحة الفك.',
    benefits_en: 'Painless clinical setup, lifelong structural durability, flawless natural chewing and health restoration.',
    icon: 'Shield',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    sort_order: 3,
    active: true
  },
  {
    id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea4',
    name_ar: 'تقويم الأسنان غير المرئي',
    name_en: 'Invisalign Clear Aligners',
    short_desc_ar: 'اصطفاف أسنان مثالي مع قوالب شفافة ومريحة قابلة للإزالة دون حديد أو أسلاك.',
    short_desc_en: 'Achieve perfect alignment with fully removable, transparent clear aligners without metal braces.',
    details_ar: 'تعديل اصطفاف الأسنان باستخدام تقنية Invisalign الرائدة وسلسلة من القوالب الشفافة التي يتم تصميمها خصيصاً بنمذجة ثلاثية الأبعاد لتتحرك أسنانك برفق للمكان الصحيح.',
    details_en: 'Straighten teeth with Invisalign advanced technology, featuring custom-crafted clear aligner series built via high-precision 3D digital scans for active, gentle tooth motion.',
    benefits_ar: 'شفاف وغير مرئي تماماً، مريح جداً وقابل للإزالة لتناول الطعام، حماية تامة للثة والأسنان.',
    benefits_en: 'Virtually invisible, comfortable and removable, promotes excellent oral hygiene and wellness.',
    icon: 'Activity',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    sort_order: 4,
    active: true
  },
  {
    id: 'a11cb8f0-15cc-4cbe-b4db-996ff2505b01',
    name_ar: 'علاج اللثة المتقدم',
    name_en: 'Advanced Gum Treatment',
    short_desc_ar: 'علاج متكامل لمشاكل اللثة من التهاب إلى إعادة بناء الأنسجة بالتقنيات الحديثة.',
    short_desc_en: 'Comprehensive gum disease treatment from inflammation to regenerative procedures.',
    details_ar: 'علاج متخصص للالتهابات اللثوية باستخدام تقنيات التنظيف العميق والعلاج التجديدي لضمان التئام الجروح واستعادة صحة اللثة والأنسجة الداعمة.',
    details_en: 'Specialized periodontal treatment using deep cleaning techniques and regenerative therapy for optimal healing.',
    benefits_ar: 'علاج جذور متكامل، إعادة نمو أنسجة، حماية دائمة من الالتهاب.',
    benefits_en: 'Full root planing treatment, tissue regeneration therapy, permanent inflammation protection.',
    icon: 'MedicalServices',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600',
    sort_order: 5,
    active: true
  },
  {
    id: 'b22cb8f0-15cc-4cbe-b4db-996ff2505b02',
    name_ar: 'التجميل الشامل',
    name_en: 'Comprehensive Cosmetic Dentistry',
    short_desc_ar: 'تحويل كامل لمظهر الابتسامة باستخدام تقنيات التجميل المتقدمة المتعددة.',
    short_desc_en: 'Complete smile transformation using multiple advanced cosmetic dentistry techniques.',
    details_ar: 'نقدم حزمة شاملة من العلاجات التجميلية تشمل التبييض والفينير والعدسات في خطة علاجية موحدة تضمن نتائج مذهلة ومتناغمة.',
    details_en: 'We provide a comprehensive package of cosmetic treatments including whitening, veneers, and lenses in a unified treatment plan.',
    benefits_ar: 'نتائج فورية، ابتسامة جديدة كلياً، تحسن كبير في المظهر العام.',
    benefits_en: 'Instant results, completely new smile, significant improvement in overall appearance.',
    icon: 'Sparkles',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
    sort_order: 6,
    active: true
  },
  {
    id: 'c33cb8f0-15cc-4cbe-b4db-996ff2505b03',
    name_ar: 'رعاية طوارئ الأسنان',
    name_en: 'Emergency Dental Care',
    short_desc_ar: 'خدمات طوارئ أسنان متاحة على مدار الساعة لإدارة الألم والحالات الطارئة.',
    short_desc_en: '24/7 emergency dental services available for pain management and urgent cases.',
    details_ar: 'فريق متخصص جاهز للتعامل مع حالات الطوارئ مثل ألم الأسنان الحاد، الكسور، والعدوى بكفاءة عالية وبدون انتظار.',
    details_en: 'Specialized team ready to handle emergency cases like severe tooth pain, fractures, and infections.',
    benefits_ar: 'خدمة 24/7، استجابة سريعة، تخفيف فوري للألم.',
    benefits_en: '24/7 service, rapid response, immediate pain relief.',
    icon: 'Shield',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    sort_order: 7,
    active: true
  },
  {
    id: 'd44cb8f0-15cc-4cbe-b4db-996ff2505b04',
    name_ar: 'طب أسنان الأطفال',
    name_en: 'Pediatric Dentistry',
    short_desc_ar: 'رعاية أسنان مخصصة للأطفال في بيئة ودية ومريحة لضمان تجربة إيجابية.',
    short_desc_en: 'Specialized dental care for children in a friendly and comfortable environment ensuring positive experience.',
    details_ar: 'نستخدم تقنيات خاصة للتعامل مع الأطفال تجعل زيارتهم للعيادة تجربة ممتعة وخالية من الخوف والتوتر.',
    details_en: 'We use special techniques for children making their clinic visit an enjoyable and fear-free experience.',
    benefits_ar: 'بيئة صديقة للأطفال، معالجة لطيفة، تعليمات صحية ممتعة.',
    benefits_en: 'Kid-friendly environment, gentle treatment, fun health education.',
    icon: 'Activity',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    sort_order: 8,
    active: true
  }
];

export const DEFAULT_GALLERY = [
  {
    id: '0952da34-1001-4a85-bad6-47059a2b3b65',
    service_id: null,
    category: 'technology',
    title_ar: 'روبوت الجراحة الرقمية',
    title_en: 'Digital Surgical Robot',
    description_ar: 'نظام الجراحة الرقمية الموجه بالكمبيوتر لزراعة الأسنان بدقة متناهية.',
    description_en: 'Computer-guided digital surgical system for dental implants with micrometric precision.',
    image_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3c86032f-309f-431d-a96a-18c51fed361d',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
    category: 'before_after',
    title_ar: 'تبييض ليزر احترافي',
    title_en: 'Professional Laser Whitening Results',
    description_ar: 'نتائج مذهلة لتبييض الأسنان بالليزر البارد - 8 درجات أفتح في جلسة واحدة.',
    description_en: 'Amazing results from cold laser whitening - 8 shades lighter in a single session.',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4e2ca766-20e6-4dc2-850f-65ad5af7d08b',
    service_id: null,
    category: 'team',
    title_ar: 'الدكتور مصطفى مع الفريق المساعد',
    title_en: 'Dr. Mustafa with clinical support team',
    description_ar: 'كادر طبي وتمريضي متكامل يقدم لكم الرعاية الطبية الفائقة بروح ملؤها الود والمهنية.',
    description_en: 'A highly qualified team of dental assistants and professionals dedicated to your clinical comfort.',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '51e6cfc1-c78a-4ec8-9fc1-0a02e48f07c6',
    service_id: null,
    category: 'technology',
    title_ar: 'المسح الرقمي ثلاثي الأبعاد CAD-CAM',
    title_en: 'High-Precision 3D CAD-CAM Scan',
    description_ar: 'أجهزة المسح الرقمية المتقدمة لأخذ طبعات دقيقة وتصميم التركيبات والزراعات فورياً.',
    description_en: 'Cutting-edge intraoral 3D scanner for printing high-accuracy mockups and planning implants.',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '84d1be0a-3ba8-407f-9024-829c26a51bc1',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
    category: 'before_after',
    title_ar: 'حالة تجميل كامل بالفينير',
    title_en: 'Full Veneers Smile Makeover',
    description_ar: 'حالة مذهلة لابتسامة هوليوود باستخدام 16 عدسة إيماكس تجميلية فائقة الدقة.',
    description_en: 'Incredible Hollywood smile makeover utilizing 16 premium ultra-thin e.Max veneers.',
    image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '92d38b74-e976-4459-877b-7d06fb2e9d61',
    service_id: null,
    category: 'technology',
    title_ar: 'تصميم الابتسامة بالذكاء الاصطناعي',
    title_en: 'AI Smile Design Technology',
    description_ar: 'برامج ذكية متطورة لتصميم الابتسامة المثالية قبل بدء العلاج.',
    description_en: 'Advanced AI software for designing the perfect smile before treatment begins.',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2b4150d-5a77-4634-b379-2d21fabc834c',
    service_id: null,
    category: 'clinic',
    title_ar: 'غرفة العلاج الفاخرة المجهزة بالكامل',
    title_en: 'Luxury Treatment Suite',
    description_ar: 'بيئة علاجية هادئة ومعقمة مزودة بأعلى معايير التكنولوجيا الطبية وسبل الراحة.',
    description_en: 'A tranquil, fully sterilized environment equipped with premium state-of-the-art dental units.',
    image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'd81074d5-d578-4395-a883-d09e6ca284f9',
    service_id: null,
    category: 'clinic',
    title_ar: 'قسم الجراحات المتقدمة',
    title_en: 'Advanced Surgery Department',
    description_ar: 'غرف عمليات مجهزة بأحدث التقنيات لأجراء العمليات الجراحية الدقيقة.',
    description_en: 'Operating rooms equipped with latest technology for precise surgical procedures.',
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'eb13be53-4516-4535-a207-213c941c0aa3',
    service_id: null,
    category: 'clinic',
    title_ar: 'استقبال المرضى الفاخر',
    title_en: 'Premium Patient Reception',
    description_ar: 'صالة استقبال فاخرة ومريحة لتجربة علاجية مميزة من لحظة الوصول.',
    description_en: 'Luxury and comfortable reception lounge for a distinctive treatment experience from arrival.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f5f6ca27-c3c4-459b-b067-69d37bcf681c',
    service_id: null,
    category: 'team',
    title_ar: 'فريق التصميم الرقمي',
    title_en: 'Digital Design Team',
    description_ar: 'خبراء في تصميم الابتسامات الرقمية باستخدام أحدث برامج CAD-CAM.',
    description_en: 'Experts in digital smile design using latest CAD-CAM software technologies.',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fcace30c-cf07-43e1-a934-61841cbf7da3',
    service_id: null,
    category: 'team',
    title_ar: 'فريق التخدير والرقابة',
    title_en: 'Anesthesia & Monitoring Team',
    description_ar: 'فريق متخصص في التخدير والرقابة الحيوية لضمان راحة وأمان المرضى.',
    description_en: 'Specialized anesthesia and monitoring team ensuring patient comfort and safety.',
    image_url: 'https://images.unsplash.com/photo-1631815588090-4cc6959f2c2f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fe1a770c-7ba9-4aeb-91c9-7f8bb3a9d1c1',
    service_id: 'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
    category: 'before_after',
    title_ar: 'زراعة فورية كاملة',
    title_en: 'Full Immediate Load Implants',
    description_ar: 'استعادة كاملة للابتسامة باستخدام الزراعات الفورية - تحول مذهل في يوم واحد.',
    description_en: 'Complete smile restoration using immediate load implants - amazing transformation in one day.',
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
  }
];

// DATA FETCHING & SYNC FUNCTIONS

/**
 * Fetch clinic settings
 */
export async function getSettings() {
  if (!supabase) return DEFAULT_SETTINGS;
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();
    
    if (error || !data) {
      console.warn('Supabase Settings fetch empty or error, using default settings:', error);
      return DEFAULT_SETTINGS;
    }
    return data;
  } catch (err) {
    console.error('Settings query error:', err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Fetch all registered doctors
 */
export async function getDoctors() {
  if (!supabase) return DEFAULT_DOCTORS;
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Doctors fetch empty or error, using default doctors:', error);
      return DEFAULT_DOCTORS;
    }
    return data;
  } catch (err) {
    console.error('Doctors query error:', err);
    return DEFAULT_DOCTORS;
  }
}

/**
 * Fetch active clinical services
 */
export async function getServices() {
  if (!supabase) return DEFAULT_SERVICES;
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Services fetch empty or error, using default services:', error);
      return DEFAULT_SERVICES;
    }
    return data;
  } catch (err) {
    console.error('Services query error:', err);
    return DEFAULT_SERVICES;
  }
}

/**
 * Fetch clinic gallery photos
 */
export async function getGallery() {
  if (!supabase) return DEFAULT_GALLERY;
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
      console.warn('Supabase Gallery fetch empty or error, using default gallery:', error);
      return DEFAULT_GALLERY;
    }
    return data;
  } catch (err) {
    console.error('Gallery query error:', err);
    return DEFAULT_GALLERY;
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
