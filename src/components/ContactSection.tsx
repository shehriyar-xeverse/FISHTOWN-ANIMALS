/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CalendarCheck, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import { AccessibilityConfig } from '../types';

interface ContactSectionProps {
  accessConfig: AccessibilityConfig;
  preselectedService: string;
}

export default function ContactSection({ accessConfig, preselectedService }: ContactSectionProps) {
  // Booking Form Fields State
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [serviceRequested, setServiceRequested] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Form Management states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Automatically update preselected service if it shifts from other pages
  React.useEffect(() => {
    if (preselectedService) {
      setServiceRequested(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Field Validations
    if (!petName.trim()) {
      setValidationError("Please specify your companion pet's name.");
      return;
    }
    if (!ownerName.trim()) {
      setValidationError("Please specify your veterinarian contact name.");
      return;
    }
    if (!phoneNumber.trim() && !emailAddress.trim()) {
      setValidationError("Provide either a telephone number or email address for verification.");
      return;
    }
    if (!selectedDate) {
      setValidationError("Please specify a target milestone date for clinical check.");
      return;
    }

    // Success State
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setPetName('');
    setPetType('dog');
    setOwnerName('');
    setPhoneNumber('');
    setEmailAddress('');
    setServiceRequested('');
    setSelectedDate('');
    setAdditionalNotes('');
    setFormSubmitted(false);
  };

  return (
    <section 
      id="contact-section" 
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="contact-title"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className={`text-xs font-semibold tracking-widest uppercase py-1 px-3.5 rounded-full ${
          accessConfig.highContrast
            ? 'bg-black text-white border border-white'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
        }`}>
          Connect With Us
        </span>
        <h2 
          id="contact-title" 
          className={`font-sans font-extrabold tracking-tight mt-4 transition-all ${
            accessConfig.highContrast ? 'text-white text-5xl font-black' : 'text-slate-900 dark:text-white text-4xl sm:text-5xl'
          }`}
          style={{ fontSize: `${1.1 * accessConfig.fontSizeMultiplier}em` }}
        >
          Book An Appointment & Contact Us
        </h2>
        <p className={`mt-4 text-base ${accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
          Schedule preventive checkups, dental cleanings, or request therapeutic consultation. 
          Our clinical directors on E Girard Ave are standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Inquiry Booking Registration (WCAG Compliant) */}
        <div className="lg:col-span-7">
          <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl relative overflow-hidden ${
            accessConfig.highContrast
              ? 'bg-slate-950 text-white border-2 border-white'
              : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80'
          }`}>
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                // Active Booking Fields Form
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-label="Appointment scheduling request form"
                >
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
                    <h3 className="font-sans font-bold text-lg flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-emerald-500" />
                      Inquiry Staging Form
                    </h3>
                    <p className="text-2xs text-slate-400">Request care days. Our team returns confirmation parameters within 2 clinics hours.</p>
                  </div>

                  {/* Errors block */}
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center gap-2"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {validationError}
                    </motion.div>
                  )}

                  {/* Companion Pet Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="pet-name" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Pet's Name *</label>
                      <input
                        id="pet-name"
                        type="text"
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="e.g., Barnaby"
                        className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Companion Species</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['dog', 'cat'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setPetType(type)}
                            className={`text-xs font-bold py-2.5 px-3 rounded-xl border capitalize transition-all ${
                              petType === type
                                ? accessConfig.highContrast
                                  ? 'bg-white text-black font-black border-white'
                                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-300'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Owner Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="owner-name" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Owner's Name *</label>
                      <input
                        id="owner-name"
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g., Sophia Martinez"
                        className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone-number" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Telephone Number *</label>
                      <input
                        id="phone-number"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., (215) 555-0199"
                        className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email-address" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Email Address</label>
                      <input
                        id="email-address"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g., sophia@gmail.com"
                        className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="milestone-date" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Requested Date *</label>
                      <input
                        id="milestone-date"
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Service Staging Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="service-req" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Service Program</label>
                      <select
                        id="service-req"
                        value={serviceRequested}
                        onChange={(e) => setServiceRequested(e.target.value)}
                        className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl outline-none transition-all ${
                          accessConfig.highContrast
                            ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                            : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                        }`}
                      >
                        <option value="">General Wellness Consultation</option>
                        <option value="Wellness & Preventive Care">Wellness & Preventive Care</option>
                        <option value="Advanced Veterinary Dentistry">Advanced Veterinary Dentistry</option>
                        <option value="Veterinary Surgical Suite">Veterinary Surgical Suite</option>
                        <option value="Internal Diagnostics & Imaging">Internal Diagnostics & Imaging</option>
                        <option value="Therapeutic Cold Laser Therapy">Therapeutic Cold Laser Therapy</option>
                        <option value="Puppy & Kitten Foundation Plan">Puppy & Kitten Foundation Plan</option>
                        <option value="Adult Care Maintenance Plan">Adult Care Maintenance Plan</option>
                        <option value="Senior Mobility Care Plan">Senior Mobility Care Plan</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes Area */}
                  <div className="space-y-1.5">
                    <label htmlFor="notes" className="text-xs font-bold text-slate-500 dark:text-slate-350 block">Additional Staging Notes or Symptoms</label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="e.g., Barnaby needs core booster vaccines and has shown slight rear join stiffness..."
                      className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl outline-none transition-all resize-none ${
                        accessConfig.highContrast
                          ? 'bg-black text-white border-2 border-white focus:bg-slate-900 focus:border-white'
                          : 'bg-slate-50 focus:bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/25 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 ${
                      accessConfig.highContrast
                        ? 'bg-white text-black hover:bg-slate-200 ring-2 ring-white font-extrabold'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg hover:shadow-emerald-600/10'
                    }`}
                    aria-label="Confirm and send clinical appointment request"
                  >
                    Confirm Appointment Request
                  </button>
                </motion.form>
              ) : (
                // Multi-User Success Staging Response Modal
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-10"
                  aria-label="Inquiry registration success status"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl tracking-tight text-slate-950 dark:text-white">
                      Inquiry Staged Successfully!
                    </h3>
                    <p className={`text-xs sm:text-sm max-w-md mx-auto ${
                      accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      Congratulations! We have queued <strong>{petName}'s</strong> diagnostic request for{' '}
                      <strong>{selectedDate}</strong>. Our front receptionist will reach out via code{' '}
                      <strong>{phoneNumber || emailAddress}</strong> within two business hours to finalize check times.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl max-w-sm mx-auto text-left space-y-2 text-xxs ${
                    accessConfig.highContrast ? 'border-2 border-white' : 'bg-slate-50 dark:bg-slate-950/30'
                  }`}>
                    <span className="font-bold text-slate-400 uppercase tracking-wider block">Diagnostics Summary</span>
                    <div className="space-y-1">
                      <div><strong className="text-slate-500">Patient:</strong> {petName} ({petType})</div>
                      <div><strong className="text-slate-500">Contact Sponsor:</strong> {ownerName}</div>
                      <div><strong className="text-slate-500">Service Line:</strong> {serviceRequested || 'General Consultation'}</div>
                      <div><strong className="text-slate-500">Urgency Level:</strong> Scheduled Maintenance</div>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className={`py-2 px-6 rounded-full font-bold text-xs transition-colors ${
                      accessConfig.highContrast
                        ? 'bg-white text-black hover:bg-slate-200 border-2 border-white'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-slate-600'
                    }`}
                  >
                    Register Another Pet
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Dynamic Location Mapping & Clinical Hours */}
        <div className="lg:col-span-5 space-y-8 select-none">
          {/* Information Capsule Card */}
          <div className={`p-6 rounded-3xl border ${
            accessConfig.highContrast
              ? 'bg-slate-950 text-white border-2 border-white'
              : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80 shadow-md'
          }`}>
            <h3 className="font-sans font-bold text-base mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              Hours of Clinical Operation
            </h3>

            <div className="space-y-3.5 text-xs font-semibold text-slate-600 dark:text-slate-350">
              <div className="flex justify-between pb-2 border-b border-slate-50 dark:border-slate-800/65">
                <span>Monday - Friday</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-50 dark:border-slate-800/65">
                <span>Saturday</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">8:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between pb-2 text-rose-500 dark:text-rose-400">
                <span>Sunday</span>
                <span className="font-bold uppercase tracking-wider text-2xs bg-rose-500/10 py-0.5 px-2.5 rounded-full">
                  Closed
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border flex gap-3 items-start ${
              accessConfig.highContrast
                ? 'bg-slate-950 text-white border-2 border-white'
                : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80 shadow-sm'
            }`}>
              <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xxxxs font-bold text-slate-450 uppercase tracking-widest block">Direct Phone</span>
                <a href="tel:2155986345" className="text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:text-emerald-500 transition-colors">
                  (215) 598-6345
                </a>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex gap-3 items-start ${
              accessConfig.highContrast
                ? 'bg-slate-950 text-white border-2 border-white'
                : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80 shadow-sm'
            }`}>
              <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xxxxs font-bold text-slate-455 uppercase tracking-widest block">Support Email</span>
                <a href="mailto:info@thefishtownanimalhospital.com" className="text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:text-emerald-500 transition-colors">
                  info@fishtownhospital.com
                </a>
              </div>
            </div>
          </div>

          {/* High-End Vector Maps Staging Representation */}
          <div className={`p-5 rounded-3xl border relative overflow-hidden group ${
            accessConfig.highContrast
              ? 'bg-slate-950 text-white border-2 border-white'
              : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/80 shadow-md'
          }`}>
            <h3 className="font-sans font-bold text-xs mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              Our Philadelphia Address
            </h3>
            
            <p className="text-xxxxs text-slate-400 font-semibold mb-4 leading-normal">
              233 E Girard Ave, Philadelphia, PA 19125, USA (Corner of E Girard Ave & Shackamaxon St)
            </p>

            {/* Gorgeous Simulated Vector Map */}
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-950/80 rounded-2xl overflow-hidden relative border border-slate-200/40 dark:border-slate-900 mb-4 flex items-center justify-center">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 pointer-events-none" />

              {/* Vector Street Lines */}
              <svg className="absolute inset-0 w-full h-full text-slate-300 dark:text-slate-850 stroke-current stroke-[2.5]" aria-hidden="true">
                {/* Girard Ave */}
                <line x1="-20" y1="120" x2="350" y2="40" />
                {/* Shackamaxon St */}
                <line x1="180" y1="-20" x2="160" y2="220" />
                {/* Frankford Ave line */}
                <line x1="80" y1="-20" x2="60" y2="220" strokeWidth="1.5" />
                {/* Front Street & El Grid */}
                <path d="M 40 -20 Q 50 100 20 220" className="text-emerald-500/10 stroke-[4.5] border-dashed" />
              </svg>

              {/* Text labels for Vector streets */}
              <span className="absolute top-10 right-4 font-mono text-xxxxs opacity-40 uppercase tracking-widest font-bold rotate-[-13deg]">E Girard Ave</span>
              <span className="absolute top-24 left-32 font-mono text-xxxxs opacity-40 uppercase tracking-widest font-bold rotate-[85deg]">Shackamaxon St</span>
              <span className="absolute top-4 left-6 font-mono text-xxxxs opacity-25 uppercase tracking-widest font-bold rotate-[85deg]">Frankford Ave</span>

              {/* Hospital Pin overlay */}
              <div className="absolute top-[80px] left-[170px] z-10 flex flex-col items-center">
                {/* Pulse visual ripple circle */}
                <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20 top-[-6px] animate-ping" />
                <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-md animate-bounce" />
                <span className="text-4xs font-black bg-slate-900 text-white dark:bg-white dark:text-black py-0.5 px-1.5 rounded shadow mt-1 whitespace-nowrap">
                  Fishtown Hospital
                </span>
              </div>
            </div>

            {/* Travel CTA routing */}
            <a
              href="https://maps.google.com/?q=233+E+Girard+Ave+Philadelphia+PA+19125"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                accessConfig.highContrast
                  ? 'bg-black text-white hover:bg-slate-800 border border-white'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-850'
              }`}
              aria-label="Get Google driving or transit directions to Fishtown Animal Hospital location"
            >
              Get Location Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
