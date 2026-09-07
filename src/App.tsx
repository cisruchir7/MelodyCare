import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Monitor, Sparkles, Sliders } from 'lucide-react';
import {
  ScreenName,
  MainTab,
  StudentProfile,
  AccessibilitySettings,
  LessonItem,
} from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_LESSONS,
  INITIAL_BADGES,
  INITIAL_PRACTICE_ITEMS,
  INITIAL_PARENT_ANALYTICS,
} from './data/mockData';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { AccessibilityModal } from './components/AccessibilityModal';
import { ParentGateModal } from './components/ParentGateModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { StudentSetupScreen } from './components/screens/StudentSetupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LearnScreen } from './components/screens/LearnScreen';
import { LessonIntroScreen } from './components/screens/LessonIntroScreen';
import { InteractiveLessonScreen } from './components/screens/InteractiveLessonScreen';
import { InteractiveActivityScreen } from './components/screens/InteractiveActivityScreen';
import { VirtualInstrumentScreen } from './components/screens/VirtualInstrumentScreen';
import { LessonCompleteScreen } from './components/screens/LessonCompleteScreen';
import { PracticeScreen } from './components/screens/PracticeScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ParentTeacherDashboard } from './components/screens/ParentTeacherDashboard';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedLesson, setSelectedLesson] = useState<LessonItem>(INITIAL_LESSONS[0]);

  // Frame presentation toggle (Smartphone device frame vs Edge-to-Edge)
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Student Profile State
  const [student, setStudent] = useState<StudentProfile>({
    name: 'Alex',
    avatar: '🦊',
    ageGroup: '7-10',
    learningLevel: 'Beginner',
    preferredInstrument: 'Piano',
    sensoryMode: 'Gentle',
    starsCount: 18,
    streakDays: 3,
  });

  // Accessibility Settings
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    voiceInstructions: true,
    largeTouchTargets: true,
    soundVolume: 75,
    gentleSoundsOnly: true,
    visualMetronome: true,
  });

  // Modals state
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);

  // Handle Tab navigation
  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'learn':
        setCurrentScreen('learn');
        break;
      case 'practice':
        setCurrentScreen('practice');
        break;
      case 'progress':
        setCurrentScreen('progress');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // Lesson launchers
  const handleLaunchLesson = (lessonId: string) => {
    const lesson = INITIAL_LESSONS.find((l) => l.id === lessonId) || INITIAL_LESSONS[0];
    setSelectedLesson(lesson);
    setCurrentScreen('lesson_intro');
  };

  // Back button handling
  const handleBack = () => {
    if (currentScreen === 'lesson_intro') {
      setCurrentScreen('learn');
    } else if (currentScreen === 'lesson_interactive') {
      setCurrentScreen('lesson_intro');
    } else if (currentScreen === 'activity') {
      setCurrentScreen('lesson_interactive');
    } else if (currentScreen === 'instrument') {
      setCurrentScreen('practice');
    } else if (currentScreen === 'rewards') {
      setCurrentScreen('home');
    } else if (currentScreen === 'parent_dashboard') {
      setCurrentScreen('profile');
    } else {
      setCurrentScreen('home');
    }
  };

  const isMainTabScreen = ['home', 'learn', 'practice', 'progress', 'profile'].includes(currentScreen);
  const showTopBar = !['splash', 'onboarding', 'setup', 'parent_dashboard'].includes(currentScreen);
  const showBottomNav = isMainTabScreen;

  // Title for TopBar
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'lesson_intro':
      case 'lesson_interactive':
        return selectedLesson.title;
      case 'activity':
        return 'Music Activity';
      case 'instrument':
        return 'Virtual Instrument';
      case 'rewards':
        return 'Stars & Badges';
      default:
        return undefined;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-0 sm:p-4 bg-slate-900 selection:bg-amber-300 selection:text-slate-900 ${
        accessibility.highContrast ? 'high-contrast' : ''
      } ${accessibility.reducedMotion ? 'reduced-motion' : ''}`}
    >
      {/* Top Test Bench Controls: Frame mode & Screen jump bar */}
      <aside aria-label="Prototype controls" className="w-full max-w-lg mb-2 hidden sm:flex items-center justify-between px-3 py-1.5 bg-slate-800/90 text-slate-300 rounded-2xl border border-slate-700 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400">MelodyCare Demo:</span>
          <select
            value={currentScreen}
            onChange={(e) => {
              const val = e.target.value as ScreenName;
              setCurrentScreen(val);
              if (['home', 'learn', 'practice', 'progress', 'profile'].includes(val)) {
                setActiveTab(val as MainTab);
              }
            }}
            className="bg-slate-700 text-white rounded-xl px-2 py-1 font-semibold border border-slate-600 focus:outline-hidden cursor-pointer"
          >
            <option value="splash">Screen A: Splash</option>
            <option value="onboarding">Screen B: Onboarding</option>
            <option value="setup">Screen C: Student Setup</option>
            <option value="home">Screen D: Home Dashboard</option>
            <option value="learn">Screen E: Learn Categories</option>
            <option value="lesson_intro">Screen F: Lesson Intro</option>
            <option value="lesson_interactive">Screen G: Animated Lesson</option>
            <option value="activity">Screen H: Interactive Activity</option>
            <option value="instrument">Screen I: Virtual Instrument</option>
            <option value="lesson_complete">Screen J: Lesson Complete</option>
            <option value="practice">Screen K: Practice Studio</option>
            <option value="progress">Screen L: Progress Dashboard</option>
            <option value="rewards">Screen M: Rewards & Badges</option>
            <option value="profile">Screen N: Profile & Access</option>
            <option value="parent_dashboard">Screen O: Parent/Teacher Hub</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Device Frame */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all cursor-pointer"
            title="Toggle Smartphone Mockup Frame vs Full Window"
          >
            {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isPhoneFrame ? 'Full View' : 'Phone Frame'}</span>
          </button>
        </div>
      </aside>

      {/* Main Container / Smartphone Shell */}
      <div
        className={`w-full bg-white overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-sm sm:max-w-md h-[100dvh] sm:h-[844px] sm:rounded-[44px] sm:border-[10px] sm:border-slate-800 relative'
            : 'max-w-2xl h-[100dvh] sm:rounded-3xl'
        }`}
      >
        {/* Smartphone Speaker Notch for Phone Mockup */}
        {isPhoneFrame && (
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-50 pointer-events-none">
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
          </div>
        )}

        {/* Global Top Bar */}
        {showTopBar && (
          <TopBar
            currentScreen={currentScreen}
            title={getScreenTitle()}
            student={student}
            accessibility={accessibility}
            onBack={handleBack}
            canGoBack={!isMainTabScreen}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            onOpenParentGate={() => setIsParentGateOpen(true)}
            onReplayAudio={() => {}}
          />
        )}

        {/* Dynamic Screen View Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          <AnimatePresence mode="wait">
            {currentScreen === 'splash' && (
              <motion.div
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <SplashScreen
                  onStart={() => setCurrentScreen('onboarding')}
                  voiceEnabled={accessibility.voiceInstructions}
                />
              </motion.div>
            )}

            {currentScreen === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <OnboardingScreen
                  onComplete={() => setCurrentScreen('setup')}
                  voiceEnabled={accessibility.voiceInstructions}
                />
              </motion.div>
            )}

            {currentScreen === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <StudentSetupScreen
                  initialProfile={student}
                  voiceEnabled={accessibility.voiceInstructions}
                  onSave={(updated) => {
                    setStudent(updated);
                    setCurrentScreen('home');
                    setActiveTab('home');
                  }}
                />
              </motion.div>
            )}

            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <HomeScreen
                  student={student}
                  voiceEnabled={accessibility.voiceInstructions}
                  onStartLesson={handleLaunchLesson}
                  onOpenVirtualPiano={() => setCurrentScreen('instrument')}
                  onGoToLearn={() => handleSelectTab('learn')}
                  onGoToPractice={() => handleSelectTab('practice')}
                  onGoToRewards={() => setCurrentScreen('rewards')}
                />
              </motion.div>
            )}

            {currentScreen === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <LearnScreen
                  categories={INITIAL_CATEGORIES}
                  lessons={INITIAL_LESSONS}
                  voiceEnabled={accessibility.voiceInstructions}
                  onSelectLesson={(lesson) => {
                    setSelectedLesson(lesson);
                    setCurrentScreen('lesson_intro');
                  }}
                />
              </motion.div>
            )}

            {currentScreen === 'lesson_intro' && (
              <motion.div
                key="lesson_intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <LessonIntroScreen
                  lesson={selectedLesson}
                  voiceEnabled={accessibility.voiceInstructions}
                  onStartLesson={() => setCurrentScreen('lesson_interactive')}
                  onBack={() => setCurrentScreen('learn')}
                />
              </motion.div>
            )}

            {currentScreen === 'lesson_interactive' && (
              <motion.div
                key="lesson_interactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <InteractiveLessonScreen
                  lesson={selectedLesson}
                  voiceEnabled={accessibility.voiceInstructions}
                  onProceedToActivity={() => setCurrentScreen('activity')}
                  onBack={() => setCurrentScreen('lesson_intro')}
                />
              </motion.div>
            )}

            {currentScreen === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <InteractiveActivityScreen
                  activityType={selectedLesson.activityType}
                  voiceEnabled={accessibility.voiceInstructions}
                  onComplete={() => {
                    setStudent((prev) => ({
                      ...prev,
                      starsCount: prev.starsCount + selectedLesson.rewardStars,
                    }));
                    setCurrentScreen('lesson_complete');
                  }}
                  onBack={() => setCurrentScreen('lesson_interactive')}
                />
              </motion.div>
            )}

            {currentScreen === 'instrument' && (
              <motion.div
                key="instrument"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <VirtualInstrumentScreen
                  voiceEnabled={accessibility.voiceInstructions}
                  onBack={() => setCurrentScreen('practice')}
                />
              </motion.div>
            )}

            {currentScreen === 'lesson_complete' && (
              <motion.div
                key="lesson_complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <LessonCompleteScreen
                  lessonTitle={selectedLesson.title}
                  badgeName={selectedLesson.badgeName}
                  voiceEnabled={accessibility.voiceInstructions}
                  onContinue={() => {
                    setCurrentScreen('home');
                    setActiveTab('home');
                  }}
                  onPracticeAgain={() => setCurrentScreen('activity')}
                />
              </motion.div>
            )}

            {currentScreen === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <PracticeScreen
                  practiceItems={INITIAL_PRACTICE_ITEMS}
                  voiceEnabled={accessibility.voiceInstructions}
                  onLaunchPractice={(actType) => {
                    if (actType === 'piano_free') {
                      setCurrentScreen('instrument');
                    } else {
                      setCurrentScreen('activity');
                    }
                  }}
                  onOpenVirtualPiano={() => setCurrentScreen('instrument')}
                />
              </motion.div>
            )}

            {currentScreen === 'progress' && (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <ProgressScreen
                  student={student}
                  analytics={INITIAL_PARENT_ANALYTICS}
                  voiceEnabled={accessibility.voiceInstructions}
                  onGoToRewards={() => setCurrentScreen('rewards')}
                />
              </motion.div>
            )}

            {currentScreen === 'rewards' && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <RewardsScreen
                  badges={INITIAL_BADGES}
                  student={student}
                  voiceEnabled={accessibility.voiceInstructions}
                  onBack={() => setCurrentScreen('home')}
                />
              </motion.div>
            )}

            {currentScreen === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <ProfileScreen
                  student={student}
                  accessibility={accessibility}
                  onOpenAccessibilityModal={() => setIsAccessibilityOpen(true)}
                  onOpenParentGate={() => setIsParentGateOpen(true)}
                  onEditStudentSetup={() => setCurrentScreen('setup')}
                />
              </motion.div>
            )}

            {currentScreen === 'parent_dashboard' && (
              <motion.div
                key="parent_dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <ParentTeacherDashboard
                  student={student}
                  analytics={INITIAL_PARENT_ANALYTICS}
                  onBackToStudentApp={() => {
                    setCurrentScreen('profile');
                    setActiveTab('profile');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Accessible Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            highContrast={accessibility.highContrast}
          />
        )}

        {/* Smartphone Bottom Home Bar Indicator for Phone Mockup */}
        {isPhoneFrame && (
          <div className="hidden sm:block w-32 h-1 bg-slate-300 rounded-full mx-auto my-1.5" />
        )}
      </div>

      {/* Accessibility Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={(newSettings) =>
          setAccessibility((prev) => ({ ...prev, ...newSettings }))
        }
      />

      {/* Parent Gate Challenge Modal */}
      <ParentGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onSuccess={() => {
          setIsParentGateOpen(false);
          setCurrentScreen('parent_dashboard');
        }}
      />
    </div>
  );
}
