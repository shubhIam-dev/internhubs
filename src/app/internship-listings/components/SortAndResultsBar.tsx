'use client';

import React from 'react';
import { ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-react';

export type SortOption = 'newest' | 'deadline' | 'stipend-high' | 'stipend-low';

interface SortAndResultsBarProps {
  totalResults: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onMobileFilterOpen: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'deadline', label: 'Deadline Soonest' },
  { value: 'stipend-high', label: 'Stipend: High to Low' },
  { value: 'stipend-low', label: 'Stipend: Low to High' },
];

export default function SortAndResultsBar({
  totalResults,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
}: SortAndResultsBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:bg-muted/50 transition-colors active:scale-95"
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {totalResults}
          </span>
          <span className="text-sm text-muted-foreground">
            {totalResults === 1 ? 'internship' : 'internships'} found
          </span>
        </div>
      </div>

      {/* Sort control */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground hidden sm:block">Sort:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-border bg-white font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={`sort-${opt.value}`} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}