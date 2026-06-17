/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Page, Service, AccessibilityConfig } from '../types';
import { servicesData } from '../data/veterinaryData';
import { HeartPulse, Sparkles, Activity, Search, Radio, ArrowLeft, Calendar, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface ServiceDetailPageProps {
  pageId: Page;
  accessConfig: AccessibilityConfig;
  onNavigate: (page: Page) => void;
  onBookAppointment: (serviceName: string) => void;
}

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Sparkles,
  Activity,
  Search,
  Radio,
};

// Map active page to the corresponding array item in servicesData
const getServiceByPageId = (pageId: Page): Service | undefined => {
  switch (pageId) {
    case 'service-wellness-checkups':
      return servicesData.find((s) => s.id === 'preventive-care');
    case 'service-advanced-dentistry':
      return servicesData.find((s) => s.id === 'advanced-dentistry');
    case 'service-surgical-suite':
      return servicesData.find((s) => s.id === 'general-surgery');
    case 'service-internal-diagnostics':
      return servicesData.find((s) => s.id === 'diagnostics-lab');
    case 'service-therapeutic-laser':
      return servicesData.find((s) => s.id === 'laser-therapy');
    default:
      return undefined;
  }
};

export default function ServiceDetailPage({ pageId, accessConfig, onNavigate, onBookAppointment }: ServiceDetailPageProps) {
  const service = getServiceByPageId(pageId);

  if (!service) {
    return (
      <div className="py-24 px-6 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold">Service Not Found</h2>
        <button onClick={() => onNavigate('services')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl">
          Back to Services
        </button>
      </div>
    );
  }

  const IconComponent = IconMap[service.icon] || HeartPulse;

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
          onClick={() => onNavigate('services')}
          className={`group flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
            accessConfig.highContrast
              ? 'text-white hover:underline'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
          aria-label="Back to primary veterinary services selection"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all services
        </button>
      </div>

      {/* Main Structural Layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Detailed documentation */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest py-1.5 px-3.5 rounded-full ${
              accessConfig.highContrast
                ? 'bg-black text-white border border-white'
                : 'bg-emerald-50 text-emerald-700'
            }`}>
              <IconComponent className="w-3.5 h-3.5" />
              Specialist {service.category} Division
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {service.title}
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          <div className={`p-6 rounded-2xl border ${
            accessConfig.highContrast
              ? 'border-2 border-white bg-black'
              : 'bg-white border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.02)]'
          }`}>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Clinical Procedure & Specifications</h2>
            <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-sm">
              {service.fullDescription}
            </p>
          </div>

          {/* Benefits matrix details */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Primary Health Benefits
            </h3>
            <div className={`p-5 rounded-2xl border ${
              accessConfig.highContrast
                ? 'border-white bg-black'
                : 'bg-emerald-500/5 border-emerald-500/10'
            }`}>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-semibold">
                {service.benefit}
              </p>
            </div>
          </div>

          {/* Simulated Live Medical Diagnostics Staging */}
          <div className={`p-6 rounded-2xl border ${
            accessConfig.highContrast
              ? 'border-white bg-black'
              : 'bg-slate-50 border-slate-200/50'
          }`}>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Diagnostic & Imaging Suite Benchmarks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Accuracy Staging</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-450 block mt-1">99.8%</span>
                <span className="text-[9px] text-slate-500 mt-0.5 block">IDEXX Standard</span>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Turnaround Time</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-450 block mt-1">&lt; 15 Mins</span>
                <span className="text-[9px] text-slate-500 mt-0.5 block">Immediate profiles</span>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Sedation Required</span>
                <span className="text-base font-black text-amber-600 block mt-1">Case-by-case</span>
                <span className="text-[9px] text-slate-500 mt-0.5 block">Stress-Free priority</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Media aspect, preparation guide, booking cta */}
        <div className="lg:col-span-5 space-y-8">
          {/* Zoom on hover clinical visual */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-150/40 relative group aspect-video lg:aspect-square">
            <img
              src={service.imageUrl}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
          </div>

          {/* Clinical Preparation Guide */}
          {service.prepInstructions && (
            <div className={`p-6 rounded-2xl border ${
              accessConfig.highContrast
                ? 'border-white bg-black'
                : 'bg-amber-500/5 border-amber-500/10'
            }`}>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5" />
                Preparation Instructions
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {service.prepInstructions}
              </p>
            </div>
          )}

          {/* Direct Staging CTA form trigger */}
          <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-6 ${
            accessConfig.highContrast
              ? 'border-2 border-white bg-black text-white'
              : 'bg-white border-slate-100 shadow-[0_12px_45px_rgba(0,0,0,0.03)]'
          }`}>
            <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-sans font-black text-xl text-slate-900 dark:text-white">
                Schedule Specialist Consultation
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                Select this veterinary service to speak with Dr. Marc DiSebastian or Dr. Shinn regarding target treatment milestones.
              </p>
            </div>

            <button
              onClick={() => onBookAppointment(service.title)}
              className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide shadow-md active:scale-97 cursor-pointer transition-all ${
                accessConfig.highContrast
                  ? 'bg-white text-black font-extrabold hover:bg-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10 hover:shadow-lg'
              }`}
            >
              Request {service.title} Exam
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
