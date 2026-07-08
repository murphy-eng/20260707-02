import { ArrowRight } from 'lucide-react';
import { FilterState } from '../types';

interface FeaturedCollectionsProps {
  onSelectCollection: (filters: Partial<FilterState>) => void;
}

export default function FeaturedCollections({ onSelectCollection }: FeaturedCollectionsProps) {
  const handleSelect = (region: 'Tokyo' | 'Kanagawa') => {
    onSelectCollection({
      region,
      purpose: 'buy', // default to buy listings
      searchQuery: '' // clear text query to show all
    });
    // Scroll to the list
    const section = document.getElementById('featured-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tokyo Luxury Estates */}
        <div className="relative group overflow-hidden rounded-xl h-80 flex items-end p-6 md:p-8 shadow-md border border-brand-border-light/40">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAP8lTI0qmgYrqj5WsoodngogGuPyehNjlajm0IZjkWttCTSxPCBdBfr66x2xYwWDXgyT3zmqmnWbJ7G6yGX80VHmeskiMAzKYYsK4OzgNci50TzgH7kBwzW8EY4ncBvYjn4F2_kSQ-7r9YCa2TcDa5oKpRhVeqjEtEolXcWAuISYvRlOwL0nE_ruSadQOxeDC4v8YBh1gEXArF9FIuBIbNgtfJW2Wj0ocWs3DepvMFt-8Tej9mVGWCyPB1kOlYIkZcQYZ8HX_m4bNQ')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-on-surface/90 via-brand-on-surface/45 to-transparent" />
          <div className="relative z-10 w-full">
            <h3 className="text-white text-2xl font-bold font-headline-lg mb-2">
              Tokyo Luxury Estates
            </h3>
            <p className="text-white/80 font-medium text-sm mb-4 leading-relaxed max-w-md">
              東京億級豪宅 — High-end residential properties in the heart of the capital.
            </p>
            <button
              onClick={() => handleSelect('Tokyo')}
              className="inline-flex items-center bg-brand-primary text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-brand-primary-hover transition-all shadow-md group/btn"
            >
              Explore Tokyo
              <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Kanagawa Minshuku Properties */}
        <div className="relative group overflow-hidden rounded-xl h-80 flex items-end p-6 md:p-8 shadow-md border border-brand-border-light/40">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuABZfsK81gwLaOjQtioxTrL5nuKQ5zBlnFOY_ec59TXwKQPqRllx2VqUX0AhdMb6GAPs6KWcMRu_A2n1kdKV6yH6QjFA7nROwXxZMTfjC4KC74yN4qbduV1q_yK2h3GM1GvK8Zj04IEvOS07bMXk8EagXA8-0pPp31ZwPwdA0cTKCHoyxFyVUVL9qUjirFnnKcEsaSqRkvF6Uf5ve3ZKLll_VW8-CFC0QuDFCBepeiA96VWyoQHGHMUm0I5s8dSd8y-nCYrFRWVQ88x')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-on-surface/90 via-brand-on-surface/45 to-transparent" />
          <div className="relative z-10 w-full">
            <h3 className="text-white text-2xl font-bold font-headline-lg mb-2">
              Kanagawa Minshuku Properties
            </h3>
            <p className="text-white/80 font-medium text-sm mb-4 leading-relaxed max-w-md">
              神奈川民宿不動產 — Vacation rentals and investment opportunities in Kanagawa.
            </p>
            <button
              onClick={() => handleSelect('Kanagawa')}
              className="inline-flex items-center bg-brand-primary text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-brand-primary-hover transition-all shadow-md group/btn"
            >
              Explore Kanagawa
              <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
