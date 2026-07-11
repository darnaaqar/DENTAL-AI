import {useState} from 'react';
import {motion} from 'motion/react';
import {Search, ArrowLeft, ArrowRight} from 'lucide-react';

interface ServicesProps {
  locale: 'ar' | 'en';
  services: any[];
  onNavigate: (tab: any, id: string) => void;
}

export default function Services({locale, services, onNavigate}: ServicesProps) {
  const isAr = locale === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  // Map service icon or ID to corresponding high-fidelity illustration vector
  function getServiceImage(iconName: string, id: string): string {
    const icon = (iconName || id || '').toLowerCase();
    if (icon.includes('implant')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhtLCH5V1iI3UNnmz87HzHIcAqOvok_QMg_nxXVCaxQglBLUuV_FDyekcJG9j7T_dgsEZ7v9GVGD30tK90YwFN0IQxZTiby6eq7wlQVsYhYmgC0hlFB6YAU27cIoXqBc7OR9fDlXQP7ebskdzO2OLNUoIbOjKiDUZLwP7Kw25veXcWNJuirar5R47fahSvD_XG8fDMu_T8hg7iYumozUyi8122oJhs9QyFoQGQA4r21a0Td-eg79MTcaVeJMD-IHez2BDb9vmTLtc';
    }
    if (icon.includes('veneer') || icon.includes('hollywood')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXPbsArznlWc7wjwK_KEpnD-ZD2Hz0PH9lYs-kdUg23s9csaR_aFxXxXafvaE2yjLQXqVMqLs7fSMaWHoXFJIikwrZFEpfNXlk18KzfAbgnDGjjHSvljxEja-o6kSZl9Yre8TbBxMc9kjGOoA3ZjkLGINoe0Vt6FF1lNNSh8Mu3egc6LtSN6SIMydmpTihz9GSJe5CNH10uJ2yX4mgqujmvE8ohYHHVoK2Na-aDfHkGcyG6mE7eUjqjbkMv0WNeaMeS97HDm__k6s';
    }
    if (icon.includes('white') || icon.includes('laser')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi9-BHBZ4IqwyAd1uzPjXKCBxEjyoslolcDuhaLmAEFRolltwxKs0eop7Dh0igVbizUXHxD5dU6GqjHw9Tux5qjHXj3f4pU0Cv9J0QbTgGoanij-LVCQ15YlNAb0bmUvcwLPYAj-teiulmr7ybT5F0DHKWJP2xzHLWwc7sSbVysKWvsH1xeTztkb4XNTmZVpgf9HtoY8B5tiz3r4pF5g_R6SNTNQjbO-2OQUqihKqOBHtt4bY0-RV1Id7umWNwlUAbHpmfeQxwGVw';
    }
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIgQybrBw0jdVNJ2TtHXLMeA1YXxaCPaqfDfnXZAOl2WDW6IHxebg5on9BOOjfcY6P5Qb8ERySp-p25DLvdBhmgknzTaqhvBtjlR2_0_CMie_SuHBQhYHflTV4sNaPnUVVrnmPvOgeO6BXkTrpKw9PYEVyQ1CO3wqKfdqZZnR5bqUOgXT2W6MVqxJMtRAGVGFNwh-497AHrUdc35ALEDADbCDPw8XO_ZBhk5gHVI5wJYL1Ob2mjg7OarEQRKNlSzE0AFRuHi0k9uU';
  }

  const mappedServices = services.map(s => ({
    id: s.id,
    title: isAr ? s.name_ar : s.name_en,
    en: s.name_en,
    desc: isAr ? (s.short_desc_ar || s.details_ar || '') : (s.short_desc_en || s.details_en || ''),
    src: s.image_url || getServiceImage(s.icon, s.id)
  }));

  const filteredServices = mappedServices.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      <div>
        <h2 className="text-xl font-bold text-accent mb-4">
          {isAr ? 'خدماتنا المميزة' : 'Our Clinical Services'}
        </h2>
        <div className="relative group">
          <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isAr ? 'right-4' : 'left-4'}`}>
            <Search className="text-[#859398]" size={20} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن الخدمة...' : 'Search clinical services...'}
            className={`w-full h-14 bg-[#161d1f] border border-white/10 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-[#dde4e6] placeholder:text-[#859398]/60 ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
          />
        </div>
      </div>

      <div className="relative h-px w-full bg-white/5 mb-8 overflow-hidden">
        <div className="scan-animation"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            onClick={() => onNavigate('service-details', service.id)}
            className="glass-card p-5 rounded-[24px] relative overflow-hidden group hover:border-accent/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 relative shrink-0">
                <img 
                  src={service.src}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(20,216,255,0.6)] group-hover:scale-110 transition-transform duration-500"
                  alt={service.en}
                />
              </div>
              {isAr ? (
                <ArrowLeft className="text-accent opacity-40 group-hover:opacity-100 transition-all group-hover:-translate-x-1" size={20} />
              ) : (
                <ArrowRight className="text-accent opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-1" size={20} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#dde4e6] mb-1">{service.title}</h3>
              <p className="text-[9px] text-accent/80 tracking-widest uppercase font-bold mb-3">{service.en}</p>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">{service.desc}</p>
            </div>
          </motion.div>
        ))}

        {filteredServices.length === 0 && (
          <p className="text-sm text-[#859398] text-center col-span-full py-12">
            {isAr ? 'لا توجد خدمات مطابقة لبحثك.' : 'No matching services found.'}
          </p>
        )}
      </div>
    </div>
  );
}
