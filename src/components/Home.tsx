import {motion} from 'motion/react';
import {Tab} from '../types';

interface HomeProps {
  onNavigate: (tab: Tab) => void;
  locale: 'ar' | 'en';
  settings?: any;
  doctor?: any;
  services?: any[];
}

export default function Home({onNavigate, locale, settings, doctor, services}: HomeProps) {
  const isAr = locale === 'ar';


  return (
    <div className="relative flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar">
      {/* Absolute high-tech vector waves and grid overlay matching the background of the reference image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <svg className="absolute w-full h-[700px] top-0 left-0 text-[#14d8ff]" fill="none" viewBox="0 0 375 700">
          <path d="M-50,120 Q80,20 187,150 T425,90" stroke="currentColor" strokeWidth="1" />
          <path d="M-50,135 Q80,35 187,165 T425,105" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M-50,105 Q80,5 187,135 T425,75" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          
          <path d="M-50,340 C80,240 137,410 425,280" stroke="currentColor" strokeWidth="0.8" />
          <path d="M-50,355 C80,255 137,425 425,295" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          
          <pattern id="home-bg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#home-bg-grid)" />
        </svg>
      </div>

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

        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          {doctor?.full_name_ar || 'د. مصطفى الرفاعي'}
        </h1>
        <h2 className="text-xl font-bold text-[#14d8ff] drop-shadow-[0_0_12px_rgba(20,216,255,0.5)]">
          {doctor?.full_name_en || 'Dr. Mustafa Al-Rifai'}
        </h2>
        
        {/* Symmetric subtitle rows with line dividers to match reference image */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#14d8ff]/60"></span>
            <span className="text-sm font-bold text-white tracking-wide">
              {doctor?.title_ar || 'طب وتجميل الأسنان'}
            </span>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#14d8ff]/60"></span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#859398] font-semibold tracking-widest uppercase">
            <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#14d8ff]/30"></span>
            <span>{doctor?.title_en || 'Dental Care & Aesthetics'}</span>
            <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#14d8ff]/30"></span>
          </div>
        </div>
      </motion.section>

      {/* Interactive 3D Holographic Stage */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
        {/* HUD Scan Effect Container */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 hud-scanline"></div>
          <div className="scan-animation"></div>
        </div>

        {/* Concentric glowing rings stage */}
        <div className="absolute bottom-4 w-full flex flex-col items-center justify-center pointer-events-none z-10">
          {/* Faint outermost ring */}
          <div className="absolute w-[330px] h-14 rounded-full border border-[#14d8ff]/10"></div>
          
          {/* Middle dashed/tick ring */}
          <div className="absolute w-[280px] h-[34px] rounded-full border border-dashed border-[#14d8ff]/30"></div>
          
          {/* Outer glowing floor ring */}
          <div className="absolute w-[240px] h-[30px] rounded-full border-2 border-[#14d8ff]/40 shadow-[0_0_20px_rgba(20,216,255,0.4)]"></div>

          {/* Glow base shadow */}
          <div className="absolute w-[190px] h-6 rounded-full bg-[#14d8ff]/25 blur-md"></div>
          
          {/* 3D Cylinder Platform */}
          <div className="relative w-[160px] h-10 flex flex-col items-center justify-start mt-4">
            {/* Top glowing surface */}
            <div className="absolute top-0 w-full h-5 rounded-full bg-gradient-to-b from-[#14d8ff] to-[#03d4ed]/40 border border-white/50 shadow-[0_0_25px_rgba(20,216,255,0.95),inset_0_1px_1px_rgba(255,255,255,0.5)] z-20">
              {/* Inner brighter core */}
              <div className="absolute inset-[3px] rounded-full bg-white/80 blur-[1px] shadow-[0_0_12px_rgba(20,216,255,0.9)]"></div>
            </div>
            
            {/* Front curved face (extrusion height) */}
            <div className="absolute top-2 w-full h-5 bg-gradient-to-b from-[#03d4ed]/80 to-[#001f27]/90 border-x border-b border-[#14d8ff]/70 rounded-b-full shadow-[0_8px_16px_rgba(0,0,0,0.7)] z-10 flex items-center justify-around overflow-hidden px-5">
              {/* Vertical neon light notches for futuristic detail */}
              <div className="w-[1.5px] h-2 bg-[#14d8ff] shadow-[0_0_4px_#14d8ff] opacity-80"></div>
              <div className="w-[1.5px] h-2 bg-[#14d8ff] shadow-[0_0_4px_#14d8ff] opacity-80"></div>
              <div className="w-[1.5px] h-2 bg-[#14d8ff] shadow-[0_0_4px_#14d8ff] opacity-80"></div>
              <div className="w-[1.5px] h-2 bg-[#14d8ff] shadow-[0_0_4px_#14d8ff] opacity-80"></div>
              <div className="w-[1.5px] h-2 bg-[#14d8ff] shadow-[0_0_4px_#14d8ff] opacity-80"></div>
            </div>
          </div>
          
          {/* Upward spotlight beam */}
          <div className="absolute bottom-5 w-32 h-24 bg-gradient-to-t from-[#14d8ff]/35 to-transparent blur-md rounded-full transform -translate-y-2"></div>
        </div>

        {/* Rotating Futuristic HUD Ring background */}
        <motion.div 
          animate={{rotate: 360}}
          transition={{duration: 25, repeat: Infinity, ease: "linear"}}
          className="absolute w-[320px] h-[320px] flex items-center justify-center opacity-25 pointer-events-none z-0"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh4lb4p54bnmUtkV_mfM7kl1ekflE8O7EThW8Jtx7JY4FX7Agi2SIV_d97GJRtwR0unjCwvpWE7oZCXPmez50-j_UY2ndV71pfXPxndDJgxnGIRsCU-gAEuNK3iKNARZO-TWctfaviPcZfAs-qNEcrBzN2Ke2K12TAz8wA2DzsPZwA-ux9zK_GXpznrB_P9vLP8vIYafXbjexhpWCULunwg_M3I-qRw7n9SgsA71pQMdqs6ALdigSAkM3YsXz7MSsJEjUCjnf_zH0"
            className="w-full h-full scale-105 filter drop-shadow-[0_0_20px_rgba(20,216,255,0.45)]"
            alt="HUD Background"
          />
        </motion.div>

        {/* Central 3D Wireframe Glowing Tooth */}
        <motion.div 
          animate={{
            y: [2, -6, 2],
            filter: [
              "drop-shadow(0 0 25px rgba(20,216,255,0.45))",
              "drop-shadow(0 0 45px rgba(20,216,255,0.75))",
              "drop-shadow(0 0 25px rgba(20,216,255,0.45))"
            ]
          }}
          transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
          className="relative z-10 -mt-10"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8IhJhiFXgCJoUCUhdnc489Z5-t5f73w8_vrm1xpYXedmkJ03q-koJmRfbOUzS_KQB0wsM6NaXDIHtJwV0K5zDDPGeUiBqxJ1vahCOg4L_EOFtulSHKST682LV0CZ5esHQYRSk_GGGGfRSBitnzecYBWkSCsJoqy8_nsg06W7xEsAhpHHHrHBwqXslITJ85aSDIxTyNuG8ThD74NSybCASpY9V3MVWaet_3GWL3yhamaVQj4dbDGJVwpsxnrt-nByMJbCOw2YSxps"
            className="w-48 h-48 object-contain"
            alt="Holographic Tooth"
          />
        </motion.div>

        {/* Floating Interactive Orbit Nodes */}
        <div className="absolute inset-0 pointer-events-none z-25">
          {/* Node 1 (Heart Tooth): Top Left */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, -6, 0]}}
            transition={{duration: 3.5, repeat: Infinity, delay: 0, ease: "easeInOut"}}
            className="absolute left-8 top-[16%] w-[60px] h-[60px] bg-[#09151c]/90 border border-[#14d8ff]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.4)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M 50 25 C 40 10, 15 10, 15 35 C 15 60, 50 85, 50 85 C 50 85, 85 60, 85 35 C 85 10, 60 10, 50 25 Z" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M 50 35 C 43 35, 38 38, 38 45 C 38 52, 42 56, 44 64 C 44 67, 47 68, 49 67 C 50 66, 50 64, 50 62 C 50 64, 50 66, 51 67 C 53 68, 56 67, 56 64 C 58 56, 62 52, 62 45 C 62 38, 57 35, 50 35 Z" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Node 2 (Dental Implant): Bottom Left */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, 5, 0]}}
            transition={{duration: 4, repeat: Infinity, delay: 0.8, ease: "easeInOut"}}
            className="absolute left-4 bottom-[20%] w-[60px] h-[60px] bg-[#09151c]/90 border border-[#14d8ff]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.4)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M 50 20 C 38 20, 32 23, 32 35 C 32 45, 38 48, 42 56 C 45 56, 55 56, 58 56 C 62 48, 68 45, 68 35 C 68 23, 62 20, 50 20 Z" strokeLinejoin="round" />
              <path d="M 50 56 L 50 85" strokeWidth="5" strokeLinecap="round" />
              <path d="M 40 64 L 60 64" strokeWidth="4" strokeLinecap="round" />
              <path d="M 42 71 L 58 71" strokeWidth="4" strokeLinecap="round" />
              <path d="M 44 78 L 56 78" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Node 3 (Orthodontics Tooth): Top Right */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, -5, 0]}}
            transition={{duration: 3.8, repeat: Infinity, delay: 1.5, ease: "easeInOut"}}
            className="absolute right-8 top-[16%] w-[60px] h-[60px] bg-[#09151c]/90 border border-[#14d8ff]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.4)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M 50 20 C 32 20, 23 25, 23 40 C 23 53, 30 60, 33 79 C 34 86, 41 88, 45 85 C 47 83, 50 81, 50 75 C 50 81, 53 81, 55 85 C 59 88, 66 86, 67 79 C 70 60, 77 53, 77 40 C 77 25, 68 20, 50 20 Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 23 44 C 35 46.5, 65 46.5, 77 44" stroke="#14d8ff" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="44" y="40" width="12" height="10" rx="1.5" fill="#14d8ff" stroke="none" />
              <path d="M 50 36 L 50 54" stroke="#14d8ff" strokeWidth="2.5" />
              <rect x="31" y="39" width="8" height="8" rx="1" fill="#14d8ff" stroke="none" />
              <rect x="61" y="39" width="8" height="8" rx="1" fill="#14d8ff" stroke="none" />
            </svg>
          </motion.button>

          {/* Node 4 (Sparkly Tooth): Bottom Right */}
          <motion.button
            onClick={() => onNavigate('services')}
            animate={{y: [0, 6, 0]}}
            transition={{duration: 4.2, repeat: Infinity, delay: 2.2, ease: "easeInOut"}}
            className="absolute right-4 bottom-[20%] w-[60px] h-[60px] bg-[#09151c]/90 border border-[#14d8ff]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,216,255,0.4)] pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M 50 20 C 32 20, 23 25, 23 40 C 23 53, 30 60, 33 79 C 34 86, 41 88, 45 85 C 47 83, 50 81, 50 75 C 50 81, 53 81, 55 85 C 59 88, 66 86, 67 79 C 70 60, 77 53, 77 40 C 77 25, 68 20, 50 20 Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 72 25 L 74 29 L 78 31 L 74 33 L 72 37 L 70 33 L 66 31 L 70 29 Z" fill="#14d8ff" stroke="none" />
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
          {settings?.slogan_ar || 'إبتسامة صحية.. مظهر أجمل.. حياة أفضل'}
        </p>
        <p className="text-sm font-bold text-[#14d8ff] tracking-tight">
          {settings?.slogan_en || 'Healthy smile.. Beautiful look.. Better life'}
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
                <path d="M12 2.5 A 3.5 4.5 0 0 1 15.5 7 C 15.5 9 14.5 11 13.5 13" stroke="#14d8ff" strokeWidth={2} strokeLinecap="round" />
              </svg>
            )
          },
          {
            id: 'implants',
            labelAr: 'زراعة الأسنان',
            labelEn: 'Dental Implants',
            svg: (
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#14d8ff]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C9 2 8 4 8 7c0 3 2 5 3 9.5l-.5.5" strokeLinejoin="round" />
                <path d="M16 7c0-3-1-5-4-5" strokeLinejoin="round" />
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
                <path d="M6 10c3 1.5 9 1.5 12 0" stroke="#14d8ff" strokeWidth={2} strokeLinecap="round" />
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
            className="flex flex-col items-center justify-center p-3.5 border border-[#14d8ff]/25 bg-gradient-to-b from-[#041d2d]/90 to-[#010e17]/95 rounded-[20px] shadow-[inset_0_1px_2px_rgba(20,216,255,0.15),0_6px_16px_rgba(0,0,0,0.7)] hover:border-[#14d8ff]/50 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="filter drop-shadow-[0_0_8px_rgba(20,216,255,0.35)]">{item.svg}</div>
            <span className="text-[11px] font-bold text-center text-white leading-tight mt-3 tracking-wide">
              {item.labelAr}
            </span>
            <span className="text-[8px] text-[#859398] uppercase leading-none font-semibold text-center mt-1 tracking-wider">
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
              <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
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

