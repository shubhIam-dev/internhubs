'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-newton-blue-500 hover:border-newton-blue-100 hover:bg-newton-blue-50/50 disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 disabled:hover:bg-transparent transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="w-12 h-12 flex items-center justify-center text-gray-300 font-bold">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-12 h-12 rounded-2xl border text-sm font-black transition-all ${
                  currentPage === page
                    ? 'bg-newton-blue-500 border-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                    : 'bg-white border-gray-100 text-gray-400 hover:border-newton-blue-100 hover:text-newton-blue-500'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-newton-blue-500 hover:border-newton-blue-100 hover:bg-newton-blue-50/50 disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 disabled:hover:bg-transparent transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
