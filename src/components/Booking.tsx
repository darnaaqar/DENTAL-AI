import {useState, useEffect, FormEvent} from 'react';
import {motion} from 'motion/react';
import {Phone, User, FileText, CheckCircle, Calendar as CalendarIcon, Clock, Stethoscope, RefreshCw, Trash2, Edit3, X, AlertTriangle} from 'lucide-react';
import {createAppointment, updateAppointment, cancelAppointment, getAppointment} from '../supabaseClient';
import doctorImage from '../assets/images/doctor_mustafa_uploaded.png';

interface BookingProps {
  locale: 'ar' | 'en';
  doctor: any;
  services: any[];
  preselectedServiceId?: string;
}

export default function Booking({locale, doctor, services, preselectedServiceId}: BookingProps) {
  const isAr = locale === 'ar';
  
  // Anti-spam states
  const [activeBooking, setActiveBooking] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('rifai_active_booking');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || services[0]?.id || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const daysOfWeek = isAr 
    ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    { value: '09:30 AM', label_ar: '09:30 صباحاً', label_en: '09:30 AM' },
    { value: '11:00 AM', label_ar: '11:00 صباحاً', label_en: '11:00 AM' },
    { value: '02:30 PM', label_ar: '02:30 مساءً', label_en: '02:30 PM' },
    { value: '04:30 PM', label_ar: '04:30 مساءً', label_en: '04:30 PM' },
  ];

  // Keep active booking up to date with Supabase state on load
  useEffect(() => {
    if (activeBooking?.id) {
      getAppointment(activeBooking.id).then(fresh => {
        if (fresh) {
          setActiveBooking(fresh);
          localStorage.setItem('rifai_active_booking', JSON.stringify(fresh));
          
          // prefill edit states
          const dateParts = fresh.appointment_date.split('-');
          const day = parseInt(dateParts[2] || '15', 10);
          setSelectedDay(day);
          setSelectedSlot(fresh.appointment_time || '11:00 AM');
          setSelectedServiceId(fresh.service_id || services[0]?.id || '');
        } else {
          // Keep local storage copy if we cannot verify remote state,
          // but prefill the edit states anyway based on local storage copy!
          const dateParts = activeBooking.appointment_date.split('-');
          const day = parseInt(dateParts[2] || '15', 10);
          setSelectedDay(day);
          setSelectedSlot(activeBooking.appointment_time || '11:00 AM');
          setSelectedServiceId(activeBooking.service_id || services[0]?.id || '');
        }
      }).catch(err => {
        console.warn('Could not sync appointment with Supabase:', err);
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(isAr ? 'الرجاء تعبئة الاسم ورقم الهاتف!' : 'Please fill in your name and phone number!');
      return;
    }

    setIsSubmitting(true);
    const dateStr = `2026-05-${String(selectedDay).padStart(2, '0')}`;
    
    const { data, error } = await createAppointment({
      patient_name: name,
      phone: phone,
      service_id: selectedServiceId || null,
      preferred_language: locale,
      appointment_date: dateStr,
      appointment_time: selectedSlot,
      notes: notes
    });

    setIsSubmitting(false);
    if (!error && data) {
      localStorage.setItem('rifai_active_booking', JSON.stringify(data));
      setActiveBooking(data);
      setIsSuccess(true);
    } else {
      alert(isAr ? 'عذراً، حدث خطأ أثناء تسجيل الحجز. يرجى المحاولة لاحقاً.' : 'Sorry, an error occurred while scheduling. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!activeBooking?.id) return;
    setIsSubmitting(true);
    const dateStr = `2026-05-${String(selectedDay).padStart(2, '0')}`;

    const { data, error } = await updateAppointment(activeBooking.id, dateStr, selectedSlot);
    setIsSubmitting(false);
    
    if (!error && data) {
      const updated = { ...activeBooking, appointment_date: dateStr, appointment_time: selectedSlot };
      localStorage.setItem('rifai_active_booking', JSON.stringify(updated));
      setActiveBooking(updated);
      setIsEditing(false);
      alert(isAr ? 'تم تعديل تاريخ ووقت الحجز بنجاح!' : 'Your appointment has been successfully rescheduled!');
    } else {
      alert(isAr ? 'فشل تعديل الحجز. يرجى المحاولة لاحقاً.' : 'Failed to reschedule. Please try again.');
    }
  };

  const handleCancel = async () => {
    if (!activeBooking?.id) return;
    const confirmText = isAr 
      ? 'هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟'
      : 'Are you sure you want to cancel this appointment?';
    
    if (!window.confirm(confirmText)) return;

    setIsSubmitting(true);
    const { error } = await cancelAppointment(activeBooking.id);
    setIsSubmitting(false);

    if (!error) {
      localStorage.removeItem('rifai_active_booking');
      setActiveBooking(null);
      setIsEditing(false);
      setIsSuccess(false);
      setName('');
      setPhone('');
      setNotes('');
      alert(isAr ? 'تم إلغاء الحجز بنجاح.' : 'Your appointment has been successfully cancelled.');
    } else {
      alert(isAr ? 'فشل إلغاء الحجز. يرجى المحاولة لاحقاً.' : 'Failed to cancel appointment. Please try again.');
    }
  };

  const selectedService = services.find(s => s.id === (activeBooking?.service_id || selectedServiceId));
  const serviceName = selectedService ? (isAr ? selectedService.name_ar : selectedService.name_en) : '';

  // SUCCESS BOOKING STATE (FIRST TIME SCREEN)
  if (isSuccess && activeBooking) {
    const displayDay = activeBooking.appointment_date.split('-')[2];
    return (
      <div className="flex-1 w-full px-5 py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{scale: 0.5, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          className="w-20 h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center text-accent shadow-[0_0_24px_rgba(20,216,255,0.4)] animate-pulse"
        >
          <CheckCircle size={40} className="stroke-[2.5]" />
        </motion.div>
        
        <div className="space-y-2 max-w-sm">
          <h2 className="text-2xl font-extrabold text-[#aeecff] tracking-tight">
            {isAr ? 'تم تسجيل الحجز بنجاح!' : 'Booking Confirmed!'}
          </h2>
          <p className="text-xs text-[#859398] leading-relaxed">
            {isAr 
              ? `شكراً لك، تم حجز موعدك لـ ${displayDay} مايو 2026 في تمام الساعة ${timeSlots.find(t => t.value === activeBooking.appointment_time)?.label_ar || activeBooking.appointment_time}. سيتصل بك فريقنا للتأكيد في أقرب وقت.`
              : `Thank you. Your request for May ${displayDay}, 2026 at ${activeBooking.appointment_time} has been logged. Our coordinator will contact you shortly.`}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl w-full max-w-xs text-xs space-y-2 text-right border-l-2 border-accent">
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'المريض:' : 'Patient:'}</span>
            <span className="font-bold text-[#dde4e6]">{activeBooking.patient_name}</span>
          </div>
          {serviceName && (
            <div className="flex justify-between">
              <span className="text-[#859398]">{isAr ? 'الخدمة المطلوبة:' : 'Service Requested:'}</span>
              <span className="font-bold text-[#dde4e6]">{serviceName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'التاريخ والوقت:' : 'Date & Time:'}</span>
            <span className="font-bold text-accent">
              {displayDay} {isAr ? 'مايو 2026' : 'May 2026'} - {isAr ? timeSlots.find(t => t.value === activeBooking.appointment_time)?.label_ar : activeBooking.appointment_time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#859398]">{isAr ? 'الحالة:' : 'Status:'}</span>
            <span className="font-bold text-green-400">{isAr ? 'بانتظار التأكيد' : 'Pending Confirmation'}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-accent/15 border border-accent/30 text-accent px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/20 cursor-pointer transition-all active:scale-95"
        >
          {isAr ? 'عرض حجزي الحالي' : 'View My Active Booking'}
        </button>
      </div>
    );
  }

  // ACTIVE BOOKING (ANTI-SPAM) CONTROL PANEL
  if (activeBooking && !isEditing) {
    const displayDay = activeBooking.appointment_date.split('-')[2];
    return (
      <div className="flex-1 w-full px-5 py-8 flex flex-col justify-start space-y-6 overflow-y-auto no-scrollbar animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="glass-card p-5 rounded-2xl border-l-4 border-accent text-center space-y-4">
          <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center text-accent mx-auto">
            <CheckCircle size={22} className="stroke-[2.5]" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-lg font-black text-white">
              {isAr ? 'لديك حجز موعد نشط!' : 'You Have an Active Booking!'}
            </h2>
            <p className="text-xs text-[#859398]">
              {isAr 
                ? 'حفاظاً على تنظيم العيادة، يُسمح بحجز موعد واحد نشط لكل جهاز. يمكنك تعديل موعدك أو إلغاؤه أدناه.'
                : 'To prevent duplicate bookings, only one active appointment is allowed per device. You can reschedule or cancel below.'}
            </p>
          </div>
        </div>

        {/* Current Active Appointment Summary */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[#859398] uppercase tracking-wider">
            {isAr ? 'تفاصيل الموعد الحالي' : 'Current Booking Details'}
          </h3>
          <div className="glass-card p-5 rounded-2xl space-y-3 border border-white/5">
            <div className="flex justify-between items-center text-sm pb-2.5 border-b border-white/5">
              <span className="text-[#859398]">{isAr ? 'اسم المريض:' : 'Patient Name:'}</span>
              <span className="font-extrabold text-[#dde4e6]">{activeBooking.patient_name}</span>
            </div>
            
            {serviceName && (
              <div className="flex justify-between items-center text-sm pb-2.5 border-b border-white/5">
                <span className="text-[#859398]">{isAr ? 'الخدمة الطبية:' : 'Selected Service:'}</span>
                <span className="font-bold text-[#dde4e6]">{serviceName}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-sm pb-2.5 border-b border-white/5">
              <span className="text-[#859398]">{isAr ? 'تاريخ الموعد:' : 'Appointment Date:'}</span>
              <span className="font-extrabold text-accent">
                {displayDay} {isAr ? 'مايو 2026' : 'May 2026'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm pb-2.5 border-b border-white/5">
              <span className="text-[#859398]">{isAr ? 'توقيت الزيارة:' : 'Preferred Time:'}</span>
              <span className="font-extrabold text-accent">
                {isAr ? timeSlots.find(t => t.value === activeBooking.appointment_time)?.label_ar : activeBooking.appointment_time}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-[#859398]">{isAr ? 'حالة الطلب:' : 'Appointment Status:'}</span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-green-500/10 border border-green-500/30 text-green-400">
                {isAr ? 'بانتظار التأكيد' : 'Pending Confirmation'}
              </span>
            </div>
          </div>
        </section>

        {/* Edit / Reschedule and Cancel Controls */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isSubmitting}
            className="w-full primary-gradient py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#001f27] hover:shadow-[0_0_20px_rgba(20,216,255,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit3 size={14} />
            <span>{isAr ? 'تعديل تاريخ أو وقت الموعد' : 'Reschedule Date / Time'}</span>
          </button>

          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="w-full bg-[#1e1014] border border-red-500/20 text-red-400 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 size={14} />
            <span>{isAr ? 'إلغاء حجز الموعد' : 'Cancel Appointment'}</span>
          </button>
        </div>
      </div>
    );
  }

  // EDITING / RESCHEDULING FORM
  if (activeBooking && isEditing) {
    return (
      <div className="flex-1 w-full px-5 py-6 space-y-6 overflow-y-auto no-scrollbar" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <h2 className="text-base font-black text-white">
            {isAr ? 'تعديل موعد الزيارة' : 'Reschedule Appointment'}
          </h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#859398] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Date Picker (Static UI) */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-accent">
              {isAr ? 'اختر تاريخ الزيارة الجديد' : 'Select New Visit Date'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#859398] font-semibold">
              <span>{isAr ? 'مايو 2026' : 'May 2026'}</span>
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

        {/* Time Slot Picker */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-accent">
            {isAr ? 'اختر التوقيت المفضل الجديد' : 'Select New Time Slot'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {timeSlots.map((slot) => {
              const isSelected = slot.value === selectedSlot;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setSelectedSlot(slot.value)}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(20,216,255,0.2)]'
                      : 'bg-[#161d1f] border-white/5 text-[#859398] hover:border-white/10'
                  }`}
                >
                  <Clock size={12} className={isSelected ? 'text-accent' : 'text-[#859398]/50'} />
                  <span>{isAr ? slot.label_ar : slot.label_en}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-4">
          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className="w-full primary-gradient py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#001f27] shadow-[0_0_20px_rgba(20,216,255,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (isAr ? 'جاري التعديل...' : 'Updating...') : (isAr ? 'تأكيد وحفظ التغييرات' : 'Save & Confirm Changes')}
          </button>
          
          <button
            onClick={() => setIsEditing(false)}
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 text-[#dde4e6] py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isAr ? 'رجوع' : 'Back / Keep Existing'}
          </button>
        </div>
      </div>
    );
  }

  // STANDARD FIRST TIME BOOKING FORM
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
                src={doctorImage} 
                className="w-full h-full object-cover"
                alt="Doctor"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-[#dde4e6] text-sm">
                {isAr ? (doctor?.full_name_ar || 'د. مصطفى الرفاعي') : (doctor?.full_name_en || 'Dr. Mustafa Al-Rifaie')}
              </h3>
              <p className="text-xs text-[#859398]">
                {isAr ? (doctor?.title_ar || 'استشاري طب وتجميل الأسنان') : (doctor?.title_en || 'Consultant in Dental Care & Aesthetics')}
              </p>
            </div>
          </div>
          <CheckCircle className="text-accent shrink-0" size={18} />
        </div>
      </section>

      {/* Service Selector */}
      {services && services.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-accent">
            {isAr ? 'اختر الخدمة الطبية' : 'Select Treatment Service'}
          </h2>
          <div className="relative">
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className={`w-full bg-[#161d1f] border border-white/10 rounded-xl py-3.5 text-xs text-[#dde4e6] focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all outline-none appearance-none cursor-pointer ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            >
              {services.map(s => (
                <option key={s.id} value={s.id} className="bg-[#161d1f] text-[#dde4e6]">
                  {isAr ? s.name_ar : s.name_en}
                </option>
              ))}
            </select>
            <Stethoscope className={`absolute top-1/2 -translate-y-1/2 text-[#859398]/50 pointer-events-none ${isAr ? 'right-3.5' : 'left-3.5'}`} size={16} />
          </div>
        </section>
      )}

      {/* Date Picker (Static UI) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-accent">
            {isAr ? 'اختر تاريخ الزيارة' : 'Choose Visit Date'}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#859398] font-semibold">
            <span>{isAr ? 'مايو 2026' : 'May 2026'}</span>
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

      {/* Time Slot Picker */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-accent">
          {isAr ? 'اختر التوقيت المفضل' : 'Choose Preferred Slot'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {timeSlots.map((slot) => {
            const isSelected = slot.value === selectedSlot;
            return (
              <button
                key={slot.value}
                type="button"
                onClick={() => setSelectedSlot(slot.value)}
                className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(20,216,255,0.2)]'
                    : 'bg-[#161d1f] border-white/5 text-[#859398] hover:border-white/10'
                }`}
              >
                <Clock size={12} className={isSelected ? 'text-accent' : 'text-[#859398]/50'} />
                <span>{isAr ? slot.label_ar : slot.label_en}</span>
              </button>
            );
          })}
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
        disabled={isSubmitting}
        className="w-full primary-gradient py-4.5 rounded-xl font-bold text-sm text-[#001f27] shadow-[0_4px_20px_rgba(20,216,255,0.3)] active:scale-95 transition-all cursor-pointer text-center uppercase tracking-wider disabled:opacity-50"
      >
        {isSubmitting 
          ? (isAr ? 'جاري تسجيل الموعد...' : 'Booking Appointment...') 
          : (isAr ? 'تأكيد وحجز الموعد الفوري' : 'Confirm & Schedule Booking')}
      </button>
    </form>
  );
}
