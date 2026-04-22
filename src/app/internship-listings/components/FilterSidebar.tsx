'use client';

import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { CATEGORIES, TYPES, DURATIONS } from '@/lib/internshipData';
import type { InternshipCategory, InternshipType } from '@/lib/internshipData';

export interface FilterState {
  keyword: string;
  location: string;
  stipendMin: number | null;
  stipendMax: number | null;
  skills: string[];
  category: InternshipCategory | 'all';
  type: InternshipType | 'all';
  duration: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  availableLocations: string[];
  availableSkills: string[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  totalResults,
  isMobileOpen,
  onMobileClose,
  availableLocations,
  availableSkills,
}: FilterSidebarProps) {
  const [skillSearch, setSkillSearch] = useState('');

  const hasActiveFilters =
    filters.keyword !== '' ||
    filters.location !== 'All Locations' ||
    filters.stipendMin !== null ||
    filters.stipendMax !== null ||
    filters.skills.length > 0 ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.duration !== 'all';

  const resetFilters = () => {
    onFilterChange({
      keyword: '',
      location: 'All Locations',
      stipendMin: null,
      stipendMax: null,
      skills: [],
      category: 'all',
      type: 'all',
      duration: 'all',
    });
    setSkillSearch('');
  };

  const toggleSkill = (skill: string) => {
    const current = filters.skills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    onFilterChange({ ...filters, skills: updated });
  };

  const filteredSkillOptions = availableSkills.filter((s) =>
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-primary" />
          <span className="font-semibold text-sm text-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Close filters"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Scrollable filter body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-6">
        {/* Results count */}
        <div className="text-xs text-muted-foreground font-medium">
          Showing{' '}
          <span className="text-foreground font-semibold tabular-nums">{totalResults}</span>{' '}
          internships
        </div>

        {/* Keyword search */}
        <div>
          <label
            htmlFor="keyword-search"
            className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2"
          >
            Search
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              id="keyword-search"
              type="text"
              placeholder="Role, company, skill…"
              value={filters.keyword}
              onChange={(e) =>
                onFilterChange({ ...filters, keyword: e.target.value })
              }
              className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
            />
            {filters.keyword && (
              <button
                onClick={() => onFilterChange({ ...filters, keyword: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location-select"
            className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2"
          >
            Location
          </label>
          <div className="relative">
            <select
              id="location-select"
              value={filters.location}
              onChange={(e) =>
                onFilterChange({ ...filters, location: e.target.value })
              }
              className="w-full appearance-none py-2 pl-3 pr-8 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              {availableLocations.map((loc) => (
                <option key={`loc-${loc}`} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {/* Location chips */}
          {filters.location !== 'All Locations' && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground border border-primary">
                {filters.location}
                <button
                  onClick={() => onFilterChange({ ...filters, location: 'All Locations' })}
                  aria-label="Remove location filter"
                >
                  <X size={10} />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Stipend Range */}
        <div>
          <p className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Stipend Range (₹/mo)
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              min={0}
              value={filters.stipendMin ?? ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  stipendMin: e.target.value !== '' ? Number(e.target.value) : null,
                })
              }
              className="w-full py-2 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
            />
            <span className="text-muted-foreground text-xs flex-shrink-0">–</span>
            <input
              type="number"
              placeholder="Max"
              min={0}
              value={filters.stipendMax ?? ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  stipendMax: e.target.value !== '' ? Number(e.target.value) : null,
                })
              }
              className="w-full py-2 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          {(filters.stipendMin !== null || filters.stipendMax !== null) && (
            <button
              onClick={() => onFilterChange({ ...filters, stipendMin: null, stipendMax: null })}
              className="mt-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear stipend range
            </button>
          )}
        </div>

        {/* Skills */}
        <div>
          <p className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Skills
          </p>
          {/* Selected skill chips */}
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {filters.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground border border-primary"
                >
                  {skill}
                  <button onClick={() => toggleSkill(skill)} aria-label={`Remove ${skill}`}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Skill search */}
          {availableSkills.length > 0 && (
            <div className="relative mb-2">
              <Search
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search skills…"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
              />
            </div>
          )}
          {/* Skill options */}
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto scrollbar-thin">
            {filteredSkillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                  filters.skills.includes(skill)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {skill}
              </button>
            ))}
            {filteredSkillOptions.length === 0 && availableSkills.length > 0 && (
              <p className="text-xs text-muted-foreground">No matching skills</p>
            )}
          </div>
        </div>

        {/* Category / Field */}
        <div>
          <label
            htmlFor="category-select"
            className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2"
          >
            Field / Category
          </label>
          <div className="relative">
            <select
              id="category-select"
              value={filters.category}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  category: e.target.value as InternshipCategory | 'all',
                })
              }
              className="w-full appearance-none py-2 pl-3 pr-8 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={`cat-${cat.value}`} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={`chip-${cat.value}`}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    category:
                      filters.category === cat.value ? 'all' : (cat.value as InternshipCategory),
                  })
                }
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                  filters.category === cat.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <p className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Work Type
          </p>
          <div className="space-y-1.5">
            {TYPES.map((t) => (
              <button
                key={`type-${t.value}`}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    type: t.value as InternshipType | 'all',
                  })
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all duration-150 ${
                  filters.type === t.value
                    ? 'bg-primary/8 border-primary/30 text-primary font-semibold' :'bg-background border-border text-foreground hover:bg-muted/50 hover:border-border'
                }`}
              >
                <span>{t.label}</span>
                {filters.type === t.value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration-select"
            className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2"
          >
            Duration
          </label>
          <div className="relative">
            <select
              id="duration-select"
              value={filters.duration}
              onChange={(e) =>
                onFilterChange({ ...filters, duration: e.target.value })
              }
              className="w-full appearance-none py-2 pl-3 pr-8 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              {DURATIONS.map((d) => (
                <option key={`dur-${d.value}`} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 bg-white rounded-xl border border-border overflow-hidden self-start sticky top-[80px] max-h-[calc(100vh-100px)]">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="relative z-10 w-80 max-w-[90vw] bg-white h-full shadow-xl animate-slide-up">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}