import {motion} from 'motion/react';
import {Tab} from '../types';
import {ChevronLeft, Star, ShieldCheck} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: Tab) => void;
  locale: 'ar' | 'en';
}

export default function Home({onNavigate, locale}: HomeProps) {
  const isAr = locale === 'ar';

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar">
      {/* Hero Section */}
      <motion.section 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="text-center space-y-2 mt-2"
      >
        <h1 className="text-2xl font-bold text-[#aeecff] drop-shadow-[0_0_12px_rgba(174,236,255,0.3)]">
          {isAr ? 'د. مصطفى الرفاعي' : 'Dr. Mustafa Al-Rifai'}
        </h1>
        <h2 className="text-sm text-[#aeecff]/80 font-medium tracking-tight">
          {isAr ? 'طب وتجميل الأسنان' : 'Dental Care & Aesthetics'}
        </h2>
        <div className="flex items-center justify-center gap-4 text-[#859398] text-xs mt-2">
          <span className="w-8 h-[1px] bg-white/10"></span>
          <span className="tracking-wider uppercase text-[9px] font-semibold text-accent">
            {isAr ? 'رعاية الأسنان المستقبلية' : 'Future of Dental Care'}
          </span>
          <span className="w-8 h-[1px] bg-white/10"></span>
        </div>
      </motion.section>

      {/* Holographic Hero */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        {/* HUD Scan Effect Container */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute inset-0 hud-scanline"></div>
          <div className="scan-animation"></div>
        </div>

        <motion.div 
          animate={{rotate: 360}}
          transition={{duration: 25, repeat: Infinity, ease: "linear"}}
          className="absolute inset-0 flex items-center justify-center opacity-30"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh4lb4p54bnmUtkV_mfM7kl1ekflE8O7EThW8Jtx7JY4FX7Agi2SIV_d97GJRtwR0unjCwvpWE7oZCXPmez50-j_UY2ndV71pfXPxndDJgxnGIRsCU-gAEuNK3iKNARZO-TWctfaviPcZfAs-qNEcrBzN2Ke2K12TAz8wA2DzsPZwA-ux9zK_GXpznrB_P9vLP8vIYafXbjexhpWCULunwg_M3I-qRw7n9SgsA71pQMdqs6ALdigSAkM3YsXz7MSsJEjUCjnf_zH0"
            className="w-72 h-72 scale-110"
            alt="HUD Background"
          />
        </motion.div>
        
        <motion.div 
          className="relative z-10 floating"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8IhJhiFXgCJoUCUhdnc489Z5-t5f73w8_vrm1xpYXedmkJ03q-koJmRfbOUzS_KQB0wsM6NaXDIHtJwV0K5zDDPGeUiBqxJ1vahCOg4L_EOFtulSHKST682LV0CZ5esHQYRSk_GGGGfRSBitnzecYBWkSCsJoqy8_nsg06W7xEsAhpHHHrHBwqXslITJ85aSDIxTyNuG8ThD74NSybCASpY9V3MVWaet_3GWL3yhamaVQj4dbDGJVwpsxnrt-nByMJbCOw2YSxps"
            className="w-60 h-60 drop-shadow-[0_0_40px_rgba(20,216,255,0.45)]"
            alt="Holographic Tooth"
          />
        </motion.div>

        {/* Floaties */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            {top: '12%', left: '12%', delay: 0, src: 'AB6AXuAi9-BHBZ4IqwyAd1uzPjXKCBxEjyoslolcDuhaLmAEFRolltwxKs0eop7Dh0igVbizUXHxD5dU6GqjHw9Tux5qjHXj3f4pU0Cv9J0QbTgGoanij-LVCQ15YlNAb0bmUvcwLPYAj-teiulmr7ybT5F0DHKWJP2xzHLWwc7sSbVysKWvsH1xeTztkb4XNTmZVpgf9HtoY8B5tiz3r4pF5g_R6SNTNQjbO-2OQUqihKqOBHtt4bY0-RV1Id7umWNwlUAbHpmfeQxwGVw'},
            {top: '8%', right: '18%', delay: 1.5, src: 'AB6AXuCIgQybrBw0jdVNJ2TtHXLMeA1YXxaCPaqfDfnXZAOl2WDW6IHxebg5on9BOOjfcY6P5Qb8ERySp-p25DLvdBhmgknzTaqhvBtjlR2_0_CMie_SuHBQhYHflTV4sNaPnUVVrnmPvOgeO6BXkTrpKw9PYEVyQ1CO3wqKfdqZZnR5bqUOgXT2W6MVqxJMtRAGVGFNwh-497AHrUdc35ALEDADbCDPw8XO_ZBhk5gHVI5wJYL1Ob2mjg7OarEQRKNlSzE0AFRuHi0k9uU'},
            {bottom: '22%', left: '8%', delay: 2.2, src: 'AB6AXuBhtLCH5V1iI3UNnmz87HzHIcAqOvok_QMg_nxXVCaxQglBLUuV_FDyekcJG9j7T_dgsEZ7v9GVGD30tK90YwFN0IQxZTiby6eq7wlQVsYhYmgC0hlFB6YAU27cIoXqBc7OR9fDlXQP7ebskdzO2OLNUoIbOjKiDUZLwP7Kw25veXcWNJuirar5R47fahSvD_XG8fDMu_T8hg7iYumozUyi8122oJhs9QyFoQGQA4r21a0Td-eg79MTcaVeJMD-IHez2BDb9vmTLtc'},
            {bottom: '28%', right: '8%', delay: 0.8, src: 'AB6AXuBXPbsArznlWc7wjwK_KEpnD-ZD2Hz0PH9lYs-kdUg23s9csaR_aFxXxXafvaE2yjLQXqVMqLs7fSMaWHoXFJIikwrZFEpfNXlk18KzfAbgnDGjjHSvljxEja-o6kSZl9Yre8TbBxMc9kjGOoA3ZjkLGINoe0Vt6FF1lNNSh8Mu3egc6LtSN6SIMydmpTihz9GSJe5CNH10uJ2yX4mgqujmvE8ohYHHVoK2Na-aDfHkGcyG6mE7eUjqjbkMv0WNeaMeS97HDm__k6s'}
          ].map((item, i) => (
            <motion.div
              key={i}
              animate={{y: [0, -15, 0], opacity: [0.6, 1, 0.6]}}
              transition={{duration: 4, repeat: Infinity, delay: item.delay, ease: "easeInOut"}}
              className="absolute w-12 h-12 glass-card rounded-full p-2.5 flex items-center justify-center border-accent/20"
              style={{top: item.top, bottom: item.bottom, left: item.left, right: item.right}}
            >
              <img src={`https://lh3.googleusercontent.com/aida-public/${item.src}`} className="w-full h-full object-contain neon-glow" alt="Service Icon" />
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-10 w-64 h-6 bg-accent/10 blur-2xl rounded-full"></div>
      </section>

      {/* Slogan */}
      <motion.section 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.4}}
        className="text-center space-y-1.5"
      >
        <p className="text-xl font-bold text-[#dde4e6] neon-glow">
          {isAr ? 'ابتسامة صحية.. مظهر أجمل.. حياة أفضل' : 'Healthy smile.. Beautiful look.. Better life'}
        </p>
        <p className="text-[10px] text-[#859398] uppercase tracking-widest font-semibold">
          {isAr ? 'تكنولوجيا الغد لرعاية أسنانك اليوم' : "Tomorrow's technology for your dental care today"}
        </p>
      </motion.section>

      {/* Service Quick Links */}
      <section className="grid grid-cols-4 gap-3">
        {[
          {id: 'whitening', label: isAr ? 'تبييض الأسنان' : 'Teeth Whitening', en: 'Teeth Whitening', src: 'AB6AXuAi9-BHBZ4IqwyAd1uzPjXKCBxEjyoslolcDuhaLmAEFRolltwxKs0eop7Dh0igVbizUXHxD5dU6GqjHw9Tux5qjHXj3f4pU0Cv9J0QbTgGoanij-LVCQ15YlNAb0bmUvcwLPYAj-teiulmr7ybT5F0DHKWJP2xzHLWwc7sSbVysKWvsH1xeTztkb4XNTmZVpgf9HtoY8B5tiz3r4pF5g_R6SNTNQjbO-2OQUqihKqOBHtt4bY0-RV1Id7umWNwlUAbHpmfeQxwGVw'},
          {id: 'veneers', label: isAr ? 'الفينير' : 'Veneers', en: 'Cosmetic Veneers', src: 'AB6AXuBXPbsArznlWc7wjwK_KEpnD-ZD2Hz0PH9lYs-kdUg23s9csaR_aFxXxXafvaE2yjLQXqVMqLs7fSMaWHoXFJIikwrZFEpfNXlk18KzfAbgnDGjjHSvljxEja-o6kSZl9Yre8TbBxMc9kjGOoA3ZjkLGINoe0Vt6FF1lNNSh8Mu3egc6LtSN6SIMydmpTihz9GSJe5CNH10uJ2yX4mgqujmvE8ohYHHVoK2Na-aDfHkGcyG6mE7eUjqjbkMv0WNeaMeS97HDm__k6s'},
          {id: 'implants', label: isAr ? 'زراعة الأسنان' : 'Dental Implants', en: 'Dental Implants', src: 'AB6AXuBhtLCH5V1iI3UNnmz87HzHIcAqOvok_QMg_nxXVCaxQglBLUuV_FDyekcJG9j7T_dgsEZ7v9GVGD30tK90YwFN0IQxZTiby6eq7wlQVsYhYmgC0hlFB6YAU27cIoXqBc7OR9fDlXQP7ebskdzO2OLNUoIbOjKiDUZLwP7Kw25veXcWNJuirar5R47fahSvD_XG8fDMu_T8hg7iYumozUyi8122oJhs9QyFoQGQA4r21a0Td-eg79MTcaVeJMD-IHez2BDb9vmTLtc'},
          {id: 'ortho', label: isAr ? 'تقويم الأسنان' : 'Orthodontics', en: 'Smart Ortho', src: 'AB6AXuCIgQybrBw0jdVNJ2TtHXLMeA1YXxaCPaqfDfnXZAOl2WDW6IHxebg5on9BOOjfcY6P5Qb8ERySp-p25DLvdBhmgknzTaqhvBtjlR2_0_CMie_SuHBQhYHflTV4sNaPnUVVrnmPvOgeO6BXkTrpKw9PYEVyQ1CO3wqKfdqZZnR5bqUOgXT2W6MVqxJMtRAGVGFNwh-497AHrUdc35ALEDADbCDPw8XO_ZBhk5gHVI5wJYL1Ob2mjg7OarEQRKNlSzE0AFRuHi0k9uU'}
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => onNavigate('services')}
            className="glass-card rounded-xl p-2.5 flex flex-col items-center gap-2 hover:border-accent/40 transition-all cursor-pointer active:scale-95"
          >
            <img src={`https://lh3.googleusercontent.com/aida-public/${item.src}`} className="w-9 h-9 object-contain" alt={item.en} />
            <span className="text-[10px] font-bold text-center text-[#dde4e6] leading-tight">
              {item.label}
            </span>
            <span className="text-[7px] text-[#859398] uppercase leading-none font-semibold text-center mt-auto">
              {item.en}
            </span>
          </button>
        ))}
      </section>

      {/* CTA */}
      <section className="space-y-4">
        <button 
          onClick={() => onNavigate('booking')}
          className="w-full primary-gradient h-16 rounded-2xl flex items-center justify-between px-6 shadow-[0_0_15px_rgba(20,216,255,0.4)] active:scale-[0.98] transition-all relative overflow-hidden group cursor-pointer"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 bg-[#0e1417]/30 rounded-xl flex items-center justify-center border border-white/10">
              <Star className="text-white fill-white animate-pulse" size={18} />
            </div>
            <div className={`${isAr ? 'text-right' : 'text-left'}`}>
              <p className="text-base font-bold text-[#001f27] leading-tight">
                {isAr ? 'احجز موعدك الآن' : 'Book Your Appointment'}
              </p>
              <p className="text-[9px] text-[#001f27]/80 uppercase font-bold tracking-wider">
                {isAr ? 'سجل موعداً فورياً' : 'Instant Appointment Booking'}
              </p>
            </div>
          </div>
          <ChevronLeft className={`text-[#001f27] transition-transform group-hover:-translate-x-1 ${isAr ? '' : 'rotate-180'}`} size={20} />
        </button>

        {/* Elegant Design Mockup Footer */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center select-none">
          <div className="flex items-center gap-3">
            {/* Left Star Sparkle */}
            <span className="text-[#14d8ff] text-base animate-pulse">✦</span>
            
            {/* Center Shield Icon & Arabic text */}
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
              <ShieldCheck className="text-[#14d8ff]" size={16} />
              <span>نهتم بابتسامتك</span>
            </div>

            {/* Right Star Sparkle */}
            <span className="text-[#14d8ff] text-base animate-pulse">✦</span>
          </div>
          
          {/* Subtitle in English below */}
          <p className="text-[11px] text-[#859398] font-medium mt-1 uppercase tracking-widest">
            We care about your smile
          </p>
        </div>
      </section>
    </div>
  );
}
