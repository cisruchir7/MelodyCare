export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'setup'
  | 'home'
  | 'learn'
  | 'lesson_intro'
  | 'lesson_interactive'
  | 'activity'
  | 'instrument'
  | 'lesson_complete'
  | 'practice'
  | 'progress'
  | 'rewards'
  | 'profile'
  | 'parent_dashboard';

export type MainTab = 'home' | 'learn' | 'practice' | 'progress' | 'profile';

export type MascotMood = 'happy' | 'talking' | 'celebrating' | 'listening' | 'dancing' | 'calm';

export interface StudentProfile {
  name: string;
  avatar: string;
  ageGroup: '4-6' | '7-10' | '11-15' | '16+';
  learningLevel: 'Beginner' | 'Explorer' | 'Musician';
  preferredInstrument: 'Piano' | 'Xylophone' | 'Drums' | 'Guitar';
  sensoryMode: 'Gentle' | 'Standard' | 'Vibrant';
  starsCount: number;
  streakDays: number;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  voiceInstructions: boolean;
  largeTouchTargets: boolean;
  soundVolume: number; // 0 to 100
  gentleSoundsOnly: boolean;
  visualMetronome: boolean;
}

export interface LessonCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  lessonsCompleted: number;
  totalLessons: number;
  difficulty: 'Very Easy' | 'Easy' | 'Intermediate';
}

export interface LessonItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  targetConcept: string;
  targetNote?: string;
  targetNoteFrequency?: number;
  activityType: 'note_discovery' | 'sound_match' | 'rhythm_tap' | 'pattern_repeat' | 'piano_guided';
  rewardStars: number;
  badgeName: string;
}

export interface RewardBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  color: string;
}

export interface PracticeItem {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  iconName: string;
  color: string;
  activityType: 'piano_free' | 'rhythm_pulse' | 'sound_explorer' | 'drum_jam';
}

export interface ParentAnalytics {
  totalPracticeMinutesThisWeek: number;
  lessonsCompletedTotal: number;
  accuracyRatePercent: number;
  calmEngagementScore: number; // 1 to 10
  dailyEngagement: { day: string; minutes: number; completed: number }[];
  masteredSkills: string[];
  skillsInDevelopment: string[];
  notesAndObservations: string[];
}
