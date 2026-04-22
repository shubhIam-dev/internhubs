import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Briefcase, ExternalLink, Home } from 'lucide-react';
import Link from 'next/link';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 h-16 flex items-center justify-between gap-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium group"
          >
            <Home size={14} className="group-hover:text-primary transition-colors" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <AppLogo size={36} />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[18px] tracking-tight text-foreground">
                InternHub
              </span>
              <span className="text-[11px] text-muted-foreground font-medium tracking-wide hidden sm:block">
                powered by Newton School of Technology
              </span>
            </div>
          </div>
        </div>

        {/* Center nav hint */}
        <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          <Briefcase size={15} className="text-primary" />
          <span className="font-medium">
            Explore open internships — no account needed
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="https://linkedin.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 group"
          >
            <span>LinkedIn Jobs</span>
            <ExternalLink
              size={13}
              className="group-hover:text-primary transition-colors"
            />
          </a>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live Listings
          </span>
        </div>
      </div>
    </header>
  );
}