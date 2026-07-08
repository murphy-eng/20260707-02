import React from 'react';
import { X, Trash2, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedProperties,
  onRemoveFavorite,
  onSelectProperty
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark backdrop overlay */}
        <div
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out animate-slideIn">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl border-l border-brand-border-light">
              {/* Header */}
              <div className="px-6 py-6 bg-brand-surface-subtle border-b border-brand-border-light flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="text-brand-primary fill-brand-primary animate-pulse" />
                  <h2 className="text-base font-extrabold text-brand-on-surface">
                    My Saved Properties ({savedProperties.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-200 rounded-full text-brand-secondary hover:text-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Saved items list */}
              <div className="flex-1 px-6 py-4">
                {savedProperties.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-3.5 py-20">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                      <Heart size={32} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-on-surface">No bookmarked properties</h4>
                      <p className="text-xs text-brand-secondary font-medium max-w-[240px] mx-auto mt-1 leading-relaxed">
                        Explore properties and tap the heart icon to save listings to this board.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors"
                    >
                      Browse Listings
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedProperties.map((property) => (
                      <div
                        key={property.id}
                        onClick={() => {
                          onSelectProperty(property);
                          onClose();
                        }}
                        className="flex gap-3.5 p-3 rounded-xl border border-brand-border-light hover:border-brand-primary/20 hover:bg-brand-surface-subtle transition-all duration-200 cursor-pointer group"
                      >
                        {/* Thumbnail image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                          <img
                            src={property.image}
                            alt={property.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Title, location and deletion */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-extrabold text-brand-on-surface truncate pr-1.5 group-hover:text-brand-primary transition-colors">
                                {property.title}
                              </h4>
                              <button
                                onClick={(e) => onRemoveFavorite(property.id, e)}
                                className="p-1 hover:bg-red-50 text-neutral-400 hover:text-brand-primary rounded transition-colors shrink-0"
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="text-[10px] text-brand-secondary font-semibold mt-0.5 truncate">
                              {property.location}
                            </p>
                          </div>

                          <div className="flex justify-between items-end border-t border-brand-border-light/40 pt-1 mt-1">
                            <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                              {property.type} • {property.area}
                            </span>
                            <span className="text-xs font-extrabold text-brand-primary">
                              {property.priceDisplay}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Slideover actions footer */}
              {savedProperties.length > 0 && (
                <div className="px-6 py-6 bg-brand-surface-subtle border-t border-brand-border-light space-y-3.5">
                  <div className="text-xs font-medium text-brand-secondary flex justify-between">
                    <span>Selected Properties:</span>
                    <span className="font-bold text-brand-on-surface">{savedProperties.length} listings</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      const section = document.getElementById('featured-section');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3 rounded-lg font-bold text-xs md:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    Compare Saved Listings
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
