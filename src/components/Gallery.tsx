import {motion} from 'motion/react';
import {useState} from 'react';
import {Camera, Calendar, ArrowUpRight} from 'lucide-react';
import {Tab} from '../types';

import SlowDownloadImage from './SlowDownloadImage';

interface GalleryProps {
  locale: 'ar' | 'en';
  gallery: any[];
  onNavigate?: (tab: Tab, serviceId?: string) => void;
}

export default function Gallery({locale, gallery, onNavigate}: GalleryProps) {
  const isAr = locale === 'ar';
  const [filter, setFilter] = useState('all');

  const categories = [
    {id: 'all', label: isAr ? 'الكل' : 'All'},
    {id: 'before_after', label: isAr ? 'قبل وبعد' : 'Before & After'},
    {id: 'clinic', label: isAr ? 'العيادة' : 'Clinic'},
    {id: 'technology', label: isAr ? 'التقنيات' : 'Technology'},
    {id: 'team', label: isAr ? 'الفريق' : 'Team'},
  ];

  const mappedItems = gallery.map((item, index) => ({
    id: item.id || String(index + 1),
    serviceId: item.service_id,
    title: isAr ? (item.title_ar || '') : (item.title_en || ''),
    category: item.category || 'clinic',
    large: index === 0 || item.category === 'before_after',
    src: item.image_url
  }));

  const filteredItems = filter === 'all' ? mappedItems : mappedItems.filter(i => i.category === filter);

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      <section className="text-center">
        <h2 className="text-xl font-bold text-accent mb-1">
          {isAr ? 'معرض نجاحات العيادة' : 'Clinical Success Gallery'}
        </h2>
        <p className="text-[10px] text-[#859398] tracking-widest uppercase font-bold">
          {isAr ? 'رؤية الواقع قبل وبعد العلاج' : 'Seeing reality before & after care'}
        </p>
        <div className="w-12 h-[2px] bg-accent mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(20,216,255,0.8)]"></div>
      </section>

      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full border transition-all duration-300 font-bold text-xs cursor-pointer ${
              filter === cat.id 
                ? 'bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(20,216,255,0.25)]' 
                : 'border-white/5 text-[#859398] hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            layout
            key={item.id}
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            className={`glass-card rounded-2xl overflow-hidden group relative cursor-pointer ${item.large ? 'col-span-2' : ''}`}
          >
            <div className={`relative ${item.large ? 'aspect-video' : 'aspect-square'}`}>
              <SlowDownloadImage 
                src={item.src} 
                alt={item.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-100 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1417]/95 via-[#0e1417]/30 to-transparent"></div>
              
              {/* Action Link button */}
              {onNavigate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.serviceId) {
                      onNavigate('service-details', item.serviceId);
                    } else {
                      onNavigate('booking');
                    }
                  }}
                  className="absolute top-3 right-3 bg-[#08151c]/80 border border-accent/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-accent flex items-center gap-1 hover:bg-accent hover:text-[#001f27] transition-all cursor-pointer shadow-lg opacity-90 group-hover:opacity-100"
                >
                  <Calendar size={10} />
                  <span>{isAr ? 'احجز نتيجة مماثلة' : 'Book Similar Case'}</span>
                  <ArrowUpRight size={10} />
                </button>
              )}

              <div className={`absolute bottom-3 left-3 right-3 flex justify-between items-end ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                {item.large && <Camera className="text-accent shrink-0 animate-pulse" size={14} />}
                <h3 className={`text-xs font-bold text-white leading-tight ${isAr ? 'text-right' : 'text-left'}`}>
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
