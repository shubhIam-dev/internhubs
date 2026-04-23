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
  titleCategory: string;
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
    filters.duration !== 'all' ||
    filters.titleCategory !== '';

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
      titleCategory: '',
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
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-6">
        {/* Keyword search */}
        <div>
          <div className="relative group">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors pointer-events-none"
            />
            <input
              id="keyword-search"
              type="text"
              placeholder="Search roles…"
              value={filters.keyword}
              onChange={(e) =>
                onFilterChange({ ...filters, keyword: e.target.value })
              }
              className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-border/50 bg-muted/30 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all placeholder:text-muted-foreground/40"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location-select"
            className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2 px-1"
          >
            Location
          </label>
          <div className="relative group">
            <select
              id="location-select"
              value={filters.location}
              onChange={(e) =>
                onFilterChange({ ...filters, location: e.target.value })
              }
              className="w-full appearance-none py-2.5 pl-3 pr-8 text-sm rounded-xl border border-border/50 bg-muted/30 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all cursor-pointer"
            >
              {availableLocations.map((loc) => (
                <option key={`loc-${loc}`} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none group-hover:text-primary transition-colors"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2 px-1">
            Top Skills
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ ...filters, skills: [] })}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${filters.skills.length === 0
                ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[0.98]'
                : 'bg-white text-muted-foreground border-border/50 hover:border-primary/20 hover:text-primary hover:bg-primary/5'
                }`}
            >
              All
            </button>
            {availableSkills.slice(0, 12).map((skill) => {
              const isSelected = filters.skills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[0.98]'
                    : 'bg-white text-muted-foreground border-border/50 hover:border-primary/20 hover:text-primary hover:bg-primary/5'
                    }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title Category Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2 px-1">
            Job Titles
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ ...filters, titleCategory: '' })}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${filters.titleCategory === ''
                ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[0.98]'
                : 'bg-white text-muted-foreground border-border/50 hover:border-primary/20 hover:text-primary hover:bg-primary/5'
                }`}
            >
              All
            </button>
            {['Development', 'AI', 'Backend', 'Frontend', 'Web', 'Full Stack', 'Software', 'MERN'].map((title) => (
              <button
                key={title}
                onClick={() => onFilterChange({ ...filters, titleCategory: title })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${filters.titleCategory === title
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[0.98]'
                  : 'bg-white text-muted-foreground border-border/50 hover:border-primary/20 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration-select"
            className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2 px-1"
          >
            Duration
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => {
              const isSelected = filters.duration === d.value;
              return (
                <button
                  key={d.value}
                  onClick={() => onFilterChange({ ...filters, duration: d.value })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${isSelected
                    ? 'bg-primary/5 text-primary border-primary/30 ring-2 ring-primary/5'
                    : 'bg-white text-muted-foreground border-border/50 hover:border-primary/20 hover:text-primary'
                    }`}
                >
                  {d.label}
                </button>
              );
            })}
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