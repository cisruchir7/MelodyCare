import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, Music, Play, RotateCcw, Award } from 'lucide-react';
import {
  playNoteSound,
  playDrumBeat,
  InstrumentType,
  NOTE_COLORS,
  SOLFEGE_NAMES,
  speakInstruction,
  playSuccessChime,
} from '../../utils/audio';

interface VirtualInstrumentProps {
  voiceEnabled: boolean;
  onBack: () => void;
}

const PIANO_KEYS = [
  { note: 'C4', keyLabel: 'C', solfege: 'Do', color: 'bg-rose-500', activeRing: 'ring-rose-400' },
  { note: 'D4', keyLabel: 'D', solfege: 'Re', color: 'bg-orange-500', activeRing: 'ring-orange-400' },
  { note: 'E4', keyLabel: 'E', solfege: 'Mi', color: 'bg-amber-500', activeRing: 'ring-amber-400' },
  { note: 'F4', keyLabel: 'F', solfege: 'Fa', color: 'bg-emerald-500', activeRing: 'ring-emerald-400' },
  { note: 'G4', keyLabel: 'G', solfege: 'Sol', color: 'bg-teal-500', activeRing: 'ring-teal-400' },
  { note: 'A4', keyLabel: 'A', solfege: 'La', color: 'bg-blue-500', activeRing: 'ring-blue-400' },
  { note: 'B4', keyLabel: 'B', solfege: 'Ti', color: 'bg-indigo-500', activeRing: 'ring-indigo-400' },
  { note: 'C5', keyLabel: 'C²', solfege: 'Do', color: 'bg-purple-500', activeRing: 'ring-purple-400' },
];

// Twinkle Twinkle guided sequence: C C G G A A G
const GUIDED_SONG_SEQUENCE = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4'];

export const VirtualInstrumentScreen: React.FC<VirtualInstrumentProps> = ({
  voiceEnabled,
  onBack,
}) => {
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>('piano');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [songStepIndex, setSongStepIndex] = useState(0);
  const [songSuccess, setSongSuccess] = useState(false);

  const targetGuidedNote = isGuidedMode ? GUIDED_SONG_SEQUENCE[songStepIndex] : null;

  const handleKeyPress = (note: string) => {
    setPressedKey(note);
    playNoteSound(note, selectedInstrument, 85);
    setTimeout(() => setPressedKey(null), 250);

    // If guided song mode
    if (isGuidedMode) {
      if (note === targetGuidedNote) {
        const nextIndex = songStepIndex + 1;
        if (nextIndex >= GUIDED_SONG_SEQUENCE.length) {
          setSongSuccess(true);
          playSuccessChime();
          setSongStepIndex(0);
        } else {
          setSongStepIndex(nextIndex);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-full p-4 bg-gradient-to-b from-purple-50/70 via-white to-amber-50/70 select-none pb-8 overflow-y-auto">
      {/* Top Bar with Instrument Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 font-fun leading-tight">
              Virtual Instrument
            </h1>
            <p className="text-xs text-slate-500">Tap the keys to make music!</p>
          </div>

          {/* Guided Song Mode Toggle */}
          <button
            onClick={() => {
              const newMode = !isGuidedMode;
              setIsGuidedMode(newMode);
              setSongStepIndex(0);
              setSongSuccess(false);
              if (newMode) {
                speakInstruction('Guided Song Mode: Follow the glowing key!', voiceEnabled);
              }
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isGuidedMode
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGuidedMode ? 'Guided Song On' : 'Free Play'}</span>
          </button>
        </div>

        {/* 3 Instrument Timbre Switchers */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(
            [
              { id: 'piano', label: 'Grand Piano', icon: '🎹' },
              { id: 'xylophone', label: 'Xylophone', icon: '🔔' },
              { id: 'drums', label: 'Percussion', icon: '🥁' },
            ] as const
          ).map((inst) => (
            <button
              key={inst.id}
              onClick={() => {
                setSelectedInstrument(inst.id);
                speakInstruction(inst.label, voiceEnabled);
              }}
              className={`py-2 px-1 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                selectedInstrument === inst.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{inst.icon}</span>
              <span>{inst.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Guided Song Banner if active */}
      {isGuidedMode && (
        <div className="p-3 mb-2 rounded-2xl bg-amber-100 border-2 border-amber-300 text-center">
          {songSuccess ? (
            <div className="flex items-center justify-center gap-2 text-amber-950 font-extrabold text-sm">
              <Award className="w-5 h-5 text-amber-600" />
              <span>You played Twinkle Twinkle! Great job!</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Playing: "Twinkle Star"</span>
              <span className="bg-amber-300 px-2 py-0.5 rounded-full">
                Note {songStepIndex + 1} of {GUIDED_SONG_SEQUENCE.length}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Large Responsive Piano Keyboard Container */}
      <div className="my-auto py-2">
        <div className="grid grid-cols-8 gap-1.5 h-64 sm:h-72 p-2 bg-slate-900 rounded-3xl shadow-xl border-4 border-slate-800">
          {PIANO_KEYS.map((key) => {
            const isTarget = isGuidedMode && key.note === targetGuidedNote;
            const isPressed = pressedKey === key.note;

            return (
              <motion.button
                key={key.note}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyPress(key.note)}
                className={`relative rounded-2xl flex flex-col items-center justify-between py-3 select-none transition-all cursor-pointer ${key.color} text-white shadow-md ${
                  isPressed ? 'brightness-125 scale-95 shadow-inner' : ''
                } ${isTarget ? 'ring-4 ring-amber-300 animate-bounce' : ''}`}
              >
                {/* Note Solfege top */}
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                  {key.solfege}
                </span>

                {/* Target glow beacon */}
                {isTarget && (
                  <div className="w-3 h-3 rounded-full bg-white animate-ping" />
                )}

                {/* Note Letter bottom */}
                <span className="text-base sm:text-lg font-black font-mono">
                  {key.keyLabel}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Note helper labels for Special Needs Accessibility */}
        <div className="flex justify-between items-center px-4 mt-2 text-[10px] font-extrabold text-slate-400">
          <span>Low C (Do)</span>
          <span>Middle Ladder</span>
          <span>High C (Do)</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-2">
        <button
          onClick={onBack}
          className="w-full py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 cursor-pointer transition-all active:scale-98"
        >
          ← Back to Activities
        </button>
      </div>
    </div>
  );
};
