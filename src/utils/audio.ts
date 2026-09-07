// Web Audio API Synthesizer designed specifically with gentle, sensory-safe tones

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Frequencies for standard octave
export const NOTE_FREQUENCIES: Record<string, number> = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25,
};

export const SOLFEGE_NAMES: Record<string, string> = {
  'C4': 'Do',
  'D4': 'Re',
  'E4': 'Mi',
  'F4': 'Fa',
  'G4': 'Sol',
  'A4': 'La',
  'B4': 'Ti',
  'C5': 'High Do',
};

export const NOTE_COLORS: Record<string, { bg: string; text: string; lightBg: string; border: string }> = {
  'C4': { bg: 'bg-rose-500', text: 'text-rose-600', lightBg: 'bg-rose-100', border: 'border-rose-400' },
  'D4': { bg: 'bg-orange-500', text: 'text-orange-600', lightBg: 'bg-orange-100', border: 'border-orange-400' },
  'E4': { bg: 'bg-amber-500', text: 'text-amber-600', lightBg: 'bg-amber-100', border: 'border-amber-400' },
  'F4': { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-100', border: 'border-emerald-400' },
  'G4': { bg: 'bg-teal-500', text: 'text-teal-600', lightBg: 'bg-teal-100', border: 'border-teal-400' },
  'A4': { bg: 'bg-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-100', border: 'border-blue-400' },
  'B4': { bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-100', border: 'border-indigo-400' },
  'C5': { bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-100', border: 'border-purple-400' },
};

export type InstrumentType = 'piano' | 'xylophone' | 'drums';

/**
 * Play a note with specific instrument timbre and gentle sensory-safe envelope
 */
export function playNoteSound(
  note: string,
  instrument: InstrumentType = 'piano',
  volumePercent: number = 75,
  gentleMode: boolean = false
) {
  try {
    const ctx = getAudioContext();
    const freq = NOTE_FREQUENCIES[note] || 440;
    const now = ctx.currentTime;
    const masterGain = (volumePercent / 100) * (gentleMode ? 0.4 : 0.6);

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    if (instrument === 'xylophone') {
      // Crisp bell/wooden tone with overtone
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const subGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 3, now);

      gainNode.gain.setValueAtTime(masterGain * 0.9, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      subGain.gain.setValueAtTime(masterGain * 0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gainNode);
      overtone.connect(subGain);
      subGain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.9);
      overtone.stop(now + 0.4);
    } else if (instrument === 'drums') {
      // Drum percussive note
      playDrumBeat('tom', volumePercent);
    } else {
      // Piano: warm soft blend of sine and triangle with smooth release
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(masterGain * 0.85, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gainNode);
      osc2.connect(gainNode);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
    }
  } catch (err) {
    console.warn('Audio play error:', err);
  }
}

/**
 * Play gentle percussion sound
 */
export function playDrumBeat(
  drumType: 'kick' | 'snare' | 'hihat' | 'tom' = 'kick',
  volumePercent: number = 75
) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const gain = (volumePercent / 100) * 0.5;

    if (drumType === 'kick') {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.25);

      gainNode.gain.setValueAtTime(gain * 1.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (drumType === 'snare') {
      // Tone + noise
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      gainNode.gain.setValueAtTime(gain * 0.6, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (drumType === 'hihat') {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gainNode.gain.setValueAtTime(gain * 0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      // Tom
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);

      gainNode.gain.setValueAtTime(gain * 0.8, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    }
  } catch (err) {
    console.warn('Drum play error:', err);
  }
}

/**
 * Positive celebration melody chime (e.g. lesson complete or correct answer)
 */
export function playSuccessChime(volumePercent: number = 75) {
  try {
    const ctx = getAudioContext();
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = ctx.currentTime;
    const gain = (volumePercent / 100) * 0.35;

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gainNode.gain.setValueAtTime(0.001, now + idx * 0.09);
      gainNode.gain.linearRampToValueAtTime(gain, now + idx * 0.09 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.5);
    });
  } catch (err) {
    console.warn('Chime error:', err);
  }
}

/**
 * Gentle encouraging prompt sound (not harsh)
 */
export function playGentleTapSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (err) {
    console.warn('Tap sound error:', err);
  }
}

/**
 * Spoken instruction helper (voice assistance for special needs students)
 */
export function speakInstruction(text: string, enabled: boolean = true) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // slightly slower, clear and friendly
    utterance.pitch = 1.15; // friendly, warm pitch for kids
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}
