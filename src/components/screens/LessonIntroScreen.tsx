import React from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, Clock, Award, Target, Sparkles, ArrowLeft } from 'lucide-react';
import { LessonItem } from '../../types';
import { MascotCharacter } from '../MascotCharacter';
import { playGentleTapSound, speakInstruction } from '../../utils/audio';

interface LessonIntroProps {
  lesson: LessonItem;
  voiceEnabled: boolean;
  onStartLesson: () => void;
  onBack: () => void;
}

export const LessonIntroScreen: React.FC<LessonIntroProps> = ({
  lesson,
  voiceEnabled,
  onStartLesson,
  onBack,
}) => {
  const introVoicePrompt = `Welcome! Today we will explore ${lesson.title}. Our goal is: ${lesson.targetConcept}. When you are ready, tap Start Lesson!`;

  return (
    <div className="flex flex-col justify-between min-h-full p-5 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50 select-none pb-8 overflow-y-auto">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            playGentleTapSound();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-bold text-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lessons
        </button>

        {/* Listen button */}
        <button
          onClick={() => speakInstruction(introVoicePrompt, voiceEnabled)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs cursor-pointer active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Listen to Objective</span>
        </button>
      </div>

      {/* Center Card with Mascot Instructor */}
      <div className="my-auto py-3 space-y-4 max-w-sm mx-auto w-full text-center">
        {/* Animated Mascot Instructor Pip */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center"
        >
          <MascotCharacter
            mood="talking"
            size="md"
            voiceEnabled={voiceEnabled}
            speechText={`Let's learn ${lesson.targetConcept}!`}
          />
        </motion.div>

        {/* Lesson Title & Concept */}
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wide">
            Interactive Music Lesson
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-fun mt-2">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            {lesson.description}
          </p>
        </div>

        {/* Objective & Details Card */}
        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-sm text-left space-y-2.5">
          <div className="flex items-center gap-2.5 text-slate-700">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Learning Objective</p>
              <p className="text-xs font-extrabold text-slate-800">{lesson.targetConcept}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{lesson.estimatedMinutes} Minutes</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600 font-extrabold">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{lesson.rewardStars} Stars Reward</span>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="max-w-sm mx-auto w-full pt-2">
        <button
          onClick={() => {
            playGentleTapSound();
            onStartLesson();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-xl font-fun shadow-md border-3 border-amber-300 flex items-center justify-center gap-3 cursor-pointer transition-all"
        >
          <Play className="w-6 h-6 fill-slate-900" />
          <span>Start Lesson!</span>
        </button>
      </div>
    </div>
  );
};
