import {useState} from 'react';
import {Tab} from './types';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Booking from './components/Booking';
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Star,
  ShieldAlert,
  Home as HomeIcon,
  Sparkles,
  Image,
  User,
  Calendar,
  Mail
} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isAr = locale === 'ar';

  const menuItems = [
    {
      id: 'home' as Tab,
      label: isAr ? 'الرئيسية' : 'Home',
      icon: HomeIcon,
    },
    {
      id: 'services' as Tab,
      label: isAr ? 'الخدمات المميزة' : 'Our Services',
      icon: Sparkles,
    },
    {
      id: 'gallery' as Tab,
      label: isAr ? 'معرض نجاحاتنا' : 'Success Gallery',
      icon: Image,
    },
    {
      id: 'booking' as Tab,
      label: isAr ? 'احجز موعدك' : 'Book Appointment',
      icon: Calendar,
    },
    {
      id: 'about' as Tab,
      label: isAr ? 'عن الدكتور' : 'About Doctor',
      icon: User,
    },
    {
      id: 'contact' as Tab,
      label: isAr ? 'تواصل معنا' : 'Contact Us',
      icon: Mail,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} locale={locale} />;
      case 'services': return <Services locale={locale} />;
      case 'gallery': return <Gallery locale={locale} />;
      case 'about': return <About locale={locale} />;
      case 'contact': return <Contact locale={locale} />;
      case 'booking': return <Booking locale={locale} />;
      default: return <Home onNavigate={setActiveTab} locale={locale} />;
    }
  };

  // Get dynamic header configuration based on active tab and language
  const getHeaderConfig = () => {
    switch (activeTab) {
      case 'about':
        return {
          title: isAr ? 'عن الدكتور' : 'Doctor Profile',
          subtitle: isAr ? 'السيرة المهنية والشهادات' : 'Biography & Credentials',
          showBack: true,
        };
      case 'booking':
        return {
          title: isAr ? 'احجز موعدك' : 'Book Appointment',
          subtitle: isAr ? 'حجز موعد فوري وسهل' : 'Instant clinical scheduling',
          showBack: true,
        };
      case 'services':
        return {
          title: isAr ? 'الخدمات المميزة' : 'Clinical Services',
          subtitle: isAr ? 'رعاية طبية تجميلية متقدمة' : 'Premium aesthetic care',
          showBack: true,
        };
      case 'gallery':
        return {
          title: isAr ? 'معرض نجاحاتنا' : 'Clinic Gallery',
          subtitle: isAr ? 'قصص نجاح واقعية بالصور' : 'Real life transformations',
          showBack: true,
        };
      case 'contact':
        return {
          title: isAr ? 'تواصل معنا' : 'Contact Us',
          subtitle: isAr ? 'مستعدون لخدمتك دائماً' : 'Ready to serve you anytime',
          showBack: true,
        };
      default:
        return {
          title: isAr ? 'د. مصطفى الرفاعي' : 'Dr. Mustafa Al-Rifai',
          subtitle: isAr ? 'طب وتجميل الأسنان' : 'Dental Care & Aesthetics',
          showBack: false,
        };
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#000a12] via-[#001724] to-[#000508] text-[#dde4e6] font-sans overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* iOS-Style Status Bar and Header Container (Always left-to-right to match native phone frame design in the image) */}
      <div className="w-full bg-[#000a12]/60 backdrop-blur-md shrink-0 z-40 flex flex-col" dir="ltr">
        {/* Status Bar */}
        <div className="h-10 px-6 flex justify-between items-center text-xs font-semibold text-white/90 select-none">
          {/* Time (9:41) */}
          <span className="font-sans text-[13px] tracking-tight">9:41</span>
          
          {/* Icons (Signal, Wifi, Battery) */}
          <div className="flex items-center gap-1.5 opacity-90">
            {/* Cellular Signal Icons */}
            <svg className="w-4 h-3.5 fill-current text-white" viewBox="0 0 17 11">
              <rect x="0" y="8" width="2" height="3" rx="0.5" />
              <rect x="3.5" y="6" width="2" height="5" rx="0.5" />
              <rect x="7" y="4" width="2" height="7" rx="0.5" />
              <rect x="10.5" y="2" width="2" height="9" rx="0.5" />
              <rect x="14" y="0" width="2" height="11" rx="0.5" />
            </svg>
            
            {/* Wifi Icon */}
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 16 12">
              <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-3.95-3.95a5.58 5.58 0 0 1 7.9 0l-1.06 1.06a4.08 4.08 0 0 0-5.78 0L4.05 8.05Zm-2.12-2.12a8.58 8.58 0 0 1 12.14 0l-1.06 1.06a7.08 7.08 0 0 0-10.02 0L1.93 5.93ZM0 4a11.38 11.38 0 0 1 16 0l-1.06 1.06A9.88 9.88 0 0 0 1.06 5.06L0 4Z" />
            </svg>

            {/* Battery Icon */}
            <div className="w-[22px] h-[11.5px] border border-white/60 rounded-[3.5px] p-[1.5px] flex items-center relative">
              <div className="h-full w-full bg-white rounded-[1.5px]"></div>
              <div className="absolute right-[-2.5px] top-[3.5px] w-[1.5px] h-[4px] bg-white/60 rounded-r-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Header Bar */}
        <div className="h-14 flex justify-between items-center px-5 relative pb-2">
          {/* Left: Hamburger menu or back button */}
          <div className="flex items-center gap-3">
            {headerConfig.showBack ? (
              <button 
                onClick={() => setActiveTab('home')}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-accent hover:bg-white/10 transition-all cursor-pointer active:scale-90"
                title={isAr ? 'العودة للرئيسية' : 'Back to Home'}
              >
                {isAr ? <ChevronRight size={20} className="stroke-[2.5]" /> : <ChevronLeft size={20} className="stroke-[2.5]" />}
              </button>
            ) : (
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex flex-col gap-[5px] w-6 justify-center h-10 hover:text-accent transition-all cursor-pointer active:scale-90"
                title={isAr ? 'القائمة' : 'Menu'}
              >
                {/* Clean white 3-line hamburger menu matching the image exactly */}
                <span className="w-6 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-6 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-6 h-[2.5px] bg-white rounded-full"></span>
              </button>
            )}

            {/* Dynamic Screen Title (for screens other than Home) */}
            {activeTab !== 'home' && (
              <div className="flex flex-col items-start leading-none gap-0.5 ml-1" dir={isAr ? 'rtl' : 'ltr'}>
                <h1 className="text-sm font-bold text-[#aeecff] drop-shadow-[0_0_8px_rgba(20,216,255,0.4)]">
                  {headerConfig.title}
                </h1>
                <span className="text-[8px] text-[#859398] uppercase tracking-wider font-semibold">
                  {headerConfig.subtitle}
                </span>
              </div>
            )}
          </div>

          {/* Right: Bilingual Selector Pill */}
          <div className="flex items-center bg-[#07303d]/40 border border-[#14d8ff]/20 rounded-full p-0.5 text-xs font-semibold shadow-[0_2px_12px_rgba(20,216,255,0.05)] w-[150px] h-9">
            <button
              onClick={() => setLocale('ar')}
              className={`flex-1 h-full rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center text-[11px] ${
                locale === 'ar'
                  ? 'bg-gradient-to-r from-[#03d4ed] to-[#14d8ff] text-[#001f27] font-black shadow-[0_0_12px_rgba(20,216,255,0.4)]'
                  : 'text-[#dde4e6] hover:text-white opacity-80'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLocale('en')}
              className={`flex-1 h-full rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center text-[11px] ${
                locale === 'en'
                  ? 'bg-gradient-to-r from-[#03d4ed] to-[#14d8ff] text-[#001f27] font-black shadow-[0_0_12px_rgba(20,216,255,0.4)]'
                  : 'text-[#859398] hover:text-white opacity-80'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col bg-transparent">
        {renderContent()}
      </main>

      {/* Background Decorative Bloom */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#14d8ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#14d8ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Slide-out Sidebar Drawer Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            {/* Drawer container */}
            <motion.div
              initial={{x: isAr ? '100%' : '-100%'}}
              animate={{x: 0}}
              exit={{x: isAr ? '100%' : '-100%'}}
              transition={{type: 'spring', damping: 25, stiffness: 220}}
              className={`fixed top-0 bottom-0 w-80 bg-[#0b0f11] z-50 p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.85)] overflow-y-auto no-scrollbar ${
                isAr ? 'right-0 border-l border-white/5' : 'left-0 border-r border-white/5'
              }`}
            >
              {/* Top Section */}
              <div className="space-y-6">
                
                {/* Header within drawer */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-accent/40 overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQGk9T8T-E-dTpTss5FQxeaLgfuT6D7b8knwLxoma7ZhneQUbTV6jegwf83Rz3Wsi-1ojfZUr4lObSfdbX8qJs_GRO-1BDl9AUgNUb0Z60o8xRS9X-FtvMzMNib-qoykcBsefefS1Hhaf0u5mEuLb83liLjH7sos8ZJOA7njPRorV-taMls7PyH_FyRFsPwcu0h8c2UUGlTi9rSDRoelBrHe30tc3qJpL7eQi6euwC_Dofi6FIaIkTEyIqa6zWRKrNA2ZqGbxXlPo" 
                        className="w-full h-full object-cover" 
                        alt="Dr. Mustafa Portrait" 
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#dde4e6]">
                        {isAr ? 'د. مصطفى الرفاعي' : 'Dr. Mustafa Al-Rifai'}
                      </h4>
                      <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                        {isAr ? 'استشاري تجميل الأسنان' : 'Dental aesthetics'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#859398] hover:text-white cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* About Quick Intro */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-widest block">
                    {isAr ? 'فلسفة العيادة الذكية' : 'Smart clinical philosophy'}
                  </span>
                  <p className="text-xs text-[#859398] leading-relaxed text-justify">
                    {isAr 
                      ? 'عيادة تجميل وزراعة الأسنان المتخصصة والمجهزة بأرقى تقنيات المسح الضوئي الرقمية والنمذجة لتصميم الابتسامة الأنسب لملامحك وبدون أي ألم.'
                      : 'Specialized dental care clinic outfitted with digital imaging & modeling systems to craft your perfect smile, pain-free.'}
                  </p>
                </div>

                {/* Navigation Links connected to other screens */}
                <div className="space-y-2.5 py-1">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">
                    {isAr ? 'تصفح عيادتنا' : 'Clinical Navigation'}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsDrawerOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-[#03d4ed]/20 to-[#14d8ff]/10 border-[#14d8ff]/30 text-[#14d8ff] shadow-[0_0_15px_rgba(20,216,255,0.1)]'
                              : 'bg-white/5 border-white/5 text-[#dde4e6] hover:bg-white/10 hover:border-white/10'
                          }`}
                        >
                          <Icon size={16} className={isActive ? 'text-[#14d8ff]' : 'text-[#859398]'} />
                          <span className="flex-1 text-start">{item.label}</span>
                          {isAr ? <ChevronLeft size={14} className="opacity-50" /> : <ChevronRight size={14} className="opacity-50" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Interactive Actions */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-[#859398] uppercase tracking-wider block">
                    {isAr ? 'اتصال وحجز سريع' : 'Instant Help Desk'}
                  </span>
                  
                  <a 
                    href="tel:+97145551234"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer"
                  >
                    <Phone size={16} className="text-accent" />
                    <div>
                      <p className="text-[10px] text-[#859398] leading-none mb-0.5">{isAr ? 'رقم العيادة' : 'Clinic Telephone'}</p>
                      <p className="text-xs font-bold text-[#dde4e6]" dir="ltr">+971 4 555 1234</p>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/971509876543"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all cursor-pointer"
                  >
                    <MessageSquare size={16} className="text-green-400" />
                    <div>
                      <p className="text-[10px] text-[#859398] leading-none mb-0.5">{isAr ? 'الواتساب الطبي' : 'Clinical WhatsApp'}</p>
                      <p className="text-xs font-bold text-[#dde4e6]" dir="ltr">+971 50 987 6543</p>
                    </div>
                  </a>

                  <a 
                    href="#location"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDrawerOpen(false);
                      setActiveTab('contact');
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer"
                  >
                    <MapPin size={16} className="text-accent" />
                    <div>
                      <p className="text-[10px] text-[#859398] leading-none mb-0.5">{isAr ? 'عنوان العيادة' : 'Our Address'}</p>
                      <p className="text-xs font-bold text-[#dde4e6]">{isAr ? 'جميرا، دبي' : 'Jumeirah, Dubai'}</p>
                    </div>
                  </a>
                </div>

                {/* Hours summary */}
                <div className="p-4 bg-[#161d1f] rounded-xl border border-white/5 space-y-2.5">
                  <div className="flex items-center gap-2 text-accent">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{isAr ? 'ساعات الحضور' : 'Clinical Schedule'}</span>
                  </div>
                  <div className="text-[10px] space-y-1 text-[#859398]">
                    <div className="flex justify-between">
                      <span>{isAr ? 'الأحد - الخميس:' : 'Sun - Thu:'}</span>
                      <span className="font-bold text-[#dde4e6]">09:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isAr ? 'الجمعة:' : 'Friday:'}</span>
                      <span className="font-bold text-[#dde4e6]">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isAr ? 'السبت:' : 'Saturday:'}</span>
                      <span className="font-semibold text-accent">{isAr ? 'مغلق' : 'Closed'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="space-y-3 pt-6 border-t border-white/5 text-center">
                <div className="flex justify-center items-center gap-1 text-[10px] font-bold text-accent">
                  <Star size={10} className="fill-accent" />
                  <span>DENTAL AI CLINIC</span>
                  <Star size={10} className="fill-accent" />
                </div>
                <p className="text-[8px] text-[#859398]/50 uppercase tracking-widest font-semibold">
                  {isAr ? 'نهتم بجمال وصحة ابتسامتك' : 'Aesthetic Clinical Care'}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
