'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';
import { useAppStore } from '@/lib/store';

export default function JournalPage() {
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
          <span>05 / Perspective & Notes</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {data.journal.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-16">
          {data.journal.subtitle}
        </p>

        {data.journal.articles.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center text-metalTitanium font-mono text-sm">
            Coming Soon — Editorial publications currently in draft.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {data.journal.articles.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() =>
                  openModal({
                    title: item.title,
                    category: item.category,
                    description: item.content,
                  })
                }
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[360px] cursor-pointer group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-metalTitanium mb-6">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-heading text-xl font-medium mb-4 leading-snug group-hover:text-warmWhite transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-metalTitanium text-sm leading-relaxed mb-6">{item.snippet}</p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center gap-2 text-xs font-medium text-warmWhite">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
