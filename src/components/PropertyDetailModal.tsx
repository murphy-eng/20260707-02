import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Compass, ShieldCheck, Mail, Phone, User, Check, Landmark, Calculator } from 'lucide-react';
import { Property, Inquiry } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'submittedAt'>) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  onSubmitInquiry
}: PropertyDetailModalProps) {
  if (!property) return null;

  const {
    id,
    title,
    jpTitle,
    price,
    priceDisplay,
    location,
    type,
    area,
    floor,
    badge,
    image,
    description,
    jpDescription,
    purpose,
    details
  } = property;

  // Inquiry Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hi, I am interested in "${title}". Please provide more information.`);
  const [inquiryType, setInquiryType] = useState<'consultation' | 'viewing' | 'valuation'>('viewing');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(1.2);
  const [loanTermYears, setLoanTermYears] = useState(35);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  // Re-calculate mortgage whenever params or price changes
  useEffect(() => {
    if (purpose === 'rent') return; // no mortgage for rentals
    
    const downPaymentAmount = (price * downPaymentPercent) / 100;
    const principal = price - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(Math.round(principal / totalPayments));
      return;
    }

    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    setMonthlyPayment(Math.round(payment));
  }, [price, downPaymentPercent, interestRate, loanTermYears, purpose]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry({
      name,
      email,
      phone,
      propertyId: id,
      propertyTitle: title,
      propertyPrice: priceDisplay,
      message,
      type: inquiryType
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background Overlay */}
        <div
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Center alignment trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full animate-scaleUp">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 bg-neutral-900/10 text-neutral-800 hover:bg-neutral-900/20 hover:text-black rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Media & Specifications */}
            <div className="border-r border-brand-border-light bg-neutral-50 flex flex-col">
              <div className="relative h-64 md:h-80 overflow-hidden bg-gray-200">
                <img
                  src={image}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {badge && (
                  <span className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    {badge}
                  </span>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-brand-primary rounded-sm uppercase inline-block mb-1.5">
                    {purpose === 'buy' ? 'For Sale' : 'For Rent'}
                  </span>
                  <p className="text-2xl font-extrabold tracking-tight">{priceDisplay}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-brand-on-surface mb-2 flex items-center gap-1.5">
                    <Compass size={18} className="text-brand-primary" />
                    Property Overview
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-brand-border-light text-center">
                      <p className="text-[10px] uppercase font-bold text-brand-secondary">Layout</p>
                      <p className="text-sm font-extrabold text-brand-on-surface mt-0.5">{type}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-brand-border-light text-center">
                      <p className="text-[10px] uppercase font-bold text-brand-secondary">Area Size</p>
                      <p className="text-sm font-extrabold text-brand-on-surface mt-0.5">{area}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-brand-border-light text-center">
                      <p className="text-[10px] uppercase font-bold text-brand-secondary">Floor Level</p>
                      <p className="text-sm font-extrabold text-brand-on-surface mt-0.5">{floor}</p>
                    </div>
                  </div>
                </div>

                {/* Sub-details */}
                <div className="space-y-2 text-xs md:text-sm font-medium text-brand-on-surface bg-white p-4 rounded-xl border border-brand-border-light">
                  <div className="flex justify-between py-1 border-b border-brand-surface-subtle">
                    <span className="text-brand-secondary">Nearest Transit:</span>
                    <span className="font-semibold text-right max-w-[200px]">{details.station}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-brand-surface-subtle">
                    <span className="text-brand-secondary">Year Built:</span>
                    <span className="font-semibold">{details.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-brand-surface-subtle">
                    <span className="text-brand-secondary">Structure:</span>
                    <span className="font-semibold">{details.structure}</span>
                  </div>
                  {details.monthlyFee && (
                    <div className="flex justify-between py-1">
                      <span className="text-brand-secondary">Maintenance Fee:</span>
                      <span className="font-semibold">{details.monthlyFee}</span>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-2">
                    Key Features & Amenities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {details.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2.5 py-1 bg-brand-primary/5 text-brand-primary text-xs font-semibold rounded-md border border-brand-primary/10 flex items-center gap-1"
                      >
                        <ShieldCheck size={12} />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description, Mortgage & Inquiry Form */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[600px] md:max-h-[750px]">
              <div className="space-y-6">
                {/* Titles */}
                <div>
                  <div className="flex items-center gap-1.5 text-brand-secondary text-xs font-semibold mb-1">
                    <MapPin size={12} />
                    <span>{location}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-brand-on-surface leading-tight">
                    {title}
                  </h2>
                  {jpTitle && (
                    <p className="text-sm font-semibold text-brand-secondary mt-0.5">
                      {jpTitle}
                    </p>
                  )}
                </div>

                {/* Narrative description */}
                <div className="space-y-3">
                  <div className="p-3 border-l-2 border-brand-primary bg-brand-surface-subtle rounded-r-lg">
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">English Detail</p>
                    <p className="text-xs md:text-sm text-brand-secondary leading-relaxed font-medium">
                      {description}
                    </p>
                  </div>
                  {jpDescription && (
                    <div className="p-3 border-l-2 border-brand-secondary bg-neutral-50 rounded-r-lg">
                      <p className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1">日本語介紹</p>
                      <p className="text-xs md:text-sm text-brand-secondary leading-relaxed font-medium">
                        {jpDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Mortgage Calculator (only for Buy properties) */}
                {purpose === 'buy' && monthlyPayment !== null && (
                  <div className="bg-brand-surface-subtle p-4 rounded-xl border border-brand-border-light space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calculator size={18} className="text-brand-primary animate-pulse" />
                        <h4 className="text-xs md:text-sm font-bold text-brand-on-surface">
                          Mortgage Calculator (房貸試算)
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                        Japan Bank Rates
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-medium">
                      {/* Down Payment */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-brand-secondary">
                          <span>Down Payment:</span>
                          <span className="font-bold text-brand-on-surface">{downPaymentPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="80"
                          step="5"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                          className="w-full accent-brand-primary h-1 bg-brand-border-light rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-brand-secondary">
                          Amount: ¥{((price * downPaymentPercent) / 100).toLocaleString()}
                        </span>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-brand-secondary">
                          <span>Interest Rate:</span>
                          <span className="font-bold text-brand-on-surface">{interestRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.3"
                          max="4.0"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full accent-brand-primary h-1 bg-brand-border-light rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-brand-secondary">Standard variable flat rate</span>
                      </div>

                      {/* Loan Term */}
                      <div className="sm:col-span-2 flex items-center justify-between border-t border-brand-border-light/50 pt-2 text-[11px] font-semibold text-brand-secondary">
                        <span>Loan Term Years:</span>
                        <select
                          value={loanTermYears}
                          onChange={(e) => setLoanTermYears(Number(e.target.value))}
                          className="bg-white border border-brand-border-light rounded px-2.5 py-1 text-xs font-bold text-brand-on-surface outline-none"
                        >
                          <option value={20}>20 Years</option>
                          <option value={25}>25 Years</option>
                          <option value={30}>30 Years</option>
                          <option value={35}>35 Years (Recommended)</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-brand-border-light flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-brand-secondary">Est. Monthly Payment</p>
                        <p className="text-[9px] text-brand-secondary">Principal + Interest</p>
                      </div>
                      <p className="text-lg font-extrabold text-brand-primary tracking-tight">
                        ¥{monthlyPayment.toLocaleString()} <span className="text-[10px] font-normal text-brand-secondary">/ mo</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Inquiry Form */}
                <div className="border-t border-brand-border-light pt-6">
                  <h3 className="text-sm font-bold text-brand-on-surface mb-3 flex items-center gap-1.5">
                    <Mail size={16} className="text-brand-primary" />
                    Inquire About This Property
                  </h3>

                  {isSubmitted ? (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center animate-fadeIn space-y-1">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                        <Check size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-green-800">Inquiry Sent Successfully!</h4>
                      <p className="text-xs text-green-700 font-medium">
                        Thank you. Our premier Tokyo consulting team will reach you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-3 text-brand-secondary" />
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                          />
                        </div>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-3 text-brand-secondary" />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-3 text-brand-secondary" />
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
                          />
                        </div>
                        <div>
                          <select
                            value={inquiryType}
                            onChange={(e) => setInquiryType(e.target.value as any)}
                            className="w-full px-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white text-brand-secondary"
                          >
                            <option value="viewing">Schedule Viewing</option>
                            <option value="consultation">Request Callback</option>
                            <option value="valuation">Pricing Negotiation</option>
                          </select>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white text-brand-secondary resize-none"
                      />

                      <button
                        type="submit"
                        className="w-full bg-brand-primary text-white py-2.5 rounded font-bold text-xs hover:bg-brand-primary-hover transition-colors shadow-md active:scale-95 duration-150"
                      >
                        Send Agent Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
