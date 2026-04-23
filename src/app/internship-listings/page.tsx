import React from 'react';
import Topbar from '@/components/Topbar';
import ListingsPageClient from './components/ListingsPageClient';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function InternshipListingsPage() {
  console.log('115 104 117 98 104 97 109 108 111 118 101 115 108 97 107 115 104 105 116 97')
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      {/* Hero section - Matching the provided image */}
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 pt-20 pb-12">
          <div className="max-w-4xl relative">
            {/* Direct Application Portal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0F7FF] border border-[#E0EFFF] mb-10">
              <Sparkles size={14} className="text-[#3B82F6]" />
              <span className="text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.2em]">
                Direct Application Portal
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl xl:text-7xl font-black text-[#1A1D23] tracking-tight mb-8 leading-[1.05]">
              Apply <span className="text-[#3B82F6]">Directly</span> to<br />
              Premium Opportunities.
            </h1>

            {/* Subheading */}
            <p className="text-[#6B7280] text-xl font-medium max-w-2xl leading-relaxed">
              Skip the middleman. We've curated high-growth internships that allow<br className="hidden md:block" />
              you to apply directly on their own portals for faster responses.
            </p>

            {/* Updated Daily Badge - Bottom Right of Hero Area */}
            <div className="absolute right-0 bottom-0 hidden lg:flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
              <RotateCcw size={16} className="text-[#3B82F6]" />
              <span className="text-[#64748B] text-[13px] font-bold">Updated daily</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 xl:py-12">
        <ListingsPageClient />
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xs">IH</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-none mb-1">InternHub</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Discovery Portal · 2026</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium max-w-xs text-center sm:text-right leading-relaxed">
            Apply directly on official career pages. All listings are curated for quality.
          </p>
        </div>
      </footer>
    </div>
  );
}