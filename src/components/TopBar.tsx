import React from 'react';
import { ArrowLeft, Star, Volume2, Eye, Sliders, ShieldCheck } from 'lucide-react';
import { StudentProfile, AccessibilitySettings, ScreenName } from '../types';

interface TopBarProps {
  currentScreen: ScreenName;
  title?: string;
  student: StudentProfile;
  accessibility: AccessibilitySettings;
  onBack?: () => void;
  onOpenAccessibility: () => void;
  onOpenParentGate?: () => void;
  onReplayAudio?: () => void;
  canGoBack: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  title,
  student,
  accessibility,
  onBack,
  onOpenAccessibility,
  onOpenParentGate,
  onReplayAudio,
  canGoBack,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Left: Back button or Student Mini Info */}
      <div className="flex items-center gap-2">
        {canGoBack ? (
          <button
            onClick={onBack}
            aria-label="Go Back"
            className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-50 active:bg-amber-100 text-amber-900 border-2 border-amber-200 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl shadow-xs">
              {student.avatar || '🦊'}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Music Explorer</p>
              <h2 className="text-sm font-bold text-slate-800 leading-none">{student.name}</h2>
            </div>
          </div>
        )}

        {title && canGoBack && (
          <h1 className="text-base font-bold text-slate-800 truncate max-w-[170px] font-fun ml-1">
            {title}
          </h1>
        )}
      </div>

      {/* Right Controls: Stars, Audio replay, Quick accessibility */}
      <div className="flex items-center gap-2">
        {/* Audio instruction repeat button */}
        {onReplayAudio && (
          <button
            onClick={onReplayAudio}
            aria-label="Replay audio instruction"
            title="Hear instruction again"
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-50 active:bg-sky-100 border-2 border-sky-200 text-sky-700 transition-all cursor-pointer active:scale-95"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Stars counter pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-100/90 border-2 border-amber-300 text-amber-900 font-extrabold text-sm shadow-xs">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{student.starsCount}</span>
        </div>

        {/* Accessibility Quick Settings Button */}
        <button
          onClick={onOpenAccessibility}
          aria-label="Accessibility settings"
          title="Accessibility & Comfort options"
          className={`flex items-center justify-center w-10 h-10 rounded-2xl border-2 transition-all cursor-pointer active:scale-95 ${
            accessibility.highContrast
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
          }`}
        >
          <Sliders className="w-5 h-5" />
        </button>

        {/* Parent / Teacher quick portal button */}
        {onOpenParentGate && currentScreen !== 'parent_dashboard' && (
          <button
            onClick={onOpenParentGate}
            aria-label="Parent and Teacher Mode"
            title="Parent & Teacher Portal"
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-700 transition-all cursor-pointer active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </header>
  );
};
