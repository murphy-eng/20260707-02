import React, { useState } from 'react';
import { Search, MapPin, Building2, Landmark, Check } from 'lucide-react';
import { FilterState } from '../types';

interface HeroProps {
  onSearch: (filters: Partial<FilterState>) => void;
  currentFilters: FilterState;
}

export default function Hero({ onSearch, currentFilters }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [searchVal, setSearchVal] = useState('');
  
  // Sell estimation calculator state
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [propertyLoc, setPropertyLoc] = useState('Tokyo - Central');
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [submittedValuation, setSubmittedValuation] = useState(false);

  const handleSearchSubmit = () => {
    onSearch({
      purpose: activeTab,
      searchQuery: searchVal
    });
    // Scroll down to properties section
    const section = document.getElementById('featured-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(propertyArea) || 50;
    const age = parseFloat(propertyAge) || 5;
    
    let basePricePerSqm = 1100000; // 1.1M JPY per sqm default
    if (propertyLoc.includes('Tokyo')) {
      basePricePerSqm = 1400000;
    } else if (propertyLoc.includes('Kanagawa')) {
      basePricePerSqm = 850000;
    }

    // Age depreciation (2% per year up to 50%)
    const depreciationFactor = Math.max(0.4, 1 - age * 0.02);
    const estimate = Math.round(area * basePricePerSqm * depreciationFactor);
    setEstimatedValue(estimate);
  };

  const resetValuation = () => {
    setPropertyArea('');
    setPropertyAge('');
    setEstimatedValue(null);
    setSubmittedValuation(false);
  };

  return (
    <section id="hero-section" className="relative h-auto md:h-[650px] flex items-center py-12 md:py-0">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center scale-105 duration-1000"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOlsbTrsTU6eYoGYE-4dQZJdOxlAoCH73gkJt1M9F_UZsDHRgdgvJBxm4F3K4dMeKEOa0Qx2ZjLgMqPP69QpMFUwq3pSIQ70NSDHSxDwI8dgz0UlOMAeRmunk12eX1W3AFGHhHWOssglXBSyXSbAnMbn9oaT3bN4k8C02fy5PZnyPUD-Tyus2URQ1CJCJkIHqN6jXEqAATmrvDZV08zJv_1bYhrTWVFKLOM6H51bQTaTf9R0IMVIJNXfwPoaL6HXMQRkNUI3ScbgfH')`
          }}
        />
        <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-on-surface/75 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10">
        <div className="max-w-2xl bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-brand-border-light transition-all duration-300">
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-on-surface mb-6 leading-tight font-display-lg tracking-tight">
            Find Your Perfect Space in Japan
          </h1>

          {/* Search Tabs */}
          <div className="flex gap-1 mb-5 border-b border-brand-border-light">
            <button
              id="tab-buy"
              className={`px-6 py-2.5 font-bold text-sm transition-all border-b-2 -mb-px ${
                activeTab === 'buy'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-secondary hover:text-brand-primary'
              }`}
              onClick={() => {
                setActiveTab('buy');
                onSearch({ purpose: 'buy' });
              }}
            >
              Buy
            </button>
            <button
              id="tab-rent"
              className={`px-6 py-2.5 font-bold text-sm transition-all border-b-2 -mb-px ${
                activeTab === 'rent'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-secondary hover:text-brand-primary'
              }`}
              onClick={() => {
                setActiveTab('rent');
                onSearch({ purpose: 'rent' });
              }}
            >
              Rent
            </button>
            <button
              id="tab-sell"
              className={`px-6 py-2.5 font-bold text-sm transition-all border-b-2 -mb-px ${
                activeTab === 'sell'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-secondary hover:text-brand-primary'
              }`}
              onClick={() => {
                setActiveTab('sell');
              }}
            >
              Sell
            </button>
          </div>

          {/* Content Pane depending on tab */}
          {activeTab === 'sell' ? (
            <div className="animate-fadeIn">
              <p className="text-xs text-brand-secondary mb-3 font-semibold uppercase tracking-wider">
                🏠 Property Valuation Estimator (房屋估價試算)
              </p>
              
              {estimatedValue === null ? (
                <form onSubmit={calculateValuation} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-on-surface mb-1">
                        Floor Area (坪數/面積)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 85"
                        value={propertyArea}
                        onChange={(e) => setPropertyArea(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-on-surface mb-1">
                        Property Age (屋齡)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 5"
                        value={propertyAge}
                        onChange={(e) => setPropertyAge(e.target.value)}
                        className="w-full px-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-on-surface mb-1">
                      Region / Area (所在地區)
                    </label>
                    <select
                      value={propertyLoc}
                      onChange={(e) => setPropertyLoc(e.target.value)}
                      className="w-full px-3 py-2 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary text-sm font-medium"
                    >
                      <option value="Tokyo - Central">Tokyo - Central (Minato/Shibuya/Setagaya)</option>
                      <option value="Tokyo - Suburban">Tokyo - Suburban Districts</option>
                      <option value="Kanagawa - Kamakura">Kanagawa - Kamakura / Coastal</option>
                      <option value="Kanagawa - Yokohama">Kanagawa - Yokohama Area</option>
                      <option value="Other Regions">Other Prefectures</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white py-2.5 rounded font-bold text-sm hover:bg-brand-primary-hover transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Landmark size={16} />
                    Calculate Estimated Valuation
                  </button>
                </form>
              ) : (
                <div className="bg-brand-surface-subtle p-4 rounded-lg border border-brand-primary/20 space-y-3">
                  <div className="text-center">
                    <p className="text-xs text-brand-secondary font-semibold">Estimated Market Value</p>
                    <p className="text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight mt-1">
                      ¥{estimatedValue.toLocaleString()} JPY
                    </p>
                    <p className="text-[11px] text-brand-secondary mt-1">
                      Based on current {propertyArea}m² area, {propertyLoc}, {propertyAge} years old.
                    </p>
                  </div>

                  {submittedValuation ? (
                    <div className="p-2.5 bg-green-50 rounded text-center text-xs font-semibold text-green-700 flex items-center justify-center gap-1.5">
                      <Check size={14} />
                      Listing request submitted! Our agent will contact you.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={resetValuation}
                        className="flex-1 border border-brand-border-light bg-white text-brand-secondary font-bold text-xs py-2 rounded hover:bg-brand-surface-subtle transition-colors"
                      >
                        Recalculate
                      </button>
                      <button
                        onClick={() => setSubmittedValuation(true)}
                        className="flex-1 bg-brand-primary text-white font-bold text-xs py-2 rounded hover:bg-brand-primary-hover transition-colors"
                      >
                        Submit to Agent
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Search Inputs for Buy or Rent */
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                    }}
                    placeholder="Location, Station, or Keyword (e.g., Shibuya)"
                    className="w-full pl-10 pr-4 py-4 bg-brand-surface-subtle border border-brand-border-light rounded focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-sm text-brand-on-surface"
                  />
                  {searchVal && (
                    <button 
                      onClick={() => setSearchVal('')} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-secondary hover:text-brand-primary"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  id="hero-search-submit"
                  onClick={handleSearchSubmit}
                  className="bg-brand-primary text-white px-8 py-4 rounded font-bold text-sm hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95 duration-150"
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-brand-secondary font-semibold">Popular:</span>
                {['Setagaya', 'Shibuya', 'Minato', 'Kamakura', 'Hakone'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchVal(item);
                      onSearch({ purpose: activeTab, searchQuery: item });
                      setTimeout(() => {
                        document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-2.5 py-1 bg-brand-surface-subtle hover:bg-brand-primary/10 hover:text-brand-primary rounded text-brand-secondary font-medium transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
