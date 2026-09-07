import React, { useState } from 'react';
import { ShieldCheck, X, Check, Lock } from 'lucide-react';
import { playGentleTapSound, playSuccessChime } from '../utils/audio';

interface ParentGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<ParentGateProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  // Simple math challenge: 4 + 3 = 7
  const targetAnswer = '7';

  if (!isOpen) return null;

  const handleKeypadPress = (digit: string) => {
    playGentleTapSound();
    if (digit === 'C') {
      setAnswer('');
      setError(false);
      return;
    }
    const newAns = answer + digit;
    setAnswer(newAns);
    if (newAns === targetAnswer) {
      playSuccessChime();
      setTimeout(() => {
        setAnswer('');
        setError(false);
        onSuccess();
      }, 250);
    } else if (newAns.length >= 2) {
      setError(true);
      setTimeout(() => {
        setAnswer('');
        setError(false);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-purple-200 shadow-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 font-fun">Parent & Teacher Area</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Please answer the question below to verify you are a parent or educator:
        </p>

        {/* Math Question */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl py-3 px-4 mb-4">
          <span className="text-sm font-semibold text-purple-900">Solve: </span>
          <span className="text-lg font-black text-purple-700 font-mono tracking-wider">
            4 + 3 = ?
          </span>
          <div className="mt-1 h-8 flex items-center justify-center">
            <span
              className={`inline-block px-4 py-1 rounded-xl text-lg font-bold ${
                error
                  ? 'bg-rose-100 text-rose-700 animate-shake'
                  : 'bg-white text-purple-900 border border-purple-300'
              }`}
            >
              {answer || '_'}
            </span>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === '✓') {
                  if (answer === targetAnswer) {
                    playSuccessChime();
                    onSuccess();
                  } else {
                    setError(true);
                  }
                } else {
                  handleKeypadPress(key);
                }
              }}
              className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-purple-200 text-slate-800 font-bold text-base transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Fast Bypass for convenience / testing */}
        <button
          onClick={() => {
            playSuccessChime();
            onSuccess();
          }}
          className="text-xs text-purple-600 hover:text-purple-800 underline font-medium cursor-pointer"
        >
          Quick Educator Access (Skip Challenge)
        </button>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              playGentleTapSound();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-200 transition-colors"
          >
            Back to Student App
          </button>
        </div>
      </div>
    </div>
  );
};
