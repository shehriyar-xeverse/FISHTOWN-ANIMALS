/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Page, AccessibilityConfig } from '../types';
import { wellnessPlans } from '../data/veterinaryData';
import { ShieldCheck, ArrowLeft, Calendar, Stethoscope, BadgePercent, CheckCircle2, Bone, Sparkles, Smile } from 'lucide-react';

interface CarePlanDetailPageProps {
  pageId: Page;
  accessConfig: AccessibilityConfig;
  onNavigate: (page: Page) => void;
  onBookAppointment: (planTitle: string) => void;
}

const getPlanByPageId = (pageId: Page) => {
  switch (pageId) {
    case 'care-pediatric':
      return wellnessPlans.find((p) => p.id === 'puppy-kitten');
    case 'care-adult':
      return wellnessPlans.find((p) => p.id === 'adult-maintenance');
    case 'care-senior':
      return wellnessPlans.find((p) => p.id === 'senior-care');
    default:
      return undefined;
  }
};

export default function CarePlanDetailPage({ pageId, accessConfig, onNavigate, onBookAppointment }: CarePlanDetailPageProps) {
  const plan = getPlanByPageId(pageId);

  if (!plan) {
    return (
      <div className="py-24 px-6 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold">Care Plan Not Found</h2>
        <button onClick={() => onNavigate('care')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl">
          Back to Care Plans
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`min-h-screen py-10 px-6 max-w-7xl mx-auto ${
        accessConfig.highContrast ? 'bg-black text-white' : 'bg-[#F8FAFC]'
      }`}
    >
      {/* Back button & header navigation row */}
      <div className="mb-8 select-none">
        <button
          onClick={() => onNavigate('care')}
          className={`group flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
            accessConfig.highContrast
              ? 'text-white hover:underline'
              : 'text-slate-500 hover:text-emerald-350'
          }`}
          aria-label="Back to primary care plan selections"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to care plans
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column - Primary definitions & inclusions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-1.5 px-3.5 rounded-full ${
              accessConfig.highContrast
                ? 'bg-black text-white border border-white'
                : 'bg-emerald-50 text-emerald-700'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Annual Staged Preventive Medical Plan
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {plan.title}
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Bulleted clinical inclusions list */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            accessConfig.highContrast
              ? 'border-2 border-white bg-black'
              : 'bg-white border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.02)]'
          }`}>
            <h2 className="text-md font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
              Included procedures & vaccinations
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-750 dark:text-slate-350 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Staggered benefits values */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Target Preventative Outcomes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.keyBenefits.map((benefit, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border text-xs leading-relaxed font-semibold ${
                  accessConfig.highContrast
                    ? 'border-white bg-black'
                    : 'bg-slate-50 border-slate-200/50 text-slate-700 dark:text-slate-300'
                }`}>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Pricing metric & sign up widget */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Price display metric structure */}
          <div className={`p-6 sm:p-8 rounded-3xl border text-center relative ${
            accessConfig.highContrast
              ? 'border-2 border-white bg-black text-white'
              : 'bg-gradient-to-br from-emerald-600 to-sky-700 text-white shadow-xl shadow-emerald-500/10'
          }`}>
            <span className="text-[10px] uppercase tracking-widest font-black text-emerald-300 block mb-2">
              Staged Maintenance Staging Price
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black">{plan.priceMonthly}</span>
              <span className="text-sm font-semibold">/ month</span>
            </div>
            
            <p className="text-xxs text-emerald-100 dark:text-slate-400 mt-4 leading-relaxed max-w-xs mx-auto font-medium">
              Spreads essential preventative clinical services into manageable local monthly installments. 
              Saves up to $240+ over direct clinical fees.
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-around text-center text-white/90">
              <div>
                <span className="text-xs font-black block">{plan.scheduleFreq}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-75">Screenings frequency</span>
              </div>
            </div>
          </div>

          {/* Staging registration form card */}
          <div className={`p-6 rounded-2xl border text-center space-y-5 ${
            accessConfig.highContrast
              ? 'border-white bg-black'
              : 'bg-white border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.02)]'
          }`}>
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <Bone className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Continuous Clinical Enrollment</p>
              <p className="text-xxs text-slate-450 dark:text-slate-400 max-w-xs mx-auto">
                No setup fees or cancelation penalties. Inquire with our staff on your next visit or complete direct registration staging below.
              </p>
            </div>

            <button
              onClick={() => onBookAppointment(plan.title)}
              className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide shadow-md active:scale-97 cursor-pointer transition-all ${
                accessConfig.highContrast
                  ? 'bg-white text-black font-extrabold hover:bg-slate-205'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
              }`}
            >
              Enroll in {plan.title}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
