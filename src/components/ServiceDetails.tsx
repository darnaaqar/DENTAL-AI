import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, DollarSign, Activity, Shield, Calendar, Sparkles } from 'lucide-react';
import { Tab } from '../types';

interface ServiceDetailsProps {
  serviceId: string | null;
  services: any[];
  locale: 'ar' | 'en';
  onBack: () => void;
  onNavigate: (tab: Tab, serviceId?: string) => void;
}

export default function ServiceDetails({
  serviceId,
  services,
  locale,
  onBack,
  onNavigate,
}: ServiceDetailsProps) {
  const isAr = locale === 'ar';

  // Find the selected service
  const service = services.find((s) => s.id === serviceId) || services[0];

  if (!service) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-white">
        <p className="text-sm text-gray-400">
          {isAr ? 'الخدمة غير موجودة' : 'Service not found'}
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-accent/20 border border-accent/40 rounded-xl text-xs text-accent"
        >
          {isAr ? 'رجوع' : 'Back'}
        </button>
      </div>
    );
  }

  // Get service illustration fallback if image_url is missing
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

  const imageUrl = service.image_url || getServiceImage(service.icon, service.id);

  // Fallbacks for custom database columns so the screen works instantly even if columns are added later!
  const duration = isAr
    ? (service.duration_ar || '٤٥ - ٦٠ دقيقة')
    : (service.duration_en || '45 - 60 minutes');
    
  const price = isAr
    ? (service.price_ar || 'حسب الاستشارة')
    : (service.price_en || 'Consultation required');

  const recovery = isAr
    ? (service.recovery_ar || 'فوري - لا يوجد وقت تعافي')
    : (service.recovery_en || 'Immediate - No recovery downtime');

  // Parse benefits list from database text
  const benefitsText = isAr ? (service.benefits_ar || '') : (service.benefits_en || '');
  const benefitsList = benefitsText
    ? benefitsText.split('،').map((b: string) => b.trim()).filter(Boolean)
    : [];

  return (
    <div className="flex-1 w-full px-5 py-6 space-y-6 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#161d1f] border border-white/5 rounded-xl text-xs font-bold text-[#bbc9ce] hover:text-accent hover:border-accent/30 active:scale-95 transition-all cursor-pointer"
        >
          {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isAr ? 'رجوع للخدمات' : 'Back to Services'}</span>
        </button>
        <span className="text-[10px] uppercase font-black tracking-widest text-accent px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
          {isAr ? 'تفاصيل الخدمة' : 'Service Dossier'}
        </span>
      </div>

      {/* Main Card Hero Block */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden rounded-[28px] border border-white/5 shadow-2xl relative"
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        {/* Hero Image Container */}
        <div className="relative h-56 md:h-64 w-full bg-[#030608] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f12] via-transparent to-transparent z-10"></div>
          <img
            src={imageUrl}
            className="h-full max-w-full object-contain filter drop-shadow-[0_0_25px_rgba(20,216,255,0.4)] z-0"
            alt={service.name_en}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 relative z-10">
          <div>
            <h1 className="text-2xl font-black text-white leading-tight mb-1">
              {isAr ? service.name_ar : service.name_en}
            </h1>
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#14d8ff]/80">
              {isAr ? service.name_en : service.name_ar}
            </p>
          </div>

          <p className="text-sm text-[#bbc9ce] leading-relaxed whitespace-pre-line bg-[#0c1316]/50 p-4.5 rounded-2xl border border-white/5">
            {isAr ? service.details_ar : service.details_en}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Stat 1: Duration */}
            <div className="flex items-center gap-3 p-3.5 bg-[#101719] border border-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#14d8ff]/10 border border-[#14d8ff]/25 flex items-center justify-center text-accent shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] text-[#859398] font-bold uppercase tracking-wider">
                  {isAr ? 'مدة الجلسة' : 'Duration'}
                </p>
                <p className="text-xs font-bold text-white mt-0.5">{duration}</p>
              </div>
            </div>

            {/* Stat 2: Price */}
            <div className="flex items-center gap-3 p-3.5 bg-[#101719] border border-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#14d8ff]/10 border border-[#14d8ff]/25 flex items-center justify-center text-accent shrink-0">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="text-[10px] text-[#859398] font-bold uppercase tracking-wider">
                  {isAr ? 'التكلفة التقريبية' : 'Estimated Cost'}
                </p>
                <p className="text-xs font-bold text-white mt-0.5">{price}</p>
              </div>
            </div>

            {/* Stat 3: Recovery */}
            <div className="flex items-center gap-3 p-3.5 bg-[#101719] border border-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#14d8ff]/10 border border-[#14d8ff]/25 flex items-center justify-center text-accent shrink-0">
                <Activity size={18} />
              </div>
              <div>
                <p className="text-[10px] text-[#859398] font-bold uppercase tracking-wider">
                  {isAr ? 'فترة التعافي' : 'Recovery Time'}
                </p>
                <p className="text-xs font-bold text-white mt-0.5">{recovery}</p>
              </div>
            </div>
          </div>

          {/* Benefits Bullet Section */}
          {benefitsList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <span>{isAr ? 'الفوائد والميزات الرئيسية' : 'Key Clinical Benefits'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {benefitsList.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-[#0d1417] border border-[#14d8ff]/10 rounded-xl"
                  >
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                      <Shield size={12} />
                    </div>
                    <span className="text-xs font-semibold text-[#dde4e6] leading-tight">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons: Book Now & View Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('gallery')}
              className="w-full bg-[#10191c] border border-accent/30 text-accent h-14 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-accent/10 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Sparkles size={18} />
              <span>{isAr ? 'عرض صور الحالات في المعرض' : 'View Cases in Gallery'}</span>
            </button>

            <button
              onClick={() => onNavigate('booking', service.id)}
              className="w-full bg-gradient-to-r from-[#03d4ed] to-[#14d8ff] h-14 rounded-2xl flex items-center justify-center gap-2 text-[#001f27] font-black hover:shadow-[0_0_25px_rgba(20,216,255,0.4)] active:scale-[0.99] transition-all cursor-pointer shadow-lg"
            >
              <Calendar size={18} />
              <span>{isAr ? 'احجز موعداً لهذه الخدمة' : 'Schedule This Service'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
