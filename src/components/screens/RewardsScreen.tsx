import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Lock, Sparkles, Volume2, Flame } from 'lucide-react';
import { RewardBadge, StudentProfile } from '../../types';
import { speakInstruction } from '../../utils/audio';

interface RewardsScreenProps {
  badges: RewardBadge[];
  student: StudentProfile;
  voiceEnabled: boolean;
  onBack?: () => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  badges,
  student,
  voiceEnabled,
}) => {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Trophy Case
          </span>
          <h1 className="text-2xl font-extrabold text-slate-800 font-fun leading-tight">
            Stars & Badges
          </h1>
        </div>

        <button
          onClick={() =>
            speakInstruction(
              `You have collected ${student.starsCount} stars and earned ${earnedCount} musical badges! Keep shining!`,
              voiceEnabled
            )
          }
          className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Big Golden Star Chest Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 text-slate-900 shadow-md border-3 border-amber-300 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/40 text-amber-950 text-[10px] font-extrabold uppercase">
              Star Vault
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black font-fun">{student.starsCount}</span>
              <span className="text-sm font-extrabold text-amber-950">Stars Earned</span>
            </div>
            <p className="text-xs font-semibold text-amber-900 mt-1">
              Next milestone unlock at 25 stars!
            </p>
          </div>

          <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-xs flex items-center justify-center text-4xl shadow-inner">
            ⭐
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800 font-fun flex items-center gap-1.5">
            <Award className="w-5 h-5 text-amber-500" />
            Musical Badges ({earnedCount}/{badges.length})
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center text-center relative ${
                badge.earned
                  ? 'bg-white border-amber-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Badge Icon Circle */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2.5 shadow-sm ${
                  badge.earned
                    ? `bg-gradient-to-br ${badge.color} text-white`
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.earned ? (
                  badge.id.includes('note') ? '🎵' : badge.id.includes('beat') ? '🥁' : badge.id.includes('streak') ? '🔥' : '🏅'
                ) : (
                  <Lock className="w-6 h-6 text-slate-400" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-slate-800 text-sm font-fun leading-tight">
                {badge.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {badge.description}
              </p>

              {/* Status pill */}
              <span
                className={`mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  badge.earned
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {badge.earned ? `Unlocked ${badge.earnedDate || 'Today'}` : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
