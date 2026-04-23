'use client';

import React from 'react';
import { Search, MapPin, Briefcase, Clock, Calendar } from 'lucide-react';
import { DURATIONS } from '@/lib/internshipData';
import type { InternshipCategory, InternshipType } from '@/lib/internshipData';

export type PostedFilter = 'all' | '24h' | '7d' | '30d';

export interface FilterState {
  keyword: string;
  location: string;
  stipendMin: number | null;
  stipendMax: number | null;
  skills: string[];
  category: InternshipCategory | 'all';
  type: InternshipType | 'all';
  duration: string;
  posted: PostedFilter;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  availableLocations: string[];
  availableSkills: string[];
}

const POSTED_OPTIONS: { label: string; value: PostedFilter }[] = [
  { label: 'ALL TIME', value: 'all' },
  { label: 'LAST 24H', value: '24h' },
  { label: 'LAST 7 DAYS', value: '7d' },
  { label: 'LAST 30 DAYS', value: '30d' },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableLocations,
  availableSkills,
}: FilterSidebarProps) {
  const toggleSkill = (skill: string) => {
    const current = filters.skills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    onFilterChange({ ...filters, skills: updated });
  };

  const toggleLocation = (loc: string) => {
    if (filters.location === loc) {
      onFilterChange({ ...filters, location: 'All Locations' });
    } else {
      onFilterChange({ ...filters, location: loc });
    }
  };

  const topLocations = availableLocations
    .filter(l => l !== 'All Locations' && l.toLowerCase() !== 'remote')
    .slice(0, 5);

  const topSkills = availableSkills.slice(0, 6);

  return (
    <div className="w-full bg-white rounded-[40px] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-10 mb-16">
      <div className="flex items-center justify-between mb-12">
        <div className="relative flex-1">
          <div className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-300">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search by role, company or keywords..."
            value={filters.keyword}
            onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
            className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 rounded-3xl text-gray-600 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all text-xl shadow-sm"
          />
        </div>
        {(filters.keyword || filters.location !== 'All Locations' || filters.skills.length > 0 || filters.duration !== 'all' || filters.posted !== 'all') && (
          <button
            onClick={() => onFilterChange({
              keyword: '',
              location: 'All Locations',
              stipendMin: null,
              stipendMax: null,
              skills: [],
              category: 'all',
              type: 'all',
              duration: 'all',
              posted: 'all',
            })}
            className="ml-6 px-8 py-6 text-sm font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div className="flex items-start gap-8">
          <div className="flex items-center gap-2 w-32 pt-2 shrink-0">
            <MapPin size={16} className="text-blue-400" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">Location</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleLocation('Remote')}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all border ${filters.location === 'Remote'
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                }`}
            >
              REMOTE
            </button>
            {topLocations.map((loc) => (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all border ${filters.location === loc
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Expertise Filter */}
        <div className="flex items-start gap-8">
          <div className="flex items-center gap-2 w-32 pt-2 shrink-0">
            <Briefcase size={16} className="text-emerald-400" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">Expertise</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {topSkills.map((skill) => {
              const isSelected = filters.skills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {skill.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex items-start gap-8">
          <div className="flex items-center gap-2 w-32 pt-2 shrink-0">
            <Clock size={16} className="text-purple-400" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">Duration</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {DURATIONS.map((d) => {
              const isSelected = filters.duration === d.value;
              return (
                <button
                  key={d.value}
                  onClick={() => onFilterChange({ ...filters, duration: d.value })}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {d.label.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Posted Filter */}
        <div className="flex items-start gap-8">
          <div className="flex items-center gap-2 w-32 pt-2 shrink-0">
            <Calendar size={16} className="text-orange-400" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">Posted</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {POSTED_OPTIONS.map((opt) => {
              const isSelected = filters.posted === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onFilterChange({ ...filters, posted: opt.value })}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
