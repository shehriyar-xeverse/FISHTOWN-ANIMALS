/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Page, AccessibilityConfig } from '../types';
import { Heart, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page, sectionId?: string) => void;
  accessConfig: AccessibilityConfig;
}

export default function Footer({ onNavigate, accessConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleFooterLink = (page: Page, sectionId?: string) => {
    onNavigate(page);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <footer 
      className={`py-16 px-6 border-t ${
        accessConfig.highContrast
          ? 'bg-black text-white border-white'
          : 'bg-slate-950 text-slate-300 border-slate-850'
      }`}
      role="contentinfo"
      aria-label="Fishtown Animal Hospital Footer"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Col: Brand credentials */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black shadow">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-sm tracking-tight text-white uppercase leading-none">
                Fishtown
              </span>
              <span className="text-4xs font-bold text-slate-450 uppercase tracking-widest leading-none mt-0.5">
                Animal Hospital
              </span>
            </div>
          </div>

          <p className="text-xxs leading-relaxed max-w-sm text-slate-400">
            Providing empathetic, advanced, and comprehensive veterinary services in the heart of Philadelphia. 
            Redesigning the neighborhood healthcare experience through modern diagnostics and stress-free care.
          </p>

          <div className="flex items-center gap-2 text-3xs text-slate-550 font-semibold pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Licensed PA Veterinary Corporation • Accredited Suite</span>
          </div>
        </div>

        {/* Mid Col: Quick Sitemap links */}
        <div className="md:col-span-3 space-y-4 select-none">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Sitemap Directory</h4>
          <div className="grid grid-cols-1 gap-2.5 text-xxs font-bold text-slate-400">
            <button
              onClick={() => handleFooterLink('home', 'hero')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              First Overview
            </button>
            <button
              onClick={() => handleFooterLink('services', 'about-services-section')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Veterinary Services
            </button>
            <button
              onClick={() => handleFooterLink('care', 'wellness-care-section')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Preventive Plans
            </button>
            <button
              onClick={() => handleFooterLink('team', 'team-section')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Meet The Guild
            </button>
            <button
              onClick={() => handleFooterLink('blog', 'advice-blog-section')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Patient Advice Log
            </button>
            <button
              onClick={() => handleFooterLink('contact', 'contact-section')}
              className="text-left hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Appointment booking
            </button>
          </div>
        </div>

        {/* Right Col: WCAG Statement compliance */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Inclusivity Commitment</h4>
          
          <div className={`p-4 rounded-2xl border ${
            accessConfig.highContrast ? 'border-white bg-slate-950' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="flex items-center gap-1.5 text-xxs font-bold text-emerald-400 mb-1.5">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>WCAG 2.1 AA Compliant</span>
            </div>
            <p className="text-3xs leading-relaxed text-slate-400">
              We proactively test our digital frameworks against the most rigorous Web Content Accessibility Guidelines. 
              Our suite supports strict keyboard shortcuts, screen readers, custom text sizing, and native SVG color-blind mode matrix filters.
            </p>
          </div>

          <div className="text-3xs text-slate-500 font-mono">
            Direct Line: <a href="tel:2155986345" className="hover:text-emerald-400 underline">(215) 598-6345</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-4xs font-semibold text-slate-550 select-none">
        <span>© {currentYear} Fishtown Animal Hospital Veterinary Corp. All Rights Reserved.</span>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-emerald-500" />
          <span>for Philadelphia pets.</span>
        </div>
      </div>
    </footer>
  );
}
