'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCmsStore } from '@/lib/cms-store';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { data, fetchCms } = useCmsStore();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchCms();
  }, [fetchCms]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen px-8 pt-36 pb-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-metalTitanium mb-4 flex items-center gap-3">
          <span className="w-4 h-[1px] bg-metalTitanium" />
          <span>07 / Connect</span>
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {data.contact.title}
        </h1>

        <p className="text-xl text-metalTitanium font-light leading-relaxed max-w-2xl mb-16">
          {data.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-12 gap-16">
          {/* Details Sidebar */}
          <div className="md:col-span-5 space-y-10">
            <div>
              <div className="text-xs font-mono text-metalTitanium uppercase tracking-widest mb-2">
                Direct Correspondence
              </div>
              <a
                href={`mailto:${data.contact.email}`}
                className="text-2xl font-light text-warmWhite hover:text-metalAluminium transition-colors"
              >
                {data.contact.email}
              </a>
            </div>

            <div>
              <div className="text-xs font-mono text-metalTitanium uppercase tracking-widest mb-2">
                Headquarters
              </div>
              <div className="text-lg text-metalTitanium font-light">{data.contact.location}</div>
            </div>

            <div>
              <div className="text-xs font-mono text-metalTitanium uppercase tracking-widest mb-4">
                Professional Networks
              </div>
              <div className="flex gap-6 text-sm text-metalTitanium">
                <a href={data.contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-warmWhite transition-colors">
                  LinkedIn
                </a>
                <a href={data.contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-warmWhite transition-colors">
                  X (Twitter)
                </a>
                <a href={data.contact.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-warmWhite transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center">
                <h3 className="font-heading text-2xl font-semibold mb-4">Message Received</h3>
                <p className="text-metalTitanium text-sm leading-relaxed">
                  Thank you for contacting Drixel Labs Inc. Our executive team will review your message and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-10 rounded-3xl border border-white/10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-metalTitanium uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Julian Vance"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-warmWhite text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-metalTitanium uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="name@company.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-warmWhite text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-metalTitanium uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    placeholder="Project Inquiry / Strategic Consultation"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-warmWhite text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1 font-mono">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-metalTitanium uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    placeholder="Detail your project requirements or inquiry..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-warmWhite text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-warmWhite text-matte font-medium text-sm hover:bg-[#E2E2DF] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
