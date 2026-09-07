import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCcw, ArrowRight, Sparkles, Check, Heart } from 'lucide-react';
import { LessonItem } from '../../types';
import { MascotCharacter } from '../MascotCharacter';
import { playNoteSound, playGentleTapSound, playSuccessChime, speakInstruction } from '../../utils/audio';

interface InteractiveLessonProps {
  lesson: LessonItem;
  voiceEnabled: boolean;
  onProceedToActivity: () => void;
  onBack: () => void;
}

export const InteractiveLessonScreen: React.FC<InteractiveLessonProps> = ({
  lesson,
  voiceEnabled,
  onProceedToActivity,
  onBack,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [hasPlayedNote, setHasPlayedNote] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

  const steps = [
    {
      instruction: "Let's learn Red Note C! We call it 'Do'.",
      voiceText: "Let's learn Red Note C! We call it Do. Listen to how warm it sounds.",
      mascotMood: 'talking' as const,
    },
    {
      instruction: "Tap the big red note to hear it sing!",
      voiceText: "Tap the big red note to hear it sing!",
      mascotMood: 'listening' as const,
    },
    {
      instruction: "Fantastic! Note C sits happily at the bottom of the ladder.",
      voiceText: "Fantastic! Note C sits happily at the bottom of the ladder. Now let's try a fun mini-activity!",
      mascotMood: 'celebrating' as const,
    },
  ];

  const currentStep = steps[stepIndex];

  const handlePlayTargetNote = () => {
    playNoteSound('C4', 'piano', 85);
    setHasPlayedNote(true);
    setIsPlayingAnimation(true);
    setTimeout(() => setIsPlayingAnimation(false), 900);

    if (stepIndex === 1) {
      setTimeout(() => {
        setStepIndex(2);
        playSuccessChime();
        speakInstruction(steps[2].voiceText, voiceEnabled);
      }, 800);
    }
  };

  const handleNextStep = () => {
    playGentleTapSound();
    if (stepIndex === 0) {
      setStepIndex(1);
      speakInstruction(steps[1].voiceText, voiceEnabled);
    } else if (stepIndex === 1) {
      handlePlayTargetNote();
    } else {
      playSuccessChime();
      onProceedToActivity();
    }
  };

  const handleReplayCurrent = () => {
    speakInstruction(currentStep.voiceText, voiceEnabled);
    playNoteSound('C4', 'piano', 85);
  };

  return (
    <div className="flex flex-col justify-between min-h-full p-5 bg-gradient-to-b from-rose-50/50 via-white to-amber-50/50 select-none pb-8 overflow-y-auto">
      {/* Top Header Controls: Step tracker & Replay */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold uppercase tracking-wide">
          Step {stepIndex + 1} of 3
        </span>

        <button
          onClick={handleReplayCurrent}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
          <span>Replay Instruction</span>
        </button>
      </div>

      {/* Mascot Guide */}
      <div className="pt-2 text-center">
        <MascotCharacter
          mood={currentStep.mascotMood}
          size="sm"
          speechText={currentStep.instruction}
          voiceEnabled={voiceEnabled}
        />
      </div>

      {/* Main Interactive Musical Visual Stage */}
      <div className="my-auto py-2 flex flex-col items-center justify-center">
        {/* Musical Staff lines representation */}
        <div className="relative w-full max-w-xs h-24 flex flex-col justify-between py-2 px-4 mb-3 bg-white/70 rounded-2xl border border-slate-200 shadow-2xs">
          {[1, 2, 3, 4, 5].map((line) => (
            <div key={line} className="w-full h-0.5 bg-slate-300" />
          ))}

          {/* Clef Indicator */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-serif text-slate-600 select-none">
            𝄞
          </div>

          {/* Note positioned on ledger line */}
          <motion.div
            animate={
              isPlayingAnimation
                ? { scale: [1, 1.25, 1], y: [0, -6, 0] }
                : { y: [0, -2, 0] }
            }
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-6 bg-rose-500 rounded-full border-2 border-rose-700 shadow-xs flex items-center justify-center text-white text-[10px] font-bold"
          >
            C
            {/* Ledger Line through middle */}
            <div className="absolute -left-2 -right-2 top-1/2 h-0.5 bg-rose-700 pointer-events-none" />
          </motion.div>
        </div>

        {/* Large Interactive Touch Target for the Note */}
        <div className="relative mt-2">
          {/* Pulsing sound ring when played */}
          {isPlayingAnimation && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-full bg-rose-400 -z-10"
            />
          )}

          <motion.button
            whileTap={{ scale: 0.92 }}
            animate={stepIndex === 1 && !hasPlayedNote ? { scale: [1, 1.06, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.6 }}
            onClick={handlePlayTargetNote}
            className={`w-36 h-36 rounded-full bg-gradient-to-br from-rose-500 to-red-600 border-4 border-white shadow-xl flex flex-col items-center justify-center text-white cursor-pointer active:scale-95 transition-all ${
              stepIndex === 1 ? 'ring-4 ring-amber-400 ring-offset-4 animate-pulse' : ''
            }`}
          >
            <span className="text-4xl font-extrabold font-mono">C</span>
            <span className="text-sm font-extrabold tracking-widest uppercase mt-0.5">
              Do
            </span>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full mt-1">
              Tap to Sing
            </span>
          </motion.button>
        </div>

        {/* Sensory audio feedback label */}
        <p className="text-xs font-bold text-slate-500 mt-4 flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 text-rose-500" />
          Pitch: Middle C (261 Hz) • Warm Bell Tone
        </p>
      </div>

      {/* Bottom Step Action Button */}
      <div className="max-w-sm mx-auto w-full pt-2">
        <button
          onClick={handleNextStep}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-lg font-fun shadow-md border-2 border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>
            {stepIndex === 2
              ? 'Play Note Activity!'
              : stepIndex === 1
              ? 'Tap Note Above (or Next)'
              : 'Next Step'}
          </span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
