import React, { useState, useEffect } from 'react';
import { 
  FirebaseUser, 
  UserProfile, 
  AppointmentData, 
  getUserAppointmentsFirestore, 
  createAppointmentFirestore, 
  logoutFromFirebase,
  forceSyncAllAppDataToFirebase
} from '../firebase';
import { User, Calendar, Clock, Phone, Mail, ShieldCheck, Plus, CheckCircle, LogOut, Sparkles, Database, FileText, RefreshCw } from 'lucide-react';

interface Props {
  isAr: boolean;
  currentUser: FirebaseUser;
  userProfile: UserProfile | null;
  onOpenAuthModal: () => void;
}

export default function UserProfileView({ isAr, currentUser, userProfile, onOpenAuthModal }: Props) {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(true);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);

  // New appointment form state
  const [showNewAppt, setShowNewAppt] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [savingAppt, setSavingAppt] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadAppointments() {
      if (currentUser) {
        setLoadingAppts(true);
        const data = await getUserAppointmentsFirestore(currentUser.uid);
        setAppointments(data);
        setLoadingAppts(false);
      }
    }
    loadAppointments();
  }, [currentUser]);

  const handleSyncData = async () => {
    setIsSyncing(true);
    const result = await forceSyncAllAppDataToFirebase();
    setIsSyncing(false);
    if (result.success) {
      setSuccessMsg(
        isAr 
          ? 'تمت مزامنة وتغريس كافة بيانات العيادة (الخدمات، الأطباء، المعرض، الإعدادات) بنجاح في Firebase Firestore!'
          : 'Successfully synced & implanted all clinic data into Firebase Firestore!'
      );
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setSuccessMsg(
        isAr ? 'حدث خطأ أثناء المزامنة مع Firebase.' : 'Failed to sync with Firebase.'
      );
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !date || !time) return;

    setSavingAppt(true);
    try {
      const newAppt = await createAppointmentFirestore({
        patientUid: currentUser.uid,
        patientName: userProfile?.displayName || currentUser.displayName || 'Patient',
        patientPhone: userProfile?.phone || '',
        serviceName,
        date,
        time,
        notes,
        status: 'pending'
      });
      setAppointments(prev => [newAppt, ...prev]);
      setSuccessMsg(isAr ? 'تمت إضافة الموعد بنجاح وحفظه في Firebase Firestore!' : 'Appointment booked and saved in Firebase Firestore!');
      setShowNewAppt(false);
      setServiceName('');
      setDate('');
      setTime('');
      setNotes('');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setSavingAppt(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-xl text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-5 z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-2xl shadow-inner">
            <User className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                {userProfile?.displayName || currentUser.displayName || (isAr ? 'مريض معتمد' : 'Verified Patient')}
              </h1>
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'حساب Firebase موثق' : 'Firebase Verified'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              {currentUser.email}
            </p>
            {userProfile?.phone && (
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {userProfile.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 w-full md:w-auto justify-end">
          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className="px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing 
              ? (isAr ? 'جاري المزامنة...' : 'Syncing...') 
              : (isAr ? 'مزامنة وتغريس بيانات Firebase' : 'Sync & Implant Firebase Data')}
          </button>
          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Database className="w-4 h-4 text-amber-400" />
            {isAr ? 'تفاصيل الربط' : 'Connection Info'}
          </button>
          <button
            onClick={() => logoutFromFirebase()}
            className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            {isAr ? 'تسجيل الخروج' : 'Sign Out'}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-sm flex items-center gap-3 shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Appointments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              {isAr ? 'مواعيدي المسجلة في Firebase Firestore' : 'My Firestore Appointments'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'يتم حفظ واسترجاع هذه المواعيد مباشرة من قاعدة بيانات Firebase.' : 'Stored and retrieved live from your Firebase Firestore database.'}
            </p>
          </div>
          <button
            onClick={() => setShowNewAppt(!showNewAppt)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            {isAr ? 'إضافة موعد في Firebase' : 'Add Firestore Appointment'}
          </button>
        </div>

        {/* New Appointment Modal/Expandable Form */}
        {showNewAppt && (
          <form onSubmit={handleCreateAppointment} className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl space-y-4 text-slate-100 shadow-xl">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {isAr ? 'تسجيل موعد جديد في Firestore' : 'Create New Firestore Appointment'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">{isAr ? 'اسم الخدمة' : 'Service Name'}</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                  placeholder={isAr ? 'مثال: زراعة أسنان / ابتسامة هوليود' : 'e.g. Dental Implant'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">{isAr ? 'التاريخ' : 'Date'}</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">{isAr ? 'الوقت' : 'Time'}</label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">{isAr ? 'ملاحظات إضافية' : 'Notes'}</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={isAr ? 'أي ملاحظات خاصة بالمريض' : 'Additional details'}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewAppt(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={savingAppt}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
              >
                {savingAppt ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ في Firebase' : 'Save to Firebase')}
              </button>
            </div>
          </form>
        )}

        {/* List of Appointments */}
        {loadingAppts ? (
          <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400 text-xs flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            {isAr ? 'جاري تحميل المواعيد من Firebase Firestore...' : 'Loading appointments from Firebase Firestore...'}
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-10 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              {isAr ? 'لا توجد مواعيد مسجلة في Firebase حتى الآن' : 'No appointments recorded in Firebase yet'}
            </p>
            <p className="text-xs text-slate-500">
              {isAr ? 'اضغط على زر "إضافة موعد في Firebase" لتجربة التخزين المباشر في قاعدة البيانات.' : 'Click "Add Firestore Appointment" to test live database writes.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl space-y-3 transition-all text-slate-200 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-bold text-amber-400 text-sm">{appt.serviceName}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {appt.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{appt.time}</span>
                  </div>
                </div>

                {appt.notes && (
                  <p className="text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                    {appt.notes}
                  </p>
                )}

                <div className="text-[10px] font-mono text-slate-500 pt-1 flex items-center justify-between">
                  <span>Doc ID: {appt.id?.slice(0, 10)}...</span>
                  <span>{new Date(appt.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
