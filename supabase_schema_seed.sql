-- ==============================================================================
-- SUPABASE COMPLETE SETUP & SEED SCRIPT
-- CLINIC: Dr. Mustafa Alrifaie Clinics (عيادة د. مصطفى الرفاعي)
-- CITY: Erbil, Kurdistan Region, Iraq (أربيل، إقليم كردستان، العراق)
-- PHONE: +964 66 123 4567 / WhatsApp: +964 66 123 4567
--
-- INSTRUCTIONS FOR SUPABASE SQL EDITOR:
-- 1. Copy the entire contents of this file.
-- 2. Go to your Supabase Dashboard -> SQL Editor -> New Query.
-- 3. Paste and click "RUN".
-- ==============================================================================

-- Enable gen_random_uuid extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. SETTINGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.settings (
  id boolean NOT NULL DEFAULT true CHECK (id),
  clinic_name_ar text,
  clinic_name_en text,
  slogan_ar text,
  slogan_en text,
  address_ar text,
  address_en text,
  working_hours_ar text,
  working_hours_en text,
  phone text,
  whatsapp text,
  email text,
  website text,
  google_map text,
  logo_url text,
  hero_image_url text,
  facebook text,
  instagram text,
  tiktok text,
  youtube text,
  CONSTRAINT settings_pkey PRIMARY KEY (id)
);

-- ------------------------------------------------------------------------------
-- 2. DOCTORS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name_ar text NOT NULL,
  full_name_en text NOT NULL,
  title_ar text,
  title_en text,
  about_ar text,
  about_en text,
  qualifications_ar text,
  qualifications_en text,
  experience_years integer DEFAULT 0,
  image_url text,
  phone text,
  email text,
  whatsapp text,
  facebook text,
  instagram text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT doctors_pkey PRIMARY KEY (id)
);

-- ------------------------------------------------------------------------------
-- 3. SERVICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  short_desc_ar text,
  short_desc_en text,
  details_ar text,
  details_en text,
  benefits_ar text,
  benefits_en text,
  icon text,
  image_url text,
  sort_order integer DEFAULT 1,
  active boolean DEFAULT true,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

-- ------------------------------------------------------------------------------
-- 4. GALLERY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  service_id uuid,
  category text CHECK (category = ANY (ARRAY['clinic'::text, 'before_after'::text, 'technology'::text, 'team'::text])),
  title_ar text,
  title_en text,
  description_ar text,
  description_en text,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT gallery_pkey PRIMARY KEY (id),
  CONSTRAINT gallery_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------------------------
-- 5. APPOINTMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  service_id uuid,
  preferred_language text DEFAULT 'ar'::text CHECK (preferred_language = ANY (ARRAY['ar'::text, 'en'::text])),
  appointment_date date NOT NULL,
  appointment_time time without time zone NOT NULL,
  notes text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'completed'::text, 'cancelled'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies
DROP POLICY IF EXISTS "Allow public read access for settings" ON public.settings;
CREATE POLICY "Allow public read access for settings" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for doctors" ON public.doctors;
CREATE POLICY "Allow public read access for doctors" ON public.doctors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for services" ON public.services;
CREATE POLICY "Allow public read access for services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for gallery" ON public.gallery;
CREATE POLICY "Allow public read access for gallery" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access for appointments" ON public.appointments;
CREATE POLICY "Allow public read access for appointments" ON public.appointments FOR SELECT USING (true);

-- Public Write Access Policies for Appointments
DROP POLICY IF EXISTS "Allow public insert for appointments" ON public.appointments;
CREATE POLICY "Allow public insert for appointments" ON public.appointments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for appointments" ON public.appointments;
CREATE POLICY "Allow public update for appointments" ON public.appointments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete for appointments" ON public.appointments;
CREATE POLICY "Allow public delete for appointments" ON public.appointments FOR DELETE USING (true);

-- ==============================================================================
-- SEED DATA POPULATION
-- ==============================================================================

-- 1. SEED SETTINGS
INSERT INTO public.settings (
  id,
  clinic_name_ar, clinic_name_en,
  slogan_ar, slogan_en,
  address_ar, address_en,
  working_hours_ar, working_hours_en,
  phone, whatsapp, email, website, google_map,
  logo_url, hero_image_url,
  facebook, instagram, tiktok, youtube
) VALUES (
  TRUE,
  'عيادة د. مصطفى الرفاعي لطب وتجميل الأسنان',
  'Dr. Mustafa Alrifaie Clinics',
  'إبتسامة صحية.. مظهر أجمل.. حياة أفضل',
  'Healthy smile.. Beautiful look.. Better life',
  'شارع كوردستان، حي المالكيا، أربيل، إقليم كردستان، العراق',
  'Kurdistan Street, Al-Malikiya District, Erbil, Kurdistan Region, Iraq',
  'الأحد - الخميس: ٩:٠٠ صباحاً - ٩:٠٠ مساءً، الجمعة: ١٠:٠٠ صباحاً - ٦:٠٠ مساءً',
  'Sun - Thu: 9:00 AM - 9:00 PM, Fri: 10:00 AM - 6:00 PM',
  '+964 66 123 4567',
  '964661234567',
  'info@dr-mustafa-clinic.com',
  'https://dr-mustafa-clinic.com',
  'https://maps.google.com/?q=Dr.+Mustafa+Alrifaie+Clinic+Erbil+Iraq',
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
  'https://facebook.com/dr.mustafa.clinic',
  'https://instagram.com/dr.mustafa.clinic',
  'https://tiktok.com/@dr.mustafa.clinic',
  'https://youtube.com/dr.mustafa.clinic'
) ON CONFLICT (id) DO UPDATE SET
  clinic_name_ar = EXCLUDED.clinic_name_ar,
  clinic_name_en = EXCLUDED.clinic_name_en,
  slogan_ar = EXCLUDED.slogan_ar,
  slogan_en = EXCLUDED.slogan_en,
  address_ar = EXCLUDED.address_ar,
  address_en = EXCLUDED.address_en,
  working_hours_ar = EXCLUDED.working_hours_ar,
  working_hours_en = EXCLUDED.working_hours_en,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  email = EXCLUDED.email,
  website = EXCLUDED.website,
  google_map = EXCLUDED.google_map,
  hero_image_url = EXCLUDED.hero_image_url;

-- 2. SEED DOCTOR
INSERT INTO public.doctors (
  id,
  full_name_ar, full_name_en,
  title_ar, title_en,
  about_ar, about_en,
  qualifications_ar, qualifications_en,
  experience_years,
  image_url,
  phone, email, whatsapp,
  facebook, instagram
) VALUES (
  '11111111-2222-3333-4444-555555555555',
  'د. مصطفى الرفاعي',
  'Dr. Mustafa Alrifaie',
  'استشاري زراعة وتجميل الأسنان الرقمية',
  'Consultant in Digital Implantology & Aesthetic Dentistry',
  'يكرس الدكتور مصطفى الرفاعي جهده لتقديم رعاية طبية أسنان حديثة باستخدام التكنولوجيا الرقمية، مع تركيز خاص على زراعة الأسنان والابتسامات الجمالية والعلاج غير الجراحي. تركيزه يقع على التشخيص الدقيق والعلاج المريح ونتائج وظيفية طويلة الأمد.',
  'Dr. Mustafa Alrifaie is dedicated to providing modern dental care using digital technologies with a special focus on implant dentistry, smile rehabilitation, and minimally invasive treatment. His philosophy centers on accurate diagnosis, comfortable treatment, and long-term functional results.',
  'البورد السويسري في تجميل الأسنان، زمالة الجمعية الدولية لزراعة الأسنان (ITI)، دكتوراه طب وجراحة الفم والأسنان.',
  'Swiss Board in Aesthetic Dentistry, Fellow of the International Team for Implantology (ITI), Ph.D. in Dental Medicine & Oral Surgery.',
  15,
  'https://images.unsplash.com/photo-1622249772724-7d9d0b257250?auto=format&fit=crop&q=80&w=600',
  '+964 66 123 4567',
  'dr.mustafa@dr-mustafa-clinic.com',
  '964661234567',
  'https://facebook.com/dr.mustafa.clinic',
  'https://instagram.com/dr.mustafa.clinic'
) ON CONFLICT (id) DO UPDATE SET
  full_name_ar = EXCLUDED.full_name_ar,
  full_name_en = EXCLUDED.full_name_en,
  title_ar = EXCLUDED.title_ar,
  title_en = EXCLUDED.title_en,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp;

-- 3. SEED SERVICES
INSERT INTO public.services (
  id, name_ar, name_en, short_desc_ar, short_desc_en, details_ar, details_en, benefits_ar, benefits_en, icon, image_url, sort_order, active
) VALUES 
(
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
  'زراعة الأسنان الرقمية وغرس واحد',
  'Digital Implantology & One-Piece Implants',
  'تعويض الأسنان المفقودة بغرسات تيتانيوم حيوية موجهة بالكمبيوتر وبدون ألم، بما في ذلك خيارات الغرس ذو القطعة الواحدة.',
  'Replace missing teeth with computer-guided, biological titanium implants painlessly, including one-piece implant options.',
  'نعتمد على التخطيط ثلاثي الأبعاد الموجه بالكمبيوتر لوضع الغرسات بدقة متناهية وتجنب الشقوق الجراحية الكبيرة، مما يضمن شفاءً فائق السرعة واستعادة فورية للابتسامة. نقدم أيضاً غرس واحد للمرضين الذين يستفيدون منه.',
  'Using fully digital 3D CAD-CAM surgical guides, we place premium biocompatible titanium implants with high micrometric precision and minimal healing downtime. We also offer one-piece implants for suitable candidates.',
  'إجراء بدون ألم، ثبات دائم مدى الحياة، استعادة كاملة لوظيفة وصحة الفك، خيار الغرس ذو القطعة الواحدة.',
  'Painless clinical setup, lifelong structural durability, flawless natural chewing and health restoration, one-piece implant option.',
  'Shield',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
  1, true
),
(
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
  'الفينير والتصميم الجمالي للابتسامة',
  'Premium Veneers & Cosmetic Smile Design',
  'ابتسامة هوليوود المتناسقة والمصممة خصيصاً لتناسب ملامح وجهك بدقة متناهية باستخدام تقنية التصميم الرقمي.',
  'Your custom-crafted Hollywood smile, designed digitally to match your facial proportions.',
  'نستخدم تقنية عدسات الإيماكس (e.Max) السويسرية فائقة الرقة لتقديم ابتسامة متناسقة مفعمة بالحيوية واللمعان تتطلب الحد الأدنى من تحضير الأسنان. يتم التصميم باستخدام الذكاء الاصطناعي لضمان أفضل النتائج.',
  'We craft ultra-thin biological porcelain e.Max veneers tailored to your mouth structure to give you an extremely natural smile with minimal tooth reduction, designed using AI for optimal results.',
  'تعديل فوري للون والاصطفاف، مظهر طبيعي 100% متناسق حيوياً، مقاوم تماماً للتصبغات، تصميم بالذكاء الاصطناعي.',
  'Instant shade and alignment restoration, 100% life-like translucency, highly stain-resistant finish, AI-powered design.',
  'Smile',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
  2, true
),
(
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
  'تبييض الأسنان بالليزر',
  'Laser Teeth Whitening',
  'ابتسامة ناصعة البياض خالية من الحساسية خلال جلسة واحدة بأحدث تقنيات الليزر البارد.',
  'Bright white, sensitivity-free smile in one session using premium cold laser systems.',
  'جلسة تبييض متكاملة مدتها 45 دقيقة تجمع بين مادة التبييض النشطة وموجات الليزر البارد المتطورة لضمان إزالة تامة للتصبغات العنيدة بدون أي ألم.',
  'A complete 45-minute treatment combining state-of-the-art cold laser and customized clinical whitening agents to eliminate deepest stains painlessly.',
  'تبييض يصل إلى 8 درجات أفتح، حماية كاملة للمينا، حماية ضد حساسية اللثة والأسنان.',
  'Up to 8 shades lighter, zero-enamel wearing formula, complete defense against gum sensitivity.',
  'Sparkles',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600',
  3, true
),
(
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea4',
  'تقويم الأسنان غير المرئي',
  'Clear Aligners (Orthodontics)',
  'اصطفاف أسنان مثالي مع قوالب شفافة ومريحة قابلة للإزالة دون حديد أو أسلاك، مثالي لكبار السن.',
  'Achieve perfect alignment with fully removable, transparent clear aligners without metal braces, ideal for adults.',
  'تعديل اصطفاف الأسنان باستخدام تقنية إنفاجليكس الرائدة وسلسة من القوالب الشفافة التي يتم تصميمها خصيصاً بنمذجة ثلاثية الأبعاد لتتحرك أسنانك برفق إلى الموقع الصحيح.',
  'Straighten teeth with Invisalign advanced technology, featuring custom-crafted clear aligner series built via high-precision 3D digital scans for active, gentle tooth motion.',
  'شفاف وغير مرئي تماماً، مريح جداً وقابل للإزالة لتناول الطعام، مثالي للبالغين، حماية تامة للثة والأسنان.',
  'Virtually invisible, comfortable and removable, ideal for adults, promotes excellent oral hygiene and wellness.',
  'Activity',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
  4, true
) ON CONFLICT (id) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  image_url = EXCLUDED.image_url;

-- 4. SEED GALLERY
INSERT INTO public.gallery (
  id, service_id, category, title_ar, title_en, description_ar, description_en, image_url
) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea2',
  'before_after',
  'تصميم الابتسامة ومظهر الفينير',
  'Veneers Cosmetic Smile Design Result',
  'ابتسامة هوليوود باستخدام فينير إيماكس ناعم جداً - تحويل مذهل في جلسة واحدة.',
  'Hollywood smile using ultra-thin e.Max veneers - amazing transformation in one session.',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
),
(
  'a0000000-0000-0000-0000-000000000002',
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea3',
  'before_after',
  'تبييض ليزر احترافي',
  'Professional Laser Whitening Results',
  'نتائج مذهلة لتبييض الأسنان بالليزر البارد - 8 درجات أفتح في جلسة واحدة.',
  'Amazing results from cold laser whitening - 8 shades lighter in a single session.',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600'
),
(
  'a0000000-0000-0000-0000-000000000003',
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea1',
  'before_after',
  'زراعة واحدة وغرس كامل',
  'One-Piece & Full Arch Implants',
  'استعادة كاملة للابتسامة باستخدام الزراعات الفورية والغرس ذو القطعة الواحدة.',
  'Complete smile restoration using immediate load and one-piece implants.',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
),
(
  'a0000000-0000-0000-0000-000000000004',
  'e18cb8f0-15cc-4cbe-b4db-996ff2505ea4',
  'before_after',
  'تقويم الأسنان بالإنفاجليكس',
  'Invisalign Treatment Transformation',
  'تحويل ابتسامة كاملة باستخدام قوالب إنفاجليكس الشفافة - نتائج طبيعية ومريحة.',
  'Complete smile transformation using clear Invisalign aligners - natural and comfortable results.',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600'
),
(
  'a0000000-0000-0000-0000-000000000005',
  NULL,
  'technology',
  'المسح الرقمي ثلاثي الأبعاد CAD-CAM',
  'High-Precision 3D CAD-CAM Scan',
  'أجهزة المسح الرقمية المتقدمة لأخذ طبعات دقيقة وتصميم التركيبات والزراعات فورياً.',
  'Cutting-edge intraoral 3D scanner for printing high-accuracy mockups and planning implants.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
),
(
  'a0000000-0000-0000-0000-000000000006',
  NULL,
  'clinic',
  'غرفة العلاج الفاخرة المجهزة بالكامل',
  'Luxury Treatment Suite',
  'بيئة علاجية هادئة ومعقمة مزودة بأعلى معايير التكنولوجيا الطبية وسبل الراحة.',
  'A tranquil, fully sterilized environment equipped with premium state-of-the-art dental units.',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
) ON CONFLICT (id) DO UPDATE SET
  title_ar = EXCLUDED.title_ar,
  title_en = EXCLUDED.title_en,
  image_url = EXCLUDED.image_url;

-- ==============================================================================
-- ALL DONE!
-- ==============================================================================
