'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DetailModal: React.FC = () => {
  const { modalOpen, modalData, closeModal } = useAppStore();

  return (
    <AnimatePresence>
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-matte/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-charcoal border border-white/15 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-10 relative text-warmWhite shadow-2xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warmWhite hover:bg-white/15 hover:rotate-90 transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {modalData.status && (
              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-metalTitanium border border-white/10 px-3 py-1 rounded-full">
                  Status: {modalData.status}
                </span>
              </div>
            )}

            <h3 className="font-heading text-3xl font-semibold mb-4">{modalData.title}</h3>
            <p className="text-metalTitanium text-lg leading-relaxed mb-6">{modalData.description}</p>

            {modalData.scope && (
              <div className="border-t border-white/10 pt-6 mt-6">
                <h4 className="font-heading text-sm uppercase tracking-wider text-metalTitanium mb-2">
                  Focus & Capabilities
                </h4>
                <p className="text-warmWhite text-sm leading-relaxed mb-6">{modalData.scope}</p>
              </div>
            )}

            {modalData.websiteUrl && (
              <div className="border-t border-white/10 pt-6">
                <a
                  href={modalData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-warmWhite text-matte font-medium text-sm hover:bg-[#E2E2DF] transition-all"
                >
                  Visit Official Website <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
