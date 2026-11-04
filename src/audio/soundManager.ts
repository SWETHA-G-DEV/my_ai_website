/**
 * Web Audio API synthesizer for anime adventure sound effects and music
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private currentBgmTrack: string | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
    const savedMute = localStorage.getItem('secret_world_muted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('secret_world_muted', String(this.isMuted));
    if (this.isMuted) {
      this.stopBGM();
    } else if (this.currentBgmTrack) {
      this.playBGM(this.currentBgmTrack);
    }
    return this.isMuted;
  }

  // --- Sound Effects ---

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  public playJump() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  public playHeartCollect() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  public playMagicalChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [587.33, 739.99, 880.0, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  public playDoorOpen() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // Magical bass swell + celestial glissando
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);

    // Sparkles
    const sparkles = [880, 1108, 1318, 1661, 1760, 2093, 2637];
    sparkles.forEach((freq, idx) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      const st = ctx.currentTime + 0.3 + idx * 0.1;
      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, st);
      sGain.gain.setValueAtTime(0.12, st);
      sGain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);
      sOsc.connect(sGain);
      sGain.connect(ctx.destination);
      sOsc.start(st);
      sOsc.stop(st + 0.35);
    });
  }

  public playCorrect() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C major
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = ctx.currentTime + idx * 0.04;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);
      gain.gain.setValueAtTime(0.15, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + 0.3);
    });
  }

  public playIncorrect() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  public playChestOpen() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const harpNotes = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51, 1661.22];
    harpNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = ctx.currentTime + idx * 0.07;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);
      gain.gain.setValueAtTime(0.15, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + 0.5);
    });
  }

  public playFirework() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // Pop/Whistle
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700 + Math.random() * 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);

    // Crackle chimes
    const burstNotes = [1046.5, 1318.5, 1567.98, 2093];
    burstNotes.forEach((freq) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      const st = ctx.currentTime + 0.15 + Math.random() * 0.1;
      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, st);
      sGain.gain.setValueAtTime(0.1, st);
      sGain.gain.exponentialRampToValueAtTime(0.001, st + 0.25);
      sOsc.connect(sGain);
      sGain.connect(ctx.destination);
      sOsc.start(st);
      sOsc.stop(st + 0.25);
    });
  }

  public playCelebrationFanfare() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const fanfare = [
      { f: 523.25, d: 0.12, wait: 0 },
      { f: 659.25, d: 0.12, wait: 0.12 },
      { f: 783.99, d: 0.12, wait: 0.24 },
      { f: 1046.5, d: 0.45, wait: 0.36 },
      { f: 880.0, d: 0.15, wait: 0.8 },
      { f: 1046.5, d: 0.6, wait: 0.95 },
      { f: 1318.51, d: 0.9, wait: 1.5 },
    ];

    fanfare.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const st = ctx.currentTime + n.wait;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, st);
      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(st);
      osc.stop(st + n.d);
    });
  }

  // --- Background Melody Looper ---

  public playBGM(track: string) {
    this.currentBgmTrack = track;
    this.stopBGM();
    if (this.isMuted) return;

    const ctx = this.initCtx();
    if (!ctx) return;

    let step = 0;

    // Melody notes for different moods
    const melodyForest = [
      392.0, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0,
      329.63, 392.0, 440.0, 523.25, 659.25, 783.99, 659.25, 523.25
    ];

    const melodyRomantic = [
      523.25, 659.25, 783.99, 987.77, 1046.5, 783.99, 659.25, 587.33,
      523.25, 659.25, 880.0, 783.99, 659.25, 523.25, 587.33, 659.25
    ];

    const melodyPlayful = [
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 659.25,
      783.99, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 523.25
    ];

    const activeMelody = track === 'romantic' || track === 'proposal'
      ? melodyRomantic
      : track === 'platformer'
      ? melodyPlayful
      : melodyForest;

    const intervalTime = track === 'platformer' ? 260 : 380;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const freq = activeMelody[step % activeMelody.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const vol = track === 'proposal' ? 0.09 : 0.06;
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);

      step++;
    }, intervalTime);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
