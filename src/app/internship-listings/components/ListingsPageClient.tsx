'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import FilterSidebar from './FilterSidebar';
import SortAndResultsBar from './SortAndResultsBar';
import InternshipList from './InternshipList';
import ErrorBanner from './ErrorBanner';
import type { FilterState } from './FilterSidebar';
import type { SortOption } from './SortAndResultsBar';
import type { Internship } from '@/lib/internshipData';

const API_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMVunf6UvGqCvarKNYA-uz2tsqo_W2-OKM93wNZBNS7zSzmMRI_wnQyPsoA7uUMMAMbM-UcJZbBhPCzEQZBJnJCv82VS53okuXvp-peAuPqpq1G3CbTBUKVBNape5JpQAsB9qZ8r4b5NHTMGNFb7HAroTMO8VCUbFvC_-aiUoFx6wi8UM4Vy2JITffpvCrzVJFNzaNSc1UEetSlfeODGx3sZHErC7yfsCXdknc0S5XhtH_mbOMZ5Mg8-sa0KlOHZUMpNkdhiNlU-Se_5yD84JPFBsDXt0g&lib=MxqwR3xljJVaCsDPPAiS9cMD_ru-QQO2K';

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
          : ['Work From Home'];

  const primaryLocation = locationsArr[0] ?? 'Work From Home';

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

function parseDeadlineDate(deadline: string): Date | null {
  if (!deadline) return null;
  const trimmed = deadline.trim();
  if (!trimmed) return null;

  const direct = new Date(trimmed);
  if (!isNaN(direct.getTime())) return direct;

  const m = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3,})['’]?\s*(\d{2,4})/);
  if (!m) return null;

  const day = Number.parseInt(m[1], 10);
  const monKey = m[2].slice(0, 3).toLowerCase();
  const yearRaw = Number.parseInt(m[3], 10);
  const year = yearRaw < 100 ? yearRaw + 2000 : yearRaw;

  const monthMap: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };
  const month = monthMap[monKey];
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) return null;

  return new Date(year, month, day);
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
    default:
      return copy;
  }
}

function filterInternships(internships: Internship[], filters: FilterState): Internship[] {
  return internships.filter((i) => {
    const deadlineDate = parseDeadlineDate(i.deadline);
    if (deadlineDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const deadlineDay = new Date(deadlineDate);
      deadlineDay.setHours(0, 0, 0, 0);
      if (deadlineDay < today) return false;
    }

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
      const matched = locs.some((l) => {
        const itemLoc = l.toLowerCase();
        const filterLoc = filters.location.toLowerCase();

        // If filtering for "Work From Home", also match "Remote"
        if (filterLoc === 'work from home') {
          return itemLoc === 'work from home' || itemLoc === 'remote';
        }

        return itemLoc === filterLoc;
      });
      if (!matched) return false;
    }

    // Skills filter — internship must have ANY of the selected skills (Union)
    if (filters.skills.length > 0) {
      const internSkills = i.skills.map((s) => s.toLowerCase());
      const hasAnySkill = filters.skills.some((fs) =>
        internSkills.includes(fs.toLowerCase())
      );
      if (!hasAnySkill) return false;
    }

    // Duration filter
    if (filters.duration !== 'all') {
      const durationStr = i.duration.toLowerCase();
      let months = 0;

      if (durationStr.includes('month')) {
        months = parseInt(durationStr.replace(/[^0-9]/g, ''), 10);
      } else if (durationStr.includes('week')) {
        const weeks = parseInt(durationStr.replace(/[^0-9]/g, ''), 10);
        months = Math.round(weeks / 4);
      }

      const filterMonths = parseInt(filters.duration, 10);
      if (filters.duration === '6') {
        if (months < 6) return false;
      } else {
        if (months !== filterMonths) return false;
      }
    }

    // Category filter
    if (filters.category !== 'all') {
      if (i.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    }

    // Type filter
    if (filters.type !== 'all') {
      if (i.type.toLowerCase() !== filters.type.toLowerCase()) return false;
    }

    // Stipend filter
    if (filters.stipendMin !== null) {
      const min = i.minStipend ?? parseStipenddValue(i.stipend);
      if (min < filters.stipendMin) return false;
    }

    // Title Category filter — match title keywords (Development, AI, Backend, etc.)
    if (filters.titleCategory) {
      const titleLower = i.title.toLowerCase();
      const categoryLower = filters.titleCategory.toLowerCase();
      if (!titleLower.includes(categoryLower)) return false;
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
  titleCategory: '',
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
      locs.forEach((l) => {
        const normalized = l.toLowerCase() === 'remote' ? 'Work From Home' : l;
        set.add(normalized);
      });
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
