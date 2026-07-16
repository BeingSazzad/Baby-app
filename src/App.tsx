import React, { useState, useEffect } from 'react';
import {
  Heart,
  User,
  Home,
  Baby,
  Calendar,
  CheckSquare,
  BookOpen,
  Bell,
  Plus,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  Camera,
  Check,
  MapPin,
  Smartphone,
  Sparkles,
  TrendingUp,
  LogOut,
  Bookmark,
  Share2,
  HelpCircle,
  Eye,
  EyeOff,
  Clock,
  Activity,
  Award,
  BookMarked,
  Key,
  Trash,
  MoreHorizontal,
  Shield,
  CalendarDays,
  Lock,
  FileText,
  Cloud,
  RefreshCw,
  Users,
  Globe,
  File,
  BarChart2,
  Headset
} from 'lucide-react';

// Interfaces
interface GrowthLog {
  id: string;
  age: string;
  weight: number;
  height: number;
  head: number;
  date: string;
}

interface VaccineItem {
  name: string;
  date: string;
  status: 'administered' | 'pending';
}

interface ChildProfile {
  name: string;
  dob: string;
  gender: string;
  weight: number;
  height: number;
  head?: number;
  growthLogs: GrowthLog[];
  vaccineSchedule: VaccineItem[];
  milestones?: MilestoneItem[];
  checklist?: ChecklistItem[];
  nurseryLogs?: Array<{
    id: string;
    type: 'feed' | 'sleep' | 'diaper';
    title: string;
    desc: string;
    time: string;
    timestamp: number;
  }>;
  pregnancyKicks?: Array<{ time: string; count: number }>;
  symptomsLog?: Array<{
    id: string;
    name: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    time: string;
  }>;
  hydrationLog?: number;
  foodLogs?: Array<{
    id: string;
    food: string;
    reaction: 'like' | 'neutral' | 'dislike' | 'allergy';
    date: string;
  }>;
}


interface ChecklistItem {
  id: string;
  task: string;
  time: string;
  completed: boolean;
  category: 'daily' | 'weekly' | 'monthly';
  desc?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string; // YYYY-MM-DD
  type: 'appointment' | 'vaccination' | 'reminder';
  desc: string;
}

interface Article {
  id: string;
  title: string;
  author: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  saved?: boolean;
  read?: boolean;
}

interface MilestoneItem {
  id: string;
  title: string;
  category: 'motor' | 'communication' | 'cognitive';
  status: 'achieved' | 'in_progress' | 'upcoming';
  desc: string;
  dueMonth: number;
}

// Initial Data Seed
const initialCalendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Doctor Appointment', time: '10:00 AM', date: '2026-07-15', type: 'appointment', desc: 'Dr. Farhana Huq - Routine wellness checkup and growth metrics.' },
  { id: 'e2', title: 'Vaccination (Dose 2)', time: '11:30 AM', date: '2026-07-20', type: 'vaccination', desc: 'Polio and DTaP booster vaccination. Keep infant paracetamol ready.' },
  { id: 'e3', title: 'Vitamin D Drops', time: '09:00 AM', date: '2026-07-09', type: 'reminder', desc: 'Daily vitamin drops during morning sunlight.' },
  { id: 'e4', title: 'Tummy Time Session', time: '10:30 AM', date: '2026-07-09', type: 'reminder', desc: 'Interactive floor play for head strength development.' },
];

const initialMilestones: MilestoneItem[] = [
  { id: 'm_m1', title: 'Holds head steady', category: 'motor', status: 'achieved', desc: 'Holds head upright and steady without support when held in sitting position.', dueMonth: 2 },
  { id: 'm_m2', title: 'Rolls over', category: 'motor', status: 'in_progress', desc: 'Rolls over from tummy to back or vice versa. Usually starts around 4-5 months.', dueMonth: 4 },
  { id: 'm_m3', title: 'Sits without support', category: 'motor', status: 'upcoming', desc: 'Sits independently with back straight and hands free for play. Expected around 6-7 months.', dueMonth: 6 },
  { id: 'm_c1', title: 'Smiles socially', category: 'communication', status: 'achieved', desc: 'Spontaneously smiles back at mother and family members to initiate interaction.', dueMonth: 2 },
  { id: 'm_c2', title: 'Laughs out loud', category: 'communication', status: 'in_progress', desc: 'Giggles or laughs when tickled, played peek-a-boo, or showing funny faces.', dueMonth: 4 },
  { id: 'm_c3', title: 'Babbles consonants', category: 'communication', status: 'upcoming', desc: 'Makes repetitive consonant sounds like "ba-ba", "da-da", "ma-ma".', dueMonth: 6 },
  { id: 'm_cog1', title: 'Tracks objects visually', category: 'cognitive', status: 'achieved', desc: 'Follows colorful moving toys smoothly from left to right.', dueMonth: 2 },
  { id: 'm_cog2', title: 'Reaches for toys', category: 'cognitive', status: 'in_progress', desc: 'Stretches hand out intentionally to grab rattles or dangling crib charms.', dueMonth: 4 },
];

const initialPregnancyMilestones: MilestoneItem[] = [
  { id: 'p_m1', title: 'First Prenatal Scan & Visit', category: 'motor', status: 'achieved', desc: 'Confirm pregnancy, verify heartbeat, and establish due date. (Weeks 6-8)', dueMonth: -7 },
  { id: 'p_m2', title: 'Nuchal Translucency (NT) Scan', category: 'motor', status: 'in_progress', desc: 'Ultrasound screening for developmental checkups. (Weeks 11-13)', dueMonth: -6 },
  { id: 'p_m3', title: 'Anatomy Scan (20-week Ultrasound)', category: 'motor', status: 'upcoming', desc: 'Detailed ultrasound of baby organs and structural development. (Weeks 18-22)', dueMonth: -4 },
  { id: 'p_c1', title: 'Feel Baby Flutter Kicks', category: 'communication', status: 'upcoming', desc: 'First subtle movements (quickening) felt in lower abdomen. (Weeks 18-24)', dueMonth: -4 },
  { id: 'p_c2', title: 'Glucose Tolerance Screening', category: 'communication', status: 'upcoming', desc: 'Routine test to screen for gestational maternal sugar levels. (Weeks 24-28)', dueMonth: -3 },
  { id: 'p_cog1', title: 'Register for Childbirth Classes', category: 'cognitive', status: 'upcoming', desc: 'Learn about labor stages, breathing, and diapering basics. (Weeks 30-32)', dueMonth: -2 },
  { id: 'p_cog2', title: 'Group B Strep (GBS) Screening', category: 'cognitive', status: 'upcoming', desc: 'Pre-birth maternal safety swab test. (Weeks 35-37)', dueMonth: -1 }
];

const initialArticles: Article[] = [
  {
    id: 'art1',
    title: 'How much should my 5-month old baby eat?',
    author: 'Dr. Farhana Huq',
    readTime: '5 min read',
    category: 'Baby Care',
    summary: 'A guide to baby nutritional schedules, nursing intervals, and early signs of food curiosity.',
    content: 'Around 5 months, your baby is undergoing massive physical and developmental changes. While breast milk or formula remains the primary source of nutrition, babies might show early signs of interest in food, such as staring at your plate or putting toys to their mouth. Keep nursing sessions frequent—typically every 3 to 4 hours. Seek a pediatrician before introducing purees.',
    date: '6 May 2026'
  },
  {
    id: 'art2',
    title: '5 Activities to boost your baby\'s brain development',
    author: 'Prof. Henrik Larsson',
    readTime: '4 min read',
    category: 'Development',
    summary: 'Simple sensory games, talking protocols, and tactile exercises to strengthen cognitive pathways.',
    content: 'Your baby\'s brain is building millions of synaptic connections daily. To encourage cognitive growth: 1) Read books with high-contrast patterns. 2) Talk and narrate your daily tasks. 3) Play peek-a-boo to build object permanence. 4) Use textures (soft silk, rough canvas) to stimulate tactile sensors. 5) Sing nursery rhymes with hand movements.',
    date: '3 May 2026'
  },
  {
    id: 'art3',
    title: 'Safe sleep guidelines: Setting up the perfect crib',
    author: 'Sarah Jenkins (Sleep Coach)',
    readTime: '7 min read',
    category: 'Sleep',
    summary: 'How to reduce sleep startles, secure sleep environments, and transition to crib safely.',
    content: 'A safe crib is a bare crib. Place your baby on their back on a firm mattress fitted with a tight sheet. Avoid pillows, bumper pads, blankets, and plush toys to maximize airflow. Keep the nursery room at a comfortable temperature between 20-22°C (68-72°F) and use a light swaddle or sleep sack.',
    date: '28 April 2026'
  },
  {
    id: 'art4',
    title: 'Navigating the first postpartum weeks: Self-care for moms',
    author: 'Astrid Lindgren (Midwife)',
    readTime: '6 min read',
    category: 'Pregnancy',
    summary: 'Emotional shifts, physical recovery guidelines, and mental hygiene for new mothers.',
    content: 'The fourth trimester is as much about you as it is about the baby. Hormonal drops can trigger baby blues, which is common. Allow friends and family to help with chores, stay hydrated, consume rich protein meals, and allow yourself to rest when the baby sleeps. Never hesitate to talk to someone if you feel overwhelmed.',
    date: '22 April 2026'
  }
];

// Helper to get dynamic category colors based on topic (UX dynamic styling)
const getCategoryBadgeStyle = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('baby') || cat.includes('development') || cat.includes('care')) {
    return { backgroundColor: 'var(--baby-secondary)', color: 'var(--baby-primary)' };
  } else if (cat.includes('pregnancy') || cat.includes('sleep') || cat.includes('mother')) {
    return { backgroundColor: 'var(--mother-secondary)', color: 'var(--mother-primary)' };
  } else if (cat.includes('father') || cat.includes('partner') || cat.includes('parent')) {
    return { backgroundColor: 'var(--cal-secondary)', color: 'var(--cal-primary)' };
  } else {
    return { backgroundColor: 'var(--article-secondary)', color: 'var(--article-primary)' };
  }
};

// Calculate age in months as raw number
const calculateAgeInMonths = (dobString: string): number => {
  const dob = new Date(dobString);
  const today = new Date();
  if (today < dob) return 0;
  let months = (today.getFullYear() - dob.getFullYear()) * 12 + today.getMonth() - dob.getMonth();
  if (today.getDate() - dob.getDate() < 0) {
    months -= 1;
  }
  return months >= 0 ? months : 0;
};

const formatBabyAgeLabel = (dobString: string): string => {
  const dob = new Date(dobString);
  const today = new Date();
  if (today < dob) return 'Newborn';
  let months = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth());
  let days = today.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) return 'Newborn';
  if (months === 0) return `${days} days`;
  return `${months} months, ${days} days`;
};

/** Approximate WHO boy medians + 10th/90th bands for chart (kg / cm) */
const WHO_GROWTH: Record<'weight' | 'height' | 'head', { median: number[]; p10: number[]; p90: number[]; unit: string }> = {
  weight: {
    unit: 'kg',
    median: [3.3, 4.5, 5.6, 6.4, 7.0, 7.5],
    p10: [2.9, 3.9, 4.9, 5.6, 6.1, 6.5],
    p90: [3.9, 5.1, 6.3, 7.2, 7.9, 8.5]
  },
  height: {
    unit: 'cm',
    median: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9],
    p10: [48.0, 52.5, 56.0, 58.8, 61.1, 63.0],
    p90: [51.8, 56.9, 60.8, 64.0, 66.7, 68.9]
  },
  head: {
    unit: 'cm',
    median: [34.5, 37.3, 39.1, 40.5, 41.6, 42.6],
    p10: [33.1, 35.8, 37.5, 38.9, 40.0, 40.9],
    p90: [35.8, 38.7, 40.6, 42.0, 43.2, 44.2]
  }
};

const estimatePercentile = (value: number, median: number, p10: number, p90: number): number => {
  if (value <= p10) return Math.max(5, Math.round(10 - ((p10 - value) / (p10 || 1)) * 5));
  if (value >= p90) return Math.min(95, Math.round(90 + ((value - p90) / (p90 || 1)) * 5));
  if (value <= median) {
    const t = (value - p10) / ((median - p10) || 1);
    return Math.round(10 + t * 40);
  }
  const t = (value - median) / ((p90 - median) || 1);
  return Math.round(50 + t * 40);
};

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

/* —— Icons / illustrations from nursery_app_design.tsx —— */
const NurseryMoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="8" height="8">
    <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.81s-.77-.55-1.83-.15A10.32 10.32 0 002.4 8.87a10.267 10.267 0 000 10.51 10.267 10.267 0 0010.51 0 10.32 10.32 0 006.75-6.43c.4-1.06.1-1.81-.13-2.02z" />
  </svg>
);

const NurseryBottleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="8" height="8">
    <path d="M15.5 8V4.5A2.5 2.5 0 0 0 13 2h-2a2.5 2.5 0 0 0-2.5 2.5V8A4.5 4.5 0 0 0 4 12.5v7A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-7A4.5 4.5 0 0 0 15.5 8ZM10.5 4.5A.5.5 0 0 1 11 4h2a.5.5 0 0 1 .5.5V6h-3v-1.5ZM18 19.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-7A2.5 2.5 0 0 1 8.5 10h7A2.5 2.5 0 0 1 18 12.5v7Z" />
  </svg>
);

const NurseryDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="8" height="8">
    <path d="M12 21a7 7 0 0 1-7-7c0-2.05.84-4.54 2.87-7.25C9.07 5.14 10.64 3.32 12 1.63c1.36 1.69 2.93 3.51 4.13 5.12C18.16 9.46 19 11.95 19 14a7 7 0 0 1-7 7Z" />
  </svg>
);

const PasswordLockIcon = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bamudiLockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A9DF9" />
        <stop offset="100%" stopColor="#6C63FF" />
      </linearGradient>
    </defs>
    <rect x="25" y="45" width="50" height="40" rx="12" fill="url(#bamudiLockGrad)" />
    <path d="M 35 45 L 35 35 C 35 22 65 22 65 35 L 65 45" fill="none" stroke="#A7C1FF" strokeWidth="8" strokeLinecap="round" />
    <text x="50" y="70" fontFamily="sans-serif" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">***</text>
  </svg>
);

const PrivacyShieldIcon = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bamudiShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A29BFE" />
        <stop offset="100%" stopColor="#6C5CE7" />
      </linearGradient>
    </defs>
    <path d="M 50 15 L 20 25 L 20 50 C 20 70 40 85 50 90 C 60 85 80 70 80 50 L 80 25 Z" fill="url(#bamudiShieldGrad)" />
    <rect x="42" y="45" width="16" height="12" rx="3" fill="white" />
    <path d="M 46 45 L 46 40 C 46 36 54 36 54 40 L 54 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const TermsDocIcon = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="20" width="40" height="55" rx="4" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="2" />
    <line x1="40" y1="35" x2="60" y2="35" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="45" x2="60" y2="45" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="55" x2="55" y2="55" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
    <circle cx="65" cy="70" r="12" fill="#FFA502" />
    <path d="M 60 70 L 63 73 L 70 66" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GreatJobCloud = () => (
  <svg viewBox="0 0 100 100" width="56" height="56" className="nursery-cloud-svg">
    <path d="M 25 70 C 15 70 10 60 15 50 C 15 40 25 35 35 40 C 40 25 60 20 70 35 C 80 30 90 40 85 55 C 90 65 80 70 70 70 Z" fill="#E6EEF9" />
    <path d="M 25 68 C 15 68 10 58 15 48 C 15 38 25 33 35 38 C 40 23 60 18 70 33 C 80 28 90 38 85 53 C 90 63 80 68 70 68 Z" fill="#FFFFFF" />
    <circle cx="45" cy="50" r="3" fill="#4A5568" />
    <circle cx="65" cy="50" r="3" fill="#4A5568" />
    <path d="M 52 55 Q 55 58 58 55" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="53" r="3" fill="#FFB6C1" opacity="0.6" />
    <circle cx="70" cy="53" r="3" fill="#FFB6C1" opacity="0.6" />
  </svg>
);

// Dynamic phase determination
const getChildPhase = (dobString: string): 'pregnancy' | 'newborn' | 'infant' | 'toddler' => {
  const dob = new Date(dobString);
  const today = new Date();
  if (today < dob) return 'pregnancy';
  
  const diffTime = today.getTime() - dob.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30.4);
  
  if (months < 1) return 'newborn';
  if (months < 6) return 'infant';
  return 'toddler';
};

// Dynamic backgrounds for simulator phone screen
const getDynamicBackground = (phase: 'pregnancy' | 'newborn' | 'infant' | 'toddler') => {
  if (phase === 'pregnancy') {
    return 'linear-gradient(180deg, #FFF5F7 0%, #FFEBEF 50%, #FFF5F7 100%)';
  } else if (phase === 'newborn') {
    return 'linear-gradient(180deg, #FFFDFB 0%, #FFF3EA 50%, #FFFDF9 100%)';
  } else if (phase === 'infant') {
    return 'linear-gradient(180deg, #F9FDFB 0%, #E6F7ED 50%, #F5FCF8 100%)';
  } else {
    return 'linear-gradient(180deg, #F7FAFC 0%, #EAF2F8 50%, #F4F8FA 100%)';
  }
};

// Dynamic gestation details
const calculatePregnancyInfo = (dueDateStr: string) => {
  const due = new Date(dueDateStr);
  const today = new Date();
  const lmp = new Date(due.getTime() - (280 * 24 * 60 * 60 * 1000));
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const gestationWeek = Math.max(1, Math.min(40, Math.floor(diffDays / 7) + 1));
  const remainingDays = Math.max(0, Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  let fruit = '🍋 Lemon';
  let sizeDesc = 'Baby is about 8.5 cm long and weighs around 43 grams.';
  let extraDesc = 'Fingerprints are starting to form!';
  
  if (gestationWeek <= 7) {
    fruit = 'Poppy Seed 🫘';
    sizeDesc = 'Baby is about 0.1 cm long and weighs under 1 gram.';
    extraDesc = 'Major organs are starting to form!';
  } else if (gestationWeek <= 11) {
    fruit = 'Raspberry 🍓';
    sizeDesc = 'Baby is about 1.6 cm long and weighs around 1 gram.';
    extraDesc = 'Baby is starting to wiggle their tiny limbs!';
  } else if (gestationWeek <= 15) {
    fruit = 'Lemon 🍋';
    sizeDesc = 'Baby is about 8.5 cm long and weighs around 43 grams.';
    extraDesc = 'Fingerprints are starting to form!';
  } else if (gestationWeek <= 19) {
    fruit = 'Avocado 🥑';
    sizeDesc = 'Baby is about 12 cm long and weighs around 150 grams.';
    extraDesc = 'Baby can now hear your heartbeat and voice!';
  } else if (gestationWeek <= 23) {
    fruit = 'Banana 🍌';
    sizeDesc = 'Baby is about 26 cm long and weighs around 360 grams.';
    extraDesc = 'Baby is developing sleep-wake cycles!';
  } else if (gestationWeek <= 27) {
    fruit = 'Cauliflower 🥦';
    sizeDesc = 'Baby is about 36 cm long and weighs around 900 grams.';
    extraDesc = 'Baby is now opening and closing their eyes!';
  } else if (gestationWeek <= 31) {
    fruit = 'Eggplant 🍆';
    sizeDesc = 'Baby is about 40 cm long and weighs around 1.5 kilograms.';
    extraDesc = 'Baby is gaining body fat and growing fast!';
  } else if (gestationWeek <= 35) {
    fruit = 'Melon 🍈';
    sizeDesc = 'Baby is about 45 cm long and weighs around 2.2 kilograms.';
    extraDesc = 'Baby is getting snug in your womb!';
  } else {
    fruit = 'Watermelon 🍉';
    sizeDesc = 'Baby is about 50 cm long and weighs around 3.2 kilograms.';
    extraDesc = 'Baby is fully developed and ready to meet you!';
  }
  
  let trimester = '1st Trimester';
  if (gestationWeek > 27) trimester = '3rd Trimester';
  else if (gestationWeek > 13) trimester = '2nd Trimester';
  
  return {
    gestationWeek,
    remainingDays,
    trimester,
    fruit,
    sizeDesc,
    extraDesc
  };
};

// Dynamic age-based default checklists
const getChecklistForAge = (dobString: string): ChecklistItem[] => {
  const dob = new Date(dobString);
  const today = new Date();
  
  if (today < dob) {
    // Pregnancy Phase
    return [
      { id: 'p1', task: 'Take Prenatal Vitamins', time: '09:00 AM', completed: false, category: 'daily', desc: 'Folic acid & iron booster' },
      { id: 'p2', task: 'Track Fetal Kicks', time: '02:00 PM', completed: false, category: 'daily', desc: 'Aim for 10 kicks in 1 hour' },
      { id: 'p3', task: 'Pelvic Floor Exercises', time: '05:00 PM', completed: false, category: 'daily', desc: 'Kegel stretch' },
      { id: 'p4', task: 'Hydration Check (2.5L)', time: 'All Day', completed: false, category: 'daily', desc: 'Water intake log' },
      { id: 'p5', task: 'Prenatal Walk (20m)', time: '06:30 PM', completed: false, category: 'daily', desc: 'Gentle aerobic exercise' },
      { id: 'pw1', task: 'Moisturize stretching areas', time: 'Every Sunday', completed: false, category: 'weekly', desc: 'Soften stretch marks' },
      { id: 'pw2', task: 'Track blood pressure', time: 'Every Wednesday', completed: false, category: 'weekly', desc: 'Log clinic indicators' },
      { id: 'pm1', task: 'Pack hospital delivery bag', time: '1st of Month', completed: false, category: 'monthly', desc: 'Prepare postpartum gear' }
    ];
  }

  const diffTime = today.getTime() - dob.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30.4);

  if (months < 1) {
    // Newborn (0-1 Month)
    return [
      { id: 'n1', task: 'Morning Breastfeed / Formula', time: '08:00 AM', completed: true, category: 'daily', desc: 'Log feeding duration' },
      { id: 'n2', task: 'Vitamin D3 Drops', time: '09:30 AM', completed: false, category: 'daily', desc: '400 IU standard dose' },
      { id: 'n3', task: 'Postpartum Mother Nap', time: '01:00 PM', completed: true, category: 'daily', desc: 'Rest when infant sleeps' },
      { id: 'n4', task: 'Diaper Change check', time: '04:00 PM', completed: false, category: 'daily', desc: 'Log wet diaper count' },
      { id: 'n5', task: 'Skin-to-Skin Session', time: '06:00 PM', completed: false, category: 'daily', desc: '30 mins chest contact' },
      { id: 'nw1', task: 'Sterilize pacifiers & bottles', time: 'Every Sunday', completed: false, category: 'weekly', desc: 'Keep nursery gear clean' },
      { id: 'nm1', task: 'Wash baby crib bedding sheets', time: '1st of Month', completed: false, category: 'monthly', desc: 'Hypoallergenic cleaning' }
    ];
  } else if (months < 6) {
    // Infant (1-6 Months)
    return [
      { id: 'i1', task: 'Morning Feed Session', time: '08:00 AM', completed: true, category: 'daily', desc: 'Nurse or formula check' },
      { id: 'i2', task: 'Vitamin D3 Drops', time: '09:00 AM', completed: false, category: 'daily', desc: 'Give after morning sunlight' },
      { id: 'i3', task: 'Tummy Time Practice', time: '10:30 AM', completed: true, category: 'daily', desc: '15-20 mins head strength' },
      { id: 'i4', task: 'Read High-Contrast Book', time: '03:00 PM', completed: false, category: 'daily', desc: 'Stimulate sensory tracking' },
      { id: 'i5', task: 'Bedtime Bath & Massage', time: '07:30 PM', completed: false, category: 'daily', desc: 'Relaxing sleep routine' },
      { id: 'iw1', task: 'Trim baby fingernails safely', time: 'Every Friday', completed: false, category: 'weekly', desc: 'Avoid face scratching' },
      { id: 'im1', task: 'Wash teething toys & gym', time: '1st of Month', completed: false, category: 'monthly', desc: 'Sterilize nursery toys' }
    ];
  } else {
    // Toddler (6-18 Months)
    return [
      { id: 't1', task: 'Morning solid food breakfast', time: '08:30 AM', completed: true, category: 'daily', desc: 'Oats, mashed purees, iron-rich solid' },
      { id: 't2', task: 'Offer water in open cup', time: '11:00 AM', completed: false, category: 'daily', desc: 'Practice open cup swallowing' },
      { id: 't3', task: 'Crawling & Motor Play', time: '02:00 PM', completed: true, category: 'daily', desc: 'Place toys just out of reach' },
      { id: 't4', task: 'Afternoon Solid Snack', time: '04:00 PM', completed: false, category: 'daily', desc: 'Soft fruits or steamed carrots' },
      { id: 't5', task: 'Bedtime story & sleep transition', time: '07:30 PM', completed: false, category: 'daily', desc: 'Quiet book reading' },
      { id: 'tw1', task: 'Track height and weight metrics', time: 'Every Friday', completed: false, category: 'weekly', desc: 'Log metrics in growth history' },
      { id: 'tm1', task: 'Inspect baby-proof locks & plugs', time: '15th of Month', completed: false, category: 'monthly', desc: 'Verify electrical outlet safety' }
    ];
  }
};

// Dynamic baby checkup reminders based on DOB (days after birth)
const getBabyCalendarEvents = (baby: ChildProfile): CalendarEvent[] => {
  const birth = new Date(baby.dob);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
  // 2-Month checkup (60 days)
  const d60 = new Date(birth.getTime() + 60 * 24 * 60 * 60 * 1000);
  // 4-Month checkup (120 days)
  const d120 = new Date(birth.getTime() + 120 * 24 * 60 * 60 * 1000);
  // 6-Month checkup (180 days)
  const d180 = new Date(birth.getTime() + 180 * 24 * 60 * 60 * 1000);
  
  return [
    {
      id: 'dynamic_e1',
      title: '2-Month Wellness & Vaccine Visit',
      time: '10:00 AM',
      date: formatDate(d60),
      type: 'vaccination',
      desc: 'Checkup milestone: BCG booster and pediatrician general health check.'
    },
    {
      id: 'dynamic_e2',
      title: '4-Month Growth & Vaccine Visit',
      time: '11:30 AM',
      date: formatDate(d120),
      type: 'vaccination',
      desc: 'Checkup milestone: Polio booster and weight tracker check.'
    },
    {
      id: 'dynamic_e3',
      title: '6-Month Pediatric Checkup',
      time: '09:00 AM',
      date: formatDate(d180),
      type: 'appointment',
      desc: 'Important half-year checkup: Pediatric consultation on starting solid foods.'
    }
  ];
};

const getCombinedCalendarEvents = (baby: ChildProfile, customEvents: CalendarEvent[]): CalendarEvent[] => {
  return [...getBabyCalendarEvents(baby), ...customEvents];
};

const getBabyMilestones = (baby: ChildProfile): MilestoneItem[] => {
  if (baby.milestones && baby.milestones.length > 0) {
    return baby.milestones;
  }
  
  const today = new Date();
  const dob = new Date(baby.dob);
  
  if (today < dob) {
    // Unborn -> Pregnancy Milestones
    const diffTime = dob.getTime() - today.getTime();
    const remainingDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const gestationWeek = Math.max(1, Math.min(40, 40 - Math.floor(remainingDays / 7)));
    
    return initialPregnancyMilestones.map(m => {
      let status: 'achieved' | 'in_progress' | 'upcoming' = 'upcoming';
      let targetWeek = 20;
      if (m.id === 'p_m1') targetWeek = 8;
      else if (m.id === 'p_m2') targetWeek = 13;
      else if (m.id === 'p_m3') targetWeek = 20;
      else if (m.id === 'p_c1') targetWeek = 22;
      else if (m.id === 'p_c2') targetWeek = 26;
      else if (m.id === 'p_cog1') targetWeek = 31;
      else if (m.id === 'p_cog2') targetWeek = 36;
      
      if (gestationWeek > targetWeek) {
        status = 'achieved';
      }
      return { ...m, status };
    });
  }
  
  // Born -> Baby Milestones
  const ageInMonths = calculateAgeInMonths(baby.dob);
  return initialMilestones.map(m => {
    let status: 'achieved' | 'in_progress' | 'upcoming' = 'upcoming';
    if (m.dueMonth < ageInMonths) {
      status = 'achieved';
    }
    return { ...m, status };
  });
};

export default function App() {
  // Simulator State
  const [deviceOS, setDeviceOS] = useState<'ios' | 'android'>('ios');
  
  // App Core States
  const [appFlow, setAppFlow] = useState<string>(() => localStorage.getItem('bamudi_flow') || 'splash');
  const [isDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');

  // Authentication Fields
  const [authName, setAuthName] = useState('Sarah');
  const [authEmail, setAuthEmail] = useState('sarah@email.com');
  const [authPassword, setAuthPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState<string[]>(['', '', '', '', '', '']);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  // User Profile States
  const [motherPhase, setMotherPhase] = useState<'pregnancy' | 'baby'>('baby');
  const [selectedPhase, setSelectedPhase] = useState<string>(() => localStorage.getItem('bamudi_selected_phase') || 'early');
  const [interests, setInterests] = useState<string[]>(['feeding', 'sleep', 'growth', 'activities']);

  // Pregnancy Kick Counter states
  const [pregnancyKicks, setPregnancyKicks] = useState<number>(() => {
    return parseInt(localStorage.getItem('bamudi_kick_count') || '0', 10);
  });
  const [kickHistory, setKickHistory] = useState<{ time: string; count: number }[]>(() => {
    return JSON.parse(localStorage.getItem('bamudi_kick_history') || '[]');
  });

  // Sync kicks to local storage
  useEffect(() => {
    localStorage.setItem('bamudi_kick_count', String(pregnancyKicks));
  }, [pregnancyKicks]);

  useEffect(() => {
    localStorage.setItem('bamudi_kick_history', JSON.stringify(kickHistory));
  }, [kickHistory]);


  
  // Child States
  const [children, setChildren] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem('bamudi_children');
    const parsed: ChildProfile[] = saved ? JSON.parse(saved) : [
      {
        name: 'Ayaan',
        dob: '2026-02-12',
        gender: 'Boy',
        weight: 5.6,
        height: 62,
        head: 38.5,
        growthLogs: [
          { id: '1', age: 'Month 1', weight: 3.2, height: 51, head: 34.2, date: '2026-03-12' },
          { id: '2', age: 'Month 2', weight: 4.1, height: 54, head: 35.5, date: '2026-04-12' },
          { id: '3', age: 'Month 3', weight: 4.8, height: 57, head: 36.8, date: '2026-05-12' },
          { id: '4', age: 'Month 5 (Now)', weight: 5.6, height: 62, head: 38.5, date: '2026-07-12' }
        ],
        vaccineSchedule: [
          { name: 'BCG (Tuberculosis)', date: 'Given: 2026-02-12', status: 'administered' },
          { name: 'HepB Dose 1 & 2', date: 'Given: 2026-03-01', status: 'administered' },
          { name: 'Rotavirus Dose 1', date: 'Given: 2026-04-10', status: 'administered' },
          { name: 'DTaP-IPV-Hib Dose 1', date: 'Due: 2026-07-20', status: 'pending' },
          { name: 'PCV Dose 1', date: 'Due: 2026-07-22', status: 'pending' }
        ]
      },
      {
        name: 'Sophia',
        dob: '2025-09-18',
        gender: 'Girl',
        weight: 8.2,
        height: 71,
        head: 42.5,
        growthLogs: [
          { id: '1', age: 'Month 1', weight: 3.4, height: 52, head: 34.8, date: '2025-10-18' },
          { id: '2', age: 'Month 2', weight: 4.5, height: 56, head: 36.2, date: '2025-11-18' },
          { id: '3', age: 'Month 3', weight: 5.2, height: 60, head: 37.8, date: '2025-12-18' },
          { id: '4', age: 'Month 5 (Now)', weight: 8.2, height: 71, head: 42.5, date: '2026-02-18' }
        ],
        vaccineSchedule: [
          { name: 'BCG (Tuberculosis)', date: 'Given: 2025-09-18', status: 'administered' },
          { name: 'HepB Dose 1 & 2', date: 'Given: 2025-10-10', status: 'administered' },
          { name: 'Rotavirus Dose 1', date: 'Given: 2025-11-15', status: 'administered' },
          { name: 'DTaP-IPV-Hib Dose 1', date: 'Given: 2026-01-20', status: 'administered' },
          { name: 'PCV Dose 1', date: 'Given: 2026-01-22', status: 'administered' }
        ]
      }
    ];
    return parsed.map(c => ({
      ...c,
      checklist: c.checklist && c.checklist.length > 0 ? c.checklist : getChecklistForAge(c.dob)
    }));
  });
  const [activeChildIndex, setActiveChildIndex] = useState(0);

  // Derive checklist state dynamically from the active child
  const checklist = children[activeChildIndex]?.checklist || [];

  // Dynamic automatic motherPhase synchronization based on active baby's DOB
  useEffect(() => {
    const activeBaby = children[activeChildIndex];
    if (activeBaby) {
      const today = new Date();
      const dob = new Date(activeBaby.dob);
      setMotherPhase(today < dob ? 'pregnancy' : 'baby');
    }
  }, [activeChildIndex, children]);

  const [profileSubView, setProfileSubView] = useState<string>(() => localStorage.getItem('bamudi_profile_subview') || 'menu');

  useEffect(() => {
    localStorage.setItem('bamudi_profile_subview', profileSubView);
  }, [profileSubView]);

  const [pediatrician, setPediatrician] = useState(() => {
    const saved = localStorage.getItem('bamudi_pediatrician');
    return saved ? JSON.parse(saved) : { name: 'Dr. Emily Watson, MD', clinic: "St. Mary's Children Clinic", phone: '+15550199' };
  });

  useEffect(() => {
    localStorage.setItem('bamudi_profile_subview', profileSubView);
  }, [profileSubView]);

  useEffect(() => {
    localStorage.setItem('bamudi_pediatrician', JSON.stringify(pediatrician));
  }, [pediatrician]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('bamudi_calendar');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('bamudi_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  // Active Tab in Dashboard
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checklist' | 'calendar' | 'milestones' | 'profile'>('dashboard');

  // Bottom sheets / Modals
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddGrowthModal, setShowAddGrowthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Vaccine Alert', message: 'DTaP-IPV-Hib Dose 1 is due in 9 days.', time: '2 hours ago', read: false },
    { id: 2, title: 'Partner Update', message: 'Ahmad updated nap time log for Ayaan.', time: '5 hours ago', read: false },
    { id: 3, title: 'Weekly Milestone', message: 'Ayaan reached 3 months milestone checklist.', time: 'Yesterday', read: true },
    { id: 4, title: 'New Guide Published', message: 'Read: Scandinavian Sleep routines for newborns.', time: '2 days ago', read: true }
  ]);
  
  // Input fields for modals
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('08:00 AM');
  const [newTaskCat, setNewTaskCat] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-07-10');
  const [newEventTime, setNewEventTime] = useState('10:00 AM');
  const [newEventType, setNewEventType] = useState<'appointment' | 'vaccination' | 'reminder'>('appointment');
  const [newEventDesc, setNewEventDesc] = useState('');

  const [newGrowthWeight, setNewGrowthWeight] = useState('');
  const [newGrowthHeight, setNewGrowthHeight] = useState('');
  const [newGrowthHead, setNewGrowthHead] = useState('');

  // State variables for Principal Redesigned Dashboard Features
  const [showNurseryModal, setShowNurseryModal] = useState(false);
  const [nurseryLogType, setNurseryLogType] = useState<'feed' | 'sleep' | 'diaper'>('feed');
  const [nurseryFeedAmount, setNurseryFeedAmount] = useState('');
  const [nurseryFeedDuration, setNurseryFeedDuration] = useState('');
  const [nurseryFeedMethod, setNurseryFeedMethod] = useState<'Breast' | 'Bottle'>('Breast');
  const [nurserySleepDuration, setNurserySleepDuration] = useState('');
  const [nurserySleepNotes, setNurserySleepNotes] = useState('');
  const [nurseryDiaperType, setNurseryDiaperType] = useState<'Wet' | 'Dirty' | 'Mixed' | 'Dry'>('Wet');

  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [symptomName, setSymptomName] = useState('Morning Sickness');
  const [symptomSeverity, setSymptomSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');

  const [showFoodModal, setShowFoodModal] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodReaction, setFoodReaction] = useState<'like' | 'neutral' | 'dislike' | 'allergy'>('like');

  const [tummyTimeActive, setTummyTimeActive] = useState(false);
  const [tummyTimeSeconds, setTummyTimeSeconds] = useState(0);

  // Tummy time stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (tummyTimeActive) {
      interval = setInterval(() => {
        setTummyTimeSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [tummyTimeActive]);


  // Selected date in Calendar
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Article Search
  const [searchQuery, setSearchQuery] = useState('');

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('bamudi_flow', appFlow);
  }, [appFlow]);

  useEffect(() => {
    localStorage.setItem('bamudi_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('bamudi_selected_phase', selectedPhase);
  }, [selectedPhase]);

  useEffect(() => {
    localStorage.setItem('bamudi_children', JSON.stringify(children));
  }, [children]);

  // Checklist is auto-saved as part of children array



  useEffect(() => {
    localStorage.setItem('bamudi_calendar', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('bamudi_articles', JSON.stringify(articles));
  }, [articles]);

  // Timer simulation for Splash Screen
  useEffect(() => {
    if (appFlow === 'splash') {
      const timer = setTimeout(() => {
        setAppFlow('onboarding');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [appFlow]);

  // Compute stats helper
  const totalTasks = checklist.filter(t => t.category === 'daily').length;
  const completedTasks = checklist.filter(t => t.category === 'daily' && t.completed).length;
  const checklistPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const currentBaby = children[activeChildIndex] || { name: 'Baby', weight: 5.6, height: 62, dob: '2026-02-12' };

  // Calculate age string
  const calculateBabyAge = (dobString: string) => {
    const dob = new Date(dobString);
    const today = new Date();
    
    if (today < dob) {
      const diffTime = dob.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Expected in ${diffDays} Days`;
    }
    
    let months = (today.getFullYear() - dob.getFullYear()) * 12 + today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    
    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    return `${months} Months, ${days} Days`;
  };



  // Custom SVG Illustration Drawers
  const drawSplashLogo = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="url(#splash_circle_grad)" />
      <path d="M60 25C40 25 32 45 32 60C32 75 42 88 60 88C78 88 88 75 88 60C88 45 80 25 60 25ZM60 80C47 80 42 70 42 60C42 49 48 37 60 37C72 37 78 49 78 60C78 70 73 80 60 80Z" fill="#FFFFFF" />
      <path d="M60 44C51 44 48 51 48 58C48 65 52 71 60 71C68 71 72 65 72 58C72 51 69 44 60 44ZM60 65C56 65 54 62 54 58C54 54 56 50 60 50C64 50 66 54 66 58C66 62 64 65 60 65Z" fill="#FFC9A3" />
      <path d="M60 52C58 52 57.5 53.5 57.5 55C57.5 56.5 58 58 60 58C62 58 62.5 56.5 62.5 55C62.5 53.5 62 52 60 52Z" fill="#FFFFFF" />
      <defs>
        <linearGradient id="splash_circle_grad" x1="60" y1="6" x2="60" y2="114" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E07A4A" />
          <stop offset="1" stopColor="#F0A06E" />
        </linearGradient>
      </defs>
    </svg>
  );

  // OTP Simulated Input click helper
  const handleOtpKeyPress = (num: number) => {
    if (activeOtpIndex < 6) {
      const nextOtp = [...otpCode];
      nextOtp[activeOtpIndex] = String(num);
      setOtpCode(nextOtp);
      setActiveOtpIndex(prev => Math.min(prev + 1, 5));
    }
  };

  const handleOtpDelete = () => {
    const nextOtp = [...otpCode];
    if (otpCode[activeOtpIndex] === '' && activeOtpIndex > 0) {
      nextOtp[activeOtpIndex - 1] = '';
      setOtpCode(nextOtp);
      setActiveOtpIndex(prev => prev - 1);
    } else {
      nextOtp[activeOtpIndex] = '';
      setOtpCode(nextOtp);
    }
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join('');
    if (code === '624199' || code.length === 6) {
      setAppFlow('create_mother_profile');
    } else {
      alert('Verification success code simulated! Transitioning details.');
      setAppFlow('create_mother_profile');
    }
  };

  // Interests Selection Toggle
  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Toggle checklist complete
  const toggleChecklistItem = (id: string) => {
    setChildren(prev =>
      prev.map((c, i) =>
        i === activeChildIndex
          ? {
              ...c,
              checklist: (c.checklist || []).map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
              )
            }
          : c
      )
    );
  };
  // Delete checklist item
  const deleteChecklistItem = (id: string) => {
    setChildren(prev =>
      prev.map((c, i) =>
        i === activeChildIndex
          ? {
              ...c,
              checklist: (c.checklist || []).filter(item => item.id !== id)
            }
          : c
      )
    );
  };

  // Delete calendar event
  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(prev => prev.filter(e => e.id !== id));
  };

  // Add Custom Task
  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    const item: ChecklistItem = {
      id: String(Date.now()),
      task: newTaskName,
      time: newTaskTime,
      completed: false,
      category: newTaskCat
    };
    setChildren(prev =>
      prev.map((c, i) =>
        i === activeChildIndex
          ? {
              ...c,
              checklist: [...(c.checklist || []), item]
            }
          : c
      )
    );
    setNewTaskName('');
    setShowAddTaskModal(false);
  };

  // Add Calendar Event
  const handleAddNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const event: CalendarEvent = {
      id: String(Date.now()),
      title: newEventTitle,
      time: newEventTime,
      date: newEventDate,
      type: newEventType,
      desc: newEventDesc || 'No additional details provided.'
    };
    setCalendarEvents(prev => [...prev, event]);
    setNewEventTitle('');
    setNewEventDesc('');
    setShowAddEventModal(false);
  };

  // Add Growth checkpoint
  const handleAddNewGrowth = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newGrowthWeight);
    const h = parseFloat(newGrowthHeight);
    const hc = parseFloat(newGrowthHead);
    if (isNaN(w) || isNaN(h) || isNaN(hc)) return;

    setChildren(prev => {
      const copy = [...prev];
      if (copy[activeChildIndex]) {
        const dob = copy[activeChildIndex].dob;
        const months = Math.max(1, Math.round((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 30.4)));
        const ageLabel = `Month ${months} (Today)`;
        const newLog: GrowthLog = {
          id: String(Date.now()),
          age: ageLabel,
          weight: w,
          height: h,
          head: hc,
          date: new Date().toISOString().split('T')[0]
        };

        copy[activeChildIndex] = {
          ...copy[activeChildIndex],
          weight: w,
          height: h,
          head: hc,
          growthLogs: [...(copy[activeChildIndex].growthLogs || []), newLog]
        };
      }
      return copy;
    });

    setNewGrowthWeight('');
    setNewGrowthHeight('');
    setNewGrowthHead('');
    setShowAddGrowthModal(false);
  };

  // Log Nursery Event (Feed/Sleep/Diaper)
  const handleAddNewNurseryLog = (e: React.FormEvent) => {
    e.preventDefault();
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        let title = '';
        let desc = '';
        if (nurseryLogType === 'feed') {
          title = `${nurseryFeedMethod} Feeding Log`;
          desc = nurseryFeedMethod === 'Bottle'
            ? `${nurseryFeedAmount} ml bottle feed. Duration: ${nurseryFeedDuration} mins.`
            : `Breastfeed session. Duration: ${nurseryFeedDuration} mins.`;
        } else if (nurseryLogType === 'sleep') {
          title = 'Sleep / Nap Duration Log';
          desc = `${nurserySleepDuration} mins nap. Notes: ${nurserySleepNotes || 'No notes'}`;
        } else {
          title = 'Diaper Checked';
          desc = `${nurseryDiaperType} Diaper Change. Skin clean, no rash.`;
        }

        const newLog = {
          id: String(Date.now()),
          type: nurseryLogType,
          title,
          desc,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }) + ')',
          timestamp: Date.now()
        };

        copy[activeChildIndex] = {
          ...activeChild,
          nurseryLogs: [newLog, ...(activeChild.nurseryLogs || [])]
        };
      }
      return copy;
    });

    setNurseryFeedAmount('');
    setNurseryFeedDuration('');
    setNurserySleepDuration('');
    setNurserySleepNotes('');
    setShowNurseryModal(false);
  };

  // Log Symptom (Pregnancy)
  const handleAddNewSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        const newLog = {
          id: String(Date.now()),
          name: symptomName,
          severity: symptomSeverity,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }) + ')'
        };
        copy[activeChildIndex] = {
          ...activeChild,
          symptomsLog: [newLog, ...(activeChild.symptomsLog || [])]
        };
      }
      return copy;
    });
    setShowSymptomModal(false);
  };

  // Log Hydration
  const handleLogHydration = (amount: number) => {
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        copy[activeChildIndex] = {
          ...activeChild,
          hydrationLog: (activeChild.hydrationLog || 0) + amount
        };
      }
      return copy;
    });
  };

  // Reset Hydration (for test and daily reset)
  const handleResetHydration = () => {
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        copy[activeChildIndex] = {
          ...activeChild,
          hydrationLog: 0
        };
      }
      return copy;
    });
  };

  // Log Food Reaction (Toddler)
  const handleAddNewFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        const newLog = {
          id: String(Date.now()),
          food: foodName,
          reaction: foodReaction,
          date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
        };
        copy[activeChildIndex] = {
          ...activeChild,
          foodLogs: [newLog, ...(activeChild.foodLogs || [])]
        };
      }
      return copy;
    });
    setFoodName('');
    setShowFoodModal(false);
  };

  // Log Tummy Time Duration
  const handleSaveTummyTime = () => {
    if (tummyTimeSeconds === 0) return;
    const durationMins = Math.round(tummyTimeSeconds / 60) || 1;
    setChildren(prev => {
      const copy = [...prev];
      const activeChild = copy[activeChildIndex];
      if (activeChild) {
        const newLog = {
          id: String(Date.now()),
          type: 'sleep' as const, // Category under activities
          title: 'Tummy Time Session',
          desc: `Completed tummy time for ${durationMins} min(s) to boost neck & core muscles.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now()
        };
        copy[activeChildIndex] = {
          ...activeChild,
          nurseryLogs: [newLog, ...(activeChild.nurseryLogs || [])]
        };
      }
      return copy;
    });
    setTummyTimeSeconds(0);
    setTummyTimeActive(false);
    alert('Tummy Time logged successfully! 💪');
  };



  // Toggle Save Article
  const toggleSaveArticle = (id: string) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, saved: !a.saved } : a
      )
    );
    if (activeArticle && activeArticle.id === id) {
      setActiveArticle(prev => prev ? { ...prev, saved: !prev.saved } : null);
    }
  };

  // Toggle Read Article
  const toggleReadArticle = (id: string) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, read: !a.read } : a
      )
    );
    if (activeArticle && activeArticle.id === id) {
      setActiveArticle(prev => prev ? { ...prev, read: !prev.read } : null);
    }
  };

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    setArticles(prev =>
      prev.map(a =>
        a.id === art.id ? { ...a, read: true } : a
      )
    );
  };

  // Reset demo account
  const handleLogout = () => {
    setAppFlow('onboarding');
    setOtpCode(['', '', '', '', '', '']);
    setActiveOtpIndex(0);
    setActiveTab('dashboard');
  };

  // Filtered Articles
  const filteredArticles = articles.filter(a => {
    const query = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(query) ||
           a.category.toLowerCase().includes(query) ||
           a.summary.toLowerCase().includes(query);
  });

  return (
    <div className="workbench-container">
      {/* Platform Toggle Controller (Wow Factor) */}
      <div className="workbench-header">
        <h1 className="workbench-title">Bamudi Kompass</h1>
        <p className="workbench-subtitle">Premium Parenting Companion & Pregnancy Companion Simulator</p>
      </div>

      <div className="simulator-controls">
        <button
          className={`simulator-btn ${deviceOS === 'ios' ? 'active' : ''}`}
          onClick={() => setDeviceOS('ios')}
        >
          <Smartphone size={16} /> iOS Simulator (iPhone 16)
        </button>
        <button
          className={`simulator-btn ${deviceOS === 'android' ? 'active' : ''}`}
          onClick={() => setDeviceOS('android')}
        >
          <Smartphone size={16} /> Android Simulator (Pixel 9)
        </button>
      </div>

      {/* Main Simulation View */}
      <div className="simulator-layout">
        
        {/* Device Frame */}
        <div className={`phone-mockup ${deviceOS} ${isDarkMode ? 'dark-mode' : ''}`}>
          
          {/* iOS Camera / Dynamic Island */}
          {deviceOS === 'ios' && (
            <div className="ios-dynamic-island">
              <Heart size={10} color="#F46B8A" fill="#F46B8A" />
              <span>Bamudi</span>
            </div>
          )}

          {/* Android Punch Hole Camera */}
          {deviceOS === 'android' && (
            <div className="android-punch-hole"></div>
          )}

          {/* Phone Bezel Interior Screen */}
          <div
            className={`phone-screen ${isDarkMode ? 'dark-mode' : ''}`}
            style={{
              background: getDynamicBackground(
                currentBaby ? getChildPhase(currentBaby.dob) : 'newborn'
              )
            }}
          >
            
            {/* Status Bar */}
            <div className="phone-status-bar">
              <span className="time">16:05</span>
              <div className="status-bar-icons">
                <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                  <path d="M2 10h1v1H2v-1zm3-2h1v3H5V8zm3-2h1v5H8V6zm3-2h1v7h-1V4zm3-2h1v9h-1V2z" />
                </svg>
                <span style={{ fontSize: '11px' }}>5G</span>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
                  <rect x="1" y="1" width="18" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                  <rect x="3" y="3" width="12" height="5" rx="0.5" />
                  <path d="M20 4v3" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Application Inside Wrapper */}
            <div className="app-container">
              
              {/* FLOW 1: SPLASH SCREEN */}
              {appFlow === 'splash' && (
                <div className="screen-scroll-container onboarding-splash" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: '20px' }}>
                  <div className="animate-splash" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
                    {drawSplashLogo()}
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '34px', color: '#3D2B1F', fontWeight: '700' }}>Bamudi</h2>
                      <p style={{ color: '#7BA87A', fontSize: '15px', marginTop: '6px', fontWeight: '600' }}>Sanfter Wehen-Timer</p>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '40px', height: '4px', background: '#E07A4A', borderRadius: '10px' }} />
                    <span style={{ fontSize: '11px', color: '#8A7464', fontWeight: '600' }}>LOADING YOUR COMPANION</span>
                  </div>
                </div>
              )}

              {/* FLOW 2: ONBOARDING */}
              {appFlow === 'onboarding' && (
                <OnboardingScreen onFinish={() => setAppFlow('signup')} />
              )}

              {/* FLOW 3: SIGN UP */}
              {appFlow === 'signup' && (
                <div className="screen-scroll-container animate-fade-in">
                  <div style={{ padding: '10px 0 20px 0' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>Let's create your account to get started!</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setAppFlow('verification'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                    <div className="input-group">
                      <span className="input-label">Full Name</span>
                      <input
                        type="text"
                        className="input-field"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Sarah Connor"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-label">Email Address</span>
                      <input
                        type="email"
                        className="input-field"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="sarah@email.com"
                        required
                      />
                    </div>

                    <div className="input-group" style={{ position: 'relative' }}>
                      <span className="input-label">Password</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input-field"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '14px', top: '38px', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                      Sign Up <ChevronRight size={18} />
                    </button>
                  </form>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '24px 0', width: '100%' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>or continue with</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-secondary" style={{ flex: 1, padding: '12px', fontSize: '14px', borderRadius: '16px' }} onClick={() => setAppFlow('verification')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.38-2.87-6.38-6.38s2.87-6.38 6.38-6.38c1.53 0 2.98.53 4.12 1.5l3.05-3.05C19.23 2.385 15.92 1.135 12.24 1.135c-6.07 0-11 4.93-11 11s4.93 11 11 11c5.8 0 10.87-4.14 10.87-11 0-.69-.07-1.39-.23-2.065H12.24z"/>
                      </svg> Google
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, padding: '12px', fontSize: '14px', borderRadius: '16px' }} onClick={() => setAppFlow('verification')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33"/>
                      </svg> Apple
                    </button>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Already have an account? </span>
                    <button onClick={() => setAppFlow('login')} style={{ background: 'none', border: 'none', color: 'var(--mother-primary)', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Login</button>
                  </div>
                </div>
              )}

              {/* FLOW 4: EMAIL VERIFICATION */}
              {appFlow === 'verification' && (
                <div className="screen-scroll-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '10px 0 10px 0' }}>
                    <button onClick={() => setAppFlow('signup')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '16px' }}>Verify Your Email</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px' }}>We've sent a 6-digit code to <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{authEmail}</span></p>
                  </div>

                  {/* OTP Block View */}
                  <div className="otp-input-container">
                    {otpCode.map((char, index) => (
                      <div
                        key={index}
                        className={`otp-box ${index === activeOtpIndex ? 'active' : ''}`}
                        onClick={() => setActiveOtpIndex(index)}
                      >
                        {char}
                      </div>
                    ))}
                  </div>

                  {/* Verification Mail Graphic */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="120" height="90" rx="16" fill="#F1EDFF" />
                      <path d="M10 20 L60 55 L110 20" stroke="#8A6BFF" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="60" cy="55" r="14" fill="#8A6BFF" />
                      <path d="M55 55 L58 58 L65 51" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>

                  <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-secondary)', margin: '14px 0 20px 0' }}>
                    Resend code in <span style={{ color: 'var(--color-text-primary)', fontWeight: '700' }}>00:45</span>
                  </p>

                  <button className="btn-primary" onClick={handleVerifyOtp} style={{ marginBottom: '20px' }}>
                    Verify <Check size={18} />
                  </button>

                  {/* Keyboard Simulator (Premium Interaction) */}
                  <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '20px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', justifyItems: 'center' }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleOtpKeyPress(num)}
                          style={{ width: '100%', height: '40px', background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '10px', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        onClick={() => handleOtpKeyPress(0)}
                        type="button"
                        style={{ gridColumn: '2', width: '100%', height: '40px', background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '10px', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '18px', cursor: 'pointer' }}
                      >
                        0
                      </button>
                      <button
                        onClick={handleOtpDelete}
                        type="button"
                        style={{ width: '100%', height: '40px', background: '#FFE4E4', border: '1px solid var(--color-border)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B6B', fontWeight: '700' }}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 5: LOGIN */}
              {appFlow === 'login' && (
                <div className="screen-scroll-container animate-fade-in">
                  <div style={{ padding: '10px 0 20px 0' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>Sign in to continue your journey</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setAppFlow('create_mother_profile'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                    <div className="input-group">
                      <span className="input-label">Email Address</span>
                      <input
                        type="email"
                        className="input-field"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="sarah@email.com"
                        required
                      />
                    </div>

                    <div className="input-group" style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span className="input-label">Password</span>
                        <button
                          type="button"
                          onClick={() => setAppFlow('forgot_password')}
                          style={{ background: 'none', border: 'none', color: 'var(--mother-primary)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Forgot?
                        </button>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input-field"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '14px', top: '38px', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                      Login <ChevronRight size={18} />
                    </button>
                  </form>

                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>New to Bamudi? </span>
                    <button onClick={() => setAppFlow('signup')} style={{ background: 'none', border: 'none', color: 'var(--mother-primary)', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Sign Up</button>
                  </div>
                </div>
              )}

              {/* FLOW 6: FORGOT PASSWORD */}
              {appFlow === 'forgot_password' && (
                <div className="screen-scroll-container animate-fade-in">
                  <div style={{ padding: '10px 0 20px 0' }}>
                    <button onClick={() => setAppFlow('login')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '16px' }}>Reset Password</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>Enter your email to receive recovery instructions.</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); alert('Reset link simulated!'); setAppFlow('login'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                    <div className="input-group">
                      <span className="input-label">Email Address</span>
                      <input
                        type="email"
                        className="input-field"
                        value={authEmail}
                        placeholder="sarah@email.com"
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                      Send Reset Instructions
                    </button>
                  </form>
                </div>
              )}

              {/* FLOW 7: CREATE MOTHER PROFILE */}
              {appFlow === 'create_mother_profile' && (
                <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--mother-primary)' } as React.CSSProperties}>
                  <div style={{ padding: '10px 0 20px 0' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Create Profile</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>Let's customize your companion experience!</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--mother-secondary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '3px solid #FFF', boxShadow: 'var(--shadow-premium)' }}>
                        <User size={38} color="var(--mother-primary)" />
                      </div>
                      <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--mother-primary)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', boxShadow: 'var(--shadow-sm)' }}>
                        <Camera size={14} />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setAppFlow('create_baby_profile'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="input-group">
                      <span className="input-label">Mother's Name</span>
                      <input
                        type="text"
                        className="input-field"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Sarah"
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                      Next <ChevronRight size={18} />
                    </button>
                  </form>
                </div>
              )}

              {/* FLOW 8: CREATE BABY PROFILE */}
              {appFlow === 'create_baby_profile' && (
                <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--baby-primary)' } as React.CSSProperties}>
                  <div style={{ padding: '10px 0 20px 0' }}>
                    <button onClick={() => setAppFlow('create_mother_profile')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '16px' }}>Add Your Baby</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>Personalize the care and growth guides!</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--baby-secondary)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '3px solid #FFF', boxShadow: 'var(--shadow-premium)' }}>
                        <Baby size={38} color="var(--baby-primary)" />
                      </div>
                      <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--baby-primary)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF', boxShadow: 'var(--shadow-sm)' }}>
                        <Camera size={14} />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setAppFlow('select_phase');
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div className="input-group">
                      <span className="input-label">Baby's Name</span>
                      <input
                        type="text"
                        className="input-field"
                        value={currentBaby.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setChildren(prev => {
                            const next = [...prev];
                            if (next[activeChildIndex]) next[activeChildIndex].name = name;
                            return next;
                          });
                        }}
                        placeholder="Ayaan"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-label">
                        {currentBaby && currentBaby.dob && new Date(currentBaby.dob) > new Date() ? 'Expected Due Date' : 'Date of Birth'}
                      </span>
                      <input
                        type="date"
                        className="input-field"
                        value={currentBaby.dob}
                        onChange={(e) => {
                          const dob = e.target.value;
                          setChildren(prev => {
                            const next = [...prev];
                            if (next[activeChildIndex]) next[activeChildIndex].dob = dob;
                            return next;
                          });
                        }}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-label">Gender</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {['Boy', 'Girl', 'Surprise'].map(g => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setChildren(prev => {
                                const next = [...prev];
                                if (next[activeChildIndex]) next[activeChildIndex].gender = g;
                                return next;
                              });
                            }}
                            className={`btn-secondary ${currentBaby.gender === g ? 'active' : ''}`}
                            style={{
                              flex: 1,
                              borderRadius: '16px',
                              padding: '12px 0',
                              border: currentBaby.gender === g ? '2.5px solid var(--baby-primary)' : '1px solid var(--color-border)',
                              background: currentBaby.gender === g ? 'var(--baby-secondary)' : '#FFF'
                            }}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                      Next <ChevronRight size={18} />
                    </button>
                  </form>
                </div>
              )}

              {/* FLOW 9: SELECT PHASE DETAILS */}
              {appFlow === 'select_phase' && (
                <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--mother-primary)' } as React.CSSProperties}>
                  <div style={{ padding: '10px 0 10px 0' }}>
                    <button onClick={() => setAppFlow('create_baby_profile')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '16px' }}>Select Current Phase</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px' }}>Helps us share relevant content matching your baby's exact age</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    {[
                      { title: 'Pregnancy', subtitle: 'Track your journey week-by-week', color: 'var(--mother-primary)', bg: 'var(--mother-secondary)', label: 'pregnancy' },
                      { title: '0 - 30 Days', subtitle: 'Newborn care, sleep, and core recovery', color: 'var(--baby-primary)', bg: 'var(--baby-secondary)', label: 'newborn' },
                      { title: '0 - 6 Months', subtitle: 'Early milestones, sensory exercises', color: 'var(--dev-primary)', bg: 'var(--dev-secondary)', label: 'early' },
                      { title: '6 - 18 Months', subtitle: 'Growing explorer, solids, walking guides', color: 'var(--cal-primary)', bg: 'var(--cal-secondary)', label: 'growing' }
                    ].map((phase, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedPhase(phase.label);
                          setMotherPhase(phase.label === 'pregnancy' ? 'pregnancy' : 'baby');
                          setAppFlow('select_interests');
                        }}
                        className="premium-card"
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', cursor: 'pointer', border: '1px solid var(--color-border)' }}
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: phase.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Baby size={22} color={phase.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: '700' }}>{phase.title}</h4>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginTop: '2px' }}>{phase.subtitle}</p>
                        </div>
                        <ChevronRight size={16} color="var(--color-text-secondary)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FLOW 10: CHOOSE INTERESTS */}
              {appFlow === 'select_interests' && (
                <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--mother-primary)' } as React.CSSProperties}>
                  <div style={{ padding: '10px 0 10px 0' }}>
                    <button onClick={() => setAppFlow('select_phase')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '16px' }}>Choose Your Interests</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '6px' }}>Select topics you want to follow for personalized insights</p>
                  </div>

                  <div className="category-grid" style={{ marginTop: '20px' }}>
                    {[
                      { key: 'feeding', label: 'Feeding', icon: <Heart size={18} />, color: 'var(--mother-primary)', bg: 'var(--mother-secondary)' },
                      { key: 'sleep', label: 'Sleep', icon: <Clock size={18} />, color: 'var(--cal-primary)', bg: 'var(--cal-secondary)' },
                      { key: 'health', label: 'Health & Vax', icon: <Activity size={18} />, color: 'var(--baby-primary)', bg: 'var(--baby-secondary)' },
                      { key: 'growth', label: 'Growth Tracking', icon: <TrendingUp size={18} />, color: 'var(--baby-primary)', bg: 'var(--baby-secondary)' },
                      { key: 'activities', label: 'Activities', icon: <Award size={18} />, color: 'var(--dev-primary)', bg: 'var(--dev-secondary)' },
                      { key: 'tips', label: 'Parenting Tips', icon: <BookOpen size={18} />, color: 'var(--article-primary)', bg: 'var(--article-secondary)' }
                    ].map(item => {
                      const isSelected = interests.includes(item.key);
                      return (
                        <div
                          key={item.key}
                          onClick={() => toggleInterest(item.key)}
                          className="category-card"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '16px 8px',
                            borderWidth: isSelected ? '2px' : '1px',
                            borderColor: isSelected ? item.color : 'var(--color-border)',
                            backgroundColor: isSelected ? item.bg : '#FFFFFF'
                          }}
                        >
                          <div style={{ color: isSelected ? item.color : 'var(--color-text-secondary)' }}>{item.icon}</div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={() => setAppFlow('permission_notification')} className="btn-primary" style={{ marginTop: '30px' }}>
                    Done <Check size={18} />
                  </button>
                </div>
              )}

              {/* FLOW 11: NOTIFICATION PERMISSION */}
              {appFlow === 'permission_notification' && (
                <div className="screen-scroll-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingBottom: '30px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--mother-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: 'var(--shadow-premium)' }}>
                    <Bell size={36} color="var(--mother-primary)" />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: '800' }}>Stay Connected</h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '10px', lineHeight: '1.5', maxWidth: '300px' }}>
                    Get daily summaries, custom alerts, vaccine updates, and milestones reminders customized for Ayaan.
                  </p>

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px' }}>
                    <button className="btn-primary" onClick={() => setAppFlow('permission_location')}>
                      Allow Notifications
                    </button>
                    <button className="btn-secondary" onClick={() => setAppFlow('permission_location')}>
                      Not Now
                    </button>
                  </div>
                </div>
              )}

              {/* FLOW 12: LOCATION PERMISSION */}
              {appFlow === 'permission_location' && (
                <div className="screen-scroll-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingBottom: '30px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--cal-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: 'var(--shadow-premium)' }}>
                    <MapPin size={36} color="var(--cal-primary)" />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: '800' }}>Find Near Services</h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '10px', lineHeight: '1.5', maxWidth: '300px' }}>
                    Access location information to locate nearest pediatric clinics, diaper stores, and child care centers.
                  </p>

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px' }}>
                    <button className="btn-primary" style={{ '--theme-color': 'var(--cal-primary)' } as React.CSSProperties} onClick={() => setAppFlow('dashboard')}>
                      Share My Location
                    </button>
                    <button className="btn-secondary" onClick={() => setAppFlow('dashboard')}>
                      Not Now
                    </button>
                  </div>
                </div>
              )}

              {/* FLOW 13: CORE DASHBOARD TABS AND MAIN PANELS */}
              {appFlow === 'dashboard' && (
                <>
                  {activeArticle ? (
                    <div className="screen-scroll-container animate-fade-in" style={{ paddingBottom: '90px', '--theme-color': 'var(--article-primary)' } as React.CSSProperties}>
                      {/* Back Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px' }}>
                        <button onClick={() => setActiveArticle(null)} style={{ background: 'none', border: 'none', color: 'var(--article-primary)', fontSize: '14.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ChevronLeft size={16} /> Back
                        </button>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => toggleSaveArticle(activeArticle.id)}
                            style={{ background: 'none', border: 'none', color: activeArticle.saved ? 'var(--article-primary)' : 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                          >
                            <Bookmark size={20} fill={activeArticle.saved ? 'var(--article-primary)' : 'none'} />
                          </button>
                          <button onClick={() => alert('Article link copied to clipboard!')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}>
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Cover Photo */}
                      <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-premium)', marginBottom: '20px', height: '180px' }}>
                        <img
                          src={activeArticle.id === 'art1' || activeArticle.id === 'art3' ? '/baby_sleep.png' : activeArticle.id === 'art2' ? '/mother_baby.png' : '/pregnancy.png'}
                          alt={activeArticle.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                          <span className="badge badge-article" style={{ boxShadow: 'var(--shadow-sm)', ...getCategoryBadgeStyle(activeArticle.category) }}>
                            {activeArticle.category}
                          </span>
                        </div>
                      </div>

                      {/* Title & Metadata */}
                      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: '1.25', letterSpacing: '-0.02em' }}>
                          {activeArticle.title}
                        </h2>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--article-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                            ✍️
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{activeArticle.author}</span>
                            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)' }}>{activeArticle.readTime} • Verified Expert Guide</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', color: 'var(--color-text-primary)', fontSize: '14.5px', lineHeight: '1.65', textAlign: 'left' }}>
                        {/* Summary Block */}
                        <div style={{
                          backgroundColor: 'var(--article-secondary)',
                          borderLeft: '4px solid var(--article-primary)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          marginBottom: '20px',
                          color: 'var(--color-text-primary)',
                          fontSize: '14px',
                          fontWeight: '550'
                        }}>
                          {activeArticle.summary}
                        </div>

                        {/* Article Main Text paragraphs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                          {activeArticle.content.split('\n').map((p, i) => (
                            <p key={i} style={{ margin: 0 }}>{p}</p>
                          ))}
                        </div>

                        {/* Key takeaways callout block */}
                        <div style={{
                          backgroundColor: '#FFFDF9',
                          border: '1.5px dashed var(--dev-primary)',
                          borderRadius: '20px',
                          padding: '16px',
                          marginTop: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: 'var(--dev-primary)', textTransform: 'uppercase' }}>
                            💡 Key Takeaway
                          </span>
                          <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', margin: 0, lineHeight: '1.5' }}>
                            {activeArticle.id === 'art1' && 'Breastmilk or formula remains the core source of food. Don\'t rush solids without pediatric alignment.'}
                            {activeArticle.id === 'art2' && 'Narrate simple activities, read together, and sensory-explore textures to stimulate synaptic links.'}
                            {activeArticle.id === 'art3' && 'Always follow bare-crib guidelines. Keep room temperature moderate and use light sleep sacks.'}
                            {activeArticle.id === 'art4' && 'Postpartum healing is slow. Give yourself space, hydrate, rest when possible, and accept support.'}
                          </p>
                        </div>
                      </div>

                      {/* Read status toggle at bottom */}
                      <button
                        className="btn-primary"
                        style={{
                          marginTop: '28px',
                          backgroundColor: activeArticle.read ? 'var(--color-border)' : 'var(--article-primary)',
                          color: activeArticle.read ? 'var(--color-text-primary)' : '#FFF',
                          borderRadius: '16px',
                          padding: '12px',
                          fontSize: '14.5px',
                          fontWeight: '700',
                          boxShadow: activeArticle.read ? 'none' : '0 4px 14px rgba(138, 107, 255, 0.25)'
                        }}
                        onClick={() => {
                          toggleReadArticle(activeArticle.id);
                        }}
                      >
                        {activeArticle.read ? 'Mark as Unread' : 'Mark as Read ✓'}
                      </button>
                    </div>
                  ) : showNotifications ? (
                    <div className="screen-scroll-container animate-fade-in" style={{ paddingBottom: '90px', '--theme-color': 'var(--mother-primary)' } as React.CSSProperties}>
                      {/* Back Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px' }}>
                        <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: 'var(--mother-primary)', fontSize: '14.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ChevronLeft size={16} /> Back
                        </button>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {notifications.some(n => !n.read) && (
                            <button
                              onClick={() => {
                                setNotifications(notifications.map(n => ({ ...n, read: true })));
                              }}
                              style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontSize: '12.5px', fontWeight: '750', cursor: 'pointer' }}
                            >
                              Mark read
                            </button>
                          )}
                          {notifications.length > 0 && (
                            <button
                              onClick={() => {
                                setNotifications([]);
                              }}
                              style={{ background: 'none', border: 'none', color: 'var(--reminder-primary)', fontSize: '12.5px', fontWeight: '750', cursor: 'pointer' }}
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Header title */}
                      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Notifications 🔔</h2>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          Stay updated with clinical visits, developmental milestones, and spouse sync activities.
                        </p>
                      </div>

                      {/* Notification list container */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {notifications.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '60px 10px', color: 'var(--color-text-secondary)' }}>
                            <span style={{ fontSize: '48px', display: 'block', marginBottom: '10px', opacity: 0.5 }}>🔔</span>
                            <p style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--color-text-primary)' }}>All caught up!</p>
                            <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>No new notifications are available.</p>
                          </div>
                        ) : (
                          notifications.map(notif => {
                            let iconBg = 'var(--dev-secondary)';
                            let iconColor = 'var(--dev-primary)';
                            let notifIcon = <Bell size={16} />;
                            
                            if (notif.title.includes('Vaccine')) {
                              iconBg = 'var(--cal-secondary)';
                              iconColor = 'var(--cal-primary)';
                              notifIcon = <Award size={16} />;
                            } else if (notif.title.includes('Partner')) {
                              iconBg = 'var(--mother-secondary)';
                              iconColor = 'var(--mother-primary)';
                              notifIcon = <Share2 size={16} />;
                            } else if (notif.title.includes('Milestone')) {
                              iconBg = 'var(--baby-secondary)';
                              iconColor = 'var(--baby-primary)';
                              notifIcon = <TrendingUp size={16} />;
                            } else if (notif.title.includes('Guide')) {
                              iconBg = 'var(--article-secondary)';
                              iconColor = 'var(--article-primary)';
                              notifIcon = <BookOpen size={16} />;
                            }
                            
                            return (
                              <div
                                key={notif.id}
                                onClick={() => {
                                  setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
                                }}
                                style={{
                                  padding: '14px 16px',
                                  background: notif.read ? 'var(--bg-surface)' : 'rgba(244, 107, 138, 0.04)',
                                  border: notif.read ? '1px solid var(--color-border)' : '1px solid rgba(244, 107, 138, 0.15)',
                                  borderRadius: '20px',
                                  display: 'flex',
                                  gap: '12px',
                                  position: 'relative',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  textAlign: 'left'
                                }}
                              >
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '12px',
                                  backgroundColor: iconBg,
                                  color: iconColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  {notifIcon}
                                </div>

                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--color-text-primary)' }}>{notif.title}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>{notif.time}</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setNotifications(notifications.filter(n => n.id !== notif.id));
                                        }}
                                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                                      >
                                        <Trash size={13} style={{ opacity: 0.6 }} />
                                      </button>
                                    </div>
                                  </div>
                                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: '1.45', margin: '4px 0 0 0' }}>{notif.message}</p>
                                </div>
                                
                                {!notif.read && (
                                  <div style={{ position: 'absolute', top: '18px', left: '8px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--mother-primary)' }}></div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Tab 1: Home Dashboard */}
                      {activeTab === 'dashboard' && (
                        <DashboardModule
                          authName={authName}
                          currentBaby={currentBaby}
                          ageString={calculateBabyAge(currentBaby.dob)}
                          checklistPercent={checklistPercent}
                          checklist={checklist}
                          toggleChecklistItem={toggleChecklistItem}
                          milestones={getBabyMilestones(currentBaby)}
                          calendarEvents={getCombinedCalendarEvents(currentBaby, calendarEvents)}
                          articles={articles}
                          setActiveTab={setActiveTab}
                          setActiveArticle={handleOpenArticle}
                          childrenProfiles={children}
                          activeChildIndex={activeChildIndex}
                          setActiveChildIndex={setActiveChildIndex}
                          setShowNotifications={setShowNotifications}
                          notificationsCount={notifications.filter(n => !n.read).length}
                          setProfileSubView={setProfileSubView}
                          setSelectedDate={setSelectedDate}
                          pregnancyKicks={pregnancyKicks}
                          setPregnancyKicks={setPregnancyKicks}
                          kickHistory={kickHistory}
                          setKickHistory={setKickHistory}
                          setShowAddGrowthModal={setShowAddGrowthModal}
                          showNurseryModal={showNurseryModal}
                          setShowNurseryModal={setShowNurseryModal}
                          nurseryLogType={nurseryLogType}
                          setNurseryLogType={setNurseryLogType}
                          nurseryFeedAmount={nurseryFeedAmount}
                          setNurseryFeedAmount={setNurseryFeedAmount}
                          nurseryFeedDuration={nurseryFeedDuration}
                          setNurseryFeedDuration={setNurseryFeedDuration}
                          nurseryFeedMethod={nurseryFeedMethod}
                          setNurseryFeedMethod={setNurseryFeedMethod}
                          nurserySleepDuration={nurserySleepDuration}
                          setNurserySleepDuration={setNurserySleepDuration}
                          nurserySleepNotes={nurserySleepNotes}
                          setNurserySleepNotes={setNurserySleepNotes}
                          nurseryDiaperType={nurseryDiaperType}
                          setNurseryDiaperType={setNurseryDiaperType}
                          handleAddNewNurseryLog={handleAddNewNurseryLog}
                          showSymptomModal={showSymptomModal}
                          setShowSymptomModal={setShowSymptomModal}
                          symptomName={symptomName}
                          setSymptomName={setSymptomName}
                          symptomSeverity={symptomSeverity}
                          setSymptomSeverity={setSymptomSeverity}
                          handleAddNewSymptom={handleAddNewSymptom}
                          handleLogHydration={handleLogHydration}
                          handleResetHydration={handleResetHydration}
                          showFoodModal={showFoodModal}
                          setShowFoodModal={setShowFoodModal}
                          foodName={foodName}
                          setFoodName={setFoodName}
                          foodReaction={foodReaction}
                          setFoodReaction={setFoodReaction}
                          handleAddNewFood={handleAddNewFood}
                          tummyTimeActive={tummyTimeActive}
                          setTummyTimeActive={setTummyTimeActive}
                          tummyTimeSeconds={tummyTimeSeconds}
                          setTummyTimeSeconds={setTummyTimeSeconds}
                          handleSaveTummyTime={handleSaveTummyTime}
                        />
                      )}



                      {/* Tab 2: Checklist */}
                      {activeTab === 'checklist' && (
                        <ChecklistModule
                          checklist={checklist}
                          toggleChecklistItem={toggleChecklistItem}
                          setShowAddTaskModal={setShowAddTaskModal}
                          deleteChecklistItem={deleteChecklistItem}
                        />
                      )}

                      {/* Tab 3: Calendar */}
                      {activeTab === 'calendar' && (
                        <CalendarModule
                          calendarEvents={getCombinedCalendarEvents(currentBaby, calendarEvents)}
                          selectedDate={selectedDate}
                          setSelectedDate={setSelectedDate}
                          setShowAddEventModal={setShowAddEventModal}
                          deleteCalendarEvent={deleteCalendarEvent}
                        />
                      )}

                      {/* Tab 4: Milestones */}
                      {activeTab === 'milestones' && (
                        <MilestonesModule
                          currentBaby={currentBaby}
                          authName={authName}
                          milestones={getBabyMilestones(currentBaby)}
                          setMilestones={(updatedList) => {
                            const updatedChildren = children.map((c, i) => i === activeChildIndex ? { ...c, milestones: updatedList } : c);
                            setChildren(updatedChildren);
                            localStorage.setItem('bamudi_children', JSON.stringify(updatedChildren));
                          }}
                        />
                      )}

                      {/* Tab 5: More Sub-Navigation */}
                      {activeTab === 'profile' && (
                        profileSubView === 'articles_list' ? (
                          <div className="screen-scroll-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                              <button onClick={() => setProfileSubView('menu')} style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontSize: '14px', fontWeight: '750', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                ← Back to Settings
                              </button>
                            </div>
                            <ArticlesModule
                              articles={filteredArticles}
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              toggleSaveArticle={toggleSaveArticle}
                              setActiveArticle={handleOpenArticle}
                            />
                          </div>
                        ) : (
                          <MoreModule
                            authName={authName}
                            setAuthName={setAuthName}
                            authEmail={authEmail}
                            authPassword={authPassword}
                            setAuthPassword={setAuthPassword}
                            motherPhase={motherPhase}
                            setMotherPhase={setMotherPhase}
                            children={children}
                            setChildren={setChildren}
                            activeChildIndex={activeChildIndex}
                            setActiveChildIndex={setActiveChildIndex}
                            currentBaby={currentBaby}
                            setShowAddGrowthModal={setShowAddGrowthModal}
                            language={language}
                            setLanguage={setLanguage}
                            handleLogout={handleLogout}
                            calendarEvents={getCombinedCalendarEvents(currentBaby, calendarEvents)}
                            profileSubView={profileSubView}
                            setProfileSubView={setProfileSubView}
                            pediatrician={pediatrician}
                            setPediatrician={setPediatrician}
                            setSelectedDate={setSelectedDate}
                            setActiveTab={setActiveTab}
                            setShowNurseryModal={setShowNurseryModal}
                          />
                        )
                      )}
                    </>
                  )}

                  {/* BOTTOM FLOATING TAB BAR */}
                  <div
                    className="floating-bottom-nav"
                    style={{
                      '--active-tab-color':
                        activeTab === 'dashboard'
                          ? 'var(--mother-primary)'
                          : activeTab === 'checklist'
                          ? 'var(--baby-primary)'
                          : activeTab === 'calendar'
                          ? 'var(--cal-primary)'
                          : activeTab === 'milestones'
                          ? 'var(--baby-primary)'
                          : 'var(--color-text-primary)'
                    } as React.CSSProperties}
                  >
                    <button className={`nav-tab-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setActiveArticle(null); setShowNotifications(false); }}>
                      <Home size={20} />
                      <span className="nav-tab-label">Home</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'checklist' ? 'active' : ''}`} onClick={() => { setActiveTab('checklist'); setActiveArticle(null); setShowNotifications(false); }}>
                      <CheckSquare size={20} />
                      <span className="nav-tab-label">Checklist</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => {
                      const today = new Date();
                      const yyyy = today.getFullYear();
                      const mm = String(today.getMonth() + 1).padStart(2, '0');
                      const dd = String(today.getDate()).padStart(2, '0');
                      setSelectedDate(`${yyyy}-${mm}-${dd}`);
                      setActiveTab('calendar');
                      setActiveArticle(null);
                      setShowNotifications(false);
                    }}>
                      <Calendar size={20} />
                      <span className="nav-tab-label">Calendar</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'milestones' ? 'active' : ''}`} onClick={() => { setActiveTab('milestones'); setActiveArticle(null); setShowNotifications(false); }}>
                      <Award size={20} />
                      <span className="nav-tab-label">Milestones</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => {
                      setProfileSubView('menu');
                      setActiveTab('profile');
                      setActiveArticle(null);
                      setShowNotifications(false);
                    }}>
                      <User size={20} />
                      <span className="nav-tab-label">Profile</span>
                    </button>
                  </div>
                </>
              )}

            </div>

            {/* Simulated hardware home bar */}
            <div className={`home-indicator ${deviceOS === 'android' ? 'android' : ''}`}></div>

          </div>
        </div>

      </div>

      {/* ADD CUSTOM TASK BOTTOM SHEET */}
      {showAddTaskModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowAddTaskModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Add New Task</h3>
            
            <form onSubmit={handleAddNewTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <span className="input-label">Task Name</span>
                <input
                  type="text"
                  className="input-field"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="e.g. Sterilize pacifiers"
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-label">Scheduled Time / Frequency</span>
                <input
                  type="text"
                  className="input-field"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  placeholder="e.g. 08:30 PM or Daily"
                />
              </div>

              <div className="input-group" style={{ '--theme-color': 'var(--baby-primary)' } as React.CSSProperties}>
                <span className="input-label">Category</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['daily', 'weekly', 'monthly'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewTaskCat(cat)}
                      className={`btn-secondary ${newTaskCat === cat ? 'active' : ''}`}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        fontSize: '13px',
                        borderRadius: '12px',
                        border: newTaskCat === cat ? '2px solid var(--baby-primary)' : '1px solid var(--color-border)',
                        background: newTaskCat === cat ? 'var(--baby-secondary)' : '#FFF'
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD CALENDAR EVENT BOTTOM SHEET */}
      {showAddEventModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowAddEventModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Schedule Event</h3>

            <form onSubmit={handleAddNewEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <span className="input-label">Event/Vax Title</span>
                <input
                  type="text"
                  className="input-field"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Polio booster vaccination"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <span className="input-label">Date</span>
                  <input
                    type="date"
                    className="input-field"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <span className="input-label">Time</span>
                  <input
                    type="text"
                    className="input-field"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="10:00 AM"
                  />
                </div>
              </div>

              <div className="input-group">
                <span className="input-label">Type</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['appointment', 'vaccination', 'reminder'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewEventType(type)}
                      className={`btn-secondary ${newEventType === type ? 'active' : ''}`}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        fontSize: '12px',
                        borderRadius: '12px',
                        border: newEventType === type ? '2px solid var(--cal-primary)' : '1px solid var(--color-border)',
                        background: newEventType === type ? 'var(--cal-secondary)' : '#FFF'
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <span className="input-label">Description / Notes</span>
                <input
                  type="text"
                  className="input-field"
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="e.g. Remember clinic card, diaper bag."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD GROWTH METRICS BOTTOM SHEET */}
      {showAddGrowthModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowAddGrowthModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Log Growth Check</h3>

            <form onSubmit={handleAddNewGrowth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <span className="input-label">Weight (kg)</span>
                <input
                  type="number"
                  step="0.1"
                  className="input-field"
                  value={newGrowthWeight}
                  onChange={(e) => setNewGrowthWeight(e.target.value)}
                  placeholder="e.g. 5.9"
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-label">Height (cm)</span>
                <input
                  type="number"
                  step="0.5"
                  className="input-field"
                  value={newGrowthHeight}
                  onChange={(e) => setNewGrowthHeight(e.target.value)}
                  placeholder="e.g. 64"
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-label">Head Circumference (cm)</span>
                <input
                  type="number"
                  step="0.1"
                  className="input-field"
                  value={newGrowthHead}
                  onChange={(e) => setNewGrowthHead(e.target.value)}
                  placeholder="e.g. 38.5"
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                Log Metrics
              </button>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}

// ----------------------------------------------------
// COMPONENTS DEFINITIONS
// ----------------------------------------------------

// 1. ONBOARDING SCREEN — Bamudi warm cream / orange flow
function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      type: 'welcome' as const,
      title: 'Bamudi',
      accent: '',
      subtitle: 'Sanfter Wehen-Timer',
      desc: 'Dauer, Abstand & Verlauf einfach im Blick',
      image: null
    },
    {
      type: 'feature' as const,
      icon: 'pulse' as const,
      title: 'Understand contractions',
      accent: 'with ease.',
      desc: 'Automatically track duration, intervals, and progress so you stay informed and in control.',
      image: '/pregnancy.png'
    },
    {
      type: 'feature' as const,
      icon: 'chart' as const,
      title: 'Track your progress.',
      accent: 'Every day.',
      desc: 'Review your contraction history and identify patterns over time with clear charts and insights.',
      image: '/mother_baby.png'
    },
    {
      type: 'feature' as const,
      icon: 'heart' as const,
      title: 'Stronger together.',
      accent: 'Always connected.',
      desc: 'Invite your partner, share live updates, and stay close through every moment of the journey.',
      image: '/baby_sleep.png'
    },
    {
      type: 'feature' as const,
      icon: 'shield' as const,
      title: 'Be ready when the moment comes.',
      accent: "You've got this.",
      desc: 'Checklists, reminders, and calm guidance so you feel prepared when it matters most.',
      image: '/pregnancy.png'
    }
  ];

  const current = slides[slide];
  const isLast = slide === slides.length - 1;

  const handleNext = () => {
    if (!isLast) setSlide(slide + 1);
    else onFinish();
  };

  const renderIcon = (icon: 'pulse' | 'chart' | 'heart' | 'shield') => {
    if (icon === 'pulse') return <Activity size={18} strokeWidth={2.4} />;
    if (icon === 'chart') return <TrendingUp size={18} strokeWidth={2.4} />;
    if (icon === 'heart') return <Heart size={18} strokeWidth={2.4} />;
    return <Shield size={18} strokeWidth={2.4} />;
  };

  return (
    <div className={`onboarding-screen ${current.type === 'welcome' ? 'is-welcome' : 'is-feature'}`}>
      {current.type !== 'welcome' && (
        <button type="button" className="onboarding-skip" onClick={onFinish}>
          Skip
        </button>
      )}

      {current.type === 'welcome' ? (
        <div className="onboarding-welcome">
          <div className="onboarding-welcome-art" aria-hidden="true">
            <svg className="ob-hills" viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 180C40 150 80 200 120 170C160 140 190 110 230 130C270 150 300 120 360 140V280H0V180Z" fill="#E8D5C4" opacity="0.55" />
              <path d="M0 210C50 185 90 230 140 200C190 170 230 160 280 185C320 205 340 190 360 200V280H0V210Z" fill="#D4B89A" opacity="0.45" />
              <circle cx="290" cy="70" r="28" fill="#F5C78E" opacity="0.5" />
              <path d="M40 160C55 120 85 125 95 155C75 150 55 155 40 160Z" fill="#7BA87A" opacity="0.55" />
              <path d="M300 155C320 125 345 130 350 155C335 152 315 152 300 155Z" fill="#7BA87A" opacity="0.45" />
              <path d="M70 200C78 175 98 178 102 198C90 196 78 198 70 200Z" fill="#E07A4A" opacity="0.35" />
              <path d="M250 195C262 172 282 176 286 196C272 194 258 194 250 195Z" fill="#E07A4A" opacity="0.3" />
            </svg>
            <div className="ob-mascot">
              <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="56" cy="98" rx="28" ry="6" fill="#C4A484" opacity="0.35" />
                <path d="M28 58C28 38 40 24 56 24C72 24 84 38 84 58V78C84 88 74 94 56 94C38 94 28 88 28 78V58Z" fill="#8B5E3C" />
                <path d="M34 52C30 40 22 36 18 42C14 48 20 58 28 62" fill="#A06B45" />
                <path d="M78 52C82 40 90 36 94 42C98 48 92 58 84 62" fill="#A06B45" />
                <ellipse cx="44" cy="56" rx="5" ry="6" fill="#2C1810" />
                <ellipse cx="68" cy="56" rx="5" ry="6" fill="#2C1810" />
                <ellipse cx="45.5" cy="54.5" rx="1.6" ry="2" fill="#FFF" />
                <ellipse cx="69.5" cy="54.5" rx="1.6" ry="2" fill="#FFF" />
                <path d="M50 66C52 70 60 70 62 66" stroke="#5C3A22" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M48 78C50 84 62 84 64 78" fill="#C4785A" />
                <circle cx="38" cy="68" r="5" fill="#C4785A" opacity="0.55" />
                <circle cx="74" cy="68" r="5" fill="#C4785A" opacity="0.55" />
                <path d="M42 30C36 18 44 10 52 16" stroke="#8B5E3C" strokeWidth="7" strokeLinecap="round" />
                <path d="M70 30C76 18 68 10 60 16" stroke="#8B5E3C" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="onboarding-welcome-copy">
            <h1 className="onboarding-brand">{current.title}</h1>
            <p className="onboarding-subtitle-de">{current.subtitle}</p>
            <p className="onboarding-desc-welcome">{current.desc}</p>
          </div>
        </div>
      ) : (
        <div className="onboarding-feature">
          <div className="onboarding-feature-copy">
            <div className="onboarding-feature-icon">{renderIcon(current.icon)}</div>
            <h2 className="onboarding-feature-title">
              {current.title}{' '}
              <span className="onboarding-accent">{current.accent}</span>
            </h2>
            <p className="onboarding-feature-desc">{current.desc}</p>
          </div>
          <div className="onboarding-feature-media">
            <img src={current.image!} alt="" />
            <div className="onboarding-media-fade" />
            {(current.icon === 'pulse' || current.icon === 'heart') && (
              <div className="onboarding-hearts" aria-hidden="true">
                <Heart size={14} fill="currentColor" />
                <Heart size={10} fill="currentColor" />
                <Heart size={12} fill="currentColor" />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`onboarding-dot ${idx === slide ? 'active' : ''}`}
              onClick={() => setSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button type="button" className="onboarding-next" onClick={handleNext}>
          {isLast ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// 2. DASHBOARD MODULE
function DashboardModule({
  authName,
  currentBaby,
  ageString,
  checklistPercent,
  checklist,
  toggleChecklistItem,
  milestones,
  calendarEvents,
  articles,
  setActiveTab,
  setActiveArticle,
  childrenProfiles,
  activeChildIndex,
  setActiveChildIndex,
  setShowNotifications,
  notificationsCount,
  setProfileSubView,
  setSelectedDate,
  pregnancyKicks,
  setPregnancyKicks,
  kickHistory,
  setKickHistory,
  setShowAddGrowthModal,
  showNurseryModal,
  setShowNurseryModal,
  nurseryLogType,
  setNurseryLogType,
  nurseryFeedAmount,
  setNurseryFeedAmount,
  nurseryFeedDuration,
  setNurseryFeedDuration,
  nurseryFeedMethod,
  setNurseryFeedMethod,
  nurserySleepDuration,
  setNurserySleepDuration,
  nurserySleepNotes,
  setNurserySleepNotes,
  nurseryDiaperType,
  setNurseryDiaperType,
  handleAddNewNurseryLog,
  showSymptomModal,
  setShowSymptomModal,
  symptomName,
  setSymptomName,
  symptomSeverity,
  setSymptomSeverity,
  handleAddNewSymptom,
  handleLogHydration,
  handleResetHydration,
  showFoodModal,
  setShowFoodModal,
  foodName,
  setFoodName,
  foodReaction,
  setFoodReaction,
  handleAddNewFood,
  tummyTimeActive,
  setTummyTimeActive,
  tummyTimeSeconds,
  setTummyTimeSeconds,
  handleSaveTummyTime
}: {
  authName: string;
  currentBaby: any;
  ageString: string;
  checklistPercent: number;
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  milestones: MilestoneItem[];
  calendarEvents: CalendarEvent[];
  articles: Article[];
  setActiveTab: any;
  setActiveArticle: any;
  childrenProfiles: any[];
  activeChildIndex: number;
  setActiveChildIndex: (idx: number) => void;
  setShowNotifications: (val: boolean) => void;
  notificationsCount: number;
  setProfileSubView: (view: string) => void;
  setSelectedDate: (date: string) => void;
  pregnancyKicks: number;
  setPregnancyKicks: (val: number | ((prev: number) => number)) => void;
  kickHistory: { time: string; count: number }[];
  setKickHistory: (val: { time: string; count: number }[] | ((prev: { time: string; count: number }[]) => { time: string; count: number }[])) => void;
  setShowAddGrowthModal: (val: boolean) => void;
  showNurseryModal: boolean;
  setShowNurseryModal: (val: boolean) => void;
  nurseryLogType: 'feed' | 'sleep' | 'diaper';
  setNurseryLogType: (val: 'feed' | 'sleep' | 'diaper') => void;
  nurseryFeedAmount: string;
  setNurseryFeedAmount: (val: string) => void;
  nurseryFeedDuration: string;
  setNurseryFeedDuration: (val: string) => void;
  nurseryFeedMethod: 'Breast' | 'Bottle';
  setNurseryFeedMethod: (val: 'Breast' | 'Bottle') => void;
  nurserySleepDuration: string;
  setNurserySleepDuration: (val: string) => void;
  nurserySleepNotes: string;
  setNurserySleepNotes: (val: string) => void;
  nurseryDiaperType: 'Wet' | 'Dirty' | 'Mixed' | 'Dry';
  setNurseryDiaperType: (val: 'Wet' | 'Dirty' | 'Mixed' | 'Dry') => void;
  handleAddNewNurseryLog: (e: React.FormEvent) => void;
  showSymptomModal: boolean;
  setShowSymptomModal: (val: boolean) => void;
  symptomName: string;
  setSymptomName: (val: string) => void;
  symptomSeverity: 'Mild' | 'Moderate' | 'Severe';
  setSymptomSeverity: (val: 'Mild' | 'Moderate' | 'Severe') => void;
  handleAddNewSymptom: (e: React.FormEvent) => void;
  handleLogHydration: (amount: number) => void;
  handleResetHydration: () => void;
  showFoodModal: boolean;
  setShowFoodModal: (val: boolean) => void;
  foodName: string;
  setFoodName: (val: string) => void;
  foodReaction: 'like' | 'neutral' | 'dislike' | 'allergy';
  setFoodReaction: (val: 'like' | 'neutral' | 'dislike' | 'allergy') => void;
  handleAddNewFood: (e: React.FormEvent) => void;
  tummyTimeActive: boolean;
  setTummyTimeActive: (val: boolean) => void;
  tummyTimeSeconds: number;
  setTummyTimeSeconds: (val: number | ((prev: number) => number)) => void;
  handleSaveTummyTime: () => void;
})
 {
  const babyPhase = currentBaby ? getChildPhase(currentBaby.dob) : 'newborn';

  const pendingTasksCount = checklist.filter(t => t.category === 'daily' && !t.completed).length;

  const todayDateStr = (() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();
  const todayEventsCount = getCombinedCalendarEvents(currentBaby, calendarEvents).filter(e => e.date === todayDateStr).length;
  const upcomingMilestonesCount = milestones.filter(m => m.status !== 'achieved').length;

  const pregInfo = babyPhase === 'pregnancy' ? calculatePregnancyInfo(currentBaby.dob) : null;

  const getCategoryBadgeStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('baby') || cat.includes('development') || cat.includes('care')) {
      return { backgroundColor: 'var(--baby-secondary)', color: 'var(--baby-primary)' };
    } else if (cat.includes('pregnancy') || cat.includes('sleep') || cat.includes('mother')) {
      return { backgroundColor: 'var(--mother-secondary)', color: 'var(--mother-primary)' };
    } else {
      return { backgroundColor: 'var(--article-secondary)', color: 'var(--article-primary)' };
    }
  };

  const renderPregnancyDashboard = () => {
    if (!pregInfo) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="baby-card-combined card-mother" style={{ border: 'none', color: '#FFFFFF', padding: '20px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={22} color="#FFFFFF" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.8)' }}>Gestation Timeline</span>
                <span style={{ display: 'block', fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>{currentBaby.name}</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.2)', textTransform: 'uppercase' }}>
              {pregInfo.trimester}
            </span>
          </div>

          <div style={{ height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
            <div style={{ height: '100%', background: '#FFFFFF', width: `${(pregInfo.gestationWeek / 40) * 100}%`, borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
          </div>
        </div>

        <div className="premium-card" style={{ display: 'flex', gap: '14px', padding: '16px', alignItems: 'center', background: '#FFFFFF' }}>
          <div style={{ fontSize: '32px', padding: '10px', backgroundColor: 'var(--mother-secondary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {pregInfo.fruit.split(' ').slice(-1)[0]}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--mother-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Fetal Size Comparison</span>
            <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Baby is as big as a {pregInfo.fruit}</h4>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{pregInfo.sizeDesc} {pregInfo.extraDesc}</p>
          </div>
        </div>

        {(() => {
          let tipText = "Trimester 1: Drink lots of fluids (2.5L daily), continue your prenatal vitamins, and secure sleep checkups. Rest when you feel exhausted.";
          if (pregInfo.gestationWeek > 13 && pregInfo.gestationWeek <= 27) {
            tipText = "Trimester 2: The 'golden semester'! Start baby-proofing cupboards, get your 20-week anatomy ultrasound scan, and perform pelvic stretches.";
          } else if (pregInfo.gestationWeek > 27) {
            tipText = "Trimester 3: Keep paracetamol and hospital bag packed! Aim for daily kick monitoring. Perform GBS screens at week 36.";
          }
          return (
            <div style={{ background: 'var(--mother-secondary)', border: '1px solid rgba(244, 107, 138, 0.15)', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>🤰</span>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--mother-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pregnancy Guidance • Trimester {pregInfo.trimester.charAt(0)}</span>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', lineHeight: '1.45', margin: '4px 0 0 0' }}>{tipText}</p>
              </div>
            </div>
          );
        })()}

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#FFFFFF', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--mother-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Active Counter</span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Fetal Kick Tracker 👣</h3>
            </div>
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Session: {pregnancyKicks} kicks</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%' }}>
            <button
              onClick={() => setPregnancyKicks(prev => prev + 1)}
              className="btn-primary"
              style={{
                flex: 2,
                padding: '12px',
                fontSize: '14px',
                borderRadius: '16px',
                background: 'var(--mother-primary)',
                boxShadow: '0 4px 12px rgba(244, 107, 138, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              👣 Tap to Log Kick
            </button>
            <button
              onClick={() => {
                if (pregnancyKicks === 0) return;
                const now = new Date();
                const timestampStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + now.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ')';
                setKickHistory(prev => [{ time: timestampStr, count: pregnancyKicks }, ...prev].slice(0, 5));
                setPregnancyKicks(0);
                alert('Kick session saved successfully! 👣');
              }}
              disabled={pregnancyKicks === 0}
              className="btn-secondary"
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '13px',
                borderRadius: '16px',
                opacity: pregnancyKicks === 0 ? 0.5 : 1,
                cursor: pregnancyKicks === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Save
            </button>
            <button
              onClick={() => setPregnancyKicks(0)}
              disabled={pregnancyKicks === 0}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                background: '#FFF',
                color: 'var(--reminder-primary)',
                cursor: pregnancyKicks === 0 ? 'not-allowed' : 'pointer',
                opacity: pregnancyKicks === 0 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              ↺
            </button>
          </div>

          {kickHistory.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Recent Sessions</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {kickHistory.slice(0, 3).map((session, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-app)', borderRadius: '10px', fontSize: '12px', border: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{session.time}</span>
                    <strong style={{ color: 'var(--mother-primary)' }}>{session.count} Kicks</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#FFFFFF', textAlign: 'left' }}>
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--mother-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Hydration Status</span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Daily Water Log 💦</h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {currentBaby.hydrationLog || 0} <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>/ 2500 ml</span>
            </h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: (currentBaby.hydrationLog || 0) >= 2500 ? 'var(--color-success)' : 'var(--mother-primary)' }}>
              {(currentBaby.hydrationLog || 0) >= 2500 ? 'Target Met! 🎉' : `${Math.round(((currentBaby.hydrationLog || 0) / 2500) * 100)}% Complete`}
            </span>
          </div>

          <div style={{ height: '8px', background: 'var(--bg-app)', borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #f46b8a, #ffccd7)', width: `${Math.min(100, (((currentBaby.hydrationLog || 0) / 2500) * 100))}%`, borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleLogHydration(250)} className="badge" style={{ flex: 1, padding: '10px 0', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none', color: 'var(--color-text-primary)', textTransform: 'none', fontWeight: 'bold' }}>+ 250 ml 🥤</button>
            <button onClick={() => handleLogHydration(500)} className="badge" style={{ flex: 1, padding: '10px 0', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none', color: 'var(--color-text-primary)', textTransform: 'none', fontWeight: 'bold' }}>+ 500 ml 🍼</button>
            <button onClick={handleResetHydration} className="badge" style={{ padding: '10px 14px', border: '1px solid var(--color-border)', cursor: 'pointer', background: 'none', color: 'var(--reminder-primary)', textTransform: 'none' }}>↺</button>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--mother-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Maternal Health</span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Symptoms Logged 📝</h3>
            </div>
            <button
              onClick={() => setShowSymptomModal(true)}
              className="badge"
              style={{ background: 'var(--mother-secondary)', color: 'var(--mother-primary)', border: 'none', fontWeight: '750', cursor: 'pointer' }}
            >
              + Log Symptom
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(!currentBaby.symptomsLog || currentBaby.symptomsLog.length === 0) ? (
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontStyle: 'italic', margin: '4px 0' }}>No symptoms logged today. Keep a track of maternal recovery.</p>
            ) : (
              currentBaby.symptomsLog.slice(0, 3).map((sym: any) => {
                let badgeColor = 'var(--color-success)';
                if (sym.severity === 'Severe') badgeColor = 'var(--reminder-primary)';
                else if (sym.severity === 'Moderate') badgeColor = 'var(--dev-primary)';

                return (
                  <div key={sym.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{sym.name}</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{sym.time}</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '8px', color: '#FFF', background: badgeColor }}>
                      {sym.severity}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    );
  };

  const renderNewbornDashboard = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="baby-card-combined" style={{ background: 'linear-gradient(135deg, #FFFDFB, #FFF3EA)' }}>
          <div className="baby-card-left">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--baby-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)' }}>
              <User size={22} color="var(--baby-primary)" />
            </div>
            <div className="baby-card-info" style={{ textAlign: 'left' }}>
              <span className="baby-card-name">{currentBaby.name}</span>
              <span className="baby-card-age">{ageString}</span>
            </div>
          </div>
          <div className="baby-card-right">
            <span className="baby-card-phase-label">Current Phase</span>
            <span className="baby-card-phase-val" style={{ color: 'var(--baby-primary)', background: 'var(--baby-secondary)', padding: '2px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>Newborn</span>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--baby-primary)', textTransform: 'uppercase' }}>Quick Trackers</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => { setNurseryLogType('feed'); setShowNurseryModal(true); }}
              className="btn-primary"
              style={{ flex: 1, padding: '12px 0', fontSize: '13px', background: 'var(--baby-primary)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '65px', boxShadow: 'none' }}
            >
              <span style={{ fontSize: '18px' }}>🍼</span>
              <span>Feed</span>
            </button>
            <button
              onClick={() => { setNurseryLogType('sleep'); setShowNurseryModal(true); }}
              className="btn-primary"
              style={{ flex: 1, padding: '12px 0', fontSize: '13px', background: 'var(--cal-primary)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '65px', boxShadow: 'none' }}
            >
              <span style={{ fontSize: '18px' }}>😴</span>
              <span>Sleep</span>
            </button>
            <button
              onClick={() => { setNurseryLogType('diaper'); setShowNurseryModal(true); }}
              className="btn-primary"
              style={{ flex: 1, padding: '12px 0', fontSize: '13px', background: 'var(--dev-primary)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '65px', boxShadow: 'none' }}
            >
              <span style={{ fontSize: '18px' }}>🧷</span>
              <span>Diaper</span>
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--baby-secondary)', border: '1px solid rgba(83, 200, 139, 0.15)', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>👶</span>
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--baby-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Newborn Care • Week 1-4</span>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', lineHeight: '1.45', margin: '4px 0 0 0' }}>
              Sleep schedules are irregular (16-18 hrs). Prioritize breastfeeds/formula feeds, local diaper changes, and plenty of skin-to-skin touch.
            </p>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>Timeline Logs</span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>{currentBaby.nurseryLogs?.length || 0} logs</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(!currentBaby.nurseryLogs || currentBaby.nurseryLogs.length === 0) ? (
              <div style={{ padding: '16px 8px', border: '1px dashed var(--color-border)', borderRadius: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}>📝</span>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No events logged yet. Use quick trackers above to log baby details.</p>
              </div>
            ) : (
              currentBaby.nurseryLogs.slice(0, 4).map((log: any) => {
                let emoji = '🍼';
                let iconBg = 'var(--baby-secondary)';
                if (log.type === 'sleep') {
                  emoji = '😴';
                  iconBg = 'var(--cal-secondary)';
                } else if (log.type === 'diaper') {
                  emoji = '🧷';
                  iconBg = 'var(--dev-secondary)';
                }

                return (
                  <div key={log.id} style={{ display: 'flex', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-text-primary)' }}>{log.title}</span>
                        <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>{log.time.split(' ')[0]}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>{log.desc}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    );
  };

  const renderInfantDashboard = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="baby-card-combined" style={{ background: 'linear-gradient(135deg, #F9FDFB, #E6F7ED)' }}>
          <div className="baby-card-left">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--baby-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)' }}>
              <User size={22} color="var(--baby-primary)" />
            </div>
            <div className="baby-card-info" style={{ textAlign: 'left' }}>
              <span className="baby-card-name">{currentBaby.name}</span>
              <span className="baby-card-age">{ageString}</span>
            </div>
          </div>
          <div className="baby-card-right">
            <span className="baby-card-phase-label">Current Phase</span>
            <span className="baby-card-phase-val" style={{ color: 'var(--baby-primary)', background: 'var(--baby-secondary)', padding: '2px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>0 - 6 Months</span>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', background: '#FFFFFF', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--baby-primary)', textTransform: 'uppercase' }}>Growth Metrics</span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Latest Growth Check 📈</h3>
            </div>
            <button
              onClick={() => setShowAddGrowthModal(true)}
              className="badge"
              style={{ background: 'var(--baby-secondary)', color: 'var(--baby-primary)', border: 'none', fontWeight: '750', cursor: 'pointer' }}
            >
              + Log Growth
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'var(--bg-app)', padding: '12px 10px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block' }}>Weight</span>
              <strong style={{ fontSize: '16px', color: 'var(--color-text-primary)', display: 'block', marginTop: '4px' }}>{currentBaby.weight} kg</strong>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '12px 10px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block' }}>Height</span>
              <strong style={{ fontSize: '16px', color: 'var(--color-text-primary)', display: 'block', marginTop: '4px' }}>{currentBaby.height} cm</strong>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '12px 10px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block' }}>Head Circ.</span>
              <strong style={{ fontSize: '16px', color: 'var(--color-text-primary)', display: 'block', marginTop: '4px' }}>{currentBaby.head || 'N/A'} cm</strong>
            </div>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', background: '#FFFFFF', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--baby-primary)', textTransform: 'uppercase' }}>Sensory & Core Strength</span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Tummy Time Timer ⏱</h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-app)', padding: '16px 20px', borderRadius: '20px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '26px' }}>⏱</span>
              <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'monospace', color: tummyTimeActive ? 'var(--baby-primary)' : 'var(--color-text-primary)' }}>
                {String(Math.floor(tummyTimeSeconds / 60)).padStart(2, '0')}:{String(tummyTimeSeconds % 60).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>Target: 15 mins daily</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setTummyTimeActive(!tummyTimeActive)}
              className="btn-primary"
              style={{ flex: 2, padding: '12px 0', fontSize: '13px', background: tummyTimeActive ? 'var(--reminder-primary)' : 'var(--baby-primary)', borderRadius: '16px', border: 'none', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {tummyTimeActive ? '⏸ Pause Session' : '▶ Start Session'}
            </button>
            <button
              onClick={handleSaveTummyTime}
              disabled={tummyTimeSeconds === 0}
              className="btn-secondary"
              style={{ flex: 1, padding: '12px 0', fontSize: '13px', borderRadius: '16px', opacity: tummyTimeSeconds === 0 ? 0.5 : 1 }}
            >
              💾 Log
            </button>
            <button
              onClick={() => { setTummyTimeSeconds(0); setTummyTimeActive(false); }}
              disabled={tummyTimeSeconds === 0}
              className="btn-secondary"
              style={{ padding: '12px 14px', borderRadius: '16px', opacity: tummyTimeSeconds === 0 ? 0.5 : 1 }}
            >
              ↺
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--baby-secondary)', border: '1px solid rgba(83, 200, 139, 0.15)', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>✨</span>
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--baby-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Infant Discovery • Month {calculateAgeInMonths(currentBaby.dob)}</span>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', lineHeight: '1.45', margin: '4px 0 0 0' }}>
              Tummy time is key (15-20 mins daily). Read high-contrast booklets to enhance tracking sensors. Keep bedroom environments cool.
            </p>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>Active Milestones</span>
            <button onClick={() => setActiveTab('milestones')} style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>View all</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {milestones.slice(0, 2).map(m => (
              <div key={m.id} style={{ display: 'flex', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--color-border)', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, paddingRight: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{m.title}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{m.desc}</span>
                </div>
                {m.status === 'achieved' && (
                  <span style={{ color: 'var(--color-success)', fontWeight: 'bold', fontSize: '14px', marginRight: '4px' }}>✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  const renderToddlerDashboard = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="baby-card-combined" style={{ background: 'linear-gradient(135deg, #F7FAFC, #EAF2F8)' }}>
          <div className="baby-card-left">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--cal-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)' }}>
              <User size={22} color="var(--cal-primary)" />
            </div>
            <div className="baby-card-info" style={{ textAlign: 'left' }}>
              <span className="baby-card-name">{currentBaby.name}</span>
              <span className="baby-card-age">{ageString}</span>
            </div>
          </div>
          <div className="baby-card-right">
            <span className="baby-card-phase-label">Current Phase</span>
            <span className="baby-card-phase-val" style={{ color: 'var(--cal-primary)', background: 'var(--cal-secondary)', padding: '2px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>6 - 18 Months</span>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--cal-primary)', textTransform: 'uppercase' }}>Solid Food Trials</span>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Solid Foods Logger 🥑</h3>
            </div>
            <button
              onClick={() => setShowFoodModal(true)}
              className="badge"
              style={{ background: 'var(--cal-secondary)', color: 'var(--cal-primary)', border: 'none', fontWeight: '750', cursor: 'pointer' }}
            >
              + Log Food
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(!currentBaby.foodLogs || currentBaby.foodLogs.length === 0) ? (
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontStyle: 'italic', margin: '4px 0' }}>No foods logged yet. Log solid food trials (likes, dislikes, allergies).</p>
            ) : (
              currentBaby.foodLogs.slice(0, 3).map((f: any) => {
                let badge = '👍 Liked';
                let color = 'var(--baby-primary)';
                let bg = 'var(--baby-secondary)';
                if (f.reaction === 'dislike') {
                  badge = '👎 Disliked';
                  color = 'var(--reminder-primary)';
                  bg = 'rgba(255, 75, 75, 0.1)';
                } else if (f.reaction === 'neutral') {
                  badge = '😐 Neutral';
                  color = 'var(--color-text-secondary)';
                  bg = 'var(--bg-app)';
                } else if (f.reaction === 'allergy') {
                  badge = '⚠️ Allergy';
                  color = 'var(--dev-primary)';
                  bg = 'var(--dev-secondary)';
                }

                return (
                  <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{f.food}</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{f.date}</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '10px', color: color, backgroundColor: bg }}>
                      {badge}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {(() => {
          const pendingVaccines = currentBaby.vaccineSchedule?.filter((v: any) => v.status === 'pending') || [];
          if (pendingVaccines.length === 0) return null;
          const nextVaccine = pendingVaccines[0];
          
          let countdownText = "";
          if (nextVaccine.date.includes('Due:')) {
            const dueDateStr = nextVaccine.date.split('Due:')[1].trim();
            const diffDays = Math.ceil((new Date(dueDateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            countdownText = diffDays > 0 ? `${diffDays} Days Countdown` : 'Due Today!';
          }

          return (
            <div className="premium-card" style={{ padding: '16px', background: '#FFFFFF', textAlign: 'left', display: 'flex', gap: '14px', alignItems: 'center', borderLeft: '4px solid var(--reminder-primary)' }}>
              <div style={{ fontSize: '24px', padding: '10px', backgroundColor: 'rgba(255, 75, 75, 0.08)', borderRadius: '12px' }}>
                💉
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--reminder-primary)', textTransform: 'uppercase' }}>Immunization Health</span>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>Next: {nextVaccine.name}</h4>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2.5px' }}>{nextVaccine.date}</span>
              </div>
              {countdownText && (
                <span style={{ fontSize: '9.5px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '10px', color: 'var(--reminder-primary)', background: 'rgba(255, 75, 75, 0.1)', textTransform: 'uppercase' }}>
                  {countdownText}
                </span>
              )}
            </div>
          );
        })()}

        <div style={{ background: 'var(--cal-secondary)', border: '1px solid rgba(91, 143, 249, 0.15)', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>🥑</span>
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--cal-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Toddler Exploration • Month {calculateAgeInMonths(currentBaby.dob)}</span>
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', lineHeight: '1.45', margin: '4px 0 0 0' }}>
              Introduce mashed solid foods (avocado, sweet potato) alongside breastmilk. Install cabinet locks as they start crawling and climbing.
            </p>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="screen-scroll-container animate-fade-in">
      
      <div className="home-header">
        <div className="header-profile">
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--mother-secondary)', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <User size={20} color="var(--mother-primary)" />
          </div>
          <div className="header-welcome" style={{ textAlign: 'left' }}>
            <span>Good Morning,</span>
            <h2>{authName} 💖</h2>
          </div>
        </div>
        <button className="header-notification" onClick={() => setShowNotifications(true)}>
          <Bell size={20} />
          {notificationsCount > 0 && <div className="notification-badge">{notificationsCount}</div>}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px' }}>
        {childrenProfiles.map((child, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveChildIndex(idx)}
            className="badge"
            style={{
              background: activeChildIndex === idx ? 'var(--baby-primary)' : 'var(--bg-surface)',
              color: activeChildIndex === idx ? '#FFFFFF' : 'var(--color-text-secondary)',
              border: activeChildIndex === idx ? 'none' : '1px solid var(--color-border)',
              cursor: 'pointer',
              textTransform: 'none'
            }}
          >
            <Baby size={12} style={{ marginRight: '4px' }} />
            {child.name}
          </button>
        ))}
      </div>

      {babyPhase === 'pregnancy' && renderPregnancyDashboard()}
      {babyPhase === 'newborn' && renderNewbornDashboard()}
      {babyPhase === 'infant' && renderInfantDashboard()}
      {babyPhase === 'toddler' && renderToddlerDashboard()}

      <div className="progress-bar-section" style={{ marginTop: '20px' }}>
        <div className="progress-bar-header">
          <span className="progress-bar-title">Today's Tasks Done</span>
          <span className="progress-bar-percent">{checklistPercent}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${checklistPercent}%` }}></div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card tasks" onClick={() => setActiveTab('checklist')}>
          <div className="metric-icon-wrapper">
            <CheckSquare size={18} />
          </div>
          <span className="metric-title">Tasks</span>
          <span className="metric-value">{pendingTasksCount} Pending</span>
        </div>
        
        <div className="metric-card reminders" onClick={() => {
          setSelectedDate(todayDateStr);
          setActiveTab('calendar');
        }}>
          <div className="metric-icon-wrapper">
            <Clock size={18} />
          </div>
          <span className="metric-title">Reminders</span>
          <span className="metric-value">{todayEventsCount} Today</span>
        </div>

        <div className="metric-card milestones" onClick={() => setActiveTab('milestones')}>
          <div className="metric-icon-wrapper">
            <Award size={18} />
          </div>
          <span className="metric-title">Milestones</span>
          <span className="metric-value">{upcomingMilestonesCount} Active</span>
        </div>
      </div>

      <div className="top-tasks-section">
        <div className="top-tasks-header">
          <span className="top-tasks-title">Today's Top Tasks</span>
          <button className="top-tasks-viewall" onClick={() => setActiveTab('checklist')}>View All</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {checklist.filter(t => t.category === 'daily').slice(0, 3).map(task => (
            <div
              key={task.id}
              className={`task-item-premium ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleChecklistItem(task.id)}
            >
              <div className="task-check-circle">
                {task.completed && <Check size={14} />}
              </div>
              <div className="task-details-wrapper">
                <div className="task-main-info" style={{ textAlign: 'left' }}>
                  <span className="task-name-text">{task.task}</span>
                  <span className="task-desc-text">{task.desc || 'No details provided'}</span>
                </div>
                <span className="task-time-text">{task.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Articles For You</h3>
          <button
            onClick={() => {
              setActiveTab('profile');
              setProfileSubView('articles_list');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontSize: '12.5px', fontWeight: '750', cursor: 'pointer' }}
          >
            View All
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {articles.slice(0, 2).map(art => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="premium-card"
              style={{ display: 'flex', gap: '12px', padding: '12px', cursor: 'pointer' }}
            >
              <img
                src={art.id === 'art1' || art.id === 'art3' ? '/baby_sleep.png' : art.id === 'art2' ? '/mother_baby.png' : '/pregnancy.png'}
                alt={art.title}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-article" style={{ fontSize: '9px', padding: '3px 8px', ...getCategoryBadgeStyle(art.category) }}>{art.category}</span>
                  {art.read ? (
                    <span style={{ fontSize: '10px', color: 'var(--color-success)', fontWeight: '750' }}>Read ✓</span>
                  ) : (
                    <span style={{ fontSize: '10px', color: 'var(--mother-primary)', fontWeight: '750' }}>New •</span>
                  )}
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px', lineHeight: '1.3' }}>{art.title}</h4>
                <span style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px' }}>{art.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNurseryModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowNurseryModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Log Nursery Activity</h3>

            <div style={{ display: 'flex', background: 'var(--bg-app)', padding: '4px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
              {['feed', 'sleep', 'diaper'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNurseryLogType(type as any)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    background: nurseryLogType === type ? 'var(--baby-primary)' : 'none',
                    color: nurseryLogType === type ? '#FFFFFF' : 'var(--color-text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type === 'feed' ? '🍼 Feed' : type === 'sleep' ? '😴 Sleep' : '🧷 Diaper'}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddNewNurseryLog} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              {nurseryLogType === 'feed' && (
                <>
                  <div className="input-group">
                    <span className="input-label">Feeding Method</span>
                    <select
                      value={nurseryFeedMethod}
                      onChange={(e) => setNurseryFeedMethod(e.target.value as any)}
                      className="input-field"
                      style={{ width: '100%' }}
                    >
                      <option value="Breast">Breast Feeding</option>
                      <option value="Bottle">Bottle (Formula/Expressed)</option>
                    </select>
                  </div>

                  {nurseryFeedMethod === 'Bottle' && (
                    <div className="input-group">
                      <span className="input-label">Feed Amount (ml)</span>
                      <input
                        type="number"
                        className="input-field"
                        value={nurseryFeedAmount}
                        onChange={(e) => setNurseryFeedAmount(e.target.value)}
                        placeholder="e.g. 120"
                        required
                      />
                    </div>
                  )}

                  <div className="input-group">
                    <span className="input-label">Duration (Minutes)</span>
                    <input
                      type="number"
                      className="input-field"
                      value={nurseryFeedDuration}
                      onChange={(e) => setNurseryFeedDuration(e.target.value)}
                      placeholder="e.g. 15"
                      required
                    />
                  </div>
                </>
              )}

              {nurseryLogType === 'sleep' && (
                <>
                  <div className="input-group">
                    <span className="input-label">Sleep Duration (Minutes)</span>
                    <input
                      type="number"
                      className="input-field"
                      value={nurserySleepDuration}
                      onChange={(e) => setNurserySleepDuration(e.target.value)}
                      placeholder="e.g. 45"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Sleep Notes</span>
                    <input
                      type="text"
                      className="input-field"
                      value={nurserySleepNotes}
                      onChange={(e) => setNurserySleepNotes(e.target.value)}
                      placeholder="e.g. Woke up happy and refreshed"
                    />
                  </div>
                </>
              )}

              {nurseryLogType === 'diaper' && (
                <div className="input-group">
                  <span className="input-label">Diaper Type</span>
                  <select
                    value={nurseryDiaperType}
                    onChange={(e) => setNurseryDiaperType(e.target.value as any)}
                    className="input-field"
                    style={{ width: '100%' }}
                  >
                    <option value="Wet">Wet Diaper 💦</option>
                    <option value="Dirty">Dirty Diaper 💩</option>
                    <option value="Mixed">Mixed (Wet & Dirty) 💦💩</option>
                    <option value="Dry">Dry Diaper Check 🧷</option>
                  </select>
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', background: 'var(--baby-primary)' }}>
                Log Nursery Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {showSymptomModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowSymptomModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Log Pregnancy Symptom</h3>

            <form onSubmit={handleAddNewSymptom} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div className="input-group">
                <span className="input-label">Symptom</span>
                <select
                  value={symptomName}
                  onChange={(e) => setSymptomName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                >
                  <option value="Morning Sickness">Morning Sickness 🤢</option>
                  <option value="Fatigue">Fatigue 😴</option>
                  <option value="Back Pain">Back Pain ⚡</option>
                  <option value="Headache">Headache 🧠</option>
                  <option value="Heartburn">Heartburn 🔥</option>
                  <option value="Swelling">Swelling 🦶</option>
                </select>
              </div>

              <div className="input-group">
                <span className="input-label">Severity</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Mild', 'Moderate', 'Severe'].map(sev => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSymptomSeverity(sev as any)}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        background: symptomSeverity === sev ? 'var(--mother-primary)' : '#FFF',
                        color: symptomSeverity === sev ? '#FFFFFF' : 'var(--color-text-secondary)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', background: 'var(--mother-primary)' }}>
                Log Symptom
              </button>
            </form>
          </div>
        </div>
      )}

      {showFoodModal && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setShowFoodModal(false)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Log Solid Food Trial</h3>

            <form onSubmit={handleAddNewFood} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div className="input-group">
                <span className="input-label">Food Tried</span>
                <input
                  type="text"
                  className="input-field"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Avocado Puree"
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-label">Reaction</span>
                <select
                  value={foodReaction}
                  onChange={(e) => setFoodReaction(e.target.value as any)}
                  className="input-field"
                  style={{ width: '100%' }}
                >
                  <option value="like">Loved It 👍</option>
                  <option value="neutral">Neutral 😐</option>
                  <option value="dislike">Disliked It 👎</option>
                  <option value="allergy">Allergic Reaction ⚠️</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', background: 'var(--cal-primary)' }}>
                Log Food Trial
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// 3. CHECKLIST MODULE
function ChecklistModule({
  checklist,
  toggleChecklistItem,
  setShowAddTaskModal,
  deleteChecklistItem
}: {
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  setShowAddTaskModal: (val: boolean) => void;
  deleteChecklistItem: (id: string) => void;
}) {
  const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const filteredItems = checklist.filter(item => item.category === filter);

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--baby-primary)' } as React.CSSProperties}>
      
      {/* Module Title */}
      <div style={{ padding: '10px 0 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Care Checklist</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>Track daily routines & wellness tasks</p>
        </div>
        <button
          onClick={() => setShowAddTaskModal(true)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--baby-primary)', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Segmented control tabs */}
      <div style={{ display: 'flex', background: 'var(--color-border)', padding: '4px', borderRadius: '14px', marginBottom: '20px' }}>
        {(['daily', 'weekly', 'monthly'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              flex: 1,
              border: 'none',
              background: filter === cat ? '#FFFFFF' : 'transparent',
              color: filter === cat ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              padding: '8px 0',
              borderRadius: '10px',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: filter === cat ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Checklist List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-secondary)' }}>
            <CheckSquare size={38} style={{ opacity: 0.3, marginBottom: '10px' }} />
            <p style={{ fontSize: '14px', fontWeight: '500' }}>No tasks scheduled in this category.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className={`checklist-item ${item.completed ? 'checked' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }} onClick={() => toggleChecklistItem(item.id)}>
                <div className={`checklist-checkbox ${item.completed ? 'checked' : ''}`}>
                  {item.completed && <Check size={14} />}
                </div>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '600', textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', display: 'block' }}>{item.task}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{item.time}</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Are you sure you want to delete "${item.task}"?`)) {
                    deleteChecklistItem(item.id);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.6,
                  transition: 'opacity 0.2s'
                }}
                className="checklist-delete-btn"
              >
                <Trash size={15} />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

// 4. CALENDAR MODULE
function CalendarModule({
  calendarEvents,
  selectedDate,
  setSelectedDate,
  setShowAddEventModal,
  deleteCalendarEvent
}: {
  calendarEvents: CalendarEvent[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setShowAddEventModal: (val: boolean) => void;
  deleteCalendarEvent: (id: string) => void;
}) {
  
  // Custom calendar days helper (Mocking July 2026)
  // July 1st 2026 is a Wednesday. Total 31 days.
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed)
  
  const daysArray = [];
  for (let i = 0; i < startDayOffset; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Check if date has events
  const hasEventOnDay = (day: number | null) => {
    if (!day) return false;
    const dateStr = `2026-07-${String(day).padStart(2, '0')}`;
    return calendarEvents.some(e => e.date === dateStr);
  };

  const getDayEvents = (dateStr: string) => {
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const dayEvents = getDayEvents(selectedDate);

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--cal-primary)' } as React.CSSProperties}>
      
      {/* Title */}
      <div style={{ padding: '10px 0 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Calendar & Planner</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>Appointments & vaccination tracking</p>
        </div>
        <button
          onClick={() => setShowAddEventModal(true)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cal-primary)', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Month Selector header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700' }}>July 2026</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={14} /></button>
          <button style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={14} /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-premium)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {daysArray.map((day, idx) => {
            const dateStr = day ? `2026-07-${String(day).padStart(2, '0')}` : '';
            const isSelected = selectedDate === dateStr;
            const hasEvent = hasEventOnDay(day);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedDate(dateStr)}
                style={{
                  height: '38px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  cursor: day ? 'pointer' : 'default',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '13px',
                  backgroundColor: isSelected ? 'var(--cal-primary)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : day ? 'var(--color-text-primary)' : 'transparent',
                  position: 'relative'
                }}
              >
                {day}
                {day && hasEvent && !isSelected && (
                  <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--cal-primary)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda Events */}
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>Agenda for July {selectedDate.split('-')[2] || '09'}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dayEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              <p style={{ fontSize: '13px' }}>No events scheduled for this day.</p>
            </div>
          ) : (
            dayEvents.map(event => (
              <div key={event.id} className="premium-card" style={{ padding: '16px', display: 'flex', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: event.type === 'vaccination' ? 'var(--cal-secondary)' : event.type === 'appointment' ? 'var(--mother-secondary)' : 'var(--baby-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.type === 'vaccination' ? 'var(--cal-primary)' : event.type === 'appointment' ? 'var(--mother-primary)' : 'var(--baby-primary)',
                }}>
                  {event.type === 'vaccination' ? <Award size={20} /> : event.type === 'appointment' ? <Activity size={20} /> : <Clock size={20} />}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{event.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{event.time}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete event "${event.title}"?`)) {
                            deleteCalendarEvent(event.id);
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                        className="calendar-delete-btn"
                      >
                        <Trash size={14} style={{ opacity: 0.6 }} />
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{event.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

// 5. ARTICLES MODULE
function ArticlesModule({
  articles,
  searchQuery,
  setSearchQuery,
  toggleSaveArticle,
  setActiveArticle
}: {
  articles: Article[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  toggleSaveArticle: (id: string) => void;
  setActiveArticle: (art: Article) => void;
}) {
  const [activeSubTab, setActiveSubTab] = useState<'discover' | 'saved'>('discover');

  const savedArticles = articles.filter(a => a.saved);
  const visibleArticles = activeSubTab === 'discover' ? articles : savedArticles;

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--article-primary)' } as React.CSSProperties}>
      
      {/* Title */}
      <div style={{ padding: '10px 0 10px 0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>Guides & Articles</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>Expert guides customized for Ayaan's growth</p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
          placeholder="Search parenting guides, feeding advice..."
          style={{ paddingLeft: '44px', borderRadius: '18px' }}
        />
        <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      {/* Sub tabs: Discover / Bookmarked */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px', paddingBottom: '4px' }}>
        <button
          onClick={() => setActiveSubTab('discover')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            color: activeSubTab === 'discover' ? 'var(--article-primary)' : 'var(--color-text-secondary)',
            paddingBottom: '8px',
            borderBottom: activeSubTab === 'discover' ? '2.5px solid var(--article-primary)' : 'none',
            cursor: 'pointer'
          }}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveSubTab('saved')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            color: activeSubTab === 'saved' ? 'var(--article-primary)' : 'var(--color-text-secondary)',
            paddingBottom: '8px',
            borderBottom: activeSubTab === 'saved' ? '2.5px solid var(--article-primary)' : 'none',
            cursor: 'pointer'
          }}
        >
          Saved ({savedArticles.length})
        </button>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {visibleArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--color-text-secondary)' }}>
            <BookMarked size={36} style={{ opacity: 0.3, marginBottom: '10px' }} />
            <p style={{ fontSize: '14px' }}>No articles found.</p>
          </div>
        ) : (
          visibleArticles.map(art => (
            <div
              key={art.id}
              className="premium-card"
              style={{ padding: '0', cursor: 'pointer', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              onClick={() => setActiveArticle(art)}
            >
              <img
                src={art.id === 'art1' || art.id === 'art3' ? '/baby_sleep.png' : art.id === 'art2' ? '/mother_baby.png' : '/pregnancy.png'}
                alt={art.title}
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="badge badge-article" style={getCategoryBadgeStyle(art.category)}>{art.category}</span>
                    {art.read ? (
                      <span style={{ fontSize: '10.5px', color: 'var(--color-success)', fontWeight: '750' }}>Read ✓</span>
                    ) : (
                      <span style={{ fontSize: '10.5px', color: 'var(--mother-primary)', fontWeight: '750' }}>New •</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(art.id);
                    }}
                    style={{ background: 'none', border: 'none', color: art.saved ? 'var(--article-primary)' : 'var(--color-text-secondary)', cursor: 'pointer' }}
                  >
                    <Bookmark size={18} fill={art.saved ? 'var(--article-primary)' : 'none'} />
                  </button>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', lineHeight: '1.4' }}>{art.title}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{art.summary}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  <span>{art.author}</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

// 5.5 STANDALONE MILESTONES MODULE
function MilestonesModule({
  currentBaby: _currentBaby,
  authName: _authName,
  milestones,
  setMilestones
}: {
  currentBaby: any;
  authName: string;
  milestones: MilestoneItem[];
  setMilestones: (updatedList: MilestoneItem[]) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group milestones by category
  const categories = [
    { key: 'motor', label: 'Motor Skills' },
    { key: 'communication', label: 'Communication' },
    { key: 'cognitive', label: 'Cognitive Skills' }
  ] as const;

  const totalCount = milestones.length;
  const achievedCount = milestones.filter(m => m.status === 'achieved').length;
  const progressPercent = totalCount > 0 ? Math.round((achievedCount / totalCount) * 100) : 0;

  const handleCheckboxToggle = (m: MilestoneItem) => {
    const newStatus: 'achieved' | 'in_progress' | 'upcoming' = m.status === 'achieved' ? 'upcoming' : 'achieved';
    const updated = milestones.map(item => item.id === m.id ? { ...item, status: newStatus } : item);
    setMilestones(updated);
  };

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ paddingBottom: '80px', '--theme-color': 'var(--dev-primary)' } as React.CSSProperties}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Title */}
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)', margin: 0 }}>Milestones</h2>
        
        {/* Overall Progress Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 165, 36, 0.08) 0%, rgba(245, 165, 36, 0.02) 100%)',
          border: '1px solid rgba(245, 165, 36, 0.15)',
          borderRadius: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Overall Progress
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {achievedCount}/{totalCount} <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Achieved</span>
            </span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {progressPercent}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            height: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '100%'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: 'var(--color-success)',
              borderRadius: '10px',
              width: `${progressPercent}%`,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>
        </div>

        {/* Grouped Lists */}
        {categories.map(cat => {
          const catMilestones = milestones.filter(m => m.category === cat.key);
          if (catMilestones.length === 0) return null;

          return (
            <div key={cat.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              {/* Category Header */}
              <h3 style={{
                fontSize: '14px',
                fontWeight: '800',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
                paddingLeft: '4px',
                marginBottom: '4px'
              }}>
                {cat.label}
              </h3>

              {/* Milestones Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {catMilestones.map((m, idx) => {
                  const isExpanded = expandedId === m.id;
                  const isLast = idx === catMilestones.length - 1;
                  
                  return (
                    <div key={m.id} style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-border)' }}>
                      {/* Main Row */}
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px 20px',
                          cursor: 'pointer',
                          gap: '14px',
                          transition: 'background-color 0.2s',
                        }}
                        onClick={() => setExpandedId(isExpanded ? null : m.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {/* Checkbox (Left) */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckboxToggle(m);
                          }}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: m.status === 'achieved' ? '2px solid var(--color-success)' : '2px solid var(--color-text-tertiary)',
                            backgroundColor: m.status === 'achieved' ? 'var(--color-success)' : 'transparent',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                          }}
                        >
                          {m.status === 'achieved' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        {/* Title (Middle) */}
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: '600',
                          color: 'var(--color-text-primary)',
                          flexGrow: 1,
                          lineHeight: '1.3'
                        }}>
                          {m.title}
                        </span>
                      </div>

                      {/* Expandable Content (Accordion) */}
                      <div style={{
                        maxHeight: isExpanded ? '200px' : '0px',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        backgroundColor: 'rgba(0, 0, 0, 0.015)'
                      }}>
                        <div style={{ padding: '0 20px 20px 58px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                           {/* Description */}
                           <p style={{
                             fontSize: '12.5px',
                             color: 'var(--color-text-secondary)',
                             lineHeight: '1.45',
                             margin: 0
                           }}>
                             {m.desc}
                           </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

// 6. MORE & PROFILE SUB-NAVIGATION MODULE
function MoreModule({
  authName,
  setAuthName,
  authEmail,
  authPassword,
  setAuthPassword,
  motherPhase,
  setMotherPhase,
  children,
  setChildren,
  activeChildIndex,
  setActiveChildIndex,
  currentBaby,
  setShowAddGrowthModal,
  language,
  setLanguage,
  handleLogout,
  calendarEvents,
  profileSubView,
  setProfileSubView,
  pediatrician,
  setPediatrician,
  setSelectedDate,
  setActiveTab,
  setShowNurseryModal
}: {
  authName: string;
  setAuthName: (val: string) => void;
  authEmail: string;
  authPassword: string;
  setAuthPassword: (val: string) => void;
  motherPhase: 'pregnancy' | 'baby';
  setMotherPhase: (val: 'pregnancy' | 'baby') => void;
  children: ChildProfile[];
  setChildren: (val: ChildProfile[]) => void;
  activeChildIndex: number;
  setActiveChildIndex: (val: number) => void;
  currentBaby: any;
  setShowAddGrowthModal: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
  handleLogout: () => void;
  calendarEvents: CalendarEvent[];
  profileSubView: string;
  setProfileSubView: (val: string) => void;
  pediatrician: { name: string, clinic: string, phone: string };
  setPediatrician: (val: any) => void;
  setSelectedDate: (date: string) => void;
  setActiveTab: (tab: any) => void;
  setShowNurseryModal: (val: boolean) => void;
}) {
  const activeSubView = profileSubView;
  const setActiveSubView = setProfileSubView;
  
  // Local Mother State
  const [tempMotherName, setTempMotherName] = useState(authName);
  const [tempMotherPhase, setTempMotherPhase] = useState<'pregnancy' | 'baby'>(motherPhase);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Local Baby State
  const [tempBabyName, setTempBabyName] = useState(currentBaby.name);
  const [tempBabyDob, setTempBabyDob] = useState(currentBaby.dob);
  const [tempBabyGender, setTempBabyGender] = useState(currentBaby.gender);

  // Local Add Baby Form State
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildDob, setNewChildDob] = useState('');
  const [newChildGender, setNewChildGender] = useState<'Boy' | 'Girl'>('Girl');

  // Keep baby info sync'd when active baby changes
  const activeBaby = children[activeChildIndex];
  useEffect(() => {
    if (activeBaby) {
      setTempBabyName(activeBaby.name);
      setTempBabyDob(activeBaby.dob);
      setTempBabyGender(activeBaby.gender);
    }
  }, [activeChildIndex, children]);

  const [growthMetricTab, setGrowthMetricTab] = useState<'weight' | 'height' | 'head'>('weight');
  const [growthSourceView, setGrowthSourceView] = useState<'growth_tracker' | 'nursery_notes'>('growth_tracker');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [expandedLegalId, setExpandedLegalId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [reminderFilterTab, setReminderFilterTab] = useState<'today' | 'tomorrow' | 'week'>('today');
  const [partnerEmail, setPartnerEmail] = useState('');
  
  // Local Doctor State
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [tempDocName, setTempDocName] = useState(pediatrician.name);
  const [tempDocClinic, setTempDocClinic] = useState(pediatrician.clinic);
  const [tempDocPhone, setTempDocPhone] = useState(pediatrician.phone);

  useEffect(() => {
    setTempDocName(pediatrician.name);
    setTempDocClinic(pediatrician.clinic);
    setTempDocPhone(pediatrician.phone);
  }, [pediatrician]);

  const todayDateStr = (() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();

  const tomorrowDateStr = (() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const yyyy = tom.getFullYear();
    const mm = String(tom.getMonth() + 1).padStart(2, '0');
    const dd = String(tom.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();

  const filteredReminders = (() => {
    if (reminderFilterTab === 'today') {
      return calendarEvents.filter(e => e.date === todayDateStr);
    } else if (reminderFilterTab === 'tomorrow') {
      return calendarEvents.filter(e => e.date === tomorrowDateStr);
    } else {
      return calendarEvents.filter(e => e.date !== todayDateStr && e.date !== tomorrowDateStr);
    }
  })();

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--baby-primary)' } as React.CSSProperties}>
      
      {/* Back button for sub-views */}
      {activeSubView !== 'menu' && (
        <button
          onClick={() => {
            if (activeSubView === 'growth_log_history') {
              setActiveSubView(growthSourceView);
            } else {
              setActiveSubView('menu');
            }
          }}
          style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: '600', marginBottom: '14px', paddingLeft: '0' }}
        >
          <ChevronLeft size={16} /> {activeSubView === 'growth_log_history' ? 'Back to Growth' : 'Back to Settings'}
        </button>
      )}

      {/* VIEW 1: MENU LANDING (Profile Settings List View) */}
      {activeSubView === 'menu' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Cover Header and Avatar Profile Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 4px', marginBottom: '8px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/mother_baby.png"
                alt="Baby avatar"
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '50%', border: '2.5px solid var(--baby-primary)', boxShadow: 'var(--shadow-sm)' }}
              />
              <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--baby-primary)', color: '#FFF', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFF', fontSize: '9px', fontWeight: 'bold' }}>
                👶
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>{currentBaby.name}'s Profile</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '12.5px', marginTop: '2px', fontWeight: '500' }}>Mother: {authName}</p>
            </div>
          </div>

          {/* Section: Profile & Baby Info */}
          <span className="profile-section-title">Nursery & Profiles</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setActiveSubView('mother_profile_info')} style={{ '--theme-color': 'var(--mother-primary)', '--theme-bg': 'var(--mother-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <User size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Mother's Profile</span>
                <span className="profile-row-desc">Edit name, avatar, and active care phase</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('baby_profile_info')} style={{ '--theme-color': 'var(--baby-primary)', '--theme-bg': 'var(--baby-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Baby size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Baby's Profile</span>
                <span className="profile-row-desc">Manage child profiles, switch or add babies</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => { setGrowthSourceView('growth_tracker'); setActiveSubView('growth_tracker'); }} style={{ '--theme-color': 'var(--dev-primary)', '--theme-bg': 'var(--dev-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <TrendingUp size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Growth Logs</span>
                <span className="profile-row-desc">Weight, height, and head circumference</span>
              </div>
              <span className="profile-row-value">{currentBaby.weight} kg</span>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('articles_list')} style={{ '--theme-color': 'var(--article-primary)', '--theme-bg': 'var(--article-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <BookOpen size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Guides & Articles</span>
                <span className="profile-row-desc">Read expert paracetamol & sleep tips</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Routine & Health Care */}
          <span className="profile-section-title">Routine & Health Care</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setActiveSubView('pediatrician_info')} style={{ '--theme-color': 'var(--dev-primary)', '--theme-bg': 'var(--dev-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Activity size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Pediatrician Info</span>
                <span className="profile-row-desc">Doctor contact details & clinic info</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('vaccines_schedule')} style={{ '--theme-color': 'var(--cal-primary)', '--theme-bg': 'var(--cal-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Award size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Vaccination Tracker</span>
                <span className="profile-row-desc">Due dates, administered status logs</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('nursery_notes')} style={{ '--theme-color': 'var(--mother-primary)', '--theme-bg': 'var(--mother-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <BookMarked size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Nursery Logs</span>
                <span className="profile-row-desc">Feeding, sleep & diaper recent logs</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Memories */}
          <span className="profile-section-title">Memories & Albums</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setActiveSubView('memories')} style={{ '--theme-color': 'var(--mother-primary)', '--theme-bg': 'var(--mother-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Camera size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Photos & Memories</span>
                <span className="profile-row-desc">Upload photos & capture growth milestones</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Daily Sync */}
          <span className="profile-section-title">Co-Parent & Tasks</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setActiveSubView('invite_partner')} style={{ '--theme-color': 'var(--cal-primary)', '--theme-bg': 'var(--cal-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Share2 size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Invite Partner (Father)</span>
                <span className="profile-row-desc">Real-time sync checklist & growth logs</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => {
              const today = new Date();
              const yyyy = today.getFullYear();
              const mm = String(today.getMonth() + 1).padStart(2, '0');
              const dd = String(today.getDate()).padStart(2, '0');
              setSelectedDate(`${yyyy}-${mm}-${dd}`);
              setActiveTab('calendar');
            }} style={{ '--theme-color': 'var(--cal-primary)', '--theme-bg': 'var(--cal-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Clock size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">System Reminders & Calendar</span>
                <span className="profile-row-desc">Vaccinations, pediatrician wellness checkups, feeds</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Security */}
          <span className="profile-section-title">Account Security</span>
          <div className="profile-list-group" style={{ marginBottom: '14px' }}>
            <div className="profile-list-row" onClick={() => setActiveSubView('change_password')} style={{ '--theme-color': 'var(--mother-primary)', '--theme-bg': 'var(--mother-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Key size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Change Password</span>
                <span className="profile-row-desc">Update account access password</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Preferences */}
          <span className="profile-section-title">Preferences</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setLanguage(language === 'English' ? 'Danish' : 'English')} style={{ '--theme-color': 'var(--mother-primary)', '--theme-bg': 'var(--mother-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Smartphone size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Language</span>
                <span className="profile-row-desc">Switch default text language</span>
              </div>
              <span className="profile-row-value">{language}</span>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Support & Nursery Legal */}
          <span className="profile-section-title">Support & Safety</span>
          <div className="profile-list-group">
            <div className="profile-list-row" onClick={() => setActiveSubView('help_center')} style={{ '--theme-color': 'var(--article-primary)', '--theme-bg': 'var(--article-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <HelpCircle size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Help Center & FAQs</span>
                <span className="profile-row-desc">Common questions and user support hotline</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('privacy_policy')} style={{ '--theme-color': 'var(--article-primary)', '--theme-bg': 'var(--article-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <Bookmark size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Privacy Policy</span>
                <span className="profile-row-desc">Data protection and nursery encryption standards</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>

            <div className="profile-list-row" onClick={() => setActiveSubView('terms_conditions')} style={{ '--theme-color': 'var(--article-primary)', '--theme-bg': 'var(--article-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <BookOpen size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title">Terms & Conditions</span>
                <span className="profile-row-desc">Usage policies, licensing, and compliance guidelines</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Section: Logout */}
          <div className="profile-list-group" style={{ marginTop: '16px', marginBottom: '24px' }}>
            <div className="profile-list-row" onClick={handleLogout} style={{ '--theme-color': 'var(--reminder-primary)', '--theme-bg': 'var(--reminder-secondary)' } as React.CSSProperties}>
              <div className="profile-row-icon-wrapper">
                <LogOut size={18} />
              </div>
              <div className="profile-row-title-container">
                <span className="profile-row-title" style={{ color: 'var(--reminder-primary)' }}>Log Out Account</span>
                <span className="profile-row-desc">Securely sign out of {authName}'s session</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2a: MOTHER'S PROFILE INFO */}
      {activeSubView === 'mother_profile_info' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Mother's Profile</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', padding: '16px', gap: '14px' }}>
            <div className="input-group">
              <span className="input-label">Mother's Name</span>
              <input
                type="text"
                className="input-field"
                value={tempMotherName}
                onChange={(e) => setTempMotherName(e.target.value)}
                placeholder="Sarah"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Account Email</span>
              <input
                type="text"
                className="input-field"
                value={authEmail}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>

            <div className="input-group">
              <span className="input-label">Active Care Phase</span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setTempMotherPhase('pregnancy')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    background: tempMotherPhase === 'pregnancy' ? 'var(--mother-secondary)' : 'var(--bg-surface)',
                    color: tempMotherPhase === 'pregnancy' ? 'var(--mother-primary)' : 'var(--color-text-secondary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Pregnancy
                </button>
                <button
                  type="button"
                  onClick={() => setTempMotherPhase('baby')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    background: tempMotherPhase === 'baby' ? 'var(--baby-secondary)' : 'var(--bg-surface)',
                    color: tempMotherPhase === 'baby' ? 'var(--baby-primary)' : 'var(--color-text-secondary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Baby Phase
                </button>
              </div>
            </div>
          </div>



          <button
            onClick={() => {
              if (!tempMotherName.trim()) {
                alert('Please enter a valid name!');
                return;
              }
              setAuthName(tempMotherName);
              setMotherPhase(tempMotherPhase);
              alert('Mother profile changes saved successfully!');
              setActiveSubView('menu');
            }}
            className="btn-primary"
            style={{ background: 'var(--mother-primary)', borderRadius: '16px', marginTop: '10px' }}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* VIEW 2b: BABY'S PROFILE INFO */}
      {activeSubView === 'baby_profile_info' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Baby Profiles</h2>

          {/* Children List Manager */}
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '4px' }}>Select / Manage Active Baby</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
            {children.map((child, idx) => (
              <div
                key={idx}
                onClick={() => setActiveChildIndex(idx)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: activeChildIndex === idx ? 'var(--baby-secondary)' : 'var(--bg-surface)',
                  border: activeChildIndex === idx ? '2px solid var(--baby-primary)' : '1px solid var(--color-border)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{child.gender === 'Girl' ? '👧' : '👦'}</span>
                  <div>
                    <span style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                      {child.name} {activeChildIndex === idx && <strong style={{ fontSize: '10.5px', color: 'var(--baby-primary)', marginLeft: '4px' }}>(Active)</strong>}
                    </span>
                    <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>DOB: {child.dob}</span>
                  </div>
                </div>
                
                {children.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Are you sure you want to delete ${child.name}?`)) {
                        const updated = children.filter((_, i) => i !== idx);
                        setChildren(updated);
                        localStorage.setItem('bamudi_children', JSON.stringify(updated));
                        if (activeChildIndex >= updated.length) {
                          setActiveChildIndex(0);
                        }
                        alert(`${child.name} deleted successfully!`);
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--reminder-primary)', cursor: 'pointer', fontSize: '12.5px', fontWeight: '700', padding: '4px' }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Baby Box / Button */}
          {showAddChildForm ? (
            <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '18px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Add New Child</span>
              
              <div className="input-group">
                <span className="input-label">Child's Name</span>
                <input
                  type="text"
                  className="input-field"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="E.g. Sophia"
                />
              </div>

              <div className="input-group">
                <span className="input-label">Date of Birth / Expected Due Date</span>
                <input
                  type="date"
                  className="input-field"
                  value={newChildDob}
                  onChange={(e) => setNewChildDob(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="input-label">Gender</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setNewChildGender('Girl')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      background: newChildGender === 'Girl' ? 'var(--mother-secondary)' : 'var(--bg-surface)',
                      color: newChildGender === 'Girl' ? 'var(--mother-primary)' : 'var(--color-text-secondary)',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Girl 👧
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewChildGender('Boy')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      background: newChildGender === 'Boy' ? 'var(--cal-secondary)' : 'var(--bg-surface)',
                      color: newChildGender === 'Boy' ? 'var(--cal-primary)' : 'var(--color-text-secondary)',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Boy 👦
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (!newChildName.trim() || !newChildDob) {
                      alert('Please fill out all fields!');
                      return;
                    }
                    const newBaby: ChildProfile = {
                      name: newChildName,
                      dob: newChildDob,
                      gender: newChildGender,
                      weight: 3.2,
                      height: 50,
                      head: 34.0,
                      growthLogs: [
                        { id: '1', age: 'Month 1', weight: 3.2, height: 50, head: 34.0, date: newChildDob }
                      ],
                      vaccineSchedule: [
                        { name: 'BCG (Tuberculosis)', date: `Due: ${newChildDob}`, status: 'pending' },
                        { name: 'HepB Dose 1 & 2', date: `Due: ${newChildDob}`, status: 'pending' },
                        { name: 'Rotavirus Dose 1', date: `Due: ${newChildDob}`, status: 'pending' },
                        { name: 'DTaP-IPV-Hib Dose 1', date: `Due: ${newChildDob}`, status: 'pending' },
                        { name: 'PCV Dose 1', date: `Due: ${newChildDob}`, status: 'pending' }
                      ],
                      checklist: getChecklistForAge(newChildDob)
                    };
                    const updated = [...children, newBaby];
                    setChildren(updated);
                    localStorage.setItem('bamudi_children', JSON.stringify(updated));
                    setActiveChildIndex(updated.length - 1);
                    setNewChildName('');
                    setNewChildDob('');
                    setShowAddChildForm(false);
                    alert(`${newChildName} added successfully!`);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px', fontSize: '13px', borderRadius: '12px', background: 'var(--baby-primary)', flex: 1 }}
                >
                  Add Baby
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddChildForm(false)}
                  className="btn-secondary"
                  style={{ padding: '10px', fontSize: '13px', borderRadius: '12px', flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddChildForm(true)}
              className="btn-secondary"
              style={{ borderStyle: 'dashed', borderRadius: '16px', display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', padding: '12px' }}
            >
              <Plus size={16} /> Add Another Child
            </button>
          )}

          {/* Edit current child info */}
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '8px', paddingLeft: '4px' }}>Edit Selected Baby Info</span>
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', padding: '16px', gap: '14px' }}>
            <div className="input-group">
              <span className="input-label">Baby's Name</span>
              <input
                type="text"
                className="input-field"
                value={tempBabyName}
                onChange={(e) => setTempBabyName(e.target.value)}
                placeholder="Aria"
              />
            </div>

            <div className="input-group">
              <span className="input-label">Date of Birth</span>
              <input
                type="date"
                className="input-field"
                value={tempBabyDob}
                onChange={(e) => setTempBabyDob(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-label">Gender</span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setTempBabyGender('Girl')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    background: tempBabyGender === 'Girl' ? 'var(--mother-secondary)' : 'var(--bg-surface)',
                    color: tempBabyGender === 'Girl' ? 'var(--mother-primary)' : 'var(--color-text-secondary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Girl 👧
                </button>
                <button
                  type="button"
                  onClick={() => setTempBabyGender('Boy')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    background: tempBabyGender === 'Boy' ? 'var(--cal-secondary)' : 'var(--bg-surface)',
                    color: tempBabyGender === 'Boy' ? 'var(--cal-primary)' : 'var(--color-text-secondary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Boy 👦
                </button>
              </div>
            </div>
          </div>



          <button
            onClick={() => {
              if (!tempBabyName.trim() || !tempBabyDob) {
                alert('Please fill out all fields!');
                return;
              }
              const updated = children.map((c, i) => i === activeChildIndex ? {
                ...c,
                name: tempBabyName,
                dob: tempBabyDob,
                gender: tempBabyGender
              } : c);
              setChildren(updated);
              localStorage.setItem('bamudi_children', JSON.stringify(updated));
              alert("Baby profile changes saved successfully!");
              setActiveSubView('menu');
            }}
            className="btn-primary"
            style={{ background: 'var(--baby-primary)', borderRadius: '16px', marginTop: '10px' }}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* VIEW 3: GROWTH TRACKER (design Variant 1) */}
      {(activeSubView === 'growth_tracker' || activeSubView === 'growth_log_history') && (() => {
        const isHistoryView = activeSubView === 'growth_log_history';
        const who = WHO_GROWTH[growthMetricTab];
        const unit = who.unit;
        const metricLabel = growthMetricTab === 'weight' ? 'Weight' : growthMetricTab === 'height' ? 'Height' : 'Head Circ.';
        const curveTitle = growthMetricTab === 'weight' ? 'Weight Curve (kg)' : growthMetricTab === 'height' ? 'Height Curve (cm)' : 'Head Circ. (cm)';

        const logs: GrowthLog[] = currentBaby.growthLogs && currentBaby.growthLogs.length > 0
          ? currentBaby.growthLogs
          : [
              { id: '1', age: 'Month 1', weight: 3.2, height: 51, head: 34.2, date: '2026-03-12' },
              { id: '2', age: 'Month 2', weight: 4.1, height: 54, head: 35.5, date: '2026-04-12' },
              { id: '3', age: 'Month 3', weight: 4.8, height: 57, head: 36.8, date: '2026-05-12' },
              { id: '4', age: 'Month 5 (Now)', weight: 5.6, height: 62, head: 38.5, date: '2026-07-12' }
            ];

        const getMetricVal = (l: GrowthLog) =>
          growthMetricTab === 'weight' ? l.weight : growthMetricTab === 'height' ? l.height : l.head;

        const chartW = 300;
        const chartH = 140;
        const padY = 18;
        const allVals = [...who.p10, ...who.p90, ...logs.map(getMetricVal)];
        const minY = Math.min(...allVals) - 0.4;
        const maxY = Math.max(...allVals) + 0.4;
        const toX = (i: number, n: number) => (n <= 1 ? chartW / 2 : (i / (n - 1)) * chartW);
        const toY = (v: number) => padY + (1 - (v - minY) / (maxY - minY || 1)) * (chartH - padY * 2);

        const whoXs = who.median.map((_, i) => toX(i, who.median.length));
        const bandPath = [
          ...who.p90.map((v, i) => `${i === 0 ? 'M' : 'L'} ${whoXs[i]} ${toY(v)}`),
          ...[...who.p10].reverse().map((v, i) => `L ${whoXs[who.p10.length - 1 - i]} ${toY(v)}`),
          'Z'
        ].join(' ');
        const whoLine = who.median.map((v, i) => `${i === 0 ? 'M' : 'L'} ${whoXs[i]} ${toY(v)}`).join(' ');

        const babyPoints = logs.map((l, i) => ({
          x: toX(i, Math.max(logs.length, 2)),
          y: toY(getMetricVal(l)),
          val: getMetricVal(l),
          log: l
        }));
        const babyLine = babyPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const latestPt = babyPoints[babyPoints.length - 1];
        const prevPt = babyPoints[babyPoints.length - 2];
        const ageMonths = Math.min(5, Math.max(0, calculateAgeInMonths(currentBaby.dob)));
        const whoIdx = Math.min(who.median.length - 1, ageMonths);
        const latestVal = latestPt?.val ?? (growthMetricTab === 'weight' ? currentBaby.weight : growthMetricTab === 'height' ? currentBaby.height : currentBaby.head || 38.5);
        const pct = estimatePercentile(latestVal, who.median[whoIdx], who.p10[whoIdx], who.p90[whoIdx]);
        const delta = prevPt ? +(latestVal - prevPt.val).toFixed(1) : 0;
        const latestDateLabel = latestPt
          ? new Date(latestPt.log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : '';

        const openHistory = () => {
          setGrowthSourceView('growth_tracker');
          setActiveSubView('growth_log_history');
        };

        const metricTabs = (
          <div className="growth-tabs">
            {([
              { key: 'weight' as const, label: 'Weight' },
              { key: 'height' as const, label: 'Height' },
              { key: 'head' as const, label: 'Head Circ.' }
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setGrowthMetricTab(tab.key)}
                className={`growth-tab-btn ${growthMetricTab === tab.key ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        );

        const chartCard = (
          <div className="growth-chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{curveTitle}</span>
              <span style={{ fontSize: '12px', color: 'var(--baby-primary)', fontWeight: '700' }}>
                Latest: {latestVal} {unit}
              </span>
            </div>

            <div className="growth-chart-svg-wrap">
              <svg width="100%" height="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
                <path d={bandPath} fill="rgba(83, 200, 139, 0.14)" />
                <path d={whoLine} stroke="var(--baby-primary)" strokeWidth="2" fill="none" strokeDasharray="5 4" opacity="0.55" />
                <path d={babyLine} stroke="var(--baby-primary)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {babyPoints.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={i === babyPoints.length - 1 ? 5.5 : 4} fill="var(--baby-primary)" stroke="#fff" strokeWidth="1.5" />
                ))}
              </svg>
              {latestPt && (
                <div
                  className="growth-chart-tooltip"
                  style={{ left: `${Math.min(86, Math.max(14, (latestPt.x / chartW) * 100))}%` }}
                >
                  {latestVal} {unit}{latestDateLabel ? `, ${latestDateLabel}` : ''}
                </div>
              )}
            </div>

            <div className="growth-chart-axis">
              {['Birth', '1m', '2m', '3m', '4m', '5m'].map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="growth-chart-legend">
              <span><i className="legend-dot" /> {currentBaby.name}</span>
              <span><i className="legend-dash" /> Average (WHO)</span>
              <span><i className="legend-band" /> 10th – 90th %ile</span>
            </div>
          </div>
        );

        const historyRows = [...logs].reverse().map((l) => {
          const val = getMetricVal(l);
          const m = Math.min(5, Math.max(0, parseInt(String(l.age).replace(/\D/g, ''), 10) || ageMonths));
          const rowPct = estimatePercentile(val, who.median[m], who.p10[m], who.p90[m]);
          return (
            <tr key={l.id}>
              <td>{new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              <td>{l.age}</td>
              <td>{val} {unit}</td>
              <td>{ordinal(rowPct)}</td>
            </tr>
          );
        });

        if (isHistoryView) {
          return (
            <div className="animate-fade-in growth-screen" style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '72px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Log History</h2>
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 4 }}>
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {metricTabs}
              {chartCard}

              <div className="growth-checkup-card">
                <div className="growth-checkup-icon">
                  <CalendarDays size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="growth-checkup-label">Next checkup</span>
                  <span className="growth-checkup-date">May 20, 2025</span>
                </div>
                <span className="growth-checkup-eta">In 2 months</span>
              </div>

              <div style={{ background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table className="growth-history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Age</th>
                      <th>{metricLabel}</th>
                      <th>Percentile</th>
                    </tr>
                  </thead>
                  <tbody>{historyRows}</tbody>
                </table>
              </div>

              <button
                type="button"
                className="growth-add-entry-btn"
                onClick={() => setShowAddGrowthModal(true)}
              >
                <Plus size={16} /> Add New Entry
              </button>
            </div>
          );
        }

        return (
          <div className="animate-fade-in growth-screen" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Growth</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="/mother_baby.png"
                  alt={currentBaby.name}
                  style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--baby-primary)' }}
                />
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 4 }}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className="growth-baby-card">
              <img src="/mother_baby.png" alt={currentBaby.name} className="growth-baby-avatar" />
              <div>
                <span className="growth-baby-name">{currentBaby.name}</span>
                <span className="growth-baby-age">{formatBabyAgeLabel(currentBaby.dob)}</span>
              </div>
            </div>

            {metricTabs}
            {chartCard}

            <div className="growth-stats-row">
              <div className="growth-stat-card">
                <span className="growth-stat-value">{ordinal(pct)}</span>
                <span className="growth-stat-label">Percentile</span>
              </div>
              <div className="growth-stat-card">
                <span className="growth-stat-value">{who.median[whoIdx]} {unit}</span>
                <span className="growth-stat-label">Average (WHO)</span>
              </div>
              <div className="growth-stat-card">
                <span className="growth-stat-value" style={{ color: delta >= 0 ? 'var(--baby-primary)' : 'var(--color-error)' }}>
                  {delta >= 0 ? '+' : ''}{delta} {unit}
                </span>
                <span className="growth-stat-label">vs last month</span>
              </div>
            </div>

            <div className="growth-insight-card">
              <Shield size={16} />
              <p>
                {currentBaby.name}&apos;s {growthMetricTab === 'head' ? 'head circumference' : growthMetricTab} is in the{' '}
                <strong>{ordinal(pct)} percentile</strong> according to WHO growth standards.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Log History</h4>
                <button
                  type="button"
                  onClick={() => setShowAddGrowthModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontSize: 12, fontWeight: 750, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Plus size={12} /> Add Entry
                </button>
              </div>
              <div
                style={{ background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', overflow: 'hidden', cursor: 'pointer' }}
                onClick={openHistory}
              >
                <table className="growth-history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Age</th>
                      <th>{metricLabel}</th>
                      <th>Percentile</th>
                    </tr>
                  </thead>
                  <tbody>{historyRows.slice(0, 4)}</tbody>
                </table>
                <div style={{ textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 700, color: 'var(--baby-primary)', borderTop: '1px solid var(--color-border)' }}>
                  View full history
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* VIEW 3b: NURSERY LOGS — from nursery_app_design.tsx */}
      {activeSubView === 'nursery_notes' && (
        <div className="animate-fade-in nursery-logs-screen">
          <div className="nursery-logs-header">
            <h2>{currentBaby.name}&apos;s Nursery Logs</h2>
            <button type="button" className="nursery-add-note-btn" onClick={() => setShowNurseryModal(true)}>
              <Plus size={14} strokeWidth={3} /> Add Note
            </button>
          </div>

          <h4 className="nursery-section-label">Recent Logs</h4>

          <div className="nursery-timeline-wrap">
            <div className="nursery-timeline-line-full" aria-hidden="true" />
            {[
              {
                title: 'Nap Duration Log',
                time: 'Today, 11:15 AM',
                details: '1h 15m (10:00 AM - 11:15 AM). Woke up happy and alert.',
                color: '#FF9B54',
                timeColor: '#FF9B54',
                icon: <NurseryMoonIcon />
              },
              {
                title: 'Breastfeeding Log',
                time: 'Today, 08:30 AM',
                details: '120ml logged. Feeds well without latching issues today.',
                color: '#F4C430',
                timeColor: '#FF9B54',
                icon: <NurseryBottleIcon />
              },
              {
                title: 'Wet Diaper Checked',
                time: 'Yesterday, 10:15 PM',
                details: 'Logged by Father (Ahmad). Clean skin, no diaper rash.',
                color: '#4B9CE2',
                timeColor: '#4B9CE2',
                icon: <NurseryDropIcon />
              },
              {
                title: 'Night Sleep Stretch',
                time: 'Yesterday, 06:00 AM',
                details: 'Slept continuous 6 hours from 10 PM to 4 AM. Good pattern!',
                color: '#9D72FF',
                timeColor: '#4B9CE2',
                icon: <NurseryMoonIcon />
              }
            ].map((log, index) => (
              <div key={index} className="nursery-log-row">
                <div className="nursery-dot" style={{ background: log.color }}>
                  {log.icon}
                </div>
                <div className="nursery-log-card">
                  <div className="nursery-log-card-top">
                    <span className="nursery-log-title">{log.title}</span>
                    <span className="nursery-log-meta" style={{ color: log.timeColor }}>{log.time}</span>
                  </div>
                  <p className="nursery-log-note">{log.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nursery-great-job">
            <div className="nursery-cloud-wrap">
              <GreatJobCloud />
              <span className="nursery-sparkle s1">✦</span>
              <span className="nursery-sparkle s2">✦</span>
            </div>
            <div className="nursery-great-copy">
              <strong>Great job!</strong>
              <p>You&apos;re doing amazing.<br />Keep up the great work!</p>
            </div>
            <button type="button" className="nursery-heart-btn" aria-label="Like">
              <Heart size={16} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 4: REMINDERS LIST */}
      {activeSubView === 'reminders' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Reminders</h2>

          <div className="reminder-filters">
            {(['today', 'tomorrow', 'week'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setReminderFilterTab(tab)}
                className={`reminder-filter-btn ${reminderFilterTab === tab ? 'active' : ''}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredReminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <Clock size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                <p style={{ fontSize: '13px' }}>No reminders scheduled for this period.</p>
              </div>
            ) : (
              filteredReminders.map(event => (
                <div key={event.id} className="reminder-card-row">
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: event.type === 'vaccination' ? 'var(--cal-secondary)' : event.type === 'appointment' ? 'var(--mother-secondary)' : 'var(--baby-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: event.type === 'vaccination' ? 'var(--cal-primary)' : event.type === 'appointment' ? 'var(--mother-primary)' : 'var(--baby-primary)',
                  }}>
                    {event.type === 'vaccination' ? <Award size={18} /> : event.type === 'appointment' ? <Activity size={18} /> : <Clock size={18} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{event.title}</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{event.time}</span>
                    </div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{event.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}



      {/* VIEW 6: INVITE PARTNER */}
      {activeSubView === 'invite_partner' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Invite Co-Parent</h2>

          <div className="partner-invite-banner">
            <span className="partner-invite-title">Invite Ahmad (Father)</span>
            <p className="partner-invite-desc">
              Connect accounts to track tasks, share milestones, and log growth metrics together!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', padding: '16px', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Co-Parent Benefits:</span>
            {[
              'View tasks & checkmarks in real-time',
              'Log growth tracking charts jointly',
              'Stay synchronized on vaccine alerts',
              'Work together as a cohesive care team'
            ].map((benefit, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                <Check size={14} color="var(--color-success)" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="input-group" style={{ marginTop: '10px' }}>
            <span className="input-label">Partner's Email or Mobile Number</span>
            <input
              type="text"
              className="input-field"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              placeholder="ahmad@email.com"
            />
          </div>

          <button
            onClick={() => {
              if (!partnerEmail) {
                alert('Please enter an email address first!');
                return;
              }
              alert(`Invitation successfully sent to ${partnerEmail}!`);
              setPartnerEmail('');
              setActiveSubView('menu');
            }}
            className="partner-invite-btn"
          >
            Send Invitation
          </button>
        </div>
      )}

      {/* VIEW 7a: PEDIATRICIAN INFO */}
      {activeSubView === 'pediatrician_info' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>{currentBaby.name}'s Pediatrician</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '-12px' }}>
            Primary care provider details logged by Mother {authName}
          </p>
          
          {/* Pediatrician Card */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', padding: '16px', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>Contact Card</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '14.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{pediatrician.name}</span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{pediatrician.clinic}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setShowDoctorForm(!showDoctorForm)}
                  style={{ padding: '6px 10px', background: 'var(--bg-app)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: '10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <a href={`tel:${pediatrician.phone}`} style={{ padding: '8px 12px', background: 'var(--baby-secondary)', color: 'var(--baby-primary)', borderRadius: '12px', fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>Call</a>
              </div>
            </div>

            {/* Doctor Edit Form */}
            {showDoctorForm && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px' }}>
                <div className="input-group">
                  <span className="input-label">Doctor Name</span>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '8px 12px' }}
                    value={tempDocName}
                    onChange={(e) => setTempDocName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <span className="input-label">Clinic Name</span>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '8px 12px' }}
                    value={tempDocClinic}
                    onChange={(e) => setTempDocClinic(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <span className="input-label">Phone Number</span>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '8px 12px' }}
                    value={tempDocPhone}
                    onChange={(e) => setTempDocPhone(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    setPediatrician({
                      name: tempDocName,
                      clinic: tempDocClinic,
                      phone: tempDocPhone
                    });
                    setShowDoctorForm(false);
                    alert('Pediatrician details updated successfully!');
                  }}
                  className="btn-primary"
                  style={{ padding: '8px', fontSize: '12.5px', borderRadius: '10px', background: 'var(--baby-primary)' }}
                >
                  Save Doctor Info
                </button>
              </div>
            )}
          </div>

          {/* Allergies & Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', padding: '16px', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>Allergies & Medical Alerts</span>
            <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🍃</span>
              <span style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: '600' }}>No known drug/food allergies reported.</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7b: VACCINES TRACKER */}
      {activeSubView === 'vaccines_schedule' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800' }}>{currentBaby.name}'s Vaccination Schedule</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '-12px' }}>
            Tap vaccine rows to toggle administration status.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            {(currentBaby.vaccineSchedule || []).map((vac: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  const updatedSchedule = (currentBaby.vaccineSchedule || []).map((item: any) =>
                    item.name === vac.name ? { ...item, status: item.status === 'administered' ? 'pending' : 'administered', date: item.status === 'administered' ? 'Due: Upcoming' : `Given: ${new Date().toISOString().split('T')[0]}` } : item
                  );
                  const updated = children.map((c, i) => i === activeChildIndex ? { ...c, vaccineSchedule: updatedSchedule } : c);
                  setChildren(updated);
                  localStorage.setItem('bamudi_children', JSON.stringify(updated));
                }}
                style={{ padding: '12.5px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < (currentBaby.vaccineSchedule || []).length - 1 ? '1px solid var(--color-border)' : 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                className="vaccine-row-item"
              >
                <div>
                  <span style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{vac.name}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{vac.date}</span>
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  background: vac.status === 'administered' ? 'var(--color-success-bg)' : 'var(--dev-secondary)',
                  color: vac.status === 'administered' ? 'var(--color-success)' : 'var(--dev-primary)',
                  border: vac.status === 'administered' ? '1px solid var(--color-success)' : '1px solid var(--color-border)'
                }}>
                  {vac.status === 'administered' ? 'Given ✓' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 8: PHOTOS & MEMORIES */}
      {activeSubView === 'memories' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800' }}>{currentBaby.name}'s Photo Log</h2>
            <button
              onClick={() => alert('Simulator Photo Upload dialog opened!')}
              className="badge"
              style={{ background: 'var(--baby-secondary)', color: 'var(--baby-primary)', border: 'none', fontWeight: '700', cursor: 'pointer' }}
            >
              <Camera size={12} style={{ marginRight: '4px' }} /> Add Photo
            </button>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '-12px' }}>
            Logged by Mother {authName} for active child {currentBaby.name} ({currentBaby.gender})
          </p>

          {/* Memories grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { title: 'Coming Home', date: 'Feb 12, 2026', img: '/mother_baby.png' },
              { title: 'First Sweet Smile', date: 'Mar 15, 2026', img: '/baby_sleep.png' },
              { title: 'Nursery Setup Done', date: 'Jan 28, 2026', img: '/pregnancy.png' },
              { title: 'Tummy Time Win', date: 'Apr 02, 2026', img: '/mother_baby.png' }
            ].map((mem, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={mem.img} alt={mem.title} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                <div style={{ padding: '10px' }}>
                  <span style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{mem.title}</span>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{mem.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 10: PRIVACY POLICY — nursery_app_design */}
      {activeSubView === 'privacy_policy' && (
        <div className="animate-fade-in legal-screen">
          <h2 className="legal-screen-title">Privacy Policy</h2>
          <div className="legal-hero-illu">
            <div className="legal-illu-wrap privacy">
              <div className="legal-illu-blur" />
              <PrivacyShieldIcon />
              <span className="legal-sparkle s1">✦</span>
              <span className="legal-sparkle s2">✦</span>
            </div>
            <p>Your privacy and your child&apos;s data protection are our top priorities.</p>
          </div>
          <div className="legal-list">
            {[
              { id: 'p1', icon: <Shield size={16} />, title: '1. Data Privacy & Encryption', desc: 'All data is encrypted and stored securely using industry-standard protocols.', tone: 'purple' },
              { id: 'p2', icon: <Lock size={16} />, title: '2. COPPA & Children\'s Data Protection', desc: 'We comply with COPPA regulations to ensure the safety of children\'s data.', tone: 'purple' },
              { id: 'p3', icon: <Camera size={16} />, title: '3. Camera & Local Gallery Access', desc: 'Photos are stored locally on your device unless you choose to back up.', tone: 'purple' },
              { id: 'p4', icon: <Globe size={16} />, title: '4. GDPR Rights & Data Control', desc: 'You have full control over your data and can request deletion anytime.', tone: 'blue' },
              { id: 'p5', icon: <Share2 size={16} />, title: '5. Data Sharing', desc: 'We never sell your data. It is only used to improve your experience.', tone: 'blue' },
              { id: 'p6', icon: <RefreshCw size={16} />, title: '6. Updates to This Policy', desc: 'We may update this policy. You\'ll be notified of any significant changes.', tone: 'purple' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                className={`legal-list-row ${expandedLegalId === item.id ? 'open' : ''}`}
                onClick={() => setExpandedLegalId(expandedLegalId === item.id ? null : item.id)}
              >
                <div className={`legal-row-icon tone-${item.tone}`}>{item.icon}</div>
                <div className="legal-row-copy">
                  <span className="legal-row-title">{item.title}</span>
                  <span className="legal-row-desc">{item.desc}</span>
                </div>
                <ChevronRight size={16} className="legal-chevron" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 11: TERMS — nursery_app_design */}
      {activeSubView === 'terms_conditions' && (
        <div className="animate-fade-in legal-screen">
          <h2 className="legal-screen-title">Terms of Service</h2>
          <div className="legal-hero-illu">
            <div className="legal-illu-wrap terms">
              <div className="legal-illu-blur orange" />
              <TermsDocIcon />
              <span className="legal-sparkle s1 orange">✦</span>
              <span className="legal-sparkle s2 orange">✦</span>
            </div>
            <p>Please read these terms carefully. By using our app, you agree to the following.</p>
          </div>
          <div className="legal-list">
            {[
              { id: 't1', icon: <Lock size={16} />, title: '1. Acceptance of Terms', desc: 'By using this app, you agree to these terms and conditions.' },
              { id: 't2', icon: <FileText size={16} />, title: '2. Use of the App', desc: 'You agree to use the app only for lawful purposes and in accordance with these terms.' },
              { id: 't3', icon: <User size={16} />, title: '3. User Accounts', desc: 'You are responsible for maintaining the confidentiality of your account.' },
              { id: 't4', icon: <Shield size={16} />, title: '4. Intellectual Property', desc: 'All content and materials in the app are owned by us and protected by law.' },
              { id: 't5', icon: <File size={16} />, title: '5. Limitation of Liability', desc: 'We are not liable for any indirect or consequential damages.' },
              { id: 't6', icon: <RefreshCw size={16} />, title: '6. Changes to Terms', desc: 'We may modify these terms at any time. Continued use means acceptance.' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                className={`legal-list-row ${expandedLegalId === item.id ? 'open' : ''}`}
                onClick={() => setExpandedLegalId(expandedLegalId === item.id ? null : item.id)}
              >
                <div className="legal-row-icon tone-orange">{item.icon}</div>
                <div className="legal-row-copy">
                  <span className="legal-row-title">{item.title}</span>
                  <span className="legal-row-desc">{item.desc}</span>
                </div>
                <ChevronRight size={16} className="legal-chevron" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 12: HELP CENTER — nursery_app_design */}
      {activeSubView === 'help_center' && (
        <div className="animate-fade-in help-screen">
          <h2 className="legal-screen-title">Help Center & FAQs</h2>

          <div className="help-support-card centered">
            <div className="help-support-icon circle">
              <Headset size={20} strokeWidth={2.5} />
            </div>
            <strong>Need help or have a question?</strong>
            <p>We&apos;re here for you! Our support team typically replies within 24-48 hours.</p>
            <button
              type="button"
              className="help-contact-btn solid"
              onClick={() => alert('Opening Bamudi support: 1-800-BAMUDI')}
            >
              Contact Support <ChevronRight size={16} />
            </button>
          </div>

          <h4 className="nursery-section-label">Popular Topics</h4>
          <div className="help-faq-list">
            {[
              { icon: <Users size={16} />, q: 'How does real-time co-parent sync work?', a: 'Go to "Invite Partner (Father)", enter their email, and tap Send. Once they install and verify, logs sync automatically between devices.' },
              { icon: <BarChart2 size={16} />, q: 'How are growth percentiles determined?', a: 'We compare weight, height, and head circumference against WHO Child Growth Standards by age in months and biological sex.' },
              { icon: <Cloud size={16} />, q: 'Does the tracker support offline logging?', a: 'Yes. Feedings, naps, diapers, and notes save locally. When you reconnect, changes sync to your private cloud container.' },
              { icon: <File size={16} />, q: 'Can I export logs for pediatrician visits?', a: 'Yes. Inside Growth and Nursery logs you can view history and export a PDF/CSV report to share with clinics.' }
            ].map((faq, idx) => (
              <button
                key={idx}
                type="button"
                className={`help-faq-row ${expandedFaqId === idx ? 'open' : ''}`}
                onClick={() => setExpandedFaqId(expandedFaqId === idx ? null : idx)}
              >
                <div className="help-faq-icon">{faq.icon}</div>
                <div className="help-faq-copy">
                  <span className="help-faq-q">{faq.q}</span>
                  {expandedFaqId === idx && <p className="help-faq-a">{faq.a}</p>}
                </div>
                <ChevronDown size={16} className={`legal-chevron ${expandedFaqId === idx ? 'rotated' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 14: CHANGE PASSWORD — nursery_app_design */}
      {activeSubView === 'change_password' && (
        <div className="animate-fade-in password-screen">
          <h2 className="legal-screen-title">Change Password</h2>

          <div className="password-hero">
            <div className="password-lock-illu">
              <div className="password-lock-blur" />
              <PasswordLockIcon />
              <span className="legal-sparkle s1 purple">✦</span>
              <span className="legal-sparkle s2 blue">✦</span>
            </div>
          </div>

          <div className="password-form flat">
            {[
              { label: 'Current Password', value: oldPassword, set: setOldPassword, show: showOldPass, toggle: () => setShowOldPass(v => !v), placeholder: 'Enter current password' },
              { label: 'New Password', value: newPassword, set: setNewPassword, show: showNewPass, toggle: () => setShowNewPass(v => !v), placeholder: 'Enter new password' },
              { label: 'Confirm New Password', value: confirmPassword, set: setConfirmPassword, show: showConfirmPass, toggle: () => setShowConfirmPass(v => !v), placeholder: 'Confirm new password' }
            ].map(field => (
              <div key={field.label} className="input-group password-field">
                <span className="input-label">{field.label}</span>
                <div className="password-input-wrap">
                  <input
                    type={field.show ? 'text' : 'password'}
                    className="input-field password-input-soft"
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                  />
                  <button type="button" className="password-eye" onClick={field.toggle} aria-label="Toggle visibility">
                    {field.show ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
            ))}

            <div className="password-tip rich">
              <Shield size={18} strokeWidth={2.5} />
              <div>
                <strong>Keep your account secure</strong>
                <p>Use a strong password with at least 8 characters, including numbers and symbols.</p>
              </div>
            </div>

            <button
              type="button"
              className="password-update-btn"
              onClick={() => {
                if (!oldPassword || !newPassword || !confirmPassword) {
                  alert('Please fill out all password fields!');
                  return;
                }
                if (oldPassword !== authPassword) {
                  alert('Current password does not match!');
                  return;
                }
                if (newPassword !== confirmPassword) {
                  alert('New passwords do not match!');
                  return;
                }
                setAuthPassword(newPassword);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                alert('Password changed successfully!');
                setActiveSubView('menu');
              }}
            >
              Update Password
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
