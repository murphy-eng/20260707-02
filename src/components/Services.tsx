import { useState } from 'react';
import { Handshake, Building2, Landmark, Check, X, ArrowRight } from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const servicesData = [
    {
      id: 'brokerage',
      title: 'Real Estate Brokerage',
      jpTitle: '不動產仲介買賣',
      icon: Handshake,
      shortDesc: 'Full support for property search, price negotiation, and legal contracts. We guide you through every step of the transaction process.',
      detailedDesc: 'Our elite brokerage service provides absolute legal security, strategic tax structuring, and optimal pricing for high-net-worth buyers in the Japanese market. We manage the entire acquisition lifecycle from compliance reviews to keys hand-over.',
      benefits: [
        'Bi-lingual transaction coordinators & translators',
        'Complete property due diligence & structural audits',
        'Financing support with major Japanese banks',
        'Full tax optimization and corporate structuring consulting'
      ]
    },
    {
      id: 'management',
      title: 'Professional Property Management',
      jpTitle: '專業資產管理物業',
      icon: Building2,
      shortDesc: 'Comprehensive management services to maximize property investment returns through expert tenant curation and maintenance.',
      detailedDesc: 'Maximize yield and protect your physical real estate asset with our comprehensive 24/7 management service. We handles all aspect of tenancy, compliance, accounting, and emergency response.',
      benefits: [
        'Premium tenant screening and rent collection',
        'Routine preventive maintenance & cleaning teams',
        'Digital client portal for real-time yield analytics',
        'Legal compliance and eviction management'
      ]
    },
    {
      id: 'utilization',
      title: 'Effective Land Utilization',
      jpTitle: '土地有效開發整合',
      icon: Landmark,
      shortDesc: 'Analysis of land value to provide optimal development or asset conversion advice tailored to current market demands.',
      detailedDesc: 'Transform idle acreage or old properties into high-performing commercial assets, modern residential towers, or cash-flowing licensed Minshuku properties. We evaluate local density rules, market demands, and capital costs.',
      benefits: [
        'Detailed feasibility and yield simulation reports',
        'Architectural design & zoning change navigation',
        'Joint venture partnerships & development financing',
        'Eco-friendly & energy-efficient material specifications'
      ]
    }
  ];

  const activeService = servicesData.find((s) => s.id === selectedService);

  return (
    <section id="services-section" className="bg-brand-surface-subtle py-16 border-y border-brand-border-light">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-brand-on-surface mb-4 font-headline-lg tracking-tight">
            Our Professional Services
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className="bg-white rounded-xl p-8 text-center group border border-brand-border-light hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full transform hover:-translate-y-1"
              >
                <div>
                  <div className="w-20 h-20 bg-brand-surface-subtle rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-border-light group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-300">
                    <IconComponent size={36} className="text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-on-surface mb-3 group-hover:text-brand-primary transition-colors font-headline-md">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-secondary/75 mb-4 tracking-wider uppercase">
                    {service.jpTitle}
                  </p>
                  <p className="text-brand-secondary font-medium text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="text-brand-primary font-bold text-xs inline-flex items-center justify-center gap-1 group-hover:underline mt-auto">
                  <span>Learn More</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services Detail Modal Popup */}
      {selectedService && activeService && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="services-modal" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay background */}
            <div
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedService(null)}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            {/* Panel */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 md:p-8 animate-scaleUp">
              {/* Close Icon */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 p-2 text-brand-secondary hover:text-black hover:bg-brand-surface-subtle rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3.5 mb-5 border-b border-brand-border-light pb-4">
                <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl">
                  {<activeService.icon size={28} />}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-brand-on-surface leading-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-xs font-bold text-brand-primary uppercase mt-0.5 tracking-wider">
                    {activeService.jpTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs md:text-sm text-brand-secondary leading-relaxed font-semibold">
                  {activeService.detailedDesc}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-brand-on-surface uppercase tracking-wider mb-2.5">
                    Service Standards & Guarantees
                  </h4>
                  <ul className="space-y-2">
                    {activeService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-brand-secondary">
                        <Check size={14} className="text-brand-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-border-light">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 rounded font-bold text-xs md:text-sm transition-colors shadow-md"
                >
                  Close & Schedule Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
