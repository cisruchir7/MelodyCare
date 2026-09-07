import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Star, Flame, ArrowRight, Music, Clock, Award, Volume2, Shield } from 'lucide-react';
import { StudentProfile, LessonItem } from '../../types';
import { MascotCharacter } from '../MascotCharacter';
import { playGentleTapSound, playSuccessChime, speakInstruction } from '../../utils/audio';

interface HomeScreenProps {
  student: StudentProfile;
  voiceEnabled: boolean;
  onStartLesson: (lessonId: string) => void;
  onOpenVirtualPiano: () => void;
  onGoToLearn: () => void;
  onGoToPractice: () => void;
  onGoToRewards: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  voiceEnabled,
  onStartLesson,
  onOpenVirtualPiano,
  onGoToLearn,
  onGoToPractice,
  onGoToRewards,
}) => {
  const greetingText = `Hi ${student.name || 'Friend'}! Ready to make some music?`;

  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* 1. Welcoming Hero Banner with Pip mascot */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-br from-amber-200 via-amber-100 to-rose-100 border-2 border-amber-300 shadow-sm overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="max-w-[190px]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 text-amber-800 text-[11px] font-extrabold uppercase tracking-wide border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Level 1 • Explorer
            </span>
            <h1 className="text-2xl font-extrabold text-slate-800 font-fun mt-2 leading-tight">
              {greetingText}
            </h1>
          </div>

          {/* Pip Mascot */}
          <div className="-mt-1 -mr-2">
            <MascotCharacter
              mood="talking"
              size="sm"
              voiceEnabled={voiceEnabled}
              speechText="Let's play Note C today!"
            />
          </div>
        </div>

        {/* Daily Streak & Stars Quick Pills */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-amber-300/50">
          <div
            onClick={onGoToRewards}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 font-bold text-xs cursor-pointer shadow-2xs hover:bg-white active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
            <span>{student.streakDays} Day Streak</span>
          </div>

          <div
            onClick={onGoToRewards}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 font-bold text-xs cursor-pointer shadow-2xs hover:bg-white active:scale-95 transition-all"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{student.starsCount} Stars</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Action: "Continue Learning" Large Visual Card */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-slate-800 font-fun flex items-center gap-2">
            <Music className="w-5 h-5 text-rose-500" />
            Continue Learning
          </h2>
          <button
            onClick={onGoToLearn}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            All Lessons <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={() => {
            playGentleTapSound();
            onStartLesson('lesson-c-do');
          }}
          className="relative p-5 rounded-3xl bg-white border-3 border-rose-300 hover:border-rose-400 shadow-md cursor-pointer transition-all active:scale-98 group overflow-hidden"
        >
          <div className="flex items-center gap-4">
            {/* Note C Big Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex flex-col items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl font-extrabold font-mono">C</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Do</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase">
                  Music Notes • Lesson 1
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> 3 min
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 font-fun mt-1 truncate">
                Meet Red Note C (Do)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                Listen and tap the cheerful red note!
              </p>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-rose-500 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-sm">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>

          {/* Progress bar inside card */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 mr-4">
              <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-2/3" />
              </div>
              <span className="text-[11px] font-bold text-slate-500">65%</span>
            </div>
            <span className="text-xs font-extrabold text-amber-600 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> +3 Stars
            </span>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Grid: Rainbow Piano & Rhythm Pulse */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 font-fun mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Quick Activities
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Virtual Piano Free Play */}
          <div
            onClick={() => {
              playGentleTapSound();
              onOpenVirtualPiano();
            }}
            className="p-4 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 hover:border-purple-300 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-xs mb-2">
              🎹
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-fun">Virtual Piano</h3>
            <p className="text-xs text-slate-500 mt-0.5">Rainbow keyboard & guided songs</p>
          </div>

          {/* Rhythm Drum Practice */}
          <div
            onClick={() => {
              playGentleTapSound();
              onStartLesson('lesson-rhythm-pulse');
            }}
            className="p-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-300 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-xs mb-2">
              🥁
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-fun">Rhythm Beat</h3>
            <p className="text-xs text-slate-500 mt-0.5">Follow the steady glowing pulse</p>
          </div>
        </div>
      </div>

      {/* 4. Today's Practice & Recently Completed */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 text-sm font-fun">Today's Milestone</h3>
          </div>
          <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            2 of 3 Done
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🔔</span>
              <div>
                <p className="text-xs font-bold text-slate-800">Guess the Instrument</p>
                <p className="text-[10px] text-slate-400">Completed 15 min ago</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
              ⭐⭐⭐
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🎯</span>
              <div>
                <p className="text-xs font-bold text-amber-900">Next: Note C Tap Challenge</p>
                <p className="text-[10px] text-amber-700">Earn your Do-Explorer badge</p>
              </div>
            </div>
            <button
              onClick={() => onStartLesson('lesson-c-do')}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-500 rounded-xl text-xs font-extrabold text-slate-900 shadow-2xs cursor-pointer"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
