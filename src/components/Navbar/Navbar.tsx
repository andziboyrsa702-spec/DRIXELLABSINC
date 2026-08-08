'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Volume2, VolumeX } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Companies', href: '/companies' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Journal', href: '/journal' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { audioPlaying, toggleAudio } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-8 py-6 transition-all duration-500 flex items-center justify-between ${
        scrolled ? 'bg-matte/85 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent'
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 text-warmWhite font-bold tracking-wider uppercase group">
        <div className="w-7 h-7 border-2 border-warmWhite grid place-items-center relative transition-transform duration-500 group-hover:rotate-45">
          <div className="w-2 h-2 bg-warmWhite" />
        </div>
        <span className="font-heading text-lg">Drixel Labs</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 glass-panel px-6 py-2.5 rounded-full border border-white/10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-xs tracking-wider uppercase font-medium transition-colors duration-300 ${
                isActive ? 'text-warmWhite' : 'text-metalTitanium hover:text-warmWhite'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-warmWhite transition-all duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Audio Action Button */}
      <button
        onClick={toggleAudio}
        className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-metalTitanium hover:text-warmWhite border border-white/10 transition-colors"
      >
        {audioPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-warmWhite animate-pulse" />
            <span className="text-warmWhite">Ambient On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span>Audio Muted</span>
          </>
        )}
      </button>
    </header>
  );
};
