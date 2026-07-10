import {motion} from 'motion/react';
import {useState} from 'react';
import {Camera} from 'lucide-react';

interface GalleryProps {
  locale: 'ar' | 'en';
}

export default function Gallery({locale}: GalleryProps) {
  const isAr = locale === 'ar';
  const [filter, setFilter] = useState('all');

  const categories = [
    {id: 'all', label: isAr ? 'الكل' : 'All'},
    {id: 'clinic', label: isAr ? 'العيادة' : 'Clinic'},
    {id: 'patients', label: isAr ? 'المرضى' : 'Cases'},
    {id: 'tech', label: isAr ? 'التقنيات' : 'Technology'},
  ];

  const items = [
    {
      id: '1',
      title: isAr ? 'نتائج زراعة الأسنان الكاملة' : 'Full Arch Dental Reconstruction',
      category: 'patients',
      large: true,
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbaBoAqhXNBgoh5ecdIqXvLXkLJD5eGXJgj6xkSvSDxhz2E7rNuUN70w2W4TXps1CxOYOJ7u-DSpdrweZayddj3fPxw1ij2sx5tuh1y5Fq5kKFdU-VwT-Wly8OA76B591UWCYJb90tblgOyoT9ZVqA8pOLwbW0DFR1jESGimIEqDT60M-mza4NAVk07KAJ9iB5-sW61_NmDfEiAPpgKFxei70YHJMGxDaFx3yONX-kj9TDxq3HVMUeFoTElJV64CHxFsMCNL9Mb8Q'
    },
    {
      id: '2',
      title: isAr ? 'البيئة العلاجية الفاخرة' : 'Premium Clinic Atmosphere',
      category: 'clinic',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR54vqULR55DeThVM_mapE-KhydWzjigm1qrAr1SJ9jodmDvyrXiC67dcuUvqNuoIBrbuqMl5GVlFUQbtxoOLZOzRT7CQ6EGIeUqZrhtW_t4e8_rHiJC8N9mgduhn5asfCbRvuucxiZZ_Gl-R023ROCgpmeEyq5du_Mc14GPdoflWOCQiZi58Z9_i6N12k7vbgbLDOc7ir9o6XQoPfiWoZ-QKOJi3OhX3K6rVeh_BW_s0WDvKnTrnHdVboDCuo7kCPjwg6oStDByI'
    },
    {
      id: '3',
      title: isAr ? 'تقنيات المسح الثلاثي الأبعاد' : '3D Intraoral Scanning Tech',
      category: 'tech',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRBolvbl_5l2t7jfUBHQFjudqNMF-1aduORceeJJYsp4FJmHC4Chx6EpWc3mU5aL_q8J7wz9sKYzj04ILYC_IaE9W1ZSi_WKXGOAX5vE_UG1lpKaJ3gpPmfqkmZ5LUCE48zuJXpC095U7Z8NRFktND6vsW2py5FA7QlmV3wQyN76VHEnovY_rZ9P6b_pM_l_h8EnC-ct0UbJOxUTgfIwwUSKeUPv9A4FW1hJTiqFhz_T5V3WFLpuj6ADtpr6pea6KhCK88GFR84DU'
    }
  ];

  const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

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
