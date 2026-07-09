import React, { useState, useEffect } from 'react';
import {
  Heart,
  User,
  Baby,
  Calendar,
  CheckSquare,
  BookOpen,
  Bell,
  Plus,
  ChevronRight,
  ChevronLeft,
  Search,
  Settings,
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
  PlusCircle,
  Clock,
  Activity,
  Award,
  BookMarked
} from 'lucide-react';

// Interfaces
interface ChildProfile {
  name: string;
  dob: string;
  gender: string;
  weight: number;
  height: number;
}

interface ChecklistItem {
  id: string;
  task: string;
  time: string;
  completed: boolean;
  category: 'daily' | 'weekly' | 'monthly';
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
}

interface MilestoneItem {
  id: string;
  title: string;
  category: 'motor' | 'communication' | 'cognitive';
  status: 'achieved' | 'in_progress' | 'upcoming';
  desc: string;
}

// Initial Data Seed
const initialChecklist: ChecklistItem[] = [
  { id: '1', task: 'Morning Feed', time: '08:00 AM', completed: true, category: 'daily' },
  { id: '2', task: 'Vitamin D Drops', time: '09:00 AM', completed: false, category: 'daily' },
  { id: '3', task: 'Tummy Time (15 mins)', time: '10:30 AM', completed: true, category: 'daily' },
  { id: '4', task: 'Nap Time', time: '11:00 AM', completed: false, category: 'daily' },
  { id: '5', task: 'Afternoon Feed', time: '02:00 PM', completed: false, category: 'daily' },
  { id: '6', task: 'Evening Walk', time: '05:30 PM', completed: false, category: 'daily' },
  { id: '7', task: 'Bath Time', time: '07:30 PM', completed: false, category: 'daily' },
  { id: '8', task: 'Bedtime Feed & Sleep', time: '08:30 PM', completed: false, category: 'daily' },
  { id: 'w1', task: 'Sterilize baby feeding equipment', time: 'Every Sunday', completed: false, category: 'weekly' },
  { id: 'w2', task: 'Track height and weight metrics', time: 'Every Friday', completed: true, category: 'weekly' },
  { id: 'm1', task: 'Wash all nursery bedding', time: '1st of Month', completed: false, category: 'monthly' },
  { id: 'm2', task: 'Audit toys for age appropriateness', time: '15th of Month', completed: false, category: 'monthly' },
];

const initialCalendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Doctor Appointment', time: '10:00 AM', date: '2026-07-15', type: 'appointment', desc: 'Dr. Farhana Huq - Routine wellness checkup and growth metrics.' },
  { id: 'e2', title: 'Vaccination (Dose 2)', time: '11:30 AM', date: '2026-07-20', type: 'vaccination', desc: 'Polio and DTaP booster vaccination. Keep infant paracetamol ready.' },
  { id: 'e3', title: 'Vitamin D Drops', time: '09:00 AM', date: '2026-07-09', type: 'reminder', desc: 'Daily vitamin drops during morning sunlight.' },
  { id: 'e4', title: 'Tummy Time Session', time: '10:30 AM', date: '2026-07-09', type: 'reminder', desc: 'Interactive floor play for head strength development.' },
];

const initialMilestones: MilestoneItem[] = [
  { id: 'm_m1', title: 'Holds head steady', category: 'motor', status: 'achieved', desc: 'Holds head upright and steady without support when held in sitting position.' },
  { id: 'm_m2', title: 'Rolls over', category: 'motor', status: 'in_progress', desc: 'Rolls over from tummy to back or vice versa. Usually starts around 4-5 months.' },
  { id: 'm_m3', title: 'Sits without support', category: 'motor', status: 'upcoming', desc: 'Sits independently with back straight and hands free for play. Expected around 6-7 months.' },
  { id: 'm_c1', title: 'Smiles socially', category: 'communication', status: 'achieved', desc: 'Spontaneously smiles back at mother and family members to initiate interaction.' },
  { id: 'm_c2', title: 'Laughs out loud', category: 'communication', status: 'in_progress', desc: 'Giggles or laughs when tickled, played peek-a-boo, or showing funny faces.' },
  { id: 'm_c3', title: 'Babbles consonants', category: 'communication', status: 'upcoming', desc: 'Makes repetitive consonant sounds like "ba-ba", "da-da", "ma-ma".' },
  { id: 'm_cog1', title: 'Tracks objects visually', category: 'cognitive', status: 'achieved', desc: 'Follows colorful moving toys smoothly from left to right.' },
  { id: 'm_cog2', title: 'Reaches for toys', category: 'cognitive', status: 'in_progress', desc: 'Stretches hand out intentionally to grab rattles or dangling crib charms.' },
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

export default function App() {
  // Simulator State
  const [deviceOS, setDeviceOS] = useState<'ios' | 'android'>('ios');
  
  // App Core States
  const [appFlow, setAppFlow] = useState<string>(() => localStorage.getItem('bamudi_flow') || 'splash');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('bamudi_dark_mode') === 'true');
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
  const [pregnancyWeek, setPregnancyWeek] = useState(24);
  const [interests, setInterests] = useState<string[]>(['feeding', 'sleep', 'growth', 'activities']);
  
  // Child States
  const [children, setChildren] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem('bamudi_children');
    return saved ? JSON.parse(saved) : [
      {
        name: 'Ayaan',
        dob: '2026-02-12',
        gender: 'Boy',
        weight: 5.6,
        height: 62
      },
      {
        name: 'Sophia',
        dob: '2025-09-18',
        gender: 'Girl',
        weight: 8.2,
        height: 71
      }
    ];
  });
  const [activeChildIndex, setActiveChildIndex] = useState(0);

  // Interactive Lists
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('bamudi_checklist');
    return saved ? JSON.parse(saved) : initialChecklist;
  });

  const [milestones, setMilestones] = useState<MilestoneItem[]>(() => {
    const saved = localStorage.getItem('bamudi_milestones');
    return saved ? JSON.parse(saved) : initialMilestones;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('bamudi_calendar');
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('bamudi_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  // Active Tab in Dashboard
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checklist' | 'calendar' | 'articles' | 'profile'>('dashboard');

  // Bottom sheets / Modals
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddGrowthModal, setShowAddGrowthModal] = useState(false);
  
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

  // Selected date in Calendar
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-09');

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
    localStorage.setItem('bamudi_children', JSON.stringify(children));
  }, [children]);

  useEffect(() => {
    localStorage.setItem('bamudi_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('bamudi_milestones', JSON.stringify(milestones));
  }, [milestones]);

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
    const today = new Date('2026-07-09'); // Mocked system date matching metadata
    
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
      <path d="M60 44C51 44 48 51 48 58C48 65 52 71 60 71C68 71 72 65 72 58C72 51 69 44 60 44ZM60 65C56 65 54 62 54 58C54 54 56 50 60 50C64 50 66 54 66 58C66 62 64 65 60 65Z" fill="#FFA8BD" />
      <path d="M60 52C58 52 57.5 53.5 57.5 55C57.5 56.5 58 58 60 58C62 58 62.5 56.5 62.5 55C62.5 53.5 62 52 60 52Z" fill="#FFFFFF" />
      <defs>
        <linearGradient id="splash_circle_grad" x1="60" y1="6" x2="60" y2="114" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F46B8A" />
          <stop offset="1" stopColor="#FFA8BD" />
        </linearGradient>
      </defs>
    </svg>
  );

  const drawOnboardingIllustration = (slideIndex: number) => {
    if (slideIndex === 0) {
      return (
        <img
          src="/mother_baby.png"
          alt="Onboarding 1"
          style={{ width: '220px', height: '180px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-premium)', border: '4px solid #FFF' }}
        />
      );
    } else if (slideIndex === 1) {
      return (
        <img
          src="/baby_sleep.png"
          alt="Onboarding 2"
          style={{ width: '220px', height: '180px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-premium)', border: '4px solid #FFF' }}
        />
      );
    } else {
      return (
        <img
          src="/pregnancy.png"
          alt="Onboarding 3"
          style={{ width: '220px', height: '180px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--shadow-premium)', border: '4px solid #FFF' }}
        />
      );
    }
  };

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
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
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
    setChecklist(prev => [...prev, item]);
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
    if (isNaN(w) || isNaN(h)) return;

    setChildren(prev => {
      const copy = [...prev];
      if (copy[activeChildIndex]) {
        copy[activeChildIndex] = {
          ...copy[activeChildIndex],
          weight: w,
          height: h
        };
      }
      return copy;
    });

    setNewGrowthWeight('');
    setNewGrowthHeight('');
    setShowAddGrowthModal(false);
  };

  // Milestone Status Switch
  const toggleMilestoneStatus = (id: string) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id === id) {
          const nextStatus: Record<string, 'achieved' | 'in_progress' | 'upcoming'> = {
            'upcoming': 'in_progress',
            'in_progress': 'achieved',
            'achieved': 'upcoming'
          };
          return { ...m, status: nextStatus[m.status] };
        }
        return m;
      })
    );
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
          <div className={`phone-screen ${isDarkMode ? 'dark-mode' : ''}`}>
            
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
                <div className="screen-scroll-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: '20px' }}>
                  <div className="animate-splash" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
                    <img src="/mother_baby.png" alt="Bamudi logo" style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '30px', boxShadow: 'var(--shadow-premium)', border: '4px solid #FFF' }} />
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-text-primary)', fontWeight: '800' }}>Bamudi Kompass</h2>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '6px', fontWeight: '500' }}>Your Parenting Compass & Guide</p>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '40px', height: '4px', background: 'var(--mother-primary)', borderRadius: '10px' }} />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>LOADING YOUR COMPANION</span>
                  </div>
                </div>
              )}

              {/* FLOW 2: ONBOARDING */}
              {appFlow === 'onboarding' && (
                <OnboardingScreen
                  drawOnboardingIllustration={drawOnboardingIllustration}
                  onFinish={() => setAppFlow('signup')}
                />
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

                    <div className="input-group">
                      <span className="input-label">Current Phase Selection</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setMotherPhase('pregnancy')}
                          className={`btn-secondary ${motherPhase === 'pregnancy' ? 'active' : ''}`}
                          style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', height: '70px', borderRadius: '18px', border: motherPhase === 'pregnancy' ? '2.5px solid var(--mother-primary)' : '1px solid var(--color-border)', background: motherPhase === 'pregnancy' ? 'var(--mother-secondary)' : '#FFF' }}
                        >
                          <Heart size={18} color="var(--mother-primary)" />
                          <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>Pregnancy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMotherPhase('baby')}
                          className={`btn-secondary ${motherPhase === 'baby' ? 'active' : ''}`}
                          style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', height: '70px', borderRadius: '18px', border: motherPhase === 'baby' ? '2.5px solid var(--mother-primary)' : '1px solid var(--color-border)', background: motherPhase === 'baby' ? 'var(--mother-secondary)' : '#FFF' }}
                        >
                          <Baby size={18} color="var(--mother-primary)" />
                          <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>Baby Care</span>
                        </button>
                      </div>
                    </div>

                    {motherPhase === 'pregnancy' && (
                      <div className="input-group animate-fade-in">
                        <span className="input-label">Pregnancy Week: {pregnancyWeek} Weeks</span>
                        <input
                          type="range"
                          min="1"
                          max="42"
                          value={pregnancyWeek}
                          onChange={(e) => setPregnancyWeek(parseInt(e.target.value))}
                          style={{ width: '100%', accentColor: 'var(--mother-primary)' }}
                        />
                      </div>
                    )}

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
                            if (next[0]) next[0].name = name;
                            return next;
                          });
                        }}
                        placeholder="Ayaan"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-label">Date of Birth</span>
                      <input
                        type="date"
                        className="input-field"
                        value={currentBaby.dob}
                        onChange={(e) => {
                          const dob = e.target.value;
                          setChildren(prev => {
                            const next = [...prev];
                            if (next[0]) next[0].dob = dob;
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
                                if (next[0]) next[0].gender = g;
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
                        onClick={() => setAppFlow('select_interests')}
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
                  {/* Module rendering based on Active Tab */}
                  
                  {/* Tab 1: Home Dashboard */}
                  {activeTab === 'dashboard' && (
                    <DashboardModule
                      authName={authName}
                      currentBaby={currentBaby}
                      ageString={calculateBabyAge(currentBaby.dob)}
                      checklistPercent={checklistPercent}
                      completedTasks={completedTasks}
                      totalTasks={totalTasks}
                      checklist={checklist}
                      toggleChecklistItem={toggleChecklistItem}
                      milestones={milestones}
                      toggleMilestoneStatus={toggleMilestoneStatus}
                      calendarEvents={calendarEvents}
                      articles={articles}
                      setActiveTab={setActiveTab}
                      setActiveArticle={setActiveArticle}
                      children={children}
                      activeChildIndex={activeChildIndex}
                      setActiveChildIndex={setActiveChildIndex}
                    />
                  )}

                  {/* Tab 2: Checklist */}
                  {activeTab === 'checklist' && (
                    <ChecklistModule
                      checklist={checklist}
                      toggleChecklistItem={toggleChecklistItem}
                      setShowAddTaskModal={setShowAddTaskModal}
                    />
                  )}

                  {/* Tab 3: Calendar */}
                  {activeTab === 'calendar' && (
                    <CalendarModule
                      calendarEvents={calendarEvents}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      setShowAddEventModal={setShowAddEventModal}
                    />
                  )}

                  {/* Tab 4: Articles */}
                  {activeTab === 'articles' && (
                    <ArticlesModule
                      articles={filteredArticles}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      toggleSaveArticle={toggleSaveArticle}
                      setActiveArticle={setActiveArticle}
                    />
                  )}

                  {/* Tab 5: Profile & Growth Tracker */}
                  {activeTab === 'profile' && (
                    <ProfileModule
                      authName={authName}
                      currentBaby={currentBaby}
                      ageString={calculateBabyAge(currentBaby.dob)}
                      setShowAddGrowthModal={setShowAddGrowthModal}
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                      language={language}
                      setLanguage={setLanguage}
                      handleLogout={handleLogout}
                    />
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
                          : activeTab === 'articles'
                          ? 'var(--article-primary)'
                          : 'var(--color-text-primary)'
                    } as React.CSSProperties}
                  >
                    <button className={`nav-tab-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                      <User size={20} />
                      <span className="nav-tab-label">Home</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'checklist' ? 'active' : ''}`} onClick={() => setActiveTab('checklist')}>
                      <CheckSquare size={20} />
                      <span className="nav-tab-label">Checklist</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
                      <Calendar size={20} />
                      <span className="nav-tab-label">Calendar</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>
                      <BookOpen size={20} />
                      <span className="nav-tab-label">Articles</span>
                    </button>
                    <button className={`nav-tab-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                      <Settings size={20} />
                      <span className="nav-tab-label">Settings</span>
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

      {/* ARTICLE FULL PAGE OVERLAY BOTTOM SHEET */}
      {activeArticle && (
        <div className="bottom-sheet-overlay animate-fade-in" onClick={() => setActiveArticle(null)}>
          <div className="bottom-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-article">{activeArticle.category}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleSaveArticle(activeArticle.id)}
                  style={{ background: 'none', border: 'none', color: activeArticle.saved ? 'var(--article-primary)' : 'var(--color-text-secondary)', cursor: 'pointer' }}
                >
                  <Bookmark size={20} fill={activeArticle.saved ? 'var(--article-primary)' : 'none'} />
                </button>
                <button style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: '1.3' }}>{activeArticle.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>By {activeArticle.author} • {activeArticle.readTime}</p>
            </div>

            <div style={{ flex: 1, borderTop: '1px solid var(--color-border)', paddingTop: '16px', color: 'var(--color-text-primary)', fontSize: '14.5px', lineHeight: '1.6', overflowY: 'auto' }}>
              <p style={{ fontWeight: '500', marginBottom: '14px', color: 'var(--color-text-secondary)' }}>{activeArticle.summary}</p>
              <p>{activeArticle.content}</p>
            </div>

            <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={() => setActiveArticle(null)}>
              Close
            </button>
          </div>
        </div>
      )}

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

// 1. ONBOARDING SCREEN
function OnboardingScreen({
  drawOnboardingIllustration,
  onFinish
}: {
  drawOnboardingIllustration: (slideIndex: number) => React.ReactNode;
  onFinish: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const slidesData = [
    {
      title: 'Bamudi Kompass',
      desc: 'Guidance, Care, Growth. All in one place for every mom.',
      color: 'var(--mother-primary)'
    },
    {
      title: 'Interactive Care',
      desc: 'Personalized checklists, reminders, and child timelines.',
      color: 'var(--baby-primary)'
    },
    {
      title: 'Expert Learning',
      desc: 'Scandinavian-inspired design with premium verified guides.',
      color: 'var(--article-primary)'
    }
  ];

  const handleNext = () => {
    if (slide < 2) {
      setSlide(slide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '30px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
        {drawOnboardingIllustration(slide)}
        
        <div style={{ textAlign: 'center', padding: '0 10px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            {slidesData[slide].title}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '10px', lineHeight: '1.4', maxWidth: '280px', margin: '10px auto 0 auto' }}>
            {slidesData[slide].desc}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Slides Indicator dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(idx => (
            <div
              key={idx}
              style={{
                width: idx === slide ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: idx === slide ? slidesData[slide].color : 'var(--color-border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <button
          className="btn-primary"
          onClick={handleNext}
          style={{ '--theme-color': slidesData[slide].color } as React.CSSProperties}
        >
          {slide === 2 ? 'Get Started' : 'Next'} <ChevronRight size={18} />
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
  completedTasks,
  totalTasks,
  checklist,
  toggleChecklistItem,
  milestones,
  toggleMilestoneStatus,
  calendarEvents,
  articles,
  setActiveTab,
  setActiveArticle,
  children,
  activeChildIndex,
  setActiveChildIndex
}: {
  authName: string;
  currentBaby: any;
  ageString: string;
  checklistPercent: number;
  completedTasks: number;
  totalTasks: number;
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  milestones: MilestoneItem[];
  toggleMilestoneStatus: (id: string) => void;
  calendarEvents: CalendarEvent[];
  articles: Article[];
  setActiveTab: any;
  setActiveArticle: any;
  children: any[];
  activeChildIndex: number;
  setActiveChildIndex: (idx: number) => void;
}) {
  return (
    <div className="screen-scroll-container animate-fade-in">
      
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Good Morning,</span>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '2px' }}>{authName} 💖</h2>
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--mother-secondary)', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={20} color="var(--mother-primary)" />
        </div>
      </div>

      {/* Multiple Children Profile Picker */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px' }}>
        {children.map((child, idx) => (
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

      {/* Mother pregnancy/mood card (Pink theme) */}
      <div className="premium-card floating card-mother" style={{ minHeight: '120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-mother" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#FFF' }}>Mother Overview</span>
            <h3 style={{ fontSize: '18px', marginTop: '10px', fontWeight: '700' }}>Postpartum Recovery</h3>
            <p style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>Day 148 of parenting companion</p>
          </div>
          <Sparkles size={24} color="#FFF" />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          <button style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', padding: '6px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: '#FFF', cursor: 'pointer' }}>Log Mood</button>
          <button style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', padding: '6px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: '#FFF', cursor: 'pointer' }}>Vitals</button>
        </div>
      </div>

      {/* Baby Status Card (Green theme) */}
      <div className="premium-card floating card-baby">
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <img
            src="/mother_baby.png"
            alt="Baby avatar"
            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.4)' }}
          />
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: '800' }}>{currentBaby.name}</h3>
            <p style={{ fontSize: '13px', opacity: 0.9 }}>{ageString}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px', marginTop: '12px', fontSize: '12px' }}>
          <div>
            <span style={{ display: 'block', opacity: 0.8 }}>Weight</span>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>{currentBaby.weight} kg</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', opacity: 0.8 }}>Height</span>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>{currentBaby.height} cm</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', opacity: 0.8 }}>Status</span>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>Healthy</span>
          </div>
        </div>
      </div>

      {/* Checklist Progress Ring & Summary */}
      <div className="premium-card floating" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="progress-ring-container">
          <svg width="60" height="60">
            <circle cx="30" cy="30" r="26" stroke="var(--color-border)" strokeWidth="5" fill="transparent" />
            <circle
              className="progress-ring-circle"
              cx="30"
              cy="30"
              r="26"
              stroke="var(--baby-primary)"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - checklistPercent / 100)}`}
            />
          </svg>
          <span style={{ position: 'absolute', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{checklistPercent}%</span>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>Checklist Progress</h4>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{completedTasks} of {totalTasks} daily tasks completed</p>
        </div>
        <button
          onClick={() => setActiveTab('checklist')}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--baby-secondary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--baby-primary)', cursor: 'pointer' }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Today's Tasks preview */}
      <div style={{ margin: '14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Today's Tasks</h3>
          <button onClick={() => setActiveTab('checklist')} style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>View All</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {checklist.filter(t => t.category === 'daily').slice(0, 3).map(task => (
            <div key={task.id} className={`checklist-item ${task.completed ? 'checked' : ''}`} onClick={() => toggleChecklistItem(task.id)} style={{ padding: '12px' }}>
              <div className={`checklist-checkbox ${task.completed ? 'checked' : ''}`}>
                {task.completed && <Check size={14} />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '13.5px', fontWeight: '600', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}>{task.task}</span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{task.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events preview */}
      {calendarEvents.length > 0 && (
        <div className="premium-card floating accent-card-cal" style={{ padding: '14px 18px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} color="var(--cal-primary)" />
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--cal-primary)' }}>Upcoming Event</h4>
          </div>
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{calendarEvents[0].title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{calendarEvents[0].date} at {calendarEvents[0].time}</p>
          </div>
        </div>
      )}

      {/* Milestones preview banner */}
      {(() => {
        const activeMilestone = milestones.find(m => m.status === 'in_progress') || milestones[0] || { id: 'm_m2', title: 'Rolls over', status: 'in_progress' };
        return (
          <div
            onClick={() => toggleMilestoneStatus(activeMilestone.id)}
            className="premium-card floating accent-card-dev"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}
          >
            <Award size={22} color="var(--dev-primary)" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: 'var(--dev-primary)' }}>Active Milestone (Click to Cycle)</span>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginTop: '1px' }}>{activeMilestone.title}</h4>
            </div>
            <span className="badge badge-dev" style={{ fontSize: '9px' }}>
              {activeMilestone.status === 'in_progress' ? 'In Progress' : activeMilestone.status === 'achieved' ? 'Achieved' : 'Upcoming'}
            </span>
          </div>
        );
      })()}

      {/* Recommended Articles list */}
      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>Articles For You</h3>
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
              <div style={{ flex: 1 }}>
                <span className="badge badge-article" style={{ fontSize: '9px', padding: '3px 8px' }}>{art.category}</span>
                <h4 style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px', lineHeight: '1.3' }}>{art.title}</h4>
                <span style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px' }}>{art.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// 3. CHECKLIST MODULE
function ChecklistModule({
  checklist,
  toggleChecklistItem,
  setShowAddTaskModal
}: {
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  setShowAddTaskModal: (val: boolean) => void;
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
            <div key={item.id} className={`checklist-item ${item.completed ? 'checked' : ''}`} onClick={() => toggleChecklistItem(item.id)}>
              <div className={`checklist-checkbox ${item.completed ? 'checked' : ''}`}>
                {item.completed && <Check size={14} />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: '600', textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}>{item.task}</span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{item.time}</span>
              </div>
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
  setShowAddEventModal
}: {
  calendarEvents: CalendarEvent[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setShowAddEventModal: (val: boolean) => void;
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
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{event.time}</span>
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
                  <span className="badge badge-article">{art.category}</span>
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

// 6. PROFILE & SETTINGS MODULE
function ProfileModule({
  authName,
  currentBaby,
  ageString,
  setShowAddGrowthModal,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  handleLogout
}: {
  authName: string;
  currentBaby: any;
  ageString: string;
  setShowAddGrowthModal: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
  handleLogout: () => void;
}) {
  const [activeProfileTab, setActiveProfileTab] = useState<'growth' | 'settings'>('growth');

  return (
    <div className="screen-scroll-container animate-fade-in" style={{ '--theme-color': 'var(--baby-primary)' } as React.CSSProperties}>
      
      {/* Hero Header */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '10px 0 20px 0' }}>
        <img
          src="/mother_baby.png"
          alt="Baby avatar"
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #FFF', boxShadow: 'var(--shadow-sm)' }}
        />
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{currentBaby.name}'s Profile</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>{ageString}</p>
        </div>
      </div>

      {/* Tab Selectors */}
      <div style={{ display: 'flex', background: 'var(--color-border)', padding: '4px', borderRadius: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveProfileTab('growth')}
          style={{
            flex: 1,
            border: 'none',
            background: activeProfileTab === 'growth' ? '#FFFFFF' : 'transparent',
            color: activeProfileTab === 'growth' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            padding: '8px 0',
            borderRadius: '9px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Growth Tracker
        </button>
        <button
          onClick={() => setActiveProfileTab('settings')}
          style={{
            flex: 1,
            border: 'none',
            background: activeProfileTab === 'settings' ? '#FFFFFF' : 'transparent',
            color: activeProfileTab === 'settings' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            padding: '8px 0',
            borderRadius: '9px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          App Settings
        </button>
      </div>

      {activeProfileTab === 'growth' ? (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Growth Curve Chart using Premium SVGs */}
          <div className="premium-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800' }}>Weight Curve (5 Months)</h4>
              <button
                onClick={() => setShowAddGrowthModal(true)}
                style={{ background: 'none', border: 'none', color: 'var(--baby-primary)', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}
              >
                <PlusCircle size={14} /> Log Metrics
              </button>
            </div>

            {/* Custom SVG Growth curve chart */}
            <div style={{ width: '100%', height: '150px', background: 'var(--bg-app)', borderRadius: '14px', padding: '10px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                {/* Horizontal Guide lines */}
                <line x1="0" y1="90" x2="300" y2="90" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Simulated standard deviation percentile band */}
                <path d="M 0 110 Q 75 75 150 50 T 300 25 L 300 45 Q 225 70 150 85 T 0 120 Z" fill="rgba(83, 200, 139, 0.1)" />

                {/* Ayaan's Growth Path */}
                <path d="M 0 100 Q 75 70 150 46 T 300 15" stroke="var(--baby-primary)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                
                {/* Growth data points */}
                <circle cx="0" cy="100" r="4" fill="var(--baby-primary)" />
                <circle cx="75" cy="70" r="4" fill="var(--baby-primary)" />
                <circle cx="150" cy="46" r="4" fill="var(--baby-primary)" />
                <circle cx="300" cy="15" r="5" fill="var(--baby-primary)" />
              </svg>
              {/* Tooltip detail */}
              <div style={{ position: 'absolute', top: '10px', right: '14px', background: 'var(--baby-primary)', color: '#FFF', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '10px' }}>
                Latest: {currentBaby.weight} kg
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '8px', padding: '0 4px' }}>
              <span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 5 (Now)</span>
            </div>
          </div>

          {/* Core Growth Statistics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div className="premium-card" style={{ padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Weight Status</span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: 'var(--baby-primary)' }}>{currentBaby.weight} kg</h3>
              <p style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>+0.4 kg from last month</p>
            </div>
            <div className="premium-card" style={{ padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Height Status</span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: 'var(--baby-primary)' }}>{currentBaby.height} cm</h3>
              <p style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Percentile 74%</p>
            </div>
          </div>

        </div>
      ) : (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Settings List */}
          <div className="switch-container">
            <span style={{ fontSize: '14px', fontWeight: '700' }}>Dark Mode Theme</span>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div style={{ padding: '8px 4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Mother Account: <strong style={{ color: 'var(--color-text-primary)' }}>{authName}</strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div
              onClick={() => setLanguage(language === 'English' ? 'Danish' : 'English')}
              style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Language</span>
              <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{language}</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>App Notifications</span>
              <span style={{ fontSize: '12.5px', color: 'var(--color-success)', fontWeight: '700' }}>Enabled</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Privacy & Terms</span>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Help Center & FAQ</span>
              <HelpCircle size={16} color="var(--color-text-secondary)" />
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Support Hotline</span>
              <ChevronRight size={16} color="var(--color-text-secondary)" />
            </div>
          </div>

          <button onClick={handleLogout} className="btn-secondary" style={{ color: 'var(--reminder-primary)', borderColor: 'var(--reminder-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            <LogOut size={16} /> Logout Account
          </button>

        </div>
      )}

    </div>
  );
}
