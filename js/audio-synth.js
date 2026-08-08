/**
 * DRIXEL LABS INC. — WEB AUDIO AMBIENT SYNTHESIZER
 * Subdued architectural ambient drone & soft glass resonant chimes.
 * Muted by default with smooth Gain Node fades.
 */

export class AudioAmbientEngine {
  constructor(toggleButtonId) {
    this.button = document.getElementById(toggleButtonId);
    this.isPlaying = false;
    this.audioCtx = null;
    this.masterGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.filterNode = null;
    this.chimeInterval = null;

    if (this.button) {
      this.button.addEventListener('click', () => this.toggle());
    }
  }

  initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // Master Gain
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);

    // Warm Low Pass Filter
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(220, this.audioCtx.currentTime);
    this.filterNode.Q.setValueAtTime(2, this.audioCtx.currentTime);
    this.filterNode.connect(this.masterGain);

    // Architectural Drone Oscillators (Deep 55Hz & 110Hz Sine Drones)
    this.droneOsc1 = this.audioCtx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, this.audioCtx.currentTime); // A1

    this.droneOsc2 = this.audioCtx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(110.5, this.audioCtx.currentTime); // A2 slight detune

    const droneGain = this.audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);

    this.droneOsc1.connect(droneGain);
    this.droneOsc2.connect(droneGain);
    droneGain.connect(this.filterNode);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Soft Ambient Filter LFO Modulation
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.08, this.audioCtx.currentTime); // 0.08 Hz slow sweep
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(80, this.audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start();

    // Schedule Subtle Glass Resonant Chimes
    this.chimeInterval = setInterval(() => {
      if (this.isPlaying && Math.random() > 0.4) {
        this.triggerGlassChime();
      }
    }, 6000);
  }

  triggerGlassChime() {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const notes = [440, 554.37, 659.25, 880, 1108.73]; // Precision A major pentatonic triad
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.audioCtx.createOscillator();
    const chimeGain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    chimeGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.1);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 3.5);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 3.6);
  }

  toggle() {
    if (!this.audioCtx) {
      this.initAudio();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (!this.isPlaying) {
      // Fade In Ambient Audio
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.35, this.audioCtx.currentTime + 2.0);
      this.isPlaying = true;
      if (this.button) {
        this.button.classList.add('playing');
        const textSpan = this.button.querySelector('.audio-text');
        if (textSpan) textSpan.textContent = 'Ambient On';
      }
    } else {
      // Fade Out Ambient Audio
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.5);
      this.isPlaying = false;
      if (this.button) {
        this.button.classList.remove('playing');
        const textSpan = this.button.querySelector('.audio-text');
        if (textSpan) textSpan.textContent = 'Audio Muted';
      }
    }
  }
}
