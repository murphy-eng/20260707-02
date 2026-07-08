import { useState, useEffect } from 'react';
import { Building2, Heart, MessageSquare, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  username: string;
}

export default function Navbar({
  favoriteCount,
  onOpenFavorites,
  onOpenContact,
  onOpenLogin,
  isLoggedIn,
  username
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="top-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-brand-border-light'
          : 'bg-white border-brand-border-light'
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="p-2 bg-brand-primary rounded text-white flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <span className="text-xl md:text-2xl font-bold text-brand-primary font-headline-lg tracking-tight">
            Nippon Real Estate
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-brand-secondary font-semibold hover:text-brand-primary transition-colors text-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('featured-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Buy/Sell
          </a>
          <a
            className="text-brand-secondary font-semibold hover:text-brand-primary transition-colors text-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('services-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Rental Management
          </a>
          <a
            className="text-brand-secondary font-semibold hover:text-brand-primary transition-colors text-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('services-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Asset Utilization
          </a>
          <a
            className="text-brand-secondary font-semibold hover:text-brand-primary transition-colors text-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('services-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Consulting
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Wishlist Button */}
          <button
            id="wishlist-toggle-btn"
            onClick={onOpenFavorites}
            className="relative p-2.5 hover:bg-brand-surface-subtle rounded-full text-brand-secondary hover:text-brand-primary transition-all duration-150 group"
            title="Saved Properties"
          >
            <Heart size={20} className={favoriteCount > 0 ? 'fill-brand-primary text-brand-primary' : ''} />
            {favoriteCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-brand-primary rounded-full animate-pulse">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Login Button */}
          {isLoggedIn ? (
            <button
              id="user-profile-btn"
              onClick={onOpenLogin}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 hover:bg-brand-surface-subtle rounded-full border border-brand-border-light text-brand-on-surface transition-all"
            >
              <div className="w-6 h-6 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center font-bold text-xs">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold max-w-[100px] truncate">{username}</span>
            </button>
          ) : (
            <button
              id="login-btn"
              onClick={onOpenLogin}
              className="text-brand-secondary hover:text-brand-primary font-semibold text-sm transition-all px-3 py-1.5 rounded-md hover:bg-brand-surface-subtle"
            >
              Login
            </button>
          )}

          {/* Contact Button */}
          <button
            id="contact-navbar-btn"
            onClick={onOpenContact}
            className="bg-brand-primary text-white px-4 md:px-6 py-2 md:py-2.5 rounded font-bold text-sm hover:bg-brand-primary-hover transition-all transform active:scale-95 duration-150 flex items-center gap-1.5 shadow-sm"
          >
            <MessageSquare size={16} />
            <span className="hidden xs:inline">Contact Us</span>
            <span className="xs:hidden">Contact</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-surface-subtle rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden bg-white border-t border-brand-border-light animate-fadeIn">
          <div className="px-4 py-4 space-y-3">
            <a
              className="block py-2.5 px-3 rounded-md hover:bg-brand-surface-subtle text-brand-secondary hover:text-brand-primary font-semibold text-sm transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Buy/Sell
            </a>
            <a
              className="block py-2.5 px-3 rounded-md hover:bg-brand-surface-subtle text-brand-secondary hover:text-brand-primary font-semibold text-sm transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Rental Management
            </a>
            <a
              className="block py-2.5 px-3 rounded-md hover:bg-brand-surface-subtle text-brand-secondary hover:text-brand-primary font-semibold text-sm transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Asset Utilization
            </a>
            <a
              className="block py-2.5 px-3 rounded-md hover:bg-brand-surface-subtle text-brand-secondary hover:text-brand-primary font-semibold text-sm transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Consulting
            </a>

            {isLoggedIn && (
              <div className="pt-3 border-t border-brand-border-light flex items-center gap-2 px-3">
                <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-on-surface">{username}</div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="text-xs text-brand-primary hover:underline font-medium"
                  >
                    View Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
