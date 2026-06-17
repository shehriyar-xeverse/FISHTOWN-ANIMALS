/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, AccessibilityConfig } from './types';
import Navbar from './components/Navbar';
import AboutServicesSection from './components/AboutServicesSection';
import WellnessCareSection from './components/WellnessCareSection';
import TeamSection from './components/TeamSection';
import AdviceBlogSection from './components/AdviceBlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ServiceDetailPage from './components/ServiceDetailPage';
import CarePlanDetailPage from './components/CarePlanDetailPage';
import { Shield, Star, Stethoscope, ChevronDown, HeartPulse, Award, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [preselectedService, setPreselectedService] = useState('');
  const [pulseHr, setPulseHr] = useState(72);

  const isServiceSubpage = activePage.startsWith('service-');
  const isCareSubpage = activePage.startsWith('care-');
  const isDetailPage = isServiceSubpage || isCareSubpage;
  
  // Real-time medical telemetry heart rate simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseHr(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 68 ? 68 : next > 82 ? 82 : next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic browser tab title updater to keep consistent branding matching Navbar
  useEffect(() => {
    const titlesMap: Record<Page, string> = {
      'home': "Fishtown Animal Hospital | Philadelphia's Premier Vet",
      'services': 'Veterinary Services | Fishtown Animal Hospital',
      'team': 'Our Medical Team | Fishtown Animal Hospital',
      'care': 'Wellness Care Plans | Fishtown Animal Hospital',
      'blog': 'Pet Care Advice & Blog | Fishtown Animal Hospital',
      'contact': 'Book an Appointment | Fishtown Animal Hospital',
      'service-wellness-checkups': 'Wellness Checkups & Immunizations | Fishtown Animal Hospital',
      'service-advanced-dentistry': 'Advanced Veterinary Dentistry | Fishtown Animal Hospital',
      'service-surgical-suite': 'General & Advanced Vet Surgery | Fishtown Animal Hospital',
      'service-internal-diagnostics': 'In-House Diagnostics & Lab | Fishtown Animal Hospital',
      'service-therapeutic-laser': 'Non-Invasive Laser Therapy | Fishtown Animal Hospital',
      'care-pediatric': 'Pediatric Wellness Staging | Fishtown Animal Hospital',
      'care-adult': 'Adult Maintenance Wellness | Fishtown Animal Hospital',
      'care-senior': 'Senior Mobility Wellness | Fishtown Animal Hospital',
    };
    
    document.title = titlesMap[activePage] || 'Fishtown Animal Hospital';
  }, [activePage]);
  
  // Accessibility and theme configuration forced to standard medical light theme
  const accessConfig: AccessibilityConfig = {
    highContrast: false,
    colorBlindMode: 'none',
    fontSizeMultiplier: 1,
  };

  // Handle direct scroll requests from general links
  const handleBookingTrigger = (serviceName: string) => {
    setPreselectedService(serviceName);
    setActivePage('contact');
    
    // Smooth scrolling alignment
    setTimeout(() => {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Build filter visual output inline or in body
  const getColorBlindFilterStyle = () => {
    if (accessConfig.colorBlindMode === 'none') return {};
    return {
      filter: `url(#${accessConfig.colorBlindMode}-filter)`,
    };
  };

  return (
    <div
      style={{
        ...getColorBlindFilterStyle(),
        fontSize: `${accessConfig.fontSizeMultiplier}rem`,
      }}
      className={`min-h-screen transition-all antialiased selection:bg-emerald-500/20 leading-relaxed font-sans ${
        accessConfig.highContrast
          ? 'bg-black text-white border-2 border-white'
          : 'bg-slate-55 text-slate-900'
      }`}
    >
      {/* SVG Color Blind Matrix Filters (WCAG standard mapping) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" width="0" height="0">
        <defs>
          {/* Protanopia (Red-Blindness) dynamic color adjustment */}
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0, 
                      0.558, 0.442, 0, 0, 0, 
                      0, 0.242, 0.758, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
          {/* Deuteranopia (Green-Blindness) dynamic color adjustment */}
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0, 
                      0.7, 0.3, 0, 0, 0, 
                      0, 0.3, 0.7, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
          {/* Tritanopia (Blue-Blindness) dynamic color adjustment */}
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0, 
                      0, 0.433, 0.567, 0, 0, 
                      0, 0.475, 0.525, 0, 0, 
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Modern Floating Header Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        accessConfig={accessConfig}
      />

      {/* Primary Structural Body */}
      <main className="pt-24 select-none">
        {/* PARALLAX HERO VIEW (Sleek Interface Split Design) */}
        {activePage === 'home' && (
          <section id="hero" className="relative h-auto lg:h-screen min-h-[650px] flex items-center justify-center overflow-hidden pt-12">
            {/* Elegant Ambient Blur Blobs (Sleek Interface signature) */}
            {!accessConfig.highContrast && (
              <>
                <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
              </>
            )}

            {/* Subtle overlay elements for physical layout */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-5" />

            {/* Main Split Hero */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between select-none py-16 lg:py-0">
              {/* Left Column Information Block */}
              <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Accepts Patients Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-full"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-black text-emerald-700 dark:text-emerald-450">Accepting New Patients</span>
                </motion.div>

                {/* Primary Sleek Title */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="font-sans font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-all"
                    style={{ fontSize: `calc(1.8rem + 2.2vw * ${accessConfig.fontSizeMultiplier})` }}
                  >
                    World-class care <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 dark:from-emerald-400 dark:to-sky-400 italic font-medium">for your family.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.8 }}
                    className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-normal"
                  >
                    Experience Philadelphia's most advanced veterinary team. Our Girard Ave suite integrates high-definition diagnostics and stress-free pet therapeutic design.
                  </motion.p>
                </div>

                {/* Direct Action triggers & Happy Client Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center lg:justify-start"
                >
                  <button
                    id="hero-book-cta"
                    onClick={() => {
                      setActivePage('contact');
                      setTimeout(() => {
                        const contactSec = document.getElementById('contact-section');
                        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${
                      accessConfig.highContrast
                        ? 'bg-white text-black ring-2 ring-white hover:bg-slate-200 font-extrabold'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-600/20 shadow-emerald-600/10 dark:shadow-slate-900/50'
                    }`}
                    aria-label="Book initial veterinary examination"
                  >
                    <Stethoscope className="w-4 h-4" />
                    Request Exam
                  </button>
                  
                  <button
                    id="hero-services-cta"
                    onClick={() => {
                      setActivePage('services');
                      setTimeout(() => {
                        const srv = document.getElementById('about-services-section');
                        if (srv) srv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-xs transition-all border ${
                      accessConfig.highContrast
                        ? 'border-white text-white bg-black hover:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                    }`}
                    aria-label="Browse services catalog"
                  >
                    Explore Capabilities
                  </button>

                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                    <div className="flex -space-x-2.5">
                      <img className="w-9 h-9 rounded-full border-2 border-slate-50 dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=120" alt="Client pet dog" referrerPolicy="no-referrer" />
                      <img className="w-9 h-9 rounded-full border-2 border-slate-50 dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=120" alt="Client pet cat" referrerPolicy="no-referrer" />
                      <img className="w-9 h-9 rounded-full border-2 border-slate-50 dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=120" alt="Client pet retriever" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-3xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">+1.2k Clients</span>
                  </div>
                </motion.div>
              </div>

              {/* 3D Card Display (Sleek Interface Right Panel) */}
              <div className="w-full lg:w-1/2 relative h-[420px] sm:h-[480px] flex items-center justify-center pt-4 lg:pt-0">
                <div className="relative w-[310px] sm:w-[350px] h-[380px] sm:h-[410px]">
                  {/* Layered behind-cards to simulate 3D rotation */}
                  <motion.div 
                    animate={{ rotate: 3, scale: 0.98 }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-[40px] shadow-sm pointer-events-none" 
                  />
                  
                  <motion.div 
                    whileHover={{ rotate: -2, y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`absolute inset-0 rounded-[40px] p-5 sm:p-6 flex flex-col border overflow-hidden shadow-2xl transition-colors ${
                      accessConfig.highContrast
                        ? 'bg-black text-white border-2 border-white'
                        : 'bg-white dark:bg-slate-900 border-slate-100/80 dark:border-slate-800'
                    }`}
                  >
                    {/* Featured Specialist Specialist visual */}
                    <div className="w-full h-3/5 bg-slate-100 dark:bg-slate-850 rounded-3xl mb-4 relative overflow-hidden group">
                      <img 
                        src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"
                        alt="Clinical director examining companion animal patient"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-xl p-2.5 border border-white/30 dark:border-white/10">
                          <p className="text-[#C6F6D5] text-[8px] font-black uppercase tracking-widest leading-none">Featured Specialist</p>
                          <p className="text-white font-bold text-xs mt-0.5 leading-none">Dr. Julian Mercer, DVM</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-450 uppercase tracking-widest">Active Diagnosis</span>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            Live Profile
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-150 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: ["70%", "85%", "75%", "85%"] }}
                            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                            className="h-full bg-emerald-500 rounded-full" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-850">
                          <p className="text-[8px] uppercase text-slate-450 dark:text-slate-500 font-extrabold tracking-wider leading-none">Heart Rate</p>
                          <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1 mt-1 leading-none">
                            <HeartPulse className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />
                            {pulseHr} <span className="text-[8px] font-semibold text-slate-400 uppercase">BPM</span>
                          </p>
                        </div>
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-850">
                          <p className="text-[8px] uppercase text-slate-450 dark:text-slate-500 font-extrabold tracking-wider leading-none">Staging</p>
                          <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-450 flex items-center gap-0.5 mt-1 leading-none">
                            <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                            Optimal
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Elegant Sleek bottom status bar (Standard / theme equivalent) */}
            <div className={`absolute bottom-0 inset-x-0 border-t py-4 hidden lg:block backdrop-blur-md pointer-events-none ${
              accessConfig.highContrast
                ? 'bg-black border-white text-white'
                : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-850/40 text-slate-800 dark:text-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto px-12 flex justify-between items-center text-xs font-semibold">
                <div className="flex gap-16">
                  <div>
                    <p className="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-widest mb-0.5">Emergency Care</p>
                    <p className="text-2xs font-extrabold flex items-center gap-1.5 text-slate-800 dark:text-slate-150">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Available 24/7
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-widest mb-0.5">Google Rating</p>
                    <p className="text-2xs font-extrabold flex items-center gap-1 text-slate-800 dark:text-slate-150">
                      4.9 <span className="text-yellow-500 dark:text-yellow-450 font-sans">★★★★★</span> <span className="text-slate-400 font-normal">(842 Reviews)</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-widest mb-0.5">Location</p>
                    <p className="text-2xs font-extrabold text-slate-800 dark:text-slate-150">Fishtown, Philadelphia</p>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Clinical Excellence Standardized</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detail Pages Routing Switch */}
        {isServiceSubpage && (
          <ServiceDetailPage
            pageId={activePage}
            accessConfig={accessConfig}
            onNavigate={setActivePage}
            onBookAppointment={handleBookingTrigger}
          />
        )}

        {isCareSubpage && (
          <CarePlanDetailPage
            pageId={activePage}
            accessConfig={accessConfig}
            onNavigate={setActivePage}
            onBookAppointment={handleBookingTrigger}
          />
        )}

        {/* SECTION REVEAL CONTAINER (Orchestrates single index views smoothly) */}
        {!isDetailPage && (
          <AnimatePresence mode="popLayout">
            {/* About Services Render */}
            {(activePage === 'home' || activePage === 'services') && (
              <motion.div
                key="wrapper-about-services"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10%  0px' }}
                transition={{ duration: 0.55 }}
              >
                <AboutServicesSection
                  accessConfig={accessConfig}
                  onBookAppointment={handleBookingTrigger}
                />
              </motion.div>
            )}

            {/* Wellness care staging Render */}
            {(activePage === 'home' || activePage === 'care') && (
              <motion.div
                key="wrapper-wellness-care"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10%  0px' }}
                transition={{ duration: 0.55 }}
              >
                <WellnessCareSection accessConfig={accessConfig} />
              </motion.div>
            )}

            {/* Team Staging Render */}
            {(activePage === 'home' || activePage === 'team') && (
              <motion.div
                key="wrapper-team"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10%  0px' }}
                transition={{ duration: 0.55 }}
              >
                <TeamSection accessConfig={accessConfig} />
              </motion.div>
            )}

            {/* Blog Educational advice chapter Render */}
            {(activePage === 'home' || activePage === 'blog') && (
              <motion.div
                key="wrapper-advice-blog"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10%  0px' }}
                transition={{ duration: 0.55 }}
              >
                <AdviceBlogSection accessConfig={accessConfig} />
              </motion.div>
            )}

            {/* Booking Contact Section Render */}
            {(activePage === 'home' || activePage === 'contact') && (
              <motion.div
                key="wrapper-contact-booking"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10%  0px' }}
                transition={{ duration: 0.55 }}
              >
                <ContactSection
                  accessConfig={accessConfig}
                  preselectedService={preselectedService}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Corporate Clinical Footer */}
      <Footer onNavigate={setActivePage} accessConfig={accessConfig} />
    </div>
  );
}
