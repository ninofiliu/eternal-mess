import { elementEvent, fps, getShift } from './mosh.lib';
import { Shift } from './types';

export default async (w: number, h: number, name: string) => {
  const eta = document.createElement('p');
  document.body.append(eta);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  document.body.append(canvas);

  const src = `/in/${w}x${h}/${name}`;
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
    const shift = getShift(previous, real);
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
  fetch(`http://localhost:8081/${name}`).finally(() => {
    window.close();
  });
};
