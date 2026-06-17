/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Clock, ArrowLeft, ArrowRight, Stethoscope, BadgePercent, Bone } from 'lucide-react';
import { CarePlan, AccessibilityConfig } from '../types';
import { wellnessPlans } from '../data/veterinaryData';

interface WellnessCareSectionProps {
  accessConfig: AccessibilityConfig;
}

export default function WellnessCareSection({ accessConfig }: WellnessCareSectionProps) {
  const [activePlanIdx, setActivePlanIdx] = useState(1); // Default to Adult maintenance
  const [isMobile, setIsMobile] = useState(false);

  // Check window width for instructing swiping on mobile layout
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleNext = () => {
    setActivePlanIdx((prev) => (prev + 1) % wellnessPlans.length);
  };

  const handlePrev = () => {
    setActivePlanIdx((prev) => (prev - 1 + wellnessPlans.length) % wellnessPlans.length);
  };

  // Handle Swipe Gesture drag end
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 55;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const currentPlan = wellnessPlans[activePlanIdx];

  return (
    <section 
      id="wellness-care-section" 
      className="py-20 px-6 bg-slate-50/70 dark:bg-slate-950/30 overflow-hidden" 
      aria-labelledby="wellness-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className={`text-xs font-semibold tracking-widest uppercase py-1 px-3.5 rounded-full ${
              accessConfig.highContrast
                ? 'bg-black text-white border border-white'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
            }`}>
              Preventive Milestones
            </span>
            <h2 
              id="wellness-title" 
              className={`font-sans font-extrabold tracking-tight mt-4 transition-all ${
                accessConfig.highContrast ? 'text-white text-5xl font-black' : 'text-slate-900 dark:text-white text-4xl sm:text-5xl'
              }`}
              style={{ fontSize: `${1.1 * accessConfig.fontSizeMultiplier}em` }}
            >
              Tailored Pet Care Plans
            </h2>
            <p className={`mt-4 text-base ${accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
              Guided stages mapped by physical development milestones. Spreading clinical charges into convenient local monthly installments 
              while unlocking priority veterinary screenings.
            </p>
          </div>

          {/* Selector timeline for Tablet/Desktop */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 shrink-0 select-none">Select Stage:</span>
            <div className={`p-1.5 rounded-full flex gap-1 ${
              accessConfig.highContrast ? 'border-2 border-white' : 'bg-slate-200/50 dark:bg-slate-900/60'
            }`}>
              {wellnessPlans.map((plan, idx) => (
                <button
                  key={plan.id}
                  onClick={() => setActivePlanIdx(idx)}
                  className={`text-xs font-bold py-1.5 px-3.5 rounded-full transition-all focus:outline-none ${
                    activePlanIdx === idx
                      ? accessConfig.highContrast
                        ? 'bg-white text-black font-extrabold ring-2 ring-white'
                        : 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                  aria-label={`Switch timeline care plan to ${plan.title}`}
                >
                  {idx === 0 ? 'Foundation' : idx === 1 ? 'Maintenance' : 'Senior'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Swipe Instruct Overlay on Touch Interfaces */}
        {isMobile && (
          <div className="text-center mb-4 text-2xs text-emerald-600 dark:text-emerald-400 font-bold animate-pulse" aria-hidden="true">
            📱 Swipe Left / Right to guide between Care Stages
          </div>
        )}

        {/* Slide Stage Presentation Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlan.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-10 rounded-3xl cursor-grab active:cursor-grabbing border ${
                accessConfig.highContrast
                  ? 'bg-black text-white border-4 border-white'
                  : 'bg-white dark:bg-slate-900/80 border-slate-100 dark:border-slate-800'
              }`}
              aria-label={`Care Plan stage card for ${currentPlan.title}. Swipe or drag horizontally to change plans.`}
            >
              {/* Left Column (Core Details & Price Metric) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 select-none" style={{ transform: 'translateZ(0px)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-emerald-500">
                      {currentPlan.subtitle}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight mb-3">
                    {currentPlan.title}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${
                    accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {currentPlan.description}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border flex items-center justify-between ${
                  accessConfig.highContrast ? 'border-white bg-slate-950' : 'bg-slate-50 dark:bg-slate-950/20 dark:border-slate-800'
                }`}>
                  <div>
                    <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block">Consultation Price</span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-tight">
                      {currentPlan.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-mono"> / Month</span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest block">Scheduling</span>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-xs font-bold mt-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      {currentPlan.scheduleFreq}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Plan Outcomes</span>
                  {currentPlan.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <Bone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={accessConfig.highContrast ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Clinical Inclusions Grid) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BadgePercent className="w-4.5 h-4.5 text-emerald-500 animate-spin-slow" />
                    Inclusions & Service Benchmarks
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentPlan.inclusions.map((inc, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 3 }}
                        className={`p-3.5 rounded-xl border flex gap-3 transition-colors ${
                          accessConfig.highContrast
                            ? 'border-white bg-slate-950'
                            : 'bg-emerald-500/0 border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-500/5 dark:border-slate-800'
                        }`}
                      >
                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={`text-xs sm:text-sm font-semibold leading-snug ${
                          accessConfig.highContrast ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {inc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-2xs text-slate-400 font-mono">100% Veterinary Autonomy & Compassion</span>
                  <div className="flex gap-2.5">
                    <button
                      onClick={handlePrev}
                      className={`p-2 rounded-full border transition-all ${
                        accessConfig.highContrast
                          ? 'border-white hover:bg-slate-800'
                          : 'border-slate-200 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-700'
                      }`}
                      aria-label="View previous care stage plan"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className={`p-2 rounded-full border transition-all ${
                        accessConfig.highContrast
                          ? 'border-white hover:bg-slate-800'
                          : 'border-slate-200 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-700'
                      }`}
                      aria-label="View next care stage plan"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
