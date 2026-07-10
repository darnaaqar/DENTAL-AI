import {motion} from 'motion/react';
import {Tab} from '../types';

interface HomeProps {
  onNavigate: (tab: Tab) => void;
  locale: 'ar' | 'en';
}

export default function Home({onNavigate, locale}: HomeProps) {
  const isAr = locale === 'ar';

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar">
      {/* Hero Header */}
      <motion.section 
        initial={{opacity: 0, y: 15}}
        animate={{opacity: 1, y: 0}}
        className="text-center space-y-2 mt-1"
      >
        {/* Top-Center Elegant Stylized Outline Logo */}
        <div className="flex justify-center mb-1">
          <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_12px_rgba(20,216,255,0.7)]">
            <path d="M 50 15 C 32 15, 23 20, 23 35 C 23 48, 30 55, 33 74 C 34 81, 41 83, 45 80 C 47 78, 50 76, 50 70 C 50 76, 53 78, 55 80 C 59 83, 66 81, 67 74 C 70 55, 77 48, 77 35 C 77 20, 68 15, 50 15 Z" fill="none" stroke="#14d8ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 68 15 L 70 19 L 74 21 L 70 23 L 68 27 L 66 23 L 62 21 L 66 19 Z" fill="#14d8ff" />
            <path d="M 74 28 L 75 30 L 77 31 L 75 32 L 74 34 L 73 32 L 71 31 L 73 30 Z" fill="#14d8ff" />
            <path d="M 22 68 A 32 12 0 0 0 78 68" fill="none" stroke="#14d8ff" strokeWidth="1.5" strokeDasharray="3,3" className="opacity-70" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-white tracking-wide">
          د. مصطفى الرفاعي
        </h1>
        <h2 className="text-xl font-bold text-[#14d8ff] drop-shadow-[0_0_10px_rgba(20,216,255,0.4)]">
          Dr. Mustafa Al-Rifai
        </h2>
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="w-5 h-[1.5px] bg-[#14d8ff]/40"></span>
          <span className="text-sm font-bold text-white tracking-wide">
            طب وتجميل الأسنان
          </span>
          <span className="w-5 h-[1.5px] bg-[#14d8ff]/40"></span>
        </div>
        <p className="text-[11px] text-[#859398] font-bold tracking-widest uppercase">
          Dental Care & Aesthetics
        </p>
      </motion.section>

      {/* Interactive 3D Holographic Stage */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        {/* HUD Scan Effect Container */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 hud-scanline"></div>
          <div className="scan-animation"></div>
        </div>

        {/* Concentric glowing rings stage */}
        <div className="absolute bottom-6 w-80 h-24 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[240px] h-14 rounded-full border border-[#14d8ff]/45 bg-gradient-to-t from-[#14d8ff]/15 to-transparent shadow-[0_0_25px_rgba(20,216,255,0.3)] transform -rotate-[10deg] skew-x-[15deg]"></div>
          <div className="absolute w-[200px] h-10 rounded-full border border-[#03d4ed]/60 shadow-[0_0_15px_rgba(3,212,237,0.35)] transform -rotate-[10deg] skew-x-[15deg]"></div>
          <div className="absolute w-[160px] h-7 rounded-full bg-[#14d8ff]/25 blur-md transform -rotate-[10deg] skew-x-[15deg]"></div>
        </div>

        {/* Central 3D Wireframe Glowing Tooth */}
        <motion.div 
          animate={{y: [0, -8, 0]}}
          transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
          className="relative z-10"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8IhJhiFXgCJoUCUhdnc489Z5-t5f73w8_vrm1xpYXedmkJ03q-koJmRfbOUzS_KQB0wsM6NaXDIHtJwV0K5zDDPGeUiBqxJ1vahCOg4L_EOFtulSHKST682LV0CZ5esHQYRSk_GGGGfRSBitnzecYBWkSCsJoqy8_nsg06W7xEsAhpHHHrHBwqXslITJ85aSDIxTyNuG8ThD74NSybCASpY9V3MVWaet_3GWL3yhamaVQj4dbDGJVwpsxnrt-nByMJbCOw2YSxps"
            className="w-52 h-52 drop-shadow-[0_0_35px_rgba(20,216,255,0.5)]"
            alt="Holographic Tooth"
          />
        </motion.div>

        {/* Faint orbit rotation circle behind the nodes */}
        <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 opacity-40 pointer-events-none"></div>

        {/* Floating Interactive Orbit Nodes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Node 1 (Heart Tooth): Top Left */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, -6, 0]}}
            transition={{duration: 3.5, repeat: Infinity, delay: 0, ease: "easeInOut"}}
            className="absolute left-6 top-[22%] w-14 h-14 bg-[#09151c]/80 border border-[#14d8ff]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              <path d="M12 7c-.6 0-.9.3-.9.9 0 .6.3.9.5 1.5.1.5.2.9.2.9s.1-.4.2-.9c.2-.6.5-.9.5-.9 0-.6-.3-.9-.9-.9z" strokeWidth="1" fill="#14d8ff" />
            </svg>
          </motion.button>

          {/* Node 2 (Dental Implant): Bottom Left */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, 5, 0]}}
            transition={{duration: 4, repeat: Infinity, delay: 0.8, ease: "easeInOut"}}
            className="absolute left-2 bottom-[16%] w-14 h-14 bg-[#09151c]/80 border border-[#14d8ff]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c-2.5 0-3.5 1.5-3.5 4 0 2 1.5 3.5 2.5 6l-.5.5" strokeLinejoin="round" />
              <path d="M15.5 7c0-2.5-1-4-3.5-4" strokeLinejoin="round" />
              <path d="M12 11v9M9.5 13.5h5M9.5 16.5h5M10.5 19.5h3" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Node 3 (Explorer Tooth): Top Right */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, -5, 0]}}
            transition={{duration: 3.8, repeat: Infinity, delay: 1.5, ease: "easeInOut"}}
            className="absolute right-6 top-[12%] w-14 h-14 bg-[#09151c]/80 border border-[#14d8ff]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c-2.5 0-3.5 1.5-3.5 4c0 2 1.5 3.5 2.5 6s1.5-4 2.5-6c0-2.5-1-4-3.5-4z" strokeLinejoin="round" />
              <path d="M5 19c2-2 5-1 7-4M4 20l-1 1" stroke-linecap="round" />
            </svg>
          </motion.button>

          {/* Node 4 (Sparkly Tooth): Bottom Right */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, 6, 0]}}
            transition={{duration: 4.2, repeat: Infinity, delay: 2.2, ease: "easeInOut"}}
            className="absolute right-2 bottom-[24%] w-14 h-14 bg-[#09151c]/80 border border-[#14d8ff]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3C9.5 3 8.5 4.5 8.5 7c0 2.5 1.5 4 2.5 6.5.5 1.5 1 3 1 3s.5-1.5 1-3c1-2.5 2.5-4 2.5-6.5 0-2.5-1-4-3.5-4z" stroke-linejoin="round" />
              <path d="M17 4l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3z" fill="#14d8ff" stroke="none" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Slogan */}
      <motion.section 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.3}}
        className="text-center space-y-1"
      >
        <p className="text-lg font-bold text-white tracking-wide">
          إبتسامة صحية.. مظهر أجمل.. حياة أفضل
        </p>
        <p className="text-sm font-bold text-[#14d8ff] tracking-tight">
          Healthy smile.. Beautiful look.. Better life
        </p>
      </motion.section>

      {/* Category/Service Grid Section */}
      <section className="grid grid-cols-4 gap-2.5">
        {[
          {
            id: 'whitening',
            labelAr: 'تبييض الأسنان',
            labelEn: 'Teeth Whitening',
            svg: (
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9 2 8 4 8 7c0 3 2 5 3 9.5.5 2.25 1 4.5 1 4.5s.5-2.25 1-4.5c1-4.5 3-6.5 3-9.5 0-3-1-5-4-5z" strokeLinejoin="round" />
                <path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5z" fill="#14d8ff" stroke="none" />
                <path d="M5 12l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3z" fill="#14d8ff" stroke="none" />
              </svg>
            )
          },
          {
            id: 'veneers',
            labelAr: 'الفينير',
            labelEn: 'Veneers',
            svg: (
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9 2 8 4 8 7c0 3 2 5 3 9.5.5 2.25 1 4.5 1 4.5s.5-2.25 1-4.5c1-4.5 3-6.5 3-9.5 0-3-1-5-4-5z" strokeLinejoin="round" />
                <path d="M9.5 3C7.5 5 7.5 9 8.5 12C9 13.5 10 15 11 16.5" stroke="#03d4ed" strokeWidth="1.2" strokeDasharray="2,2" />
                <path d="M12 2.5 A 3.5 4.5 0 0 1 15.5 7 C 15.5 9 14.5 11 13.5 13" stroke="#14d8ff" stroke-width="2" stroke-linecap="round" />
              </svg>
            )
          },
          {
            id: 'implants',
            labelAr: 'زراعة الأسنان',
            labelEn: 'Dental Implants',
            svg: (
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9 2 8 4 8 7c0 3 2 5 3 9.5l-.5.5" stroke-linejoin="round" />
                <path d="M16 7c0-3-1-5-4-5" stroke-linejoin="round" />
                <path d="M12 11v10M10 14h4M10 17h4M11 20h2" strokeLinecap="round" />
              </svg>
            )
          },
          {
            id: 'ortho',
            labelAr: 'تقويم الأسنان',
            labelEn: 'Orthodontics',
            svg: (
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9 2 8 4 8 7c0 3 2 5 3 9.5.5 2.25 1 4.5 1 4.5s.5-2.25 1-4.5c1-4.5 3-6.5 3-9.5 0-3-1-5-4-5z" strokeLinejoin="round" />
                <path d="M6 10c3 1.5 9 1.5 12 0" stroke="#14d8ff" stroke-width="2" stroke-linecap="round" />
                <rect x="11" y="9" width="2" height="3" fill="#14d8ff" stroke="none" />
                <rect x="7.5" y="8" width="1.5" height="2.5" fill="#14d8ff" stroke="none" />
                <rect x="15" y="8" width="1.5" height="2.5" fill="#14d8ff" stroke="none" />
              </svg>
            )
          }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => onNavigate('services')}
            className="flex flex-col items-center justify-center p-3.5 border border-[#14d8ff]/15 bg-gradient-to-b from-[#09151c]/70 to-[#03090c]/90 rounded-[22px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.6)] hover:border-[#14d8ff]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {item.svg}
            <span className="text-[10px] font-bold text-center text-white leading-tight mt-3">
              {item.labelAr}
            </span>
            <span className="text-[8px] text-[#859398] uppercase leading-none font-bold text-center mt-1">
              {item.labelEn}
            </span>
          </button>
        ))}
      </section>

      {/* Call to Action Booking Button */}
      <section className="space-y-4 pt-1">
        <button 
          onClick={() => onNavigate('booking')}
          className="w-full bg-gradient-to-r from-[#03d4ed] to-[#14d8ff] h-16 rounded-2xl flex items-center justify-between px-6 shadow-[0_0_20px_rgba(20,216,255,0.4)] hover:shadow-[0_0_30px_rgba(20,216,255,0.6)] active:scale-[0.98] transition-all relative overflow-hidden group cursor-pointer"
        >
          {/* Accent light shine across button */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          
          <div className={`flex-1 flex flex-col ${isAr ? 'text-right' : 'text-left'} justify-center`}>
            <p className="text-base font-black text-[#001f27] leading-tight">
              احجز موعدك الآن
            </p>
            <p className="text-xs text-[#001f27] font-extrabold tracking-wide mt-0.5">
              Book Your Appointment
            </p>
          </div>

          <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 ml-4">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#001f27]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="4" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />
              <circle cx="8" cy="14" r="1.2" fill="currentColor" />
              <circle cx="12" cy="14" r="1.2" fill="currentColor" />
              <circle cx="16" cy="14" r="1.2" fill="currentColor" />
              <circle cx="8" cy="18" r="1.2" fill="currentColor" />
              <circle cx="12" cy="18" r="1.2" fill="currentColor" />
              <circle cx="16" cy="18" r="1.2" fill="currentColor" />
            </svg>
          </div>
        </button>

        {/* Elegant Design Mockup Footer */}
        <div className="flex flex-col items-center justify-center pt-6 pb-2 text-center select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#14d8ff] text-base animate-pulse">✦</span>
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
              {/* Customized shield tooth icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
                <path d="M12 6c-1.5 0-2 1-2 2s.5 1.5 1 2.5c.2.4.5.8.5 1.5s-.2 1.5-.5 2h2c-.3-.5-.5-1.3-.5-2s.3-1.1.5-1.5c.5-1 1-1.5 1-2.5s-.5-2-2-2z" fill="currentColor" stroke="none" />
              </svg>
              <span>نهتم بابتسامتك</span>
            </div>
            <span className="text-[#14d8ff] text-base animate-pulse">✦</span>
          </div>
          <p className="text-[11px] text-[#859398] font-bold mt-1 uppercase tracking-widest">
            We care about your smile
          </p>
        </div>
      </section>
    </div>
  );
}

