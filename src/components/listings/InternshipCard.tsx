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
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-1 leading-tight group-hover:text-blue-600 transition-colors">
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
            <span className="text-sm font-bold text-blue-600">{formatDate(internship.deadline)}</span>
          </div>
        </div>
      </div>

      {/* Footer Section: Posted Date and Skills */}
      <div className="mt-auto pt-6 border-t border-gray-50 flex items-end justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Posted</span>
            <span className="text-xs font-bold text-gray-600">{getTimeAgo(internship.postedDate)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 1).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <a
          href={internship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </article>
  );
}
