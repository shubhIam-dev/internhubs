'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Badge from '@/components/ui/Badge';
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  ExternalLink,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import type { Internship } from '@/lib/internshipData';

interface InternshipCardProps {
  internship: Internship;
}

function getDaysUntilDeadline(deadline: string): number {
  const today = new Date('2026-04-22');
  const deadlineDate = new Date(deadline);
  const diff = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const categoryLabelMap: Record<string, string> = {
  tech: 'Technology',
  finance: 'Finance',
  design: 'Design',
  marketing: 'Marketing',
  operations: 'Operations',
  data: 'Data & Analytics',
  legal: 'Legal',
  hr: 'Human Resources',
};

const typeLabelMap: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  remote: 'Remote',
  hybrid: 'Hybrid',
};

export default function InternshipCard({ internship }: InternshipCardProps) {
  const [saved, setSaved] = useState(false);
  const daysLeft = getDaysUntilDeadline(internship.deadline);
  const isUrgent = daysLeft <= 10 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  return (
    <article
      className={`group bg-white rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${isUrgent
          ? 'border-red-200 hover:border-red-300'
          : isExpired
            ? 'border-gray-200 opacity-70' : 'border-border hover:border-primary/30'
        }`}
    >
      <div className="p-5 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Company logo */}
            <div className="w-12 h-12 rounded-xl border border-border/40 bg-gray-50/50 overflow-hidden flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <AppImage
                src={internship.companyLogo}
                alt={internship.companyLogoAlt}
                width={48}
                height={48}
                className="w-full h-full object-contain p-1.5"
                fallbackSrc="/assets/images/no_image.png"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate leading-tight tracking-tight">
                {internship.company}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={10} className="text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground/60 font-medium truncate">
                  {internship.location}
                </span>
              </div>
            </div>
          </div>

          {/* Badges — top right */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {internship.isNew && !isExpired && (
              <Badge variant="new" className="h-5 px-1.5 text-[9px] uppercase tracking-wider font-bold">
                New
              </Badge>
            )}
            {isExpired && <Badge variant="closed" className="h-5 px-1.5 text-[9px] uppercase tracking-wider font-bold">Closed</Badge>}
          </div>
        </div>

        {/* Role title */}
        <h3 className="text-base font-bold text-foreground mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {internship.title}
        </h3>

        {/* Meta info grid - Minimal */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Clock size={12} className="text-blue-500" />
            </div>
            <span className="text-xs font-semibold text-gray-700">{internship.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <DollarSign size={12} className="text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-700">{internship.stipend}</span>
          </div>
        </div>

        {/* Skills - Pill style */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {internship.skills.slice(0, 3).map((skill) => (
            <span
              key={`skill-${internship.id}-${skill}`}
              className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] text-gray-600 font-bold uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
          {internship.skills.length > 3 && (
            <span className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              +{internship.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer CTA - Minimalist */}
      <div className="px-5 py-4 flex items-center justify-between gap-3 bg-gray-50/30 rounded-b-xl border-t border-border/30">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none mb-1">
            {isExpired ? 'Closed' : isUrgent ? 'Closing soon' : 'Deadline'}
          </span>
          <span className={`text-[11px] font-bold ${isUrgent ? 'text-red-500' : 'text-gray-600'}`}>
            {isExpired ? formatDate(internship.deadline) : isUrgent ? `${daysLeft}d left` : formatDate(internship.deadline)}
          </span>
        </div>

        <a
          href={internship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${isExpired
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/10'
            }`}
        >
          {isExpired ? 'Expired' : 'Apply Now'}
          {!isExpired && <ExternalLink size={12} className="opacity-80" />}
        </a>
      </div>
    </article>
  );
}