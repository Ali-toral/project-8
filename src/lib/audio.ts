/**
 * Audio engine using Web Audio API
 * - Gentle looping background music (pentatonic melody)
 * - "Hooray" chime for correct answers
 * - Gentle "oops" tone for wrong answers (not scary)
 * - Optional Persian speech synthesis for encouragement
 */

type Note = { f: number; d: number };

// Gentle pentatonic lullaby melody (C major pentatonic)
const MELODY: Note[] = [
  { f: 523.25, d: 0.5 }, // C5
  { f: 587.33, d: 0.5 }, // D5
  { f: 659.25, d: 0.75 }, // E5
  { f: 783.99, d: 0.5 }, // G5
  { f: 659.25, d: 0.5 }, // E5
  { f: 587.33, d: 0.75 }, // D5
  { f: 523.25, d: 0.5 }, // C5
  { f: 440.0, d: 0.5 },  // A4
  { f: 523.25, d: 1.0 }, // C5
  { f: 0, d: 0.5 },      // rest
  { f: 587.33, d: 0.5 }, // D5
  { f: 659.25, d: 0.5 }, // E5
  { f: 783.99, d: 0.75 }, // G5
  { f: 880.0, d: 0.5 },  // A5
  { f: 783.99, d: 0.5 }, // G5
  { f: 659.25, d: 1.0 }, // E5
  { f: 0, d: 0.75 },     // rest
];

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicTimer: ReturnType<typeof setInterval> | null = null;
  private melodyIndex = 0;
  private nextNoteTime = 0;

  soundEnabled = true;
  musicEnabled = true;
  volume = 0.7;
  speakEnabled = true;

  private ensureCtx(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /** Call on first user gesture to unlock audio and (re)start music cleanly */
  unlock() {
    const ctx = this.ensureCtx();
    if (ctx && ctx.state === 'running' && this.musicEnabled && !this.musicTimer) {
      this.startMusic();
    }
  }

  /** Play a single tone */
  private tone(freq: number, start: number, duration: number, type: OscillatorType, gain: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain * this.volume, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  /** Hooray! ascending sparkle chime */
  playCorrect() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((f, i) => {
      this.tone(f, now + i * 0.09, 0.5, 'triangle', 0.22);
      this.tone(f * 2, now + i * 0.09, 0.3, 'sine', 0.08); // sparkle
    });
  }

  /** Gentle oops — soft descending, not harsh */
  playWrong() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    this.tone(392, now, 0.35, 'sine', 0.15); // G4
    this.tone(329.63, now + 0.25, 0.45, 'sine', 0.15); // E4
  }

  /** Small click for option select */
  playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    this.tone(660, ctx.currentTime, 0.08, 'triangle', 0.08);
  }

  /** Level complete fanfare */
  playWin() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      this.tone(f, now + i * 0.12, 0.6, 'triangle', 0.2);
    });
  }

  /** Persian speech for encouragement (best-effort) */
  speak(text: string) {
    if (!this.soundEnabled || !this.speakEnabled) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'fa-IR';
      u.rate = 0.95;
      u.pitch = 1.1;
      u.volume = Math.min(1, this.volume);
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  }

  /** Start looping background music */
  startMusic() {
    if (!this.musicEnabled) return;
    if (this.musicTimer) return; // already running
    const ctx = this.ensureCtx();
    if (!ctx) return;
    // Don't schedule while suspended (pre-gesture) — unlock() will start it later
    if (ctx.state !== 'running') return;

    this.melodyIndex = 0;
    this.nextNoteTime = ctx.currentTime + 0.1;

    const scheduleNote = () => {
      if (!this.ctx) return;
      // Schedule ahead while there is time
      while (this.nextNoteTime < this.ctx.currentTime + 0.3) {
        const note = MELODY[this.melodyIndex % MELODY.length];
        const beat = 0.55; // seconds per unit
        if (note.f > 0) {
          // soft melody voice
          this.tone(note.f, this.nextNoteTime, note.d * beat * 1.6, 'sine', 0.055);
          // gentle harmony an octave lower occasionally
          if (this.melodyIndex % 4 === 0) {
            this.tone(note.f / 2, this.nextNoteTime, note.d * beat * 2, 'triangle', 0.03);
          }
        }
        this.nextNoteTime += note.d * beat;
        this.melodyIndex++;
      }
    };

    scheduleNote();
    this.musicTimer = setInterval(scheduleNote, 200);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) this.startMusic();
    else this.stopMusic();
  }
}

export const audio = new AudioEngine();
