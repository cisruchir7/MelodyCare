import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Music, Play, Volume2 } from 'lucide-react';
import { MascotCharacter } from '../MascotCharacter';
import { playSuccessChime, playGentleTapSound } from '../../utils/audio';

interface SplashScreenProps {
  onStart: () => void;
  voiceEnabled: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, voiceEnabled }) => {
  const handleStart = () => {
    playGentleTapSound();
    playSuccessChime();
    onStart();
  };

  return (
    <div
      onClick={handleStart}
      className="relative flex flex-col items-center justify-between min-h-full py-10 px-6 bg-gradient-to-b from-amber-50 via-rose-50 to-sky-50 cursor-pointer select-none overflow-hidden"
    >
      {/* Background Floating Music Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '10%', y: '15%', delay: 0, icon: '🎵' },
          { x: '80%', y: '20%', delay: 0.8, icon: '🎶' },
          { x: '15%', y: '65%', delay: 1.4, icon: '⭐' },
          { x: '85%', y: '70%', delay: 2.1, icon: '✨' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-3xl opacity-40 select-none"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [-10, 10, -10],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + idx,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Top Header Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 pt-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border-2 border-amber-300 shadow-xs mb-3">
          <Music className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-800 tracking-wide uppercase">Music for Every Mind</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 font-fun tracking-tight drop-shadow-xs">
          MelodyCare
        </h1>
        <p className="text-sm font-semibold text-slate-600 mt-1 max-w-[260px] mx-auto">
          Joyful, sensory-friendly music learning for special needs
        </p>
      </motion.div>

      {/* Center Mascot with animated speech */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
        className="my-auto py-4 z-10"
      >
        <MascotCharacter
          mood="celebrating"
          size="lg"
          speechText="Hi! I'm Pip! Let's make music together!"
          voiceEnabled={voiceEnabled}
        />
      </motion.div>

      {/* Bottom Start Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs z-10"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          className="w-full py-4 px-6 rounded-3xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-extrabold text-xl font-fun shadow-lg hover:shadow-xl border-4 border-amber-300 flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-amber-600 shadow-xs">
            <Play className="w-6 h-6 fill-amber-500 translate-x-0.5" />
          </div>
          <span>Start Music!</span>
        </button>

        <p className="text-center text-xs font-bold text-slate-400 mt-3">
          Tap anywhere to enter
        </p>
      </motion.div>
    </div>
  );
};
