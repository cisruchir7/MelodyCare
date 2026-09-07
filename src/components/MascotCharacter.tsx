import React from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, Music } from 'lucide-react';
import { MascotMood } from '../types';
import { speakInstruction } from '../utils/audio';

interface MascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  voiceEnabled?: boolean;
  onTapSpeech?: () => void;
  className?: string;
}

export const MascotCharacter: React.FC<MascotProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  voiceEnabled = true,
  onTapSpeech,
  className = '',
}) => {
  const handleHearSpeech = () => {
    if (speechText) {
      speakInstruction(speechText, voiceEnabled);
    }
    if (onTapSpeech) {
      onTapSpeech();
    }
  };

  const dimensions = {
    sm: { w: 70, h: 70, viewBox: '0 0 100 100' },
    md: { w: 110, h: 110, viewBox: '0 0 100 100' },
    lg: { w: 150, h: 150, viewBox: '0 0 100 100' },
  }[size];

  // Motion variants for mascot based on mood
  const bounceAnimation = {
    happy: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } },
    talking: { y: [0, -4, 0], scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 1.2 } },
    celebrating: { y: [0, -14, 0], rotate: [-4, 4, -4], transition: { repeat: Infinity, duration: 0.8 } },
    listening: { rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } },
    dancing: { x: [-6, 6, -6], rotate: [-6, 6, -6], transition: { repeat: Infinity, duration: 1.4 } },
    calm: { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
  }[mood];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble if provided */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative mb-2 max-w-[280px] bg-white border-2 border-amber-300 rounded-3xl p-3 shadow-md text-center"
        >
          <p className="text-slate-800 font-medium text-sm leading-snug px-1">
            "{speechText}"
          </p>

          {/* Voice Prompt Action Button */}
          <button
            onClick={handleHearSpeech}
            aria-label="Hear Pip speak instructions"
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            <span>Hear Pip</span>
          </button>

          {/* Speech Bubble Arrow */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-amber-300" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
        </motion.div>
      )}

      {/* Mascot Graphic */}
      <motion.div
        animate={bounceAnimation}
        className="relative cursor-pointer"
        onClick={handleHearSpeech}
        title="Pip the Music Guide"
      >
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Outer glow aura */}
          <circle cx="60" cy="62" r="46" fill="#FEF3C7" opacity="0.6" />

          {/* Note Stem & Flag (Top head accessory) */}
          <path
            d="M 68 45 L 68 18 C 78 18 90 22 92 34 C 84 31 75 33 68 36"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Main Body: Warm Golden-Amber Musical Note Oval */}
          <ellipse
            cx="58"
            cy="65"
            rx="36"
            ry="32"
            fill="url(#pipGradient)"
            stroke="#D97706"
            strokeWidth="4"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="pipGradient" x1="25" y1="35" x2="85" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.7" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="cheekGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#F43F5E" />
            </linearGradient>
          </defs>

          {/* Belly Soft Highlight */}
          <ellipse cx="58" cy="69" rx="22" ry="18" fill="#FFFBEB" opacity="0.85" />

          {/* Rosy Cheeks */}
          <circle cx="36" cy="68" r="6.5" fill="url(#cheekGrad)" opacity="0.7" />
          <circle cx="78" cy="68" r="6.5" fill="url(#cheekGrad)" opacity="0.7" />

          {/* Eyes depending on mood */}
          {mood === 'calm' ? (
            // Peaceful curved closed eyes
            <>
              <path d="M 41 60 Q 46 64 51 60" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 63 60 Q 68 64 73 60" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'celebrating' ? (
            // Happy happy arched eyes ^ ^
            <>
              <path d="M 40 62 Q 46 54 52 62" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 62 62 Q 68 54 74 62" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Large friendly cartoon eyes with highlights
            <>
              <ellipse cx="46" cy="59" rx="5" ry="6.5" fill="#78350F" />
              <circle cx="44.5" cy="57" r="2.2" fill="#FFFFFF" />
              <ellipse cx="68" cy="59" rx="5" ry="6.5" fill="#78350F" />
              <circle cx="66.5" cy="57" r="2.2" fill="#FFFFFF" />
            </>
          )}

          {/* Mouth */}
          {mood === 'talking' ? (
            <ellipse cx="57" cy="72" rx="4.5" ry="6" fill="#991B1B" stroke="#78350F" strokeWidth="1.5" />
          ) : mood === 'celebrating' ? (
            <path d="M 49 69 Q 57 80 65 69 Z" fill="#991B1B" stroke="#78350F" strokeWidth="2" />
          ) : (
            <path d="M 50 69 Q 57 76 64 69" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Headphones if listening */}
          {mood === 'listening' && (
            <>
              {/* Headband */}
              <path d="M 26 62 C 26 28 88 28 88 62" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Left Earpad */}
              <rect x="20" y="55" width="10" height="18" rx="5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
              {/* Right Earpad */}
              <rect x="84" y="55" width="10" height="18" rx="5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
            </>
          )}

          {/* Cute Little Hands */}
          {mood === 'celebrating' ? (
            <>
              <circle cx="24" cy="46" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
              <circle cx="90" cy="46" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            </>
          ) : (
            <>
              <circle cx="24" cy="70" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
              <circle cx="90" cy="70" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            </>
          )}

          {/* Cute Little Feet */}
          <ellipse cx="46" cy="94" rx="9" ry="5.5" fill="#D97706" />
          <ellipse cx="68" cy="94" rx="9" ry="5.5" fill="#D97706" />
        </svg>

        {/* Floating sparkles when celebrating */}
        {mood === 'celebrating' && (
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-3 -right-2 text-amber-500"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
