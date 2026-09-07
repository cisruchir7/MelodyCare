import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Volume2, RotateCcw, Check, Sparkles, Heart } from 'lucide-react';
import { MascotCharacter } from '../MascotCharacter';
import {
  playNoteSound,
  playDrumBeat,
  playSuccessChime,
  playGentleTapSound,
  speakInstruction,
  NOTE_COLORS,
} from '../../utils/audio';

interface ActivityScreenProps {
  activityType?: 'note_discovery' | 'sound_match' | 'rhythm_tap' | 'pattern_repeat' | 'piano_guided';
  voiceEnabled: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export const InteractiveActivityScreen: React.FC<ActivityScreenProps> = ({
  activityType = 'note_discovery',
  voiceEnabled,
  onComplete,
  onBack,
}) => {
  const [currentMode, setCurrentMode] = useState(activityType);
  const [score, setScore] = useState(0);
  const targetScore = 3;
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'try_again' | null; message: string }>({
    type: null,
    message: '',
  });

  // --- MODE 1: Tap the Correct Note State ---
  const noteOptions = [
    { note: 'C4', name: 'Note C', solfege: 'Do', color: 'bg-rose-500', isTarget: true },
    { note: 'E4', name: 'Note E', solfege: 'Mi', color: 'bg-amber-500', isTarget: false },
    { note: 'G4', name: 'Note G', solfege: 'Sol', color: 'bg-teal-500', isTarget: false },
  ];

  const handleNoteSelect = (item: typeof noteOptions[0]) => {
    playNoteSound(item.note, 'piano', 85);
    if (item.isTarget) {
      playSuccessChime();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback({ type: 'correct', message: 'You found Red Note C (Do)! ✨' });
      if (newScore >= targetScore) {
        setTimeout(onComplete, 900);
      } else {
        setTimeout(() => setFeedback({ type: null, message: '' }), 1000);
      }
    } else {
      setFeedback({ type: 'try_again', message: 'That is ' + item.name + '! Try tapping Red Note C.' });
      setTimeout(() => setFeedback({ type: null, message: '' }), 1200);
    }
  };

  // --- MODE 2: Match Sound with Instrument ---
  const [targetInstrumentSound, setTargetInstrumentSound] = useState<'piano' | 'drums' | 'xylophone'>('drums');
  const instrumentCards = [
    { id: 'piano', label: 'Piano', emoji: '🎹' },
    { id: 'drums', label: 'Drums', emoji: '🥁' },
    { id: 'xylophone', label: 'Xylophone', emoji: '🔔' },
  ];

  const playInstrumentSoundPrompt = () => {
    if (targetInstrumentSound === 'piano') {
      playNoteSound('C4', 'piano', 85);
    } else if (targetInstrumentSound === 'drums') {
      playDrumBeat('kick', 85);
      setTimeout(() => playDrumBeat('snare', 85), 250);
    } else {
      playNoteSound('G4', 'xylophone', 85);
    }
  };

  const handleInstrumentSelect = (id: string) => {
    if (id === targetInstrumentSound) {
      playSuccessChime();
      const newScore = score + 1;
      setScore(newScore);
      setFeedback({ type: 'correct', message: 'Great ears! That was the ' + id + '! 🎉' });
      if (newScore >= targetScore) {
        setTimeout(onComplete, 900);
      } else {
        const next = id === 'drums' ? 'piano' : 'xylophone';
        setTargetInstrumentSound(next);
        setTimeout(() => setFeedback({ type: null, message: '' }), 1000);
      }
    } else {
      setFeedback({ type: 'try_again', message: 'Listen again to the sound!' });
      setTimeout(() => setFeedback({ type: null, message: '' }), 1200);
    }
  };

  // --- MODE 3: Rhythm Beat Pulse Tap ---
  const [pulseCount, setPulseCount] = useState(0);
  const handleDrumTap = () => {
    playDrumBeat('kick', 85);
    const newPulse = pulseCount + 1;
    setPulseCount(newPulse);
    if (newPulse >= 4) {
      playSuccessChime();
      setFeedback({ type: 'correct', message: 'Steady beat achieved! 4 in a row! 🥁' });
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-full p-4 bg-gradient-to-b from-sky-50 via-white to-amber-50 select-none pb-8 overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        {/* Activity Mode Switcher Pills */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => {
              setCurrentMode('note_discovery');
              setScore(0);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentMode === 'note_discovery'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Find Note
          </button>
          <button
            onClick={() => {
              setCurrentMode('sound_match');
              setScore(0);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentMode === 'sound_match'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Sound Match
          </button>
          <button
            onClick={() => {
              setCurrentMode('rhythm_tap');
              setPulseCount(0);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentMode === 'rhythm_tap'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Beat Pulse
          </button>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{currentMode === 'rhythm_tap' ? `${pulseCount}/4 Beats` : `${score}/${targetScore} Done`}</span>
        </div>
      </div>

      {/* Mascot Guidance */}
      <div className="pt-2 text-center">
        <MascotCharacter
          mood={feedback.type === 'correct' ? 'celebrating' : 'talking'}
          size="sm"
          speechText={
            feedback.message ||
            (currentMode === 'note_discovery'
              ? 'Can you tap Red Note C (Do)?'
              : currentMode === 'sound_match'
              ? 'Listen to the sound and tap the instrument!'
              : 'Tap the big drum to feel the beat!')
          }
          voiceEnabled={voiceEnabled}
        />
      </div>

      {/* Main Interactive Play Area */}
      <div className="my-auto py-2">
        {/* Feedback Alert Toast */}
        <AnimatePresence>
          {feedback.message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`max-w-xs mx-auto mb-4 py-2 px-4 rounded-2xl text-center font-bold text-sm shadow-xs ${
                feedback.type === 'correct'
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border-2 border-amber-300'
              }`}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Mode: Note Discovery (Tap Note C) */}
        {currentMode === 'note_discovery' && (
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            {noteOptions.map((item) => (
              <motion.button
                key={item.note}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNoteSelect(item)}
                className={`h-36 rounded-3xl ${item.color} text-white shadow-lg flex flex-col items-center justify-center p-3 border-4 border-white cursor-pointer active:scale-95 transition-all`}
              >
                <span className="text-3xl font-black font-mono">{item.note.charAt(0)}</span>
                <span className="text-sm font-extrabold uppercase mt-1 tracking-wider">
                  {item.solfege}
                </span>
                <span className="text-[10px] font-bold bg-black/15 px-2 py-0.5 rounded-full mt-2">
                  Tap Me
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {/* 2. Mode: Sound Matching */}
        {currentMode === 'sound_match' && (
          <div className="max-w-sm mx-auto space-y-4">
            {/* Audio Hear Button */}
            <div className="text-center">
              <button
                onClick={playInstrumentSoundPrompt}
                className="py-3 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-extrabold text-base shadow-md inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span>Hear the Sound</span>
              </button>
              <p className="text-xs text-slate-400 mt-1">Tap above to listen carefully</p>
            </div>

            {/* 3 Large Instrument Cards */}
            <div className="grid grid-cols-3 gap-3">
              {instrumentCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleInstrumentSelect(card.id)}
                  className="h-32 rounded-3xl bg-white border-3 border-slate-200 hover:border-amber-400 shadow-sm flex flex-col items-center justify-center p-2 cursor-pointer active:scale-95 transition-all"
                >
                  <span className="text-4xl mb-1">{card.emoji}</span>
                  <span className="font-extrabold text-slate-800 text-sm">{card.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Mode: Follow the Rhythm Beat */}
        {currentMode === 'rhythm_tap' && (
          <div className="flex flex-col items-center text-center">
            {/* Pulsing Visual Beat Circle */}
            <div className="relative mb-6">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
                className="absolute -inset-4 rounded-full bg-emerald-300 -z-10"
              />
              <button
                onClick={handleDrumTap}
                className="w-36 h-36 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl border-4 border-white flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                <span className="text-4xl">🥁</span>
                <span className="text-sm font-extrabold uppercase mt-1 tracking-wider font-fun">
                  Tap Beat!
                </span>
              </button>
            </div>

            <p className="text-xs font-bold text-slate-500">
              Tap the drum along with the glowing pulse
            </p>
          </div>
        )}
      </div>

      {/* Skip / Finish Activity Shortcut */}
      <div className="max-w-sm mx-auto w-full pt-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl text-slate-500 font-bold text-xs hover:bg-slate-100 cursor-pointer"
        >
          ← Back
        </button>

        <button
          onClick={() => {
            playSuccessChime();
            onComplete();
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs shadow-xs cursor-pointer active:scale-95"
        >
          Complete Lesson ⭐
        </button>
      </div>
    </div>
  );
};
