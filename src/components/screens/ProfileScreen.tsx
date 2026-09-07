import React from 'react';
import { User, Sliders, ShieldCheck, Volume2, Eye, Wind, Heart, ChevronRight } from 'lucide-react';
import { StudentProfile, AccessibilitySettings } from '../../types';
import { playGentleTapSound, speakInstruction } from '../../utils/audio';

interface ProfileScreenProps {
  student: StudentProfile;
  accessibility: AccessibilitySettings;
  onOpenAccessibilityModal: () => void;
  onOpenParentGate: () => void;
  onEditStudentSetup: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  accessibility,
  onOpenAccessibilityModal,
  onOpenParentGate,
  onEditStudentSetup,
}) => {
  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* Top Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Learner Space
          </span>
          <h1 className="text-2xl font-extrabold text-slate-800 font-fun leading-tight">
            Student Profile
          </h1>
        </div>
      </div>

      {/* Student Identity Card */}
      <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-3 border-amber-300 flex items-center justify-center text-3xl shadow-xs">
            {student.avatar || '🦊'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 font-fun leading-tight">
              {student.name}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Age {student.ageGroup} • {student.learningLevel}
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
              Favorite: {student.preferredInstrument}
            </span>
          </div>
        </div>

        <button
          onClick={onEditStudentSetup}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer active:scale-95"
        >
          Edit
        </button>
      </div>

      {/* Direct Accessibility & Sensory Summary Card */}
      <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-800 text-sm font-fun">
              Accessibility Settings
            </h3>
          </div>
          <button
            onClick={onOpenAccessibilityModal}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
          >
            Customize
          </button>
        </div>

        {/* Current toggles display */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-sky-500" />
            <span>Voice: {accessibility.voiceInstructions ? 'On' : 'Off'}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Gentle Tones: {accessibility.gentleSoundsOnly ? 'Active' : 'Off'}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-500" />
            <span>Motion: {accessibility.reducedMotion ? 'Calm' : 'Standard'}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-500" />
            <span>Contrast: {accessibility.highContrast ? 'High' : 'Normal'}</span>
          </div>
        </div>
      </div>

      {/* Parent / Teacher Zone Entrance Banner */}
      <div
        onClick={() => {
          playGentleTapSound();
          onOpenParentGate();
        }}
        className="p-5 rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-98"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-fun">
                Parent & Teacher Dashboard
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                IEP progress, practice consistency & reports
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-purple-300" />
        </div>
      </div>
    </div>
  );
};
