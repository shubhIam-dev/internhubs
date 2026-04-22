import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-muted flex-shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        </div>
        <div className="h-6 w-14 bg-muted rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-muted rounded mb-3" />
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-muted rounded-full" />
        <div className="h-5 w-20 bg-muted rounded-full" />
        <div className="h-5 w-14 bg-muted rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-3 w-28 bg-muted rounded" />
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-3 w-28 bg-muted rounded" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-8 w-24 bg-muted rounded-lg" />
      </div>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3, 4]?.map((i) => (
        <div key={`filter-skel-${i}`}>
          <div className="h-4 w-24 bg-muted rounded mb-3" />
          <div className="space-y-2">
            {[1, 2, 3]?.map((j) => (
              <div key={`filter-skel-item-${i}-${j}`} className="h-8 w-full bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4]?.map((i) => (
        <div key={`kpi-skel-${i}`} className="bg-white rounded-xl border border-border p-4">
          <div className="h-3 w-24 bg-muted rounded mb-3" />
          <div className="h-8 w-16 bg-muted rounded mb-2" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}