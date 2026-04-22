'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import FilterSidebar from './FilterSidebar';
import KPISummaryBar from './KPISummaryBar';
import SortAndResultsBar from './SortAndResultsBar';
import InternshipList from './InternshipList';
import ErrorBanner from './ErrorBanner';
import type { FilterState } from './FilterSidebar';
import type { SortOption } from './SortAndResultsBar';
import type { Internship } from '@/lib/internshipData';

const API_URL =
  'https://script.google.com/macros/s/AKfycbyN7r86q6c6HB575kJqDlDyw7kSMjfSz4pKzcBoxd0kSH2o5v-fykDmICq_z4vJBA-9hQ/exec';

// Normalize raw API record to Internship shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeInternship(raw: any, index: number): Internship {
  // Handle locations array from API
  const locationsArr: string[] = Array.isArray(raw.locations)
    ? raw.locations
    : Array.isArray(raw.location)
    ? raw.location
    : typeof raw.location === 'string'
    ? [raw.location]
    : typeof raw.Location === 'string'
    ? [raw.Location]
    : ['Remote'];

  const primaryLocation = locationsArr[0] ?? 'Remote';

  // Handle stipend from API (min_monthly_stipend / max_monthly_stipend)
  const minStipend: number | null =
    raw.min_monthly_stipend != null ? Number(raw.min_monthly_stipend) : null;
  const maxStipend: number | null =
    raw.max_monthly_stipend != null ? Number(raw.max_monthly_stipend) : null;

  let stipendDisplay = 'Unpaid';
  if (minStipend != null && maxStipend != null) {
    if (minStipend === maxStipend) {
      stipendDisplay = `₹${minStipend.toLocaleString('en-IN')}/mo`;
    } else {
      stipendDisplay = `₹${minStipend.toLocaleString('en-IN')} – ₹${maxStipend.toLocaleString('en-IN')}/mo`;
    }
  } else if (minStipend != null) {
    stipendDisplay = `₹${minStipend.toLocaleString('en-IN')}/mo`;
  } else if (maxStipend != null) {
    stipendDisplay = `₹${maxStipend.toLocaleString('en-IN')}/mo`;
  } else if (raw.stipend ?? raw.Stipend ?? raw.salary ?? raw.Salary) {
    stipendDisplay = raw.stipend ?? raw.Stipend ?? raw.salary ?? raw.Salary;
  }

  // Handle required_skills array from API
  const skills: string[] = Array.isArray(raw.required_skills)
    ? raw.required_skills
    : Array.isArray(raw.skills)
    ? raw.skills
    : typeof raw.skills === 'string' ? raw.skills.split(',').map((s: string) => s.trim())
    : typeof raw.Skills === 'string' ? raw.Skills.split(',').map((s: string) => s.trim())
    : [];

  return {
    id: raw.id ?? raw.ID ?? `intern-${index + 1}`,
    title: raw.title ?? raw.Title ?? raw.role ?? raw.Role ?? 'Internship',
    company: raw.company ?? raw.Company ?? raw.organization ?? raw.Organization ?? '',
    companyLogo: raw.companyLogo ?? raw.logo ?? raw.Logo ?? '',
    companyLogoAlt: raw.companyLogoAlt ?? `${raw.company ?? raw.Company ?? ''} logo`,
    location: primaryLocation,
    locations: locationsArr,
    category: raw.category ?? raw.Category ?? 'tech',
    type: raw.type ?? raw.Type ?? raw.workType ?? raw.work_type ?? 'full-time',
    duration: raw.duration ?? raw.Duration ?? '',
    stipend: stipendDisplay,
    minStipend,
    maxStipend,
    postedDate: raw.postedDate ?? raw.posted_date ?? raw.PostedDate ?? raw.date_posted ?? new Date().toISOString().split('T')[0],
    deadline: raw.deadline ?? raw.Deadline ?? raw.applyBy ?? raw.apply_by ?? raw.apply_by ?? '',
    description: raw.description ?? raw.Description ?? raw.about ?? raw.About ?? '',
    skills,
    applyUrl: raw.applyUrl ?? raw.apply_url ?? raw.applyLink ?? raw.link ?? raw.Link ?? raw.job_description_url ?? '#',
    status: raw.status ?? raw.Status ?? 'open',
    isNew: raw.isNew ?? raw.is_new ?? false,
    openings: Number(raw.openings ?? raw.Openings ?? raw.vacancies ?? 1),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchInternships(): Promise<Internship[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();

  const raw: unknown[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json?.internships)
    ? json.internships
    : Array.isArray(json?.result)
    ? json.result
    : [];

  return raw.map(normalizeInternship);
}

function parseStipenddValue(stipend: string): number {
  const match = stipend.replace(/[^0-9]/g, '');
  return parseInt(match, 10) || 0;
}

function sortInternships(internships: Internship[], sortBy: SortOption): Internship[] {
  const copy = [...internships];
  switch (sortBy) {
    case 'newest':
      return copy.sort(
        (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    case 'deadline':
      return copy.sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    case 'stipend-high':
      return copy.sort(
        (a, b) => parseStipenddValue(b.stipend) - parseStipenddValue(a.stipend)
      );
    case 'stipend-low':
      return copy.sort(
        (a, b) => parseStipenddValue(a.stipend) - parseStipenddValue(b.stipend)
      );
    default:
      return copy;
  }
}

function filterInternships(internships: Internship[], filters: FilterState): Internship[] {
  return internships.filter((i) => {
    // Keyword search
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const matches =
        i.title.toLowerCase().includes(kw) ||
        i.company.toLowerCase().includes(kw) ||
        i.description.toLowerCase().includes(kw) ||
        i.skills.some((s) => s.toLowerCase().includes(kw));
      if (!matches) return false;
    }

    // Location filter — match against locations array
    if (filters.location !== 'All Locations') {
      const locs = i.locations ?? [i.location];
      const matched = locs.some(
        (l) => l.toLowerCase() === filters.location.toLowerCase()
      );
      if (!matched) return false;
    }

    // Stipend range filter
    if (filters.stipendMin !== null || filters.stipendMax !== null) {
      // If internship has no stipend data, treat as 0
      const iMin = i.minStipend ?? 0;
      const iMax = i.maxStipend ?? iMin;

      if (filters.stipendMin !== null && iMax < filters.stipendMin) return false;
      if (filters.stipendMax !== null && iMin > filters.stipendMax) return false;
    }

    // Skills filter — internship must have ALL selected skills
    if (filters.skills.length > 0) {
      const internSkills = i.skills.map((s) => s.toLowerCase());
      const allMatch = filters.skills.every((fs) =>
        internSkills.includes(fs.toLowerCase())
      );
      if (!allMatch) return false;
    }

    // Category filter
    if (filters.category !== 'all') {
      if (i.category !== filters.category) return false;
    }

    // Type filter
    if (filters.type !== 'all') {
      if (i.type !== filters.type) return false;
    }

    // Duration filter
    if (filters.duration !== 'all') {
      const weeks = parseInt(i.duration.replace(/[^0-9]/g, ''), 10);
      const maxWeeks = parseInt(filters.duration, 10);
      if (filters.duration === '16') {
        if (weeks < 16) return false;
      } else {
        if (weeks > maxWeeks) return false;
      }
    }

    return true;
  });
}

export const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  location: 'All Locations',
  stipendMin: null,
  stipendMax: null,
  skills: [],
  category: 'all',
  type: 'all',
  duration: 'all',
};

export default function ListingsPageClient() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allInternships, setAllInternships] = useState<Internship[]>([]);

  const loadInternships = useCallback(async (showToast = false) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await fetchInternships();
      setAllInternships(data);
      if (showToast) toast.success('Listings refreshed successfully');
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInternships();
  }, [loadInternships]);

  const handleRetry = useCallback(() => {
    loadInternships(true);
  }, [loadInternships]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    toast.info('All filters cleared');
  }, []);

  // Derive unique locations and skills from API data
  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    allInternships.forEach((i) => {
      const locs = i.locations ?? [i.location];
      locs.forEach((l) => set.add(l));
    });
    return ['All Locations', ...Array.from(set).sort()];
  }, [allInternships]);

  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    allInternships.forEach((i) => {
      i.skills.forEach((s) => { if (s) set.add(s); });
    });
    return Array.from(set).sort();
  }, [allInternships]);

  const filteredAndSorted = useMemo(() => {
    const filtered = filterInternships(allInternships, filters);
    return sortInternships(filtered, sortBy);
  }, [allInternships, filters, sortBy]);

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      <div className="flex gap-6 xl:gap-8 items-start">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={filteredAndSorted.length}
          isMobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
          availableLocations={availableLocations}
          availableSkills={availableSkills}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-5">
          {/* KPI Summary */}
          <KPISummaryBar
            internships={allInternships}
            filteredCount={filteredAndSorted.length}
          />

          {/* Error state */}
          {hasError && (
            <ErrorBanner
              message="Failed to load internship listings from the API. Check your connection and try again."
              onRetry={handleRetry}
            />
          )}

          {/* Sort + results count bar */}
          {!hasError && (
            <SortAndResultsBar
              totalResults={filteredAndSorted.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
            />
          )}

          {/* Listings grid */}
          {!hasError && (
            <InternshipList
              internships={filteredAndSorted}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
            />
          )}
        </main>
      </div>
    </>
  );
}