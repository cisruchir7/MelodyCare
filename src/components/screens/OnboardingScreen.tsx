import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Volume2, Music, Check, Star, Heart, Clock } from 'lucide-react';
import { playGentleTapSound, playSuccessChime, speakInstruction } from '../../utils/audio';

interface OnboardingScreenProps {
  onComplete: () => void;
  voiceEnabled: boolean;
}

interface StepData {
  title: string;
  description: string;
  illustration: string; // large visual emoji / icon composition
  accentColor: string;
  tag: string;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  voiceEnabled,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: StepData[] = [
    {
      title: 'Fun Music Activities',
      description: 'Tap colorful notes, play gentle piano keys, and explore instruments!',
      illustration: '🎹',
      accentColor: 'from-amber-400 to-orange-400',
      tag: 'Step 1 of 4',
    },
    {
      title: 'Follow Friendly Pip',
      description: 'Pip guides you one step at a time with warm visual cues and voice.',
      illustration: '🦊',
      accentColor: 'from-sky-400 to-blue-500',
      tag: 'Step 2 of 4',
    },
    {
      title: 'Your Own Pace',
      description: 'No timers or pressure. Practice whenever you feel comfortable.',
      illustration: '🕊️',
      accentColor: 'from-emerald-400 to-teal-500',
      tag: 'Step 3 of 4',
    },
    {
      title: 'Earn Stars & Badges',
      description: 'Celebrate every step! Collect shining stars and joyful trophies.',
      illustration: '⭐',
      accentColor: 'from-purple-400 to-indigo-500',
      tag: 'Step 4 of 4',
    },
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    playGentleTapSound();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      speakInstruction(steps[currentStep + 1].title, voiceEnabled);
    } else {
      playSuccessChime();
      onComplete();
    }
  };

  const handleSkip = () => {
    playGentleTapSound();
    onComplete();
  };

  return (
    <div className="flex flex-col justify-between min-h-full p-6 bg-slate-50 select-none">
      {/* Top bar with Skip and Step dots */}
      <div className="flex items-center justify-between pt-2">
        {/* Step Indicator Dots */}
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center"
          >
            {/* Big friendly illustration circle */}
            <div
              className={`w-44 h-44 rounded-3xl bg-gradient-to-br ${step.accentColor} shadow-xl flex items-center justify-center text-7xl mb-6 relative border-4 border-white`}
            >
              <span>{step.illustration}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-amber-500 text-xl"
              >
                ✨
              </motion.div>
            </div>

            {/* Tag */}
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              {step.tag}
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-fun px-2">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-base text-slate-600 font-medium mt-2 max-w-xs leading-relaxed">
              {step.description}
            </p>

            {/* Audio Voice prompt button */}
            <button
              onClick={() => speakInstruction(`${step.title}. ${step.description}`, voiceEnabled)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>Listen to this step</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full max-w-sm mx-auto space-y-3 pb-2">
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-lg font-fun shadow-md border-2 border-amber-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{currentStep === steps.length - 1 ? 'Get Started!' : 'Next'}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
