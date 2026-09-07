import React from 'react';
import { Play, Sparkles, Clock, Heart, Volume2, ArrowRight } from 'lucide-react';
import { PracticeItem } from '../../types';
import { playGentleTapSound, speakInstruction } from '../../utils/audio';

interface PracticeScreenProps {
  practiceItems: PracticeItem[];
  voiceEnabled: boolean;
  onLaunchPractice: (activityType: PracticeItem['activityType']) => void;
  onOpenVirtualPiano: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  practiceItems,
  voiceEnabled,
  onLaunchPractice,
  onOpenVirtualPiano,
}) => {
  return (
    <div className="p-4 space-y-4 select-none pb-8 overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Warmup & Free Play
          </span>
          <h1 className="text-2xl font-extrabold text-slate-800 font-fun leading-tight">
            Practice Studio
          </h1>
        </div>

        <button
          onClick={() => speakInstruction("Welcome to the Practice Studio! Choose an activity to warm up your musical skills.", voiceEnabled)}
          className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Free-Play Virtual Piano Banner */}
      <div
        onClick={() => {
          playGentleTapSound();
          onOpenVirtualPiano();
        }}
        className="p-5 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-98 relative overflow-hidden"
      >
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">
              Always Open
            </span>
            <h2 className="text-xl font-extrabold font-fun mt-1.5">
              Rainbow Piano Keyboard
            </h2>
            <p className="text-xs text-purple-100 mt-0.5">
              Free play with 8 rainbow keys & guided song lights
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl">
            🎹
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
          <span>Explore Piano, Xylophone, Drums</span>
          <span className="flex items-center gap-1">
            Play Now <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Recommended Practice Activities List */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 font-fun mb-2.5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Daily Practice Activities
        </h2>

        <div className="space-y-3">
          {practiceItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playGentleTapSound();
                onLaunchPractice(item.activityType);
              }}
              className="p-4 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between active:scale-98"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-2xl shadow-2xs`}>
                  {item.activityType === 'piano_free' ? '🎹' : item.activityType === 'rhythm_pulse' ? '🥁' : item.activityType === 'sound_explorer' ? '🎧' : '🪘'}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm font-fun">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> {item.durationMinutes} min
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
                <Play className="w-5 h-5 fill-slate-900 translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
