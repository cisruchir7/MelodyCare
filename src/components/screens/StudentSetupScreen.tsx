import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, User, Heart, Sparkles, Volume2 } from 'lucide-react';
import { StudentProfile } from '../../types';
import { playGentleTapSound, playSuccessChime, speakInstruction } from '../../utils/audio';

interface StudentSetupProps {
  initialProfile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
  voiceEnabled: boolean;
}

const AVATARS = ['🦊', '🐰', '🐼', '🐻', '🐱', '🦉', '🦁', '🐬'];
const AGE_GROUPS: StudentProfile['ageGroup'][] = ['4-6', '7-10', '11-15', '16+'];
const INSTRUMENTS: StudentProfile['preferredInstrument'][] = ['Piano', 'Xylophone', 'Drums', 'Guitar'];
const SENSORY_MODES: { mode: StudentProfile['sensoryMode']; label: string; desc: string }[] = [
  { mode: 'Gentle', label: 'Gentle & Soft', desc: 'Soft pastel colors & calm acoustic tones' },
  { mode: 'Standard', label: 'Standard Playful', desc: 'Friendly balanced animations and sounds' },
];

export const StudentSetupScreen: React.FC<StudentSetupProps> = ({
  initialProfile,
  onSave,
  voiceEnabled,
}) => {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);

  const handleFinish = () => {
    playSuccessChime();
    onSave(profile);
  };

  return (
    <div className="flex flex-col justify-between min-h-full p-5 bg-slate-50 select-none overflow-y-auto">
      <div className="max-w-md mx-auto w-full space-y-5 pb-6">
        {/* Header */}
        <div className="text-center pt-2">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
            Step 3 of Setup
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 font-fun mt-1">
            Create Your Musician
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pick an avatar and instrument you love!
          </p>
        </div>

        {/* 1. Name & Avatar Selection */}
        <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Student Name (e.g. Alex)"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold text-lg focus:outline-hidden focus:border-amber-400"
          />

          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mt-4 mb-2">
            Choose Your Avatar
          </label>
          <div className="grid grid-cols-4 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  playGentleTapSound();
                  setProfile({ ...profile, avatar: emoji });
                }}
                className={`h-14 rounded-2xl text-2xl flex items-center justify-center transition-all cursor-pointer ${
                  profile.avatar === emoji
                    ? 'bg-amber-100 border-3 border-amber-400 scale-105 shadow-sm'
                    : 'bg-slate-50 border-2 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Age Group */}
        <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Age Group
          </label>
          <div className="grid grid-cols-4 gap-2">
            {AGE_GROUPS.map((age) => (
              <button
                key={age}
                onClick={() => {
                  playGentleTapSound();
                  setProfile({ ...profile, ageGroup: age });
                }}
                className={`py-2.5 px-2 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                  profile.ageGroup === age
                    ? 'bg-sky-500 text-white border-2 border-sky-600 shadow-sm'
                    : 'bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Favorite Instrument */}
        <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Favorite Instrument
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {INSTRUMENTS.map((inst) => {
              const icon = inst === 'Piano' ? '🎹' : inst === 'Xylophone' ? '🔔' : inst === 'Drums' ? '🥁' : '🎸';
              const isSelected = profile.preferredInstrument === inst;
              return (
                <button
                  key={inst}
                  onClick={() => {
                    playGentleTapSound();
                    setProfile({ ...profile, preferredInstrument: inst });
                  }}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-100 border-2 border-rose-400 text-rose-900 shadow-xs'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{inst}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Sensory Learning Mode */}
        <div className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Sensory Comfort
          </label>
          <div className="space-y-2">
            {SENSORY_MODES.map((sm) => (
              <button
                key={sm.mode}
                onClick={() => {
                  playGentleTapSound();
                  setProfile({ ...profile, sensoryMode: sm.mode });
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                  profile.sensoryMode === sm.mode
                    ? 'bg-emerald-50 border-2 border-emerald-400 shadow-xs'
                    : 'bg-slate-50 border-2 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-800 text-sm">{sm.label}</p>
                  <p className="text-xs text-slate-500">{sm.desc}</p>
                </div>
                {profile.sensoryMode === sm.mode && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save / Enter App Button */}
      <div className="max-w-md mx-auto w-full pt-2">
        <button
          onClick={handleFinish}
          className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-lg font-fun shadow-md border-2 border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Ready to Play!</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
