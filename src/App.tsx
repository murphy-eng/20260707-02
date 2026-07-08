import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, PhoneCall, Building2, HelpCircle } from 'lucide-react';

import { PROPERTIES } from './data';
import { Property, Inquiry, FilterState } from './types';

// Import Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import PropertyFilters from './components/PropertyFilters';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import Services from './components/Services';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';
import WishlistDrawer from './components/WishlistDrawer';
import Footer from './components/Footer';

export default function App() {
  // --- Persistent State Hooks ---
  const [favorites, setFavorites] = useState<string[]>(() => {
    const local = localStorage.getItem('nippon_favorites');
    return local ? JSON.parse(local) : [];
  });

  const [userInquiries, setUserInquiries] = useState<Inquiry[]>(() => {
    const local = localStorage.getItem('nippon_inquiries');
    return local ? JSON.parse(local) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nippon_is_logged') === 'true';
  });

  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('nippon_username') || 'Guest';
  });

  // --- Modal & Slideover Controls ---
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // --- Search & Filtering State ---
  const [filters, setFilters] = useState<FilterState>({
    purpose: 'buy', // default to property purchase
    searchQuery: '',
    region: 'All',
    type: 'All',
    priceMax: 'All'
  });

  // --- Sync storage changes ---
  useEffect(() => {
    localStorage.setItem('nippon_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('nippon_inquiries', JSON.stringify(userInquiries));
  }, [userInquiries]);

  // --- Interaction Handlers ---
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening details
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAddInquiry = (inquiryData: Omit<Inquiry, 'id' | 'submittedAt'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setUserInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
    localStorage.setItem('nippon_is_logged', 'true');
    localStorage.setItem('nippon_username', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('Guest');
    localStorage.removeItem('nippon_is_logged');
    localStorage.removeItem('nippon_username');
  };

  const handleFilterUpdate = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const handleFilterReset = () => {
    setFilters({
      purpose: filters.purpose, // maintain buy vs rent context
      searchQuery: '',
      region: 'All',
      type: 'All',
      priceMax: 'All'
    });
  };

  // --- Filtering Evaluation Logic ---
  const filteredProperties = PROPERTIES.filter((prop) => {
    // 1. Filter by purchase type (Buy vs Rent)
    if (prop.purpose !== filters.purpose) return false;

    // 2. Filter by region
    if (filters.region !== 'All' && prop.region !== filters.region) return false;

    // 3. Filter by Layout Type
    if (filters.type !== 'All') {
      if (filters.type === 'Other') {
        // Find non-standard layout (Villas, etc)
        if (prop.type === '3LDK' || prop.type === '2LDK') return false;
      } else if (prop.type !== filters.type) {
        return false;
      }
    }

    // 4. Filter by Max Budget Price
    if (filters.priceMax !== 'All') {
      const maxPrice = parseInt(filters.priceMax);
      if (prop.price > maxPrice) return false;
    }

    // 5. Filter by Text Search Matcher (Keywords, titles, locations, layout sizes)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchJpTitle = prop.jpTitle?.toLowerCase().includes(q);
      const matchLoc = prop.location.toLowerCase().includes(q);
      const matchDesc = prop.description.toLowerCase().includes(q);
      const matchRegion = prop.region.toLowerCase().includes(q);
      const matchType = prop.type.toLowerCase().includes(q);

      if (!matchTitle && !matchJpTitle && !matchLoc && !matchDesc && !matchRegion && !matchType) {
        return false;
      }
    }

    return true;
  });

  const savedProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-brand-background font-sans antialiased text-brand-on-surface select-none">
      {/* Top Navbar */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsWishlistOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      <main>
        {/* Hero Banner Section */}
        <Hero onSearch={handleFilterUpdate} currentFilters={filters} />

        {/* Featured Two-Column Region Portals */}
        <FeaturedCollections onSelectCollection={handleFilterUpdate} />

        {/* Interactive Properties Listings Area */}
        <section id="featured-section" className="max-w-7xl mx-auto px-4 md:px-10 py-12 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1.5 bg-brand-primary/10 text-brand-primary rounded-full">
                  <Sparkles size={16} className="animate-pulse" />
                </span>
                <span className="text-xs font-bold text-brand-primary tracking-wider uppercase">
                  Curated Catalog ({filters.purpose === 'buy' ? 'Properties for Sale' : 'Properties for Rent'})
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-brand-on-surface font-headline-lg tracking-tight">
                Featured Properties
              </h2>
              <p className="text-brand-secondary font-medium text-sm mt-1">
                Discover premium architectural layouts across Japan's most elite districts.
              </p>
            </div>

            {/* In-view toggle for buy vs rent */}
            <div className="flex bg-brand-surface-subtle p-1 rounded-xl border border-brand-border-light self-start">
              <button
                id="listing-buy-toggle"
                onClick={() => handleFilterUpdate({ purpose: 'buy', priceMax: 'All' })}
                className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all ${
                  filters.purpose === 'buy'
                    ? 'bg-white text-brand-primary shadow-sm border border-brand-border-light/40'
                    : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                Buy Properties
              </button>
              <button
                id="listing-rent-toggle"
                onClick={() => handleFilterUpdate({ purpose: 'rent', priceMax: 'All' })}
                className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all ${
                  filters.purpose === 'rent'
                    ? 'bg-white text-brand-primary shadow-sm border border-brand-border-light/40'
                    : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                Rent Properties
              </button>
            </div>
          </div>

          {/* Core filters bar */}
          <PropertyFilters
            filters={filters}
            onChange={handleFilterUpdate}
            onReset={handleFilterReset}
            resultsCount={filteredProperties.length}
          />

          {/* Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProperties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white rounded-2xl border border-brand-border-light max-w-xl mx-auto p-8 space-y-4 shadow-sm"
              >
                <div className="w-14 h-14 bg-brand-surface-subtle rounded-full flex items-center justify-center text-brand-secondary mx-auto border border-brand-border-light">
                  <HelpCircle size={26} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-brand-on-surface">No exact match found</h4>
                  <p className="text-xs font-semibold text-brand-secondary max-w-sm mx-auto mt-1 leading-relaxed">
                    Try clearing search inputs, resetting budget caps, or browsing different layout types.
                  </p>
                </div>
                <button
                  onClick={handleFilterReset}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  Clear Search Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PropertyCard
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectProperty={setSelectedProperty}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Corporate Services Section */}
        <Services />

        {/* High-Impact CTA banner */}
        <section className="bg-brand-primary py-16 text-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl md:text-4xl font-extrabold font-headline-lg tracking-tight leading-tight">
                Looking for Expert Advice?
              </h2>
              <p className="font-semibold text-sm md:text-base opacity-90 max-w-xl">
                Schedule a private, bi-lingual consulting session with our licensed real estate specialists today.
              </p>
            </div>

            <button
              id="cta-expert-consultation"
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-brand-primary px-8 py-3.5 rounded-lg font-bold text-xs md:text-sm hover:bg-neutral-50 transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 active:scale-95 duration-150"
            >
              <PhoneCall size={16} />
              <span>Free Consultation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* --- Overlay Modals & Drawers --- */}

      {/* Property Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            onSubmitInquiry={handleAddInquiry}
          />
        )}
      </AnimatePresence>

      {/* General Inquiry Form Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            onSubmitInquiry={handleAddInquiry}
          />
        )}
      </AnimatePresence>

      {/* Simulated authentication panel */}
      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            isLoggedIn={isLoggedIn}
            username={username}
            onLogin={handleLogin}
            onLogout={handleLogout}
            userInquiries={userInquiries}
          />
        )}
      </AnimatePresence>

      {/* Saved Bookmarks Tray Slideover */}
      <AnimatePresence>
        {isWishlistOpen && (
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            savedProperties={savedProperties}
            onRemoveFavorite={handleToggleFavorite}
            onSelectProperty={setSelectedProperty}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

