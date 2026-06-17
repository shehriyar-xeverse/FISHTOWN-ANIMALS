/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 
  | 'home' 
  | 'services' 
  | 'team' 
  | 'care' 
  | 'blog' 
  | 'contact'
  | 'service-wellness-checkups'
  | 'service-advanced-dentistry'
  | 'service-surgical-suite'
  | 'service-internal-diagnostics'
  | 'service-therapeutic-laser'
  | 'care-pediatric'
  | 'care-adult'
  | 'care-senior';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Name of Lucide icon
  category: 'clinical' | 'preventive' | 'diagnostics' | 'therapy';
  benefit: string;
  prepInstructions?: string;
  imageUrl: string;
}

export interface CarePlan {
  id: string;
  title: string;
  subtitle: string;
  animalType: 'cat' | 'dog' | 'all';
  ageRange: 'puppy-kitten' | 'adult' | 'senior';
  priceMonthly: string;
  description: string;
  inclusions: string[];
  keyBenefits: string[];
  scheduleFreq: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string; // e.g., VMD, DVM, CVT
  bio: string;
  image: string; // Placeholders or stylized icons
  specialties: string[];
  education: string;
  funFact: string;
}

export interface AdvicePost {
  id: string;
  title: string;
  category: 'nutrition' | 'safety' | 'wellness' | 'training';
  author: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[]; // multi-paragraph post content
  imageUrl: string;
  tags: string[];
}

export interface AccessibilityConfig {
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  fontSizeMultiplier: 1 | 1.15 | 1.25; // 100%, 115%, 125% scaler
}
