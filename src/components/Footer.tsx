import React, { useState } from 'react';
import { Building2, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 w-full mt-16">
      {/* Top Footer Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-10 py-12 max-w-7xl mx-auto">
        
        {/* Brand details */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-primary rounded text-white flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <span className="font-bold text-lg text-white font-headline-md tracking-tight">
              Nippon Real Estate
            </span>
          </div>
          <p className="text-neutral-400 font-medium text-xs leading-relaxed">
            Providing world-class, premium real estate services across the Japanese archipelago. Dedicated to secure transactions and elite asset yields.
          </p>

          {/* Newsletter subscription inside footer */}
          <div className="pt-2">
            <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-2">
              Subscribe to Market Insights
            </p>
            {subscribed ? (
              <p className="text-[10px] text-green-400 font-bold flex items-center gap-1 animate-fadeIn">
                <Check size={12} /> Subscribed to Nippon newsletters!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-primary flex-1 placeholder:text-neutral-500 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white p-1.5 rounded transition-all"
                  title="Subscribe"
                >
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs font-semibold text-neutral-400">
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Latest News & Reports
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Corporate Site Map
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Investor Relations
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
          <ul className="space-y-2 text-xs font-semibold text-neutral-400">
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Cookie Preferences
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">
                Anti-Money Laundering Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contact Headquarters</h4>
          <ul className="space-y-3.5 text-xs font-semibold text-neutral-400">
            <li>
              <span className="text-white block font-bold text-[11px] uppercase tracking-wider">
                Tokyo Head Office
              </span>
              <span className="block mt-0.5 leading-relaxed text-neutral-400">
                1-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005
              </span>
            </li>
            <li>
              <span className="text-white block font-bold text-[11px] uppercase tracking-wider">
                Direct Inquiry lines
              </span>
              <span className="block mt-0.5 font-bold text-neutral-300">
                +81 3-5555-1212
              </span>
              <span className="block text-neutral-500 text-[10px]">
                Mon - Fri, 9:00 AM - 6:00 PM JST
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 border-t border-neutral-800 text-center text-xs font-semibold text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© 2026 Nippon Real Estate Services Co., Ltd. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-primary transition-colors">
            Terms of Use
          </a>
          <span>•</span>
          <a href="#" className="hover:text-brand-primary transition-colors">
            Licencing Information
          </a>
        </div>
      </div>
    </footer>
  );
}
