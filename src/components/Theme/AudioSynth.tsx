'use client';

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export const AudioSynth: React.FC = () => {
  const { audioPlaying } = useAppStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (audioPlaying && !audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Filter Node
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.connect(master);

      // Low Drone Oscillators
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(filter);

      osc1.start();
      osc2.start();
    }

    if (audioCtxRef.current && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      if (audioPlaying) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.5);
      } else {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
      }
    }
  }, [audioPlaying]);

  return null;
};
