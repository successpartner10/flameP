import React, { useState } from 'react';
import { X, ShieldCheck, ShieldAlert, LogIn, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { signInWithGoogle, signOutUser } from '../../lib/firebase';
import { isAuthorizedAdmin, ALLOWED_ADMIN_EMAILS } from '../../config/adminConfig';
import { AdminUser } from '../../types/cms';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AdminUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setDeniedEmail(null);
    setErrorMessage(null);

    try {
      const user = await signInWithGoogle();
      const email = user.email || '';
      
      if (isAuthorizedAdmin(email)) {
        const adminUser: AdminUser = {
          email,
          displayName: user.displayName || email.split('@')[0],
          photoURL: user.photoURL || undefined,
          uid: user.uid,
          isAuthorized: true,
        };
        localStorage.setItem('flame_cms_user', JSON.stringify(adminUser));
        onSuccess(adminUser);
        onClose();
      } else {
        // Not authorized! Log out immediately and show Access Denied
        await signOutUser();
        setDeniedEmail(email);
        setErrorMessage(`Access Denied: The account "${email}" is not authorized to access the CMS admin panel. Only whitelisted administrators are permitted.`);
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      if (err.message && !err.message.includes('cancelled')) {
        setErrorMessage(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-['Raleway']">
      <div className="relative w-full max-w-md bg-[#12161c] border-2 border-[#d4a359]/60 text-[#f5f1ea] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#242c38] flex items-center justify-between bg-[#181e26]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9e1c38] to-[#d4a359] p-0.5 shadow-md">
              <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center text-[#f3cf8a]">
                <Lock size={18} />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a359] font-bold block">
                CMS Administration
              </span>
              <h3 className="font-serif text-lg text-white font-bold">
                Admin Panel Sign In
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-[#252f3d] text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {deniedEmail ? (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 text-red-200 space-y-3 animate-in shake duration-300">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
                <ShieldAlert size={20} className="shrink-0 text-red-400" />
                <span>Access Denied (403 Forbidden)</span>
              </div>
              <p className="text-xs text-red-200/90 leading-relaxed">
                The account <strong className="text-white underline">{deniedEmail}</strong> is not authorized to access the CMS admin panel. You have been safely logged out.
              </p>
            </div>
          ) : errorMessage ? (
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
              <ShieldAlert size={16} className="text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          ) : (
            <div className="space-y-3 text-center">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Sign in with your authorized Google / Gmail account to manage Markdown pages, upload media, and customize navigation.
              </p>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/30 text-[11px] text-[#f3cf8a]">
                <ShieldCheck size={14} className="text-[#d4a359]" />
                <span>Protected by Firebase Auth</span>
              </div>
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 active:scale-[0.98] text-gray-900 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {/* Official Google SVG Logo */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
