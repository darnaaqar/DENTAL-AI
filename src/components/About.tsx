import {motion} from 'motion/react';
import {GraduationCap, Briefcase, Microscope, Calendar} from 'lucide-react';

interface AboutProps {
  locale: 'ar' | 'en';
  doctor: any;
}

export default function About({locale, doctor}: AboutProps) {
  const isAr = locale === 'ar';

  const stats = [
    {
      label: isAr ? 'سنوات الخبرة' : 'Years Experience',
      value: `+${doctor?.experience_years || '15'}`,
      color: 'text-accent'
    },
    {
      label: isAr ? 'حالة ناجحة' : 'Successful Cases',
      value: '+5000',
      color: 'text-[#03d4ed]'
    },
    {
      label: isAr ? 'شهادات دولية' : 'Certifications',
      value: '+10',
      color: 'text-[#feba29]'
    },
  ];

  const parsedQualificationsAr = doctor?.qualifications_ar 
    ? doctor.qualifications_ar.split('|') 
    : [
        'ماجستير في طب الأسنان التجميلي - الأكاديمية الدولية لطب الأسنان التجميلي',
        'عضو الجمعية الأمريكية لطب الأسنان (ADA)',
        'دورات متقدمة في زراعة وتجميل الأسنان والنمذجة ثلاثية الأبعاد'
      ];

  const parsedQualificationsEn = doctor?.qualifications_en 
    ? doctor.qualifications_en.split('|') 
    : [
        'Master in Cosmetic Dentistry - International Academy of Cosmetic Dentistry',
        'Member of ADA - American Dental Association',
        'Advanced Dental Implant Specialist - Implants & Aesthetics'
      ];

  const qualifications = isAr ? parsedQualificationsAr : parsedQualificationsEn;

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      <section className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-40 h-40 rounded-full border-2 border-accent/50 p-1.5 overflow-hidden shadow-[0_0_30px_rgba(20,216,255,0.3)]">
            <img 
              src={doctor?.image_url || "/src/assets/images/doctor_mustafa_1783724318809.jpg"} 
              className="w-full h-full rounded-full object-cover"
              alt="Dr. Mustafa"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-accent neon-glow">
            {isAr ? (doctor?.full_name_ar || 'د. مصطفى الرفاعي') : (doctor?.full_name_en || 'Dr. Mustafa Al-Rifai')}
          </h2>
          <p className="text-[#bbc9ce] opacity-80 text-sm">
            {isAr ? (doctor?.title_ar || 'استشاري طب وتجميل الأسنان') : (doctor?.title_en || 'Consultant in Dental Care & Aesthetics')}
          </p>
          <p className="text-accent text-[9px] font-bold tracking-widest uppercase mt-1">
            {isAr ? 'تكنولوجيا الغد لرعاية أسنانك اليوم' : "Tomorrow's Tech for Today's Teeth"}
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className={`glass-card rounded-xl p-4 flex flex-col items-center justify-center ${isAr ? 'border-r-2 border-r-accent' : 'border-l-2 border-l-accent'}`}>
            <span className={`${stat.color} text-2xl font-bold`}>{stat.value}</span>
            <span className="text-[9px] text-[#859398] font-bold uppercase text-center leading-tight mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Qualifications */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-accent" size={20} />
          <h3 className="text-base font-bold text-[#dde4e6]">
            {isAr ? 'المؤهلات العلمية والشهادات' : 'Scientific Qualifications'}
          </h3>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        <div className="space-y-3">
          {qualifications.map((q, i) => {
            const parts = q.split(' - ');
            const title = parts[0] || '';
            const subtitle = parts[1] || '';
            return (
              <div key={i} className="glass-card p-4 rounded-xl flex items-start gap-4 hover:border-accent/40 transition-colors">
                <div className="bg-accent/10 p-2 rounded-lg shrink-0">
                  <GraduationCap className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-sm">{title}</h4>
                  {subtitle && <p className="text-[#bbc9ce] text-xs mt-1 leading-snug">{subtitle}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Philosophy */}
      <section className={`glass-card p-5 rounded-2xl relative overflow-hidden ${isAr ? 'border-r-4 border-accent/40' : 'border-l-4 border-accent/40'}`}>
        <div className="flex items-center gap-2 mb-3">
          <Microscope className="text-accent" size={20} />
          <h3 className="text-base font-bold text-[#dde4e6]">
            {isAr ? 'فلسفتنا في العلاج' : 'Treatment Philosophy'}
          </h3>
        </div>
        <p className="text-[#bbc9ce] leading-relaxed text-sm text-justify">
          {isAr 
            ? (doctor?.about_ar || 'نؤمن بأن الابتسامة هي نافذة الروح، لذلك نسخر أحدث تقنيات الذكاء الاصطناعي والنمذجة ثلاثية الأبعاد لنمنح مرضانا أدق النتائج وأجمل المظاهر، مع ضمان تجربة علاجية فاخرة وخالية من الألم تماماً.')
            : (doctor?.about_en || 'We believe a smile is the window to the soul. Thus, we utilize cutting-edge AI and 3D modeling to deliver the most precise and stunning results, ensuring a completely premium, painless clinical experience.')}
        </p>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="text-accent" size={20} />
          <h3 className="text-base font-bold text-[#dde4e6]">
            {isAr ? 'المسيرة المهنية' : 'Professional Timeline'}
          </h3>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        <div className={`relative space-y-8 before:absolute before:top-2 before:bottom-2 before:w-0.5 before:bg-accent/20 ${isAr ? 'pr-4 before:right-0' : 'pl-4 before:left-0'}`}>
          <div className={`relative ${isAr ? 'pr-8' : 'pl-8'}`}>
            <div className={`absolute top-1.5 w-3 h-3 bg-accent rounded-full shadow-[0_0_8px_rgba(20,216,255,0.8)] ${isAr ? '-right-1' : '-left-1'}`}></div>
            <div>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                {isAr ? '2020 - اليوم' : '2020 - Present'}
              </span>
              <h4 className="font-bold text-[#dde4e6] mt-1 text-sm">
                {isAr ? 'رئيس قسم التجميل وزراعة الأسنان الرقمية' : 'Head of Cosmetic & Digital Dentistry'}
              </h4>
              <p className="text-xs text-[#859398] mt-1 leading-snug">
                {isAr 
                  ? 'إدارة وتطوير بروتوكولات تجميل الأسنان الرقمية والنمذجة ثلاثية الأبعاد.'
                  : 'Managing digital dental design protocols, full-mouth reconstruction, and 3D dental modeling.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
