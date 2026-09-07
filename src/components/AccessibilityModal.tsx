import React from 'react';
import { X, Volume2, Eye, Wind, Check, Sliders, Sparkles, Heart } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { playGentleTapSound } from '../utils/audio';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl border-2 border-slate-200 shadow-2xl p-5 overflow-y-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-fun leading-tight">Accessibility & Comfort</h2>
              <p className="text-xs text-slate-500">Personalize your learning space</p>
            </div>
          </div>
          <button
            onClick={() => {
              playGentleTapSound();
              onClose();
            }}
            aria-label="Close settings"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-4 space-y-3.5">
          {/* Spoken Audio Instructions */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Voice Instructions</p>
                <p className="text-xs text-slate-500">Pip speaks instructions out loud</p>
              </div>
            </div>
            <button
              onClick={() => {
                playGentleTapSound();
                onUpdateSettings({ voiceInstructions: !settings.voiceInstructions });
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                settings.voiceInstructions ? 'bg-sky-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Gentle / Sensory-Safe Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Gentle Sound Mode</p>
                <p className="text-xs text-slate-500">Soft acoustic tones without sudden peaks</p>
              </div>
            </div>
            <button
              onClick={() => {
                playGentleTapSound();
                onUpdateSettings({ gentleSoundsOnly: !settings.gentleSoundsOnly });
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                settings.gentleSoundsOnly ? 'bg-rose-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Reduced Visual Motion */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Calm Visuals (Reduced Motion)</p>
                <p className="text-xs text-slate-500">Minimizes bouncing for calm focus</p>
              </div>
            </div>
            <button
              onClick={() => {
                playGentleTapSound();
                onUpdateSettings({ reducedMotion: !settings.reducedMotion });
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                settings.reducedMotion ? 'bg-teal-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">High Contrast Mode</p>
                <p className="text-xs text-slate-500">Bold outlines and stronger distinction</p>
              </div>
            </div>
            <button
              onClick={() => {
                playGentleTapSound();
                onUpdateSettings({ highContrast: !settings.highContrast });
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                settings.highContrast ? 'bg-purple-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-600" />
                Audio Volume
              </span>
              <span className="text-xs font-bold text-slate-600 px-2 py-0.5 bg-white rounded-lg border border-slate-200">
                {settings.soundVolume}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={settings.soundVolume}
              onChange={(e) => onUpdateSettings({ soundVolume: Number(e.target.value) })}
              className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={() => {
            playGentleTapSound();
            onClose();
          }}
          className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold rounded-2xl text-base shadow-md cursor-pointer transition-all active:scale-98"
        >
          Save & Continue Playing
        </button>
      </div>
    </div>
  );
};
