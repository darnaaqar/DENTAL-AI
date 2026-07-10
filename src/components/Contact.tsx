import {motion} from 'motion/react';
import {Phone, MessageCircle, MapPin, Clock} from 'lucide-react';

interface ContactProps {
  locale: 'ar' | 'en';
}

export default function Contact({locale}: ContactProps) {
  const isAr = locale === 'ar';

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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoKXEcyqsem-IaThQzsPTZCFqph6F-vKKg5i4UALBiIW_N8xQlgkcMYO1DVaILF_RUAHOV3V0ni8eC1h_MELEdklkAEJx1oe0aD1LxOi-Ra7tJOdqFG5zFamuLjYvh2RY2NRicITOAP3XQDG8j5w9e-k6d6h1yLxMIfo2f43nxdSTnbahhZfGjdeg33ovIOXIQ2Nx_35NAouGSx45MmKiAalwxiHdsnojpfJWaIn1SQzl-IrxA3UWDgtUutL2A2bbkKB2mj9uEF3c" 
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
                  {isAr ? 'جميرا، دبي، الإمارات' : 'Jumeirah, Dubai, UAE'}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0"></span>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-4 z-10 ${isAr ? 'left-4' : 'right-4'}`}>
            <button className="bg-accent hover:opacity-90 text-[#001f27] px-5 py-2 rounded-xl font-bold text-[9px] uppercase tracking-wider shadow-lg shadow-accent/20 active:scale-95 transition-all cursor-pointer">
              {isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}
            </button>
          </div>
          <div className="scan-animation"></div>
        </div>

        {/* Contact Links */}
        <div className="space-y-4">
          <a 
            href="tel:+97145551234"
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
                +971 4 555 1234
              </h3>
            </div>
          </a>

          <a 
            href="https://wa.me/971509876543"
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
                +971 50 987 6543
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
            {[
              {
                day: isAr ? 'الأحد - الخميس' : 'Sunday - Thursday',
                time: isAr ? '09:00 صباحاً - 08:00 مساءً' : '09:00 AM - 08:00 PM'
              },
              {
                day: isAr ? 'الجمعة' : 'Friday',
                time: isAr ? '10:00 صباحاً - 06:00 مساءً' : '10:00 AM - 06:00 PM'
              },
              {
                day: isAr ? 'السبت' : 'Saturday',
                time: isAr ? 'مغلق (عطلة رسمية)' : 'Closed (Official Holiday)',
                closed: true
              },
            ].map((item, i) => (
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
