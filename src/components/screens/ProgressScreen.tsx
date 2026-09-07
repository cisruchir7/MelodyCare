import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Clock, CheckCircle2, Star, Sparkles, Volume2, Flame } from 'lucide-react';
import { StudentProfile, ParentAnalytics } from '../../types';
import { speakInstruction } from '../../utils/audio';

interface ProgressScreenProps {
  student: StudentProfile;
  analytics: ParentAnalytics;
  voiceEnabled: boolean;
  onGoToRewards: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  student,
  analytics,
  voiceEnabled,
  onGoToRewards,
}) => {
  const weeklyDays = analytics.dailyEngagement;
  const maxMinutes = Math.max(...weeklyDays.map((d) => d.minutes), 12);

  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Your Musical Growth
          </span>
          <h1 className="text-2xl font-extrabold text-slate-800 font-fun leading-tight">
            Learning Progress
          </h1>
        </div>

        <button
          onClick={() =>
            speakInstruction(
              `You have completed ${analytics.lessonsCompletedTotal} lessons and practiced for ${analytics.totalPracticeMinutesThisWeek} minutes this week! Fantastic work!`,
              voiceEnabled
            )
          }
          className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* 4 Big Visual Stat Pills */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Lessons Done */}
        <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-200">
          <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center font-extrabold text-lg mb-2">
            🎵
          </div>
          <p className="text-2xl font-black text-slate-800 font-fun leading-none">
            {analytics.lessonsCompletedTotal}
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">Lessons Completed</p>
        </div>

        {/* Practice Time */}
        <div className="p-4 rounded-3xl bg-sky-50 border-2 border-sky-200">
          <div className="w-10 h-10 rounded-2xl bg-sky-200 text-sky-900 flex items-center justify-center font-extrabold text-lg mb-2">
            ⏱️
          </div>
          <p className="text-2xl font-black text-slate-800 font-fun leading-none">
            {analytics.totalPracticeMinutesThisWeek}m
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">Practice Time</p>
        </div>

        {/* Stars Collected */}
        <div
          onClick={onGoToRewards}
          className="p-4 rounded-3xl bg-rose-50 border-2 border-rose-200 cursor-pointer active:scale-98 transition-transform"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-200 text-rose-900 flex items-center justify-center font-extrabold text-lg mb-2">
            ⭐
          </div>
          <p className="text-2xl font-black text-slate-800 font-fun leading-none">
            {student.starsCount}
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">Stars Collected</p>
        </div>

        {/* Streak */}
        <div className="p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-200">
          <div className="w-10 h-10 rounded-2xl bg-emerald-200 text-emerald-900 flex items-center justify-center font-extrabold text-lg mb-2">
            🔥
          </div>
          <p className="text-2xl font-black text-slate-800 font-fun leading-none">
            {student.streakDays} Days
          </p>
          <p className="text-xs font-bold text-slate-500 mt-1">Active Streak</p>
        </div>
      </div>

      {/* Weekly Activity Visual Bar Chart */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 font-fun mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          Weekly Music Time
        </h3>

        <div className="flex items-end justify-between gap-2 h-32 pt-4 px-2">
          {weeklyDays.map((day) => {
            const heightPercent = Math.round((day.minutes / maxMinutes) * 100);
            const isToday = day.day === 'Fri'; // Friday active

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-extrabold text-slate-400">
                  {day.minutes > 0 ? `${day.minutes}m` : '-'}
                </span>
                <div className="w-full max-w-[28px] bg-slate-100 rounded-xl h-20 relative overflow-hidden flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.8 }}
                    className={`w-full rounded-xl ${
                      isToday ? 'bg-amber-400 border border-amber-500' : 'bg-sky-400'
                    }`}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isToday ? 'text-amber-800 font-black' : 'text-slate-500'}`}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Mastered Checklist */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 font-fun mb-2.5 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Skills Mastered So Far
        </h3>

        <div className="space-y-2">
          {analytics.masteredSkills.slice(0, 4).map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
