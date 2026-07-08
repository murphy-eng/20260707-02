import React, { useState } from 'react';
import { X, Mail, Phone, User, Check, MessageSquare } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'submittedAt'>) => void;
}

export default function ContactModal({ isOpen, onClose, onSubmitInquiry }: ContactModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<'consultation' | 'viewing' | 'valuation'>('consultation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry({
      name,
      email,
      phone,
      message: message || `General consulting inquiry regarding Nippon property listings.`,
      type: topic
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

        {/* Panel Container */}
        <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all max-w-md w-full p-6 md:p-8 relative z-10 animate-scaleUp">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-brand-secondary hover:text-black hover:bg-brand-surface-subtle rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="p-2.5 bg-brand-primary text-white rounded-xl">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-brand-on-surface">
                Consultation Request
              </h3>
              <p className="text-xs text-brand-secondary font-medium">Schedule a call with our licensed agents</p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check size={26} />
              </div>
              <h4 className="text-base font-bold text-green-800">Request Sent Successfully!</h4>
              <p className="text-xs font-semibold text-green-700 max-w-xs mx-auto leading-relaxed">
                Thank you for your trust. Our specialist will contact you on your registered phone within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-brand-secondary" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary focus:bg-white text-xs md:text-sm font-semibold text-brand-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-brand-secondary" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +81 90-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary focus:bg-white text-xs md:text-sm font-semibold text-brand-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                  Consultation Focus
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary text-xs md:text-sm font-semibold text-brand-secondary"
                >
                  <option value="consultation">Buying & Investment Consulting</option>
                  <option value="viewing">Schedule Private Site Viewing</option>
                  <option value="valuation">Asset Value Evaluation & Listing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-on-surface mb-1.5 uppercase tracking-wider">
                  How can we assist you?
                </label>
                <textarea
                  rows={3}
                  placeholder="Optional details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary text-xs md:text-sm font-semibold text-brand-on-surface resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold text-xs md:text-sm hover:bg-brand-primary-hover transition-colors shadow-md transform active:scale-95 duration-150 mt-4"
              >
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
