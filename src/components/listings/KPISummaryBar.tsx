import React from 'react';
import { Briefcase, Sparkles, Building2, Wifi } from 'lucide-react';
import type { Internship } from '@/lib/internshipData';
import Icon from '@/components/ui/AppIcon';


interface KPISummaryBarProps {
  internships: Internship[];
  filteredCount: number;
}

export default function KPISummaryBar({ internships, filteredCount }: KPISummaryBarProps) {
  const totalListings = internships.length;
  const newThisWeek = internships.filter((i) => i.isNew).length;
  const companiesHiring = new Set(internships.map((i) => i.company)).size;
  const wfhCount = internships.filter(
    (i) => {
      const loc = i.location.toLowerCase();
      return loc === 'remote' || loc === 'work from home';
    }
  ).length;

  const cards = [
    {
      id: 'kpi-total',
      label: 'Total Listings',
      value: totalListings,
      sub: `${filteredCount} matching filters`,
      icon: Briefcase,
      color: 'text-newton-blue-500',
      bg: 'bg-newton-blue-50',
      border: 'border-newton-blue-100',
    },
    {
      id: 'kpi-new',
      label: 'New This Week',
      value: newThisWeek,
      sub: 'Posted in last 7 days',
      icon: Sparkles,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
    {
      id: 'kpi-companies',
      label: 'Companies Hiring',
      value: companiesHiring,
      sub: 'Unique employers',
      icon: Building2,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
    {
      id: 'kpi-wfh',
      label: 'Work From Home',
      value: wfhCount,
      sub: 'Work from anywhere',
      icon: Wifi,
      color: 'text-newton-orange-500',
      bg: 'bg-newton-orange-50',
      border: 'border-newton-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-xl border ${card.border} p-4 xl:p-5 flex items-start gap-3 hover:shadow-sm transition-shadow duration-200`}
          >
            <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={17} className={card.color} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-500 tracking-wide text-muted-foreground uppercase mb-0.5 truncate">
                {card.label}
              </p>
              <p className={`text-2xl font-bold tabular-nums ${card.color} leading-none mb-1`}>
                {card.value}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">{card.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}