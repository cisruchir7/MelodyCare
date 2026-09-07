import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Star, Award, Sparkles, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { MascotCharacter } from '../MascotCharacter';
import { playSuccessChime, playGentleTapSound, speakInstruction } from '../../utils/audio';

interface LessonCompleteProps {
  lessonTitle: string;
  badgeName?: string;
  voiceEnabled: boolean;
  onContinue: () => void;
  onPracticeAgain: () => void;
}

export const LessonCompleteScreen: React.FC<LessonCompleteProps> = ({
  lessonTitle,
  badgeName = 'Do-Explorer Badge',
  voiceEnabled,
  onContinue,
  onPracticeAgain,
}) => {
  useEffect(() => {
    // Fire cheerful confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
      });
    } catch (e) {
      // safe fallback
    }

    playSuccessChime();
    speakInstruction("Great job! You completed your lesson and earned three stars!", voiceEnabled);
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-full p-6 bg-gradient-to-b from-amber-100/80 via-white to-rose-50/80 select-none pb-8 overflow-y-auto text-center">
      {/* Top Praise Banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="pt-2"
      >
        <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Lesson Completed!
        </span>

        <h1 className="text-3xl font-extrabold text-slate-800 font-fun mt-2 leading-tight">
          Super Star Work!
        </h1>
        <p className="text-sm text-slate-600 font-medium mt-0.5">
          You mastered {lessonTitle}
        </p>
      </motion.div>

      {/* Mascot Dancing & Stars Display */}
      <div className="my-auto py-3 space-y-4">
        {/* Animated Mascot in celebrating mood */}
        <MascotCharacter
          mood="celebrating"
          size="md"
          speechText="You are an amazing musician! ⭐"
          voiceEnabled={voiceEnabled}
        />

        {/* 3 Large Popping Golden Stars */}
        <div className="flex justify-center items-center gap-3">
          {[1, 2, 3].map((starNum) => (
            <motion.div
              key={starNum}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + starNum * 0.18, type: 'spring', stiffness: 220 }}
              className="w-14 h-14 rounded-2xl bg-amber-400 border-3 border-amber-300 text-slate-900 flex items-center justify-center shadow-lg"
            >
              <Star className="w-8 h-8 fill-amber-200 text-amber-900" />
            </motion.div>
          ))}
        </div>

        {/* Badge Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-xs mx-auto p-4 rounded-3xl bg-white border-2 border-amber-300 shadow-md flex items-center gap-3.5 text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-2xl shadow-xs">
            🏅
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
              Badge Unlocked
            </span>
            <h3 className="font-extrabold text-slate-800 text-sm font-fun">
              {badgeName}
            </h3>
            <p className="text-xs text-slate-500">Added to your collection</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions: Practice Again & Continue */}
      <div className="max-w-sm mx-auto w-full space-y-2.5 pt-2">
        <button
          onClick={() => {
            playGentleTapSound();
            onContinue();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-lg font-fun shadow-md border-2 border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => {
            playGentleTapSound();
            onPracticeAgain();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-sm border-2 border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};
