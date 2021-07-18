import { elementEvent, fps, getShift } from './lib';
import { Shift } from './types';
import { names } from './sources';

const w = 370;
const h = 188;
const srcs = names
  // echo *.json | fmt -w 1 | rev | colrm 1 12 | rev | tr $'\n' ' ' | cc
  .filter((name) => !'close-ups.webm face-0.mp4 face-1.mp4 face-2.mp4 face-3.mp4 girl-in-plastic.mp4 hands-0.mp4 hands-1.mp4 hands-plastic-0.mp4 hands-plastic-1.mp4 helmet-0.mp4 helmet-1.mp4'.split(' ').includes(name))
  .map((name) => `/in/${w}x${h}/${name}`);

export default async () => {
  const eta = document.createElement('p');
  document.body.append(eta);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  document.body.append(canvas);

  for (const src of srcs) {
    const video = document.createElement('video');
    video.src = src;
    await elementEvent(video, 'canplay');
    document.body.append(video);

    const shifts: Shift[] = [];

    ctx.drawImage(video, 0, 0);
    let previous;
    previous = ctx.getImageData(0, 0, w, h);
    const t0 = performance.now();

    for (let i = 1; i < video.duration * fps; i++) {
      video.currentTime = i / fps;
      await elementEvent(video, 'seeked');
      ctx.drawImage(video, 0, 0);
      const real = ctx.getImageData(0, 0, w, h);
      const shift = getShift(real, previous);
      shifts.push(shift);
      previous = real;

      const remainingSteps = (video.duration * fps) - i;
      const secondsPerStep = (performance.now() - t0) / 1000 / i;
      const etaInSeconds = ~~(secondsPerStep * remainingSteps);
      const readableEta = etaInSeconds < 60 ? `${etaInSeconds}s` : `${~~(etaInSeconds / 60)}mn${etaInSeconds % 60}s`;
      const progress = ~~(100 * i / (video.duration * fps));
      eta.innerHTML = `ETA ${readableEta} (${progress}%)`;
    }

    video.remove();
    const blob = new Blob([JSON.stringify(shifts)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${video.src.split('/').slice(-1)}.shifts.json`;
    a.innerHTML = a.download;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
};
