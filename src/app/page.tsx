'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';

export default function HomePage() {
  const { data, fetchCms } = useCmsStore();

  useEffect(() => {
    fetchCms();
  }, [fetchCms]);

  return (
    <div className="min-h-screen flex flex-col justify-end px-8 pb-24 pt-36 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest uppercase text-metalTitanium mb-8">
          <span>{data.hero.tag}</span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 bg-gradient-to-b from-white to-metalAluminium bg-clip-text text-transparent">
          {data.hero.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed mb-10 max-w-xl">
          {data.hero.subtitle}
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/about"
            className="px-8 py-4 rounded-full bg-warmWhite text-matte font-medium text-sm hover:bg-[#E2E2DF] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-white/5"
          >
            {data.hero.primaryCta}
          </Link>
          <Link
            href="/companies"
            className="px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] text-warmWhite text-sm font-medium hover:bg-white/10 transition-all transform hover:-translate-y-0.5 backdrop-blur-md"
          >
            {data.hero.secondaryCta}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
