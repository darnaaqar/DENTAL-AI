import {motion} from 'motion/react';
import {useState} from 'react';
import {Camera} from 'lucide-react';

interface GalleryProps {
  locale: 'ar' | 'en';
  gallery: any[];
}

export default function Gallery({locale, gallery}: GalleryProps) {
  const isAr = locale === 'ar';
  const [filter, setFilter] = useState('all');

  const categories = [
    {id: 'all', label: isAr ? 'الكل' : 'All'},
    {id: 'clinic', label: isAr ? 'العيادة' : 'Clinic'},
    {id: 'patients', label: isAr ? 'الحالات' : 'Cases'},
    {id: 'tech', label: isAr ? 'التقنيات' : 'Technology'},
  ];

  const mappedItems = gallery.map((item, index) => ({
    id: item.id || String(index + 1),
    title: isAr ? (item.title_ar || '') : (item.title_en || ''),
    category: item.category || 'clinic',
    large: index === 0 || item.category === 'patients',
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
            className={`glass-card rounded-2xl overflow-hidden group cursor-pointer ${item.large ? 'col-span-2' : ''}`}
          >
            <div className={`relative ${item.large ? 'aspect-video' : 'aspect-square'}`}>
              <img 
                src={item.src} 
                className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-100 group-hover:scale-105 transition-transform duration-700" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1417]/90 via-[#0e1417]/25 to-transparent"></div>
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
