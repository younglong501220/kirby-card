/**
 * Web Audio API synthesizer for 8-bit Kirby sound effects and chiptune background music.
 * Completely zero external dependencies, 100% browser-native and instant.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;

  constructor() {
    try {
      const savedMute = localStorage.getItem('kirby_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedVol = localStorage.getItem('kirby_vol');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol) || 0.5;
      }
    } catch {
      // Ignore localStorage restrictions
    }
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('kirby_muted', String(muted));
    } catch {
      // ignore
    }
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('kirby_vol', String(this.volume));
    } catch {
      // ignore
    }
  }

  /** Button tap / menu blip */
  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  /** Power-up / Ability Inhale / Transformation chime */
  public playPowerUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [330, 440, 587, 880, 1174];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25 * this.volume, startTime);
      gain.gain.linearRampToValueAtTime(0.01, startTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.13);
    });
  }

  /** Taking damage buzz / hurt shake sound */
  public playHurt() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  /** Star Collect sparkly chime */
  public playStarCollect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [880, 1318, 1760];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2 * this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  }

  /** 8-bit Classic Kirby Victory Melody Fanfare */
  public playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.14 }, // C5
      { f: 659.25, d: 0.14 }, // E5
      { f: 783.99, d: 0.14 }, // G5
      { f: 1046.50, d: 0.32 }, // C6
      { f: 880.00, d: 0.14 },  // A5
      { f: 1046.50, d: 0.14 }, // C6
      { f: 1174.66, d: 0.14 }, // D6
      { f: 1318.51, d: 0.65 }, // E6 Grand Finish!
    ];

    let time = this.ctx.currentTime;
    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(n.f, time);

      gain.gain.setValueAtTime(0.22 * this.volume, time);
      gain.gain.linearRampToValueAtTime(0.01, time + n.d - 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + n.d);

      time += n.d;
    });
  }

  /** Defeat / Game Over tone */
  public playGameOver() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 440, d: 0.25 },
      { f: 415.3, d: 0.25 },
      { f: 392, d: 0.25 },
      { f: 349.2, d: 0.6 },
    ];

    let time = this.ctx.currentTime;
    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, time);

      gain.gain.setValueAtTime(0.22 * this.volume, time);
      gain.gain.linearRampToValueAtTime(0.01, time + n.d - 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + n.d);

      time += n.d;
    });
  }

  /** Gentle Chiptune Background Theme (optional toggle for lively gaming) */
  public startBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      523.25, 659.25, 783.99, 880.00,
      783.99, 659.25, 587.33, 659.25,
      523.25, 440.00, 392.00, 523.25,
    ];
    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx || !this.isBgmPlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(melody[step % melody.length], now);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);

      step++;
    }, 320);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const sound = new SoundEngine();
