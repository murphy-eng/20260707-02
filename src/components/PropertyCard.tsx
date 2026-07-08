import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty
}: PropertyCardProps) {
  const { id, title, priceDisplay, location, type, area, floor, badge, image } = property;

  return (
    <div
      id={`property-card-${id}`}
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-xl border border-brand-border-light hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Image with overlay badge & favorite button */}
      <div className="relative h-60 md:h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Status Badge */}
        {badge && (
          <span className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
            {badge}
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(id, e)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-brand-secondary hover:text-brand-primary transition-all shadow-md hover:scale-110 active:scale-95 duration-150 z-10"
        >
          <Heart
            size={18}
            className={`transition-colors ${isFavorite ? 'fill-brand-primary text-brand-primary' : 'text-brand-secondary'}`}
          />
        </button>
      </div>

      {/* Details Area */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Price */}
          <div className="text-brand-primary font-bold text-xl md:text-2xl font-headline-md mb-1.5">
            {priceDisplay}
          </div>

          {/* Title */}
          <h4 className="text-brand-on-surface font-bold text-base md:text-lg mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">
            {title}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-brand-secondary font-medium text-xs mb-5">
            <MapPin size={14} className="text-brand-secondary" />
            <span>{location}</span>
          </div>
        </div>

        {/* Specs footer */}
        <div className="grid grid-cols-3 gap-2 border-t border-brand-border-light pt-4 mt-auto">
          <div className="text-center">
            <div className="font-bold text-sm text-brand-on-surface">{type}</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider mt-0.5">Type</div>
          </div>
          <div className="text-center border-x border-brand-border-light">
            <div className="font-bold text-sm text-brand-on-surface">{area}</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider mt-0.5">Area</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-sm text-brand-on-surface">{floor}</div>
            <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider mt-0.5">Floor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
