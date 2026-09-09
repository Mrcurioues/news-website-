import React, { useState, useEffect } from 'react';
import { Radio, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, UserCheck, ShieldAlert, AlertTriangle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useSiteConfigStore } from '../../stores/siteConfigStore';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

// In-memory security state for brute force protection (zero localStorage)
let lockoutState: {
  failedAttempts: number;
  lockoutUntil: number; // timestamp ms
  lockoutType: 'none' | '10min' | '24hr';
} = {
  failedAttempts: 0,
  lockoutUntil: 0,
  lockoutType: 'none',
};

const formatCountdown = (totalSec: number) => {
  if (totalSec <= 0) return '00:00';
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('admin@bharatsamachar.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [remainingSec, setRemainingSec] = useState(0);
  const { setUser } = useAuthStore();
  const { config } = useSiteConfigStore();

  // Timer loop for live countdown tick
  useEffect(() => {
    const checkLockout = () => {
      const now = Date.now();
      if (lockoutState.lockoutUntil > now) {
        const sec = Math.ceil((lockoutState.lockoutUntil - now) / 1000);
        setRemainingSec(sec);
      } else {
        if (lockoutState.lockoutUntil > 0) {
          // Lockout expired
          if (lockoutState.lockoutType === '10min') {
            lockoutState.lockoutUntil = 0;
            lockoutState.lockoutType = 'none';
            toast.success('10-minute security timeout has expired. You may try logging in again.');
          }
        }
        setRemainingSec(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLockedOut = remainingSec > 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      if (lockoutState.lockoutType === '24hr') {
        toast.error('🚨 Account Locked: Blocked for 24 hours due to repeated failed login attempts.');
      } else {
        toast.error(`⚠️ Security Timeout: Please wait ${formatCountdown(remainingSec)} before trying again.`);
      }
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);

    let isSuccess = false;
    let authUserPayload: any = null;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data?.user) {
        isSuccess = true;
        authUserPayload = {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          email: data.user.email || email,
          role: 'admin',
          isActive: true,
          storiesCount: 15,
          joinedAt: new Date().toISOString(),
        };
      }
    } else {
      // Demo / Local Auth Mode Validation
      const validPasswords = ['admin123', 'editor123', 'journal123', 'password123', 'admin@123'];
      if (validPasswords.includes(password.trim()) || password.trim().length >= 6) {
        isSuccess = true;
        authUserPayload = {
          id: 'admin-user-1',
          name: email.split('@')[0] || 'Amit Sharma',
          email,
          role: 'admin',
          isActive: true,
          storiesCount: 47,
          joinedAt: '2024-01-15',
        };
      }
    }

    if (isSuccess && authUserPayload) {
      // RESET LOCKOUT ON SUCCESSFUL LOGIN
      lockoutState = { failedAttempts: 0, lockoutUntil: 0, lockoutType: 'none' };
      setUser(authUserPayload);
      toast.success('Logged in to Newsroom CMS successfully!');
      onNavigate('/admin');
    } else {
      // FAILED LOGIN ATTEMPT — INCREMENT AND ENFORCE LOCKOUT
      const newFails = lockoutState.failedAttempts + 1;
      const now = Date.now();

      if (isSupabaseConfigured()) {
        supabase.from('security_logs').insert({
          event_type: newFails >= 10 ? '24HR_LOCKOUT' : newFails % 5 === 0 ? '10MIN_LOCKOUT' : 'FAILED_LOGIN_ATTEMPT',
          user_email: email,
          details: `Failed password attempt #${newFails} for ${email}`,
        }).then();
      }

      if (newFails >= 10) {
        // 24 Hour Lockout for 10+ failed attempts
        const until = now + 24 * 60 * 60 * 1000;
        lockoutState = {
          failedAttempts: newFails,
          lockoutUntil: until,
          lockoutType: '24hr',
        };
        toast.error('🚨 ACCOUNT LOCKED FOR 24 HOURS due to 10 suspicious failed login attempts!', { duration: 9000 });
      } else if (newFails % 5 === 0) {
        // 10 Minute Lockout for 5 failed attempts
        const until = now + 10 * 60 * 1000;
        lockoutState = {
          failedAttempts: newFails,
          lockoutUntil: until,
          lockoutType: '10min',
        };
        toast.error('⚠️ 5 WRONG PASSWORD ATTEMPTS! Login disabled for 10 minutes.', { duration: 9000 });
      } else {
        lockoutState.failedAttempts = newFails;
        toast.error(`❌ Wrong Password! Attempt ${newFails}/5 before 10-minute lockout.`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Header Banner */}
        <div style={{ backgroundColor: 'var(--brand-primary, #e11d48)' }} className="pt-3 pb-2.5 px-6 text-white text-center relative overflow-hidden">
          {config.logoUrl ? (
            <img
              src={config.logoUrl}
              alt={config.appNameEn || 'Bharat News'}
              className="h-20 w-auto max-w-[260px] object-contain mx-auto mb-0.5"
            />
          ) : (
            <div style={{ color: 'var(--brand-primary, #e11d48)' }} className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-0.5 shadow-md font-black text-xl">
              {config.logoBadgeText || 'भा'}
            </div>
          )}
          <h1 className="text-2xl font-black tracking-tight font-serif">{config.appNameHi || config.appNameEn || 'भारत समाचार'}</h1>
          <p className="text-rose-100 text-xs font-semibold uppercase tracking-widest mt-0.5">{config.taglineHi || config.taglineEn || 'Newsroom Admin Portal'}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div className="text-center mb-2">
            <h2 className="text-lg font-bold text-gray-900">Sign in to Newsroom CMS</h2>
            <p className="text-xs text-gray-500 mt-0.5">Enter your credentials below</p>
          </div>

          {/* LOCKOUT WARNING BANNERS */}
          {isLockedOut && (
            lockoutState.lockoutType === '24hr' ? (
              <div className="bg-slate-950 border-2 border-red-600 rounded-xl p-4 text-center space-y-2 animate-pulse">
                <div className="flex items-center justify-center gap-1.5 text-red-500 font-black text-sm">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                  <span>ACCOUNT LOCKED FOR 24 HOURS</span>
                </div>
                <p className="text-xs text-red-300 leading-relaxed font-medium">
                  Multiple suspicious failed password attempts detected. Access blocked for 24 hours for security protection.
                </p>
                <div className="inline-block bg-red-600 text-white font-mono font-bold text-xs px-3.5 py-1.5 rounded-md shadow-xs">
                  🔒 Locked: {formatCountdown(remainingSec)}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 text-center space-y-2 animate-pulse">
                <div className="flex items-center justify-center gap-1.5 text-red-700 font-black text-sm">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Security Lockout: 5 Failed Attempts</span>
                </div>
                <p className="text-xs text-red-600 font-medium">
                  Too many invalid password attempts. Login disabled for 10 minutes.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-red-600 text-white font-mono font-bold text-sm px-4 py-1 rounded-md shadow-xs">
                  <Clock className="w-4 h-4" />
                  <span>Time Remaining: {formatCountdown(remainingSec)}</span>
                </div>
              </div>
            )
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-600" /> Email Address
            </label>
            <input
              type="email"
              disabled={isLockedOut}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@bharatsamachar.com"
              required
              className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors font-medium text-gray-800 ${isLockedOut ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-rose-600" /> Password
            </label>
            <input
              type="password"
              disabled={isLockedOut}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors font-medium text-gray-800 ${isLockedOut ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
            />
          </div>

          {lockoutState.failedAttempts > 0 && !isLockedOut && (
            <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md font-semibold text-center">
              ⚠️ Warning: {lockoutState.failedAttempts}/5 failed attempts. 5 wrong attempts will lock login for 10 minutes.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isLockedOut}
            className={`w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md transition-colors flex items-center justify-center gap-2 ${isLockedOut || loading ? 'opacity-50 cursor-not-allowed hover:bg-rose-600' : 'cursor-pointer'}`}
          >
            {loading ? 'Authenticating…' : isLockedOut ? `Locked (${formatCountdown(remainingSec)})` : 'Login to Admin Panel'}
            {!loading && !isLockedOut && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-center text-xs text-rose-700 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Secure Editorial Access Privileges</span>
          </div>
        </form>
      </div>
    </div>
  );
};

