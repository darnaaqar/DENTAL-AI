import React, { useState } from 'react';
import { 
  registerWithFirebase, 
  loginWithFirebase, 
  signInAnonymouslyWithFirebase,
  logoutFromFirebase, 
  forceSyncAllAppDataToFirebase,
  UserProfile, 
  FirebaseUser 
} from '../firebase';
import { ShieldCheck, UserPlus, LogIn, LogOut, CheckCircle, AlertCircle, Key, Lock, Mail, User, Phone, Database, Sparkles, X, UserCheck, RefreshCw } from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';

interface Props {
  isAr: boolean;
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FirebaseAuthModal({ isAr, currentUser, userProfile, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<'register' | 'login' | 'info'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncingData, setSyncingData] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleForceSync = async () => {
    setSyncingData(true);
    setError(null);
    const res = await forceSyncAllAppDataToFirebase();
    setSyncingData(false);
    if (res.success) {
      setSuccessMsg(
        isAr 
          ? 'تم غرس وتغريس كافة بيانات العيادة (الخدمات، الأطباء، المعرض، الإعدادات) بنجاح في Firebase Firestore!'
          : 'All app clinic data implanted and synced successfully into Firebase Firestore!'
      );
    } else {
      setError(isAr ? 'فشلت عملية المزامنة مع Firebase' : 'Failed to sync data with Firebase');
    }
  };

  const formatAuthError = (err: any) => {
    const code = err.code || err.message || '';
    if (code.includes('auth/admin-restricted-operation') || code.includes('auth/operation-not-allowed')) {
      return isAr 
        ? 'طريقة الدخول محظورة في إعدادات Firebase (Firebase Console). تم تفعيل وضع الضيف/المستخدم التلقائي بالـ Firestore لضمان استمرار التجربة بدون انقطاع.'
        : 'Sign-in method is restricted in your Firebase Console settings. Automatic Firestore user profile mode has been enabled so you can continue testing seamlessly.';
    }
    if (code.includes('auth/email-already-in-use')) {
      return isAr ? 'هذا البريد الإلكتروني مسجل بالفعل. يمكنك تسجيل الدخول.' : 'This email is already registered. Please sign in.';
    }
    if (code.includes('auth/weak-password')) {
      return isAr ? 'كلمة المرور ضعيفة جداً (يجب أن تكون 6 أحرف على الأقل).' : 'Password is too weak (minimum 6 characters).';
    }
    if (code.includes('auth/invalid-credential') || code.includes('auth/user-not-found') || code.includes('auth/wrong-password')) {
      return isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password.';
    }
    return err.message || (isAr ? 'حدث خطأ أثناء الاتصال بـ Firebase' : 'An error occurred connecting to Firebase');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!email || !password || !displayName) {
      setError(isAr ? 'يرجى تعبئة كافة الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    if (password.length < 6) {
      setError(isAr ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await registerWithFirebase(email, password, displayName, phone);
      setSuccessMsg(isAr ? 'تم التسجيل والربط بنجاح مع Firebase!' : 'Successfully registered and connected to Firebase!');
      setTimeout(() => {
        onSuccess();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!email || !password) {
      setError(isAr ? 'يرجى إدخال البريد وكلمة المرور' : 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await loginWithFirebase(email, password);
      setSuccessMsg(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Successfully logged in!');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await signInAnonymouslyWithFirebase(displayName || (isAr ? 'مريض تجريبي' : 'Test Guest'));
      setSuccessMsg(isAr ? 'تم الدخول كضيف تجريبي في Firebase!' : 'Connected as Guest Test User in Firebase!');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutFromFirebase();
      setSuccessMsg(isAr ? 'تم تسجيل الخروج' : 'Logged out successfully');
      setTimeout(() => {
        onSuccess();
      }, 800);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-100 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/20 via-slate-800 to-amber-900/20 p-6 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-amber-400">
                {isAr ? 'الاتصال والتسجيل مع Firebase' : 'Firebase Connection & Registration'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'قاعدة بيانات موثقة ومعتمدة' : 'Authenticated & Secure Firestore Database'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Badge */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${currentUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-sm font-medium text-slate-300">
                {currentUser 
                  ? (isAr ? `متصل بحساب: ${currentUser.email}` : `Connected as: ${currentUser.email}`)
                  : (isAr ? 'غير متصل (وضع الزائر)' : 'Not connected (Guest mode)')
                }
              </span>
            </div>
            {currentUser && (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                {isAr ? 'خروج' : 'Logout'}
              </button>
            )}
          </div>

          {/* Connected state details */}
          {currentUser ? (
            <div className="space-y-4 bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-base border-b border-amber-500/20 pb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                {isAr ? 'تفاصيل حسابك المربوط في Firebase' : 'Your Connected Firebase Profile'}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">{isAr ? 'الاسم:' : 'Name:'}</span>
                  <span className="font-medium text-slate-200">{userProfile?.displayName || currentUser.displayName || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{isAr ? 'البريد الإلكتروني:' : 'Email:'}</span>
                  <span className="font-medium text-slate-200">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{isAr ? 'معرف المستخدم (UID):' : 'Firebase UID:'}</span>
                  <span className="font-mono text-amber-300 truncate block">{currentUser.uid}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{isAr ? 'معرف المشروع:' : 'Project ID:'}</span>
                  <span className="font-mono text-slate-300 truncate block">{firebaseConfig.projectId}</span>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                {isAr ? 'جميع مواعيدك وبياناتك محفوظة بأمان في Firebase Firestore.' : 'All your appointments and records are securely stored in Firebase Firestore.'}
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector for Mode */}
              <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    mode === 'register' 
                      ? 'bg-amber-500 text-slate-950 shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  {isAr ? 'تسجيل حساب جديد' : 'Register New Account'}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    mode === 'login' 
                      ? 'bg-amber-500 text-slate-950 shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  {isAr ? 'تسجيل الدخول' : 'Sign In'}
                </button>
              </div>

              {/* Alert / Errors */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Register Form */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter full name'}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5x xxx xxxx"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'كلمة المرور *' : 'Password *'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {isAr ? '6 أحرف على الأقل' : 'Minimum 6 characters'}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        {isAr ? 'إنشاء حساب وتوصيل Firebase' : 'Register & Connect to Firebase'}
                      </>
                    )}
                  </button>

                  <div className="relative py-1 flex items-center justify-center">
                    <div className="border-t border-slate-800 w-full" />
                    <span className="bg-slate-900 px-2 text-[10px] text-slate-500 font-mono uppercase">
                      {isAr ? 'أو للتجربة الفورية' : 'Or Instant Test'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAnonymousSignIn}
                    disabled={loading}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-amber-500/30 py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    {isAr ? 'دخول تجريبي سريع كضيف' : 'Instant Guest Sign-In'}
                  </button>
                </form>
              )}

              {/* Login Form */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isAr ? 'كلمة المرور' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 text-xs transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        {isAr ? 'تسجيل الدخول' : 'Sign In'}
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Quick Technical Instructions Summary & Direct Sync Button */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isAr ? 'حالة المزامنة والربط المباشر' : 'Firebase Sync Status'}
              </p>
              <button
                type="button"
                onClick={handleForceSync}
                disabled={syncingData}
                className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 text-amber-400 ${syncingData ? 'animate-spin' : ''}`} />
                {syncingData ? (isAr ? 'جاري الغرس...' : 'Syncing...') : (isAr ? 'غرس ومزامنة البيانات الآن' : 'Implant & Sync App Data')}
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
              <li>
                {isAr ? 'تهيئة Firebase عبر مفاتيح المشروع الخادمي (firebaseConfig).' : 'Initialize Firebase App using config credentials (projectId, apiKey, appId).'}
              </li>
              <li>
                {isAr ? 'دالة createUserWithEmailAndPassword للتسجيل في Firebase Authentication.' : 'Use createUserWithEmailAndPassword() for account creation in Firebase Auth.'}
              </li>
              <li>
                {isAr ? 'تخزين بيانات البروفايل والمواعيد في مجموعات Firestore (users & appointments).' : 'Store user profiles and appointments in Firestore database collections.'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
