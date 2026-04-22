import React from 'react';
import Topbar from '@/components/Topbar';
import ListingsPageClient from './components/ListingsPageClient';
import { Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export default function InternshipListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-10 xl:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={18} className="text-blue-200" />
                <span className="text-blue-200 text-sm font-medium">
                  Spring 2026 Internship Season
                </span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-bold tracking-tight mb-2">
                Find Your Next Internship
              </h1>
              <p className="text-blue-100 text-base xl:text-lg max-w-xl">
                Browse curated opportunities across tech, finance, design, and more. Updated daily — no account needed to apply.
              </p>
            </div>

            {/* Hero stats */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="text-3xl font-bold tabular-nums">12</p>
                <p className="text-blue-200 text-xs font-medium mt-0.5">Open Roles</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold tabular-nums">11</p>
                <p className="text-blue-200 text-xs font-medium mt-0.5">Companies</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-300" />
                <div>
                  <p className="text-sm font-semibold text-green-300">4 new</p>
                  <p className="text-blue-200 text-xs">this week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick category chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { label: '💻 Technology', count: 3 },
              { label: '💰 Finance', count: 2 },
              { label: '🎨 Design', count: 2 },
              { label: '📊 Data & Analytics', count: 2 },
              { label: '📣 Marketing', count: 1 },
              { label: '⚙️ Operations', count: 1 },
              { label: '⚖️ Legal', count: 1 },
            ]?.map((chip) => (
              <span
                key={`hero-chip-${chip?.label}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium border border-white/20 cursor-default transition-colors"
              >
                {chip?.label}
                <span className="bg-white/20 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums">
                  {chip?.count}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 xl:py-8">
        <ListingsPageClient />
      </div>
      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={14} />
            <span>
              InternHub — Internship Discovery Portal · Spring 2026
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Listings sourced from public postings. Apply directly on company career pages.
          </p>
        </div>
      </footer>
    </div>
  );
}