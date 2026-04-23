import React from 'react';
import Topbar from '@/components/Topbar';
import ListingsPageClient from '@/components/listings/ListingsPageClient';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function RootPage() {
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
            <div className="absolute right-0 bottom-12 hidden lg:flex items-center gap-3 px-6 py-4 rounded-[24px] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <RotateCcw size={18} className="text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">Status</span>
                <span className="text-sm font-bold text-gray-600">Updated daily</span>
              </div>
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
