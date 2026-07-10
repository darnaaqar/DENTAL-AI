import {useState, FormEvent} from 'react';
import {motion} from 'motion/react';
import {Phone, User, FileText, CheckCircle, Calendar as CalendarIcon} from 'lucide-react';

interface BookingProps {
  locale: 'ar' | 'en';
}

export default function Booking({locale}: BookingProps) {
  const isAr = locale === 'ar';
  const [selectedDay, setSelectedDay] = useState(15);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const daysOfWeek = isAr 
    ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(isAr ? 'الرجاء تعبئة الاسم ورقم الهاتف!' : 'Please fill in your name and phone number!');
      return;
    }
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 w-full px-5 py-12 flex flex-col items-center justify-center text-center space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{scale: 0.5, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          className="w-20 h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center text-accent shadow-[0_0_24px_rgba(20,216,255,0.4)]"
        >
          <CheckCircle size={40} className="stroke-[2.5]" />
        </motion.div>
        
        <div className="space-y-2 max-w-sm">
          <h2 className="text-2xl font-extrabold text-[#aeecff] tracking-tight">
            {isAr ? 'تم تسجيل الحجز بنجاح!' : 'Booking Confirmed!'}
          </h2>
          <p className="text-xs text-[#859398] leading-relaxed">
            {isAr 
              ? `شكراً لك، تم حجز موعدك لـ ${selectedDay} مايو 2024. سيتصل بك فريقنا للتأكيد في أقرب وقت.`
              : `Thank you. Your request for May ${selectedDay}, 2024 has been logged. Our coordinator will contact you shortly.`}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl w-full max-w-xs text-xs space-y-2 text-right border-l-2 border-accent">
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'المريض:' : 'Patient:'}</span>
            <span className="font-bold text-[#dde4e6]">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'التاريخ:' : 'Date:'}</span>
            <span className="font-bold text-accent">{selectedDay} {isAr ? 'مايو 2024' : 'May 2024'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'الحالة:' : 'Status:'}</span>
            <span className="font-bold text-green-400">{isAr ? 'بانتظار التأكيد' : 'Pending Confirmation'}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            setIsSuccess(false);
            setName('');
            setPhone('');
            setNotes('');
          }}
          className="bg-accent/15 border border-accent/30 text-accent px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/20 cursor-pointer transition-all active:scale-95"
        >
          {isAr ? 'حجز موعد جديد' : 'Book Another Appointment'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full px-5 py-6 space-y-8 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 relative px-4">
        <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10 -z-10"></div>
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              step <= 2
                ? 'bg-accent text-[#001f27] shadow-[0_0_15px_rgba(20,216,255,0.3)] font-extrabold' 
                : 'bg-[#1e2528] border border-white/5 text-[#859398]'
            }`}>
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Info */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-accent">
          {isAr ? 'طبيبك المخصص' : 'Your Appointed Doctor'}
        </h2>
        <div className="glass-card rounded-xl p-4 flex items-center justify-between border-l-4 border-accent">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-accent/20 shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQGk9T8T-E-dTpTss5FQxeaLgfuT6D7b8knwLxoma7ZhneQUbTV6jegwf83Rz3Wsi-1ojfZUr4lObSfdbX8qJs_GRO-1BDl9AUgNUb0Z60o8xRS9X-FtvMzMNib-qoykcBsefefS1Hhaf0u5mEuLb83liLjH7sos8ZJOA7njPRorV-taMls7PyH_FyRFsPwcu0h8c2UUGlTi9rSDRoelBrHe30tc3qJpL7eQi6euwC_Dofi6FIaIkTEyIqa6zWRKrNA2ZqGbxXlPo" 
                className="w-full h-full object-cover"
                alt="Doctor"
              />
            </div>
            <div>
              <h3 className="font-bold text-[#dde4e6] text-sm">
                {isAr ? 'د. مصطفى الرفاعي' : 'Dr. Mustafa Al-Rifai'}
              </h3>
              <p className="text-xs text-[#859398]">
                {isAr ? 'استشاري طب وتجميل الأسنان' : 'Consultant in Dental Aesthetics'}
              </p>
            </div>
          </div>
          <CheckCircle className="text-accent shrink-0" size={18} />
        </div>
      </section>

      {/* Date Picker (Static UI) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-accent">
            {isAr ? 'اختر تاريخ الزيارة' : 'Choose Visit Date'}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#859398] font-semibold">
            <span>{isAr ? 'مايو 2024' : 'May 2024'}</span>
            <CalendarIcon size={14} className="text-accent" />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {daysOfWeek.map(d => (
              <div key={d} className="text-[9px] text-[#859398]/60 py-1.5 font-bold uppercase tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedDay;
              return (
                <button 
                  key={day} 
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-9 w-9 mx-auto flex items-center justify-center rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-accent text-[#001f27] font-bold shadow-[0_0_12px_rgba(20,216,255,0.45)] scale-105' 
                      : 'text-[#dde4e6] hover:bg-white/5'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patient Info */}
      <section className="space-y-3 mb-8">
        <h2 className="text-base font-bold text-accent">
          {isAr ? 'بيانات المريض الأساسية' : 'Primary Patient Info'}
        </h2>
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? 'الاسم الكامل للمريض' : 'Patient Full Name'}
              className={`w-full bg-[#161d1f] border border-white/5 rounded-xl py-3.5 text-xs text-[#dde4e6] placeholder:text-[#859398]/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all outline-none ${isAr ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
            />
            <User className={`absolute top-1/2 -translate-y-1/2 text-[#859398]/30 ${isAr ? 'left-4' : 'right-4'}`} size={16} />
          </div>
          
          <div className="relative">
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isAr ? 'رقم الهاتف للتأكيد' : 'Contact Phone Number'}
              className={`w-full bg-[#161d1f] border border-white/5 rounded-xl py-3.5 text-xs text-[#dde4e6] placeholder:text-[#859398]/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all outline-none ${isAr ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
            />
            <Phone className={`absolute top-1/2 -translate-y-1/2 text-[#859398]/30 ${isAr ? 'left-4' : 'right-4'}`} size={16} />
          </div>
          
          <div className="relative">
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isAr ? 'حالتك أو ملاحظاتك الإضافية (اختياري)' : 'Symptoms or extra clinic notes (Optional)'}
              className={`w-full bg-[#161d1f] border border-white/5 rounded-xl py-3.5 text-xs text-[#dde4e6] placeholder:text-[#859398]/40 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all outline-none h-20 resize-none ${isAr ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
            />
            <FileText className={`absolute text-[#859398]/30 ${isAr ? 'left-4 top-4' : 'right-4 top-4'}`} size={16} />
          </div>
        </div>
      </section>

      <button 
        type="submit"
        className="w-full primary-gradient py-4.5 rounded-xl font-bold text-sm text-[#001f27] shadow-[0_4px_20px_rgba(20,216,255,0.3)] active:scale-95 transition-all cursor-pointer text-center uppercase tracking-wider"
      >
        {isAr ? 'تأكيد وحجز الموعد الفوري' : 'Confirm & Schedule Booking'}
      </button>
    </form>
  );
}
