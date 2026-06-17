/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Sparkles, Activity, Search, Radio, ChevronRight, X, Calendar, ClipboardCheck, Info } from 'lucide-react';
import { Service, AccessibilityConfig } from '../types';
import { servicesData } from '../data/veterinaryData';
import CardTilt from './CardTilt';

interface AboutServicesSectionProps {
  accessConfig: AccessibilityConfig;
  onBookAppointment: (serviceName: string) => void;
}

// Map string representation to solid Lucide components
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Sparkles,
  Activity,
  Search,
  Radio,
};

export default function AboutServicesSection({ accessConfig, onBookAppointment }: AboutServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'preventive' | 'clinical' | 'diagnostics' | 'therapy'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filter logic
  const filteredServices = servicesData.filter((srv) => {
    if (activeCategory === 'all') return true;
    return srv.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Operations' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'clinical', label: 'Clinical & Surgeries' },
    { id: 'diagnostics', label: 'Diagnostics & Labs' },
    { id: 'therapy', label: 'Advanced Therapies' },
  ] as const;

  return (
    <section 
      id="about-services-section" 
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="services-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className={`text-xs font-semibold tracking-widest uppercase py-1 px-3.5 rounded-full ${
          accessConfig.highContrast 
            ? 'bg-black text-white border border-white' 
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
        }`}>
          Medical Excellence
        </span>
        <h2 
          id="services-title" 
          className={`font-sans font-extrabold tracking-tight mt-4 transition-all ${
            accessConfig.highContrast ? 'text-white text-5xl font-black' : 'text-slate-900 dark:text-white text-4xl sm:text-5xl'
          }`}
          style={{ fontSize: `${1.15 * accessConfig.fontSizeMultiplier}em` }}
        >
          Specialized Veterinary Services
        </h2>
        <p className={`mt-4 text-base ${accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
          Redefining neighborhood clinical companion care in Philadelphia through modern medical technology, 
          continuous cardiac diagnostics, and therapeutic pain management strategies.
        </p>
      </div>

      {/* Categories Filter Pills */}
      <div 
        className="flex flex-wrap justify-center gap-2 mb-12"
        role="tablist"
        aria-label="Filter veterinary service categories"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="services-grid"
              id={`tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2 rounded-full font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                isActive
                  ? accessConfig.highContrast
                    ? 'bg-white text-black font-extrabold ring-2 ring-white'
                    : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/15'
                  : accessConfig.highContrast
                  ? 'bg-transparent text-white border border-slate-700 hover:border-white'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Services Grid (Parallax-Tilt active) */}
      <motion.div 
        id="services-grid"
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="tabpanel"
        aria-labelledby={`tab-${activeCategory}`}
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((srv) => {
            const IconComponent = IconMap[srv.icon] || HeartPulse;
            return (
              <motion.div
                key={srv.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <CardTilt className="h-full">
                  <div
                    onClick={() => setSelectedService(srv)}
                    className={`h-full group flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 border h-fit relative overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 ${
                      accessConfig.highContrast
                        ? 'bg-slate-950 text-white border-2 border-white'
                        : 'bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-slate-100 dark:border-slate-800/60 hover:border-emerald-500/30'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Service: ${srv.title}. Click to view clinical details, instructions, and diagnostics.`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedService(srv);
                      }
                    }}
                  >
                    {/* Background glass shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Image Preview with depth */}
                      <div className="h-44 w-full rounded-xl overflow-hidden mb-5 relative group-hover:scale-[1.02] transition-transform duration-500">
                        <img
                          src={srv.imageUrl}
                          alt={srv.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 brightness-[0.98] group-hover:brightness-100 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 text-2xs font-semibold rounded-full bg-slate-900/80 text-emerald-400 backdrop-blur-md uppercase tracking-wider">
                          {srv.category}
                        </div>
                      </div>

                      {/* Header with Icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl transition-colors ${
                          accessConfig.highContrast
                            ? 'bg-white text-black'
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-sans font-bold text-lg leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {srv.title}
                        </h3>
                      </div>

                      <p className={`text-sm leading-relaxed mb-4 ${
                        accessConfig.highContrast ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {srv.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                      <span>Clinical Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal Detail Overlay (Apple-style immersive scale) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            key="services-modal-backdrop-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-service-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl ${
                accessConfig.highContrast
                  ? 'bg-black text-white border-4 border-white'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800'
              }`}
            >
              {/* Image banner */}
              <div className="h-56 relative w-full overflow-hidden">
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.85]"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all border border-white/10"
                  aria-label="Close modal dialog"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 font-semibold rounded-full bg-emerald-600 text-white text-xs tracking-wider uppercase">
                    {selectedService.category} Description
                  </span>
                </div>
              </div>

              {/* Contained Body */}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-start justify-between">
                  <h3 
                    id="modal-service-title" 
                    className="font-sans font-black text-2xl sm:text-3xl leading-tight"
                  >
                    {selectedService.title}
                  </h3>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${
                  accessConfig.highContrast ? 'text-slate-200' : 'text-slate-650 dark:text-slate-350'
                }`}>
                  {selectedService.fullDescription}
                </p>

                {/* Patient Outcome Box */}
                <div className={`p-4 rounded-xl border flex gap-3.5 ${
                  accessConfig.highContrast
                    ? 'border-white bg-slate-950'
                    : 'bg-emerald-500/5 border-emerald-500/15 dark:bg-emerald-950/20'
                }`}>
                  <ClipboardCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Primary Clinical Outcome
                    </h4>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                      accessConfig.highContrast ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {selectedService.benefit}
                    </p>
                  </div>
                </div>

                {/* Prep Guidelines (Conditionally Rendered) */}
                {selectedService.prepInstructions && (
                  <div className={`p-4 rounded-xl border flex gap-3.5 ${
                    accessConfig.highContrast
                      ? 'border-yellow-400 bg-slate-950'
                      : 'bg-amber-500/5 border-amber-500/15 dark:bg-amber-950/10'
                  }`}>
                    <Info className={`w-5 h-5 shrink-0 mt-0.5 ${accessConfig.highContrast ? 'text-yellow-400' : 'text-amber-500'}`} />
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${accessConfig.highContrast ? 'text-yellow-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        Patient Preparation & Fasting Guidelines
                      </h4>
                      <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                        accessConfig.highContrast ? 'text-slate-300' : 'text-slate-705 dark:text-slate-305'
                      }`}>
                        {selectedService.prepInstructions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Call to Actions */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      onBookAppointment(selectedService.title);
                      setSelectedService(null);
                    }}
                    className={`flex-1 py-3 px-5 rounded-full font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      accessConfig.highContrast
                        ? 'bg-white text-black hover:bg-slate-100 ring-2 ring-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg hover:shadow-emerald-600/10'
                    }`}
                    aria-label={`Request clinical appointment for ${selectedService.title}`}
                  >
                    <Calendar className="w-4 h-4" />
                    Request Appointment
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className={`py-3 px-6 rounded-full font-bold text-sm transition-all text-center cursor-pointer ${
                      accessConfig.highContrast
                        ? 'text-white border border-white hover:bg-slate-800'
                        : 'bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
                    }`}
                    aria-label="Return to general services"
                  >
                    Close Overview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
