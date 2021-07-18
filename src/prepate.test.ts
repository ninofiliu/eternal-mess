import { approximate, elementEvent } from './lib';
import shifts from './shifts/370x188/helmet-1.mp4.shifts.json';
import { Shift } from './types';

export default async () => {
  const w = 370;
  const h = 188;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  const video = document.createElement('video');
  video.src = '/in/370x188/helmet-1.mp4';
  await elementEvent(video, 'canplaythrough');

  ctx.drawImage(video, 0, 0);
  for (const shift of shifts as Shift[]) {
    const previous = ctx.getImageData(0, 0, w, h);
    const next = approximate(previous, shift);
    ctx.putImageData(next, 0, 0);
    await new Promise((r) => requestAnimationFrame(r));
  }
};
