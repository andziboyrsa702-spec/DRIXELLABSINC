import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-8 bg-matte text-metalTitanium text-xs font-mono relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          &copy; {new Date().getFullYear()} Drixel Labs Inc. All rights reserved. Design. Build. Elevate.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-warmWhite transition-colors">About</Link>
          <Link href="/ventures" className="hover:text-warmWhite transition-colors">Ventures</Link>
          <Link href="/contact" className="hover:text-warmWhite transition-colors">Contact</Link>
          <span className="flex items-center gap-2 text-warmWhite">
            <span className="w-1.5 h-1.5 rounded-full bg-warmWhite" />
            South Africa &bull; Global Operations
          </span>
        </div>
      </div>
    </footer>
  );
};
