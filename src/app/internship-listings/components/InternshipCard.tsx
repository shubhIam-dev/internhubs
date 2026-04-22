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
      className={`group bg-white rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col ${
        isUrgent
          ? 'border-red-200 hover:border-red-300'
          : isExpired
          ? 'border-gray-200 opacity-70' :'border-border hover:border-primary/30'
      }`}
    >
      <div className="p-5 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Company logo */}
            <div className="w-11 h-11 rounded-lg border border-border bg-gray-50 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <AppImage
                src={internship.companyLogo}
                alt={internship.companyLogoAlt}
                width={44}
                height={44}
                className="w-full h-full object-contain p-1"
                fallbackSrc="/assets/images/no_image.png"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">
                {internship.company}
              </p>
              <p className="text-xs text-muted-foreground truncate font-mono">
                #{internship.id}
              </p>
            </div>
          </div>

          {/* Badges — top right */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {internship.isNew && !isExpired && (
              <Badge variant="new">
                <span className="w-1 h-1 rounded-full bg-green-500" />
                New
              </Badge>
            )}
            {isUrgent && (
              <Badge variant="urgent">
                <AlertCircle size={10} />
                {daysLeft}d left
              </Badge>
            )}
            {isExpired && <Badge variant="closed">Closed</Badge>}
            {internship.status === 'open' && !isUrgent && !isExpired && (
              <Badge variant="open">Open</Badge>
            )}
          </div>
        </div>

        {/* Role title */}
        <h3 className="text-[15px] font-semibold text-foreground mb-2.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-150">
          {internship.title}
        </h3>

        {/* Category + Type badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant={internship.category as any}>
            {categoryLabelMap[internship.category]}
          </Badge>
          <Badge variant={internship.type as any}>
            {typeLabelMap[internship.type]}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {internship.description}
        </p>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={12} className="text-muted-foreground/70 flex-shrink-0" />
            <span className="truncate">{internship.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock size={12} className="text-muted-foreground/70 flex-shrink-0" />
            <span className="truncate">{internship.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <DollarSign size={12} className="text-green-600 flex-shrink-0" />
            <span className="truncate font-medium text-green-700">{internship.stipend}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Users size={12} className="text-muted-foreground/70 flex-shrink-0" />
            <span className="truncate">
              {internship.openings} opening{internship.openings !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {internship.skills.slice(0, 4).map((skill) => (
            <span
              key={`skill-${internship.id}-${skill}`}
              className="px-2 py-0.5 rounded-md bg-muted text-[11px] text-muted-foreground font-medium"
            >
              {skill}
            </span>
          ))}
          {internship.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] text-muted-foreground font-medium">
              +{internship.skills.length - 4}
            </span>
          )}
        </div>

        {/* Deadline */}
        <div className={`flex items-center gap-1.5 text-xs mb-4 ${
          isUrgent ? 'text-red-600 font-medium' : 'text-muted-foreground'
        }`}>
          <Calendar size={12} className="flex-shrink-0" />
          <span>
            {isExpired
              ? 'Deadline passed'
              : isUrgent
              ? `Deadline: ${formatDate(internship.deadline)} — ${daysLeft} days left!`
              : `Apply by ${formatDate(internship.deadline)}`}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-4 flex items-center justify-between gap-3 pt-3 border-t border-border/60">
        <div className="text-[11px] text-muted-foreground">
          Posted {formatDate(internship.postedDate)}
        </div>
        <div className="flex items-center gap-2">
          {/* Save button */}
          <button
            onClick={() => setSaved((s) => !s)}
            title={saved ? 'Remove from saved' : 'Save internship'}
            className={`p-1.5 rounded-lg border transition-all duration-150 active:scale-95 ${
              saved
                ? 'bg-primary/10 border-primary/30 text-primary' :'bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save this internship'}
          >
            {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          </button>

          {/* Apply button */}
          <a
            href={internship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 ${
              isExpired
                ? 'bg-muted text-muted-foreground cursor-not-allowed pointer-events-none'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md'
            }`}
            onClick={(e) => isExpired && e.preventDefault()}
            aria-disabled={isExpired}
          >
            {isExpired ? 'Closed' : 'Apply Now'}
            {!isExpired && <ExternalLink size={11} />}
          </a>
        </div>
      </div>
    </article>
  );
}