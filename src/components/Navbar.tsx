/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, HeartPulse, Sparkles, Activity, Search, Radio, Bone, ShieldCheck, Sparkle } from 'lucide-react';
import { Page, AccessibilityConfig } from '../types';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  accessConfig: AccessibilityConfig;
}

export default function Navbar({ activePage, onNavigate, accessConfig }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'care' | null>(null);

  const handleNavLinkClick = (page: Page, sectionId?: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    // If sectionId is specified, scroll into view smoothly, otherwise scroll to top
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', sectionId: 'hero', hasDropdown: undefined },
    { id: 'services', label: 'Services', sectionId: 'about-services-section', hasDropdown: 'services' },
    { id: 'care', label: 'Care Plans', sectionId: 'wellness-care-section', hasDropdown: 'care' },
    { id: 'team', label: 'Our Team', sectionId: 'team-section', hasDropdown: undefined },
    { id: 'blog', label: 'Advice Log', sectionId: 'advice-blog-section', hasDropdown: undefined },
    { id: 'contact', label: 'Booking', sectionId: 'contact-section', hasDropdown: undefined },
  ] as const;

  // Services Dropdown Content (compact, 2-column organized)
  const servicesDropdownItems = [
    { label: 'Wellness Checkups', icon: HeartPulse, id: 'service-wellness-checkups' as const },
    { label: 'Advanced Dentistry', icon: Sparkles, id: 'service-advanced-dentistry' as const },
    { label: 'Surgical Suite', icon: Activity, id: 'service-surgical-suite' as const },
    { label: 'Internal Diagnostics', icon: Search, id: 'service-internal-diagnostics' as const },
    { label: 'Therapeutic Laser', icon: Radio, id: 'service-therapeutic-laser' as const },
  ];

  // Care Plan Dropdown Content
  const careDropdownItems = [
    { label: 'Pediatric Foundation', desc: 'Under 1 Year Old', icon: Sparkle, id: 'care-pediatric' as const },
    { label: 'Adult Maintenance', desc: 'Aged 1 to 7 Years', icon: Bone, id: 'care-adult' as const },
    { label: 'Senior Mobility', desc: 'Over 7 Years Old', icon: ShieldCheck, id: 'care-senior' as const },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-45 mx-auto max-w-7xl px-6 pointer-events-none select-none">
      <nav
        className={`w-full py-3.5 px-6 rounded-full flex items-center justify-between backdrop-blur-md transition-all border pointer-events-auto shadow-lg ${
          accessConfig.highContrast
            ? 'bg-black text-white border-2 border-white'
            : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/40 dark:border-slate-800/40'
        }`}
        aria-label="Primary Website Navigation Header"
        role="navigation"
      >
        {/* Brand Representation Logo */}
        <div 
          onClick={() => handleNavLinkClick('home', 'hero')}
          className="flex items-center gap-3 cursor-pointer focus:outline-none"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNavLinkClick('home', 'hero'); }}
          aria-label="Fishtown Animal Hospital Home Logo"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/10">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="font-sans font-bold tracking-tight text-sm sm:text-base text-slate-900 dark:text-white uppercase">
            FISHTOWN <span className="text-emerald-600 dark:text-emerald-450 font-black">ANIMAL HOSPITAL</span>
          </span>
        </div>

        {/* Desktop Interactive menu Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => {
                if (item.hasDropdown === 'services') setActiveDropdown('services');
                else if (item.hasDropdown === 'care') setActiveDropdown('care');
                else setActiveDropdown(null);
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavLinkClick(item.id, item.sectionId)}
                className={`flex items-center gap-1 text-xs font-bold transition-colors py-1.5 focus:outline-none ${
                  activePage === item.id
                    ? accessConfig.highContrast
                      ? 'text-white border-b-2 border-white'
                      : 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-slate-350 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
                aria-haspopup={item.hasDropdown ? 'true' : 'false'}
                aria-expanded={activeDropdown === item.hasDropdown}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </button>

              {/* Advanced Dropdown Organized layout */}
              <AnimatePresence>
                {activeDropdown === item.hasDropdown && item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3.5 rounded-2xl w-72 shadow-2xl border ${
                      accessConfig.highContrast
                        ? 'bg-black border-2 border-white text-white'
                        : 'bg-white/95 dark:bg-slate-950/95 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {item.hasDropdown === 'services' ? (
                      <div className="grid grid-cols-1 gap-1.5">
                        <span className="text-4xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">
                          Our clinical capabilities
                        </span>
                        {servicesDropdownItems.map((drop) => {
                          const IconComp = drop.icon;
                          return (
                            <button
                              key={drop.label}
                              onClick={() => handleNavLinkClick(drop.id)}
                              className="w-full text-left flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-55 dark:hover:bg-slate-900 transition-colors text-scroll cursor-pointer"
                            >
                              <div className="p-1 rounded-md bg-emerald-500/5 text-emerald-500">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <span className="text-2xs font-semibold text-slate-700 dark:text-slate-300">
                                {drop.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <span className="text-4xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2 px-1">
                          Age programs
                        </span>
                        {careDropdownItems.map((drop) => {
                          const IconComp = drop.icon;
                          return (
                            <button
                              key={drop.label}
                              onClick={() => handleNavLinkClick(drop.id)}
                              className="w-full text-left flex items-start gap-2.5 p-1.5 rounded-xl hover:bg-slate-55 dark:hover:bg-slate-905 transition-colors cursor-pointer"
                            >
                              <div className="p-1 rounded-md bg-emerald-500/5 text-emerald-500 mt-0.5">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-2xs font-semibold text-slate-700 dark:text-slate-300 block">
                                  {drop.label}
                                </span>
                                <span className="text-xxxxs text-slate-400 block">{drop.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right side global widgets block */}
        <div className="flex items-center gap-2.5">
          {/* Core Appointment scheduling button */}
          <button
            onClick={() => handleNavLinkClick('contact', 'contact-section')}
            className={`hidden sm:flex text-2xs font-bold py-2.5 px-5 rounded-full transition-all tracking-wide ${
              accessConfig.highContrast
                ? 'bg-white text-black hover:bg-slate-200 ring-2 ring-white font-extrabold'
                : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/10 text-white'
            }`}
            aria-label="Schedule client appointment confirmation"
          >
            Book Staging
          </button>

          {/* Hamburger Menu Trigger for Mobile Screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors focus:outline-none"
            title="Toggle mobile navbar drawer"
            aria-label="Toggle mobile responsive navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </nav>

      {/* Touch-Friendly Collapsing Drawer Overlay (Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-20 left-6 right-6 p-6 rounded-3xl shadow-2xl border overflow-hidden pointer-events-auto select-none ${
              accessConfig.highContrast
                ? 'bg-black text-white border-2 border-white'
                : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-100 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-col gap-4">
              <span className="text-4xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                Fishtown Navigation
              </span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavLinkClick(item.id, item.sectionId)}
                  className={`text-left text-sm font-bold py-1.5 rounded-xl transition-all border-b border-dashed border-slate-50 dark:border-slate-800/40 ${
                    activePage === item.id
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-slate-350 hover:text-emerald-500'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleNavLinkClick('contact', 'contact-section')}
                className={`w-full text-center py-2.5 rounded-xl text-xs font-bold mt-2 ${
                  accessConfig.highContrast
                    ? 'bg-white text-black ring-2 ring-white font-extrabold'
                    : 'bg-emerald-600 text-white'
                }`}
                aria-label="Direct booking button"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
