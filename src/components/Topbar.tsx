import React from 'react';
import Link from 'next/link';

export default function Topbar() {
  const navLinks = [
    { label: 'SELF APPLY', href: '#', isHighlight: true },
    { label: 'QUESTIONS', href: '#' },
    { label: 'FLASHCARDS', href: '#' },
    { label: 'ASSIGNMENTS', href: '#' },
    { label: 'EXPERIENCES', href: '#' },
    { label: 'Resources', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-gray-900">
            Intern<span className="text-newton-blue-500">Hub</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-black tracking-[0.18em] text-gray-400 uppercase">
            Powered by NST • SVYASA
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[11px] font-black tracking-[0.15em] transition-all duration-200 hover:text-newton-blue-500 ${link.isHighlight
                ? 'px-5 py-2.5 rounded-full bg-newton-blue-50 text-newton-blue-500 hover:bg-newton-blue-100'
                : 'text-gray-400'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-4">
          <button className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-newton-blue-500 text-white text-[10px] sm:text-[11px] font-black tracking-[0.15em] hover:bg-newton-blue-600 transition-all shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] active:scale-95">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
}
