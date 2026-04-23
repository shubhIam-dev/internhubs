import React from 'react';
import Link from 'next/link';

export default function Topbar() {
  const navLinks = [
    { label: 'QUESTIONS', href: '#' },
    { label: 'FLASHCARDS', href: '#' },
    { label: 'ASSIGNMENTS', href: '#' },
    { label: 'EXPERIENCES', href: '#' },
    { label: 'SELF APPLY', href: '#', isHighlight: true },
    { label: 'INSIDERS', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            Intern<span className="text-red-500">Hub</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[11px] font-black tracking-[0.15em] transition-all duration-200 hover:text-red-500 ${link.isHighlight
                  ? 'px-5 py-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100'
                  : 'text-gray-400'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-4">
          <button className="px-8 py-3 rounded-full bg-[#FF4D4D] text-white text-[11px] font-black tracking-[0.15em] hover:bg-[#FF3333] transition-all shadow-[0_8px_20px_-6px_rgba(255,77,77,0.4)] active:scale-95">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
}