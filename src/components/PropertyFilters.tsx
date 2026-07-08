import { SlidersHorizontal, RefreshCw } from 'lucide-react';
import { FilterState } from '../types';

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  resultsCount: number;
}

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  resultsCount
}: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-brand-border-light p-4 md:p-6 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Left Side: Filter Options */}
        <div className="flex flex-wrap gap-3 items-center flex-1">
          {/* Region Buttons */}
          <div className="flex bg-brand-surface-subtle p-1 rounded-lg border border-brand-border-light">
            {(['All', 'Tokyo', 'Kanagawa'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => onChange({ region: reg })}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  filters.region === reg
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Type Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-brand-secondary uppercase tracking-wider hidden sm:inline">
              Layout:
            </span>
            <select
              value={filters.type}
              onChange={(e) => onChange({ type: e.target.value as any })}
              className="bg-brand-surface-subtle border border-brand-border-light rounded-lg px-3 py-1.5 text-xs font-bold text-brand-on-surface outline-none focus:border-brand-primary"
            >
              <option value="All">All Types</option>
              <option value="3LDK">3LDK</option>
              <option value="2LDK">2LDK</option>
              <option value="Other">Other / Villas</option>
            </select>
          </div>

          {/* Max Price Cap */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-brand-secondary uppercase tracking-wider hidden sm:inline">
              Budget:
            </span>
            <select
              value={filters.priceMax}
              onChange={(e) => onChange({ priceMax: e.target.value })}
              className="bg-brand-surface-subtle border border-brand-border-light rounded-lg px-3 py-1.5 text-xs font-bold text-brand-on-surface outline-none focus:border-brand-primary"
            >
              <option value="All">Any Price</option>
              {filters.purpose === 'rent' ? (
                <>
                  <option value="250000">Under ¥250k / mo</option>
                  <option value="350000">Under ¥350k / mo</option>
                  <option value="450000">Under ¥450k / mo</option>
                </>
              ) : (
                <>
                  <option value="80000000">Under ¥80M</option>
                  <option value="120000000">Under ¥120M</option>
                  <option value="180000000">Under ¥180M</option>
                  <option value="250000000">Under ¥250M</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Right Side: Reset & Result counts */}
        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-brand-border-light pt-3 md:pt-0">
          <div className="text-xs font-semibold text-brand-secondary">
            Found <span className="font-extrabold text-brand-primary">{resultsCount}</span> matching property listings
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-brand-secondary hover:text-brand-primary border border-brand-border-light hover:border-brand-primary bg-white hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg transition-all"
            title="Clear all filters"
          >
            <RefreshCw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Active filters summary */}
      {(filters.searchQuery || filters.region !== 'All' || filters.type !== 'All' || filters.priceMax !== 'All') && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-brand-border-light/50 pt-3 mt-3 text-xs">
          <SlidersHorizontal size={12} className="text-brand-primary shrink-0 mr-1" />
          <span className="text-brand-secondary font-semibold">Active:</span>

          {filters.searchQuery && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-bold rounded-sm border border-neutral-200">
              Query: "{filters.searchQuery}"
            </span>
          )}
          {filters.region !== 'All' && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-bold rounded-sm border border-neutral-200">
              Region: {filters.region}
            </span>
          )}
          {filters.type !== 'All' && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-bold rounded-sm border border-neutral-200">
              Type: {filters.type}
            </span>
          )}
          {filters.priceMax !== 'All' && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-bold rounded-sm border border-neutral-200">
              Max Price: ¥
              {filters.purpose === 'rent'
                ? `${(parseInt(filters.priceMax) / 1000).toLocaleString()}k/mo`
                : `${(parseInt(filters.priceMax) / 1000000).toLocaleString()}M`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
