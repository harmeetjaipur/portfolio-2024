let audio: AudioContext | null = null;

const context = () => {
  if (!audio) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    audio = new Ctor();
  }
  if (audio.state === "suspended") void audio.resume();
  return audio;
};

/** Short string snap: a filtered noise burst with a falling twang under it. */
export const snap = () => {
  const ctx = context();
  if (!ctx) return;
  const now = ctx.currentTime;

  const length = Math.floor(ctx.sampleRate * 0.14);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 2600;
  band.Q.value = 0.9;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.32;
  noise.connect(band).connect(noiseGain).connect(ctx.destination);
  noise.start(now);

  const twang = ctx.createOscillator();
  twang.type = "triangle";
  twang.frequency.setValueAtTime(760, now);
  twang.frequency.exponentialRampToValueAtTime(180, now + 0.28);
  const twangGain = ctx.createGain();
  twangGain.gain.setValueAtTime(0.12, now);
  twangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  twang.connect(twangGain).connect(ctx.destination);
  twang.start(now);
  twang.stop(now + 0.32);
};

/** Called from a user gesture so later sounds are allowed to play. */
export const unlockSound = () => {
  context();
};
