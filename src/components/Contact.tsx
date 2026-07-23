import {motion} from 'motion/react';
import {Phone, MessageCircle, MapPin, Clock} from 'lucide-react';

interface ContactProps {
  locale: 'ar' | 'en';
  settings: any;
}

export default function Contact({locale, settings}: ContactProps) {
  const isAr = locale === 'ar';

  const workingHoursList = (isAr 
    ? (settings?.working_hours_ar ? settings.working_hours_ar.split('|') : ['الأحد - الخميس: 09:00 صباحاً - 08:00 مساءً', 'الجمعة: 10:00 صباحاً - 06:00 مساءً', 'السبت: مغلق (عطلة رسمية)'])
    : (settings?.working_hours_en ? settings.working_hours_en.split('|') : ['Sunday - Thursday: 09:00 AM - 08:00 PM', 'Friday: 10:00 AM - 06:00 PM', 'Saturday: Closed (Official Holiday)'])
  ).map((line: string) => {
    const parts = line.split(':');
    const day = parts[0] || '';
    const time = parts.slice(1).join(':') || '';
    const closed = time.includes('مغلق') || time.toLowerCase().includes('closed');
    return { day, time, closed };
  });

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      <header className={isAr ? 'text-right' : 'text-left'}>
        <p className="text-[10px] text-accent uppercase tracking-[0.2em] mb-1 font-bold">
          {isAr ? 'تواصل معنا' : 'Contact Us'}
        </p>
        <h2 className="text-xl font-bold text-[#dde4e6] mb-2 leading-snug">
          {isAr ? (
            <>نحن هنا للعناية <span className="text-accent font-extrabold">بابتسامتك المستقبلية</span></>
          ) : (
            <>We are here for your <span className="text-accent font-extrabold">Future Smile</span></>
          )}
        </h2>
        <div className={`h-[1px] w-24 bg-gradient-to-r ${isAr ? 'from-accent to-transparent' : 'from-transparent to-accent'}`}></div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {/* Map Card */}
        <div className="glass-card rounded-xl aspect-[4/3] relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover opacity-60 filter grayscale saturate-150 contrast-125 group-hover:scale-105 transition-transform duration-700"
            alt="Clinic Map Location"
          />
          <div className={`absolute top-4 z-10 ${isAr ? 'right-4' : 'left-4'}`}>
            <div className="bg-[#0e1417]/85 backdrop-blur-md p-3 rounded-lg border border-white/10 flex flex-col">
              <span className="text-[9px] text-accent mb-0.5 font-bold uppercase tracking-wider">
                {isAr ? 'الموقع المباشر' : 'Live Clinic Address'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#dde4e6] font-medium">
                  {isAr ? (settings?.address_ar || 'شارع كوردستان، أربيل، العراق') : (settings?.address_en || 'Kurdistan Street, Erbil, Iraq')}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0"></span>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-4 z-10 ${isAr ? 'left-4' : 'right-4'}`}>
            <a 
              href={settings?.google_map || 'https://maps.google.com/?q=Dr.+Mustafa+Alrifaie+Clinic+Erbil+Iraq'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent hover:opacity-90 text-[#001f27] px-5 py-2 rounded-xl font-bold text-[9px] uppercase tracking-wider shadow-lg shadow-accent/20 active:scale-95 transition-all cursor-pointer inline-block"
            >
              {isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}
            </a>
          </div>
          <div className="scan-animation"></div>
        </div>

        {/* Contact Links */}
        <div className="space-y-4">
          <a 
            href={`tel:${settings?.phone || '+964661234567'}`}
            className="glass-card p-4 rounded-xl flex items-center gap-4 group hover:border-accent/40 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-all shrink-0">
              <Phone size={22} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-[#859398] mb-0.5 uppercase font-bold tracking-wider">
                {isAr ? 'الهاتف المباشر للعيادة' : 'Direct Clinic Phone'}
              </p>
              <h3 className="text-base font-bold text-[#dde4e6]" dir="ltr">
                {settings?.phone || '+964 66 123 4567'}
              </h3>
            </div>
          </a>

          <a 
            href={`https://wa.me/${(settings?.whatsapp || '964661234567').replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="glass-card p-4 rounded-xl flex items-center gap-4 group hover:border-green-500/40 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-all shrink-0">
              <MessageCircle size={22} />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-[#859398] mb-0.5 uppercase font-bold tracking-wider">
                {isAr ? 'واتساب الاستشارات السريع' : 'Instant WhatsApp Consult'}
              </p>
              <h3 className="text-base font-bold text-[#dde4e6]" dir="ltr">
                {settings?.whatsapp || '+964 66 123 4567'}
              </h3>
            </div>
          </a>
        </div>

        {/* Working Hours */}
        <div className="glass-card p-5 rounded-2xl space-y-4 border-l-2 border-accent/40">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Clock className="text-accent shrink-0" size={18} />
            <h3 className="text-sm font-bold text-[#dde4e6]">
              {isAr ? 'ساعات العمل الرسمية' : 'Clinic Operating Hours'}
            </h3>
          </div>
          <ul className="space-y-3.5">
            {workingHoursList.map((item, i) => (
              <li key={i} className="flex justify-between items-center text-xs leading-none">
                <span className="text-[#859398] font-semibold">{item.day}</span>
                <span className={`font-bold ${item.closed ? 'text-accent' : 'text-[#dde4e6]'}`}>
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
