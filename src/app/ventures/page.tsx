'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';
import { useAppStore } from '@/lib/store';

export default function VenturesPage() {
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
          <span>04 / Products & Projects</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {data.ventures.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-16">
          {data.ventures.subtitle}
        </p>

        {data.ventures.items.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center text-metalTitanium font-mono text-sm">
            Coming Soon — Active product showcases will be published upon release.
          </div>
        ) : (
          <div className="space-y-4">
            {data.ventures.items.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() =>
                  openModal({
                    title: project.name,
                    category: project.category,
                    status: project.status,
                    description: project.description,
                  })
                }
                className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 grid md:grid-cols-4 items-center gap-4 cursor-pointer group hover:translate-x-2"
              >
                <div className="md:col-span-2">
                  <h3 className="font-heading text-xl font-medium group-hover:text-warmWhite transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-metalTitanium text-xs mt-1">{project.tagline}</p>
                </div>

                <div className="text-xs font-mono text-metalTitanium">{project.category}</div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                      project.status.toLowerCase().includes('dev')
                        ? 'border border-metalTitanium/30 text-metalTitanium'
                        : 'border border-white/20 text-warmWhite'
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-metalTitanium group-hover:text-warmWhite group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
