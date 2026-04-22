import React from 'react';

type BadgeVariant =
  | 'tech' |'finance' |'design' |'marketing' |'operations' |'data' |'legal' |'hr' |'remote' |'full-time' |'part-time' |'hybrid' |'new' |'urgent' |'closed' |'open' |'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  tech: 'bg-blue-50 text-blue-700 border-blue-200',
  finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  design: 'bg-purple-50 text-purple-700 border-purple-200',
  marketing: 'bg-orange-50 text-orange-700 border-orange-200',
  operations: 'bg-slate-50 text-slate-700 border-slate-200',
  data: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  legal: 'bg-amber-50 text-amber-700 border-amber-200',
  hr: 'bg-pink-50 text-pink-700 border-pink-200',
  remote: 'bg-violet-50 text-violet-700 border-violet-200',
  'full-time': 'bg-blue-50 text-blue-700 border-blue-200',
  'part-time': 'bg-teal-50 text-teal-700 border-teal-200',
  hybrid: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  new: 'bg-green-50 text-green-700 border-green-200',
  urgent: 'bg-red-50 text-red-700 border-red-200',
  closed: 'bg-gray-100 text-gray-500 border-gray-200',
  open: 'bg-green-50 text-green-700 border-green-200',
  default: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function Badge({
  variant = 'default',
  children,
  className = '',
  size = 'sm',
}: BadgeProps) {
  const sizeStyles =
    size === 'sm' ?'px-2 py-0.5 text-[11px] font-semibold' :'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${sizeStyles} tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}