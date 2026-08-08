'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    num: '01 / PURPOSE',
    title: 'Design with Purpose',
    body: 'Form must follow intent. We eliminate unnecessary ornamentation to highlight true utility and aesthetic clarity.',
  },
  {
    num: '02 / LONGEVITY',
    title: 'Build for Longevity',
    body: 'We engineer for durability over obsolescence—creating physical and digital assets crafted to last for decades.',
  },
  {
    num: '03 / CRAFTSMANSHIP',
    title: 'Craft Every Detail',
    body: 'Precision engineering happens in the microscopic details—from material tolerances to micro-interaction physics.',
  },
  {
    num: '04 / PROBLEM SOLVING',
    title: 'Solve Meaningful Problems',
    body: 'We dedicate our resources to real challenges in industrial technology, design infrastructure, and business scalability.',
  },
  {
    num: '05 / REFINEMENT',
    title: 'Continuous Improvement',
    body: 'Iteration is constant. We continually test, refine, and elevate our benchmarks to maintain world-class standards.',
  },
];

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen px-8 pt-36 pb-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-metalTitanium mb-4 flex items-center gap-3">
          <span className="w-4 h-[1px] bg-metalTitanium" />
          <span>03 / Engineering Ethos</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          Principles & Craftsmanship
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-16">
          We are guided by enduring principles that dictate how we research, engineer, and refine every product.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-charcoal/40 border border-white/10 hover:border-white/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="font-mono text-xs text-metalTitanium mb-6">{principle.num}</div>
              <h3 className="font-heading text-xl font-medium mb-3">{principle.title}</h3>
              <p className="text-metalTitanium text-sm leading-relaxed">{principle.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
