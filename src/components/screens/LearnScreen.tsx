import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Play, CheckCircle2, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { LessonCategory, LessonItem } from '../../types';
import { playGentleTapSound, speakInstruction } from '../../utils/audio';

interface LearnScreenProps {
  categories: LessonCategory[];
  lessons: LessonItem[];
  voiceEnabled: boolean;
  onSelectLesson: (lesson: LessonItem) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  categories,
  lessons,
  voiceEnabled,
  onSelectLesson,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'notes': return '🎵';
      case 'rhythm': return '🥁';
      case 'instruments': return '🎺';
      case 'melody': return '🌈';
      case 'sounds': return '👂';
      case 'songs': return '⭐';
      default: return '🎶';
    }
  };

  const filteredLessons = selectedCategory
    ? lessons.filter((l) => l.categoryId === selectedCategory)
    : [];

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Curriculum Map
          </span>
          <h1 className="text-2xl font-extrabold text-slate-800 font-fun leading-tight">
            Choose What to Learn
          </h1>
        </div>
        <button
          onClick={() => speakInstruction("Choose what to learn! Pick a music category below.", voiceEnabled)}
          aria-label="Listen to guidance"
          className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* If a category is clicked, show its lessons in an overlay/drawer or detailed list, otherwise show 6 Large Cards */}
      {selectedCategory && activeCategoryObj ? (
        <div className="space-y-3">
          {/* Back to all categories button */}
          <button
            onClick={() => {
              playGentleTapSound();
              setSelectedCategory(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
          >
            ← Back to All Categories
          </button>

          {/* Category Banner */}
          <div className={`p-4 rounded-3xl ${activeCategoryObj.bgColor} border-2 ${activeCategoryObj.borderColor} shadow-xs`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getCategoryIcon(activeCategoryObj.id)}</span>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-fun">
                  {activeCategoryObj.title}
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  {activeCategoryObj.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Lessons List for this Category */}
          <div className="space-y-3">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    playGentleTapSound();
                    onSelectLesson(lesson);
                  }}
                  className="p-4 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between active:scale-98"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 font-extrabold text-base flex items-center justify-center shadow-2xs font-fun">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm font-fun">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {lesson.estimatedMinutes} min
                        </span>
                        <span className="text-[10px] font-extrabold text-amber-600 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" /> {lesson.rewardStars} Stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
                    <Play className="w-5 h-5 fill-slate-900 translate-x-0.5" />
                  </div>
                </div>
              ))
            ) : (
              // If mock lessons for this specific category is 1, let's also give a ready starter lesson
              <div
                onClick={() => {
                  playGentleTapSound();
                  onSelectLesson(lessons[0]);
                }}
                className="p-4 rounded-3xl bg-white border-2 border-amber-300 shadow-sm cursor-pointer flex items-center justify-between active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 font-extrabold text-base flex items-center justify-center">
                    #1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm font-fun">
                      Explore {activeCategoryObj.title} with Pip
                    </h3>
                    <p className="text-xs text-slate-500">Step-by-step introduction</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-slate-900" />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 6 Large Category Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {categories.map((cat) => {
            const completionPercent = Math.round(
              (cat.lessonsCompleted / cat.totalLessons) * 100
            );

            return (
              <div
                key={cat.id}
                onClick={() => {
                  playGentleTapSound();
                  setSelectedCategory(cat.id);
                  speakInstruction(cat.title, voiceEnabled);
                }}
                className={`p-4.5 rounded-3xl ${cat.bgColor} border-3 ${cat.borderColor} hover:scale-[1.02] shadow-sm hover:shadow-md transition-all cursor-pointer select-none active:scale-98 relative overflow-hidden`}
              >
                {/* Category Icon & Difficulty */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl border border-slate-100">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-slate-700 text-[11px] font-extrabold shadow-2xs border border-slate-200">
                    {cat.difficulty}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-3">
                  <h2 className="text-lg font-extrabold text-slate-800 font-fun">
                    {cat.title}
                  </h2>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 mr-3">
                    <div className="h-2 flex-1 rounded-full bg-white/80 overflow-hidden border border-slate-200/50">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">
                      {cat.lessonsCompleted}/{cat.totalLessons}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
