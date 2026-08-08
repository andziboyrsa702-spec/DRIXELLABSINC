'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';
import { useAppStore } from '@/lib/store';

export default function CareersPage() {
  const { data, fetchCms } = useCmsStore();
  const { openModal } = useAppStore();

  useEffect(() => {
    fetchCms();
  }, [fetchCms]);

  return (
    <div className="min-h-screen px-8 pt-36 pb-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-metalTitanium mb-4 flex items-center gap-3">
          <span className="w-4 h-[1px] bg-metalTitanium" />
          <span>06 / Talent & Opportunities</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {data.careers.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-12">
          {data.careers.subtitle}
        </p>

        <div className="glass-panel p-12 md:p-16 rounded-3xl border border-white/10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-2xl text-warmWhite font-light leading-relaxed italic">
              "{data.careers.notice}"
            </p>
            <p className="text-metalTitanium text-sm leading-relaxed">
              We maintain an uncompromising bar for engineering, design, and strategic excellence. When new roles are established in South Africa or remotely, we share them directly with our talent network.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <button
              onClick={() =>
                openModal({
                  title: 'Future Opportunities Alert',
                  description: 'Register your email to receive direct notifications when engineering, design, or leadership positions become available at Drixel Labs Inc.',
                  scope: 'Notification protocol: Direct email dispatch upon position opening.',
                })
              }
              className="px-8 py-4 rounded-full border border-white/20 bg-white/[0.04] text-warmWhite font-medium text-sm hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Register Future Interest
            </button>
            <span className="text-xs font-mono text-metalTitanium">
              Direct notification on position release
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
