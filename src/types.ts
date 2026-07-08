export interface Property {
  id: string;
  title: string;
  jpTitle?: string;
  price: number;
  priceDisplay: string;
  location: string;
  region: 'Tokyo' | 'Kanagawa' | 'Other';
  type: string; // e.g. "3LDK", "2LDK", "Villa"
  area: string; // e.g. "85.20m²"
  floor: string; // e.g. "4F", "12F", "House"
  badge?: 'New Arrival' | 'Premium' | 'Popular' | 'Investment';
  image: string;
  description: string;
  jpDescription?: string;
  purpose: 'buy' | 'rent';
  details: {
    yearBuilt: string;
    station: string;
    structure: string;
    amenities: string[];
    monthlyFee?: string;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyPrice?: string;
  message: string;
  type: 'consultation' | 'viewing' | 'valuation';
  submittedAt: string;
}

export interface FilterState {
  purpose: 'buy' | 'rent' | 'sell';
  searchQuery: string;
  region: 'All' | 'Tokyo' | 'Kanagawa';
  type: 'All' | '3LDK' | '2LDK' | 'Other';
  priceMax: string;
}
