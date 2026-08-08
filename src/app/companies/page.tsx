'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';
import { useAppStore } from '@/lib/store';
import { ExternalLink } from 'lucide-react';

export default function CompaniesPage() {
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
          <span>02 / Operating Entities</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {data.companies.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-16">
          {data.companies.subtitle}
        </p>

        {data.companies.items.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center text-metalTitanium font-mono text-sm">
            Coming Soon — Company entities undergoing operational setup.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {data.companies.items.map((company, index) => (
              <motion.article
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() =>
                  openModal({
                    title: company.name,
                    status: company.status,
                    description: company.description,
                    scope: company.scope,
                    websiteUrl: company.websiteUrl || 'https://drixel.co.za',
                  })
                }
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[380px] cursor-pointer group hover:-translate-y-1.5"
              >
                <div>
                  <span
                    className={`inline-block text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
                      company.isDev
                        ? 'bg-metalTitanium/10 border border-metalTitanium/20 text-metalTitanium'
                        : 'bg-white/10 border border-white/20 text-warmWhite'
                    }`}
                  >
                    {company.status}
                  </span>

                  <h3 className="font-heading text-2xl font-semibold mb-3 group-hover:text-warmWhite transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-metalTitanium text-sm leading-relaxed mb-6">{company.description}</p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-metalTitanium">
                  <a
                    href={company.websiteUrl || 'https://drixel.co.za'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-warmWhite hover:underline font-mono"
                  >
                    Visit Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="w-8 h-8 rounded-full border border-white/10 grid place-items-center text-warmWhite group-hover:bg-warmWhite group-hover:text-matte group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
