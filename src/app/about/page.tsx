'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '@/lib/cms-store';

export default function AboutPage() {
  const { data, fetchCms } = useCmsStore();

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
          <span>01 / Company Narrative & Leadership</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8 max-w-4xl">
          {data.about.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-3xl mb-16">
          {data.about.subtitle}
        </p>

        {/* Founding Leadership */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 mb-16">
          <h3 className="font-heading text-xs font-mono uppercase tracking-widest text-metalTitanium mb-6">
            Founding Leadership
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-heading text-2xl font-semibold text-warmWhite mb-1">Anelisa Thelejene</div>
              <div className="font-mono text-xs text-metalTitanium uppercase tracking-wider mb-3">Co-Founder</div>
              <p className="text-metalTitanium text-sm leading-relaxed">
                Co-leading strategic vision, product design architecture, and long-term venture developments at Drixel Labs Inc.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-heading text-2xl font-semibold text-warmWhite mb-1">Andzani Mashabane</div>
              <div className="font-mono text-xs text-metalTitanium uppercase tracking-wider mb-3">Co-Founder</div>
              <p className="text-metalTitanium text-sm leading-relaxed">
                Co-leading engineering systems, technology infrastructure, and strategic operations at Drixel Labs Inc.
              </p>
            </div>
          </div>
        </div>

        {/* Core Philosophy Paragraphs */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6 text-metalTitanium text-base leading-relaxed">
            <h3 className="font-heading text-2xl font-semibold text-warmWhite">Building Beyond Industry Boundaries</h3>
            <p>
              Drixel Labs Inc. is a South African innovation and venture company focused on the creation, development, and growth of businesses, brands, products, and technology-driven solutions. The company serves as the broader organisation through which different ventures can be developed, managed, and brought to market.
            </p>
            <p>
              Rather than limiting itself to one particular industry, Drixel Labs Inc. is designed around the idea of building opportunities across different sectors while maintaining a strong focus on innovation, entrepreneurship, design, and practical problem-solving.
            </p>
            <p>
              At its core, Drixel Labs Inc. exists to turn ideas into real businesses, products, and experiences. Our philosophy is based on moving beyond ideas and focusing on execution—taking something from an initial concept through development and ultimately toward a functioning product, service, or business.
            </p>
          </div>

          <div className="space-y-6 text-metalTitanium text-base leading-relaxed">
            <h3 className="font-heading text-2xl font-semibold text-warmWhite">Authenticity & Multi-Venture Vision</h3>
            <p>
              One of the key ventures associated with Drixel Labs Inc. is <strong className="text-warmWhite">Drixel SA</strong>, a South African clothing and streetwear brand. Drixel SA represents our approach to combining strong visual identity, product design, fashion, and entrepreneurship.
            </p>
            <p>
              A major principle of Drixel Labs Inc. is authenticity. We do not rely on exaggerated claims, fabricated achievements, or unverified information. Where a project is still being developed, it is presented honestly as in development.
            </p>
            <p>
              Whether developing a physical product, a clothing brand, a software platform, or a digital experience, design is part of how we approach product development, communication, technology, and the overall user experience.
            </p>
          </div>
        </div>

        {/* Key Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-xs text-metalTitanium uppercase mb-2">Focus</div>
            <div className="font-heading text-2xl font-semibold text-warmWhite mb-2">Execution</div>
            <p className="text-xs text-metalTitanium">Turning concepts into real products, services, and growing businesses.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-xs text-metalTitanium uppercase mb-2">Principle</div>
            <div className="font-heading text-2xl font-semibold text-warmWhite mb-2">Authenticity</div>
            <p className="text-xs text-metalTitanium">Zero exaggerated claims. Built through real products and quality work.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-xs text-metalTitanium uppercase mb-2">Venture</div>
            <div className="font-heading text-2xl font-semibold text-warmWhite mb-2">Drixel SA</div>
            <p className="text-xs text-metalTitanium">South African clothing & streetwear brand combining design and fashion.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-xs text-metalTitanium uppercase mb-2">Geography</div>
            <div className="font-heading text-2xl font-semibold text-warmWhite mb-2">South Africa</div>
            <p className="text-xs text-metalTitanium">Operating from South Africa to create ventures that scale globally.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
