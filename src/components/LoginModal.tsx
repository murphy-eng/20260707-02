import React, { useState } from 'react';
import { X, User, LogIn, LogOut, Check, Calendar, Mail, FileText } from 'lucide-react';
import { Inquiry } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  username: string;
  onLogin: (name: string) => void;
  onLogout: () => void;
  userInquiries: Inquiry[];
}

export default function LoginModal({
  isOpen,
  onClose,
  isLoggedIn,
  username,
  onLogin,
  onLogout,
  userInquiries
}: LoginModalProps) {
  if (!isOpen) return null;

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setIsSuccess(true);
    setTimeout(() => {
      onLogin(inputName);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

        {/* Panel panel */}
        <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all max-w-lg w-full p-6 md:p-8 relative z-10 animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-brand-secondary hover:text-black hover:bg-brand-surface-subtle rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {isLoggedIn ? (
            /* Dashboard View when Logged In */
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-brand-border-light pb-5">
                <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center font-extrabold text-2xl shadow">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-brand-on-surface">Welcome, {username}!</h3>
                  <p className="text-xs text-brand-secondary font-semibold">Registered Client Account</p>
                </div>
              </div>

              {/* Inquiry History */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-brand-on-surface uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={16} className="text-brand-primary" />
                  My Session Inquiries ({userInquiries.length})
                </h4>

                {userInquiries.length === 0 ? (
                  <div className="bg-brand-surface-subtle p-6 rounded-xl border border-brand-border-light text-center">
                    <p className="text-xs font-bold text-brand-secondary">No submitted inquiries yet</p>
                    <p className="text-[10px] text-brand-secondary/80 mt-1">
                      Inquire on property details or fill the consultation form to see them tracked here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {userInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-brand-surface-subtle p-4 rounded-xl border border-brand-border-light/60 flex flex-col justify-between space-y-2 text-xs"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-extrabold text-brand-on-surface text-xs block">
                              {inq.propertyTitle ? `Inquiry: ${inq.propertyTitle}` : 'General Consultation'}
                            </span>
                            {inq.propertyPrice && (
                              <span className="text-[10px] text-brand-primary font-bold mt-0.5 block">
                                Price: {inq.propertyPrice}
                              </span>
                            )}
                          </div>
                          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase shrink-0">
                            Active Agent Assigned
                          </span>
                        </div>

                        <p className="text-neutral-600 font-semibold text-[11px] italic bg-white p-2.5 rounded border border-brand-border-light/40">
                          "{inq.message}"
                        </p>

                        <div className="flex justify-between items-center text-[10px] text-brand-secondary font-medium pt-1 border-t border-brand-border-light/30">
                          <span className="capitalize font-bold">Type: {inq.type}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {inq.submittedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <div className="pt-4 border-t border-brand-border-light flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-brand-surface-subtle hover:bg-neutral-200 text-brand-on-surface font-bold text-xs py-2.5 rounded transition-all"
                >
                  Close Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 bg-red-50 text-brand-primary border border-red-100 hover:bg-brand-primary hover:text-white font-bold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            /* Login Simulation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2.5 bg-brand-primary text-white rounded-xl">
                  <LogIn size={22} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-brand-on-surface">
                    Client Login Simulation
                  </h3>
                  <p className="text-xs text-brand-secondary font-medium">Enter your credentials to manage properties</p>
                </div>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={26} className="animate-bounce" />
                  </div>
                  <h4 className="text-sm font-bold text-green-800">Welcome back!</h4>
                  <p className="text-xs text-green-700 font-medium">Simulating premium client portal access...</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-brand-secondary" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Murphy"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary focus:bg-white text-xs md:text-sm font-semibold text-brand-on-surface"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-brand-secondary" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. murphy@morcept.com"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary focus:bg-white text-xs md:text-sm font-semibold text-brand-on-surface"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold text-xs md:text-sm hover:bg-brand-primary-hover transition-colors shadow-md transform active:scale-95 duration-150 mt-4"
                  >
                    Simulate Secure Sign-In
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
