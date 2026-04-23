'use client';

import React from 'react';
import { MapPin, Clock, IndianRupee, Calendar, ExternalLink } from 'lucide-react';
import type { Internship } from '@/lib/internshipData';

interface InternshipCardProps {
  internship: Internship;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear().toString().slice(-2);
  return `${month}'${year}`;
}

function getTimeAgo(dateStr: string): string {
  if (!dateStr) return 'Recently';
  const posted = new Date(dateStr);
  const now = new Date('2026-04-23'); // Using today's date from env
  const diffMs = now.getTime() - posted.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const companyInitial = internship.company ? internship.company.charAt(0).toUpperCase() : '?';

  return (
    <article className="bg-white rounded-[32px] border border-gray-100 p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 group flex flex-col h-full">
      {/* Top Section: Company Logo/Initial and Name */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-xl font-black text-gray-900 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
            {companyInitial}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase">
                {internship.company}
              </span>
              {internship.isNew && (
                <span className="px-2 py-0.5 rounded-md bg-newton-blue-50 text-newton-blue-500 text-[9px] font-black uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-1 leading-tight group-hover:text-newton-blue-500 transition-colors">
              {internship.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Grid Section: Details */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Location</span>
            <span className="text-sm font-bold text-gray-700">{internship.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <IndianRupee size={16} className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Stipend</span>
            <span className="text-sm font-bold text-gray-700">{internship.stipend}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Duration</span>
            <span className="text-sm font-bold text-gray-700">{internship.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <Calendar size={16} className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Apply By</span>
            <span className="text-sm font-bold text-newton-blue-500">{formatDate(internship.deadline)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Time and CTA */}
      <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">{getTimeAgo(internship.postedDate)}</span>
        </div>
        <a
          href={internship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-newton-blue-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-newton-blue-600 transition-all shadow-lg shadow-newton-blue-100 group/btn"
        >
          Apply Now
          <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
