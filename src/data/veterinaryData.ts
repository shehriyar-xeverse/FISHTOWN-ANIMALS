/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, CarePlan, TeamMember, AdvicePost } from '../types';

export const servicesData: Service[] = [
  {
    id: 'preventive-care',
    title: 'Wellness & Preventive Care',
    shortDescription: 'Comprehensive exams, custom immunizations, and proactive nutrition strategies for lifelong health.',
    fullDescription: 'Our hallmark. We believe the absolute best medicine is proactive. Every exam includes a thorough nose-to-tail clinical evaluation, body condition scoring, custom immunization schedules mapped to your pet’s specific lifestyle weight, and individualized screen plans for common geographic parasites.',
    icon: 'HeartPulse',
    category: 'preventive',
    benefit: 'Drastically reduces the lifetime occurrence of preventable infectious diseases and cat/dog critical ailments.',
    prepInstructions: 'Bring in a small stool sample (under 12 hours old) and any previous medical, vaccination, or adoption history.',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'advanced-dentistry',
    title: 'Advanced Veterinary Dentistry',
    shortDescription: 'Expert subgingival cleaning, digital dental X-rays, and specialized oral surgery with full monitoring.',
    fullDescription: 'Dental health is directly linked to systemic cardiac, renal, and hepatic stability. We offer professional ultrasonic scaling, hand-polishing, customized periodontal disease charting, multi-angle digital dental radiographs to detect bone loss beneath the gumline, and safe soft-tissue extractions.',
    icon: 'Sparkles',
    category: 'clinical',
    benefit: 'Eliminates chronic mouth pain, bad breath, and protects internal organs from secondary systemic infections.',
    prepInstructions: 'Your pet must start fasting from food after midnight the evening before dental anesthesia. Access to water is permitted.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'general-surgery',
    title: 'Veterinary Surgical Suite',
    shortDescription: 'State-of-the-art sterile surgeries including spay/neuter, mass removals, and emergency procedures.',
    fullDescription: 'Our positive-pressure sterile surgical suite is fully equipped to perform standard spay/neuteres, soft-tissue lump/mass excisions, gastrointestinal foreign-body removals, and emergency laceration repairs. All patients receive continuous monitoring of ECG, blood pressure, oxygen saturation, and core temperature by a designated veterinary technician.',
    icon: 'Activity',
    category: 'clinical',
    benefit: 'Safely resolves urgent physical conditions, alters behavior, and prevents serious reproductive cancers.',
    prepInstructions: 'Pre-surgery fasting is mandatory after 10 PM the night prior. Arrive between 7:30 AM and 8:00 AM on surgery day.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'diagnostics-lab',
    title: 'Internal Diagnostics & Imaging',
    shortDescription: 'In-house capillary laboratory, fast digital radiography, and dynamic ultrasonography scans.',
    fullDescription: 'Minutes matter in emergency scenarios. We feature a state-of-the-art IDEXX in-house laboratory to perform complete blood counts (CBC), organ function chemistry profiles, urinalysis, and thyroid monitoring within 15 minutes. We also maintain full-body digital X-ray grids and ultrasound imaging for structural and fluid assessments.',
    icon: 'Search',
    category: 'diagnostics',
    benefit: 'Provides rapid, precise medical insights while you wait, eliminating stressful follow-up delays.',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'laser-therapy',
    title: 'Therapeutic Cold Laser Therapy',
    shortDescription: 'Non-invasive photobiomodulation treatments to relieve arthritis and accelerate surgical healing.',
    fullDescription: 'Using FDA-approved Class IV laser technology, we deliver specific light wavelengths to stimulate cellular repair and microcirculation. This pain-free, drug-free therapy is highly effective for reducing acute post-operative swelling, accelerating wound closure, and dramatically easing chronic joint paint from feline and canine arthritis.',
    icon: 'Radio',
    category: 'therapy',
    benefit: 'Reduces dependence on chronic NSAIDs, increases pet mobility, and shortens wound recovery cycles by half.',
    prepInstructions: 'No sedation or special preparation required. Most pets feel a deep, soothing warmth and relax immediately of their own accord.',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=1200'
  }
];

export const wellnessPlans: CarePlan[] = [
  {
    id: 'puppy-kitten',
    title: 'Kitten & Puppy Foundations',
    subtitle: 'Best for pets under 1 year old',
    animalType: 'all',
    ageRange: 'puppy-kitten',
    priceMonthly: '$49',
    description: 'Ensure your new companion gets a pristine start. Includes mandatory multi-dose immunizations, diagnostic screenings, and physical milestones assessments.',
    inclusions: [
      'Unlimited complementary clinical physical exams',
      'Full vaccine series (Feline FVRCP/FeLV or Canine DHPP/Rabies/Bordetella)',
      '2 Comprehensive fecal parasite analysis surveys',
      'Deworming clinical treatments (up to 3 courses)',
      'Strategic growth & development nutritional counseling',
      '10% Discount on companion pre-surgical screening panel'
    ],
    keyBenefits: [
      'Protects against fatal pediatric puppy/kitten viruses',
      'Provides a critical baseline for dental and behavioral growth',
      'Identifies congenital or developmental concerns before they advance'
    ],
    scheduleFreq: 'Monthly or Bi-Monthly follow-ups during first 12 months'
  },
  {
    id: 'adult-maintenance',
    title: 'Adult Companion Maintenance',
    subtitle: 'Best for pets aged 1 to 7 years old',
    animalType: 'all',
    ageRange: 'adult',
    priceMonthly: '$39',
    description: 'Tailored protection to maintain high immunity, early-detection blood screens, and keep parasites, tick diseases, and dental staging in prime control.',
    inclusions: [
      '2 Complete head-to-tail wellness examinations per year',
      'Core vaccine titers & recommended immunizations',
      'Annual heartworm, lyme, and tick-borne diagnostic panels',
      'Intestinal parasite microscopic screening survey',
      'Comprehensive biochemical profile & blood cell count screen',
      '10% Discount on professional dental scaling and therapy'
    ],
    keyBenefits: [
      'Spots early signs of liver, kidney, or endocrine anomalies',
      'Ensures continuous protection against suburban environmental pests',
      'Proactive dental evaluation maintains cardiac and vascular integrity'
    ],
    scheduleFreq: 'Bi-annual exams with flexible scheduling options'
  },
  {
    id: 'senior-care',
    title: 'Senior Wellness & Mobility Staging',
    subtitle: 'Best for pets over 7 years old',
    animalType: 'all',
    ageRange: 'senior',
    priceMonthly: '$59',
    description: 'Empathetic gerontology plans checking thyroid thresholds, full biochemical levels, managing arthritis and mobility, and tracking chronic conditions early.',
    inclusions: [
      '3 Targeted senior physical exams per year with pain indexing',
      'Comprehensive high-panel chemistry scan (organ screening)',
      'Total T4 thyroid level evaluation panels',
      'Urinalysis diagnostic profiling including protein counters',
      'Blood pressure screening (vital for feline cardiac hygiene)',
      '15% Discount on laser therapeutic sessions & pain treatments'
    ],
    keyBenefits: [
      'Prolongs physical activity and alleviates chronic arthritic join discomfort',
      'Pinpoint endocrine disorders (hypothyroidism, Cushing’s) early',
      'Secures a compassionate, active quality of life during your companion’s twilight years'
    ],
    scheduleFreq: 'Tri-annual screenings with therapeutic updates'
  }
];

export const teamData: TeamMember[] = [
  {
    id: 'dr-marc',
    name: 'Dr. Marc DiSebastian',
    role: 'Medical Director & Founder',
    credentials: 'VMD, Penn Vet',
    bio: 'Dr. Marc founded Fishtown Animal Hospital with a clear mission: to combine leading-edge metropolitan specialty medicine with the warm, personalized touch of a local neighborhood vet clinic. He graduated from the prestigious Penn School of Veterinary Medicine and has spent two decades advancing small animal wellness.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    specialties: ['Advanced Dental Surgery', 'Internal Medicine Staging', 'Ultrasound Imaging'],
    education: 'University of Pennsylvania (VMD), Philadelphia PA',
    funFact: 'He resides in Fishtown with his two rescue pitbulls, Brutus and Cleo, and enjoys restoring vintage mid-century furniture.'
  },
  {
    id: 'dr-jennifer',
    name: 'Dr. Jennifer Shinn',
    role: 'Associate Veterinarian',
    credentials: 'DVM, Cornell Vet',
    bio: 'Dr. Shinn joined our practice with an outstanding background in clinical feline medicine and small animal pathology from Cornell. She specializes in creating low-stress fear-free treatment methods for companion animals and believes that detailed nutrition represents the absolute bedrock of wellness.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    specialties: ['Feline Veterinary Care', 'Nutrition & Metabolic Plans', 'Ophthalmic Staging'],
    education: 'Cornell University (DVM), Ithaca NY',
    funFact: 'She is an avid traveler who has volunteered at wildlife reserves in Kenya, and cares for a senior orange tabby named Barnaby.'
  },
  {
    id: 'sarah-sterling',
    name: 'Sarah Sterling',
    role: 'Head Certified Veterinary Technician',
    credentials: 'CVT, Harcum College',
    bio: 'Sarah leads our clinical technical staff with a precise, comforting hand. With over a decade of clinical critical care and anesthesiology experience, she is dedicated to keeping your pet warm, safe, and deeply loved while undergoing any specialized clinical procedure.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600',
    specialties: ['Veterinary Anesthesia', 'Critical Care Monitoring', 'Wound Management'],
    education: 'Harcum College (AS in Veterinary Technology), Bryn Mawr PA',
    funFact: 'Outside the clinic, Sarah is a competitive marathon runner who can often be spotted sprinting along the Schuylkill River Trail.'
  }
];

export const blogData: AdvicePost[] = [
  {
    id: 'springtime-hazards',
    title: 'Springtime Hazards: Essential Philadelphia Plant Safety for Pets',
    category: 'safety',
    author: 'Dr. Marc DiSebastian',
    date: 'April 12, 2026',
    readTime: '4 min read',
    summary: 'Spring brings beautiful blooms to Girard Ave, but many common garden additions – including lilies, sago palms, and certain mulches – are highly cardiotoxic or nephrotoxic to cats and dogs.',
    content: [
      'As urban Philly gardeners stock up on flowerboxes and backyard setups, it is crucial to recognize that some of our favorite seasonal flora can lead to devastating gastrointestinal, renal, or central nervous system failures if ingested by pets.',
      'Lilies are absolutely notorious for causing fatal acute kidney failures in cats. Even small pollen grains licked from a whisker can trigger non-reversible renal injury within hours. If you cultivate lilies, keep them isolated entirely from your feline companions, or choose safe species like African Violets or Orchids instead.',
      'Mulches containing cacao bean hulls are also highly dangerous to dogs, as cocoa contains methylxanthines which mimic the severe cardiovascular toxicoses of dark chocolate. Stick to clean, organic pine or cedar barks, and always keep the Pet Poison Helpline and our Girard Ave clinic address saved on speed dial during hiking season.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&q=80&w=800',
    tags: ['Safety', 'Toxicology', 'Philadelphia Spring', 'Pet First Aid']
  },
  {
    id: 'dental-disease-myths',
    title: 'The Silent Epidemic: De-bunking Major Pet Dental Hygiene Myths',
    category: 'nutrition',
    author: 'Dr. Marc DiSebastian',
    date: 'May 18, 2026',
    readTime: '6 min read',
    summary: 'Think hard kibble and dental treats are enough? Discover the physiological reality of subgingival calculus, why bad breath is actually a warning sign of cardiac stress, and what real care entails.',
    content: [
      'Over 80% of cats and dogs show positive clinical evidence of periodontal disease by age three. Unfortunately, dental disease is too often written off as merely "bad pet breath," but it represents a highly active inflammatory bone-loss infection.',
      'A major myth is that hard dry food scrapes away plaque. In reality, most pets swallow kibble whole or with minimal dental surface friction. Standard dry food dissolves quickly in salivary amylase, packing starches around the gingival margin where it feeds anaerobic pathogenetic bacteria.',
      'True prevention consists of a dual-pronged approach: daily pet-safe enzymatic brushing and scheduled professional subgingival scaling under light veterinary anesthesia. Brushing clears the soft plaque, while dental scale clears the rock-hard calculus on root surfaces that dental treats can never reach.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    tags: ['Dental Care', 'Veterinary Dentistry', 'Oral Hygiene', 'Early Detection']
  },
  {
    id: 'feline-enrichment-guide',
    title: 'Designing the Stress-Free Indoor Territory: Cat Enrichment Staging',
    category: 'wellness',
    author: 'Dr. Jennifer Shinn',
    date: 'June 02, 2026',
    readTime: '5 min read',
    summary: 'Indoor feline companions are safe from cars and diseases, but are highly susceptible to chronic stress-induced cystitis, obesity, and behavior disorders from lack of environmental stimulation.',
    content: [
      'Feline environments should be modeled around three-dimensional horizontal and vertical navigation. Cats are natural ambush predators who require vertical climbing grids to feel secure from ground-level activities.',
      'To ease stress-induced behaviors like idiopathic cystitis, utilize vertical wall-perches or high cat trees overlooking local window lines. This enlarges their cognitive territory and provides constant visual stimulation (which we like to call "cat TV").',
      'Feeding patterns should also move away from stagnant bowls. Introduce food puzzles, maze feeders, or hide small kibble treats around the room. Forcing cats to active-hunt for nutrition burns energy, keeps weight stable, and mimics natural predatory foraging sequences.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    tags: ['Cat Care', 'Feline Enrichment', 'Animal Behavior', 'Indoor Staging']
  }
];
