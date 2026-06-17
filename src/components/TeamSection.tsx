/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, Award, Heart, Sparkle } from 'lucide-react';
import { TeamMember, AccessibilityConfig } from '../types';
import { teamData } from '../data/veterinaryData';
import CardTilt from './CardTilt';

interface TeamSectionProps {
  accessConfig: AccessibilityConfig;
}

export default function TeamSection({ accessConfig }: TeamSectionProps) {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  // Flatten and extract all unique specialties to use as interactive filter tags
  const allSpecialties = Array.from(
    new Set(teamData.flatMap((tm) => tm.specialties))
  );

  return (
    <section 
      id="team-section" 
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="team-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className={`text-xs font-semibold tracking-widest uppercase py-1 px-3.5 rounded-full ${
          accessConfig.highContrast
            ? 'bg-black text-white border border-white'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
        }`}>
          Clinical Experts
        </span>
        <h2 
          id="team-title" 
          className={`font-sans font-extrabold tracking-tight mt-4 transition-all ${
            accessConfig.highContrast ? 'text-white text-5xl font-black' : 'text-slate-900 dark:text-white text-4xl sm:text-5xl'
          }`}
          style={{ fontSize: `${1.1 * accessConfig.fontSizeMultiplier}em` }}
        >
          Board-Certified Veterinarians & staff
        </h2>
        <p className={`mt-4 text-base ${accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
          Our team unites extensive diagnostics training, advanced animal dentistry, 
          and compassionate low-stress care methods right here on Girard Ave.
        </p>
      </div>

      {/* Specialty Highlights Row */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 max-w-4xl mx-auto">
        <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest mr-2">Highlight:</span>
        <button
          onClick={() => setSelectedSpec(null)}
          className={`text-2xs font-bold px-3 py-1.5 rounded-full border transition-all ${
            selectedSpec === null
              ? accessConfig.highContrast
                ? 'bg-white text-black border-white font-extrabold'
                : 'bg-emerald-600 border-emerald-600 text-white'
              : accessConfig.highContrast
              ? 'border-slate-700 hover:border-white text-white bg-transparent'
              : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
          }`}
          aria-label="View all staff members"
        >
          All Profiles
        </button>
        {allSpecialties.map((spec) => {
          const isSelected = selectedSpec === spec;
          return (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`text-2xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                isSelected
                  ? accessConfig.highContrast
                    ? 'bg-white text-black border-white font-extrabold'
                    : 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                  : accessConfig.highContrast
                  ? 'border-slate-700 hover:border-white text-white bg-transparent'
                  : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400'
              }`}
              aria-label={`Highlight staff specializing in ${spec}`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Staff Grid with 3D Card Hover Tilts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData.map((member) => {
          const hasSelectedSpec = selectedSpec ? member.specialties.includes(selectedSpec) : true;
          return (
            <motion.div
              key={member.id}
              animate={{
                opacity: hasSelectedSpec ? 1 : 0.45,
                scale: hasSelectedSpec ? 1 : 0.98,
              }}
              className="h-full"
              transition={{ duration: 0.35 }}
            >
              <CardTilt className="h-full">
                <div className={`h-full flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group select-none ${
                  accessConfig.highContrast
                    ? 'bg-slate-950 text-white border-2 border-white'
                    : 'bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950 border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/20'
                }`}>
                  <div>
                    {/* Visual Frame */}
                    <div className="h-64 w-full rounded-xl overflow-hidden mb-5 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 brightness-[0.96] group-hover:brightness-100 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/65 text-emerald-400 backdrop-blur-md border border-white/5">
                        <Award className="w-5 h-5 shrink-0" />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div>
                      <span className="text-2xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block mb-1">
                        {member.credentials}
                      </span>
                      <h3 className="font-sans font-black text-xl tracking-tight leading-tight mb-2">
                        {member.name}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 block mb-3.5">
                        {member.role}
                      </span>

                      {/* Bio text */}
                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 text-justify ${
                        accessConfig.highContrast ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {member.bio}
                      </p>

                      {/* Education line */}
                      <div className="flex gap-2 mb-4">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className={`text-2xs font-medium leading-relaxed ${
                          accessConfig.highContrast ? 'text-slate-300' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {member.education}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties Pills & Fun Fact foot */}
                  <div className="pt-4 border-t border-slate-50 dark:border-slate-800/60 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className={`text-3xs font-semibold py-1 px-2 rounded-md ${
                            selectedSpec === spec
                              ? 'bg-emerald-500 text-white'
                              : accessConfig.highContrast
                              ? 'bg-slate-900 border border-white text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Fun endearing fact */}
                    <div className={`p-3 rounded-xl flex gap-2 ${
                      accessConfig.highContrast ? 'bg-slate-900 border border-white' : 'bg-rose-500/5 dark:bg-emerald-500/2'
                    }`}>
                      <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                      <div className="text-2xs">
                        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-0.5">Companion Fun Fact</span>
                        <span className={`italic leading-normal ${
                          accessConfig.highContrast ? 'text-slate-200' : 'text-slate-650 dark:text-slate-300'
                        }`}>
                          "{member.funFact}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardTilt>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
